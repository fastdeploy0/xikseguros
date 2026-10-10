import { useEffect, useId, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import {
  buildConsortiumSimulationMessage,
  consortiumSimulationOptions,
  type ConsortiumSimulationValues,
} from '@/data/consortium-simulation';
import { useScrollLock } from '@/hooks/useScrollLock';
import { buildWhatsappUrl, hasWhatsapp } from '@/lib/runtime-config';
import { inputClass } from '@/lib/field-styles';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';

type Props = { open: boolean; onClose: () => void; /** Tipo de bem pré-selecionado ao abrir. */ asset?: string };

const EMPTY: ConsortiumSimulationValues = { name: '', asset: '', credit: '', monthly: '', bid: '' };

/** Montado no destaque de consórcio do Cotar Agora; `open` vem do botão de simulação. */
export function ConsortiumSimulationModal({ open, onClose, asset }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const titleId = `${id}-title`;
  const { register, handleSubmit, reset, setFocus, formState: { errors } } =
    useForm<ConsortiumSimulationValues>({
      defaultValues: EMPTY,
    });

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // keepFieldsRef: sem ele o reset descarta as refs e o setFocus abaixo não acha o Nome.
    reset({ ...EMPTY, asset: asset ?? '' }, { keepFieldsRef: true });
    dialog?.showModal();
    setFocus('name');
    return () => {
      dialog?.close();
      trigger?.focus({ preventScroll: true });
    };
  }, [open, asset, reset, setFocus]);

  const close = () => {
    dialogRef.current?.close();
    reset();
    onClose();
  };

  const submit = (values: ConsortiumSimulationValues) => {
    const url = buildWhatsappUrl(buildConsortiumSimulationMessage(values));
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
    close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); close(); }}
      className="fixed inset-0 m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-0 text-text shadow-lifted backdrop:bg-brand-primary-900/55"
    >
      <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <h2 id={titleId} className="text-xl font-extrabold tracking-[-0.02em] text-balance">
          Simulação de consórcio
        </h2>
        <Button variant="ghost" onClick={close} aria-label="Fechar">
          <span className="inline-flex items-center gap-2"><X aria-hidden="true" className="size-4" />Fechar</span>
        </Button>
      </header>
      <form onSubmit={(event) => { void handleSubmit(submit)(event); }} noValidate className="space-y-5 px-5 py-5 sm:px-6">
        <p className="text-sm text-text-muted">
          Preencha os campos para abrir uma mensagem no WhatsApp. Nada é salvo neste site ou enviado a um servidor pelo formulário.
        </p>
        <Field id={`${id}-name`} label="Nome" required error={errors.name?.message}>
          {({ id: fieldId, describedBy, invalid }) => (
            <input id={fieldId} autoComplete="name" required aria-describedby={describedBy}
              aria-invalid={invalid} className={inputClass(invalid)}
              {...register('name', { validate: value => Boolean(value.trim()) || 'Informe seu nome.' })} />
          )}
        </Field>
        {(['asset', 'credit'] as const).map((name) => (
          <Field key={name} id={`${id}-${name}`} label={name === 'asset' ? 'Tipo de bem' : 'Valor do crédito'} required error={errors[name]?.message}>
            {({ id: fieldId, describedBy, invalid }) => (
              <select id={fieldId} required aria-describedby={describedBy} aria-invalid={invalid}
                className={inputClass(invalid)} {...register(name, { required: 'Selecione uma opção.' })}>
                <option value="">Selecione</option>
                {consortiumSimulationOptions[name].map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            )}
          </Field>
        ))}
        <Field id={`${id}-monthly`} label="Quanto cabe por mês">
          {({ id: fieldId, describedBy, invalid }) => (
            <input id={fieldId} type="text" aria-describedby={describedBy}
              className={inputClass(invalid)} {...register('monthly')} />
          )}
        </Field>
        <Field id={`${id}-bid`} label="Pretende dar lance">
          {({ id: fieldId, describedBy, invalid }) => (
            <select id={fieldId} aria-describedby={describedBy} className={inputClass(invalid)} {...register('bid')}>
              <option value="">Selecione</option>
              {consortiumSimulationOptions.bid.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          )}
        </Field>
        {hasWhatsapp() ? (
          <Button type="submit" withArrow className="w-full">Enviar pelo WhatsApp</Button>
        ) : <p className="text-sm text-text-muted">WhatsApp indisponível no momento.</p>}
      </form>
    </dialog>
  );
}
