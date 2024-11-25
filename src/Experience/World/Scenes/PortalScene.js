import * as THREE from 'three'
import BaseScene from './BaseScene.js'
import Portal from '../Portal.js'
import PortalFrontPlane from '../PortalFrontPlane.js'
import PortalInsidePlane from '../PortalInsidePlane.js'

export default class PortalScene extends BaseScene {
    constructor() {
        super('PortalScene')
        this.initScene();
    }

    initScene() {
        // Portal 3D model
        this.portal = new Portal()
        this.floatingGroup = new THREE.Group()
        this.floatingGroup.add(this.portal.model)
        this.group.add(this.floatingGroup)
        

        // Front glow FX
        this.frontPlane = new PortalFrontPlane()
        this.floatingGroup.add(this.frontPlane.mesh)
        this.frontPlane.mesh.scale.setScalar(5)
        this.frontPlane.mesh.rotation.y = Math.PI / 2;
        this.frontPlane.mesh.position.set(-1.5, 0.5, 0);

        // Inside FX
        this.insidePlane = new PortalInsidePlane()
        this.floatingGroup.add(this.insidePlane.mesh)
        this.insidePlane.mesh.scale.setScalar(7)
        this.insidePlane.mesh.rotation.y = Math.PI / 2;
        this.insidePlane.mesh.position.set(0, 0.5, 0);

    }

    update() {
        if(this.portal) this.portal.update()
        if(this.frontPlane) this.frontPlane.update()
        if(this.insidePlane) this.insidePlane.update()
        
        this.floatingGroup.position.y = Math.sin(this.time.elapsed * 0.0015) * 0.15 - 0.1;
    }
}