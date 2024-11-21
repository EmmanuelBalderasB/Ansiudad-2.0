import * as THREE from 'three'
import Experience from '../Experience.js'
import planeVertexShader from '../shaders/tunnel/planeVert.glsl'
import planeFragmentShader from '../shaders/tunnel/tunnelBackHigh.glsl'

export default class TunnelPlaneHigh
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('TunnelPlaneHigh')
        }

        this.setTextures()
        this.setMesh()
    }

    setTextures()
    {
        this.textures = {}

        this.textures.tile = this.resources.items.tileCratersTexture13
        // this.textures.tile = this.resources.items.tileMilkyTexture12
        // this.textures.tile.colorSpace = THREE.SRGBColorSpace
        // this.textures.tile.repeat.set(1.5, 1.5)
        this.textures.tile.wrapS = THREE.RepeatWrapping
        this.textures.tile.wrapT = THREE.RepeatWrapping
        this.textures.tile.generateMipmaps = false;
    }

    setMesh()
    {
        this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
        this.material = new THREE.ShaderMaterial({
            vertexShader: planeVertexShader,
            fragmentShader: planeFragmentShader,
            side: THREE.DoubleSide,
            transparent: true,
            uniforms: {
                tMap: { value: this.textures.tile },
                uColor: { value: new THREE.Vector3(0.37, 0.22, 0.51) },
                uAnimate: { value: 0 },
            }
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.scale.setScalar(25)
    }

    update()
    {
        // update uniforms or something
        this.material.uniforms.uAnimate.value = this.time.elapsed * 0.0001;
        
    }
}