import * as THREE from 'three'
import Experience from '../Experience.js'
import planeVertexShader from '../shaders/tunnel/planeVert.glsl'
import planeFragmentShader from '../shaders/tunnel/planeFrag.glsl'


export default class Cone {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('portal-cone')
        }

        // Resource
        this.resource = this.resources.items.portalModelCone

        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.setScalar(12)
        this.model.rotation.z = Math.PI / 2;
        this.model.rotation.y = Math.PI / -2;
        this.model.position.z = 7;


        this.material = new THREE.ShaderMaterial({
            vertexShader: planeVertexShader,
            fragmentShader: planeFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uAnimate: { value: 0 },
            }
        })
        
        
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = this.material
            }
        })
    }

    update() {
        // update uniforms or something
        this.material.uniforms.uAnimate.value = this.time.elapsed * 0.003;
    }
}