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

  // If the page loaded with #contact in the URL, open the modal
  if (window.location && window.location.hash === '#contact') {
    openModal();
  }

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
      const phone = (formData.get('phone') || '').toString().trim();
      const subject = (formData.get('subject') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();
      const feedback = document.getElementById('contactFeedback');
      if (!name || !email || !subject || !message) {
        if (feedback) {
          feedback.style.display = 'block';
          feedback.textContent = 'Please complete all required fields.';
        } else {
          alert('Please complete all required fields.');
        }
        return;
      }

      // Build mailto fallback so user's email client opens with the message
      const to = 'mesagbor@4starsmesgroup.com';
      const mailSubject = encodeURIComponent(subject);
      const bodyParts = [
        'Name: ' + name,
        'Email: ' + email,
        phone ? ('Phone: ' + phone) : '',
        '',
        message
      ].filter(Boolean).join('\n');
      const mailBody = encodeURIComponent(bodyParts);
      const mailto = `mailto:${to}?subject=${mailSubject}&body=${mailBody}`;

      // Attempt to open mail client; also show a friendly message
      try {
        window.open(mailto);
        if (feedback) {
          feedback.style.display = 'block';
          feedback.textContent = 'Your email client should open. If it does not, please email mesagbor@4starsmesgroup.com';
        }
      } catch (err) {
        if (feedback) {
          feedback.style.display = 'block';
          feedback.textContent = 'Unable to open email client. Please email mesagbor@4starsmesgroup.com';
        } else {
          alert('Unable to open email client. Please email mesagbor@4starsmesgroup.com');
        }
      }

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
