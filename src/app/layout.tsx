import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BabyWell AI — Assistente AI per il Benessere Pediatrico",
  description: "Guida le famiglie verso il benessere dei bambini con l'intelligenza artificiale. Educazione, prevenzione e prodotti nutraceutici personalizzati.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
