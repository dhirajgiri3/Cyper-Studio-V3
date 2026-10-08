import { head, header, symbols, form, footer, trackScreen, frame, TENANTS, ENTITY, TRUST_CONFIRM, SCRIPT_FORM, APPLY_JS, ENTRY } from './shared.mjs';
const css = `
.hero-d{padding:var(--s8) 0 var(--s8)}
.hero-d{padding-top:var(--s7)}.hero-d .h-display{font-size:clamp(2.25rem,1rem + 3.5vw,3.5rem)}.hero-d .sub{margin-top:var(--s4)}.hero-d .cta-row{margin-top:var(--s5)}.hero-d .entity{margin-top:var(--s4)}.hero-d__grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,4fr);gap:var(--s7);align-items:center}
.try{margin-top:var(--s5);padding:var(--s3) var(--s4);border:1px solid var(--border);border-radius:var(--r-md);background:var(--surface);max-width:34rem}
.try label{display:block;font-size:.9375rem;font-weight:500;color:var(--ink);margin-bottom:6px}
.try__row{display:flex;gap:var(--s3);align-items:center;flex-wrap:wrap}
.try input{flex:1 1 12rem;min-height:var(--btn-h);padding:var(--s2) var(--s3);border:1px solid var(--border-strong);border-radius:var(--r-md);background:#fff;color:var(--ink);font:inherit}
.dots{display:inline-flex;gap:6px}.dots button{width:var(--btn-h);height:var(--btn-h);border-radius:var(--r-md);border:1px solid var(--border);background:#fff;cursor:pointer;display:grid;place-items:center;padding:0}
.dots button i{width:20px;height:20px;border-radius:5px;display:block}.dots button[aria-pressed="true"]{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink)}
html:not(.js) .try{display:none}
.try .small{margin-top:var(--s2)}
.phone{width:min(100%,300px);margin-inline:auto}
.phone .pf__in{border-radius:28px;padding:10px;background:var(--ink);border-color:var(--ink)}.phone .pf__in::before,.phone .pf__in::after{display:none}
.phone .tw{border:0;border-radius:20px;min-height:430px}.phone .tw__top{padding:var(--s4)}.phone .tw__t{font-size:1.25rem}.phone .tw__trk{padding:var(--s5) var(--s4)}.phone .steps{margin-top:var(--s5)}.phone .steps li{padding-bottom:var(--s5)}
.phone figcaption{text-align:center}
.phone .tw__dom2{margin-top:var(--s6)}
@keyframes dip{from{opacity:.3}to{opacity:1}}.tw.dip{animation:dip 160ms var(--ease)}
@media (max-width:900px){.hero-d__grid{grid-template-columns:1fr;gap:var(--s7)}}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
`;
export default () => `${head({ css })}
<body>
${ENTRY('HERO-D your name on the platform (wildcard)')}
${symbols()}
${header()}
<main id="main">
<section class="hero-d" aria-labelledby="h1"><div class="wrap hero-d__grid">
  <div>
    <p class="eyebrow"><b>HELIX</b> by Cyper Studio, a product engineering company in India</p>
    <h1 class="h-display" id="h1">Run your own branded shipping platform.</h1>
    <p class="sub" data-claim="C-04,C-05">HELIX is a white-label, multi-tenant logistics operating system for couriers, 3PLs, freight brokers, franchise networks and aggregators in India. Your brand, your domain, your merchants.</p>
    <div class="cta-row"><a class="btn btn--lg" href="#request-demo">Request a demo</a></div>
    <p class="entity">${ENTITY}</p>
    <p class="trust small"><span class="ph" data-claim="C-15">${TRUST_CONFIRM}</span></p>
    <div class="try" data-claim="C-06" data-status="{{CONFIRM: live today or planned}}"><label for="nm">See a tracking page under your company name</label>
      <div class="try__row"><input id="nm" type="text" maxlength="28" autocomplete="off" placeholder="${TENANTS[0].name}" aria-describedby="nm-h"><div class="dots" role="group" aria-label="Sample brand colour">${TENANTS.map((t, i) => `<button type="button" data-i="${i}" aria-pressed="${i === 0}" aria-label="Sample colour ${i + 1}"><i style="background:${t.t}"></i></button>`).join('')}</div></div>
      <p class="small" id="nm-h">Preview only. Runs in your browser; nothing is sent or stored.</p></div>
  </div>
  <div class="phone" id="product" data-stage>
    ${frame(trackScreen(TENANTS[0]), 'Illustrative interface. Sample data. Consumer tracking page.', 'Illustrative consumer tracking page under a sample brand', 'C-06')}
    <p class="sr" role="status" aria-live="polite" id="live"></p>
  </div>
</div></section>
</main>
${form()}
${footer()}
<script>
${APPLY_JS}
(function(){var T=${JSON.stringify(TENANTS)};var st=document.querySelector('[data-stage]'),tw=st.querySelector('.tw'),inp=document.getElementById('nm'),bs=document.querySelectorAll('.dots [data-i]'),live=document.getElementById('live');var col=0;
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'')||'yourname'}
function render(user){var n=inp.value.trim()||T[0].name,c=T[col],s=slug(n),w=n.split(/\\s+/);var d={t:c.t,tint:c.tint,name:n,mk:n.charAt(0).toUpperCase(),order:(n.replace(/[^A-Za-z]/g,'').slice(0,2).toUpperCase()||'KC')+'-20418',trk:'track.'+s+'.example',dom:'ship.'+s+'.example'};applyT(tw,d);tw.classList.remove('dip');void tw.offsetWidth;tw.classList.add('dip');if(user)live.textContent='Preview updated for '+n}
inp.addEventListener('input',function(){render(false)});inp.addEventListener('change',function(){render(true)});
bs.forEach(function(b){b.addEventListener('click',function(){col=+b.dataset.i;for(var k=0;k<bs.length;k++)bs[k].setAttribute('aria-pressed',k===col?'true':'false');render(true)})});
})();
${SCRIPT_FORM}
</script>
</body></html>
`;
