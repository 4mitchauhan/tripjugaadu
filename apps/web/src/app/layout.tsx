import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageEffects from "@/components/PageEffects";
import OfflineExpeditionBanner from "@/components/OfflineExpeditionBanner";
import { LocaleProvider } from "@/context/LocaleContext";
import { TripProvider } from "@/context/TripContext";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TripJugaadu — Travel Smarter. Explore Deeper.",
  description: "Discover India's most incredible destinations, adventures, and experiences.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased scroll-smooth ${bebasNeue.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#010611" />
      </head>
      <body className="min-h-full flex flex-col relative bg-[#010611] text-[#F4F7FA]" suppressHydrationWarning>
        <LocaleProvider>
          <TripProvider>
            <Navigation />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
            <OfflineExpeditionBanner />
            <PageEffects />
          </TripProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
