
/*!
* Start Bootstrap - New Age v6.0.7 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT
*/
 
// ==============================
// CONFIGURACIÓN SCROLL SEQUENCE
// Cambiá las rutas de las imágenes acá (limité a 3 frames):
// ==============================
const IMAGES = [
  './assets/img/Impresora-1.png',
  './assets/img/impresora_imprimiendo.png',
  './assets/img/foto.png',
];

const BG_COLOR = '#02043F'; // color de fondo de la sección scroll
 
 
window.addEventListener('DOMContentLoaded', function () {
 
  // ==============================
  // 1. Bootstrap ScrollSpy
  //    rootMargin reemplaza offset (deprecado en Bootstrap 5.2+)
  // ==============================
  const mainNav = document.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -74px 0px',
    });
  }
 
  // ==============================
  // 2. Cerrar navbar en mobile al hacer clic en un link
  // ==============================
  const navbarToggler = document.querySelector('.navbar-toggler');
  const responsiveNavItems = Array.from(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
 
  responsiveNavItems.forEach(function (navItem) {
    navItem.addEventListener('click', function () {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });
 
  // ==============================
  // 3. Scroll Sequence
  //    CORRECCIÓN: movido dentro de DOMContentLoaded
  //    CORRECCIÓN: null-check en dotsWrap
  // ==============================
  const section  = document.getElementById('seqSection');
  const frames   = document.getElementById('seqFrames');
  const dotsWrap = document.getElementById('seqDots');
 
  // CORRECCIÓN: se verifica dotsWrap también
  if (!section || !frames || !dotsWrap) return;
 
  section.style.background = BG_COLOR;
 
  // Crear frames con precarga eager para evitar flashes
  IMAGES.forEach(function (src, i) {
    const el = document.createElement('img');
    el.src     = src;
    el.alt     = 'Frame ' + (i + 1);
    el.loading = 'eager'; // CORRECCIÓN: precarga inmediata
    el.className = 'seq-frame' + (i === 0 ? ' active' : '');
    frames.appendChild(el);
  });
 
  // Crear dots
  IMAGES.forEach(function (_, i) {
    const dot = document.createElement('div');
    dot.className = 'seq-dot' + (i === 0 ? ' active' : '');
    dotsWrap.appendChild(dot);
  });
 
  const allFrames = frames.querySelectorAll('.seq-frame');
  const allDots   = dotsWrap.querySelectorAll('.seq-dot');
  let current = 0;
 
  function setFrame(idx) {
    if (idx === current) return;
    allFrames[current].classList.remove('active');
    allDots[current].classList.remove('active');
    current = idx;
    allFrames[current].classList.add('active');
    allDots[current].classList.add('active');
  }
 
  window.addEventListener('scroll', function () {
    const rect     = section.getBoundingClientRect();
    const total    = section.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    if (scrolled < 0 || scrolled > total) return;
    const idx = Math.min(
      Math.floor((scrolled / total) * IMAGES.length),
      IMAGES.length - 1
    );
    setFrame(idx);
  }, { passive: true });
 
 
  // ==============================
  // 4. Feature cards — flip al click
  // ==============================
  const featureCards = document.querySelectorAll('.feature-card');
 
  featureCards.forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
    });
  });
 
});
