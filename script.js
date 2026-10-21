const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Menú móvil
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
function setMenu(open) {
  nav.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
}
menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
// Al cruzar el punto de corte (p. ej. al girar una tablet) cambiar sin animar, para que el menú no destelle
matchMedia('(min-width: 861px)').addEventListener('change', e => {
  if (e.matches) setMenu(false);
  nav.classList.add('no-anim');
  requestAnimationFrame(() => requestAnimationFrame(() => nav.classList.remove('no-anim')));
});

// Cambio de idioma EN / ES (se recuerda en el navegador)
const langBtn = document.getElementById('langBtn');
function setLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerHTML = el.dataset[lang];
  });
  document.querySelectorAll('[data-aria-en]').forEach(el => {
    el.setAttribute('aria-label', lang === 'en' ? el.dataset.ariaEn : el.dataset.ariaEs);
  });
  langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
  try { localStorage.setItem('lang', lang); } catch (e) {}
  splitTagline();
}
let saved = 'en';
try { saved = localStorage.getItem('lang') || (navigator.language.startsWith('es') ? 'es' : 'en'); } catch (e) {}
if (saved === 'es') setLang('es'); else splitTagline();
langBtn.addEventListener('click', () => setLang(document.documentElement.lang === 'en' ? 'es' : 'en'));

// Lema: separar en palabras y encenderlas una a una según avanza el scroll
function splitTagline() {
  document.querySelectorAll('#tagline .line').forEach(line => {
    const words = line.textContent.trim().split(/\s+/);
    line.textContent = '';
    words.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = w;
      line.append(span, i < words.length - 1 ? ' ' : '');
    });
  });
  updateTagline();
}
function updateTagline() {
  const text = document.getElementById('tagline');
  const words = text.querySelectorAll('.word');
  const r = text.getBoundingClientRect();
  const start = innerHeight * 0.85, end = innerHeight * 0.45;
  const progress = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
  const lit = reduceMotion ? words.length : Math.round(progress * words.length);
  words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
}
let taglineTick = false;
function onTaglineScroll() {
  if (taglineTick) return;
  taglineTick = true;
  requestAnimationFrame(() => { updateTagline(); taglineTick = false; });
}
// Solo escuchar el scroll mientras el lema está cerca de la pantalla
new IntersectionObserver(([e]) => {
  if (e.isIntersecting) { addEventListener('scroll', onTaglineScroll, { passive: true }); updateTagline(); }
  else removeEventListener('scroll', onTaglineScroll);
}).observe(document.querySelector('.tagline'));

// Animación al hacer scroll (al terminar se quita .reveal: su transform anulaba el hover y el clic de las tarjetas)
function revealDone(ev) {
  if (ev.target !== this) return;
  this.classList.remove('reveal', 'is-visible');
  this.style.transitionDelay = '';
  this.removeEventListener('transitionend', revealDone);
}
const io = new IntersectionObserver(entries => {
  let n = 0; // lo que entra a la vez aparece en cascada (p. ej. una fila de tarjetas)
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.style.transitionDelay = Math.min(n++, 5) * 90 + 'ms';
    e.target.addEventListener('transitionend', revealDone);
    e.target.classList.add('is-visible');
    io.unobserve(e.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Marcar en el menú la sección que se está viendo
const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
function setActive(link) {
  navLinks.forEach(a => {
    a.classList.toggle('is-active', a === link);
    if (a === link) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  });
}
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const link = nav.querySelector(`a[href="#${e.target.id}"]`);
    if (e.isIntersecting) setActive(link);
    else if (link.classList.contains('is-active')) setActive(null);
  });
}, { rootMargin: '-40% 0px -55% 0px' });
navLinks.forEach(a => spy.observe(document.querySelector(a.getAttribute('href'))));

// Ocultar el WhatsApp flotante en Contacto (ya hay botones ahí y tapaba el de Fernando)
const waFloat = document.querySelector('.wa-float');
const waZones = new Set();
const waIo = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting ? waZones.add(e.target) : waZones.delete(e.target));
  waFloat.classList.toggle('is-hidden', waZones.size > 0);
});
document.querySelectorAll('#contact, .footer').forEach(el => waIo.observe(el));

// Año del footer
document.getElementById('year').textContent = new Date().getFullYear();
