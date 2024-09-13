import LayoutApp from '@/components/LayoutApp';
import { PWAProvider } from '@/contexts/pwa-context';
import { UserProvider } from '@/contexts/user-context';
import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import { createSupabaseAppServerClient } from '../libs/supabase/server';
import './globals.css';
const title = 'Derkap';
const description = 'Derkap';
const domain = 'wwww.example.com/';
const url = `https://${domain}`;
const socialBannerUrl = '/social_banner.png';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F6D5F7',
};

export const metadata: Metadata = {
  title,
  description,
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url,
    title,
    images: [{ url: socialBannerUrl }],
  },

  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [{ url: socialBannerUrl }],
  },
  icons: {
    icon: '/icons/favicon-16x16.png',
    apple: '/icons/apple-touch-icon-180x180.png',
  },
};

const champ = localFont({
  src: '../public/fonts/champs/Champ Black.woff2',
  display: 'swap',
  variable: '--font-champ',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createSupabaseAppServerClient();
  const { user } = (await supabase.auth.getUser()).data;
  const profile =
    user &&
    (await supabase.from('profile').select('*').eq('id', user?.id).single())
      .data;
  return (
    <PWAProvider>
      <html lang="fr" className={`${dmSans.variable} ${champ.variable}`}>
        <body className="bg-gradient-linear">
          <UserProvider user={user} profile={profile}>
            <LayoutApp>{children}</LayoutApp>
            <Toaster position="top-center" richColors />
          </UserProvider>
        </body>
      </html>
    </PWAProvider>
  );
}
