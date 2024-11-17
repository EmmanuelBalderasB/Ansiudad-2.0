import * as THREE from 'three'
import Experience from '../Experience.js'


export default class Axolotl {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('axolotl')
            this.debugFolder.add(this.model.position.x, 'x').min(-3).max(3).step(0.1).name('positionX')
            this.debugFolder.add(this.model.position.x, 'z').min(-3).max(3).step(0.1).name('positionZ')

        }

        // Resource
        this.resource = this.resources.items.axolotlModel
        this.setModel()
        //this.setAnimation()
    }

    setModel() {
        this.model = this.resource.scene.clone()
        this.model.position.set(0, 0, 0)
        this.model.rotation.y = Math.PI * 2
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
                //child.material.color = new THREE.Color(0xff99ff)

            }
        })
    }

    setAnimation() {
        this.animation = {}

        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        // Actions
        this.animation.actions = {}

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }
        //Debug
        if(this.debug.active)
        {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') }
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }

    update() {
        //this.animation.mixer.update(this.time.delta)
    }
}