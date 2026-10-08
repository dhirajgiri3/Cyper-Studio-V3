// Shared partials for the four HELIX Home hero explorations (Brief 01 v2.1). Lab only; nothing here is locked.
// Rules enforced by construction: no gradients, no glow, light mode only, transform/opacity animation only,
// HELIX blue never inside a tenant window (.tw), every sample value labelled Sample, canonical domain cyper.studio only.
import fs from 'node:fs';
const B = '../../brand';
const svgPaths = f => [...fs.readFileSync(f, 'utf8').matchAll(/<path id="\w" d="([^"]+)"\/>/g)].map(m => m[1]);
const WM = svgPaths(`${B}/helix-wordmark.faithful.svg`);
const WM_VB = fs.readFileSync(`${B}/helix-wordmark.faithful.svg`, 'utf8').match(/viewBox="([^"]+)"/)[1];
const CY = fs.readFileSync('../../../../assets-inbox/brand/cyper-dark-logo.svg', 'utf8').replace(/<svg[^>]*>/, '').replace('</svg>', '').trim().replace(/ fill="black"/g, '');

export const SITE = { url: 'https://cyper.studio/', email: 'info@cyper.studio', founded: '2024', title: 'HELIX | White-Label Logistics Platform for Couriers &amp; 3PLs',
  desc: 'HELIX by Cyper Studio is a white-label, multi-tenant logistics operating system for couriers, 3PLs, freight brokers and aggregators in India. Request a demo.' };
export const TRUST_CONFIRM = '{{CONFIRM: "Trusted by 10+ logistics companies": live production customers? may we say "enterprise"? written permission for a text-only claim?}}';
export const RESPONSE_CONFIRM = '{{CONFIRM: reply within X business days}}';
export const TENANTS = [
  { id: 0, name: 'Kestrel Couriers', mk: 'K', t: '#C2410C', tint: '#FDEDE4', dom: 'ship.kestrelcouriers.example', trk: 'track.kestrelcouriers.example', order: 'KC-20418' },
  { id: 1, name: 'Monsoon Freight', mk: 'M', t: '#0F766E', tint: '#E3F3F1', dom: 'ship.monsoonfreight.example', trk: 'track.monsoonfreight.example', order: 'MF-88231' },
  { id: 2, name: 'Bramble Logistics', mk: 'B', t: '#86198F', tint: '#F6E8F8', dom: 'ship.bramblelogistics.example', trk: 'track.bramblelogistics.example', order: 'BL-51907' },
];

export const wordmark = (cls = 'wm') => `<svg class="${cls}" viewBox="${WM_VB}" role="img" aria-label="HELIX"><use href="#hx"/></svg>`;
export const symbols = () => `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><symbol id="hx" viewBox="${WM_VB}"><g fill="currentColor">${WM.map(d => `<path d="${d}"/>`).join('')}</g></symbol><symbol id="cy" viewBox="40 40 152 152"><g fill="currentColor">${CY.replace(/<(path|rect)/g, '<$1')}</g></symbol></svg>`;

export const head = ({ title = SITE.title, css = '', hero = 'x' } = {}) => `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${SITE.desc}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${SITE.url}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE.url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${SITE.desc}">
<meta property="og:site_name" content="HELIX by Cyper Studio">
<link rel="icon" href="data:,">
<link rel="preload" href="../../fonts/Geist-Variable.subset.woff2" as="font" type="font/woff2" crossorigin>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"Cyper Studio","legalName":"{{CONFIRM: legal entity name}}","url":"${SITE.url}","email":"${SITE.email}","foundingDate":"${SITE.founded}","description":"Cyper Studio is a product engineering company based in India, founded in 2024. It builds HELIX.","address":{"@type":"PostalAddress","addressLocality":"{{CONFIRM: city}}","addressCountry":"IN"},"brand":{"@type":"Brand","name":"HELIX"}}</script>
<script>document.documentElement.classList.add('js');(function(){var q=location.search+location.hash;var m=/palette=(p[12])/.exec(q);if(m&&m[1]==='p2')document.documentElement.classList.add('p2');m=/type=([123])/.exec(q);if(m)document.documentElement.dataset.type=m[1];addEventListener('message',function(e){var d=e.data||{};if(d.palette)document.documentElement.classList.toggle('p2',d.palette==='p2');if(d.type)document.documentElement.dataset.type=d.type;if(d.rm!==undefined)document.documentElement.classList.toggle('rm',!!d.rm)})})()</script>
<style>
${BASE_CSS}
${css}
</style>
</head>`;

export const header = () => `<a class="skip" href="#main">Skip to content</a>
<header class="hdr" id="top"><div class="hdr__in">
  <a class="brand" href="#top" aria-label="HELIX by Cyper Studio, home">${wordmark('wm')}<span class="by"><span>by</span><svg class="cy" aria-hidden="true"><use href="#cy"/></svg><span>Cyper Studio</span></span></a>
  <nav class="nav" aria-label="Primary"><a href="#product">Product</a><a href="#about" data-ph="planned page">About</a><a href="#request-demo" data-ph="planned page">Contact</a></nav>
  <a class="btn btn--quiet" href="#request-demo">Request a demo</a>
</div></header>`;

export const ENTITY = `Built by Cyper Studio, a product engineering company in India. Founded in ${SITE.founded}.`;

export const form = () => `<section class="sec sec--surface" id="request-demo" aria-labelledby="demo-h"><div class="wrap demo">
  <div><p class="label">02 / Demo</p><h2 id="demo-h">Request a demo</h2>
  <p class="lede">Tell us what you ship and who you ship for. We reply from <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
  <p class="small"><span class="ph" data-claim="response-time">${RESPONSE_CONFIRM}</span></p></div>
  <form class="form" method="post" action="/contact" novalidate>
    <div class="form__body">
      <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" autocomplete="name" required></div>
      <div class="field"><label for="f-mail">Work email</label><input id="f-mail" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="f-co">Company</label><input id="f-co" name="company" autocomplete="organization" required></div>
      <div class="field"><label for="f-type">Company type</label><select id="f-type" name="type" required><option value="">Choose one</option><option>Regional courier</option><option>3PL</option><option>Freight broker</option><option>Franchise network</option><option>Aggregator</option><option>Other</option></select></div>
      <div class="field"><label for="f-msg">Anything we should know <span class="opt">(optional)</span></label><textarea id="f-msg" name="message" maxlength="500" rows="3"></textarea></div>
      <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn btn--lg" type="submit">Request a demo</button>
      <p class="small">We use your details only to reply to this request. If the form fails, email <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
    </div>
    <div class="form__ok" role="status" tabindex="-1"><h3>Request received</h3><p>We have your details. <span class="ph">${RESPONSE_CONFIRM}</span></p></div>
  </form></div></section>`;

const PH_LINKS = (items) => items.map(([t, h, ph]) => `<li><a href="${h}"${ph ? ` data-ph="${ph}"` : ''}>${t}</a></li>`).join('');
export const footer = () => `<footer class="foot"><div class="wrap">
  <div class="foot__grid">
    <div><a class="brand" href="#top" aria-label="HELIX by Cyper Studio, home">${wordmark('wm')}</a>
      <p class="foot__about">HELIX is a white-label, multi-tenant logistics operating system built by Cyper Studio. ${ENTITY}</p>
      <p><a class="foot__mail" href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p class="small"><span class="ph">{{CONFIRM: legal entity name and city}}</span></p></div>
    <div><h3>Product</h3><ul>${PH_LINKS([['How it works', '#product'], ['Changelog', '#', 'page not built'], ['Status', '#', 'page not built'], ['Security', '#', 'page not built']])}</ul></div>
    <div><h3>Company</h3><ul>${PH_LINKS([['About', '#about', 'page not built'], ['Contact', '#request-demo'], ['Blog', '#', 'page not built'], ['Talk to us (pricing)', '#request-demo']])}</ul></div>
    <div><h3>Legal</h3><ul>${PH_LINKS([['Privacy', '#', 'page not built'], ['Terms', '#', 'page not built']])}</ul></div>
  </div>
  <div class="foot__meta"><span>© 2026 Cyper Studio</span><span class="builtby"><span>Built by</span><svg class="cy cy--lg" aria-hidden="true"><use href="#cy"/></svg><span>Cyper Studio</span></span><span>Founded ${SITE.founded}, India</span></div>
  <p class="small legend">Lab note: links marked with a dotted underline are placeholders for pages that do not exist yet (C-6).</p>
</div></footer>`;

// ---- sample product screens (all decorative; labelled Sample) ----
export const merchantScreen = (t = TENANTS[0], { compact = false } = {}) => `<div class="tw" style="--t:${t.t};--t-tint:${t.tint}" data-tw>
  <div class="tw__top"><span class="tw__logo"><i data-b="mk">${t.mk}</i><b data-b="name">${t.name}</b></span><span class="tw__dom"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="5" width="8" height="6" rx="1.5" fill="none" stroke="currentColor"/><path d="M4 5V3.5a2 2 0 0 1 4 0V5" fill="none" stroke="currentColor"/></svg><span data-b="dom">${t.dom}</span></span>${compact ? '' : '<span class="tw__nav" aria-hidden="true"><span class="on">Ship</span><span>Orders</span><span>Wallet</span></span>'}</div>
  <div class="tw__body"><div class="tw__side"><p class="tw__h">New shipment</p><p class="tw__t">Order <span class="num" data-b="order">${t.order}</span></p>
    <dl class="kv"><div><dt>From</dt><dd>Pune <span class="num">411014</span></dd></div><div><dt>To</dt><dd>New Delhi <span class="num">110017</span></dd></div><div><dt>Weight</dt><dd class="num">1.2 kg</dd></div><div><dt>Payment</dt><dd class="num">Prepaid</dd></div></dl></div>
  <div class="tw__main"><p class="tw__h">Choose a service</p><table class="rates"><thead><tr><th>Service</th><th>Delivery</th><th>Rate</th></tr></thead><tbody>
    <tr><td><span class="radio"></span>Surface</td><td>4 days</td><td class="num">₹68</td></tr>
    <tr class="sel"><td><span class="radio"></span>Standard<span class="tag">Selected</span></td><td>3 days</td><td class="num">₹74</td></tr>
    <tr><td><span class="radio"></span>Express</td><td>2 days</td><td class="num">₹96</td></tr></tbody></table>
    <div class="tw__foot"><span class="tw__sample">Sample</span><span class="tw__btn">Book shipment</span></div></div></div></div>`;

export const trackScreen = (t = TENANTS[0]) => `<div class="tw tw--trk" style="--t:${t.t};--t-tint:${t.tint}" data-tw>
  <div class="tw__top"><span class="tw__logo"><i data-b="mk">${t.mk}</i><b data-b="name">${t.name}</b></span></div>
  <div class="tw__trk"><p class="tw__h">Order <span class="num" data-b="order">${t.order}</span></p><p class="tw__t">Out for delivery</p>
    <ol class="steps"><li class="done"><i></i><span>Picked up<small>Pune</small></span></li><li class="done"><i></i><span>At hub<small>Sample hub</small></span></li><li class="now"><i></i><span>Out for delivery<small>Expected today</small></span></li></ol>
    <p class="tw__dom2"><span data-b="trk">${t.trk}</span></p><p class="tw__sample">Sample</p></div></div>`;

export const consoleFrame = () => `<div class="con" data-console>
  <div class="con__top"><span class="con__logo">${wordmark('wm wm--sm')}<small>Operator console</small></span><span class="con__tag">All tenants · Sample</span></div>
  <div class="con__body"><table class="rates con__tbl"><thead><tr><th>Tenant</th><th>Domain</th><th>Brand colour</th><th class="r">Orders today</th></tr></thead><tbody>
  ${TENANTS.map((t, i) => `<tr><td><i class="sw" style="background:${t.t}"></i>${t.name}</td><td class="mono">${t.dom}</td><td class="mono">${t.t}</td><td class="r num">${[1284, 612, 947][i].toLocaleString('en-IN')}</td></tr>`).join('')}
  </tbody></table><p class="con__note">3 sample tenants on one platform. Each tenant's merchants and consumers see that tenant's brand and domain.</p></div></div>`;

export const frame = (inner, caption = 'Illustrative interface. Sample data.', label = '', claims = '') => `<figure class="pf"${claims ? ` data-claim="${claims}" data-status="{{CONFIRM: live today or planned}}"` : ''}><div class="pf__in" role="img" aria-label="${label || caption}"><div aria-hidden="true">${inner}</div></div><figcaption>${caption}</figcaption></figure>`;

export const SCRIPT_FORM = `(function(){var f=document.querySelector('.form');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();if(f.website.value)return;var bad=[].filter.call(f.querySelectorAll('[required]'),function(x){return !x.value||(x.type==='email'&&!/^\\S+@\\S+\\.\\S+$/.test(x.value))});f.querySelectorAll('[aria-invalid]').forEach(function(x){x.removeAttribute('aria-invalid')});if(bad.length){bad.forEach(function(x){x.setAttribute('aria-invalid','true')});bad[0].focus();return}f.classList.add('sent');var ok=f.querySelector('.form__ok');ok.focus()})})();`;

export const BASE_CSS = fs.readFileSync(new URL('./base.css', import.meta.url), 'utf8');

export const APPLY_JS = `function applyT(root,d){root.style.setProperty('--t',d.t);root.style.setProperty('--t-tint',d.tint);root.querySelectorAll('[data-b]').forEach(function(e){var v=d[e.getAttribute('data-b')];if(v!=null)e.textContent=v})}`;
export const ENTRY = (hero) => `<!-- HELIX Home Lab ${hero}. PROPOSAL, NOT LOCKED. Canonical domain https://cyper.studio, ${SITE.email}, founded ${SITE.founded}.
CLAIM MAP (Spec 4.4): C-01 company in India, C-02 founded 2024, C-04 white-label multi-tenant OS, C-05 audiences: [BRIEF], statable.
C-06 merchants/consumers see only the operator's brand: [BRIEF-ONLY], hedged wording, status {{CONFIRM}}. C-07 rate comparison on booking screens: [BRIEF-ONLY], status {{CONFIRM}}; sample services are generic, no carrier named.
C-15 traction line: {{CONFIRM}} only, no number, no logos. Sample tenants are fictional (.example domains) and every sample screen is captioned. -->`;
