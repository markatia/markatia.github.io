// Footer year
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Mobile nav
var toggle = document.querySelector('.nav-toggle');
var nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Header stickiness only after hero
var header = document.querySelector('.site-header');
var hero = document.querySelector('.hero');
if (header && hero) {
  var updateHeaderStickyState = function () {
    var triggerY = hero.offsetTop + hero.offsetHeight - header.offsetHeight;
    var shouldStick = window.scrollY > triggerY;

    header.classList.toggle('is-sticky-active', shouldStick);
    document.body.style.paddingTop = shouldStick ? header.offsetHeight + 'px' : '';
  };

  updateHeaderStickyState();
  window.addEventListener('scroll', updateHeaderStickyState, { passive: true });
  window.addEventListener('resize', updateHeaderStickyState);
}

// Scroll reveals — skipped entirely for reduced motion
var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var reveals = document.querySelectorAll('.reveal');

if (prefersReduced || !('IntersectionObserver' in window)) {
  reveals.forEach(function (el) { el.classList.add('is-visible'); });
} else {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (el) { observer.observe(el); });
}
