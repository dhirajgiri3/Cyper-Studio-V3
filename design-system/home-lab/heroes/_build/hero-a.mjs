import { head, header, symbols, form, footer, merchantScreen, frame, TENANTS, ENTITY, TRUST_CONFIRM, SCRIPT_FORM, APPLY_JS, ENTRY } from './shared.mjs';
const css = `
.hero-a{padding-top:var(--s6);text-align:center}
.hero-a .copy{max-width:940px;margin-inline:auto}.hero-a .sub,.hero-a .entity{margin-inline:auto}.hero-a .cta-row{justify-content:center}
.hero-a .h-display{font-size:clamp(2.25rem,1rem + 4.2vw,3.75rem)}.hero-a .sub{max-width:66ch;margin-top:var(--s4)}.hero-a .cta-row{margin-top:var(--s5)}.hero-a .entity{margin-top:var(--s4)}.hero-a .eyebrow{margin-bottom:var(--s3)}
.stage{--t:${TENANTS[0].t};--t-tint:${TENANTS[0].tint};margin-top:var(--s5);padding:var(--s5) 0 var(--s8);background:var(--t-tint);border-block:1px solid var(--border);text-align:left}
.switch{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:var(--s3) var(--s4);margin-bottom:var(--s5)}
.switch p{margin:0;font-size:.9375rem;color:var(--ink)}
.switch__g{display:inline-flex;gap:4px;padding:4px;background:#fff;border:1px solid var(--border);border-radius:var(--r-md)}
.switch button{display:inline-flex;align-items:center;gap:8px;min-height:var(--btn-h);padding:0 var(--s4) 0 var(--s3);border:0;border-radius:var(--r-sm);background:transparent;color:var(--text);font:500 .9375rem/1 var(--font-sans);cursor:pointer;transition:background-color var(--t-fast) var(--ease)}
.switch button:hover{background:var(--surface)}.switch button[aria-pressed="true"]{background:var(--ink);color:#fff}
.switch i{width:14px;height:14px;border-radius:4px;display:block}
html:not(.js) .switch{display:none}
.stage .pf__in{max-width:1000px;margin-inline:auto}.stage .pf figcaption{text-align:center;color:var(--text)}
.under{max-width:1000px;margin:var(--s4) auto 0;display:flex;justify-content:center;gap:var(--s3);font:500 .8125rem/1.4 var(--font-mono);color:var(--ink);letter-spacing:.02em}
@keyframes dip{from{opacity:.3}to{opacity:1}}.tw.dip{animation:dip 160ms var(--ease)}
.tw__body{min-height:300px}
@media (max-width:700px){.tw__body{grid-template-columns:1fr}.tw__side{border-right:0;border-bottom:1px solid var(--border)}.tw__nav{display:none}.tw__dom{display:none}.switch__g button span{display:none}.switch__g button{padding:0 var(--s4)}}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
`;
export default () => `${head({ css })}
<body>
${ENTRY('HERO-A tenant re-skin')}
${symbols()}
${header()}
<main id="main">
<section class="hero-a" aria-labelledby="h1"><div class="wrap">
  <div class="copy">
    <p class="eyebrow"><b>HELIX</b> by Cyper Studio, a product engineering company in India</p>
    <h1 class="h-display" id="h1">Run your own <span class="l2">branded shipping platform.</span></h1>
    <p class="sub" data-claim="C-04,C-05">HELIX is a white-label, multi-tenant logistics operating system for couriers, 3PLs, freight brokers, franchise networks and aggregators in India. Your brand, your domain, your merchants.</p>
    <div class="cta-row"><a class="btn btn--lg" href="#request-demo">Request a demo</a><a class="link" href="#product">See the same platform under three brands</a></div>
    <p class="entity">${ENTITY}</p>
    <p class="trust small"><span class="ph" data-claim="C-15">${TRUST_CONFIRM}</span></p>
  </div>
  <div class="stage" id="product" data-stage>
    <div class="wrap">
      <div class="switch"><p id="sw-l" data-claim="C-06" data-status="{{CONFIRM: live today or planned}}">What your merchants see, under three sample brands:</p>
        <div class="switch__g" role="group" aria-labelledby="sw-l">${TENANTS.map((t, i) => `<button type="button" data-i="${i}" aria-pressed="${i === 0}" aria-label="${t.name}"><i style="background:${t.t}"></i><span>${t.name}</span></button>`).join('')}</div></div>
      ${frame(merchantScreen(TENANTS[0]), 'Illustrative interface. Sample tenants, orders and rates.', 'Illustrative merchant booking screen under a sample tenant brand', 'C-06,C-07')}
      <p class="under"><span>HELIX runs underneath. It is not shown.</span></p>
      <p class="sr" role="status" aria-live="polite" id="live"></p>
    </div>
  </div>
</div></section>
</main>
${form()}
${footer()}
<script>
${APPLY_JS}
(function(){var T=${JSON.stringify(TENANTS)};var st=document.querySelector('[data-stage]'),tw=st.querySelector('.tw'),bs=st.querySelectorAll('[data-i]'),live=document.getElementById('live'),timers=[];
function set(i,user){var d=T[i];st.style.setProperty('--t',d.t);st.style.setProperty('--t-tint',d.tint);applyT(tw,d);for(var k=0;k<bs.length;k++)bs[k].setAttribute('aria-pressed',k===i?'true':'false');tw.classList.remove('dip');void tw.offsetWidth;tw.classList.add('dip');if(user)live.textContent='Showing sample brand: '+d.name}
function stop(){timers.forEach(clearTimeout);timers=[]}
bs.forEach(function(b){b.addEventListener('click',function(){stop();set(+b.dataset.i,true)})});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){[[1400,1],[2600,2],[3800,0]].forEach(function(p){timers.push(setTimeout(function(){set(p[1],false)},p[0]))})}
})();
${SCRIPT_FORM}
</script>
</body></html>
`;
