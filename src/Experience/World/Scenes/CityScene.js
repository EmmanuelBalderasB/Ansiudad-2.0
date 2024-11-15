import * as THREE from 'three'
import Experience from '../../Experience.js'
import BaseScene from './BaseScene.js'
import Floor from '../Floor.js'
import Building from '../Building.js'

export default class CityScene extends BaseScene {
    constructor() {
        super('CityScene')

        this.initScene();
    }

    generateBuildings() {
        let buildings = []
        
        for (let x = -5; x < 5; x+=1) {
            for (let z = -5; z < 5; z+=1) {
                const i = new Building(x+z*10)
                i.model.position.set(x,0, z)
                i.model.rotation.y = Math.random() > .5 ? Math.PI / 2 : 0
                buildings.push(i)
               
            }
        }
        this.group.add(...buildings.map(building => building.model))
        
    }

    initScene() {
        // Floor
        this.floor = new Floor()
        this.group.add(this.floor.mesh)

        // Buildings
        this.generateBuildings()

    }

    update() {
        /* if(this.group) {
            for (const child of this.group.children) {
                if (!child.material) {


                }

            }
        } */

    }
}