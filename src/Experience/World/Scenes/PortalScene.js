import BaseScene from './BaseScene.js'
import Portal from '../Portal.js'
import PortalPlane from '../PortalPlane.js'
import TunnelPlane from '../TunnelPlane.js'

export default class PortalScene extends BaseScene {
    constructor() {
        super('PortalScene')
        this.initScene();
    }

    initScene() {
        // Portal 3D model
        this.portal = new Portal()
        this.group.add(this.portal.model)
        

        // Portal plane with shader
        this.plane = new TunnelPlane()
        this.group.add(this.plane.mesh)
        this.plane.mesh.scale.setScalar(5)
        this.plane.mesh.rotation.y = Math.PI / 2;
        this.plane.mesh.position.set(0, 0.5, 0);
        
    }

    update() {
        if(this.portal) this.portal.update()
        if(this.plane) this.plane.update()

    }
}