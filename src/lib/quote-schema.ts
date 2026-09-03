import { z } from 'zod';
import { quoteSubjects } from '@/data/services';

const digitsOnly = (value: string) => value.replace(/\D/g, '');

export const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Informe seu nome e sobrenome.')
    .refine((value) => value.split(/\s+/).length >= 2, 'Informe nome e sobrenome.'),
  email: z.string().trim().min(1, 'Informe seu e-mail.').email('Informe um e-mail válido.'),
  /** Accepts BR landline or mobile, formatted or not: 10 or 11 digits with DDD. */
  phone: z
    .string()
    .trim()
    .min(1, 'Informe seu telefone.')
    .refine((value) => [10, 11].includes(digitsOnly(value).length),
      'Informe um telefone com DDD, por exemplo (31) 99999-9999.'),
  subject: z
    .string()
    .refine((value) => quoteSubjects.includes(value), 'Selecione a modalidade de interesse.'),
  /** Optional in practice: an empty string is valid. */
  message: z.string().trim().max(1200, 'Mensagem muito longa (máximo de 1200 caracteres).'),
  consent: z.literal(true, { message: 'É necessário autorizar o contato para prosseguir.' }),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export type QuoteMessageContext = {
  /** Route where the visitor submitted the form, e.g. `/seguros/consorcios`. */
  sourcePath?: string;
  /** Human-readable page label when available (service title, "Fale Conosco", etc.). */
  sourceLabel?: string;
};

/**
 * Adapts one Zod field to react-hook-form's `validate` signature, keeping the
 * schema as the single declaration of the validation rules.
 */
export function validateField<K extends keyof QuoteFormValues>(field: K) {
  return (value: QuoteFormValues[K]): true | string => {
    const result = quoteSchema.shape[field].safeParse(value);
    return result.success ? true : (result.error.issues[0]?.message ?? 'Valor inválido.');
  };
}

function formatHandoffTimestamp(): string {
  return new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Builds the WhatsApp hand-off text from already-validated form data. */
export function buildQuoteMessage(
  values: QuoteFormValues,
  context: QuoteMessageContext = {}
): string {
  const separator = '------------';
  const lines = [
    `Olá! Meu nome é ${values.name} / Gostaria de solicitar uma cotação:`,
    '',
    separator,
    '*COTAÇÃO XIK SEGUROS*',
    '',
    `*Serviço de interesse:* ${values.subject}`,
    `*Nome:* ${values.name}`,
    `*Telefone:* ${values.phone}`,
    `*E-mail:* ${values.email}`,
  ];

  if (values.message.trim()) {
    lines.push(`*Observações:* ${values.message.trim()}`);
  }

  lines.push(separator);
  lines.push(`_Solicitação feita em ${formatHandoffTimestamp()} pelo site xikseguros.com.br_`);

  if (context.sourceLabel) {
    lines.push(`*Página de origem:* ${context.sourceLabel}`);
  }

  if (context.sourcePath && context.sourcePath !== '/') {
    lines.push(`*Rota:* ${context.sourcePath}`);
  }

  return lines.join('\n');
}
