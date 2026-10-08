import Arrow from "./Arrow";
import ConsoleFrame from "./ConsoleFrame";
import Helyo, { HelyoCast, aspectOf, terminalLift } from "./Helyo";

/**
 * Stage: three depth planes. The tenant console at the back, Helyo standing in front of it,
 * and Helyo's cast shadow on the console surface between them. Helyo is positioned inside the
 * console's surface so its inlay terminal always sits just below the console bottom (see home.css,
 * .stage__helyo): the Route Line never crosses the tenant surface.
 * @param {{ hero: object, tenant: object,
 *           view: object, caption: string }} props
 */
const HERO_HELYO_SIZES = "(min-width: 1440px) 500px, (min-width: 1024px) 34vw, 260px";

export default function Hero({ hero, tenant, view, caption }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow rise" style={{ "--i": 0 }}>
            <span className="eyebrow__dot" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="t-hero hero__title rise" style={{ "--i": 1 }}>{hero.title}</h1>
          <p className="t-lead hero__lead rise" style={{ "--i": 2 }}>{hero.lead}</p>
          <div className="hero__actions rise" style={{ "--i": 3 }}>
            <a className="btn btn--primary btn--lg" href={hero.primary.href}>
              {hero.primary.label}
              <Arrow />
            </a>
            <a className="link-arrow" href={hero.secondary.href}>{hero.secondary.label}</a>
          </div>
          <p className="hero__trust rise" style={{ "--i": 4 }}>{hero.trust}</p>
        </div>

        <div className="hero__stage">
          <div className="stage" style={{ "--tk": terminalLift("welcome"), "--ar": aspectOf("welcome") }}>
            <div className="stage__plane rise-soft" style={{ "--i": 2 }}>
              <div className="stage__surface">
                <ConsoleFrame
                  tenant={tenant}
                  view={view}
                  maxRows={6}
                  label={`Illustrative operator console carrying a sample courier brand, ${tenant.name}, with a table of sample shipments.`}
                />
                <div className="stage__cast" aria-hidden="true">
                  <HelyoCast pose="welcome" sizes={HERO_HELYO_SIZES} priority className="stage__cast-img" />
                </div>
                <Helyo
                  className="stage__helyo arrive"
                  pose="welcome"
                  alt={hero.helyoAlt}
                  sizes={HERO_HELYO_SIZES}
                  priority
                  routeStart
                >
                  <span className="route-via hero__drop" data-route="via" aria-hidden="true" />
                </Helyo>
              </div>
              <p className="stage__caption">{caption}</p>
            </div>
          </div>
        </div>
      </div>
      <span className="route-via hero__exit" data-route="via" aria-hidden="true" />
      <span className="route-gap hero__gap" data-route="gap" aria-hidden="true" />
    </section>
  );
}
