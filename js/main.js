/* =====================================================
   ServiciosGBA — main.js
   Parallax | Slider | Scroll animations | Header
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. STICKY HEADER ──────────────────────────────
  const header = document.querySelector('.site-header');
  const topBar = document.querySelector('.garantia-bar');
  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
      if(topBar) topBar.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      if(topBar) topBar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });



  // ── 3. SCROLL FADE-UP ANIMATIONS ─────────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));


  // ── 4. TESTIMONIOS SLIDER (drag + touch) ─────────
  const wrapper = document.querySelector('.testimonios-track-wrapper');
  const track   = document.querySelector('.testimonios-track');
  if (wrapper && track) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Mouse events
    wrapper.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
      wrapper.style.cursor = 'grabbing';
    });
    wrapper.addEventListener('mouseleave', () => { isDragging = false; wrapper.style.cursor = 'grab'; });
    wrapper.addEventListener('mouseup',    () => { isDragging = false; wrapper.style.cursor = 'grab'; });
    wrapper.addEventListener('mousemove',  e => {
      if (!isDragging) return;
      e.preventDefault();
      const x    = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 1.4;
      wrapper.scrollLeft = scrollLeft - walk;
    });

    // Touch events
    let touchStartX = 0;
    let touchScrollLeft = 0;
    wrapper.addEventListener('touchstart', e => {
      touchStartX    = e.touches[0].clientX;
      touchScrollLeft = wrapper.scrollLeft;
    }, { passive: true });
    wrapper.addEventListener('touchmove', e => {
      const dx = touchStartX - e.touches[0].clientX;
      wrapper.scrollLeft = touchScrollLeft + dx;
    }, { passive: true });

    // Convertir el track a overflow scroll (más fluido)
    wrapper.style.overflowX = 'auto';
    wrapper.style.scrollSnapType = 'x mandatory';
    wrapper.style.webkitOverflowScrolling = 'touch';
    track.style.width = '100%';
    document.querySelectorAll('.testimonio-card').forEach(c => {
      c.style.scrollSnapAlign = 'start';
    });
  }


  // ── 5. NÚMERO DE TELÉFONO — animación al aparecer ─
  const phoneEls = document.querySelectorAll('.hero-phone, .footer-phone');
  const phoneObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'phonePulse 0.6s ease';
        phoneObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  phoneEls.forEach(el => phoneObs.observe(el));


  // ── 6. CARDS HOVER — stagger delay ───────────────
  document.querySelectorAll('.card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.07}s`;
  });

});
