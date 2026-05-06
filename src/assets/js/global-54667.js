(function() {
  const init = () => {
    // Mobile menu toggle
    const toggleButtons = document.querySelectorAll('.mobile-menu-toggle');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const nav = btn.closest('nav');
        const menu = nav.querySelector('.mobile-menu');
        if (menu) {
          menu.classList.toggle('hidden');
        }
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu if open
          const menu = document.querySelector('.mobile-menu');
          if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
          }
        }
      });
    });

    // Staggered reveal on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.reveal-item');
          if (children.length > 0) {
            children.forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, i * 80);
            });
          } else {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Apply reveal styles to feature cards and steps
    const featureCards = document.querySelectorAll('#features .grid > div');
    featureCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.classList.add('reveal-item');
    });

    const featureGrid = document.querySelector('#features .grid.md\\:grid-cols-2');
    if (featureGrid) {
      revealObserver.observe(featureGrid);
    }

    const stepCards = document.querySelectorAll('#how-it-works .grid > div');
    stepCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.classList.add('reveal-item');
    });

    const stepsGrid = document.querySelector('#how-it-works .grid.md\\:grid-cols-2');
    if (stepsGrid) {
      revealObserver.observe(stepsGrid);
    }

    // Stats counter animation
    const statsSection = document.querySelector('#how-it-works .grid.md\\:grid-cols-2.lg\\:grid-cols-4:last-of-type');
    if (statsSection) {
      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.font-heading.text-3xl');
            statValues.forEach(el => {
              const finalText = el.textContent;
              const numMatch = finalText.match(/[\d,]+\.?\d*/)
              if (numMatch) {
                const finalNum = parseFloat(numMatch[0].replace(',', ''));
                const suffix = finalText.replace(numMatch[0], '');
                const hasComma = numMatch[0].includes(',');
                const hasDecimal = numMatch[0].includes('.');
                const decimalPlaces = hasDecimal ? numMatch[0].split('.')[1].length : 0;
                let current = 0;
                const duration = 1200;
                const startTime = performance.now();
                const animate = (now) => {
                  const elapsed = now - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const eased = 1 - Math.pow(1 - progress, 3);
                  current = finalNum * eased;
                  let display = hasDecimal ? current.toFixed(decimalPlaces) : Math.round(current).toString();
                  if (hasComma) {
                    display = Number(hasDecimal ? current.toFixed(decimalPlaces) : Math.round(current)).toLocaleString();
                  }
                  el.textContent = display + suffix;
                  if (progress < 1) {
                    requestAnimationFrame(animate);
                  } else {
                    el.textContent = finalText;
                  }
                };
                requestAnimationFrame(animate);
              }
            });
            statObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      statObserver.observe(statsSection);
    }

    // Button press feedback
    document.querySelectorAll('a[class*="bg-zinc-900"], a[class*="bg-blue-600"]').forEach(btn => {
      btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.97)';
      });
      btn.addEventListener('mouseup', () => {
        btn.style.transform = 'scale(1)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();