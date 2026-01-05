// Minimal JS: mobile menu + reveal on scroll + year + photo config (photos.json)
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav) {
    const toggle = () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileNav.hidden = expanded;
    };
    menuBtn.addEventListener('click', toggle);
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    }));
  }

  // Reveal elements using IntersectionObserver (low-cost)
  const els = Array.from(document.querySelectorAll('.reveal'));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));

  // Photo config
  const heroBg = document.getElementById('heroBg');
  const gallery = document.getElementById('gallery');

  const fallback = {
    hero: "assets/img/hero-placeholder.svg",
    items: [
      { src: "assets/img/factory-01.svg", caption: "工廠環境（占位）" },
      { src: "assets/img/factory-02.svg", caption: "設備與作業（占位）" },
      { src: "assets/img/tape-01.svg", caption: "膠帶產品（占位）" },
      { src: "assets/img/tape-02.svg", caption: "膠帶細節（占位）" },
    ]
  };

  function render(cfg){
    if (heroBg && cfg.hero) {
      heroBg.style.backgroundImage =
        `linear-gradient(to bottom, rgba(11,14,20,.2), rgba(11,14,20,.94)), url("${cfg.hero}")`;
    }

    if (!gallery) return;
    gallery.innerHTML = "";

    (cfg.items || []).forEach((it) => {
      const fig = document.createElement('figure');
      fig.className = "shot reveal";
      const img = document.createElement('img');
      img.loading = "lazy";
      img.src = it.src;
      img.alt = it.alt || (it.caption ? it.caption : "照片");
      const cap = document.createElement('figcaption');
      cap.textContent = it.caption || "";
      fig.appendChild(img);
      fig.appendChild(cap);
      gallery.appendChild(fig);
    });

    // Observe newly created reveal nodes
    const newEls = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'));
    newEls.forEach(el => io.observe(el));
  }

  fetch("assets/img/photos.json", { cache: "no-store" })
    .then(r => r.ok ? r.json() : Promise.reject(new Error("photos.json not found")))
    .then(cfg => {
      const normalized = {
        hero: cfg.hero || fallback.hero,
        items: Array.isArray(cfg) ? cfg : (cfg.items || fallback.items)
      };
      render(normalized);
    })
    .catch(() => render(fallback));

  // Hero video: if missing/unplayable, hide it (keep image background)
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const hideVideo = () => { heroVideo.style.display = 'none'; };
    heroVideo.addEventListener('error', hideVideo, true);

    // Pause video when hero is out of view (saves battery)
    const heroSection = document.querySelector('.hero');
    if (heroSection && 'IntersectionObserver' in window) {
      const vio = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (!heroVideo) return;
          if (e.isIntersecting) {
            heroVideo.play().catch(() => {});
          } else {
            heroVideo.pause();
          }
        });
      }, { threshold: 0.12 });
      vio.observe(heroSection);
    }
  }

})();
