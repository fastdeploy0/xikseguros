import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { company } from '@/data/company';
import { healthPlans, insurances } from '@/data/services';
import { buildWhatsappUrl, hasWhatsapp } from '@/lib/runtime-config';
import {
  buildQuoteMessage,
  quoteSchema,
  validateField,
  type QuoteFormValues,
} from '@/lib/quote-schema';
import { Field } from '@/components/ui/Field';
import { inputClass, textareaClass } from '@/lib/field-styles';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type QuoteFormProps = {
  /** Pre-selects the modality when the form is embedded in a product page. */
  defaultSubject?: string;
  /** Page label shown in the WhatsApp hand-off (service title, "Fale Conosco", etc.). */
  sourceLabel?: string;
  className?: string;
};

/**
 * Quotation form.
 *
 * This project has no backend, so the form NEVER claims to have sent anything.
 * It validates the data client-side and then hands the visitor over to WhatsApp
 * with the information pre-filled: an action described as exactly that.
 */
export function QuoteForm({ defaultSubject, sourceLabel, className }: QuoteFormProps) {
  const [handedOff, setHandedOff] = useState(false);
  const whatsappAvailable = hasWhatsapp();
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: defaultSubject ?? '',
      message: '',
    },
  });

  const onSubmit = handleSubmit((raw) => {
    const parsed = quoteSchema.safeParse(raw);
    if (!parsed.success) return;

    const url = buildWhatsappUrl(
      buildQuoteMessage(parsed.data, {
        sourcePath: pathname,
        sourceLabel: sourceLabel ?? defaultSubject,
      })
    );
    // Without a configured number there is no channel to complete the action,
    // so nothing is faked: the visitor is pointed at the phone numbers below.
    if (!url) return;

    window.open(url, '_blank', 'noopener,noreferrer');
    setHandedOff(true);
  });

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn('flex flex-col gap-6', className)}
      aria-describedby="cotacao-aviso"
    >
      <p id="cotacao-aviso" className="flex gap-3 rounded-md border border-border bg-surface-sunken p-4 text-sm text-text-muted">
        <ShieldCheck aria-hidden="true" className="mt-0.5 size-4.5 shrink-0 text-brand-secondary-600" />
        <span>
          Ao continuar, seus dados são usados para abrir a conversa com um consultor da Xik pelo
          WhatsApp. Nada é armazenado neste site. Veja a{' '}
          <Link to="/politica-de-privacidade" className="font-semibold text-brand-primary underline underline-offset-4">
            Política de Privacidade
          </Link>
          .
        </span>
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="quote-name" label="Nome e sobrenome" required error={errors.name?.message}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="text"
              autoComplete="name"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass(invalid)}
              {...register('name', { validate: validateField('name') })}
            />
          )}
        </Field>

        <Field
          id="quote-phone"
          label="Telefone"
          required
          hint="Preferencialmente WhatsApp, com DDD."
          error={errors.phone?.message}
        >
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass(invalid)}
              {...register('phone', { validate: validateField('phone') })}
            />
          )}
        </Field>
      </div>

      <Field id="quote-email" label="E-mail" required error={errors.email?.message}>
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            type="email"
            autoComplete="email"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={inputClass(invalid)}
            {...register('email', { validate: validateField('email') })}
          />
        )}
      </Field>

      <Field
        id="quote-subject"
        label="Modalidade de interesse"
        required
        error={errors.subject?.message}
      >
        {({ id, describedBy, invalid }) => (
          <select
            id={id}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={cn(inputClass(invalid), 'appearance-none bg-no-repeat pr-10')}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%235a6478' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m3 6 5 5 5-5'/%3E%3C/svg%3E\")",
              backgroundPosition: 'right 1rem center',
            }}
            {...register('subject', { validate: validateField('subject') })}
          >
            <option value="">Selecione…</option>
            <optgroup label="Planos de saúde">
              {healthPlans.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
            </optgroup>
            <optgroup label="Seguros e demais produtos">
              {insurances.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="Seguro Placa Solar">Seguro Placa Solar</option>
            </optgroup>
          </select>
        )}
      </Field>

      <Field id="quote-message" label="Mensagem" error={errors.message?.message}>
        {({ id, describedBy, invalid }) => (
          <textarea
            id={id}
            rows={5}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            placeholder="Conte o que você precisa: quem será protegido, cidade, e as seguradoras ou operadoras de seu interesse."
            className={textareaClass(invalid)}
            {...register('message', { validate: validateField('message') })}
          />
        )}
      </Field>

      <div className="flex flex-col gap-2">
        <label htmlFor="quote-consent" className="flex cursor-pointer items-start gap-3 text-sm text-text-muted">
          <input
            id="quote-consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'quote-consent-error' : undefined}
            className="mt-0.5 size-5 shrink-0 accent-(--color-brand-primary)"
            {...register('consent', { validate: validateField('consent') })}
          />
          <span>
            Autorizo a XIK SEGUROS a entrar em contato comigo pelos dados informados, conforme a
            Lei Geral de Proteção de Dados.
          </span>
        </label>
        {errors.consent ? (
          <p id="quote-consent-error" className="text-sm font-medium text-danger">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      {whatsappAvailable ? (
        <>
          <Button type="submit" size="lg" variant="primary" disabled={isSubmitting}>
            <span className="inline-flex items-center gap-2.5">
              <MessageCircle aria-hidden="true" className="size-4.5 text-brand-secondary" />
              Continuar pelo WhatsApp
            </span>
          </Button>

          <p aria-live="polite" className="text-sm text-text-muted">
            {handedOff
              ? 'A conversa foi aberta no WhatsApp com seus dados já preenchidos. Se a janela não abriu, verifique o bloqueador de pop-ups do navegador.'
              : 'O formulário não envia mensagens: ele valida seus dados e abre o WhatsApp da Xik com tudo preenchido para você revisar antes de enviar.'}
          </p>
        </>
      ) : (
        // TODO(integração): sem número em /config.js não existe canal para concluir
        // a ação. Nenhum envio é simulado; os telefones verificados são exibidos.
        <div className="rounded-md border border-border bg-surface-sunken p-5 text-sm text-text-muted">
          <p className="font-semibold text-text">Canal de envio indisponível</p>
          <p className="mt-2">
            Este site não possui servidor para receber formulários. Entre em contato diretamente por
            telefone:
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            {company.phones.map((phone) => (
              <li key={phone.tel}>
                <a
                  href={`tel:${phone.tel}`}
                  className="font-semibold text-brand-primary underline underline-offset-4"
                >
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
