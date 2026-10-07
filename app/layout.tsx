import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const title = `${site.name} · 쉬운 철학`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "철학",
    "쉬운 철학",
    "소크라테스",
    "플라톤",
    "공자",
    "노자",
    "붓다",
    "칸트",
    "니체",
    "철학이야기",
    "Philosophy Stories",
    "philosophy-stories",
  ],
  authors: [{ name: "나두", url: "https://nadoo-myth.vercel.app" }],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  other: {
    "abacus-namespace": site.namespace,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
        >
          본문으로
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
