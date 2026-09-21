'use strict';

const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const menuUse = menuToggle?.querySelector('use');

menuToggle?.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuUse?.setAttribute('href', open ? '#i-close' : '#i-menu');
});

document.querySelectorAll('.has-submenu > button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.has-submenu');
    const open = !item.classList.contains('open');
    document.querySelectorAll('.has-submenu.open').forEach((current) => {
      if (current !== item) {
        current.classList.remove('open');
        current.querySelector('button')?.setAttribute('aria-expanded', 'false');
      }
    });
    item.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
  });
});

const searchDialog = document.querySelector('.search-dialog');
const searchInput = document.querySelector('#site-search');
const openSearch = () => {
  searchDialog.hidden = false;
  body.classList.add('no-scroll');
  window.setTimeout(() => searchInput?.focus(), 30);
};
const closeSearch = () => {
  searchDialog.hidden = true;
  body.classList.remove('no-scroll');
};
document.querySelector('.search-open')?.addEventListener('click', openSearch);
document.querySelector('.search-close')?.addEventListener('click', closeSearch);
document.querySelector('.search-backdrop')?.addEventListener('click', closeSearch);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !searchDialog.hidden) closeSearch();
});

const accessibilityToggle = document.querySelector('.accessibility-toggle');
accessibilityToggle?.addEventListener('click', () => {
  const enabled = body.classList.toggle('accessible');
  accessibilityToggle.setAttribute('aria-pressed', String(enabled));
  accessibilityToggle.querySelector('span').textContent = enabled ? 'Обычная версия' : 'Версия для слабовидящих';
});

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.slide-dot')];
function showSlide(index) {
  slides.forEach((slide, current) => {
    const active = current === index;
    slide.hidden = !active;
    slide.classList.toggle('active', active);
  });
  dots.forEach((dot, current) => dot.classList.toggle('active', current === index));
}
dots.forEach((dot) => dot.addEventListener('click', () => showSlide(Number(dot.dataset.target))));

const servicesToggle = document.querySelector('.services-toggle');
const extraServices = document.querySelector('.extra-services');
servicesToggle?.addEventListener('click', () => {
  const expanded = servicesToggle.getAttribute('aria-expanded') !== 'true';
  servicesToggle.setAttribute('aria-expanded', String(expanded));
  extraServices.hidden = !expanded;
  servicesToggle.firstChild.textContent = expanded ? 'Скрыть сервисы ' : 'Все сервисы ';
});

document.querySelectorAll('[data-news]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const name = tab.dataset.news;
    document.querySelectorAll('[data-news]').forEach((button) => {
      const active = button === tab;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('[data-panel]').forEach((panel) => {
      const active = panel.dataset.panel === name;
      panel.hidden = !active;
      panel.classList.toggle('active', active);
    });
  });
});

const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => toTop?.classList.toggle('visible', window.scrollY > 600), { passive: true });
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
