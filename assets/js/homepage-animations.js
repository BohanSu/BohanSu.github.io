(function() {
  'use strict';

  const homeRoot = document.querySelector('.home-v4');

  if (!homeRoot) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(element) {
    const target = parseFloat(element.dataset.counter);

    if (!Number.isFinite(target)) {
      return;
    }

    const prefix = element.dataset.counterPrefix || '';
    const suffix = element.dataset.counterSuffix || '';
    const decimals = (element.dataset.counter || '').includes('.') ? 2 : 0;
    const duration = 1200;
    const start = performance.now();

    function render(value) {
      const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value);
      element.textContent = prefix + rounded + suffix;
    }

    if (prefersReducedMotion) {
      render(target);
      return;
    }

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      render(target * eased);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

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

  function initCounters() {
    const counterItems = Array.from(homeRoot.querySelectorAll('[data-counter]'));

    if (counterItems.length === 0) {
      return;
    }

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      counterItems.forEach(animateCounter);
      return;
    }

    const seen = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.65
    });

    counterItems.forEach(item => observer.observe(item));
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
    initCounters();
    initSpotlightCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
