import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.appState = this.experience.appState

        this.setInstance()
        this.setControls()

        this.addHandlers();
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(10, 4, 0)
        this.vectorLookAt = new THREE.Vector3(0, 0, 0)
        this.instance.lookAt(this.vectorLookAt);
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    addHandlers() {
        this.appState.on('stepChange', (newStep) => {
            this.moveToPortalScene();
        });
    }

    moveToPortalScene() {
        console.log('moveToPortalScene');
        gsap.to(this.instance.position, { y: -8, duration: 2, ease: "power4.out" });
        gsap.to(this.vectorLookAt, { y: -10, duration: 1.2, ease: "power4.out" });
    }

    update()
    {
        this.controls.update()
        this.instance.lookAt(this.vectorLookAt);
    }
}