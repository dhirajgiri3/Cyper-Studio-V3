// A3: the same abstract ribbon as a full-viewport OGL fragment shader. DPR capped at 1.5, paused when hidden or off-screen,
// a single static frame under prefers-reduced-motion.
import { Renderer, Program, Mesh, Triangle } from 'ogl';
const el = document.getElementById('atmos');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const renderer = new Renderer({ canvas: el, dpr: Math.min(devicePixelRatio || 1, 1.5), alpha: false, antialias: false });
const gl = renderer.gl;
const vertex = `attribute vec2 uv;attribute vec2 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`;
const fragment = `precision highp float;varying vec2 vUv;uniform float uTime;uniform vec2 uRes;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
void main(){vec2 uv=vUv;uv.x*=uRes.x/uRes.y;float t=uTime*.05;
 vec2 q=vec2(fbm(uv*1.4+t),fbm(uv*1.4+vec2(5.2,1.3)-t));
 float w=fbm(uv*1.1+q*1.6+t);
 float r=smoothstep(.42,.5,w)-smoothstep(.5,.62,w);
 vec3 bg=vec3(.953,.961,.973);vec3 ink=vec3(.255,.38,.957);
 vec3 c=mix(bg,ink,r*.55);
 c+=(h(vUv*uRes+uTime)-.5)*.045;
 gl_FragColor=vec4(c,1.);}`;
const program = new Program(gl, { vertex, fragment, uniforms: { uTime: { value: 0 }, uRes: { value: [1, 1] } } });
const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
function size() { const r = el.parentElement.getBoundingClientRect(); renderer.setSize(r.width, r.height); program.uniforms.uRes.value = [r.width, r.height]; }
size(); addEventListener('resize', size);
let run = !reduce && !document.hidden, vis = true, raf = 0;
const draw = t => { program.uniforms.uTime.value = t * 0.001; renderer.render({ scene: mesh }); };
const loop = t => { draw(t); if (run && vis) raf = requestAnimationFrame(loop); };
draw(0); if (run) raf = requestAnimationFrame(loop);
document.addEventListener('visibilitychange', () => { run = !reduce && !document.hidden; if (run && vis) raf = requestAnimationFrame(loop); });
new IntersectionObserver(e => { vis = e[0].isIntersecting; if (vis && run) raf = requestAnimationFrame(loop); }).observe(el);
