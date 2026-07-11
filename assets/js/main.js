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

// Header stickiness after the first content block (hero or case-study header)
var header = document.querySelector('.site-header');
var stickyTrigger = document.querySelector('.hero') || document.querySelector('.cs-header');
if (header && stickyTrigger) {
  var updateHeaderStickyState = function () {
    var triggerY = stickyTrigger.offsetTop + stickyTrigger.offsetHeight - header.offsetHeight;
    var shouldStick = window.scrollY > triggerY;

    header.classList.toggle('is-sticky-active', shouldStick);
    document.body.style.paddingTop = shouldStick ? header.offsetHeight + 'px' : '';
  };

  updateHeaderStickyState();
  window.addEventListener('scroll', updateHeaderStickyState, { passive: true });
  window.addEventListener('resize', updateHeaderStickyState);
}

// Active nav item based on which section is in view
var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href*="#"]'));
var navSections = navLinks
  .map(function (link) {
    var href = link.getAttribute('href') || '';
    var hashIndex = href.indexOf('#');
    if (hashIndex === -1) return null;

    var id = href.slice(hashIndex + 1);
    var section = id ? document.getElementById(id) : null;
    return section ? { id: id, el: section, link: link } : null;
  })
  .filter(Boolean);

if (navSections.length) {
  var setActiveNav = function () {
    var headerOffset = (header ? header.offsetHeight : 0) + 24;
    var active = null;

    navSections.forEach(function (section) {
      if (section.el.getBoundingClientRect().top <= headerOffset) {
        active = section;
      }
    });

    // Near page bottom, prefer the last section
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 4)) {
      active = navSections[navSections.length - 1];
    }

    navSections.forEach(function (section) {
      section.link.classList.toggle('is-active', section === active);
    });
  };

  setActiveNav();
  window.addEventListener('scroll', setActiveNav, { passive: true });
  window.addEventListener('resize', setActiveNav);
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
