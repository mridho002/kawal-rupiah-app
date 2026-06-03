import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Kawal Rupiah — Citizen Mining",
  description: "Kawal dana publik. Verifikasi proyek pemerintah dan dapatkan reward.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kawal Rupiah",
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
  themeColor: "#06080F",
};

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
