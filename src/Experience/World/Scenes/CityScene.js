import BaseScene from './BaseScene.js'
import Floor from '../Floor.js'
import Building from '../Building.js'
import Axolotl from '../Axolotl.js'
import Car from '../Car.js'
export default class CityScene extends BaseScene {
    constructor() {
        super('CityScene')
        this.initScene();
        this.isActivated = true;
    }

    generateBuildings() {
        let buildings = []
        const range = 3;
        const rotations = [0, Math.PI / 2, Math.PI, Math.PI * 1.5]

        for (let x = -range; x < range; x++) {
            for (let z = -range; z < range; z++) {
                const i = new Building(x+z*10)
                if (x == 0 && z == 0 || x == -1 && z == 0 || x == .5 && z == 0) continue
                if (z >= 1) continue

                i.model.position.set(x,0, z)
                i.model.rotation.y = rotations[Math.floor(Math.random() * rotations.length)]
                buildings.push(i)

                const i2 = new Building(x + z * 10 + 1)
                i2.model.position.set(x+.5, 0, z)
                i2.model.rotation.y = rotations[Math.floor(Math.random() * rotations.length)]
                buildings.push(i2)
               
            }
        }
        this.group.add(...buildings.map(building => building.model))
    }
    
    generateCars(){
        let cars = []
        const range = 3;
        for (let x = -range; x < range; x++) {
                const i = new Car(3+x)
                cars.push(i)
        }
        this.cars = cars;
        this.group.add(...cars.map(car => car.model))
    }
    initScene() {
        // Floor
        this.floor = new Floor()
        this.group.add(this.floor.mesh)

        //Axolotl
        this.axolotl = new Axolotl()
        this.group.add(this.axolotl.model)

        //Car
        this.generateCars()

        // Buildings
        this.generateBuildings()
    }
    updateCars(){
        this.cars.forEach(car => {
            car.update()
        })
    }
    update() {
        this.updateCars()
        if (this.axolotl) {
            this.axolotl.update()
        }
    }
}