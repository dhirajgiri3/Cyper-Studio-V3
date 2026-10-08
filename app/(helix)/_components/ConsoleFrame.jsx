/**
 * Coded, illustrative operator console for one sample tenant. Tenant colours arrive as CSS variables;
 * HELIX blue and Helyo never appear inside this frame. Exposed to assistive tech as one labelled image.
 * @param {{ tenant: {name: string, mark: string, color: string, tint: string, ink: string},
 *           view: object, label: string, className?: string, maxRows?: number }} props
 */
export default function ConsoleFrame({ tenant, view, label, className = "", maxRows }) {
  const style = { "--t": tenant.color, "--t-tint": tenant.tint, "--t-ink": tenant.ink };
  return (
    <div className={`console ${className}`} style={style} role="img" aria-label={label}>
      <div className="console__top" aria-hidden="true">
        <span className="console__mark">{tenant.mark}</span>
        <span className="console__brand">{tenant.name}</span>
        <span className="console__product">{view.product}</span>
        <span className="console__search">
          <svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" /><path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          {view.search}
        </span>
        <span className="console__user">{view.user}</span>
      </div>
      <div className="console__body" aria-hidden="true">
        <ul className="console__side" role="list">
          {view.navItems.map((n, i) => (
            <li key={n} aria-current={i === 0 ? "page" : undefined}>{n}</li>
          ))}
        </ul>
        <div className="console__main">
          <div className="console__head">
            <span className="console__title">{view.title}</span>
            <span className="console__tabs">{view.tabs.map((t) => <span key={t}>{t}</span>)}</span>
            <span className="console__action">Book shipment</span>
          </div>
          <table>
            <thead>
              <tr>
                {view.columns.map((c) => (
                  <th key={c.key} className={`c-${c.key}${c.numeric ? " num" : ""}`} title={c.title}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {view.rows.slice(0, maxRows ?? view.rows.length).map((r) => (
                <tr key={r.awb}>
                  <td className="c-awb mono">{r.awb}<span className="sub">{r.lane}</span></td>
                  <td className="c-merchant">{r.merchant}</td>
                  <td className="c-type">{r.type}</td>
                  <td className="c-lane mono">{r.lane}</td>
                  <td className="c-cod mono num">{r.cod}</td>
                  <td className="c-status"><span className={`chip chip--${r.tone}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
