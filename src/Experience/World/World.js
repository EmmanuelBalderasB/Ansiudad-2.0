import Experience from '../Experience.js'
import Environment from './Environment.js'
import CityScene from './Scenes/CityScene.js'
import PortalScene from './Scenes/PortalScene.js'
import TunnelScene from './Scenes/TunnelScene.js'

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
            this.environment = new Environment()

            this.CityScene = new CityScene()
            this.PortalScene = new PortalScene()
            this.TunnelScene = new TunnelScene()

            this.positionScenes()
        })
    }
    
    positionScenes() {
        this.CityScene.group.position.x = -10
        this.CityScene.group.position.z = -5

        this.TunnelScene.group.position.x = -2
        this.TunnelScene.group.position.z = -5
        this.TunnelScene.group.rotateY(Math.PI)
    }

    update()
    {
        if (this.CityScene)
            this.CityScene.update()
        
        if (this.PortalScene)
            this.PortalScene.update()
        
        if (this.TunnelScene)
            this.TunnelScene.update()
    }
}