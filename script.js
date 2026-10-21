// Menú móvil
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

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
}
let saved = 'en';
try { saved = localStorage.getItem('lang') || (navigator.language.startsWith('es') ? 'es' : 'en'); } catch (e) {}
if (saved === 'es') setLang('es');
langBtn.addEventListener('click', () => setLang(document.documentElement.lang === 'en' ? 'es' : 'en'));

// Animación al hacer scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

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
