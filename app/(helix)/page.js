import { consoleView, footer, hero, nav, sampleCaption, tenants } from "../../content/home";
import Hero from "./_components/Hero";
import RouteLine from "./_components/RouteLine";
import SiteFooter from "./_components/SiteFooter";
import SiteHeader from "./_components/SiteHeader";

export default function HomePage() {
  const heroTenant = tenants.find((t) => t.id === hero.tenant);
  return (
    <>
      <SiteHeader nav={nav} />
      <div className="has-route">
        <main id="main">
          <Hero hero={hero} tenant={heroTenant} view={consoleView} caption={sampleCaption} />
        </main>
        <SiteFooter footer={footer} />
        <RouteLine />
      </div>
    </>
  );
}
