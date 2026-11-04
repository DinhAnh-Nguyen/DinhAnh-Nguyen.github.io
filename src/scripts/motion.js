// Page-wide motion: reveal-on-scroll and the heading decode.
// Everything here is optional polish. Without JavaScript the page is fully
// visible, and with "reduce motion" on nothing moves.
import { planDecode, frameAt } from '../lib/scramble.js';

// Tell the inline guard in the layout that this script is running, so it
// does not switch the reveal animations off.
document.documentElement.setAttribute('data-motion-ready', '');

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let printing = false;
addEventListener('beforeprint', () => {
  printing = true;
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  document.querySelectorAll('[data-decode]').forEach((el) => { el.textContent = el.dataset.decode; });
});
addEventListener('afterprint', () => { printing = false; });

// 1. Reveal rows and blocks as they scroll into view.
const reveals = document.querySelectorAll('.reveal');
if (reduced.matches || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );
  reveals.forEach((el) => io.observe(el));
}

// 2. Headings decode into place just before they scroll into view. The real
//    text stays in the page the whole time; it is only scrambled while the
//    animation runs, so find-in-page and copy always work.
if (!reduced.matches && 'IntersectionObserver' in window) {
  const DURATION = 700;
  document.querySelectorAll('[data-decode]').forEach((el, n) => {
    const target = el.dataset.decode;
    const plan = planDecode(target, n + 11);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      let tick = 0;
      const step = (now) => {
        if (printing) { el.textContent = target; return; }
        const p = Math.min((now - start) / DURATION, 1);
        el.textContent = frameAt(target, plan, p, tick++);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { rootMargin: '0px 0px 120px 0px', threshold: 0 });
    io.observe(el);
  });
}
