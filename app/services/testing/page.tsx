import Reveal from "@/components/motion/reveal";
import LabExplainer from "@/components/services/lab-explainer";
import ServicePage from "@/components/services/service-page";
import TrustBand from "@/components/ui/trust-band";
import { getService } from "@/data/services/services";
import { buildMetadata } from "@/lib/seo";

const service = getService("testing");

export const metadata = buildMetadata({ ...service.seo, path: service.path });

export default function TestingPage() {
  return (
    <ServicePage
      service={service}
      slots={{
        factsRendered: true,
        afterIntro: <LabExplainer />,
        beforeFaq: (
          <Reveal as="section" ariaLabelledBy="trust-heading" className="border-b border-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <h2 id="trust-heading" className="sr-only">
                Recognition
              </h2>
              <TrustBand data-reveal="" cta={{ label: "Quality & Certifications", href: "/about/quality" }} />
            </div>
          </Reveal>
        ),
      }}
    />
  );
}
