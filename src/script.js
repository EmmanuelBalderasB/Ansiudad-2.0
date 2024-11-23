
import Experience from './Experience/Experience.js'
import { inject } from "@vercel/analytics"
import { injectSpeedInsights } from '@vercel/speed-insights';
inject();
injectSpeedInsights();
let experience = null
if (window.location.pathname.includes('juego') && !experience) {
    experience = new Experience(document.querySelector('canvas.webgl'))
}

if (experience && !window.location.pathname.includes('juego')) {
    experience.destroy();
}