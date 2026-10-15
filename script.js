const menuToggle = document.querySelector('#menuToggle');
const nav = document.querySelector('#nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Accordion: keep the page tidy by allowing one process item open at a time.
document.querySelectorAll('.process-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.process-item').forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// Testimonials slider
const track = document.querySelector('#testimonialTrack');
const dots = [...document.querySelectorAll('#testimonialDots button')];
let testimonialIndex = 0;
function showTestimonial(index) {
  testimonialIndex = (index + dots.length) % dots.length;
  track.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === testimonialIndex));
}
document.querySelector('#prevTestimonial').addEventListener('click', () => showTestimonial(testimonialIndex - 1));
document.querySelector('#nextTestimonial').addEventListener('click', () => showTestimonial(testimonialIndex + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => showTestimonial(i)));

// Demo forms validate and show a confirmation; they do not send data to a server.
document.querySelector('#contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  document.querySelector('#formStatus').textContent = `Спасибо${name ? ', ' + name : ''}! Форма заполнена. Для настоящей отправки подключите backend или сервис форм.`;
  form.reset();
});
document.querySelector('#subscribeForm').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('#subscribeEmail');
  document.querySelector('#subscribeStatus').textContent = `Спасибо! Адрес ${input.value} добавлен в демо-форму.`;
  event.currentTarget.reset();
});


// Gentle scroll reveal and a small click animation for interactive controls.
document.documentElement.classList.add('reveal-ready');
const revealTargets = document.querySelectorAll('.section-heading, .service-card, .cta-band, .case-panel, .process-item, .team-card, .testimonial-box, .contact-panel, .logo-strip');
revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.animationDelay = `${(index % 3) * 70}ms`;
});
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(element => revealObserver.observe(element));
} else {
  revealTargets.forEach(element => element.classList.add('is-visible'));
}

document.querySelectorAll('.button, .learn, .case-panel article a').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.remove('clicked');
    void button.offsetWidth;
    button.classList.add('clicked');
    window.setTimeout(() => button.classList.remove('clicked'), 350);
  });
});


// Case study links give a visible click response before smoothly jumping to Contact.
document.querySelectorAll('.case-panel article a').forEach(link => {
  link.addEventListener('click', () => {
    const article = link.closest('article');
    article.classList.remove('case-selected');
    void article.offsetWidth;
    article.classList.add('case-selected');
  });
});
