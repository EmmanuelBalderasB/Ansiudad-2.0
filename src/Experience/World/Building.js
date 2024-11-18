import * as THREE from 'three'
import Experience from '../Experience.js'


export default class Building
{
    constructor(_id)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('building')
        }
        
        const typeList = ['buildingAModel', 'buildingBModel', 'buildingCModel', 'buildingDModel', 'buildingEModel', 'buildingFModel', 'buildingGModel', 'buildingHModel']
        const type = typeList[Math.floor(Math.random() * typeList.length)]

        // Resource
        this.resource = this.resources.items[type]
        this.id = _id
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene.clone()
        //this.model.position.set(this.id, 0, this.id)
        const rotations = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5]
        this.model.rotation.y = rotations[Math.floor(Math.random() * rotations.length)]
        const colors = [0xb8a5e8, 0x9b92b3, 0x898196]
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = true
                child.material.color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)])
                
            }
        })
    }
}