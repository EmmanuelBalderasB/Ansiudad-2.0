import * as THREE from 'three'
import Experience from '../../Experience.js'
import BaseScene from './BaseScene.js'
import Floor from '../Floor.js'
import Building from '../Building.js'
import Axolotl from '../Axolotl.js'
import Car from '../Car.js'
export default class CityScene extends BaseScene {
    constructor() {
        super('CityScene')

        this.initScene();
    }

    generateBuildings() {
        let buildings = []
        const range = 3;
        for (let x = -range; x < range; x+=0.5) {
            for (let z = -range; z < range; z+=0.5) {
                if (z % 2 === 0 || z % 2 === .75) continue
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

        //Axolotl
        this.axolotl = new Axolotl()
        this.group.add(this.axolotl.model)

        //Car
        this.car = new Car()
        // Buildings
        this.generateBuildings()
    }

    update() {
        this.car.update()

    }
}