# Ansiudad 2.0
Ansiudad es un juego de mesa que aborda la ecoansiedad y busca convertir la preocupación por el cambio climático en acción. Creado por Gabriel Sánchez y Andrea Norzagaray. Esta es la versión 2 del sitio web pensada para informar sobre el juego y a la vez ser un facilitador o "expansión" a través de IA.


***
# TODO List (en orden)
- [] [alex] Merge Maries (Integracion de Maries)
- [] [emma/alex] Loader [x]
- [] [emma] Button disappearing (UX improvement)
- [] [emma] UI styling upgrades
- [] [emma] Improve Error handling from Llama
- [] [emma] Pantalla para bloquear dispositivos móbiles

- 3D
    - [] [alex] Improve 3D background (3D model)
    - [] [alex] Tween background color

    - [emma] City improvements
        - [] [emma] Posicion de los edificios
        - [] [emma] Escala de los edificios (composicion de piramide)
        - [] [emma] Pavimento / Asfalto
        - [] [emma] Reposicion del ajolote
        - [] [emma] Mas helicopteros (1)

        - nice to haves
         - [] [emma] Reducir total de coches 
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

experience.events.trigger('goToStep', [3]) # Portal scene
```


***


Este proyecto está siendo construido por el boilerplate "Ometeotl" basado en la configuración enseñada por [Bruno Simon](https://bruno-simon.com/) en su curso [ThreeJS.Journey](https://threejs-journey.com/), diseñado por [Alejandro Alvarado](https://andrew.studio/) y actualmente en construcción.

## 🚧🚧🚧 Aviso 🚧🚧🚧
Muchas funcionalidades del boilerplate "Ometeotl" no están listas y la estructura del proyecto puede cambiar sobre la marcha.


# Ometeotl
Boilerplate designed to build visual-oriented websites allowing 3D and 2D animations. Meant to speed up frontend development, take care of the repetitive setup and make it easy and enjoyable to get a quick start and display animations and graphics on screen right from the beginning of the project.

## Features
### Core
* Hot reloading thanks to Vite setup.
* Dynamic page transitions (PJAX logic handled by [Taxi.js](https://taxi.js.org/) by [Unseen Studio.](https://unseen.co/))
* Organized JS classes.
* 3D engines support (three.js by default).
* Import/manage GLSL Shader files via #include (.glsl, .frag and .vert formats supported). [Vite GLSL plugin.](https://www.npmjs.com/package/vite-plugin-glsl)


### TODO || Nice to have's
* Fast building (Pug templates?)
* Fast styling (SCSS support)
* Lazy loading for images
* Fast first content visible (split js files?)
* DOM-GL (sync between HTML DOM tree and WebGL)
