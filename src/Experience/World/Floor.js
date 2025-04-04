import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resource = this.resources.items.baseModel

        this.setMesh()
    }

    setMesh()
    {
        this.mesh = this.resource.scene.clone()
        this.mesh.scale.set(1.4, 1.4, 1.4)
        this.mesh.rotation.y = Math.PI
        this.mesh.receiveShadow = true
        this.mesh.position.z = -1.5
        this.mesh.position.y = 0.15

        this.mesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.receiveShadow = true
            }
        })
    }
}