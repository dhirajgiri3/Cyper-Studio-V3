// Strict library-signature verification on first-load script text. Replaces the loose probe regexes (which matched "gsApi" in PostHog's flagsApiHost).
// Reads each site's script URLs from docs/research/design/<slug>/fingerprint.json (top JS by bytes + <script src>), fetches them with Node (no browser), reports first-party vs third-party matches with a context snippet.
import fs from 'node:fs';
const ROOT = '../../../docs/research/design'; const sites = fs.readdirSync(ROOT).filter(d => fs.existsSync(`${ROOT}/${d}/fingerprint.json`));
const SIG = {
  gsap: /\bgsap\.(registerPlugin|to|from|fromTo|timeline|set|context|ticker)\b|GreenSock|\bgsap\/(ScrollTrigger|dist)|"gsap"/,
  ScrollTrigger: /ScrollTrigger\.(create|refresh|update|batch|getAll|register|config)\b|registerPlugin\([^)]{0,40}ScrollTrigger/,
  lenis: /new Lenis\(|class Lenis\b|lenis-smooth|lenis-scrolling|__lenis|studio-freight\/lenis|\blenis\.(raf|scrollTo|on)\(/,
  locomotive: /locomotive-scroll|LocomotiveScroll/,
  three: /THREE\.WebGLRenderer|new THREE\.|WebGLRenderer\(\{|from"three"|isWebGLRenderer|REVISION\s*=\s*"\d+"/,
  ogl: /from"ogl"|\bogl\b.{0,40}(Renderer|Program|Mesh)|new Renderer\(\{[^}]*\bwebgl\b/,
  motion: /MotionValue\b|\buseScroll\b|framer-motion|MotionIsMounted|"motion\/react"|whileInView|\bm\.(div|span|h1|h2|section)\b/,
  lottie: /lottie-web|bodymovin|lottie\.(loadAnimation|version)|dotlottie|lottie_svg|lottie\.min/i,
  rive: /rive-wasm|@rive-app|RiveFile|rive\.wasm/,
  scrollTimelineCSS: /animation-timeline|view-timeline|scroll-timeline|ScrollTimeline\b/,
};
const out = {};
for (const s of sites) {
  const fpj = JSON.parse(fs.readFileSync(`${ROOT}/${s}/fingerprint.json`, 'utf8')); const d = fpj.desktop; const host = new URL(fpj.url).host.replace(/^www\./, '');
  const urls = [...new Set([...(d.jsFirstLoad?.scripts || []).map(x => x.url), ...((d.fp?.scripts) || [])])].filter(u => /^https?:/.test(u));
  // jsFirstLoad urls were truncated to 140 chars in the probe; skip truncated ones if fetch fails
  const found = {}; let fetched = 0, failed = 0;
  await Promise.all(urls.map(async u => { try { const r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(20000) }); if (!r.ok) { failed++; return; } const t = (await r.text()).slice(0, 4_000_000); fetched++; const first = new URL(u).host.replace(/^www\./, '') === host; for (const [k, re] of Object.entries(SIG)) { const m = re.exec(t); if (m) { (found[k] ||= []).push({ party: first ? '1P' : '3P', file: u.replace(/^https?:\/\//, '').slice(0, 70), ctx: t.slice(Math.max(0, m.index - 25), m.index + 55).replace(/\s+/g, ' ') }); } } } catch { failed++; } }));
  out[s] = { scriptsFetched: fetched, failed, found };
  console.log(`== ${s.padEnd(13)} fetched ${fetched}/${urls.length}`); for (const [k, v] of Object.entries(found)) console.log(`   ${k.padEnd(18)} ${v.map(x => x.party).join('')}  e.g. ${v[0].party} ${v[0].file} | ${v[0].ctx}`);
}
fs.writeFileSync(`${ROOT}/signature-verification.json`, JSON.stringify(out, null, 1));
