import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/smooth-scroll";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: { siteName: SITE_NAME, locale: "en_IN", type: "website" },
  title: {
    default: "Ezentech India — OEM/ODM Air Conditioner Manufacturing",
    template: "%s | Ezentech India",
  },
  description:
    "Ezentech India Pvt. Ltd. — OEM/ODM air-conditioner manufacturer with four plants, 1M-unit capacity, NABL-accredited testing and in-house components from coil to chassis.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
