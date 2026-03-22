(() => {
  'use strict';

  // --- Scroll Reveal with stagger ---
  const revealElements = document.querySelectorAll('[data-reveal]');
  let lastRevealTime = 0;

  const revealObserver = new IntersectionObserver((entries) => {
    const toReveal = entries.filter(e => e.isIntersecting);
    toReveal.forEach((entry, i) => {
      const now = Date.now();
      const stagger = now - lastRevealTime < 300 ? i * 120 : 0;
      setTimeout(() => {
        entry.target.classList.add('revealed');
        lastRevealTime = Date.now();
      }, stagger);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Floating Petals ---
  const petalsContainer = document.getElementById('petals-container');
  const isMobile = window.innerWidth < 768;
  const PETAL_COUNT = isMobile ? 12 : 20;

  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const startX = Math.random() * 100;
    const size = 8 + Math.random() * 12;
    const duration = 6 + Math.random() * 8;
    const delay = Math.random() * duration;
    const drift = -30 + Math.random() * 60;
    const rotation = Math.random() * 360;
    const opacity = 0.3 + Math.random() * 0.4;

    petal.style.setProperty('--start-x', `${startX}vw`);
    petal.style.setProperty('--drift', `${drift}px`);
    petal.style.setProperty('--size', `${size}px`);
    petal.style.setProperty('--duration', `${duration}s`);
    petal.style.setProperty('--delay', `-${delay}s`);
    petal.style.setProperty('--rotation', `${rotation}deg`);
    petal.style.setProperty('--opacity', opacity);

    petalsContainer.appendChild(petal);
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    createPetal();
  }

  // --- Touch/Click Petal Burst ---
  function createBurstPetal(x, y) {
    const petal = document.createElement('div');
    petal.classList.add('petal', 'petal--burst');

    const size = 6 + Math.random() * 8;
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 60;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    petal.style.left = `${x}px`;
    petal.style.top = `${y}px`;
    petal.style.setProperty('--size', `${size}px`);
    petal.style.setProperty('--dx', `${dx}px`);
    petal.style.setProperty('--dy', `${dy}px`);
    petal.style.setProperty('--rotation', `${Math.random() * 360}deg`);

    document.body.appendChild(petal);

    petal.addEventListener('animationend', () => petal.remove());
  }

  document.addEventListener('click', (e) => {
    const count = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      createBurstPetal(e.clientX, e.clientY);
    }
  });

  // --- Garden flower stagger ---
  const gardenFlowers = document.querySelectorAll('.garden__flower');
  const gardenObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Array.from(gardenFlowers).indexOf(entry.target) * 150;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('revealed');
        gardenObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  gardenFlowers.forEach(el => gardenObserver.observe(el));
})();
