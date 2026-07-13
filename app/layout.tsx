import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://luxvoy.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luxvoy — Luxury Hotels & Resorts",
    template: "%s · Luxvoy",
  },
  description:
    "Book the world's most exclusive luxury hotels and resorts. Handpicked five-star stays, curated experiences, and effortless booking with Luxvoy.",
  keywords: [
    "luxury hotels",
    "5 star resorts",
    "hotel booking",
    "premium travel",
    "boutique hotels",
    "luxury travel",
  ],
  authors: [{ name: "Luxvoy" }],
  openGraph: {
    type: "website",
    title: "Luxvoy — Luxury Hotels & Resorts",
    description:
      "Handpicked five-star stays, curated experiences, and effortless booking.",
    url: siteUrl,
    siteName: "Luxvoy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxvoy — Luxury Hotels & Resorts",
    description:
      "Handpicked five-star stays, curated experiences, and effortless booking.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
