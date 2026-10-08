import { head, header, symbols, form, footer, merchantScreen, trackScreen, frame, TENANTS, ENTITY, TRUST_CONFIRM, SCRIPT_FORM, ENTRY } from './shared.mjs';
const css = `
.hero-c{padding:var(--s8) 0 var(--s8)}
.hero-c__grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:var(--s7);align-items:start}
.hero-c .h-display{font-size:clamp(2.25rem,1rem + 3.6vw,3.75rem)}
.matrix{display:grid;gap:var(--s5)}
.mrow{display:grid;gap:var(--s3)}
.mrow__h{display:flex;flex-wrap:wrap;align-items:center;gap:var(--s2) var(--s3);margin:0;font:500 .8125rem/1.4 var(--font-mono);color:var(--ink);letter-spacing:.02em}
.mrow__h i{width:12px;height:12px;border-radius:3px;display:inline-block}.mrow__h span{color:var(--muted)}
.mrow__cells{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:var(--s4);align-items:start}
.cell .pf__in{padding:6px;border-radius:var(--r-md);box-shadow:var(--shadow-1)}.cell .pf__in::before,.cell .pf__in::after{display:none}
.cell .pf figcaption{display:none}
.matrix .tw{font-size:.75rem}.matrix .tw__body{grid-template-columns:1fr}.matrix .tw__side{display:none}.matrix .tw__top{padding:var(--s2) var(--s3);gap:var(--s3)}
.matrix .tw__dom{display:none}.matrix .tw__main{padding:var(--s3)}.matrix .rates td{padding:6px var(--s2)}
.cols{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:var(--s4);margin:0 0 var(--s2);font:500 .8125rem/1.4 var(--font-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.mcap{margin:var(--s4) 0 0;font:500 .8125rem/1.4 var(--font-mono);color:var(--muted)}
@media (max-width:980px){.hero-c__grid{grid-template-columns:1fr;gap:var(--s7)}}
@media (max-width:520px){.mrow__cells,.cols{grid-template-columns:1fr}.cols{display:none}}
@keyframes in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:no-preference){.cell{animation:in 250ms var(--ease) both;animation-delay:calc(var(--n)*90ms + 200ms)}}
`;
const row = (t, i) => `<div class="mrow"><p class="mrow__h"><i style="background:${t.t}"></i>${t.name}<span>${t.dom}</span></p>
  <div class="mrow__cells"><div class="cell" style="--n:${i * 2}">${frame(merchantScreen(t, { compact: true }), 'Sample', `Illustrative merchant booking screen, sample brand ${t.name}`, 'C-06,C-07')}</div>
  <div class="cell" style="--n:${i * 2 + 1}">${frame(trackScreen(t), 'Sample', `Illustrative consumer tracking page, sample brand ${t.name}`, 'C-06')}</div></div></div>`;
export default () => `${head({ css })}
<body>
${ENTRY('HERO-C white-label proof pair')}
${symbols()}
${header()}
<main id="main">
<section class="hero-c" aria-labelledby="h1"><div class="wrap hero-c__grid">
  <div>
    <p class="eyebrow"><b>HELIX</b> by Cyper Studio, a product engineering company in India</p>
    <h1 class="h-display" id="h1">Run your own branded shipping platform.</h1>
    <p class="sub" data-claim="C-04,C-05">HELIX is a white-label, multi-tenant logistics operating system for couriers, 3PLs, freight brokers, franchise networks and aggregators in India. The same platform runs under every operator's own brand, domain and colours.</p>
    <div class="cta-row"><a class="btn btn--lg" href="#request-demo">Request a demo</a></div>
    <p class="entity">${ENTITY}</p>
    <p class="trust small"><span class="ph" data-claim="C-15">${TRUST_CONFIRM}</span></p>
  </div>
  <div class="matrix" id="product" role="group" aria-label="The same two screens under two sample brands" data-claim="C-06" data-status="{{CONFIRM: live today or planned}}">
    <div class="cols" aria-hidden="true"><span>Merchant books</span><span>Consumer tracks</span></div>
    ${TENANTS.slice(0, 2).map(row).join('')}
    <p class="mcap">Illustrative interfaces. Same engine, two fictional brands. Sample data.</p>
  </div>
</div></section>
</main>
${form()}
${footer()}
<script>${SCRIPT_FORM}</script>
</body></html>
`;
