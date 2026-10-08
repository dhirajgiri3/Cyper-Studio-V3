import Helyo from "./Helyo";
import Wordmark from "./Wordmark";

/** @param {{ footer: import("@/content/home").footer }} props */
export default function SiteFooter({ footer }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer__stage">
          <span className="route-via footer__via" data-route="via" aria-hidden="true" />
          <Helyo className="footer__helyo" pose="celebrate" alt={footer.helyoAlt} sizes="(min-width: 768px) 260px, 46vw" />
          <span className="waypoint footer__stop" data-route="stop" aria-hidden="true" />
          <Wordmark className="footer__mark" decorative />
        </div>
        <div className="footer__meta">
          <p>{footer.line}</p>
          <a href={`mailto:${footer.email}`}>{footer.email}</a>
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
