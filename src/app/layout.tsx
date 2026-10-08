import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { SiteLayout } from '@/layouts/SiteLayout';
import { structuredData } from '@/lib/seo';
import '@/styles/globals.css';

/* Fontes servidas pelo próprio site (sem requisição a terceiros). */
const bodoni = localFont({
  src: [
    { path: '../fonts/BodoniModa-latin.woff2', style: 'normal', weight: '400 900' },
    { path: '../fonts/BodoniModa-latin-italic.woff2', style: 'italic', weight: '400 900' },
  ],
  variable: '--font-bodoni',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

const jost = localFont({
  src: '../fonts/Jost-latin.woff2',
  weight: '100 900',
  variable: '--font-jost',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  applicationName: siteConfig.brand.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: siteConfig.brand.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  robots: siteConfig.seo.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#110e0d',
  colorScheme: 'dark',
};

/**
 * Roda antes da primeira pintura: se o movimento é permitido, esconde os
 * elementos do hero até o GSAP assumir. Se o GSAP não iniciar em 3,5 s
 * (JS bloqueado, erro de rede), libera o conteúdo.
 */
const motionBootstrap = `(function(){try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('motion-intro');setTimeout(function(){d.classList.add('hero-started')},3500)}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
