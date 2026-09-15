import type { Metadata } from "next";
import BasicLayout from "@/layouts/basic-layout";
import JsonLd from "@/components/seo/json-ld";
import Hero from "@/components/hero";
import Capabilities from "@/components/capabilities";
import Quality from "@/components/quality";
import Cta from "@/components/cta";
import { organizationLd, websiteLd } from "@/lib/structured-data/common";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const homeJsonLd = [
  organizationLd({
    description:
      "OEM/ODM air-conditioner manufacturer with four plants, one-million-unit annual capacity, an NABL-accredited psychrometric lab and in-house heat-exchanger coils, sheet metal, injection moulding and copper tubing.",
    award: ['LG "Role Model Supplier"'],
  }),
  websiteLd(),
];

export default function Home() {
  return (
    <BasicLayout>
      <JsonLd data={homeJsonLd} />
      <Hero />
      <Capabilities />
      <Quality />
      <Cta />
    </BasicLayout>
  );
}
