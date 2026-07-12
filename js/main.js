/* ============================================
   LinkedIn-Style Resume Website - Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (isAfterDarkRoute()) {
    activateAfterDark();
    return;
  }
  initAfterDarkListener();
  initSmoothScrolling();
  initActiveNavTracking();
  initScrollAnimations();
});

function isAfterDarkRoute() {
  return window.location.hash === '#ad' || window.location.search.includes('ad=1');
}

function initAfterDarkListener() {
  const secret = 'afterdark';
  let buffer = '';
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    buffer += e.key.toLowerCase();
    if (buffer.length > secret.length) buffer = buffer.slice(-secret.length);
    if (buffer === secret) {
      buffer = '';
      activateAfterDark();
    }
  });
}

function activateAfterDark() {
  document.querySelector('.navbar').style.display = 'none';
  document.querySelector('.profile-header').style.display = 'none';
  document.querySelector('.main-content').style.display = 'none';
  document.querySelector('.footer').style.display = 'none';
  const root = document.getElementById('ad-root');
  root.style.display = 'block';
  document.body.style.background = '#0a0a0a';
  document.title = 'After Dark';
  const s = document.createElement('script');
  s.src = 'js/x9q3rz.js';
  s.onload = () => window._adInit(root);
  document.body.appendChild(s);
}

function initSmoothScrolling() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

function initActiveNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  function updateActiveLink() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
    let currentSection = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollPosition) {
        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateActiveLink();
}

function initScrollAnimations() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.animation = 'none';
    card.style.opacity = '0';
    card.style.transform = 'translateY(12px)';
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  cards.forEach(card => observer.observe(card));
}
