/* Sıradan Tilki - site etkileşimleri ve yardımcı bot */
(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // ------------------------------
  // Mobil menü
  // ------------------------------
  const mobileMenuBtn = $('#mobileMenuBtn');
  const mobileMenu = $('#mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const visible = mobileMenu.classList.toggle('visible');
      mobileMenu.classList.toggle('hidden', !visible);
    });
    $$('#mobileMenu a').forEach(link => link.addEventListener('click', () => {
      mobileMenu.classList.remove('visible');
      mobileMenu.classList.add('hidden');
    }));
  }

  // ------------------------------
  // Navbar scroll efekti
  // ------------------------------
  const navbar = $('#navbar');
  const updateNavbar = () => navbar?.classList.toggle('nav-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ------------------------------
  // Reveal animasyonları
  // ------------------------------
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // ------------------------------
  // Sayaçlar
  // ------------------------------
  $$('.counter-value').forEach(counter => {
    const target = Number(String(counter.dataset.target || '0').replace(/\s/g, '')) || 0;
    let started = false;
    const startCounter = () => {
      if (started) return;
      started = true;
      const duration = 1100;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * eased).toLocaleString('tr-TR');
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { startCounter(); obs.disconnect(); }
      }, { threshold: .5 });
      obs.observe(counter);
    } else startCounter();
  });

  // ------------------------------
  // Video modal
  // ------------------------------
  const videoModal = $('#videoModal');
  const videoFrame = $('#videoModalFrame');
  const videoTitle = $('#videoModalTitle');
  const videoClose = $('#videoModalClose');

  const closeVideo = () => {
    if (!videoModal) return;
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    if (videoFrame) videoFrame.src = '';
    document.body.style.overflow = '';
  };

  $$('.video-open-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.videoId;
      const title = button.dataset.videoTitle || 'Video';
      if (!videoModal || !videoFrame || !id) return;
      videoTitle.textContent = title;
      videoFrame.src = `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
      videoModal.classList.add('is-open');
      videoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
  videoClose?.addEventListener('click', closeVideo);
  $('[data-video-close]')?.addEventListener('click', closeVideo);

  // ------------------------------
  // İletişim formu
  // ------------------------------
  const contactForm = $('#contactForm');
  const toast = $('#toast');
  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    toast?.classList.add('show');
    window.setTimeout(() => toast?.classList.remove('show'), 3500);
    contactForm.reset();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeVideo();
    }
  });
})();
