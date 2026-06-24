// script.js — basic interactivity: mobile nav toggle, smooth scroll, modal, simple form validation
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('mainNav');
  navToggle && navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    document.body.classList.toggle('nav-open');
    mainNav.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  mainNav && mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
      }
    });
  });

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Modal openers (example: open contact modal when contact CTA clicked)
  const contactModal = document.getElementById('contactModal');
  const openModalButtons = document.querySelectorAll('a[href="#contact"], .btn-contact');
  const closeButtons = contactModal && contactModal.querySelectorAll('.modal-close');

  openModalButtons.forEach(btn => btn.addEventListener('click', function (e) {
    // prevent jump if it's an in-page link
    e.preventDefault();
    openModal();
  }));

  closeButtons && closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

  function openModal() {
    if (!contactModal) return;
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!contactModal) return;
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  // Close modal on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && contactModal && contactModal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // Simple contact form handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();
      if (!name || !email || !message) {
        alert('Please complete all fields before sending.');
        return;
      }
      // For now just simulate submission
      alert('Thanks ' + name + '! Your message was sent (demo).');
      contactForm.reset();
      closeModal();
    });
  }

  // Service cards: expand on small screens
  const serviceCards = document.querySelectorAll('.service-card');
  function enableCardToggle() {
    if (window.innerWidth <= 760) {
      serviceCards.forEach(card => {
        if (!card.classList.contains('tappable')) {
          card.classList.add('tappable');
          card.addEventListener('click', cardToggle);
        }
      });
    } else {
      serviceCards.forEach(card => {
        card.classList.remove('tappable');
        card.removeEventListener('click', cardToggle);
        card.classList.remove('expanded');
      });
    }
  }

  function cardToggle(e) {
    this.classList.toggle('expanded');
  }

  window.addEventListener('resize', enableCardToggle);
  enableCardToggle();
});
