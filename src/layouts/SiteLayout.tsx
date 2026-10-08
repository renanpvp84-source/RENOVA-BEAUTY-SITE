import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { ScrollAnimations } from '@/components/layout/ScrollAnimations';
import { SmoothScrollProvider } from '@/components/layout/SmoothScroll';
import { UIProvider } from '@/components/layout/UIProvider';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

/** Casca de todas as páginas: rolagem suave, header, rodapé e atalhos fixos. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <UIProvider>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
        <MobileMenu />
        <ScrollAnimations />
      </UIProvider>
    </SmoothScrollProvider>
  );
}
