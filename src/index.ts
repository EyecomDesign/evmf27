import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

CustomEase.create('main', '0.65, 0.01, 0.05, 0.99');

gsap.defaults({
  ease: 'main',
  duration: 0.4,
});

function initSideNavWipeEffect() {
  const navWrap = document.querySelector('[data-sidenav-wrap]');
  if (!navWrap) return;

  let state = navWrap.getAttribute('data-nav-state');
  const overlay = navWrap.querySelector('[data-sidenav-overlay]');
  const menu = navWrap.querySelector('[data-sidenav-menu]');
  const menuToggles = document.querySelectorAll('[data-sidenav-toggle]');
  const menuLinks = navWrap.querySelectorAll('[data-sidenav-link]');
  const fadeTargets = navWrap.querySelectorAll('[data-sidenav-fade]');
  const menuButton = document.querySelector('[data-sidenav-button]');
  if (!menuButton) return;

  const menuButtonIcon = menuButton.querySelector('[data-sidenav-icon]');

  const tl = gsap.timeline();

  const openNav = () => {
    navWrap.setAttribute('data-nav-state', 'open');

    tl.clear()
      .set(navWrap, { display: 'block' })
      .set(menu, { xPercent: 100 })
      .fromTo(menu, { xPercent: 100 }, { xPercent: 0, duration: 0.3 }, '<')
      .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 360 }, '<')
      .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
      .fromTo(
        menuLinks,
        { yPercent: 140, rotate: 10 },
        { yPercent: 0, rotate: 0, stagger: 0.03 },
        '<+=0.1'
      )
      .fromTo(
        fadeTargets,
        { autoAlpha: 0, yPercent: 50 },
        { autoAlpha: 1, yPercent: 0, stagger: 0.02 },
        '<+=0.05'
      );
  };
  //EyecomDesign.github.io/evmf27/index.js
  const closeNav = () => {
    navWrap.setAttribute('data-nav-state', 'closed');

    tl.clear()
      .to(overlay, { autoAlpha: 0 })
      .to(menu, { xPercent: 100, duration: 0.3 }, '<')
      .to(menuButtonIcon, { rotate: 0 }, '<')
      .set(navWrap, { display: 'none' });
  };

  // Toggle menu open / close depending on its current state
  menuToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      state = navWrap.getAttribute('data-nav-state');
      if (state === 'open') {
        closeNav();
      } else {
        openNav();
      }
    });
    // comment
  });

  // Always close the menu when any link inside it is clicked
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navWrap.getAttribute('data-nav-state') === 'open') {
        closeNav();
      }
    });
  });

  // If menu is open, you can close it using the "escape" key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navWrap.getAttribute('data-nav-state') === 'open') {
      closeNav();
    }
  });
}

// Initialize Draggable Infinite GSAP Slider
document.addEventListener('DOMContentLoaded', () => {
  initSideNavWipeEffect();
});
