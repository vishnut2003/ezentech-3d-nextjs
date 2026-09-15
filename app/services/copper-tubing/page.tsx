import ServicePage from "@/components/services/service-page";
import { getService } from "@/data/services/services";
import { buildMetadata } from "@/lib/seo";

const service = getService("copper-tubing");

export const metadata = buildMetadata({ ...service.seo, path: service.path });

export default function CopperTubingPage() {
  return <ServicePage service={service} />;
}
