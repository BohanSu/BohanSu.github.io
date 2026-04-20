(function() {
  'use strict';

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.home-section, .topic-card, .entry-card, .project-card, .guide-card, .info-card');

    animatedElements.forEach((el, index) => {
      el.classList.add('animate-on-scroll', 'fade-in-up');
      el.style.animationDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
  }

  function initMetricCounters() {
    const metricCards = document.querySelectorAll('.metric-card strong');

    metricCards.forEach(card => {
      const text = card.textContent.trim();
      const match = text.match(/^(\d+\.?\d*)/);

      if (match) {
        const targetValue = parseFloat(match[1]);
        const isDecimal = text.includes('.');
        const suffix = text.replace(match[1], '').trim();

        let currentValue = 0;
        const increment = targetValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        card.textContent = '0' + (suffix ? ' ' + suffix : '');

        const counter = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(counter);
          }

          const displayValue = isDecimal ? currentValue.toFixed(2) : Math.floor(currentValue);
          card.textContent = displayValue + (suffix ? ' ' + suffix : '');
        }, stepTime);
      }
    });
  }

  function initParallaxEffect() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const hero = document.querySelector('.home-hero');

          if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
          }

          ticking = false;
        });

        ticking = true;
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 100;

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function initCardHoverEffects() {
    const cards = document.querySelectorAll('.topic-card, .entry-card, .project-card');

    cards.forEach(card => {
      card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  function initProgressiveImageLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initSmoothScroll();
        initCardHoverEffects();
        initProgressiveImageLoading();

        setTimeout(() => {
          const metricSection = document.querySelector('.metric-grid');
          if (metricSection) {
            const metricObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  initMetricCounters();
                  metricObserver.unobserve(entry.target);
                }
              });
            }, { threshold: 0.5 });

            metricObserver.observe(metricSection);
          }
        }, 100);

        if (window.innerWidth > 768) {
          initParallaxEffect();
        }
      });
    } else {
      initScrollAnimations();
      initSmoothScroll();
      initCardHoverEffects();
      initProgressiveImageLoading();

      setTimeout(() => {
        const metricSection = document.querySelector('.metric-grid');
        if (metricSection) {
          const metricObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                initMetricCounters();
                metricObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.5 });

          metricObserver.observe(metricSection);
        }
      }, 100);

      if (window.innerWidth > 768) {
        initParallaxEffect();
      }
    }
  }

  init();
})();
