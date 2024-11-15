import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class UIManager extends EventEmitter
{
    constructor() {
        super()

        this.experience = new Experience()
        this.events = this.experience.events
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
        if (this.views.length >= 1) this.views[0].classList.add('show');

        this.initTriggers();
    }

    initTriggers() {
        this.nextStepTriggers = [];
        this.goToLLamaTriggers = [];

        this.startButton = document.getElementById('firstStepBtn');
        this.nextStepTriggers.push(this.startButton);
        const nextButtons = document.querySelectorAll('.goToNextStepBtn');
        nextButtons.forEach(element => { this.nextStepTriggers.push(element) });
        this.nextStepTriggers.forEach(element => { 
            element.addEventListener('click', this.fireNextStep.bind(this));
        });

        const goToLlamaBtns = document.querySelectorAll('.goToLlamaGeneration');
        goToLlamaBtns.forEach(element => { this.goToLLamaTriggers.push(element) });
        this.goToLLamaTriggers.forEach(element => { 
            element.addEventListener('click', this.fireLlamaStep.bind(this));
        });
    }

    fireNextStep() {
        this.events.trigger('nextStep');
    }
    
    fireLlamaStep() {
        this.events.trigger('goToStep', [5]);
    }


    addHandlers() {
        this.appState.on('stepChange', (newStep) => {
            this.switchViews(newStep);
        });
    }

    switchViews(newStep) {
        this.handleLlamaHelper(newStep);
        this.views[this.currentView].classList.remove('show');
        this.views[this.currentView].classList.remove('noBlur');
        this.views[newStep].classList.add('show');
        setTimeout(_ => {
            this.views[newStep].classList.add('noBlur');
        }, 200);

        this.currentView = newStep;

        // TODO:
        // Emma, todo este "if" hay que quitarlo cuando termines de conectar Llama. En cuanto recibamos la respuesta de Llama, ponlo en el HTML y disparas la function
            // this.events.trigger('nextStep');
        // para continuar con el flujo de la experiencia.
        if (newStep == 6) {
            setTimeout(_ => {
                this.events.trigger('nextStep');
            }, 2000);
        }
    }

    handleLlamaHelper(newStep) {
        const element = document.getElementById('llama-helper');
        if (element) {
            if (newStep == 0) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        }
    }
}