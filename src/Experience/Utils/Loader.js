import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'
export default class Loader extends EventEmitter
{
    constructor() {
        super()
        this.experience = new Experience()
        this.events = this.experience.events
        this.resources = this.experience.resources
        this.resources.on('ready', () => {
            this.destroyLoader()
        })
    }

    destroyLoader() {
        this.loaderContainer = document.getElementById('loader-container');
        this.loaderContainer.style.display = 'none' // Hide the loader
        this.loaderContainer.remove() // Remove the loader from the DOM
        
        // Optionally trigger an event that other parts of the application can listen to
        this.trigger('loaderHidden')
    }
}