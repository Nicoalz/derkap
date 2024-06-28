import LayoutApp from "@/components/LayoutApp";
import { PWAProvider } from "@/contexts/pwa-context";
import { UserProvider } from '@/contexts/user-context';
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { createSupabaseAppServerClient } from '../libs/supabase/server';
import "./globals.css";
import { ThemeProvider } from '../components/ui/theme-provider';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabase = createSupabaseAppServerClient()
  const { user } = (await supabase.auth.getUser()).data;
  const profile = user && (await supabase.from('profile').select('*').eq('id', user?.id).single()).data;
  return (
    <PWAProvider>
      <UserProvider user={user} profile={profile}>
        <html lang="en">

          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <LayoutApp>{children}</LayoutApp>
              <Toaster position="top-center" richColors />
            </ThemeProvider>
          </body>
        </html>
      </UserProvider>
    </PWAProvider>
  );
}
