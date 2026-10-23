/* Optional navigation enhancement. Content and links work without JavaScript. */
(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const links = Array.from(document.querySelectorAll('[data-section-link]'));
  const sections = links.map(link => document.getElementById(link.dataset.sectionLink)).filter(Boolean);
  if (!header || !sections.length) return;
  let pending = false;
  let headerHeight = header.getBoundingClientRect().height;
  const update = () => {
    pending = false;
    let current = null;
    const ordered = [...sections].sort((a, b) => a.offsetTop - b.offsetTop);
    for (const section of ordered) {
      if (section.getBoundingClientRect().top <= headerHeight + 90) current = section.id;
    }
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = ordered[ordered.length - 1].id;
    }
    links.forEach(link => {
      if (link.dataset.sectionLink === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  };
  const measure = () => {
    headerHeight = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--home-scroll-offset', `${headerHeight + 24}px`);
    schedule();
  };
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(header);
  else window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('pageshow', measure);
  measure();
})();
