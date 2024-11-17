import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import Experience from './Experience.js'
import { motionBlurShader } from './Utils/MotionBlur.js'

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.time = this.experience.time

        // Motion blur matrices
        this.previousMatrixWorldInverse = new THREE.Matrix4()
        this.previousProjectionMatrix = new THREE.Matrix4()
        this.previousCameraPosition = new THREE.Vector3()
        this.currentCameraPosition = new THREE.Vector3()
        this.tmpMatrix = new THREE.Matrix4()

        // Motion detection threshold
        this.movementThreshold = 0.0001  // Adjust this value to change sensitivity

        this.setInstance()
        this.setupPostProcessing()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#F6E294')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    setupPostProcessing() {
        // Create render target with depth texture
        this.renderTarget = new THREE.WebGLRenderTarget(
            this.sizes.width,
            this.sizes.height,
            {
                depthBuffer: true,
                depthTexture: new THREE.DepthTexture()
            }
        )

        // Initialize EffectComposer
        this.composer = new EffectComposer(this.instance)

        // Add initial render pass
        this.renderPass = new RenderPass(this.scene, this.camera.instance)
        this.composer.addPass(this.renderPass)

        // Add motion blur pass
        this.motionPass = new ShaderPass(motionBlurShader)
        this.motionPass.enabled = false  // Disabled by default
        this.composer.addPass(this.motionPass)
    }

    isCameraMoving() {
        this.currentCameraPosition.copy(this.camera.instance.position)
        const distance = this.currentCameraPosition.distanceTo(this.previousCameraPosition)
        return distance > this.movementThreshold
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)

        // Update render target and composer
        this.renderTarget.setSize(this.sizes.width, this.sizes.height)
        this.composer.setSize(this.sizes.width, this.sizes.height)
    }

    update() {
        const isMoving = this.isCameraMoving()
        this.motionPass.enabled = isMoving

        // If camera is not moving, just render normally
        if (!isMoving) {
            this.instance.render(this.scene, this.camera.instance)

            // Update previous position even when not moving
            this.previousCameraPosition.copy(this.camera.instance.position)
            return
        }

        // Render scene to target
        this.instance.setRenderTarget(this.renderTarget)
        this.instance.render(this.scene, this.camera.instance)
        this.instance.setRenderTarget(null)

        // Update motion blur uniforms
        this.motionPass.material.uniforms.tColor.value = this.renderTarget.texture
        this.motionPass.material.uniforms.tDepth.value = this.renderTarget.depthTexture
        this.motionPass.material.uniforms.velocityFactor.value = 1
        this.motionPass.material.uniforms.delta.value = this.time.delta

        // Calculate matrices for motion blur
        this.motionPass.material.uniforms.clipToWorldMatrix.value
            .copy(this.tmpMatrix.copy(this.camera.instance.matrixWorldInverse).invert())
            .multiply(this.tmpMatrix.copy(this.camera.instance.projectionMatrix).invert())

        this.motionPass.material.uniforms.previousWorldToClipMatrix.value
            .copy(this.previousProjectionMatrix)
            .multiply(this.previousMatrixWorldInverse)

        // Update camera movement vector
        this.motionPass.material.uniforms.cameraMove.value
            .copy(this.camera.instance.position)
            .sub(this.previousCameraPosition)

        // Render post-processing
        this.composer.render(this.time.delta)

        // Store current values for next frame
        this.previousMatrixWorldInverse.copy(this.camera.instance.matrixWorldInverse)
        this.previousProjectionMatrix.copy(this.camera.instance.projectionMatrix)
        this.previousCameraPosition.copy(this.camera.instance.position)
    }
}