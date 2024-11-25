import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'

export default class Car {
    constructor(x, z, total, range, zSubtract, index) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.originPointX = x
        this.originPointZ = z
        this.total = total
        this.range = range
        this.zSubtract = zSubtract
        this.index = index

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

        this.resource = this.carModels[Math.floor(Math.random() * this.carModels.length)]
        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene.clone()
        this.model.position.set(this.originPointX, 0, this.originPointZ)
        this.model.scale.set(2, 2, 2)

        // Calculate initial rotation based on position in the circle
        const initialAngle = this.index / this.total * Math.PI * 2
        this.model.rotation.y = -Math.atan2(
            -Math.sin(initialAngle), // Change in x (negative sine for clockwise)
            -Math.cos(initialAngle)  // Change in z (negative cosine for clockwise)
        ) + Math.PI / 2

        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })
    }

    update() {
        // Calculate the current angle based on time and initial position
        const currentAngle = (this.index / this.total * Math.PI * 2) + this.time.elapsed * 0.0005

        // Update position
        this.model.position.x = Math.cos(currentAngle) * this.range
        this.model.position.z = Math.sin(currentAngle) * this.range - this.zSubtract

        // Update rotation to face tangent to the circle
        this.model.rotation.y = -Math.atan2(
            -Math.sin(currentAngle), // Change in x (negative sine for clockwise)
            -Math.cos(currentAngle)  // Change in z (negative cosine for clockwise)
        ) + Math.PI / 2
    }
}