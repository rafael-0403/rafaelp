/* ─── TYPED EFFECT ─── */
const roles = ['IT Enthusiast', 'IT Consultant', 'IT Support', 'Presales Engineer'];
let ri = 0, ci = 0, del = false;
const tw = document.getElementById('tw');

function type() {
  const w = roles[ri];
  if (!del) {
    tw.textContent = w.slice(0, ++ci);
    if (ci === w.length) { del = true; setTimeout(type, 1900); return; }
  } else {
    tw.textContent = w.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 38 : 88);
}
type();

/* ─── THEME TOGGLE ─── */
const html = document.documentElement;
const thBtn = document.getElementById('th');

// Definisikan pasangan logo untuk tiap tema
const logoMap = {
  dark:  {
    tzuchi:   'assets/img/Tzu Chi Logo - Putih.png',
    esaunggul: 'assets/img/ESGUL LOGO - PUTIH.png'
  },
  light: {
    tzuchi:   'assets/img/Tzu Chi Logo - Hitam.png',
    esaunggul: 'assets/img/ESGUL LOGO - HITAM.png'
  }
};

function applyThemeLogos(theme) {
  const logoTzuChi    = document.getElementById('logoTzuChi');
  const logoEsaUnggul = document.getElementById('logoEsaUnggul');
  if (logoTzuChi)    logoTzuChi.src    = logoMap[theme].tzuchi;
  if (logoEsaUnggul) logoEsaUnggul.src = logoMap[theme].esaunggul;
}

thBtn.addEventListener('click', () => {
  const isDark = html.dataset.theme === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  html.dataset.theme = newTheme;
  thBtn.textContent  = isDark ? '🌙' : '☀️';
  applyThemeLogos(newTheme);
});

// Terapkan logo sesuai tema awal saat halaman dimuat
applyThemeLogos(html.dataset.theme || 'dark');

/* ─── MOBILE NAV ─── */
const mbBtn = document.getElementById('mb');
const nu = document.getElementById('navUl');
mbBtn.addEventListener('click', e => {
  e.stopPropagation();
  nu.classList.toggle('open');
});
document.querySelectorAll('.nl').forEach(a => a.addEventListener('click', () => nu.classList.remove('open')));
document.addEventListener('click', e => {
  if (!nu.contains(e.target) && e.target !== mbBtn) nu.classList.remove('open');
});

/* ─── ACTIVE NAV + BACK TO TOP (throttled, merged) ─── */
const secs = document.querySelectorAll('section[id]');
const nls = document.querySelectorAll('.nl');
const btt = document.getElementById('btt');
let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    const pos = window.scrollY + 130;
    secs.forEach(s => {
      if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
        nls.forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + s.id));
      }
    });
    btt.classList.toggle('v', window.scrollY > 300);
    scrollTicking = false;
  });
}, { passive: true });

/* ─── REVEAL ON SCROLL ─── */
const ro = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); }
  });
}, { threshold: .1 });
document.querySelectorAll('.rv, .rv2').forEach(el => ro.observe(el));

/* ─── SKILL BARS ─── */
const sro = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sbf').forEach(b => b.classList.add('on'));
      sro.unobserve(e.target);
    }
  });
}, { threshold: .25 });
const sb = document.getElementById('sbars');
if (sb) sro.observe(sb);

/* ─── PORTFOLIO FILTER ─── */
document.querySelectorAll('.pf').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf').forEach(b => b.classList.remove('act'));
    btn.classList.add('act');
    const f = btn.dataset.f;
    document.querySelectorAll('.pc').forEach(c => {
      const show = f === 'all' || c.dataset.c === f;
      c.style.display = show ? '' : 'none';
    });
  });
});

/* ─── LIGHTBOX ─── */
let lbImages = [], lbIdx = 0;

function lb(src) {
  if (Array.isArray(src)) {
    lbImages = src;
    lbIdx = 0;
  } else {
    lbImages = [src];
    lbIdx = 0;
  }
  document.getElementById('lbimg').src = lbImages[0];
  document.getElementById('lbox').classList.add('on');
  document.body.style.overflow = 'hidden';
  updateLbNav();
}

function lbPrev() {
  lbIdx = (lbIdx - 1 + lbImages.length) % lbImages.length;
  document.getElementById('lbimg').src = lbImages[lbIdx];
  updateLbNav();
}

function lbNext() {
  lbIdx = (lbIdx + 1) % lbImages.length;
  document.getElementById('lbimg').src = lbImages[lbIdx];
  updateLbNav();
}

function updateLbNav() {
  const nav = document.getElementById('lbnav');
  const counter = document.getElementById('lbcount');
  if (nav) nav.style.display = lbImages.length > 1 ? 'flex' : 'none';
  if (counter) counter.textContent = (lbIdx + 1) + ' / ' + lbImages.length;
}

function clb(e) {
  if (!e || e.target === document.getElementById('lbox') || e.target.classList.contains('lbx')) {
    document.getElementById('lbox').classList.remove('on');
    document.body.style.overflow = '';
    document.getElementById('lbimg').src = '';
    lbImages = []; lbIdx = 0;
  }
}
document.getElementById('lbox').addEventListener('click', function(e) {
  if (e.target === this) clb(e);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') clb({ target: document.getElementById('lbox') });
  if (e.key === 'ArrowRight') lbNext();
  if (e.key === 'ArrowLeft') lbPrev();
});


/* ─── GITHUB REPOS ─── */
const GITHUB_USER = 'rafael-0403';

const langColors = {
  JavaScript: '#f1e05a', Python: '#3572A5', PHP: '#4F5D95',
  HTML: '#e34c26', CSS: '#563d7c', TypeScript: '#3178c6',
  Java: '#b07219', Kotlin: '#A97BFF', Dart: '#00B4AB',
  'C#': '#178600', 'C++': '#f34b7d', Shell: '#89e051',
  Vue: '#41b883', Swift: '#fa7343', Go: '#00ADD8', Rust: '#dea584',
};

function ghTimeAgo(dateStr) {
  const s = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s/60) + 'm ago';
  if (s < 86400) return Math.floor(s/3600) + 'h ago';
  if (s < 2592000) return Math.floor(s/86400) + 'd ago';
  if (s < 31536000) return Math.floor(s/2592000) + 'mo ago';
  return Math.floor(s/31536000) + 'y ago';
}

function renderGhCard(repo) {
  const color = langColors[repo.language] || '#8b949e';
  return `
    <a class="gh-card rv" href="${repo.html_url}" target="_blank" rel="noopener">
      <div class="gh-card-top">
        <div class="gh-name">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/></svg>
          ${repo.name}
        </div>
        ${repo.fork ? '<span class="gh-fork">Fork</span>' : ''}
      </div>
      ${repo.description ? `<div class="gh-desc">${repo.description}</div>` : '<div class="gh-desc" style="color:var(--t3);font-style:italic">No description</div>'}
      <div class="gh-meta">
        ${repo.language ? `<span class="gh-lang"><span class="gh-langdot" style="background:${color}"></span>${repo.language}</span>` : ''}
        <span class="gh-stat">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
          ${repo.stargazers_count}
        </span>
        <span class="gh-stat">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg>
          ${repo.forks_count}
        </span>
        <span class="gh-updated">${ghTimeAgo(repo.pushed_at)}</span>
      </div>
    </a>`;
}

// Pinned repos — urutan sesuai keinginan
const PINNED_REPOS = [
  'EduCharacter-AI',
  'marosa',
  'tradisiman',
  'project_pengukuran_psikologi',
  'pengaduanmasyarakat',
  'Seed-Faker',
];

async function loadGithub() {
  const grid = document.getElementById('ghGrid');
  const repoCountEl = document.getElementById('ghRepoCount');
  const followersEl = document.getElementById('ghFollowers');
  const starsEl = document.getElementById('ghStars');

  try {
    // Fetch user info + each pinned repo in parallel — single round trip
    const [userRes, ...repoResults] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`),
      ...PINNED_REPOS.map(name =>
        fetch(`https://api.github.com/repos/${GITHUB_USER}/${name}`)
      )
    ]);

    const user = await userRes.json();
    const repos = await Promise.all(repoResults.map(r => r.json()));

    // Stats
    repoCountEl.textContent = user.public_repos ?? '—';
    followersEl.textContent = user.followers ?? '—';

    // Stars dari pinned repos saja (tidak perlu fetch 100 repo ekstra)
    const validRepos = repos.filter(r => r && r.name);
    const totalStars = validRepos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    starsEl.textContent = totalStars;
    if (validRepos.length === 0) {
      grid.innerHTML = '<div class="gh-error">No repositories found.</div>';
      return;
    }

    grid.innerHTML = validRepos.map(renderGhCard).join('');

    // Trigger reveal animation
    grid.querySelectorAll('.rv').forEach(el => ro.observe(el));

  } catch (err) {
    grid.innerHTML = `<div class="gh-error">Could not load repositories. <a href="https://github.com/${GITHUB_USER}?tab=repositories" target="_blank" style="color:var(--accent)">View on GitHub →</a></div>`;
  }
}

loadGithub();

const badgeSwiper = new Swiper('.badge-slider', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.badge-pagination',
    clickable: true,
  },
  breakpoints: {
    520: { slidesPerView: 2 },
    800: { slidesPerView: 3 },
  }
});

/* ─── HERO CANVAS BACKGROUND ─── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Config ──
  const COLS = [
    '#0A84FF', '#5AC8FA', '#30D158', '#BF5AF2',
    '#FF9F0A', '#FF375F', '#64D2FF', '#ffffff'
  ];
  const isDark = () => document.documentElement.dataset.theme !== 'light';

  // ── Resize ──
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ── Particle class ──
  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = Math.random() * canvas.width;
      this.y  = init ? Math.random() * canvas.height : canvas.height + 10;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(0.3 + Math.random() * 0.8);
      this.size   = 1 + Math.random() * 2;
      this.alpha  = 0;
      this.maxAlpha = 0.15 + Math.random() * 0.45;
      this.fadeIn = true;
      this.color  = COLS[Math.floor(Math.random() * COLS.length)];
      this.glyph  = null;
      // ~25% chance to be a code glyph
      if (Math.random() < 0.25) {
        const glyphs = [
          '{', '}', '<', '>', '/', '*', '#', '0', '1',
          '=>', '&&', '||', '()', '[]', ';;', '::',
          'λ', 'Σ', '∞', '⌘', '⚡', '▲', '◆', '●'
        ];
        this.glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        this.size  = 9 + Math.random() * 10;
      }
    }
    update() {
      this.x += this.vx + Math.sin(Date.now() * 0.0006 + this.y * 0.01) * 0.18;
      this.y += this.glyph ? this.vy * 2.5 : this.vy;
      if (this.fadeIn) {
        this.alpha += 0.008;
        if (this.alpha >= this.maxAlpha) this.fadeIn = false;
      } else {
        this.alpha -= 0.003;
      }
      if (this.alpha <= 0 || this.y < -40) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle   = this.color;
      if (this.glyph) {
        ctx.font = `${this.size}px 'Courier New', monospace`;
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = 8;
        ctx.fillText(this.glyph, this.x, this.y);
      } else {
        ctx.shadowColor = this.color;
        ctx.shadowBlur  = 12;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // ── Neural network nodes ──
  class Node {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.r  = 1.5 + Math.random() * 2;
      this.color = COLS[Math.floor(Math.random() * 4)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur  = 10;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ── Init ──
  const PARTICLE_COUNT = Math.min(140, Math.floor(canvas.width * canvas.height / 9000));
  const NODE_COUNT     = 38;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  const nodes     = Array.from({ length: NODE_COUNT },     () => new Node());
  const CONNECT_DIST = 130;

  // ── Flowing gradient mesh ──
  let t = 0;
  function drawMesh() {
    t += 0.004;
    const w = canvas.width, h = canvas.height;
    const dark = isDark();

    // Base gradient
    const bg = ctx.createRadialGradient(
      w * (0.3 + 0.15 * Math.sin(t)),
      h * (0.35 + 0.12 * Math.cos(t * 0.8)),
      0,
      w * 0.5, h * 0.5,
      Math.max(w, h) * 0.85
    );
    if (dark) {
      bg.addColorStop(0,   'rgba(13,26,46,1)');
      bg.addColorStop(0.4, 'rgba(9,9,15,1)');
      bg.addColorStop(1,   'rgba(9,9,15,1)');
    } else {
      bg.addColorStop(0,   'rgba(219,234,254,1)');
      bg.addColorStop(0.5, 'rgba(237,233,254,1)');
      bg.addColorStop(1,   'rgba(232,240,254,1)');
    }
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Accent orb 1 — blue
    const g1 = ctx.createRadialGradient(
      w * (0.15 + 0.1 * Math.cos(t * 0.7)),
      h * (0.2  + 0.08 * Math.sin(t)),
      0,
      w * 0.2, h * 0.3,
      w * 0.48
    );
    g1.addColorStop(0, dark ? 'rgba(10,132,255,0.28)' : 'rgba(10,132,255,0.12)');
    g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    // Accent orb 2 — purple
    const g2 = ctx.createRadialGradient(
      w * (0.82 + 0.08 * Math.sin(t * 0.9)),
      h * (0.75 + 0.07 * Math.cos(t * 1.1)),
      0,
      w * 0.8, h * 0.7,
      w * 0.42
    );
    g2.addColorStop(0, dark ? 'rgba(191,90,242,0.22)' : 'rgba(191,90,242,0.10)');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);

    // Accent orb 3 — green
    const g3 = ctx.createRadialGradient(
      w * (0.55 + 0.06 * Math.cos(t * 1.3)),
      h * (0.45 + 0.06 * Math.sin(t * 0.6)),
      0,
      w * 0.5, h * 0.5,
      w * 0.32
    );
    g3.addColorStop(0, dark ? 'rgba(48,209,88,0.13)' : 'rgba(48,209,88,0.08)');
    g3.addColorStop(1, 'transparent');
    ctx.fillStyle = g3;
    ctx.fillRect(0, 0, w, h);

    // Accent orb 4 — amber
    const g4 = ctx.createRadialGradient(
      w * (0.75 + 0.1 * Math.sin(t * 0.5)),
      h * (0.18 + 0.07 * Math.cos(t * 1.2)),
      0,
      w * 0.7, h * 0.2,
      w * 0.28
    );
    g4.addColorStop(0, dark ? 'rgba(255,159,10,0.15)' : 'rgba(255,159,10,0.08)');
    g4.addColorStop(1, 'transparent');
    ctx.fillStyle = g4;
    ctx.fillRect(0, 0, w, h);
  }

  // ── Draw connections ──
  function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT_DIST) {
          ctx.save();
          ctx.globalAlpha = (1 - d / CONNECT_DIST) * (isDark() ? 0.18 : 0.1);
          const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
          grad.addColorStop(0, nodes[i].color);
          grad.addColorStop(1, nodes[j].color);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 0.7;
          ctx.shadowColor = nodes[i].color;
          ctx.shadowBlur  = 4;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  // ── Scanline vignette overlay ──
  function drawVignette() {
    const w = canvas.width, h = canvas.height;
    const vig = ctx.createRadialGradient(w/2, h/2, h * 0.25, w/2, h/2, h * 0.9);
    vig.addColorStop(0, 'transparent');
    vig.addColorStop(1, isDark() ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.12)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
  }

  // ── Main loop ──
  let raf;
  function loop() {
    drawMesh();
    drawConnections();
    nodes.forEach(n => { n.update(); n.draw(); });
    particles.forEach(p => { p.update(); p.draw(); });
    drawVignette();
    raf = requestAnimationFrame(loop);
  }
  loop();

  // ── React to theme toggle ──
  const observer = new MutationObserver(() => {});
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // ── Pause when off-screen ──
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!raf) loop(); }
    else { cancelAnimationFrame(raf); raf = null; }
  }, { threshold: 0 });
  io.observe(canvas);
})();