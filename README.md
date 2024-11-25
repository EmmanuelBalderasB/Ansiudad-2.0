# Ansiudad 2.0
Ansiudad es un juego de mesa que aborda la ecoansiedad y busca convertir la preocupación por el cambio climático en acción. Creado por Gabriel Sánchez, Andrea Norzagaray, y Emmanuel Balderas. Esta es la versión 2 del sitio web pensada para informar sobre el juego y a la vez ser un facilitador o "expansión" a través de IA.


***
# TODO List (en orden)
- [x] [alex] Merge Maries (Integracion de Maries)
- [x] [emma/alex] Loader [x]
- [x] [emma] Button disappearing (UX improvement)
- [x] [emma] UI styling upgrades
- [] [emma] Improve Error handling from Llama
- [] [emma] Pantalla para bloquear dispositivos móbiles
- [] [emma] Swap Boilerplate LLama for ne design @juego.html div.llama-helper & @juego.html div.llama-wait
- [x] [emma] Change layout of loading animation
- 3D
    - [x] [alex] Improve 3D background (3D model)
    - [x] [alex] Tween background color

    - [emma] City improvements
        - [x] [emma] Posicion de los edificios
        - [x] [emma] Escala de los edificios (composicion de piramide)
        - [x] [emma] Pavimento / Asfalto
        - [] [emma] Reposicion del ajolote
        - [x] [emma] Mas helicopteros (1)

        - nice to haves
         - [x] [emma] Reducir total de coches 
         - [] [emma] Offset de coches 
         - [] [emma] Arboles (offset) 
         - [] [emma] Postes de luz (offset) 

        - [] [alex] Landing camera angle
        - [] [alex] City close up camera angle

    - [] [alex] Portal improvements
        - [] [alex] Portal with shaders

    - [] [alex] Tunnel improvements
        - [] [alex] Tunnel cone


    - [] [alex] Global improvements
        - [] [alex] Gaze camera

    - [] [alex] performance

***

# Setup (prestado de Three.js Journey)
Descarga [Node.js](https://nodejs.org/en/download/).

Se recomienda usar la versión 20 o mayor de "Node" para prevenir bugs y errores, especialmente al descargar dependencias.

Corre los siguientes comandos en tu terminal:

``` bash
# Instalar dependencias (sólo se hace la primera vez al descargar el repositorio)
npm install

# Inicializa un servidor local en el puerto "localhost:8080"
npm run dev

# Compila los archivos para publicar el proyecto en la carpeta "dist/"
npm run build
```


***