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
        for (let i = 0; i < 30; i++) {
            buildings.push(new Building())
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
        if(this.building) this.building.update()

    }
}