import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'
import sendPromptToGroq from './sendPromptToGroq.js'
export default class UIManager extends EventEmitter {
    constructor() {
        super()

        this.experience = new Experience()
        this.events = this.experience.events
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.appState = this.experience.appState
        this.currentView = this.appState.currentStep
        this.response = null
        this.initUI();

        this.addHandlers();

        this.showInputNumber();
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
            const submitButton = document.querySelector('#submit');
            portalScene.isActivated = false;
            tunnelScene.isActivated = true;
            submitButton.addEventListener('click', this.sendPrompt);
        }

        /* console.log({
            'City Scene': this.experience.world.CityScene.isActivated,
            'Portal Scene': this.experience.world.PortalScene.isActivated,
            'Tunnel Scene': this.experience.world.TunnelScene.isActivated,
            step: newStep
        }); */
    }
    async sendPrompt(e) {
        e.preventDefault();
        try {
            // Validate the input fields that should exist when submitting
            const numOfTeamsField = document.querySelector('#number-of-teams');
            const numOfPlayersField = document.querySelector('#number-of-roles');
            const inputField = document.querySelector('#theme-input');

            if (!numOfTeamsField || !numOfPlayersField || !inputField) {
                console.error('Required input fields not found', {
                    numOfTeamsField,
                    numOfPlayersField,
                    inputField,
                });
                return;
            }

            const prompt = inputField.value.trim();
            const _numberOfTeams = numOfTeamsField.value;
            const _numberOfRoles = numOfPlayersField.value;

            console.log('Input values:', { prompt, _numberOfTeams, _numberOfRoles });

            console.log('Sending prompt to server...');
            const response = await sendPromptToGroq(prompt, _numberOfTeams, _numberOfRoles);
            console.log('Received response:', response);

            if (!response || !response.data) {
                throw new Error('Invalid response format from server');
            }

            // Store response and update scenes
            this.response = response;
            console.log('Stored response in this.response');

            if (await response.data.events) {
                console.log('Events found in response:', this.response.data.events);
                // Change to step 7
                this.events.trigger('goToStep', [7]);
                console.log('Triggered goToStep with step 7');

                const cityScene = this.experience.world.CityScene;
                const tunnelScene = this.experience.world.TunnelScene;

                cityScene.isActivated = true;
                tunnelScene.isActivated = false;

                // Now the new step should be rendered, check for display elements
                const eventBox = document.querySelector('#llama-event');
                const rolesBox = document.querySelector('#llama-roles');

                if (eventBox) {
                    console.log('Found eventBox, rendering events');
                    eventBox.innerHTML = '';
                    console.log(typeof this.response.data.events)
                    this.response.data.events.events.forEach(event => {
                        if (event && event.title && event.description) {
                            console.log('Rendering event:', event);
                            const eventContainer = document.createElement('div');

                            const eventTitle = document.createElement('h3');
                            eventTitle.textContent = event.title;
                            eventContainer.appendChild(eventTitle);

                            const eventDescription = document.createElement('p');
                            eventDescription.textContent = event.description;
                            eventContainer.appendChild(eventDescription);

                            eventBox.appendChild(eventContainer);
                        } else {
                            console.warn('Encountered an event with missing properties:', event);
                        }
                    });
                } else {
                    console.warn('eventBox element not found');
                }

                if (rolesBox && this.response.data.roles) {
                    console.log('Found rolesBox, rendering roles:', this.response.data.roles);
                    rolesBox.innerHTML = '';
                    this.response.data.roles.roles.forEach(role => {
                        if (role && (role.name || role.title)) {
                            console.log('Rendering role:', role);
                            const roleContainer = document.createElement('div');

                            const roleTitle = document.createElement('h3');
                            roleTitle.textContent = role.name || role.title;
                            roleContainer.appendChild(roleTitle);

                            const rolePriorities = document.createElement('p');
                            rolePriorities.textContent = role.priorities || role.prioridades || '';
                            roleContainer.appendChild(rolePriorities);

                            rolesBox.appendChild(roleContainer);
                        } else {
                            console.warn('Encountered a role with missing properties:', role);
                        }
                    });
                }
            } else {
                console.warn('No events found in the response');
            }
        } catch (error) {
            console.error('Error processing response:', error);
            this.events.trigger('goToStep', [0]);
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

    showInputNumber() {
        const numOfTeamsField = document.querySelector('#number-of-teams');
        const teamNumber = document.querySelector('#team-number');
        const numOfPlayersField = document.querySelector('#number-of-roles');
        const playerNumber = document.querySelector('#role-number');

        teamNumber.textContent = numOfTeamsField.value;
        playerNumber.textContent = numOfPlayersField.value;

        numOfTeamsField.addEventListener('change', (e) => {
            console.log('Number of teams:', e.target.value);
            teamNumber.textContent = e.target.value;
        })
        numOfPlayersField.addEventListener('change', (e) => {
            console.log('Number of players:', e.target.value);
            playerNumber.textContent = e.target.value;
        })
    }

    destroy() {
        this.destroyed = true;
    }
}
//test