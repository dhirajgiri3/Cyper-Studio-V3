// S2: GSAP + ScrollTrigger + SplitText, loaded after first paint. Same scene as S0, implemented the common GSAP way.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(ScrollTrigger, SplitText);
export function init() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const root = document.documentElement; root.classList.add('gsap');
  const hdr = 64;
  // hero entrance (starts when the library arrives, after first paint)
  gsap.from('h1 .line', { y: 12, duration: .7, ease: 'power3.out', stagger: .07 });
  gsap.from('.frame', { y: 24, autoAlpha: 0, duration: .9, delay: .2, ease: 'power3.out' });
  // scroll-lit paragraph: SplitText words, one scrubbed tween
  const p = document.querySelector('[data-lit]');
  const split = SplitText.create(p, { type: 'words' });
  gsap.fromTo(split.words, { opacity: .22 }, { opacity: 1, ease: 'none', stagger: .12,
    scrollTrigger: { trigger: p, start: 'top 85%', end: 'bottom 45%', scrub: true } });
  // pinned three-step sequence
  const steps = gsap.utils.toArray('.step');
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#steps', start: `top ${hdr}px`, end: '+=300%', pin: true, scrub: true } });
  tl.fromTo('.bar i', { scaleX: 0 }, { scaleX: 1, duration: 3 }, 0);
  steps.forEach((s, k) => {
    if (k > 0) tl.fromTo(s, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .3 }, k);
    else gsap.set(s, { autoAlpha: 1 });
    if (k < steps.length - 1) tl.to(s, { autoAlpha: 0, y: -16, duration: .3 }, k + 1 - .32);
  });
  // horizontal reveal
  const track = document.querySelector('.track');
  const dist = () => track.scrollWidth - innerWidth + 40;
  gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#panels', start: `top ${hdr}px`, end: () => '+=' + dist(), pin: true, scrub: true, invalidateOnRefresh: true } });
}
