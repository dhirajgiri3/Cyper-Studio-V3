// S1: Lenis smooth scrolling, loaded after first paint. Touch stays native (Lenis default syncTouch=false).
import Lenis from 'lenis';
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.__lenis = new Lenis({ anchors: true, autoRaf: true });
}
