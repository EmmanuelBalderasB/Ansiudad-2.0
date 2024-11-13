import Experience from '../Experience.js'
import Environment from './Environment.js'
import CityScene from './Scenes/CityScene.js'
import Portal from './Portal.js'
import Cone from './Cone.js'
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
            this.portal = new Portal()
            this.cone = new Cone()

            this.CityScene = new CityScene()
            // this.PortalScene = new PortalScene()
            // this.TunnelScene = new TunnelScene()

            this.positionScenes()
        })
    }
    
    positionScenes() {
        this.CityScene.group.position.x = -7
        this.CityScene.group.position.z = -7
    }

    update()
    {
        if (this.portal)
            this.portal.update()
        
        if (this.CityScene)
            this.CityScene.update()
        
    //     if (this.PortalScene)
    //         this.PortalScene.update()
        
    //     if (this.TunnelScene)
    //         this.TunnelScene.update()
    }
}