import UIManager from './UIManager.js'
import { Transition } from '@unseenco/taxi'


export default class TaxiTransition extends Transition {

    /*
    * Handle the transition leaving the previous page.
    * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
    */
    onLeave({ from, trigger, done }) {
        if ( this.detectView(from) == 'juego' ) {
            experience.appState.reset()
            if (experience.UIManager) experience.UIManager.destroy();
        }
        done()
    }

    /*
    * Handle the transition entering the next page.
    * @param { { to: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
    */
    onEnter({ to, trigger, done }) {
        if ( this.detectView(to) == 'juego' ) {
            experience.UIManager = new UIManager()
        }

        done()
    }

    detectView(viewContainer) {
        if ( viewContainer.id.includes('juego') ) return 'juego';
    }
}