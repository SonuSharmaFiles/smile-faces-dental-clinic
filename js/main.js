/* ============================================
   SMILE FACES DENTAL CLINIC — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  injectAdvancedElements();
  initPreloader();
  initHeader();
  initMobileNav();
  initScrollReveal();
  initCustomCursor();
  init3DTilt();
  initParallax();
  initSmoothScroll();
  initFAQ();
  initForms();
  initActiveNav();
  initTimeSlots();
});

/* --- Header Scroll Effect --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  if (!hamburger || !navLinks) return;

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleMenu();
    });
  });
}

/* --- Scroll Reveal Animation --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const staggerContainers = document.querySelectorAll('.stagger-children');

  if (!reveals.length) return;

  // Set stagger delays
  staggerContainers.forEach(container => {
    const children = container.querySelectorAll('.reveal');
    children.forEach((child, index) => {
      child.style.setProperty('--delay', `${index * 0.15}s`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerH = document.querySelector('.header')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* --- FAQ Accordion --- */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Toggle clicked
      if (!wasActive) item.classList.add('active');
    });
  });
}

/* --- Form Handling --- */
function initForms() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#ff6b6b';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });

      if (valid) {
        // Show success
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '✓ Submitted Successfully!';
        btn.style.background = 'linear-gradient(135deg, #64ffda, #0d7377)';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }
    });
  });

  // Clear red border on input
  document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = '';
    });
  });
}

/* --- Active Nav Link --- */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Time Slot Selection --- */
function initTimeSlots() {
  document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', () => {
      document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
    });
  });
}

/* ============================================
   ADVANCED ANIMATIONS LOGIC
   ============================================ */

/* --- Inject Advanced Elements --- */
function injectAdvancedElements() {
  // Preloader
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = '<div class="preloader-icon">🦷</div>';
  document.body.prepend(preloader);

  // Background Blobs
  const blobContainer = document.createElement('div');
  blobContainer.className = 'blob-container';
  blobContainer.innerHTML = `
    <div class="ambient-blob blob-1"></div>
    <div class="ambient-blob blob-2"></div>
    <div class="ambient-blob blob-3"></div>
  `;
  document.body.prepend(blobContainer);

  // Custom Cursor (Desktop only)
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (isDesktop) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'custom-cursor-outline';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
  }
}

/* --- Preloader --- */
function initPreloader() {
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 800);
    }
  });
}

/* --- Custom Cursor --- */
function initCustomCursor() {
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return;

  const dot = document.querySelector('.custom-cursor-dot');
  const outline = document.querySelector('.custom-cursor-outline');

  if (!dot || !outline) return;

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    setTimeout(() => {
      outline.style.left = `${posX}px`;
      outline.style.top = `${posY}px`;
    }, 60);
  });

  document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovering'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
  });
}

/* --- 3D Card Tilt --- */
function init3DTilt() {
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return;

  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
  });
}

/* --- Parallax --- */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }, { passive: true });
}
