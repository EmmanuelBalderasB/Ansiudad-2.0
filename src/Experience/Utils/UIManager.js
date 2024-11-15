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
        this.currentView = this.appState.currentStep

        this.initUI();

        this.addHandlers();
    }

    initUI() {
        this.views = document.querySelectorAll('.slideContainer');
        this.views[0].classList.add('show');
    }

    addHandlers() {
        this.appState.on('stepChange', (newStep) => {
            this.switchViews(newStep);
        });
    }

    switchViews(newStep) {
        this.views[this.currentView].classList.remove('show');
        this.views[this.currentView].classList.remove('noBlur');
        this.views[newStep].classList.add('show');
        setTimeout(_ => {
            this.views[newStep].classList.add('noBlur');
        }, 200);

        this.currentView = newStep;
    }
}