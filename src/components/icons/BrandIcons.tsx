import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
    ...props,
  };
}

/* Ícones de marca desenhados à mão (o Lucide não inclui logotipos). */

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path
        d="M9.4 8.1c-.5.4-.9 1-.8 1.9.2 1.3 1 2.6 2.1 3.6 1 .9 2.2 1.6 3.4 1.7.8 0 1.4-.3 1.8-.9l-1.6-1.1-.9.6c-.9-.4-1.7-1.2-2.2-2.1l.6-.8Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V3h-2.2A3.8 3.8 0 0 0 11 6.8v1.7H8.5V11H11v10h3V11h2.4l.4-2.5Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 3v11.2a3.3 3.3 0 1 1-3.3-3.3" />
      <path d="M14 3c.2 2.4 1.9 4.2 4.5 4.4" />
    </svg>
  );
}
