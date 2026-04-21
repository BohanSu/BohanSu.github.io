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
    const animatedElements = document.querySelectorAll('.home-section, .pub-item, .project-item, .news-item, .background-item');

    animatedElements.forEach((el, index) => {
      el.classList.add('animate-on-scroll');
      el.style.setProperty('--stagger-index', index);
      observer.observe(el);
    });
  }

  function initStatCounters() {
    const statItems = document.querySelectorAll('.stat-item strong');

    statItems.forEach(item => {
      const text = item.textContent.trim();
      const match = text.match(/^(\d+\.?\d*)/);

      if (match) {
        const targetValue = parseFloat(match[1]);
        const isDecimal = text.includes('.');
        const suffix = text.replace(match[1], '').trim();

        let currentValue = 0;
        const increment = targetValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        item.textContent = '0' + (suffix ? ' ' + suffix : '');

        const counter = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(counter);
          }

          const displayValue = isDecimal ? currentValue.toFixed(2) : Math.floor(currentValue);
          item.textContent = displayValue + (suffix ? ' ' + suffix : '');
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
          const hero = document.querySelector('.home-hero-simple');

          if (hero && scrolled < window.innerHeight * 1.5) {
            const translateY = scrolled * 0.15;
            const opacity = Math.max(0.7, 1 - (scrolled / window.innerHeight) * 0.3);
            hero.style.transform = `translateY(${translateY}px)`;
            hero.style.opacity = opacity;
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
    const cards = document.querySelectorAll('.topic-card, .entry-card, .project-card, .pub-item, .news-item');

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
          const statBoxes = document.querySelectorAll('.highlight-box');
          if (statBoxes.length > 0) {
            const statObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  initStatCounters();
                  statObserver.unobserve(entry.target);
                }
              });
            }, { threshold: 0.5 });

            statBoxes.forEach(box => statObserver.observe(box));
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
        const statBoxes = document.querySelectorAll('.highlight-box');
        if (statBoxes.length > 0) {
          const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                initStatCounters();
                statObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.5 });

          statBoxes.forEach(box => statObserver.observe(box));
        }
      }, 100);

      if (window.innerWidth > 768) {
        initParallaxEffect();
      }
    }
  }

  init();
})();
