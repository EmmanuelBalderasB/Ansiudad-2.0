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

        // Bind the method to preserve context
        this.sendPrompt = this.sendPrompt.bind(this);
    }

    initUI() {
        this.views = document.querySelectorAll('.slideContainer');
        if (this.views.length >= 1) {
            this.views.forEach((view, idx) => {
                if (idx == 0) view.classList.add('show');
                else view.classList.remove('show');
            });
        }

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
            if (this.destroyed) return;
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

        const cityScene = this.experience.world.CityScene;
        const portalScene = this.experience.world.PortalScene;
        const tunnelScene = this.experience.world.TunnelScene;

        // Deactivate city scene and activate portal scene
        if (newStep == 3) {
            cityScene.isActivated = false;
            portalScene.isActivated = true;
        }
        // Deactivate portal scene and activate tunnel scene
        if (newStep == 5) {
            portalScene.isActivated = false;
            tunnelScene.isActivated = true;
            const submitButton = document.getElementById('submit');
            submitButton.addEventListener('click', this.sendPrompt);
        }

        console.log({
            'City Scene': this.experience.world.CityScene.isActivated,
            'Portal Scene': this.experience.world.PortalScene.isActivated,
            'Tunnel Scene': this.experience.world.TunnelScene.isActivated,
            step: newStep
        });
    }
    async sendPrompt(e) {
        e.preventDefault();
        console.log('Button clicked');

        const numOfTeamsField = document.querySelector('#number-of-teams');
        const numOfPlayersField = document.querySelector('#number-of-roles');
        const inputField = document.querySelector('#theme-input');
        const eventBox = document.querySelector('#llama-event');
        const rolesBox = document.querySelector('#llama-roles');

        const prompt = inputField.value.trim();
        const _numberOfTeams = numOfTeamsField.value;
        const _numberOfRoles = numOfPlayersField.value;

        try {
            const response = await fetch('https://h3lv2miu1x1kda-3000.proxy.runpod.net/api/generate/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    numberOfTeams: _numberOfTeams,
                    numberOfRoles: _numberOfRoles,
                })
            });

            console.log('Response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Response data:', responseData);

            // Update the UI with the response
            if (eventBox) {
                eventBox.innerHTML = '';
                for (let i = 0; i < responseData.data.events.length; i++) {
                    const event = responseData.data.events[i];
                    const eventContainer = document.createElement('div');

                    const eventTitle = document.createElement('h3');
                    eventTitle.textContent = event.title;
                    eventContainer.appendChild(eventTitle);

                    const eventDescription = document.createElement('p');
                    eventDescription.textContent = event.description;
                    eventContainer.appendChild(eventDescription);

                    eventBox.appendChild(eventContainer);
                }

                if (rolesBox) {
                    rolesBox.innerHTML = '';
                    for (let i = 0; i < responseData.data.roles.length; i++) {
                        const role = responseData.data.roles[i];
                        const roleContainer = document.createElement('div');

                        const roleTitle = document.createElement('h3');
                        roleTitle.textContent = role.name;
                        roleContainer.appendChild(roleTitle);

                        const rolePriorities = document.createElement('p');
                        rolePriorities.textContent = role.priorities || role.prioridades;
                        roleContainer.appendChild(rolePriorities);

                        rolesBox.appendChild(roleContainer);
                    }
                }
            }

            // Store response and trigger next step
            this.response = responseData;

            // Check if we have a valid response before proceeding
            if (this.response) {
                const cityScene = this.experience.world.CityScene;
                const tunnelScene = this.experience.world.TunnelScene;

                // Update scene states
                cityScene.isActivated = true;
                tunnelScene.isActivated = false;

                // Trigger step 6
                this.events.trigger('goToStep', [7]);
            }

        } catch (error) {
            console.error('Error processing response:', error);

            this.events.trigger('goToStep', [0]);
            if (eventBox) {
                eventBox.textContent = 'Error: Failed to process response';
            }
        }
    }

    handleLlamaHelper(newStep) {
        const element = document.getElementById('llama-helper');
        if (element) {
            if (newStep == 0) {
                if (!this.response) {
                    element.style.display = 'block';
                    console.log('error');
                    element.textContent = 'Error: Failed to process response, please refresh the page and try again';
                    element.style.color = 'red';
                } else {
                    element.style.display = 'flex';
                }
            } else {
                element.style.display = 'none';
            }
        }
    }

    destroy() {
        this.destroyed = true;
    }
}
//test