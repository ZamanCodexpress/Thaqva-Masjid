/* ════════════════════════════════════════════════════════════
   THAQVA MASJID — script.js
   GSAP Animations | Navbar | Prayer API | Countdown Timer
════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── GSAP Plugin Registration ──────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ── Constants ─────────────────────────────────────────────
  const API_URL = 'https://api.azantimes.in/v1/timesheets/Kozhikode_North_Assembly_Constituency/today.json';

  // API keys as returned by azantimes.in
  const PRAYER_LABELS = {
    subh:    'Fajr',
    sunrise: 'Sunrise',
    duhr:    'Dhuhr',
    asar:    'Asr',
    maghrib: 'Maghrib',
    isha:    'Isha'
  };

  const PRAYER_ORDER = ['subh', 'sunrise', 'duhr', 'asar', 'maghrib', 'isha'];

  // ── State ─────────────────────────────────────────────────
  let prayerTimes   = {};   // { fajr: '05:12', dhuhr: '12:30', … }
  let countdownInt  = null; // setInterval reference
  let nextPrayerKey = null;

  /* ══════════════════════════════════════════════════════════
     FOOTER YEAR
  ══════════════════════════════════════════════════════════ */
  const yrEl = document.getElementById('footer-year');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════════════════════════
     NAVBAR — scroll solidify + active link + hamburger
  ══════════════════════════════════════════════════════════ */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  const navLinks  = document.querySelectorAll('.nav-link');

  // Scroll → solidify navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link based on scroll position
  function updateActiveLink() {
    const sections = ['home', 'about', 'countdown', 'prayer'];
    let current = 'home';
    const offset = navbar.offsetHeight + 20;

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - offset) current = id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  /* ══════════════════════════════════════════════════════════
     GSAP — NAVBAR ENTRANCE
  ══════════════════════════════════════════════════════════ */
  gsap.from('.navbar', {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
  });

  /* ══════════════════════════════════════════════════════════
     GSAP — HERO ANIMATIONS
  ══════════════════════════════════════════════════════════ */
  const heroTl = gsap.timeline({ delay: 0.5 });

  heroTl
    .to('#hero-eyebrow', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      onStart() { gsap.set('#hero-eyebrow', { y: 24 }); }
    })
    .to('#hero-title', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      onStart() { gsap.set('#hero-title', { y: 40 }); }
    }, '-=0.5')
    .to('#hero-subtitle', {
      opacity: 1,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.4')
    .to('#hero-cta', {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.8)',
      onStart() { gsap.set('#hero-cta', { scale: 0.8 }); }
    }, '-=0.3');

  /* ══════════════════════════════════════════════════════════
     GSAP — ABOUT SECTION SCROLL REVEAL
  ══════════════════════════════════════════════════════════ */
  // Section header
  gsap.from('.about .section-header', {
    scrollTrigger: {
      trigger: '.about .section-header',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out'
  });

  // Text blocks
  gsap.from('.about-text-item', {
    scrollTrigger: {
      trigger: '.about-text-block',
      start: 'top 78%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -40,
    stagger: 0.2,
    duration: 0.9,
    ease: 'power3.out'
  });

  // Cards stagger animation
  gsap.to('.about-card', {
    scrollTrigger: {
      trigger: '.about-cards',
      start: 'top 78%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out'
  });

  /* ══════════════════════════════════════════════════════════
     GSAP — COUNTDOWN SECTION REVEAL
  ══════════════════════════════════════════════════════════ */
  gsap.from('.countdown-section .section-header', {
    scrollTrigger: {
      trigger: '.countdown-section',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out'
  });

  gsap.from('#countdown-card', {
    scrollTrigger: {
      trigger: '#countdown-card',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 1,
    ease: 'power3.out'
  });

  /* ══════════════════════════════════════════════════════════
     GSAP — PRAYER SECTION REVEAL
  ══════════════════════════════════════════════════════════ */
  gsap.from('.prayer-section .section-header', {
    scrollTrigger: {
      trigger: '.prayer-section',
      start: 'top 78%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out'
  });

  gsap.from('.prayer-table-wrap', {
    scrollTrigger: {
      trigger: '.prayer-table-wrap',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });

  /* ══════════════════════════════════════════════════════════
     PRAYER API — FETCH & PARSE
  ══════════════════════════════════════════════════════════ */
  async function fetchPrayerTimes() {
    try {
      const res  = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      parsePrayerData(data);
    } catch (err) {
      console.warn('Prayer API error:', err);
      showApiError();
    }
  }

  function parsePrayerData(data) {
    // azantimes.in returns: { date, subh, sunrise, duhr, asar, maghrib, isha }
    // Times are in "H:MM AM/PM" format
    PRAYER_ORDER.forEach(key => {
      const raw = data[key];
      if (raw) prayerTimes[key] = normalizeTime(raw);
    });

    if (Object.keys(prayerTimes).length === 0) {
      throw new Error('No prayer times found in API response');
    }

    // Populate prayer table
    renderPrayerTable();

    // Populate prayer strip
    renderPrayerStrip();

    // Start live countdown
    startCountdown();

    // Update prayer date label
    const dateLabel = document.getElementById('prayer-date-label');
    if (dateLabel) {
      const today = new Date();
      dateLabel.textContent = `Today's Salah schedule — ${today.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    }
  }

  // Normalize time string to HH:MM (24h)
  function normalizeTime(raw) {
    if (!raw) return null;
    const str = String(raw).trim();

    // Already HH:MM or HH:MM:SS
    const match24 = str.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (match24) return `${match24[1].padStart(2, '0')}:${match24[2]}`;

    // 12h format with AM/PM
    const match12 = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match12) {
      let h = parseInt(match12[1], 10);
      const m = match12[2];
      const period = match12[3].toUpperCase();
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
      return `${String(h).padStart(2, '0')}:${m}`;
    }

    return str; // fallback
  }

  function showApiError() {
    const loadingEl = document.getElementById('prayer-loading');
    if (loadingEl) {
      loadingEl.innerHTML = '<span style="color:#c62828">⚠ Could not load prayer times. Please check your internet connection.</span>';
    }
    const cdStatus = document.getElementById('cd-status');
    if (cdStatus) cdStatus.textContent = 'Unable to fetch prayer times.';
    const cdName = document.getElementById('cd-prayer-name');
    if (cdName) cdName.textContent = '—';
  }

  /* ══════════════════════════════════════════════════════════
     PRAYER TABLE RENDER
  ══════════════════════════════════════════════════════════ */
  function renderPrayerTable() {
    const loading = document.getElementById('prayer-loading');
    const table   = document.getElementById('prayer-table');
    const tbody   = document.getElementById('prayer-tbody');

    if (loading) loading.style.display = 'none';
    if (table)   table.style.display = '';

    const currentKey = getCurrentPrayerKey();

    tbody.innerHTML = '';
    PRAYER_ORDER.forEach(key => {
      if (!prayerTimes[key]) return;
      const tr = document.createElement('tr');
      if (key === currentKey) tr.classList.add('current-prayer');
      tr.innerHTML = `
        <td>${PRAYER_LABELS[key] || capitalise(key)}</td>
        <td>${formatTo12h(prayerTimes[key])}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* ══════════════════════════════════════════════════════════
     PRAYER STRIP RENDER
  ══════════════════════════════════════════════════════════ */
  function renderPrayerStrip() {
    const strip = document.getElementById('prayer-strip');
    if (!strip) return;

    const currentNext = getNextPrayerKey();
    strip.innerHTML = '';

    PRAYER_ORDER.forEach(key => {
      if (!prayerTimes[key]) return;
      const div = document.createElement('div');
      div.classList.add('strip-item');
      div.id = `strip-${key}`;
      if (key === currentNext) div.classList.add('active');
      div.innerHTML = `
        <div class="strip-name">${PRAYER_LABELS[key] || capitalise(key)}</div>
        <div class="strip-time">${formatTo12h(prayerTimes[key])}</div>
      `;
      strip.appendChild(div);
    });
  }

  /* ══════════════════════════════════════════════════════════
     COUNTDOWN TIMER
  ══════════════════════════════════════════════════════════ */
  function startCountdown() {
    if (countdownInt) clearInterval(countdownInt);
    tickCountdown();
    countdownInt = setInterval(tickCountdown, 1000);
  }

  function tickCountdown() {
    const key = getNextPrayerKey();

    if (!key) {
      document.getElementById('cd-prayer-name').textContent = 'No more prayers today';
      document.getElementById('cd-timer').style.opacity = '0.4';
      document.getElementById('cd-status').textContent = 'All prayers completed for today.';
      clearInterval(countdownInt);
      return;
    }

    // Switch prayer highlight if changed
    if (key !== nextPrayerKey) {
      nextPrayerKey = key;
      animatePrayerSwitch(key);
      updateStripHighlight(key);
    }

    // Calculate remaining seconds
    const remaining = secondsUntil(prayerTimes[key]);
    if (remaining <= 0) {
      tickCountdown(); // immediately recalculate
      return;
    }

    const hh = Math.floor(remaining / 3600);
    const mm = Math.floor((remaining % 3600) / 60);
    const ss = remaining % 60;

    setDigit('cd-h', pad(hh));
    setDigit('cd-m', pad(mm));
    setDigit('cd-s', pad(ss));

    document.getElementById('cd-status').textContent =
      `${PRAYER_LABELS[key]} is approaching — stay ready for Salah`;
  }

  function setDigit(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.textContent !== val) {
      gsap.fromTo(el,
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      el.textContent = val;
    }
  }

  function animatePrayerSwitch(key) {
    const nameEl = document.getElementById('cd-prayer-name');
    const timeEl = document.getElementById('cd-prayer-time');

    gsap.to([nameEl, timeEl], {
      opacity: 0, y: -12, duration: 0.3, ease: 'power2.in',
      onComplete() {
        nameEl.textContent = PRAYER_LABELS[key] || capitalise(key);
        timeEl.textContent = formatTo12h(prayerTimes[key]);
        gsap.to([nameEl, timeEl], { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      }
    });
  }

  function updateStripHighlight(activeKey) {
    document.querySelectorAll('.strip-item').forEach(el => {
      el.classList.toggle('active', el.id === `strip-${activeKey}`);
    });
    // Refresh prayer table highlight
    renderPrayerTable();
  }

  /* ══════════════════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════════════════ */

  // Returns current time in seconds since midnight
  function nowSeconds() {
    const now = new Date();
    return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  }

  // Parse "HH:MM" to seconds since midnight
  function timeToSeconds(t) {
    if (!t) return NaN;
    const [h, m] = t.split(':').map(Number);
    return h * 3600 + m * 60;
  }

  // Seconds until a given "HH:MM" time (returns negative if already passed)
  function secondsUntil(timeStr) {
    return timeToSeconds(timeStr) - nowSeconds();
  }

  // Get the next upcoming prayer key
  function getNextPrayerKey() {
    for (const key of PRAYER_ORDER) {
      if (!prayerTimes[key]) continue;
      if (secondsUntil(prayerTimes[key]) > 0) return key;
    }
    return null; // all prayers done for today
  }

  // Get the current (most recently started) prayer key
  function getCurrentPrayerKey() {
    let lastPassed = null;
    for (const key of PRAYER_ORDER) {
      if (!prayerTimes[key]) continue;
      if (secondsUntil(prayerTimes[key]) <= 0) lastPassed = key;
    }
    return lastPassed;
  }

  // "05:30" → "5:30 AM"
  function formatTo12h(t) {
    if (!t) return '—';
    const [h, m] = t.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12    = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, '0')} ${period}`;
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /* ══════════════════════════════════════════════════════════
     INITIALISE
  ══════════════════════════════════════════════════════════ */
  fetchPrayerTimes();
  updateActiveLink();

  // Refresh prayer highlight every minute
  setInterval(() => {
    if (Object.keys(prayerTimes).length > 0) {
      renderPrayerTable();
      updateStripHighlight(getNextPrayerKey());
    }
  }, 60000);

})();
