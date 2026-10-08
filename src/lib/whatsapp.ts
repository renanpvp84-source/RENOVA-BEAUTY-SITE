import { siteConfig } from '@/data/siteConfig';

/** Monta o link wa.me com a mensagem já preenchida. */
export function whatsappLink(message: string = siteConfig.whatsapp.defaultMessage): string {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export interface BookingRequest {
  service: string;
  professional: string;
  date: string;
  time: string;
  name: string;
  notes?: string;
}

/** Mensagem enviada ao salão quando a cliente conclui o agendamento no site. */
export function bookingMessage(request: BookingRequest): string {
  const lines = [
    siteConfig.whatsapp.defaultMessage,
    '',
    `Nome: ${request.name}`,
    `Serviço: ${request.service}`,
    `Profissional: ${request.professional}`,
    `Data: ${request.date}`,
    `Horário: ${request.time}`,
  ];
  if (request.notes?.trim()) lines.push(`Observações: ${request.notes.trim()}`);
  return lines.join('\n');
}
