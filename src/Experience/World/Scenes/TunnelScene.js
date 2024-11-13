import BaseScene from './BaseScene.js'
import Cone from '../Cone.js'
import TunnelPlane from '../TunnelPlane.js'

export default class TunnelScene extends BaseScene {
    constructor() {
        super('TunnelScene')

        this.initScene();
    }

    initScene() {
        // Portal 3D model
        this.tunnel = new Cone()
        this.group.add(this.tunnel.model)
        this.tunnel.model.position.set(2, 0, 0)
        this.tunnel.model.scale.setScalar(5)
        this.tunnel.model.rotation.z = Math.PI / 2;

        // Portal plane with shader
        this.plane = new TunnelPlane()
        this.group.add(this.plane.mesh)
        this.plane.mesh.rotation.y = Math.PI / 2;
        this.plane.mesh.position.set(-5, 0 , 0);

    }

    update() {
        if(this.tunnel) this.tunnel.update()
        if(this.plane) this.plane.update()

    }
}