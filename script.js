/* UyoXpress — app.js */

// ===========================
// NAV SCROLL EFFECT
// ===========================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    closeMobile();
  }
});

// ===========================
// SCROLL ANIMATIONS
// ===========================
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      observer.unobserve(el);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

animatedEls.forEach((el) => observer.observe(el));

// ===========================
// SMOOTH SCROLL FOR NAV LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  if (link.getAttribute('href').length > 1) {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
        closeMobile();
      }
    });
  }
});

// ===========================
// COMING SOON MODAL
// ===========================
const modalOverlay = document.getElementById('modalOverlay');

function comingSoon(e) {
  e.preventDefault();
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===========================
// NOTIFY ME (MODAL)
// ===========================
function handleNotify() {
  const emailInput = document.getElementById('notifyEmail');
  const email = emailInput.value.trim();

  if (!email) {
    showToast('Please enter your email address.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showToast('Please enter a valid email.');
    return;
  }

  closeModal();
  emailInput.value = '';
  setTimeout(() => {
    showToast('You\'re on the list. We\'ll notify you at launch.');
  }, 400);
}

// Allow pressing Enter in email input
document.getElementById('notifyEmail').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleNotify();
});

// ===========================
// TOAST NOTIFICATION
// ===========================
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.style.color = '';
    link.style.background = '';
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.style.color = 'var(--green)';
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });