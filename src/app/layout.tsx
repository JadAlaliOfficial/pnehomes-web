import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/features/home/components/homeLayout/Header";
import { Footer } from "@/features/home/components/homeLayout/Footer";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import ComparisonDrawer from "@/components/ComparisonDrawer";
import ComparisonFloatingButton from "@/components/ComparisonFloatingButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PNE Homes - Quality Home Builders",
  description: "Building quality homes with exceptional craftsmanship and attention to detail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ComparisonProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ComparisonDrawer />
          <ComparisonFloatingButton />
        </ComparisonProvider>
      </body>
    </html>
  );
}
