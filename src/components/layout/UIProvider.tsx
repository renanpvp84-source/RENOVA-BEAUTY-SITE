'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface UIState {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  whatsappOpen: boolean;
  setWhatsappOpen: (open: boolean) => void;
}

const UIContext = createContext<UIState | null>(null);

/** Estado compartilhado entre header, menu mobile, barra inferior e WhatsApp. */
export function UIProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  const value = useMemo(
    () => ({ menuOpen, setMenuOpen, whatsappOpen, setWhatsappOpen }),
    [menuOpen, whatsappOpen],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIState {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI precisa estar dentro de <UIProvider>.');
  return context;
}
