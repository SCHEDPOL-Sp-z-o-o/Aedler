/* ==========================================================================
   AEDLER — interactions
   - i18n switcher (PL default, EN, DE) — extensible
   - Nav scroll state + mobile drawer
   - Technology carousel
   - Catalog lightbox
   - Number counters
   - Scroll-reveal observer
   - Lead form (no backend - client-side success state)
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- i18n ---------- */
  const SUPPORTED = ['en', 'de', 'fr', 'pl', 'cs', 'sk', 'ro'];
  const STORAGE_KEY = 'aedler.lang';

  function getInitialLang() {
    // Priority: URL ?lang= → localStorage → browser → default
    const url = new URLSearchParams(window.location.search);
    const fromUrl = url.get('lang');
    if (fromUrl && SUPPORTED.includes(fromUrl)) return fromUrl;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : 'en';
  }

  function applyLang(lang) {
    const dict = window.I18N[lang] || window.I18N.pl;
    document.documentElement.setAttribute('lang', lang);
    // Update document title for SEO
    if (dict['seo.title']) document.title = dict['seo.title'];

    // Keep crawlable meta (description, Open Graph, Twitter, locale) in sync with language.
    const setMeta = (sel, val) => { if (val == null) return; const m = document.querySelector(sel); if (m) m.setAttribute('content', val); };
    if (dict['seo.desc']) {
      setMeta('meta[name="description"]', dict['seo.desc']);
      setMeta('meta[property="og:description"]', dict['seo.desc']);
      setMeta('meta[name="twitter:description"]', dict['seo.desc']);
    }
    if (dict['seo.title']) {
      setMeta('meta[property="og:title"]', dict['seo.title']);
      setMeta('meta[name="twitter:title"]', dict['seo.title']);
    }
    const OG_LOCALE = { pl: 'pl_PL', en: 'en_GB', de: 'de_DE', fr: 'fr_FR', cs: 'cs_CZ', sk: 'sk_SK', ro: 'ro_RO' };
    setMeta('meta[property="og:locale"]', OG_LOCALE[lang] || 'en_GB');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.trim().split(':');
        if (dict[key] != null) el.setAttribute(attr, dict[key]);
      });
    });

    document.querySelectorAll('.lang-switcher button').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
    localStorage.setItem(STORAGE_KEY, lang);

    // Update URL without reload (keeps hreflang URLs valid)
    const url = new URL(window.location.href);
    if (lang === 'pl') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    window.history.replaceState({}, '', url.toString());

    // Notify content-tweak layer so its overrides re-apply on top of the new language.
    document.dispatchEvent(new CustomEvent('aedler:langchanged', { detail: { lang } }));
  }

  function initLang() {
    const lang = getInitialLang();
    applyLang(lang);
    document.querySelectorAll('.lang-switcher button').forEach((btn) => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
  }

  /* ---------- Nav ---------- */
  function initNav() {
    const nav = document.querySelector('.nav');
    const drawer = document.querySelector('.nav-drawer');
    const burger = document.querySelector('.nav-burger');

    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger && drawer) {
      burger.addEventListener('click', () => {
        drawer.classList.toggle('is-open');
      });
      drawer.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => drawer.classList.remove('is-open'));
      });
    }
  }

  /* ---------- Carousel ---------- */
  function initCarousel() {
    const root = document.querySelector('.carousel');
    if (!root) return;
    const slides = root.querySelectorAll('.carousel-slide');
    const visuals = root.querySelectorAll('.carousel-visual img');
    const dots = root.querySelectorAll('.carousel-dots button');
    const prev = root.querySelector('.carousel-arrows .prev');
    const next = root.querySelector('.carousel-arrows .next');
    let idx = 0;
    let timer = null;

    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, j) => s.classList.toggle('is-active', j === idx));
      visuals.forEach((v, j) => v.classList.toggle('is-active', j === idx));
      dots.forEach((d, j) => d.classList.toggle('is-active', j === idx));
    }
    function autoplay() {
      clearInterval(timer);
      timer = setInterval(() => show(idx + 1), 7000);
    }
    dots.forEach((d, j) => d.addEventListener('click', () => { show(j); autoplay(); }));
    prev && prev.addEventListener('click', () => { show(idx - 1); autoplay(); });
    next && next.addEventListener('click', () => { show(idx + 1); autoplay(); });

    show(0);
    autoplay();

    // Pause on hover
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', autoplay);
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    const lb = document.querySelector('.lightbox');
    if (!lb) return;
    const img = lb.querySelector('img');
    const close = lb.querySelector('.close');

    document.querySelectorAll('.cat-card').forEach((card) => {
      card.addEventListener('click', () => {
        const src = card.getAttribute('data-zoom');
        if (!src) return;
        img.src = src;
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    function dismiss() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    close && close.addEventListener('click', dismiss);
    lb.addEventListener('click', (e) => { if (e.target === lb) dismiss(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') dismiss(); });
  }

  /* ---------- Number counters ---------- */
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateNumber(el, to, prefix = '', suffix = '') {
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const e = easeOutQuart(t);
      const v = Math.floor(to * e);
      el.textContent = prefix + v.toLocaleString('pl-PL') + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + to.toLocaleString('pl-PL') + suffix;
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const cells = document.querySelectorAll('[data-count]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          const to = parseInt(entry.target.dataset.count, 10);
          const suffix = entry.target.dataset.suffix || '';
          const prefix = entry.target.dataset.prefix || '';
          animateNumber(entry.target, to, prefix, suffix);
        }
      });
    }, { threshold: 0.3 });
    cells.forEach((c) => obs.observe(c));
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    items.forEach((i) => obs.observe(i));
  }

  /* ---------- Video facades (click-to-load YouTube) ---------- */
  function initVideos() {
    document.querySelectorAll('.video-embed[data-video]').forEach((box) => {
      box.addEventListener('click', () => {
        if (box.dataset.loaded) return;
        box.dataset.loaded = '1';
        const id = box.getAttribute('data-video');
        const lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&hl=${lang}&cc_lang_pref=${lang}`;
        iframe.title = box.parentElement.querySelector('h3') ? box.parentElement.querySelector('h3').textContent : 'Video';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        box.innerHTML = '';
        box.appendChild(iframe);
      });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initNav();
    initCarousel();
    initLightbox();
    initCounters();
    initVideos();
    initReveal();
  });
})();
