import * as THREE from 'three'
import * as Taxi from '@unseenco/taxi'
import TaxiTransition from './Utils/TaxiTransition.js'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import AppState from './Utils/AppState.js'
import UIManager from './Utils/UIManager.js'
import GlobalEvents from './Utils/GlobalEvents.js'
import Loader from './Utils/Loader.js'
import sources from './sources.js'

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Taxi JS
        //this.initTaxi();

        // Options
        this.canvas = _canvas

        // Setup
        this.events = new GlobalEvents()
        this.appState = new AppState()
        if (window.location.pathname.includes('juego')) { this.UIManager = new UIManager() }
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        if (window.location.pathname.includes('juego')) { this.loader = new Loader() }
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // UI interactions
        this.llamaSetup();

        // Event Handlers
        this.addHandlers()

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    initTaxi() {
        this.taxi = new Taxi.Core({
            transitions: {
                default: TaxiTransition
            }
        });
    }

    llamaSetup() {
        const btn = document.querySelector('.submitBtn');
        //btn.addEventListener('click', sendPrompt);
    }

    addHandlers() {
        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}