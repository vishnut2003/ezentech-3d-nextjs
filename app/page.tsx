import BasicLayout from "@/layouts/basic-layout";
import Hero from "@/components/hero";

const stats = [
  { value: "1M+", label: "Annual unit capacity" },
  { value: "4", label: "Manufacturing plants" },
  { value: "NABL", label: "Accredited psychrometric lab" },
  { value: "20+ yrs", label: "OEM / ODM legacy" },
];

export default function Home() {
  return (
    <BasicLayout>
      <Hero />

      <section className="border-t border-border bg-surface" aria-label="Key figures">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-10 px-6 py-16 sm:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </BasicLayout>
  );
}
