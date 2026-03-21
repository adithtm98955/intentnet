/* ============================================================
   main.js — IntentNet
   ============================================================ */

/* ── PROGRESS BAR ─────────────────────────────────────────── */
const pb = document.getElementById('pbar');
if (pb) {
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - innerHeight)) * 100;
    pb.style.width = pct + '%';
  }, { passive: true });
}

/* ── NAVBAR HIDE / SHOW ON SCROLL ────────────────────────── */
const navEl = document.getElementById('navbar');
let lastY = 0;
if (navEl) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY && y > 200) {
      navEl.classList.add('hide');
    } else {
      navEl.classList.remove('hide');
    }
    navEl.classList.toggle('scrolled', y > 60);
    lastY = y;
  }, { passive: true });
}

/* ── HAMBURGER / MOBILE MENU ─────────────────────────────── */
const hamBtn  = document.getElementById('ham');
const mobMenu = document.getElementById('mobMenu');
const mcBtn   = document.getElementById('mc');

if (hamBtn && mobMenu && mcBtn) {
  hamBtn.addEventListener('click', () => {
    hamBtn.classList.toggle('open');
    mobMenu.classList.toggle('open');
  });
  mcBtn.addEventListener('click', () => {
    hamBtn.classList.remove('open');
    mobMenu.classList.remove('open');
  });
  mobMenu.addEventListener('click', (e) => {
    if (e.target === mobMenu) {
      hamBtn.classList.remove('open');
      mobMenu.classList.remove('open');
    }
  });
}

/* ── HERO BACKGROUND — Optimized Unsplash Version ──────── */
(function () {
  const bg = document.getElementById('heroBg');
  if (!bg) return;
  bg.style.backgroundImage = "url('assets/banners/home.jpg')";
  bg.style.backgroundSize     = 'cover';
  bg.style.backgroundPosition = 'center';
})();

/* ── HERO TITLE WORD-BY-WORD ANIMATION ───────────────────── */
const heroTitleEl = document.getElementById('htit');
if (heroTitleEl) {
  const words = heroTitleEl.textContent.trim().split(' ');
  heroTitleEl.innerHTML = words
    .map(w => `<span class="hw">${w}&nbsp;</span>`)
    .join('');
  document.querySelectorAll('.hw').forEach((w, i) => {
    setTimeout(() => w.classList.add('show'), i * 50 + 300);
  });
}

/* ── HERO BG MOUSE PARALLAX ──────────────────────────────── */
window.addEventListener('mousemove', (e) => {
  const bg = document.getElementById('heroBg');
  if (!bg) return;
  const x = (e.clientX / innerWidth  - 0.5) * 7;
  const y = (e.clientY / innerHeight - 0.5) * 5;
  bg.style.transform = `scale(1.1) translate(calc(-1.5% + ${x}px), calc(-1% + ${y}px))`;
}, { passive: true });

/* ── INTERSECTION OBSERVER — REVEAL ─────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.rv, .rl, .rr, .rs')
  .forEach(el => revealObs.observe(el));

/* ── INTERSECTION OBSERVER — STAGGER ─────────────────────── */
const staggerObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sg').forEach((child, i) => {
        setTimeout(() => child.classList.add('on'), i * 90);
      });
      staggerObs.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll(
  '.fac-grid, .jg, .cit-g, .how-grid, .bld-g, .eco-g, .ab-timeline, .ab-team'
).forEach(el => staggerObs.observe(el));

/* ── COUNT-UP ANIMATION ──────────────────────────────────── */
function doCount(el) {
  const to  = parseInt(el.dataset.to) || 0;
  const s   = el.dataset.s || '';
  const isK = s === 'k+';
  const dur = 1600;
  const start = Date.now();

  (function update() {
    const progress = Math.min((Date.now() - start) / dur, 1);
    const eased    = 1 - Math.pow(1 - progress, 4);
    const val      = Math.floor(eased * to);
    el.textContent = isK
      ? (val >= to ? to + 'k+' : val + 'k+')
      : (val + s);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = to + (isK ? 'k+' : s);
    }
  })();
}

const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      doCount(e.target);
      countObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.cnt').forEach(el => countObs.observe(el));

/* ── HOW CARD — CROSS-HIGHLIGHT DOTS ────────────────────── */
document.querySelectorAll('.hcard').forEach((card, idx) => {
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.hcard').forEach(c => {
      c.querySelectorAll('.hdot').forEach((d, j) => {
        d.classList.toggle('active', j === idx);
      });
    });
  });
  card.addEventListener('mouseleave', () => {
    document.querySelectorAll('.hcard').forEach((c, i) => {
      c.querySelectorAll('.hdot').forEach((d, j) => {
        d.classList.toggle('active', j === i);
      });
    });
  });
});

/* ── ECOSYSTEM FILTER ────────────────────────────────────── */
document.querySelectorAll('.eco-f').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.eco-f').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.textContent.trim().toLowerCase();
    document.querySelectorAll('.eitem').forEach(item => {
      const tag = (item.querySelector('.etag')?.textContent || '').toLowerCase();
      const match = (cat === 'all') || tag.includes(cat.split(' ')[0]);
      item.style.opacity   = match ? '1' : '.2';
      item.style.transform = match ? '' : 'scale(.97)';
      item.style.transition = 'opacity .4s, transform .4s';
    });
  });
});

/* ── PAGE LOADER ──────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 500);
  }
});
