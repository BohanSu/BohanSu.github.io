(function() {
  'use strict';

  const homeRoot = document.querySelector('.home-v4');

  if (!homeRoot) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SCROLL_PADDING = 18;
  const navLinks = Array.from(document.querySelectorAll('.masthead a[data-section-link]'));

  let sectionObserver;

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

  function getHeaderOffset() {
    const masthead = document.querySelector('.masthead');

    if (!masthead) {
      return 24;
    }

    return masthead.getBoundingClientRect().height + SCROLL_PADDING;
  }

  function syncScrollOffset() {
    document.documentElement.style.setProperty('--home-scroll-offset', `${getHeaderOffset()}px`);
  }

  function setActiveNavLink(sectionId) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('data-section-link') === sectionId;
      link.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function initSectionNavigation() {
    const sections = navLinks
      .map((link) => document.getElementById(link.getAttribute('data-section-link')))
      .filter(Boolean);

    if (navLinks.length === 0 || sections.length === 0) {
      return;
    }

    navLinks.forEach((link) => {
      if (link.dataset.sectionBound === 'true') {
        return;
      }

      link.dataset.sectionBound = 'true';
      link.addEventListener('click', (event) => {
        const url = new URL(link.href, window.location.origin);
        const hashIndex = url.hash.indexOf('#');

        if (url.pathname !== window.location.pathname || hashIndex === -1) {
          return;
        }

        const targetId = url.hash.slice(hashIndex + 1);
        const target = document.getElementById(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        const top = window.scrollY + target.getBoundingClientRect().top - getHeaderOffset();

        window.history.replaceState(null, '', `${window.location.pathname}#${targetId}`);
        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    });

    if (typeof IntersectionObserver === 'undefined') {
      const fallbackId = window.location.hash ? window.location.hash.slice(1) : sections[0].id;
      setActiveNavLink(fallbackId);
      return;
    }

    if (sectionObserver) {
      sectionObserver.disconnect();
    }

    sectionObserver = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries.length > 0) {
        setActiveNavLink(visibleEntries[0].target.id);
      }
    }, {
      rootMargin: `-${getHeaderOffset()}px 0px -45% 0px`,
      threshold: [0.2, 0.35, 0.55]
    });

    sections.forEach((section) => sectionObserver.observe(section));

    const initialId = window.location.hash ? window.location.hash.slice(1) : sections[0].id;
    setActiveNavLink(initialId);
  }

  function init() {
    syncScrollOffset();
    initReveals();
    initSpotlightCards();
    initSectionNavigation();

    window.addEventListener('resize', () => {
      syncScrollOffset();
      initSectionNavigation();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
