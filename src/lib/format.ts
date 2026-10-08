import { siteConfig } from '@/data/siteConfig';

/** "09:00" -> "9h" · "18:30" -> "18h30" */
export function formatHour(time: string): string {
  const [hours, minutes] = time.split(':');
  return minutes === '00' ? `${Number(hours)}h` : `${Number(hours)}h${minutes}`;
}

export function businessHoursText(): string {
  const { label, opens, closes } = siteConfig.businessHours;
  return `${label}, das ${formatHour(opens)} às ${formatHour(closes)}`;
}

export function businessHoursShort(): string {
  const { shortLabel, opens, closes } = siteConfig.businessHours;
  return `${shortLabel} · ${formatHour(opens)} às ${formatHour(closes)}`;
}

/** Endereço em uma linha, ignorando campos vazios. */
export function addressLine(): string {
  const { street, district, city, state } = siteConfig.address;
  const cityState = [city, state].filter(Boolean).join(' - ');
  return [street, district, cityState].filter(Boolean).join(', ');
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}
