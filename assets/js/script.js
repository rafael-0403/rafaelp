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
thBtn.addEventListener('click', () => {
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  thBtn.textContent = isDark ? '🌙' : '☀️';
});

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

/* ─── ACTIVE NAV ─── */
const secs = document.querySelectorAll('section[id]');
const nls = document.querySelectorAll('.nl');
window.addEventListener('scroll', () => {
  const pos = window.scrollY + 130;
  secs.forEach(s => {
    if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
      nls.forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + s.id));
    }
  });
});

/* ─── BACK TO TOP ─── */
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => btt.classList.toggle('v', window.scrollY > 300));

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

/* ─── BADGE SLIDER ─── */
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
