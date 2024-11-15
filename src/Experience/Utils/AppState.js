import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class AppState extends EventEmitter
{
    constructor() {
        super()

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.totalSteps = 10;

        this.initStepsManager();
    }

    initStepsManager() {
        this.mainButton = document.getElementById('nextStepHelper');
        if (this.mainButton) this.mainButton.addEventListener('click', this.nextStep.bind(this));

        this.stepsVisualizer = document.getElementById('stepsVisualizer');

        this.currentStep = 0;
    }

    nextStep() {
        this.currentStep++;
        this.currentStep %= this.totalSteps;
        this.stepsVisualizer.innerText = this.currentStep;
        
        this.trigger('stepChange', [this.currentStep]);
    }
}