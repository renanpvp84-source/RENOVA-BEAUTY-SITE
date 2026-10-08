import { siteConfig } from '@/data/siteConfig';

export interface DayOption {
  /** ISO local (AAAA-MM-DD). */
  iso: string;
  weekday: string;
  day: string;
  month: string;
  /** Texto usado na mensagem do WhatsApp. */
  label: string;
  isToday: boolean;
}

function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Próximos dias em que o salão abre, a partir de hoje. */
export function upcomingOpenDays(count: number, from: Date = new Date()): DayOption[] {
  const { openDays } = siteConfig.businessHours;
  const days: DayOption[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const todayIso = toIso(cursor);

  while (days.length < count) {
    if (openDays.includes(cursor.getDay())) {
      const weekday = cursor.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      const month = cursor.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
      days.push({
        iso: toIso(cursor),
        weekday,
        day: String(cursor.getDate()).padStart(2, '0'),
        month,
        label: cursor.toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
        }),
        isToday: toIso(cursor) === todayIso,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function toTime(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

/**
 * Horários oferecidos dentro do expediente. Para o dia de hoje,
 * remove os horários que já passaram.
 */
export function timeSlots(day: DayOption | null, now: Date = new Date()): string[] {
  const { opens, closes, slotMinutes } = siteConfig.businessHours;
  const start = toMinutes(opens);
  const end = toMinutes(closes);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const slots: string[] = [];

  for (let t = start; t + slotMinutes <= end; t += slotMinutes) {
    if (day?.isToday && t <= currentMinutes) continue;
    slots.push(toTime(t));
  }
  return slots;
}
