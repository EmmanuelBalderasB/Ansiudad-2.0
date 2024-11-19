
import Experience from './Experience/Experience.js'
import { inject } from "@vercel/analytics"
import { injectSpeedInsights } from '@vercel/speed-insights';
inject();
injectSpeedInsights();
const experience = new Experience(document.querySelector('canvas.webgl'))