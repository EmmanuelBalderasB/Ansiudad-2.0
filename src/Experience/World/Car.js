import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

export default class Car {
    constructor(x) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.originPointX = x
        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Car')
        }
        this.carModels = [
            this.resources.items.carModelWhite,
            this.resources.items.carModelWhite,
            this.resources.items.carModelWhite,
            this.resources.items.carModelWhite, // 4X CHANCE OF SPAWING WHITE CAR
            this.resources.items.carModelPurple,
            this.resources.items.carModelBlue,
            this.resources.items.carModelOrange, 
            this.resources.items.carModelRed,
            this.resources.items.carModelGreen
        ]
        // Resource
        this.resource = this.carModels[Math.floor(Math.random() * this.carModels.length)]
        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene.clone()
        this.model.position.set(this.originPointX, 0, 1);
        this.model.scale.set(2,2,2);
        this.model.rotation.y = 0;
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        })
    }

    update() {
        if (this.model.position.x <= -3) {
            this.model.position.x = 3;
        }
        this.model.position.x -= 0.02;
        if (this.model.position.x > 3) {
            this.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.visible = false;
                }
            })
        } else {
            this.model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.visible = true;
                }
            })
        }
    }
}