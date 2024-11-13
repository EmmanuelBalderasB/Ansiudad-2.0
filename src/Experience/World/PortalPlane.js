import * as THREE from 'three'
import Experience from '../Experience.js'
import testVertexShader from '../shaders/test/vertex.glsl'
import testFragmentShader from '../shaders/test/fragment.glsl'

export default class PortalPlane
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('PortalPlane')
        }

        this.setMesh()
    }

    setMesh()
    {
        this.geometry = new THREE.PlaneGeometry(1, 1, 32)
        this.material = new THREE.ShaderMaterial({
            vertexShader: testVertexShader,
            fragmentShader: testFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uAnimate: { value: 0 },
            }
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }

    update()
    {
        // update uniforms or something
        this.material.uniforms.uAnimate.value = this.time.elapsed * 0.003;
        
    }
}