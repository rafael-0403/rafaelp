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