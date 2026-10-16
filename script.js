(function () {
  'use strict';

  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.textContent = open ? 'Close' : 'Menu';
  }

  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      burger.focus();
    }
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Highlight the nav link for the section in view
  var links = menu.querySelectorAll('a[href^="#"]:not(.pill)');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) io.observe(s);
    });
  }

  // Pause the SVG drone animation for people who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var svg = document.querySelector('.radar svg');
    if (svg && svg.pauseAnimations) svg.pauseAnimations();
  }
})();
