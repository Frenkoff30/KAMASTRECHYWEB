// ===== MOBILE MENU =====
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// ===== HEADER SCROLL =====
const header    = document.getElementById('header');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 40);
  scrollTop.classList.toggle('visible', y > 400);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// ===== GALLERY LOADER =====
// Přidej fotky do images/galerie/ – podporuje jpg, jpeg, png, webp
// Pak sem napiš jejich názvy:
const galleryImages = [
  // 'strecha1.jpg',
  // 'strecha2.jpg',
];

const galleryGrid = document.getElementById('galleryGrid');

if (galleryImages.length > 0) {
  galleryGrid.innerHTML = '';
  galleryImages.forEach(file => {
    const item = document.createElement('div');
    item.className = 'gallery__item';
    item.innerHTML = `<img src="images/galerie/${file}" alt="Realizace KAMA STŘECHY" loading="lazy" />`;
    item.addEventListener('click', () => openLightbox(`images/galerie/${file}`));
    galleryGrid.appendChild(item);
  });
}

// ===== LIGHTBOX =====
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <button class="lightbox__close" aria-label="Zavřít">✕</button>
  <img class="lightbox__img" src="" alt="Foto" />
`;
document.body.appendChild(lightbox);

function openLightbox(src) {
  lightbox.querySelector('.lightbox__img').src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== CONTACT FORM =====
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Odesílám...';
  formStatus.className = 'form__status';
  formStatus.textContent = '';

  const data = new FormData(form);

  try {
    const res = await fetch('php/contact.php', { method: 'POST', body: data });
    const json = await res.json();

    if (json.success) {
      formStatus.className = 'form__status success';
      formStatus.textContent = '✔ Zpráva odeslána! Ozveme se vám do 24 hodin.';
      form.reset();
    } else {
      throw new Error(json.message || 'Chyba při odesílání');
    }
  } catch (err) {
    formStatus.className = 'form__status error';
    formStatus.textContent = `✗ ${err.message}. Napište nám přímo na strechykama@seznam.cz`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Odeslat poptávku';
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

// ===== SCROLL-REVEAL ANIMATION =====
const revealEls = document.querySelectorAll('.service-card, .contact__card, .about__text');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(el);
});
