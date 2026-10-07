import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageEffects from "@/components/PageEffects";
import AiTravelCompanion from "@/components/AiTravelCompanion";
import { LocaleProvider } from "@/context/LocaleContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TripJugaadu — Travel Smarter. Explore Deeper.",
  description: "Discover India's most incredible destinations, adventures, and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col relative bg-[#010611] text-[#F4F7FA]">
        <LocaleProvider>
          <Navigation />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <AiTravelCompanion />
          <PageEffects />
        </LocaleProvider>
      </body>
    </html>
  );
}
