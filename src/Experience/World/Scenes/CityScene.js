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

    initScene() {
        // Floor
        this.floor = new Floor()
        this.group.add(this.floor.mesh)

        // Buildings
        this.building = new Building()
        this.group.add(this.building.model)

    }

    update() {
        if(this.building) this.building.update()

    }
}