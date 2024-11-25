import * as THREE from 'three'
import gsap from 'gsap'
import Experience from './Experience.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.appState = this.experience.appState;
        this.currentBgColor = this.appState.bgColor;

        this.setInstance()
        this.addHandlers();
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor(this.currentBgColor)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    addHandlers() {
        this.appState.on('bgColorChange', (newColor) => {
            if (this.destroyed) return;
            this.tweenBgColor(newColor);
        });
    }

    tweenBgColor(newColor) {
        let colorVec = new THREE.Color(this.currentBgColor);
        let newColorVec = new THREE.Color(newColor);
        this.currentBgColor = newColor;
        gsap.to(colorVec, { 
            r: newColorVec.r,
            g: newColorVec.g,
            b: newColorVec.b,

            duration: 1.2,
            ease: "power2.inOut",
            onUpdate: _ => {
                this.instance.setClearColor(colorVec)
            }
        });
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }

    destroy() {
        this.destroyed = true;
    }
}