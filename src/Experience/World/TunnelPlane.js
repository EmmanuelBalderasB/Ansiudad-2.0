import * as THREE from 'three'
import Experience from '../Experience.js'
import planeVertexShader from '../shaders/tunnel/planeVert.glsl'
import planeFragmentShader from '../shaders/tunnel/planeFrag.glsl'

export default class TunnelPlane
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('TunnelPlane')
        }

        this.setMesh()
    }

    setMesh()
    {
        this.geometry = new THREE.PlaneGeometry(1, 1, 32)
        this.material = new THREE.ShaderMaterial({
            vertexShader: planeVertexShader,
            fragmentShader: planeFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uAnimate: { value: 0 },
            }
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.scale.setScalar(2.5)
    }

    update()
    {
        // update uniforms or something
        this.material.uniforms.uAnimate.value = this.time.elapsed * 0.003;
        
    }
}