// === ArrivalX Docs — Shared Module: lang toggle, mobile nav, doc navigation ===
(function() {
'use strict';

// Restore lang from localStorage
const saved = localStorage.getItem('ax-lang') || 'en';
document.documentElement.setAttribute('data-lang', saved);
updateAllText(saved);

// Lang toggle
window.toggleLang = function() {
  const current = document.documentElement.getAttribute('data-lang') || 'en';
  const next = current === 'en' ? 'zh' : 'en';
  document.documentElement.setAttribute('data-lang', next);
  localStorage.setItem('ax-lang', next);
  updateAllText(next);
};

function updateAllText(lang) {
  document.querySelectorAll('[data-en][data-zh]').forEach(function(el) {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.zh;
  });
  var btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'en' ? '中文' : 'English';
  // Update title attributes on doc-sub-nav links
  document.querySelectorAll('.doc-sub-nav a').forEach(function(a) {
    if (a.dataset.en && a.dataset.zh) {
      a.textContent = lang === 'en' ? a.dataset.en : a.dataset.zh;
    }
  });
}

// Mobile menu
window.toggleMobileMenu = function() {
  var nl = document.querySelector('.nav-links');
  if (nl) nl.classList.toggle('open');
};

// Close mobile nav on click outside / scroll
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

document.addEventListener('click', function(e) {
  var nav = document.querySelector('.nav-links');
  var btn = document.querySelector('.mobile-menu-btn');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && e.target !== btn && (btn && !btn.contains(e.target))) {
    nav.classList.remove('open');
  }
});

var scrollTicking = false;
window.addEventListener('scroll', function() {
  if (!scrollTicking) {
    requestAnimationFrame(function() {
      var nav = document.querySelector('.nav-links');
      if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

// Nav shadow on scroll
var nav = document.getElementById('nav');
window.addEventListener('scroll', function() {
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

})();
