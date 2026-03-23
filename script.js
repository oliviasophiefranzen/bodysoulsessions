// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Square booking link: https://app.squareup.com/appointments/book/q0tqmeufc4ex4p/LV346SKV7CH1C/start
// All booking buttons link there directly via HTML href.
// To update the link, search index.html for "squareup.com/appointments" and replace all instances.

// ── Testimonial carousel ──────────────────────────────────────
const track  = document.getElementById('testimonialTrack');
const dotsEl = document.getElementById('testimonialDots');

if (track && dotsEl) {
  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;

  // Build dot buttons
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsEl.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  document.getElementById('carouselPrev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('carouselNext').addEventListener('click', () => goTo(current + 1));

  // Optional: auto-advance every 7 seconds, pause on hover
  let timer = setInterval(() => goTo(current + 1), 7000);
  track.closest('.testimonials-carousel').addEventListener('mouseenter', () => clearInterval(timer));
  track.closest('.testimonials-carousel').addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(current + 1), 7000);
  });
}
