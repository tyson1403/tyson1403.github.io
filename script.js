(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  $('#year').textContent = new Date().getFullYear();

  // Fade sections in as they scroll into view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach((el) => io.observe(el));

  // Count-up numbers
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || '';
      countIO.unobserve(el);
      if (reduced) { el.textContent = end + suffix; return; }
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const p = clamp((t - t0) / dur, 0, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => countIO.observe(el));

  // Scroll-driven bits (one rAF loop)
  const nav = $('#nav'), hero = $('#heroInner'), story = $('#story');
  const lines = $$('.line'), dots = $$('.dots i');
  let ticking = false;

  function update() {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    nav.classList.toggle('scrolled', y > 10);
    if (reduced) return;

    // Hero eases up and fades as you scroll past it
    const p = clamp(y / (vh * 0.8), 0, 1);
    hero.style.transform = `translateY(${p * 50}px) scale(${1 - p * 0.06})`;
    hero.style.opacity = 1 - p;

    // Pinned story: one statement at a time, driven by scroll position
    const r = story.getBoundingClientRect();
    const prog = clamp(-r.top / (r.height - vh), 0, 0.999);
    const idx = r.top > vh * 0.4 ? -1 : Math.floor(prog * lines.length);
    lines.forEach((l, i) => {
      l.classList.toggle('on', i === idx);
      l.classList.toggle('past', i < idx);
    });
    dots.forEach((d, i) => d.classList.toggle('on', i === idx));
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  update();
})();
