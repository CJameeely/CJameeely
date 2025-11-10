const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const submenuToggles = document.querySelectorAll('.submenu-toggle');

function closeAllSubmenus() {
  document.querySelectorAll('.nav-group').forEach(group => {
    group.classList.remove('open');
    const toggle = group.querySelector('.submenu-toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) {
      closeAllSubmenus();
    }
  });
}

submenuToggles.forEach(toggle => {
  toggle.addEventListener('click', event => {
    const group = event.currentTarget.closest('.nav-group');
    const isOpen = group.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 960 && siteNav) {
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    closeAllSubmenus();
  }
});
