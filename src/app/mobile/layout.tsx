import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "KAWAL RUPIAH — Citizen Mining",
  description: "Kawal dana publik. Verifikasi proyek pemerintah dan dapatkan reward.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "KAWAL RUPIAH",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0D1B3E",
};

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
