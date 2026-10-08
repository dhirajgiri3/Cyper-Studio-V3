// S3: Lenis + GSAP ScrollTrigger, synchronised through the GSAP ticker (the documented integration).
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { init } from './s2-core.js';
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ anchors: true, autoRaf: false });
  window.__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  init();
}
