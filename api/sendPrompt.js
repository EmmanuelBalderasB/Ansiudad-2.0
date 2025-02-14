import { Groq } from "groq-sdk"

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

function cleanJsonResponse(str) {
    try {
        const cleanStr = str.replace(/```(json)?\n?/g, "").replace(/\n```$/, "")
        return JSON.parse(cleanStr)
    } catch (e) {
        try {
            const fixedStr = str.replace(/'/g, '"')
            return JSON.parse(fixedStr)
        } catch (e) {
            try {
                const cleanedStr = str.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")
                return JSON.parse(cleanedStr)
            } catch (e) {
                throw new Error("Unable to parse JSON string: " + e.message)
            }
        }
    }
}

const user = (content) => ({ role: "user", content })
const system = (content) => ({ role: "system", content })

export default async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" })
    }

    const { prompt, numberOfRoles, numberOfTeams } = req.body
    if (!prompt || !numberOfRoles || !numberOfTeams) {
        return res.status(400).json({ error: "Missing required parameters: prompt, numberOfRoles, numberOfTeams" })
    }

    if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({ error: "Missing GROQ_API_KEY environment variable" })
    }

    const guideline = "Solo entrega el objeto en formato JSON, omite cualquier otro texto o introduccion"
    const guideline2 =
        "No cambies los nombres de las llaves, tienen que estar como en el siquiente ejemplo para poder extraerlas con JSON"
    const guideline3 =
        "Recuerda generar roles realisticos de perfiles de habitantes de una metropolis moderna, de diversos ambitos y contextos"

    const eventPrompt = [
        system(`Eres el narrador de un juego de mesa llamado Ansiudad. Genera ${numberOfTeams} eventos basados en el tema que proporcione el usuario. ${guideline2}, recuerda usar un poco de humor satirico, y un poco fantasioso.
Genera ${numberOfTeams} eventos basados en el tema que proporcione a continuacion el usuario.
Formatea la respuesta como un objeto JSON con estos campos para cada evento. ${guideline}:
- title: string (título corto del evento)
- description: string (descripción breve con un toque de humor y fantasía)
- type: string (categoría del evento)
Formato y narrativas de ejemplo:
{
  "events": [
    {
      "title": "Manejo de desechos",
      "description": "Los altos niveles de toxicidad en el vertedero de Ansiudad han dotado a las ratas de súper fuerza y resistencia a los raticidas."
    },
    {
      "title": "Movilidad y transporte",
      "description": "Misteriosa criatura gigante emerge del subsuelo dañando gravemente la línea del metro de Ansiudad. No se reportan heridos."
    },
    {
      "title": "Crisis hídrica",
      "description": "Explosión en la fábrica de patitos de hule de Ansiudad provoca la filtración de residuos contaminantes en un pozo que abastece a varios barrios."
    }
  ]
}`),
        user(prompt),
    ]

    const rolePrompt = [
        system(`Eres el narrador de Ansiudad. Genera roles ${numberOfRoles} de personajes basados en los siguientes lineamientos: ${guideline3}.
Genera ${numberOfRoles} roles. ${guideline2}
Formatea la respuesta como un objeto JSON con estos campos para cada rol. ${guideline}:
- name: string (título del rol)
- priorities: string (principales preocupaciones y objetivos)
- interests: string (lo que les importa)
Formato y narrativas de ejemplo:
{
  "roles": [
    {
      "name": "Mujeres",
      "priorities": "Tu prioridad es alcanzar la igualdad de género, con acceso a servicios de salud reproductiva, seguridad en espacios públicos, y oportunidades laborales y educativas equitativas."
    },
    {
      "name": "Personas de la tercera edad",
      "priorities": "Tu prioridad es la inclusión social, con programas de envejecimiento activo, acceso a infraestructura adaptada a tus necesidades, y espacios de esparcimiento seguros."
    },
    {
      "name": "Dueñxs de negocio",
      "priorities": "Tu prioridad es el crecimiento económico, con acceso a recursos financieros, políticas públicas que te beneficien, y la reducción de costos operativos a toda costa."
    }
  ]
}`),
    ]

    try {
        const eventResponse = await groq.chat.completions.create({
            messages: eventPrompt,
            model: "llama-3.3-70b-versatile",
            temperature: 0.9,
        })
        const roleResponse = await groq.chat.completions.create({
            messages: rolePrompt,
            model: "llama-3.3-70b-versatile",
            temperature: 0.9,
        })

        const parsedEventResponse = cleanJsonResponse(eventResponse.choices[0].message.content)
        const parsedRoleResponse = cleanJsonResponse(roleResponse.choices[0].message.content)

        const combinedResponse = {
            success: true,
            data: {
                events: parsedEventResponse,
                roles: parsedRoleResponse,
            },
        }

        return res.status(200).json(combinedResponse)
    } catch (error) {
        console.error("Error in sendPromptToGroq:", error)
        return res.status(500).json({ error: "Error processing the Groq request" })
    }
}

