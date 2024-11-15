import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class UIManager extends EventEmitter
{
    constructor() {
        super()

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.appState = this.experience.appState

        this.addHandlers();
    }

    addHandlers() {
        this.appState.on('stepChange', (newStep) => {
            this.switchViews(newStep);
        });
    }

    switchViews(currentStep) {
        let viewId = currentStep;
        console.log('view to show', viewId);
        
    }
}