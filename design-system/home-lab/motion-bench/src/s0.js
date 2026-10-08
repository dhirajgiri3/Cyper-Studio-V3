// S0 fallback only. Runs when CSS scroll-driven animations are not supported (or ?fallback=1 forces it for measurement).
// Writes three progress variables; all visual work stays in CSS (transform/opacity, paused animations seeked by delay).
(function () {
  var force = /[?&]fallback=1/.test(location.search);
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supported = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  if (reduce || (supported && !force)) return;
  var root = document.documentElement;
  root.classList.add('fallback', 'pin');
  var lit = document.querySelector('[data-lit]'), steps = document.getElementById('steps'), panels = document.getElementById('panels');
  var n = lit.querySelectorAll('.w').length; lit.style.setProperty('--n', n);
  var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var ticking = false;
  function frame() {
    ticking = false; var vh = innerHeight;
    var r = lit.getBoundingClientRect(); lit.style.setProperty('--p', clamp((vh * 0.9 - r.top) / (r.height + vh * 0.5)).toFixed(4));
    r = steps.getBoundingClientRect(); steps.style.setProperty('--ps', clamp(-r.top / (r.height - vh)).toFixed(4));
    r = panels.getBoundingClientRect(); panels.style.setProperty('--pp', clamp(-r.top / (r.height - vh)).toFixed(4));
  }
  function on() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', on, { passive: true }); addEventListener('resize', on); frame();
})();
