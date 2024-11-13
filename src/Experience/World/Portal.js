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
        this.resource = this.resources.items.portalModel

        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene.clone()
        this.model.position.set(0, 0.4, 0)
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }

    update() {
        // 
    }
}