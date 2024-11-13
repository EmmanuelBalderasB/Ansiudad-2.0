import BaseScene from './BaseScene.js'
import Portal from '../Portal.js'
import PortalPlane from '../PortalPlane.js'

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
        this.plane = new PortalPlane()
        this.group.add(this.plane.mesh)
        this.plane.mesh.rotation.y = Math.PI / 2;
        this.plane.mesh.position.set(1, 0.5, 1);
        
    }

    update() {
        if(this.portal) this.portal.update()
        if(this.plane) this.plane.update()

    }
}