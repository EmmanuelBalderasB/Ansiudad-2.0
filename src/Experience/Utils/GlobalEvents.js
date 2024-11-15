import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class GlobalEvents extends EventEmitter
{
    constructor() {
        super()

        this.experience = new Experience()
        // this.sizes = this.experience.sizes
        // this.scene = this.experience.scene
        // this.canvas = this.experience.canvas

        this.addHandlers();
        this.tester = 'ready!'
    }

    addHandlers() {
        this.on('nextStep', this.goToNextStep.bind(this));
    }

    goToNextStep() {
        this.trigger('appStateNextStep');
    }
}