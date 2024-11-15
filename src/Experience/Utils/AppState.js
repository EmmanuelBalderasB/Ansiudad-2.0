import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class AppState extends EventEmitter
{
    constructor() {
        super()

        this.experience = new Experience()
        this.events = this.experience.events
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.totalSteps = 8;

        this.initStepsManager();
        this.addHandlers();
    }

    reset() {
        this.currentStep = 0;
        this.trigger('stepChange', [this.currentStep]);
    }

    addHandlers() {
        this.events.on('appStateNextStep', this.nextStep.bind(this));
        this.events.on('appStateStep', this.goToStep.bind(this));
    }

    initStepsManager() {
        this.mainButton = document.getElementById('nextStepHelper');
        if (this.mainButton) this.mainButton.addEventListener('click', this.nextStep.bind(this));

        // this.stepsVisualizer = document.getElementById('stepsVisualizer');

        this.currentStep = 0;
    }

    nextStep() {
        console.log('nextStep start', this.currentStep);
        
        this.currentStep++;
        this.currentStep %= this.totalSteps;
        // this.stepsVisualizer.innerText = this.currentStep;

        console.log('nextStep end', this.currentStep);
        this.trigger('stepChange', [this.currentStep]);
    }

    goToStep(step) {
        this.currentStep = step;
        this.currentStep %= this.totalSteps;
        // this.stepsVisualizer.innerText = this.currentStep;
        
        this.trigger('stepChange', [this.currentStep]);
    }
}