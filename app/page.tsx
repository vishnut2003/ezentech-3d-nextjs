import BasicLayout from "@/layouts/basic-layout";
import Hero from "@/components/hero";
import Capabilities from "@/components/capabilities";
import Quality from "@/components/quality";

export default function Home() {
  return (
    <BasicLayout>
      <Hero />
      <Capabilities />
      <Quality />
    </BasicLayout>
  );
}
