/* =========================================================
   Ankita Doddihal — ocean portfolio interactions
   ========================================================= */

/* ---- Years of experience (auto-increments every Jan 1) ----
   Anchored at 5+ years as of 2026; adds one each new year. */
(function setExperience() {
  const BASE_YEARS = 5, BASE_YEAR = 2026;
  const years = Math.max(BASE_YEARS, BASE_YEARS + (new Date().getFullYear() - BASE_YEAR));
  const el = document.getElementById('yearsExp');
  if (el) el.textContent = years;
})();

/* ---- Optional background video ----
   Drop a looping clip at assets/water.mp4 (or change data-src in index.html)
   and it will automatically play behind everything. If the file isn't there,
   we silently keep the realistic animated water instead. ---- */
(function bgVideo() {
  const v = document.getElementById('bgVideo');
  if (!v) return;
  const bg = document.querySelector('.bg');
  const src = v.getAttribute('data-src');
  if (!src) { v.remove(); return; }

  const dropVideo = () => { if (bg) bg.style.opacity = '1'; v.remove(); };
  const useVideo = () => { v.classList.add('ready'); if (bg) bg.style.opacity = '0'; };

  v.addEventListener('error', dropVideo);
  v.addEventListener('loadeddata', () => { if (v.readyState >= 2) useVideo(); });
  setTimeout(() => { if (!v.classList.contains('ready')) dropVideo(); }, 6000);

  v.src = src; // triggers load; errors fall back gracefully
})();

/* ---- Tabs (Work / Education / Things I've Built) ---- */
(function tabs() {
  const tabEls = document.querySelectorAll('.tab');
  tabEls.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabEls.forEach((t) => t.classList.remove('is-active'));
      document.querySelectorAll('.panel').forEach((p) => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      const panel = document.getElementById('panel-' + tab.dataset.panel);
      if (panel) panel.classList.add('is-active');
    });
  });
})();

/* ---- Sub-tabs inside "Things I've Built" ---- */
(function subtabs() {
  const subEls = document.querySelectorAll('.subtab');
  subEls.forEach((sub) => {
    sub.addEventListener('click', () => {
      subEls.forEach((s) => s.classList.remove('is-active'));
      document.querySelectorAll('.subpanel').forEach((p) => p.classList.remove('is-active'));
      sub.classList.add('is-active');
      const panel = document.getElementById('sub-' + sub.dataset.sub);
      if (panel) panel.classList.add('is-active');
    });
  });
})();

/* ---- Photo slideshow: random order, slides every 5 seconds ---- */
(function slideshow() {
  const wrap = document.getElementById('slideshow');
  if (!wrap) return;
  let slides = Array.from(wrap.querySelectorAll('.slide'));
  if (slides.length < 2) return;

  for (let i = slides.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slides[i], slides[j]] = [slides[j], slides[i]];
  }
  slides.forEach((s) => { s.classList.remove('is-active'); wrap.appendChild(s); });
  slides[0].classList.add('is-active');

  const dotsWrap = document.getElementById('slideDots');
  const dots = slides.map((_, i) => {
    const d = document.createElement('i');
    if (i === 0) d.classList.add('on');
    if (dotsWrap) dotsWrap.appendChild(d);
    return d;
  });

  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('is-active');
    dots[idx].classList.remove('on');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('is-active');
    dots[idx].classList.add('on');
  }, 5000);
})();

/* ---- Rising bubbles ---- */
(function bubbles() {
  const canvas = document.getElementById('bubbles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let w, h, drops = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(60, Math.floor(w / 26));
    drops = Array.from({ length: count }, makeBubble);
  }
  function makeBubble() {
    const r = 1.5 + Math.random() * 7;
    return {
      x: Math.random() * w, y: h + Math.random() * h, r,
      speed: 0.25 + Math.random() * 1 + r * 0.04,
      drift: (Math.random() - 0.5) * 0.5,
      wobble: Math.random() * Math.PI * 2,
      alpha: 0.08 + Math.random() * 0.2
    };
  }
  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const b of drops) {
      b.y -= b.speed; b.wobble += 0.02;
      b.x += b.drift + Math.sin(b.wobble) * 0.35;
      if (b.y + b.r < 0) Object.assign(b, makeBubble(), { y: h + b.r });
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200,245,245,${b.alpha})`;
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }
    requestAnimationFrame(frame);
  }
  resize();
  window.addEventListener('resize', resize);
  frame();
})();

/* ---- Gentle reveal on scroll ---- */
(function reveal() {
  const items = document.querySelectorAll('.explore, .job, .glass');
  items.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
  });
  const show = (el) => { el.style.opacity = '1'; el.style.transform = 'none'; };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  items.forEach((el) => io.observe(el));
  // Safety fallback: never leave content hidden.
  setTimeout(() => items.forEach(show), 1600);
})();
