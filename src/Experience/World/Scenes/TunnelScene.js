import BaseScene from './BaseScene.js'
import Cone from '../Cone.js'
import TunnelPlane from '../TunnelPlane.js'
import TunnelPlaneHigh from '../TunnelPlaneHigh.js'
import Experience from '../../Experience.js'

export default class TunnelScene extends BaseScene {
    constructor() {
        super('TunnelScene')

        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.initScene();
    }

    initScene() {
        // Tunnel 3D model
        this.tunnel = new Cone()
        this.group.add(this.tunnel.model)

        // Tunnel plane with shader
        this.plane = new TunnelPlane()
        this.group.add(this.plane.mesh)
        this.plane.mesh.position.z = -10
        // this.plane.mesh.position.z = -45
        
        this.planeHigh = new TunnelPlaneHigh()
        this.group.add(this.planeHigh.mesh)
        this.planeHigh.mesh.position.z = -9
    }

    update() {
        if(this.tunnel) this.tunnel.update()
        if(this.plane) this.plane.update()
        if(this.planeHigh) this.planeHigh.update()

    }
}