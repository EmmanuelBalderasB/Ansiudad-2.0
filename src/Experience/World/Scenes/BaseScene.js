import * as THREE from 'three'
import Experience from '../../Experience.js'

export default class BaseScene {
    constructor(name) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.group = new THREE.Group()
        this.isActivated = false;
        // Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder(name)
        }

        this.scene.add(this.group)
    }
}