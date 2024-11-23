import { preloadImages } from './main-utils.js';
import { StackMotionEffect as StackMotionEffect1 } from '/js/effect-1/stackMotionEffect1.js';
import { StackMotionEffect as StackMotionEffect2 } from '/js/effect-2/stackMotionEffect2.js';
import { StackMotionEffect as StackMotionEffect3 } from '/js/effect-3/stackMotionEffect3.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

//Cartas 
gsap.registerPlugin(ScrollTrigger);

const init = () => {
  document.querySelectorAll('[data-stack-1]').forEach((stackEl) => {
    new StackMotionEffect1(stackEl);
  });
  document.querySelectorAll('[data-stack-2]').forEach((stackEl) => {
    new StackMotionEffect2(stackEl);
  });
  document.querySelectorAll('[data-stack-3]').forEach((stackEl) => {
    new StackMotionEffect3(stackEl);
  });

  const introCards = document.querySelectorAll('.intro .card');
  introCards.forEach(introCard => {
    gsap.to(introCard, {
      ease: 'power1.in',
      startAt: {
        transformOrigin: '100% 50%'
      },
      rotationX: () => -60,
      yPercent: () => gsap.utils.random(-100,0),
      z: () => gsap.utils.random(-100,0),
      scrollTrigger: {
        trigger: introCard,
        start: 'clamp(top bottom)',
        end: 'clamp(bottom top)',
        scrub: true,
      }
    });
  });
};


preloadImages('.grid__img').then(() => {
  document.body.classList.remove('loading');
  init();
});

//Gallery

const galleryImages = document.querySelectorAll('.gallery img');
const fullscreenOverlay = document.getElementById('fullscreenOverlay');
const fullscreenImage = document.getElementById('fullscreenImage');

galleryImages.forEach((img) => {
  img.addEventListener('click', () => {
    fullscreenImage.src = img.src; 
    fullscreenOverlay.classList.add('show');
  });
});

fullscreenOverlay.addEventListener('click', () => {
  fullscreenOverlay.classList.remove('show');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    fullscreenOverlay.classList.remove('show');
  }
});

// Loading video
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const video = document.getElementById("backgroundVideo");


// Oculta el loader cuando el video está listo para reproducirse
  video.addEventListener("loadeddata", () => {
    loader.classList.add("hidden");
  });
});