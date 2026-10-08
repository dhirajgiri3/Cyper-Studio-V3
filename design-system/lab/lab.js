/* Lab-only tooling: ID overlay, 12-column grid overlay, token export. Never ships. Components do not depend on this file.
   Everything here degrades to nothing if JavaScript is off; the pages are fully readable without it. */
(function () {
  var root = document.documentElement;
  function toggle(attr, btn) {
    var on = root.getAttribute(attr) === 'on';
    if (on) root.removeAttribute(attr); else root.setAttribute(attr, 'on');
    btn.setAttribute('aria-pressed', String(!on));
    try { sessionStorage.setItem(attr, on ? 'off' : 'on'); } catch (e) {}
  }
  var ids = document.getElementById('lab-ids');
  var grid = document.getElementById('lab-grid');
  var exp = document.getElementById('lab-export');
  if (ids) ids.addEventListener('click', function () { toggle('data-lab-ids', ids); });
  if (grid) grid.addEventListener('click', function () { toggle('data-lab-grid', grid); });
  try {
    if (sessionStorage.getItem('data-lab-ids') === 'on' && ids) toggle('data-lab-ids', ids);
    if (sessionStorage.getItem('data-lab-grid') === 'on' && grid) toggle('data-lab-grid', grid);
  } catch (e) {}

  if (grid) {
    var ov = document.createElement('div'); ov.className = 'lab-gridoverlay'; ov.setAttribute('aria-hidden', 'true');
    var inner = document.createElement('div'); for (var i = 0; i < 12; i++) inner.appendChild(document.createElement('i'));
    ov.appendChild(inner); document.body.appendChild(ov);
  }

  if (exp && window.HX_TOKEN_NAMES) {
    var dlg = document.createElement('dialog'); dlg.className = 'lab-dialog'; dlg.setAttribute('aria-labelledby', 'lab-dlg-h');
    dlg.innerHTML = '<header><h2 id="lab-dlg-h">Token export (current values read from the page)</h2><button class="lab-btn" type="button" data-close style="color:#101828;border-color:#101828">Close</button></header>' +
      '<label class="hx-label" style="display:block;padding:12px 16px 0">CSS</label><textarea id="lab-css" readonly aria-label="Tokens as CSS"></textarea>' +
      '<label class="hx-label" style="display:block;padding:12px 16px 0">JSON</label><textarea id="lab-json" readonly aria-label="Tokens as JSON"></textarea>' +
      '<footer><span class="hx-caption">Paste your tweaks back to me. Edit tokens.json, not these copies.</span><span><button class="lab-btn" type="button" data-copy="lab-css" style="color:#101828;border-color:#101828">Copy CSS</button> <button class="lab-btn" type="button" data-copy="lab-json" style="color:#101828;border-color:#101828">Copy JSON</button></span></footer>';
    document.body.appendChild(dlg);
    exp.addEventListener('click', function () {
      var cs = getComputedStyle(root), css = [':root {'], obj = {};
      window.HX_TOKEN_NAMES.forEach(function (n) { var v = cs.getPropertyValue(n).trim(); if (v) { css.push('  ' + n + ': ' + v + ';'); obj[n] = v; } });
      css.push('}'); dlg.querySelector('#lab-css').value = css.join('\n'); dlg.querySelector('#lab-json').value = JSON.stringify({ version: window.HX_TOKEN_VERSION, tokens: obj }, null, 2);
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    });
    dlg.addEventListener('click', function (e) {
      var t = e.target; if (t.closest && t.closest('[data-close]')) dlg.close();
      var c = t.closest && t.closest('[data-copy]'); if (c) { var ta = dlg.querySelector('#' + c.getAttribute('data-copy')); ta.select(); try { navigator.clipboard.writeText(ta.value); c.textContent = 'Copied'; setTimeout(function () { c.textContent = c.getAttribute('data-copy') === 'lab-css' ? 'Copy CSS' : 'Copy JSON'; }, 1200); } catch (err) {} }
    });
  }
})();
