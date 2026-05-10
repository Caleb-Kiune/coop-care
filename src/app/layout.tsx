import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import PwaUpdater from "@/components/PwaUpdater";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIC: Coop Care",
  description: "Offline premium calculator and quote generator.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#AC1F2D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ServiceWorkerRegister />
        <PwaUpdater />
        {children}
      </body>
    </html>
  );
}