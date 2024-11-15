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
        this.PortalScene.group.position.y = -10
        this.TunnelScene.group.position.y = -10
        this.TunnelScene.group.position.x = -5
        this.TunnelScene.group.rotateY(Math.PI / 2)
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