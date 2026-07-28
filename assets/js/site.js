/* Davi Rodrigues Fotografia — comportamento das paginas */

(function () {
  'use strict';

  /* Revelacao ao rolar. Elementos com .rev sobem e aparecem uma unica vez. */
  function initReveal() {
    var targets = document.querySelectorAll('.rev');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* FAQ: uma pergunta por vez, com a proxima espiando pela borda. */
  function initFaq() {
    var track = document.getElementById('faq-track');
    if (!track) return;

    var total = track.children.length;
    var idx = 0;
    var iEl = document.getElementById('faq-i');
    var nEl = document.getElementById('faq-n');
    var prev = document.getElementById('faq-prev');
    var next = document.getElementById('faq-next');
    if (nEl) nEl.textContent = total;

    function render() {
      /* cada slide ocupa 88% da largura do track, entao o passo e 88% */
      track.style.transform = 'translateX(' + (-idx * 88) + '%)';
      if (iEl) iEl.textContent = idx + 1;
      if (prev) prev.disabled = (idx === 0);
      if (next) next.disabled = (idx === total - 1);
    }

    if (prev) prev.addEventListener('click', function () { if (idx > 0) { idx--; render(); } });
    if (next) next.addEventListener('click', function () { if (idx < total - 1) { idx++; render(); } });

    /* setas do teclado quando o carrossel esta em foco */
    track.closest('.ab-faq').addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft' && idx > 0) { idx--; render(); }
      if (ev.key === 'ArrowRight' && idx < total - 1) { idx++; render(); }
    });

    render();
  }

  function init() {
    initReveal();
    initFaq();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
