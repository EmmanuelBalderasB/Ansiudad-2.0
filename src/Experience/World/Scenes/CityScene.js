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
        RANGE: 4,
        TOTAL_X: 5,
        TOTAL_Z: 8,
        SPACING_Z: 0.5,
        SPACING_X: 0.69,
        ROTATIONS: [0, Math.PI / 2, Math.PI, Math.PI * 1.5],
        SCALE_RANGE: {
            MIN: 0.15,
            MAX: 2.5
        },
        VERTICAL_SCALE: 1.5
    };

    static CAR_CONFIG = {
        TOTAL: 12,
        RANGE: 2.75,
        Z_SUBTRACT: 1.5,
        SPAWN_CHANCE: 0.25
    };

    constructor() {
        super('CityScene')
        this.calculations = new Calculations()
        this.tempVector = new THREE.Vector2()
        this.centerVector = new THREE.Vector2(0, 0)
        this.cars = []
        this.buildings = []

        this.initScene()
        this.isActivated = true
    }

    createAdditionalBuilding(buildingIndex, xPos, zPos, scale) {
        const building = new Building(buildingIndex)
        const model = building.model
        model.scale.y = scale * CityScene.BUILDING_CONFIG.VERTICAL_SCALE
        model.position.set(xPos, 0, zPos)
        model.rotation.y = this.getRandomRotation()
        return { building, model }
    }

    getRandomRotation() {
        return CityScene.BUILDING_CONFIG.ROTATIONS[Math.floor(Math.random() * 4)]
    }

    isLastRow(z) {
        return z === CityScene.BUILDING_CONFIG.TOTAL_Z - 1
    }

    isSecondToLastRow(z, x) {
        const config = CityScene.BUILDING_CONFIG
        return z === config.TOTAL_Z - 2 && x === Math.floor(config.TOTAL_X / 2)
    }

    shouldAddExtraBuilding(z, x) {
        const config = CityScene.BUILDING_CONFIG
        return (z > 1 && z < config.TOTAL_Z - 3)
    }

    generateBuildings() {
        const config = CityScene.BUILDING_CONFIG
        const buildings = []
        const offsetX = -config.RANGE * 0.25
        const offsetZ = -config.RANGE * 0.75
        const totalBuildings = config.TOTAL_X * config.TOTAL_Z
        const models = []
        let buildingIndex = 0

        for (let z = 0; z < config.TOTAL_Z; z++) {
            const zPos = z * config.SPACING_Z + offsetZ

            for (let x = 0; x < config.TOTAL_X; x++) {
                const xPos = x * config.SPACING_X + offsetX

                if (this.isLastRow(z)) continue
                if (this.isSecondToLastRow(z, x)) continue

                this.tempVector.set(xPos, zPos)
                const distanceToCenter = this.tempVector.distanceTo(this.centerVector)
                const scale = this.calculations.map(
                    distanceToCenter,
                    0,
                    7,
                    config.SCALE_RANGE.MIN,
                    config.SCALE_RANGE.MAX
                )

                // Main building
                const { building, model } = this.createAdditionalBuilding(
                    buildingIndex,
                    xPos - 0.5,
                    zPos,
                    scale
                )
                buildings.push(building)
                models.push(model)
                buildingIndex++

                // Extra buildings on sides
                if (this.shouldAddExtraBuilding(z, x)) {
                    if (x === config.TOTAL_X - 1) {
                        const { building: newBuilding, model: newModel } = this.createAdditionalBuilding(
                            buildingIndex,
                            xPos + 0.2,
                            zPos,
                            scale
                        )
                        buildings.push(newBuilding)
                        models.push(newModel)
                        buildingIndex++
                    }

                    if (x < 1) {
                        const { building: newBuilding, model: newModel } = this.createAdditionalBuilding(
                            buildingIndex,
                            xPos - 1,
                            zPos,
                            scale
                        )
                        buildings.push(newBuilding)
                        models.push(newModel)
                        buildingIndex++
                    }
                }
            }
        }

        this.buildings = buildings
        this.group.add(...models)
    }

    generateCars() {
        const config = CityScene.CAR_CONFIG
        const cars = []
        const models = []
        const angleIncrement = (Math.PI * 2) / config.TOTAL

        for (let i = 0; i < config.TOTAL; i++) {
            if (Math.random() < config.SPAWN_CHANCE) continue

            const angle = i * angleIncrement
            const x = Math.cos(angle) * config.RANGE
            const z = Math.sin(angle) * config.RANGE - config.Z_SUBTRACT

            const car = new Car(x, z, config.TOTAL, config.RANGE, config.Z_SUBTRACT, i)
            cars.push(car)
            models.push(car.model)
        }

        this.cars = cars
        this.group.add(...models)
    }

    initScene() {
        this.floor = new Floor()
        this.axolotl = new Axolotl()
        this.helicopter = new Helicopter()

        this.group.add(
            this.floor.mesh,
            this.axolotl.model,
            this.helicopter.container
        )

        this.generateCars()
        this.generateBuildings()
    }

    updateCars() {
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