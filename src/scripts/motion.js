// Page-wide motion: reveal-on-scroll, heading decode, and the pointer glow.
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

// 3. A glow that follows the mouse across the light sections' dot grid.
if (matchMedia('(pointer: fine)').matches) {
  const sections = [...document.querySelectorAll('.section.on-light')];
  let frame = 0;
  let x = 0;
  let y = 0;
  let active = false;

  const paint = () => {
    frame = 0;
    for (const s of sections) {
      if (!active) {
        s.style.removeProperty('--mx');
        s.style.removeProperty('--my');
        continue;
      }
      const r = s.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) continue;
      s.style.setProperty('--mx', `${x - r.left}px`);
      s.style.setProperty('--my', `${y - r.top}px`);
    }
  };
  const queue = () => { if (!frame) frame = requestAnimationFrame(paint); };

  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX;
    y = e.clientY;
    active = true;
    queue();
  }, { passive: true });
  // Scrolling with a still mouse moves the sections under it, so follow along.
  addEventListener('scroll', () => { if (active) queue(); }, { passive: true });
  // Switch the glow off when the mouse leaves the window.
  document.documentElement.addEventListener('pointerleave', () => { active = false; queue(); });
  addEventListener('blur', () => { active = false; queue(); });
}
