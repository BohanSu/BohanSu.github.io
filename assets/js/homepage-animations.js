(function() {
  'use strict';

  const homeRoot = document.querySelector('.home-v4');

  if (!homeRoot) {
    return;
  }

  const SCROLL_PADDING = 18;
  const navLinks = Array.from(document.querySelectorAll('.masthead a[data-section-link]'));

  let sectionObserver;

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

  function initMenuAccessibility() {
    const menuButton = document.querySelector('#site-nav > button');
    const hiddenMenu = document.getElementById('site-nav-hidden-links');

    if (!menuButton || !hiddenMenu) {
      return;
    }

    const syncMenuState = () => {
      const isExpanded = !hiddenMenu.classList.contains('hidden');
      menuButton.setAttribute('aria-expanded', String(isExpanded));
      menuButton.setAttribute(
        'aria-label',
        isExpanded ? menuButton.dataset.closeLabel : menuButton.dataset.openLabel
      );
    };

    new MutationObserver(syncMenuState).observe(hiddenMenu, {
      attributes: true,
      attributeFilter: ['class']
    });
    syncMenuState();
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

  function scrollToSection(target) {
    const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - getHeaderOffset());
    window.scrollTo(0, top);
  }

  function alignInitialHash() {
    const targetId = window.location.hash.slice(1);
    const target = targetId ? document.getElementById(targetId) : null;

    if (!target) {
      return;
    }

    window.requestAnimationFrame(() => scrollToSection(target));
  }

  function initSectionNavigation() {
    const sections = navLinks
      .map((link) => document.getElementById(link.getAttribute('data-section-link')))
      .filter(Boolean);

    if (navLinks.length === 0 || sections.length === 0) {
      return;
    }

    if (window.jQuery) {
      window.jQuery(navLinks).off('click.smoothscroll');
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

        window.history.replaceState(null, '', `${window.location.pathname}#${targetId}`);
        scrollToSection(target);

        const hiddenMenu = document.getElementById('site-nav-hidden-links');
        const menuButton = document.querySelector('#site-nav > button');
        hiddenMenu?.classList.add('hidden');
        menuButton?.classList.remove('close');
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
    initMenuAccessibility();
    initSectionNavigation();
    alignInitialHash();

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
