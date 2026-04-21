(function() {
  'use strict';

  const homeRoot = document.querySelector('.home-v4');

  if (!homeRoot) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveals() {
    const revealItems = Array.from(homeRoot.querySelectorAll('[data-reveal]'));

    if (revealItems.length === 0) {
      return;
    }

    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-order', index);
    });

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealItems.forEach(item => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(item => observer.observe(item));
  }

  function initSpotlightCards() {
    if (prefersReducedMotion) {
      return;
    }

    const cards = homeRoot.querySelectorAll('.surface-card');

    cards.forEach(card => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty('--spotlight-x', `${x}%`);
        card.style.setProperty('--spotlight-y', `${y}%`);
      });
    });
  }

  function init() {
    initReveals();
    initSpotlightCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
