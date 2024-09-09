import type { Metadata, Viewport } from 'next';
import './globals.scss';

import Header from '@/components/header';
import Footer from '@/components/footer';
import AnimationProvider from '@/provider/AnimationProvider';
import iphone from '../apple-touch-icon.png';
import favicon from '../favicon.ico';
import ogImage from '../../public/image/main_og.png';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const baseUrl = `https://bittenlog.vercel.app`;

  const metadataBase: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Bitten Dev',
      template: '%s | Bitten',
    },
    category: 'tech blog',
    description: locale === 'en' ? 'A tech blog documenting growth and learning.' : '성장과 학습을 기록하는 기술 블로그입니다.',
    authors: [{ name: 'Bitten', url: baseUrl }],
    openGraph: {
      images: ogImage.src,
      title: {
        default: 'Bitten Dev',
        template: '%s | Bitten',
      },
      type: 'article',
      description: locale === 'en' ? 'A tech blog documenting growth and learning.' : '성장과 학습을 기록하는 기술 블로그입니다.',
    },
    verification: {
      google: 'uBovfhvYdbEJvqXAGE44EfvyNswgNRSOmXXEApmtV_g',
    },
  };
  return metadataBase;
}
const qSoftLight = localFont({
  src: [
    {
      path: '../../public/assets/fonts/Roboto.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

export async function generateStaticParams() {
  const locales = ['en', 'ko'];

  return locales.map((locale) => ({
    locale: locale,
  }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={params.locale} className={qSoftLight.className}>
      <head>
        <link rel="icon" href={favicon.src} sizes="any" />
        <link rel="apple-touch-icon" href={iphone.src} />
        <meta name="google-adsense-account" content="ca-pub-3268251593727486" />
      </head>
      <body>
        <AnimationProvider>
          <Header />
          <main className="layout">{children}</main>
          <Footer />
        </AnimationProvider>
        <Analytics />
        {params.locale === 'en' ? <GoogleAnalytics gaId="G-8SY65R3J8S" /> : <GoogleAnalytics gaId="G-8MFSWPWB3Q" />}
      </body>
    </html>
  );
}
