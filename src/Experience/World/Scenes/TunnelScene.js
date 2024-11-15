import BaseScene from './BaseScene.js'
import Cone from '../Cone.js'
import TunnelPlane from '../TunnelPlane.js'

export default class TunnelScene extends BaseScene {
    constructor() {
        super('TunnelScene')

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
    }

    update() {
        if(this.tunnel) this.tunnel.update()
        if(this.plane) this.plane.update()

    }
}