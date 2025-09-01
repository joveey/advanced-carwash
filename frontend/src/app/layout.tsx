import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // <-- Diperbaiki
import { GeistMono } from "geist/font/mono";   // <-- Diperbaiki
import "./globals.css";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: "Advanced Carwash",
  description: "Sistem Reservasi Cuci Mobil Modern",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-gray-900 text-white`}
      >
        <Navigation />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

