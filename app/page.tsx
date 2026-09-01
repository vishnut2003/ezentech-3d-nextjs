import BasicLayout from "@/layouts/basic-layout";
import Hero from "@/components/hero";
import Capabilities from "@/components/capabilities";

export default function Home() {
  return (
    <BasicLayout>
      <Hero />
      <Capabilities />
    </BasicLayout>
  );
}
