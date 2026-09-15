import Link from "next/link";
import BasicLayout from "@/layouts/basic-layout";
import LinkLedger, { fromNav } from "@/components/ui/link-ledger";
import PageHero from "@/components/ui/page-hero";
import Section from "@/components/ui/section";
import { NAV } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "The page you asked for is not on the site map.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <BasicLayout>
      <PageHero
        eyebrow="Error 404"
        title="That page isn't"
        accent="on the sheet."
        lede="The address may have changed while the site was rebuilt. Everything we publish sits under one of the sections below."
        actions={
          <>
            <Link
              href="/"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Contact Us
            </Link>
          </>
        }
      />
      <Section label="Site sections">
        <div className="mx-auto max-w-3xl">
          <LinkLedger label="Site sections" unit="sections" items={fromNav(NAV)} />
        </div>
      </Section>
    </BasicLayout>
  );
}
