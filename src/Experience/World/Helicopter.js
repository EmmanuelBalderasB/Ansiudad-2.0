import * as THREE from 'three'
import Experience from '../Experience.js'
import PerlinNoise from '../Utils/PerlinNoise.js'

export default class Helicopter {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.PerlinNoise = new PerlinNoise()
        this.resource = this.resources.items.helicopterModel
        this.prevPosition = null
        // Target point that the helicopter should face
        this.targetPoint = new THREE.Vector3(0, 1.5, 0)

        // Create a quaternion for smooth rotation
        this.quaternion = new THREE.Quaternion()

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Helicopter')
        }

        this.setModel()
    }

    setModel() {
        // Create main container for the helicopter
        this.container = new THREE.Group()

        // Create helicopter body
        this.model = this.resource.scene.clone()
        this.model.scale.set(1.5, 1.5, 1.5)
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
                //child.material.color = new THREE.Color(0xff99ff)

            }
        })
        // Create blades
        this.blades = new THREE.Mesh(
            new THREE.BoxGeometry(.5, .01, .01),
            new THREE.MeshStandardMaterial({ color: 0xffffff })
        )

        // Add body to container
        this.container.add(this.model)

        // Position blades above the helicopter body
        this.blades.position.y = 0.15

        // Add blades to container
        this.container.add(this.blades)

        // Set initial position
        this.container.position.set(0, 2, 0)


        // Setup shadows
        this.model.castShadow = true
        this.model.receiveShadow = true
        this.blades.castShadow = true
        this.blades.receiveShadow = true

        // Debug
        if (this.debug.active) {
            this.debugFolder.add(this.container.position, 'x').min(-3).max(3).step(0.1).name('positionX')
            this.debugFolder.add(this.container.position, 'z').min(-3).max(3).step(0.1).name('positionZ')
            this.debugFolder.add(this.container.position, 'y').min(-3).max(3).step(0.1).name('positionY')
        }
    }

    updateRotation() {
        // Create a direction vector from the helicopter to the target
        const direction = new THREE.Vector3()
        direction.subVectors(this.targetPoint, this.container.position).normalize()

        // Create a matrix to store our rotation
        const matrix = new THREE.Matrix4()

        // Up vector (we'll use world up as reference)
        const up = new THREE.Vector3(0, 1, 0)

        // Create the rotation matrix
        matrix.lookAt(new THREE.Vector3(0, 0, 0), direction, up)

        // Convert the matrix to a quaternion
        this.quaternion.setFromRotationMatrix(matrix)

        // Apply the rotation to the container
        this.container.quaternion.copy(this.quaternion)

        // Adjust to face forward
        this.container.rotateY(0)

        // Add slight pitch based on vertical movement
        const verticalSpeed = this.container.position.y - (this.prevPosition?.y || this.container.position.y)
        this.container.rotateX(verticalSpeed * 0.5)

        // Store current position for next frame
        this.prevPosition = this.container.position.clone()
    }

    noise(x, y, z) {
        return this.PerlinNoise.noise(x, y, z);
    }
    // checkCollision(current) {
    //     // Check if the helicopter is colliding with Axolotl object
    //     const distance = this.container.position.distanceTo(this.targetPoint)
    //     if (distance < 2) {
    //         console.log('crash');
    //         const diff = this.prevPosition.sub(current)
    //         this.container.position.sub(diff);
    //     }
    //     this.updateRotation()
    // }
    update() {
        const inc = 0.0001;

        // Store previous position
        this.prevPosition = this.container.position.clone()

        this.container.position.y = this.noise(this.time.elapsed * inc, 0, 0) * 2 + 1
        this.container.position.x = this.noise(0, this.time.elapsed * inc, 0) * 6 - 3
        this.container.position.z = this.noise(0, 0, this.time.elapsed * inc) * 6 - 3

        // Store current position
        const current = this.container.position.clone()

        // Check collision
        //this.checkCollision(current)
        
        // Update rotation to face the target point
        this.updateRotation()

        // Rotate the blades
        this.blades.rotation.y += 0.5
    }
}