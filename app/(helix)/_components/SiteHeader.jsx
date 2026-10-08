import Wordmark from "./Wordmark";

/** @param {{ nav: import("@/content/home").nav }} props */
export default function SiteHeader({ nav }) {
  return (
    <>
      <a className="hx-skip" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap site-header__bar">
          <a className="brand" href="#top" aria-label={`HELIX ${nav.wordmarkSub}`}>
            <Wordmark className="brand__mark" decorative />
            <span className="brand__sub">{nav.wordmarkSub}</span>
          </a>
          <nav className="site-nav" aria-label="Primary">
            <ul role="list">
              {nav.links.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="site-header__cta">
            <a className="btn btn--secondary" href={nav.cta.href}>{nav.cta.label}</a>
          </div>
        </div>
      </header>
    </>
  );
}
