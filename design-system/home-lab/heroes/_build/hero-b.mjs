import { head, header, symbols, form, footer, consoleFrame, frame, wordmark, ENTITY, TRUST_CONFIRM, SCRIPT_FORM, ENTRY } from './shared.mjs';
const css = `
.hero-b{padding:var(--s7) 0 0}
.hero-b .h-display{font-size:clamp(2.5rem,.5rem + 6.4vw,5rem);line-height:.97;letter-spacing:-.045em;font-weight:800;max-width:15ch;text-wrap:balance;margin:0}
html[data-type="1"] .hero-b .h-display{font-weight:600;letter-spacing:-.03em}
html[data-type="2"] .hero-b .h-display{font-weight:700;letter-spacing:-.04em}
.hero-b__row{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:var(--s7);align-items:start;margin-top:var(--s5)}
.hero-b .sub{margin:0}
.hero-b .cta-row{margin-top:0}.hero-b .entity{margin-top:var(--s4)}
@media (max-width:860px){.hero-b__row{grid-template-columns:1fr;gap:var(--s5)}.hero-b .h-display{max-width:none}}
.product{padding:var(--s8) 0 var(--sec-pad)}
.product .pf__in{max-width:1080px}
/* the console rises as the page scrolls: native scroll-driven animation, transform only, always fully visible, static where unsupported */
@keyframes rise{from{transform:translateY(56px) scale(.975)}to{transform:none}}
@media (prefers-reduced-motion:no-preference){@supports (animation-timeline:view()){.rise{animation:rise linear both;animation-timeline:view();animation-range:entry 0% entry 70%;transform-origin:50% 0}}}
.con__tbl{min-width:34rem}.con__body{overflow-x:auto}
.statement{max-width:30ch;font-size:clamp(1.5rem,1rem + 1.6vw,2.25rem);line-height:1.2;letter-spacing:-.025em;color:var(--ink);font-weight:600;margin:0}
.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin:var(--s7) 0 0;border-top:1px solid var(--ink)}
.facts div{padding:var(--s5) var(--s5) 0 0}.facts div+div{padding-left:var(--s5);border-left:1px solid var(--border)}.facts h3{font-size:1.125rem;margin-bottom:var(--s2)}.facts p{margin:0;font-size:1rem}
@media (max-width:760px){.facts{grid-template-columns:1fr}.facts div,.facts div+div{padding:var(--s4) 0;border-left:0;border-bottom:1px solid var(--border)}}
.bigmark{display:block;width:100%;height:auto;color:var(--accent);margin:var(--s8) 0 0}
`;
export default () => `${head({ css })}
<body>
${ENTRY('HERO-B editorial headline, product rising')}
${symbols()}
${header()}
<main id="main">
<section class="hero-b" aria-labelledby="h1"><div class="wrap">
  <p class="eyebrow"><b>HELIX</b> by Cyper Studio, a product engineering company in India</p>
  <h1 class="h-display" id="h1">White-label logistics software for couriers, 3PLs and freight brokers.</h1>
  <div class="hero-b__row">
    <p class="sub" data-claim="C-04,C-05">Run your own branded shipping platform on HELIX, a multi-tenant logistics operating system. Your domain, your colours, your merchants. For franchise networks and aggregators in India too.</p>
    <div><div class="cta-row"><a class="btn btn--lg" href="#request-demo">Request a demo</a><a class="link" href="#product">See the operator console</a></div>
    <p class="entity">${ENTITY}</p><p class="trust small"><span class="ph" data-claim="C-15">${TRUST_CONFIRM}</span></p></div>
  </div>
</div></section>
<section class="product" id="product" aria-labelledby="p-h"><div class="wrap">
  <p class="label">01 / Product</p><h2 class="sr-h" id="p-h" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">The HELIX operator console</h2>
  <div class="rise">${frame(consoleFrame(), 'Illustrative interface. Sample data. Final version: real operator-console capture, {{CONFIRM: Q-13}}.', 'Illustrative HELIX operator console listing three sample tenants', 'C-04')}</div>
  <p class="statement" style="margin-top:var(--s7)" data-claim="C-04,C-06" data-status="{{CONFIRM: C-06 live today or planned}}">One platform. Every tenant's merchants and consumers see that tenant's brand and domain.</p>
  <div class="facts"><div><h3>Operator</h3><p>Runs the console and every tenant on it.</p></div><div><h3>Merchants</h3><p>Sign up and ship under the operator's brand.</p></div><div><h3>Consumers</h3><p>Track deliveries on the operator's domain.</p></div></div>
</div></section>
</main>
${form()}
${footer().replace('</footer>', `<div class="wrap" aria-hidden="true">${wordmark('bigmark')}</div></footer>`)}
<script>${SCRIPT_FORM}</script>
</body></html>
`;
