import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Building from './Building.js'
import ShaderTest from './ShaderTest.js'
import Portal from './Portal.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.building = new Building()
            this.environment = new Environment()
            this.shaderTest = new ShaderTest()
            this.portal = new Portal()
        })
    }

    update()
    {
        if(this.building)
            this.building.update()
        if (this.portal)
            this.portal.update()
    }
}