// S4: the scene written the way the 21st.dev prompts write motion: React + framer-motion (motion, useScroll, useTransform).
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { COPY, words } from '../scene.mjs';

function Word({ w, i, progress }) {
  const n = words.length;
  const o = useTransform(progress, [Math.max(0, i / (n + 8)), Math.min(1, (i + 8) / (n + 8))], [0.22, 1]);
  return <motion.span className="w" style={{ opacity: o, ['--i']: i }}>{w}</motion.span>;
}
function Lit() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] });
  return <section className="lit" id="lit" aria-label="Scroll-lit paragraph"><div className="wrap"><p className="lit__p" data-lit ref={ref}>
    {words.map((w, i) => <React.Fragment key={i}><Word w={w} i={i} progress={scrollYProgress} />{' '}</React.Fragment>)}</p></div></section>;
}
function Step({ s, k, progress }) {
  const a = k * 0.333;
  const inp = k === 0 ? [0, 0.274, 0.307] : k === 2 ? [a, a + 0.033, 1] : [a, a + 0.033, a + 0.274, a + 0.307];
  const op = useTransform(progress, inp, k === 0 ? [1, 1, 0] : k === 2 ? [0, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, inp, k === 0 ? [0, 0, -16] : k === 2 ? [16, 0, 0] : [16, 0, 0, -16]);
  return <motion.li className="step" style={{ opacity: op, y }}><b>{k + 1}</b><div><h3>{s.t}</h3><p>{s.d}</p></div></motion.li>;
}
function Steps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const sx = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <section className="steps" id="steps" aria-labelledby="steps-h" ref={ref}><div className="steps__stick"><div className="wrap steps__grid">
    <div><h2 id="steps-h">Three steps</h2><div className="bar" aria-hidden="true"><motion.i style={{ scaleX: sx, transformOrigin: 'left' }} /></div></div>
    <ol className="steps__list">{COPY.steps.map((s, k) => <Step key={k} s={s} k={k} progress={scrollYProgress} />)}</ol>
  </div></div></section>;
}
function Panels() {
  const ref = useRef(null), track = useRef(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useLayoutEffect(() => { const f = () => setDist(track.current.scrollWidth - innerWidth + 40); f(); addEventListener('resize', f); return () => removeEventListener('resize', f); }, []);
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  return <section className="h" id="panels" aria-labelledby="panels-h" ref={ref}><div className="h__stick"><div className="wrap"><h2 id="panels-h">Five panels</h2></div>
    <motion.div className="track" ref={track} style={{ x }}>{COPY.panels.map((p, k) => <article className="p" key={k}><small>{String(k + 1).padStart(2, '0')}</small><h3>{p}</h3><p>Panel {k + 1} of 5. Filler text so find-in-page has something to find.</p></article>)}</motion.div>
  </div></section>;
}
export default function App() {
  const [on, setOn] = useState(false);
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="hdr" id="top"><a className="brand" href="#top" aria-label="Bench scene, top">HELIX <i>bench</i></a>
      <nav aria-label="Primary"><a href="#lit">Lit text</a><a href="#steps">Steps</a><a href="#panels">Panels</a><a href="#end">Form</a></nav>
      <a className="btn btn--ghost" href="#end">Request a demo</a></header>
    <main id="main">
      <section className="hero" aria-labelledby="h1"><div className="wrap hero__grid">
        <div><p className="eyebrow">Bench S4 · scene filler, not site copy</p>
          <h1 id="h1">{COPY.h1.map((l, i) => <motion.span className="line" key={i} initial={{ y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}>{l}{' '}</motion.span>)}</h1>
          <p className="sub">{COPY.sub}</p><p><a className="btn" href="#end">Request a demo</a></p></div>
        <motion.div className="frame" role="img" aria-label="Screenshot pending: placeholder frame for the operator console" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}><span>Screenshot pending</span></motion.div>
      </div></section>
      <Lit /><Steps /><Panels />
      <section className="end" id="end"><div className="wrap"><h2>Request a demo</h2>
        <p>Interaction target for the INP test: the button below toggles a sample brand colour.</p>
        <div className={'card' + (on ? ' on' : '')} id="card"><b>Sample tenant</b><span>Kestrel Couriers</span></div>
        <p><button className="btn" id="toggle" type="button" aria-pressed={on} onClick={() => setOn(v => !v)}>Toggle sample brand</button></p></div></section>
    </main>
    <footer className="foot"><div className="wrap">Bench scene. Founded 2024. info@cyper.studio</div></footer>
  </>;
}
