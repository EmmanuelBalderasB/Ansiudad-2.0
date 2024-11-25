import * as THREE from 'three'
import BaseScene from './BaseScene.js'
import Floor from '../Floor.js'
import Building from '../Building.js'
import Axolotl from '../Axolotl.js'
import Car from '../Car.js'
import Helicopter from '../Helicopter.js'
import Calculations from '../../Utils/Calculations.js'

export default class CityScene extends BaseScene {
    // Cache frequently used constants
    static BUILDING_CONFIG = {
        RANGE: 6,
        TOTAL_X: 6,
        TOTAL_Z: 8,
        SPACING_Z: 0.5,
        SPACING_X: 0.75,
        ROTATIONS: [0, Math.PI / 2, Math.PI, Math.PI * 1.5]
    };

    static CAR_CONFIG = {
        TOTAL: 12,
        RANGE: 3,
        Z_SUBTRACT: 1.5
    };

    constructor() {
        super('CityScene')
        this.calculations = new Calculations()

        // Create reusable Vector2 instances
        this.tempVector = new THREE.Vector2()
        this.centerVector = new THREE.Vector2(0, 0)

        // Initialize object containers
        this.cars = []
        this.buildings = []

        this.initScene()
        this.isActivated = true
    }

    generateBuildings() {
        const config = CityScene.BUILDING_CONFIG
        const buildings = []

        // Pre-calculate offsets
        const offsetX = -config.RANGE * 0.25
        const offsetZ = -config.RANGE * 0.75

        // Pre-allocate the total number of buildings
        const totalBuildings = config.TOTAL_X * config.TOTAL_Z
        buildings.length = totalBuildings

        // Create models array for batch addition
        const models = new Array(totalBuildings)
        let buildingIndex = 0

        for (let z = 0; z < config.TOTAL_Z; z++) {
            const zPos = z * config.SPACING_Z + offsetZ

            for (let x = 0; x < config.TOTAL_X; x++) {
                const xPos = x * config.SPACING_X + offsetX

                // Reuse Vector2 instance
                this.tempVector.set(xPos, zPos)
                const distanceToCenter = this.tempVector.distanceTo(this.centerVector)
                const scale = this.calculations.map(distanceToCenter, 0, 7, 0.15, 2.5)

                // Create building and set properties efficiently
                const building = new Building(buildingIndex)
                const model = building.model

                model.scale.y = scale // Only set y scale since x and z are 1
                model.position.set(xPos, 0, zPos)
                model.rotation.y = config.ROTATIONS[Math.floor(Math.random() * 4)]

                buildings[buildingIndex] = building
                models[buildingIndex] = model
                buildingIndex++
            }
        }

        this.buildings = buildings
        // Batch add all models at once
        this.group.add(...models)
    }

    generateCars() {
        const config = CityScene.CAR_CONFIG
        const cars = new Array(config.TOTAL)
        const models = new Array(config.TOTAL)

        // Pre-calculate constants for the loop
        const angleIncrement = Math.PI * 2 / config.TOTAL

        for (let i = 0; i < config.TOTAL; i++) {
            const angle = i * angleIncrement
            const x = Math.cos(angle) * config.RANGE
            const z = Math.sin(angle) * config.RANGE - config.Z_SUBTRACT

            const car = new Car(x, z, config.TOTAL, config.RANGE, config.Z_SUBTRACT, i)
            cars[i] = car
            models[i] = car.model
        }

        this.cars = cars
        // Batch add all models at once
        this.group.add(...models)
    }

    initScene() {
        // Create all scene elements
        this.floor = new Floor()
        this.axolotl = new Axolotl()
        this.helicopter = new Helicopter()

        // Batch add static elements
        this.group.add(
            this.floor.mesh,
            this.axolotl.model,
            this.helicopter.container
        )

        // Generate dynamic elements
        this.generateCars()
        this.generateBuildings()
    }

    updateCars() {
        // Use for...of for better performance with arrays
        for (const car of this.cars) {
            car.update()
        }
    }

    update() {
        this.updateCars()
        if (this.axolotl) {
            this.axolotl.update()
        }
        this.helicopter.update()
    }
}