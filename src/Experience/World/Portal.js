import * as THREE from 'three'
import Experience from '../Experience.js'


export default class Portal {
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('portal')
        }

        // Resource
        this.resource1 = this.resources.items.portalModel
        this.resource2 = this.resources.items.portalColorTexture
        this.setTextures()
        this.setMaterial()

        this.setModel()
    }

    setModel() {
        this.model = this.resource1.scene.clone()
        this.model.position.set(0, -1, 0)
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.material = this.material
            }
        })
    }
    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.portalColorTexture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping
    }
    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            //normalMap: this.textures.normal
        })
    }

    update() {
        // 
    }
}