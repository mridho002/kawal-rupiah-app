import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Akses Demo Prototipe | Kawal Rupiah — Garuda Shield",
  description:
    "Portal Gerbang Demo Tahap 2 PIDI Digdaya. Akses Portal Admin & Analyst (Dashboard Desktop) dan Citizen Mobile App (PWA Mobile) dari satu tempat.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06080F",
};

export default function DemoLayout({
  children,
  }: {
  children: React.ReactNode;
}) {
  return children;
}
