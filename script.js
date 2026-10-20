// Menú móvil
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// Filtro de modelos
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');

    const filter = chip.dataset.filter;
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.type === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
});

// Contadores animados
function animateCount(el) {
  const target = Number(el.dataset.count);
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * progress);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Aparición al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    entry.target.querySelectorAll('[data-count]').forEach(animateCount);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Formulario de contacto
const form = document.getElementById('leadForm');
const email = document.getElementById('email');
const model = document.getElementById('model');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!email.checkValidity() || !email.value.trim()) {
    email.classList.add('is-invalid');
    msg.textContent = 'Por favor ingresa un correo válido.';
    return;
  }

  email.classList.remove('is-invalid');
  msg.textContent = `¡Gracias! Te contactaremos pronto sobre el ${model.value}. 🎉`;
  form.reset();
});
