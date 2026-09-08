import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useForm, useWatch, type UseFormRegisterReturn } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MessageCircle, ShieldCheck, X } from 'lucide-react';
import { company } from '@/data/company';
import { quickQuoteFormKind } from '@/data/quick-quote-forms';
import type { QuickQuoteItem } from '@/data/quick-quotes';
import { useScrollLock } from '@/hooks/useScrollLock';
import { buildWhatsappUrl, hasWhatsapp } from '@/lib/runtime-config';
import {
  buildQuickQuoteLeadMessage,
  parseQuickQuoteLead,
  validateQuickQuoteField,
  type QuickQuoteLeadValues,
} from '@/lib/quick-quote-schema';
import { Field } from '@/components/ui/Field';
import { inputClass } from '@/lib/field-styles';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type QuickQuoteLeadModalProps = {
  item: QuickQuoteItem | null;
  onClose: () => void;
};

type LeadFormInput = Omit<QuickQuoteLeadValues, 'consent' | 'intent'> & {
  consent: boolean;
  intent: '' | 'renovacao' | 'novo';
};

const SELECT_STYLE = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%235a6478' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m3 6 5 5 5-5'/%3E%3C/svg%3E\")",
  backgroundPosition: 'right 1rem center',
} as const;

const DEFAULTS: LeadFormInput = {
  name: '',
  email: '',
  phone: '',
  document: '',
  consent: false,
  intent: '',
  overnightCep: '',
  maritalStatus: '',
  vehicleUse: '',
  garageAtWork: '',
  garageAtHome: '',
  dwelling: '',
  gateType: '',
  goesToCollege: '',
  collegeGarage: '',
  youngDrivers: '',
  willSendVehicleDocs: false,
  willSendLicense: false,
  willSendPolicy: false,
  riskCep: '',
  propertyUse: '',
  servicesFocus: '',
  age: '',
  assetUse: '',
  residenceCep: '',
};

/**
 * Modal lead form for quick-quote products that hand off to WhatsApp.
 * Cartão / Conta digital stay on the Porto link and never open this dialog.
 */
export function QuickQuoteLeadModal({ item, onClose }: QuickQuoteLeadModalProps) {
  const open = Boolean(item);
  const reduced = useReducedMotion();

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && item ? (
        <motion.div
          className="fixed inset-0 z-90 flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Fechar formulário"
            className="absolute inset-0 bg-brand-primary-900/55"
            onClick={onClose}
          />

          <motion.div
            key={item.slug}
            role="dialog"
            aria-modal="true"
            aria-label={`Cotação de ${item.title}`}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-lifted sm:rounded-2xl"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            <QuickQuoteLeadForm item={item} onClose={onClose} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

function QuickQuoteLeadForm({ item, onClose }: { item: QuickQuoteItem; onClose: () => void }) {
  const titleId = useId();
  const panelRef = useRef<HTMLFormElement>(null);
  const whatsappAvailable = hasWhatsapp();
  const { pathname } = useLocation();
  const [handedOff, setHandedOff] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const kind = quickQuoteFormKind(item.slug);

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput>({
    mode: 'onBlur',
    defaultValues: DEFAULTS,
  });

  const intent = useWatch({ control, name: 'intent' });
  const goesToCollege = useWatch({ control, name: 'goesToCollege' });
  const servicesFocus = useWatch({ control, name: 'servicesFocus' });
  const showQuestionnaire = intent === 'novo';
  const isRenewal = intent === 'renovacao';

  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea'
    );
    first?.focus();
  }, []);

  const onSubmit = handleSubmit((raw) => {
    if (kind === 'direct') return;
    clearErrors();
    setFormError(null);

    const parsed = parseQuickQuoteLead(kind, item.slug, {
      ...raw,
      consent: raw.consent === true,
      intent: raw.intent === 'renovacao' || raw.intent === 'novo' ? raw.intent : '',
    });

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? '');
        if (key) {
          setError(key as keyof LeadFormInput, { type: 'manual', message: issue.message });
        }
      }
      setFormError('Revise os campos destacados para continuar.');
      return;
    }

    const url = buildWhatsappUrl(
      buildQuickQuoteLeadMessage({
        productTitle: item.title,
        kind,
        values: parsed.data,
        sourcePath: pathname,
      })
    );
    if (!url) return;

    window.open(url, '_blank', 'noopener,noreferrer');
    setHandedOff(true);
  });

  return (
    <>
      <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-brand-secondary-700 uppercase">
            Cotação online
          </p>
          <h2 id={titleId} className="mt-1 text-xl font-extrabold tracking-[-0.02em] text-balance">
            {item.title}
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Preencha os dados. A conversa abre no WhatsApp com a mensagem pronta para revisar.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid size-10 shrink-0 place-items-center rounded-md border border-border text-text transition-colors hover:border-border-strong hover:bg-surface-sunken"
          aria-label="Fechar"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </header>

      <form
        ref={panelRef}
        noValidate
        onSubmit={onSubmit}
        aria-labelledby={titleId}
        className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5 sm:px-6"
      >
              <p className="flex gap-3 rounded-md border border-border bg-surface-sunken p-4 text-sm text-text-muted">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4.5 shrink-0 text-brand-secondary-600"
                />
                <span>
                  Nada é armazenado neste site. Anexos (apólice, documentos) são enviados por você
                  na conversa do WhatsApp. Veja a{' '}
                  <Link
                    to="/politica-de-privacidade"
                    className="font-semibold text-brand-primary underline underline-offset-4"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </span>
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="qq-name" label="Nome e sobrenome" required error={errors.name?.message}>
                  {({ id, describedBy, invalid }) => (
                    <input
                      id={id}
                      type="text"
                      autoComplete="name"
                      aria-invalid={invalid}
                      aria-describedby={describedBy}
                      className={inputClass(invalid)}
                      {...register('name', { validate: validateQuickQuoteField('name') })}
                    />
                  )}
                </Field>
                <Field
                  id="qq-phone"
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
                      {...register('phone', { validate: validateQuickQuoteField('phone') })}
                    />
                  )}
                </Field>
              </div>

              <Field id="qq-email" label="E-mail" required error={errors.email?.message}>
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    type="email"
                    autoComplete="email"
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    className={inputClass(invalid)}
                    {...register('email', { validate: validateQuickQuoteField('email') })}
                  />
                )}
              </Field>

              <Field
                id="qq-document"
                label="CNPJ / CPF"
                required
                error={errors.document?.message}
              >
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    className={inputClass(invalid)}
                    {...register('document', { validate: validateQuickQuoteField('document') })}
                  />
                )}
              </Field>

              <Field
                id="qq-intent"
                label="Renovação ou seguro novo?"
                required
                error={errors.intent?.message}
              >
                {({ id, describedBy, invalid }) => (
                  <select
                    id={id}
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    className={cn(inputClass(invalid), 'appearance-none bg-no-repeat pr-10')}
                    style={SELECT_STYLE}
                    {...register('intent', {
                      validate: (value) =>
                        value === 'renovacao' || value === 'novo'
                          ? true
                          : 'Informe se é renovação ou seguro novo.',
                    })}
                  >
                    <option value="">Selecione…</option>
                    <option value="renovacao">Renovação</option>
                    <option value="novo">Seguro novo</option>
                  </select>
                )}
              </Field>

              {isRenewal ? (
                <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-surface-sunken p-4 text-sm text-text-muted">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-5 shrink-0 accent-(--color-brand-primary)"
                    aria-invalid={Boolean(errors.willSendPolicy)}
                    {...register('willSendPolicy')}
                  />
                  <span>
                    Confirmo que enviarei a <strong className="text-text">cópia da apólice</strong>{' '}
                    nesta conversa do WhatsApp. Os demais dados do questionário não são necessários
                    para renovação.
                  </span>
                </label>
              ) : null}
              {errors.willSendPolicy ? (
                <p className="text-sm font-medium text-danger">{errors.willSendPolicy.message}</p>
              ) : null}

              {showQuestionnaire && kind === 'auto' ? (
                <AutoFields
                  register={register}
                  errors={errors}
                  goesToCollege={goesToCollege}
                />
              ) : null}

              {showQuestionnaire && kind === 'home' ? (
                <HomeFields register={register} errors={errors} />
              ) : null}

              {showQuestionnaire && kind === 'services' ? (
                <ServicesFields
                  register={register}
                  errors={errors}
                  servicesFocus={servicesFocus}
                />
              ) : null}

              {showQuestionnaire && kind === 'light' ? (
                <LightFields
                  slug={item.slug}
                  register={register}
                  errors={errors}
                />
              ) : null}

              <label
                htmlFor="qq-consent"
                className="flex cursor-pointer items-start gap-3 text-sm text-text-muted"
              >
                <input
                  id="qq-consent"
                  type="checkbox"
                  aria-invalid={Boolean(errors.consent)}
                  className="mt-0.5 size-5 shrink-0 accent-(--color-brand-primary)"
                  {...register('consent', {
                    validate: (value) =>
                      value === true ? true : 'É necessário autorizar o contato para prosseguir.',
                  })}
                />
                <span>
                  Autorizo a XIK SEGUROS a entrar em contato comigo pelos dados informados, conforme
                  a Lei Geral de Proteção de Dados.
                </span>
              </label>
              {errors.consent ? (
                <p className="text-sm font-medium text-danger">{errors.consent.message}</p>
              ) : null}

              {formError ? <p className="text-sm font-medium text-danger">{formError}</p> : null}

              {whatsappAvailable ? (
                <div className="sticky bottom-0 -mx-5 border-t border-border bg-surface px-5 py-4 sm:-mx-6 sm:px-6">
                  <Button type="submit" size="lg" variant="primary" disabled={isSubmitting} className="w-full">
                    <span className="inline-flex items-center gap-2.5">
                      <MessageCircle aria-hidden="true" className="size-4.5 text-brand-secondary" />
                      Continuar pelo WhatsApp
                    </span>
                  </Button>
                  <p aria-live="polite" className="mt-3 text-sm text-text-muted">
                    {handedOff
                      ? 'A conversa foi aberta no WhatsApp com seus dados já preenchidos. Se a janela não abriu, verifique o bloqueador de pop-ups.'
                      : 'O formulário não envia mensagens sozinho: valida os dados e abre o WhatsApp da Xik para você revisar antes de enviar.'}
                  </p>
                </div>
              ) : (
                <div className="rounded-md border border-border bg-surface-sunken p-5 text-sm text-text-muted">
                  <p className="font-semibold text-text">Canal de envio indisponível</p>
                  <p className="mt-2">
                    Este site não possui servidor para receber formulários. Entre em contato por
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
    </>
  );
}

type FieldBag = {
  register: ReturnType<typeof useForm<LeadFormInput>>['register'];
  errors: ReturnType<typeof useForm<LeadFormInput>>['formState']['errors'];
};

function AutoFields({
  register,
  errors,
  goesToCollege,
}: FieldBag & { goesToCollege: string }) {
  return (
    <div className="grid gap-5">
      <p className="text-sm font-semibold text-text">Dados do veículo e do perfil</p>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-text-muted">
        <input
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 accent-(--color-brand-primary)"
          {...register('willSendVehicleDocs')}
        />
        <span>
          Enviarei a <strong className="text-text">cópia do documento do veículo</strong> no
          WhatsApp.
        </span>
      </label>
      {errors.willSendVehicleDocs ? (
        <p className="text-sm font-medium text-danger">{errors.willSendVehicleDocs.message}</p>
      ) : null}

      <label className="flex cursor-pointer items-start gap-3 text-sm text-text-muted">
        <input
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 accent-(--color-brand-primary)"
          {...register('willSendLicense')}
        />
        <span>
          Enviarei a <strong className="text-text">cópia da habilitação</strong> no WhatsApp.
        </span>
      </label>
      {errors.willSendLicense ? (
        <p className="text-sm font-medium text-danger">{errors.willSendLicense.message}</p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="qq-overnight-cep" label="CEP do endereço de pernoite" required error={errors.overnightCep?.message}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="text"
              inputMode="numeric"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass(invalid)}
              {...register('overnightCep')}
            />
          )}
        </Field>
        <Field id="qq-marital" label="Estado civil do segurado e condutor" required error={errors.maritalStatus?.message}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="text"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass(invalid)}
              {...register('maritalStatus')}
            />
          )}
        </Field>
      </div>

      <SelectField
        id="qq-vehicle-use"
        label="Utilização do veículo"
        error={errors.vehicleUse?.message}
        register={register('vehicleUse')}
      >
        <option value="">Selecione…</option>
        <option value="passeio">Passeio</option>
        <option value="comercial">Uso comercial</option>
      </SelectField>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField id="qq-garage-work" label="Possui garagem no trabalho?" error={errors.garageAtWork?.message} register={register('garageAtWork')}>
          <option value="">Selecione…</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </SelectField>
        <SelectField id="qq-garage-home" label="Garagem em casa?" error={errors.garageAtHome?.message} register={register('garageAtHome')}>
          <option value="">Selecione…</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </SelectField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField id="qq-dwelling" label="Mora em apto ou casa?" error={errors.dwelling?.message} register={register('dwelling')}>
          <option value="">Selecione…</option>
          <option value="apto">Apartamento</option>
          <option value="casa">Casa</option>
        </SelectField>
        <SelectField id="qq-gate" label="Portão manual ou eletrônico?" error={errors.gateType?.message} register={register('gateType')}>
          <option value="">Selecione…</option>
          <option value="manual">Manual</option>
          <option value="eletronico">Eletrônico</option>
        </SelectField>
      </div>

      <SelectField id="qq-college" label="Vai para faculdade?" error={errors.goesToCollege?.message} register={register('goesToCollege')}>
        <option value="">Selecione…</option>
        <option value="sim">Sim</option>
        <option value="nao">Não</option>
      </SelectField>

      {goesToCollege === 'sim' ? (
        <SelectField id="qq-college-garage" label="A faculdade possui garagem?" error={errors.collegeGarage?.message} register={register('collegeGarage')}>
          <option value="">Selecione…</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </SelectField>
      ) : null}

      <SelectField id="qq-young" label="Há condutores menores de 25 anos?" error={errors.youngDrivers?.message} register={register('youngDrivers')}>
        <option value="">Selecione…</option>
        <option value="sim">Sim</option>
        <option value="nao">Não</option>
      </SelectField>
    </div>
  );
}

function HomeFields({ register, errors }: FieldBag) {
  return (
    <div className="grid gap-5">
      <p className="text-sm font-semibold text-text">Dados do imóvel</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="qq-risk-cep" label="CEP do imóvel" required error={errors.riskCep?.message}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="text"
              inputMode="numeric"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass(invalid)}
              {...register('riskCep')}
            />
          )}
        </Field>
        <SelectField id="qq-property-use" label="Uso do imóvel" error={errors.propertyUse?.message} register={register('propertyUse')}>
          <option value="">Selecione…</option>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
        </SelectField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField id="qq-home-dwelling" label="Apartamento ou casa?" error={errors.dwelling?.message} register={register('dwelling')}>
          <option value="">Selecione…</option>
          <option value="apto">Apartamento</option>
          <option value="casa">Casa</option>
        </SelectField>
        <SelectField id="qq-home-gate" label="Portão manual ou eletrônico?" error={errors.gateType?.message} register={register('gateType')}>
          <option value="">Selecione…</option>
          <option value="manual">Manual</option>
          <option value="eletronico">Eletrônico</option>
        </SelectField>
      </div>
      <SelectField id="qq-home-garage" label="Possui garagem?" error={errors.garageAtHome?.message} register={register('garageAtHome')}>
        <option value="">Selecione…</option>
        <option value="sim">Sim</option>
        <option value="nao">Não</option>
      </SelectField>
    </div>
  );
}

function ServicesFields({
  register,
  errors,
  servicesFocus,
}: FieldBag & { servicesFocus: string }) {
  return (
    <div className="grid gap-5">
      <p className="text-sm font-semibold text-text">Porto Serviços</p>
      <SelectField id="qq-services-focus" label="Interesse principal" error={errors.servicesFocus?.message} register={register('servicesFocus')}>
        <option value="">Selecione…</option>
        <option value="casa">Casa</option>
        <option value="auto">Auto</option>
      </SelectField>
      <Field id="qq-services-cep" label="CEP" required error={errors.riskCep?.message}>
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            type="text"
            inputMode="numeric"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={inputClass(invalid)}
            {...register('riskCep')}
          />
        )}
      </Field>
      {servicesFocus === 'casa' ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField id="qq-svc-dwelling" label="Apartamento ou casa?" error={errors.dwelling?.message} register={register('dwelling')}>
              <option value="">Selecione…</option>
              <option value="apto">Apartamento</option>
              <option value="casa">Casa</option>
            </SelectField>
            <SelectField id="qq-svc-gate" label="Portão" error={errors.gateType?.message} register={register('gateType')}>
              <option value="">Selecione…</option>
              <option value="manual">Manual</option>
              <option value="eletronico">Eletrônico</option>
            </SelectField>
          </div>
          <SelectField id="qq-svc-garage" label="Possui garagem?" error={errors.garageAtHome?.message} register={register('garageAtHome')}>
            <option value="">Selecione…</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </SelectField>
        </>
      ) : null}
      {servicesFocus === 'auto' ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField id="qq-svc-use" label="Uso do veículo" error={errors.vehicleUse?.message} register={register('vehicleUse')}>
            <option value="">Selecione…</option>
            <option value="passeio">Passeio</option>
            <option value="comercial">Uso comercial</option>
          </SelectField>
          <SelectField id="qq-svc-auto-garage" label="Garagem em casa?" error={errors.garageAtHome?.message} register={register('garageAtHome')}>
            <option value="">Selecione…</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </SelectField>
        </div>
      ) : null}
    </div>
  );
}

function LightFields({
  slug,
  register,
  errors,
}: FieldBag & { slug: string }) {
  if (slug === 'seguro-de-vida') {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="qq-age" label="Idade" required error={errors.age?.message}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="text"
              inputMode="numeric"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass(invalid)}
              {...register('age')}
            />
          )}
        </Field>
        <Field id="qq-vida-marital" label="Estado civil" required error={errors.maritalStatus?.message}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="text"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={inputClass(invalid)}
              {...register('maritalStatus')}
            />
          )}
        </Field>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <SelectField id="qq-asset-use" label="Uso" error={errors.assetUse?.message} register={register('assetUse')}>
        <option value="">Selecione…</option>
        <option value="pessoal">Pessoal</option>
        <option value="profissional">Profissional</option>
      </SelectField>
      <Field id="qq-residence-cep" label="CEP" hint="Opcional." error={errors.residenceCep?.message}>
        {({ id, describedBy, invalid }) => (
          <input
            id={id}
            type="text"
            inputMode="numeric"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className={inputClass(invalid)}
            {...register('residenceCep')}
          />
        )}
      </Field>
    </div>
  );
}

function SelectField({
  id,
  label,
  error,
  register,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
  children: ReactNode;
}) {
  return (
    <Field id={id} label={label} required error={error}>
      {({ id: fieldId, describedBy, invalid }) => (
        <select
          id={fieldId}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={cn(inputClass(invalid), 'appearance-none bg-no-repeat pr-10')}
          style={SELECT_STYLE}
          {...register}
        >
          {children}
        </select>
      )}
    </Field>
  );
}
