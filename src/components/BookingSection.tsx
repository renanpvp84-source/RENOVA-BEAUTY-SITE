'use client';

import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { team } from '@/data/content';
import { serviceCategories } from '@/data/services';
import { siteConfig } from '@/data/siteConfig';
import { timeSlots, upcomingOpenDays, type DayOption } from '@/lib/booking';
import { cn } from '@/lib/cn';
import { SELECT_SERVICE_EVENT } from '@/lib/motion';
import { bookingMessage, whatsappLink } from '@/lib/whatsapp';
import type { ServiceCategoryId } from '@/types';

const STEPS = ['Serviço', 'Profissional', 'Data', 'Horário', 'Confirmar'] as const;
const NO_PREFERENCE = 'Sem preferência';
const DAYS_AHEAD = 12;

interface OptionProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  className?: string;
}

/** Opção selecionável: um radio de verdade, com a aparência de um bloco. */
function Option({ name, value, checked, onChange, children, className }: OptionProps) {
  return (
    <label
      className={cn(
        'relative flex min-h-12 cursor-pointer items-center justify-center border px-3 py-2 text-center text-[0.9rem] leading-tight transition-colors duration-200',
        'has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-champagne',
        checked
          ? 'border-champagne bg-champagne text-ink'
          : 'border-bone/25 text-bone hover:border-bone/70',
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {children}
    </label>
  );
}

/**
 * Agendamento em 5 passos. No MVP, o pedido segue para o WhatsApp do salão
 * com a mensagem pronta; a confirmação é feita pela equipe.
 * Para ligar a um sistema de agenda, troque `handleConfirm` por uma chamada à API.
 */
export function BookingSection() {
  const formId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocusHeading = useRef(false);

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<ServiceCategoryId | null>(null);
  const [professional, setProfessional] = useState<string | null>(null);
  const [dayIso, setDayIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  /* Datas dependem do relógio do visitante: calculadas só no navegador. */
  const [days, setDays] = useState<DayOption[]>([]);

  useEffect(() => {
    setDays(upcomingOpenDays(DAYS_AHEAD));
  }, []);

  /* Botões "Agendar <categoria>" espalhados pelo site pré-selecionam o serviço. */
  useEffect(() => {
    const onSelect = (event: Event) => {
      const id = (event as CustomEvent<ServiceCategoryId>).detail;
      if (!serviceCategories.some((category) => category.id === id)) return;
      setServiceId(id);
      setSent(false);
      setError(null);
      setStep(1);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  /* Ao trocar de passo pelos botões, o foco vai para o título do passo. */
  useEffect(() => {
    if (!shouldFocusHeading.current) return;
    shouldFocusHeading.current = false;
    headingRef.current?.focus({ preventScroll: true });
  }, [step, sent]);

  const professionals = useMemo(
    () => [NO_PREFERENCE, ...team.filter((member) => member.name).map((member) => member.name)],
    [],
  );
  const service = serviceCategories.find((category) => category.id === serviceId) ?? null;
  const day = days.find((option) => option.iso === dayIso) ?? null;
  const slots = useMemo(() => timeSlots(day), [day]);

  const summary = [service?.name, professional, day?.label, time];

  const validate = (target: number): string | null => {
    if (target > 0 && !service) return 'Escolha um serviço para continuar.';
    if (target > 1 && !professional) return 'Escolha uma opção de profissional para continuar.';
    if (target > 2 && !day) return 'Escolha uma data para continuar.';
    if (target > 3 && !time) return 'Escolha um horário para continuar.';
    return null;
  };

  const goTo = (target: number) => {
    const message = target > step ? validate(target) : null;
    setError(message);
    if (message) return;
    shouldFocusHeading.current = true;
    setStep(target);
  };

  const reset = () => {
    shouldFocusHeading.current = true;
    setStep(0);
    setServiceId(null);
    setProfessional(null);
    setDayIso(null);
    setTime(null);
    setNotes('');
    setError(null);
    setSent(false);
  };

  const link =
    service && professional && day && time
      ? whatsappLink(
          bookingMessage({
            service: service.name,
            professional,
            date: day.label,
            time,
            name: name.trim(),
            notes,
          }),
        )
      : '#';

  const handleConfirm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const message = validate(4) ?? (name.trim() ? null : 'Informe seu nome para o salão identificar o pedido.');
    if (message) {
      event.preventDefault();
      setError(message);
      return;
    }
    setError(null);
    shouldFocusHeading.current = true;
    setSent(true);
  };

  const stepTitles = [
    'Qual serviço você quer fazer?',
    'Tem preferência de profissional?',
    'Qual o melhor dia?',
    'E o horário?',
    'Confira e confirme',
  ];

  return (
    <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
      {/* Progresso: passos concluídos viram atalhos para corrigir a escolha. */}
      <ol className="flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
        {STEPS.map((label, index) => {
          const done = sent || index < step;
          const current = !sent && index === step;
          return (
            <li key={label} className="shrink-0 lg:border-t lg:border-bone/15 lg:last:border-b">
              <button
                type="button"
                disabled={sent || index >= step}
                onClick={() => goTo(index)}
                aria-current={current ? 'step' : undefined}
                className={cn(
                  'flex min-h-11 w-full items-center gap-3 border px-4 text-left transition-colors lg:min-h-[4.5rem] lg:gap-5 lg:border-0 lg:px-0',
                  current ? 'border-champagne text-bone' : 'border-bone/15 text-mist',
                  done && !sent && 'hover:text-bone',
                )}
              >
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums',
                    current && 'border-champagne text-champagne',
                    done && 'border-champagne bg-champagne text-ink',
                    !current && !done && 'border-bone/25',
                  )}
                >
                  {done ? <Check aria-hidden size={14} strokeWidth={2} /> : index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.75rem] font-medium uppercase tracking-[0.18em]">
                    {label}
                  </span>
                  {index < 4 && summary[index] && (
                    <span className="hidden truncate text-sm normal-case tracking-normal text-champagne lg:block">
                      {summary[index]}
                    </span>
                  )}
                </span>
                {done && <span className="sr-only"> (concluído{sent ? '' : ', toque para alterar'})</span>}
              </button>
            </li>
          );
        })}
      </ol>

      <form
        id={formId}
        noValidate
        onSubmit={(event) => event.preventDefault()}
        className="border border-bone/15 bg-ink-soft p-5 sm:p-8 lg:col-span-8 lg:p-10"
      >
        {sent ? (
          <div>
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-[1.75rem] leading-tight outline-none lg:text-[2.25rem]"
            >
              Mensagem pronta no WhatsApp.
            </h3>
            <p className="mt-4 max-w-lg leading-relaxed text-mist">
              Abrimos a conversa com o seu pedido já escrito: é só enviar. O horário fica
              confirmado quando a equipe da {siteConfig.brand.name} responder.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center gap-3 bg-champagne px-7 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
              >
                <WhatsAppIcon size={18} />
                Abrir o WhatsApp de novo
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 items-center text-[0.75rem] font-medium uppercase tracking-[0.2em]"
              >
                <span className="link-line">Fazer outro agendamento</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="eyebrow text-champagne">
              Passo {step + 1} de {STEPS.length}
            </p>
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="mt-3 font-display text-[1.75rem] leading-tight outline-none lg:text-[2.25rem]"
            >
              {stepTitles[step]}
            </h3>

            <div className="mt-7 min-h-[15rem]">
              {step === 0 && (
                <fieldset>
                  <legend className="sr-only">Serviço</legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {serviceCategories.map((category) => (
                      <Option
                        key={category.id}
                        name="servico"
                        value={category.id}
                        checked={serviceId === category.id}
                        onChange={() => {
                          setServiceId(category.id);
                          setError(null);
                        }}
                        className="min-h-16"
                      >
                        {category.name}
                      </Option>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-mist">
                    Quer combinar mais de um serviço? Escolha o principal e conte o resto nas
                    observações.
                  </p>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="sr-only">Profissional</legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {professionals.map((option) => (
                      <Option
                        key={option}
                        name="profissional"
                        value={option}
                        checked={professional === option}
                        onChange={() => {
                          setProfessional(option);
                          setError(null);
                        }}
                        className="min-h-16"
                      >
                        {option}
                      </Option>
                    ))}
                  </div>
                  {professionals.length === 1 && (
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-mist">
                      {siteConfig.demoMode
                        ? 'As profissionais aparecem aqui quando os nomes forem cadastrados. Por enquanto, a equipe indica quem atende no dia.'
                        : 'A equipe indica a profissional disponível para o serviço e o horário escolhidos.'}
                    </p>
                  )}
                </fieldset>
              )}

              {step === 2 && (
                <fieldset>
                  <legend className="sr-only">Data</legend>
                  {days.length === 0 ? (
                    <p className="text-mist">Carregando datas…</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                      {days.map((option) => (
                        <Option
                          key={option.iso}
                          name="data"
                          value={option.iso}
                          checked={dayIso === option.iso}
                          onChange={() => {
                            setDayIso(option.iso);
                            setTime(null);
                            setError(null);
                          }}
                          className="min-h-[5.25rem] flex-col gap-0.5"
                        >
                          <span className="text-[0.6875rem] uppercase tracking-[0.18em] opacity-80">
                            {option.isToday ? 'hoje' : option.weekday}
                          </span>
                          <span className="font-display text-[1.75rem] leading-none tabular-nums">
                            {option.day}
                          </span>
                          <span className="text-[0.6875rem] uppercase tracking-[0.18em] opacity-80">
                            {option.month}
                          </span>
                          <span className="sr-only">, {option.label}</span>
                        </Option>
                      ))}
                    </div>
                  )}
                  <p className="mt-4 text-sm text-mist">
                    Atendimento de {siteConfig.businessHours.label.toLowerCase()}. Precisa de outra
                    data? Escreva nas observações.
                  </p>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset>
                  <legend className="sr-only">Horário</legend>
                  {slots.length === 0 ? (
                    <p className="max-w-lg leading-relaxed text-mist">
                      Não há mais horários para hoje. Volte um passo e escolha outro dia.
                    </p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                      {slots.map((slot) => (
                        <Option
                          key={slot}
                          name="horario"
                          value={slot}
                          checked={time === slot}
                          onChange={() => {
                            setTime(slot);
                            setError(null);
                          }}
                          className="tabular-nums"
                        >
                          {slot}
                        </Option>
                      ))}
                    </div>
                  )}
                  <p className="mt-4 text-sm text-mist">
                    Horário de preferência, sujeito à confirmação da equipe.
                  </p>
                </fieldset>
              )}

              {step === 4 && (
                <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                  <dl className="divide-y divide-bone/15 border-y border-bone/15">
                    {STEPS.slice(0, 4).map((label, index) => (
                      <div key={label} className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-mist">
                          {label}
                        </dt>
                        <dd className="text-right">{summary[index]}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor={`${formId}-nome`}
                        className="block text-[0.75rem] font-medium uppercase tracking-[0.18em] text-mist"
                      >
                        Seu nome
                      </label>
                      <input
                        id={`${formId}-nome`}
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                          setError(null);
                        }}
                        aria-describedby={error ? `${formId}-erro` : undefined}
                        className="mt-2 h-12 w-full border border-bone/30 bg-transparent px-4 text-bone placeholder:text-mist/70 focus:border-champagne"
                        placeholder="Como podemos te chamar?"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${formId}-obs`}
                        className="block text-[0.75rem] font-medium uppercase tracking-[0.18em] text-mist"
                      >
                        Observações <span className="normal-case tracking-normal">(opcional)</span>
                      </label>
                      <textarea
                        id={`${formId}-obs`}
                        rows={3}
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        className="mt-2 w-full resize-y border border-bone/30 bg-transparent px-4 py-3 text-bone placeholder:text-mist/70 focus:border-champagne"
                        placeholder="Outros serviços, dúvidas, outra data…"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p
              id={`${formId}-erro`}
              role="alert"
              className={cn('mt-5 text-sm text-champagne', !error && 'hidden')}
            >
              {error}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-bone/15 pt-6">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                disabled={step === 0}
                className="inline-flex min-h-11 items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-bone disabled:invisible"
              >
                <ArrowLeft aria-hidden size={16} strokeWidth={1.5} />
                Voltar
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => goTo(step + 1)}
                  className="inline-flex min-h-[3.25rem] items-center gap-3 bg-champagne px-7 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
                >
                  Continuar
                  <ArrowRight aria-hidden size={16} strokeWidth={1.5} />
                </button>
              ) : (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleConfirm}
                  className="inline-flex min-h-[3.25rem] items-center gap-3 bg-champagne px-7 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
                >
                  <WhatsAppIcon size={18} />
                  Confirmar pelo WhatsApp
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
