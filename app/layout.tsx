import LayoutApp from "@/components/LayoutApp";
import { PWAProvider } from "@/contexts/pwa-context";
import { UserProvider } from '@/contexts/user-context';
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const title = "Derkap";
const description = "Derkap";
const domain = "wwww.example.com/";
const url = `https://${domain}`;
const socialBannerUrl = "/social_banner.png";
export const metadata: Metadata = {
  title,
  description,
  manifest: "/manifest.json",
  themeColor: "#0a0e15", // custom color can be added here
  openGraph: {
    type: "website",
    url,
    title,
    images: [{ url: socialBannerUrl }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: socialBannerUrl }],
  },
  icons: {
    icon: "/icons/favicon-16x16.png",
    apple: "/icons/apple-touch-icon-180x180.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0e15",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PWAProvider>
      <UserProvider>
        <html lang="en">
          <body className={inter.className}>
            <LayoutApp>{children}</LayoutApp>
            <Toaster position="top-center" richColors />

          </body>
        </html>
      </UserProvider>
    </PWAProvider>
  );
}
