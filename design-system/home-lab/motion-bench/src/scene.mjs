// One fixed test scene for every motion-stack candidate. Content is bench filler, not site copy.
// Shared markup lives here so S0..S4 differ only in how motion is implemented.
export const COPY = {
  h1: ['Run your own', 'branded shipping', 'platform.'],
  sub: 'Bench scene. A white-label logistics operating system for couriers and 3PLs, under your own name.',
  lit: 'When your merchants ship on someone else\'s platform they learn someone else\'s name. Run the pickups, the hubs and the deliveries under your own brand, your own domain and your own colours, and keep the relationship with every merchant you bring in.',
  steps: [
    { t: 'Set your brand', d: 'Name, domain and colours are yours.' },
    { t: 'Add your merchants', d: 'They sign up on your platform.' },
    { t: 'Open for business', d: 'Everything they see carries your name.' },
  ],
  panels: ['Your brand', 'Your domain', 'Your colours', 'Your merchants', 'Your name'],
};
export const words = COPY.lit.split(/\s+/);

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
export function scene({ variant, wordsMarkup = 'static', stepsHeight = 'css' } = {}) {
  const wordSpans = wordsMarkup === 'static'
    ? words.map((w, i) => `<span class="w" style="--i:${i}">${esc(w)}</span>`).join(' ')
    : esc(COPY.lit);
  return `<a class="skip" href="#main">Skip to content</a>
<header class="hdr" id="top"><a class="brand" href="#top" aria-label="Bench scene, top">HELIX <i>bench</i></a>
  <nav aria-label="Primary"><a href="#lit">Lit text</a><a href="#steps">Steps</a><a href="#panels">Panels</a><a href="#end">Form</a></nav>
  <a class="btn btn--ghost" href="#end">Request a demo</a></header>
<main id="main">
<section class="hero" aria-labelledby="h1"><div class="wrap hero__grid">
  <div><p class="eyebrow">Bench ${variant} · scene filler, not site copy</p>
  <h1 id="h1">${COPY.h1.map((l, i) => `<span class="line" style="--i:${i}">${l}</span>`).join(' ')}</h1>
  <p class="sub">${COPY.sub}</p>
  <p><a class="btn" href="#end">Request a demo</a></p></div>
  <div class="frame" role="img" aria-label="Screenshot pending: placeholder frame for the operator console"><span>Screenshot pending</span></div>
</div></section>
<section class="lit" id="lit" aria-label="Scroll-lit paragraph"><div class="wrap"><p class="lit__p" data-lit>${wordSpans}</p></div></section>
<section class="steps" id="steps" aria-labelledby="steps-h"><div class="steps__stick"><div class="wrap steps__grid">
  <div><h2 id="steps-h">Three steps</h2><div class="bar" aria-hidden="true"><i></i></div></div>
  <ol class="steps__list">${COPY.steps.map((s, k) => `<li class="step" style="--k:${k}"><b>${k + 1}</b><div><h3>${s.t}</h3><p>${s.d}</p></div></li>`).join('')}</ol>
</div></div></section>
<section class="h" id="panels" aria-labelledby="panels-h"><div class="h__stick"><div class="wrap"><h2 id="panels-h">Five panels</h2></div>
  <div class="track">${COPY.panels.map((p, k) => `<article class="p"><small>${String(k + 1).padStart(2, '0')}</small><h3>${p}</h3><p>Panel ${k + 1} of 5. Filler text so find-in-page has something to find.</p></article>`).join('')}</div>
</div></section>
<section class="end" id="end"><div class="wrap"><h2>Request a demo</h2>
  <p>Interaction target for the INP test: the button below toggles a sample brand colour.</p>
  <div class="card" id="card"><b>Sample tenant</b><span>Kestrel Couriers</span></div>
  <p><button class="btn" id="toggle" type="button" aria-pressed="false">Toggle sample brand</button></p></div></section>
</main>
<footer class="foot"><div class="wrap">Bench scene. Founded 2024. info@cyper.studio</div></footer>`;
}
