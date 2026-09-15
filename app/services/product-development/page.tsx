import Reveal from "@/components/motion/reveal";
import ChassisLedger from "@/components/products/chassis-ledger";
import ServicePage from "@/components/services/service-page";
import SectionHeading from "@/components/ui/section-heading";
import { getService } from "@/data/services/services";
import { buildMetadata } from "@/lib/seo";

const service = getService("product-development");

export const metadata = buildMetadata({ ...service.seo, path: service.path });

export default function ProductDevelopmentPage() {
  return (
    <ServicePage
      service={service}
      slots={{
        afterIntro: (
          <Reveal as="section" id="platform-sharing" ariaLabelledBy="sharing-heading" className="border-b border-border">
            <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <SectionHeading
                  id="sharing-heading"
                  eyebrow="Platform architecture"
                  title="One chassis,"
                  accent="several capacities."
                  lede='The proof is on the sheet: the 930-20" chassis carries the 17K and 18K 3-star models, and the 1100-22" chassis carries the 18K 5-star and 22K 3-star. One fascia tool, one wall plate, two capacities.'
                />
              </div>
              <div data-reveal="">
                <ChassisLedger variant="platform" />
              </div>
            </div>
          </Reveal>
        ),
      }}
    />
  );
}
