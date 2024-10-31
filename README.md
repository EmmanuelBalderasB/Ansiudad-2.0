# Ansiudad 2.0
Ansiudad es un juego de mesa que aborda la ecoansiedad y busca convertir la preocupación por el cambio climático en acción. Creado por Gabriel Sánchez y Andrea Norzagaray. Esta es la versión 2 del sitio web pensada para informar sobre el juego y a la vez ser un facilitador o "expansión" a través de IA.


# Setup (borrowed from Three.js Journey)
Download [Node.js](https://nodejs.org/en/download/).

It's recommended to use Node version 20 or higher to avoid bugs and errors installing dependencies.

Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```


=====================================
Este proyecto está siendo construido por el boilerplate "Ometeotl" basado en la configuración enseñada por [Bruno Simon](https://bruno-simon.com/) en su curso [ThreeJS.Journey](https://threejs-journey.com/), diseñado por [Alejandro Alvarado](https://andrew.studio/) y actualmente en construcción.

###### 🚧🚧🚧 Aviso 🚧🚧🚧
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
