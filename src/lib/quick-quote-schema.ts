import { z } from 'zod';
import type { QuickQuoteFormKind } from '@/data/quick-quote-forms';

const digitsOnly = (value: string) => value.replace(/\D/g, '');

/**
 * Shared contact fields for every WhatsApp handoff from the quick-quote rail.
 * Product-specific answers ride alongside; empty strings are fine for hidden fields.
 */
export const quickQuoteLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Informe seu nome e sobrenome.')
    .refine((value) => value.split(/\s+/).length >= 2, 'Informe nome e sobrenome.'),
  email: z.string().trim().min(1, 'Informe seu e-mail.').email('Informe um e-mail válido.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Informe seu telefone.')
    .refine(
      (value) => [10, 11].includes(digitsOnly(value).length),
      'Informe um telefone com DDD, por exemplo (31) 99999-9999.'
    ),
  document: z
    .string()
    .trim()
    .min(1, 'Informe o CPF ou CNPJ.')
    .refine(
      (value) => [11, 14].includes(digitsOnly(value).length),
      'Informe um CPF (11 dígitos) ou CNPJ (14 dígitos).'
    ),
  consent: z.literal(true, { message: 'É necessário autorizar o contato para prosseguir.' }),
  intent: z.enum(['renovacao', 'novo'], { message: 'Informe se é renovação ou seguro novo.' }),

  overnightCep: z.string().default(''),
  maritalStatus: z.string().default(''),
  vehicleUse: z.enum(['passeio', 'comercial', '']).default(''),
  garageAtWork: z.enum(['sim', 'nao', '']).default(''),
  garageAtHome: z.enum(['sim', 'nao', '']).default(''),
  dwelling: z.enum(['apto', 'casa', '']).default(''),
  gateType: z.enum(['manual', 'eletronico', '']).default(''),
  goesToCollege: z.enum(['sim', 'nao', '']).default(''),
  collegeGarage: z.enum(['sim', 'nao', '']).default(''),
  youngDrivers: z.enum(['sim', 'nao', '']).default(''),
  willSendVehicleDocs: z.boolean().default(false),
  willSendLicense: z.boolean().default(false),
  willSendPolicy: z.boolean().default(false),

  riskCep: z.string().default(''),
  propertyUse: z.enum(['residencial', 'comercial', '']).default(''),

  servicesFocus: z.enum(['casa', 'auto', '']).default(''),

  age: z.string().default(''),
  assetUse: z.enum(['pessoal', 'profissional', '']).default(''),
  residenceCep: z.string().default(''),
});

export type QuickQuoteLeadValues = z.infer<typeof quickQuoteLeadSchema>;

export const quickQuoteLeadDefaults: QuickQuoteLeadValues = {
  name: '',
  email: '',
  phone: '',
  document: '',
  consent: true as unknown as true,
  intent: undefined as unknown as 'renovacao' | 'novo',
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

function issue(path: string, message: string): z.ZodIssue {
  return { code: 'custom', path: [path], message };
}

function invalidCep(value: string | undefined): boolean {
  return digitsOnly(value ?? '').length !== 8;
}

function invalidYesNo(value: string | undefined): boolean {
  return value !== 'sim' && value !== 'nao';
}

/** Validates lead values for a specific quick-quote form kind. */
export function parseQuickQuoteLead(
  kind: QuickQuoteFormKind,
  slug: string,
  raw: unknown
): { success: true; data: QuickQuoteLeadValues } | { success: false; error: z.ZodError } {
  const base = quickQuoteLeadSchema.safeParse(raw);
  if (!base.success) return base;

  const values = base.data;
  const issues: z.ZodIssue[] = [];

  if (values.intent === 'renovacao') {
    if (!values.willSendPolicy) {
      issues.push(
        issue(
          'willSendPolicy',
          'Confirme que enviará a cópia da apólice no WhatsApp após abrir a conversa.'
        )
      );
    }
  } else if (kind === 'auto') {
    if (!values.willSendVehicleDocs) {
      issues.push(
        issue(
          'willSendVehicleDocs',
          'Confirme que enviará a cópia do documento do veículo no WhatsApp.'
        )
      );
    }
    if (!values.willSendLicense) {
      issues.push(
        issue('willSendLicense', 'Confirme que enviará a cópia da habilitação no WhatsApp.')
      );
    }
    if (invalidCep(values.overnightCep)) {
      issues.push(issue('overnightCep', 'Informe o CEP de pernoite com 8 dígitos.'));
    }
    if (!values.maritalStatus.trim()) {
      issues.push(issue('maritalStatus', 'Informe o estado civil.'));
    }
    if (values.vehicleUse !== 'passeio' && values.vehicleUse !== 'comercial') {
      issues.push(issue('vehicleUse', 'Informe se o uso é passeio ou comercial.'));
    }
    if (invalidYesNo(values.garageAtWork)) {
      issues.push(issue('garageAtWork', 'Informe se possui garagem no trabalho.'));
    }
    if (invalidYesNo(values.garageAtHome)) {
      issues.push(issue('garageAtHome', 'Informe se possui garagem em casa.'));
    }
    if (values.dwelling !== 'apto' && values.dwelling !== 'casa') {
      issues.push(issue('dwelling', 'Informe se mora em apartamento ou casa.'));
    }
    if (values.gateType !== 'manual' && values.gateType !== 'eletronico') {
      issues.push(issue('gateType', 'Informe se o portão é manual ou eletrônico.'));
    }
    if (invalidYesNo(values.goesToCollege)) {
      issues.push(issue('goesToCollege', 'Informe se frequenta faculdade.'));
    }
    if (values.goesToCollege === 'sim' && invalidYesNo(values.collegeGarage)) {
      issues.push(issue('collegeGarage', 'Informe se a faculdade possui garagem.'));
    }
    if (invalidYesNo(values.youngDrivers)) {
      issues.push(issue('youngDrivers', 'Informe se há condutores menores de 25 anos.'));
    }
  } else if (kind === 'home') {
    if (invalidCep(values.riskCep)) {
      issues.push(issue('riskCep', 'Informe o CEP do imóvel com 8 dígitos.'));
    }
    if (values.propertyUse !== 'residencial' && values.propertyUse !== 'comercial') {
      issues.push(issue('propertyUse', 'Informe o uso do imóvel.'));
    }
    if (invalidYesNo(values.garageAtHome)) {
      issues.push(issue('garageAtHome', 'Informe se possui garagem.'));
    }
    if (values.dwelling !== 'apto' && values.dwelling !== 'casa') {
      issues.push(issue('dwelling', 'Informe se é apartamento ou casa.'));
    }
    if (values.gateType !== 'manual' && values.gateType !== 'eletronico') {
      issues.push(issue('gateType', 'Informe se o portão é manual ou eletrônico.'));
    }
  } else if (kind === 'services') {
    if (values.servicesFocus !== 'casa' && values.servicesFocus !== 'auto') {
      issues.push(issue('servicesFocus', 'Informe se o interesse é casa ou auto.'));
    }
    if (invalidCep(values.riskCep)) {
      issues.push(issue('riskCep', 'Informe o CEP com 8 dígitos.'));
    }
    if (values.servicesFocus === 'casa') {
      if (values.dwelling !== 'apto' && values.dwelling !== 'casa') {
        issues.push(issue('dwelling', 'Informe se é apartamento ou casa.'));
      }
      if (values.gateType !== 'manual' && values.gateType !== 'eletronico') {
        issues.push(issue('gateType', 'Informe se o portão é manual ou eletrônico.'));
      }
      if (invalidYesNo(values.garageAtHome)) {
        issues.push(issue('garageAtHome', 'Informe se possui garagem.'));
      }
    }
    if (values.servicesFocus === 'auto') {
      if (values.vehicleUse !== 'passeio' && values.vehicleUse !== 'comercial') {
        issues.push(issue('vehicleUse', 'Informe se o uso é passeio ou comercial.'));
      }
      if (invalidYesNo(values.garageAtHome)) {
        issues.push(issue('garageAtHome', 'Informe se possui garagem em casa.'));
      }
    }
  } else if (kind === 'light') {
    if (slug === 'seguro-de-vida') {
      if (!values.maritalStatus.trim()) {
        issues.push(issue('maritalStatus', 'Informe o estado civil.'));
      }
      const ageOk =
        Boolean(values.age.trim()) &&
        /^\d+$/.test(values.age) &&
        Number(values.age) >= 1 &&
        Number(values.age) <= 120;
      if (!ageOk) issues.push(issue('age', 'Informe uma idade entre 1 e 120.'));
    } else {
      if (values.assetUse !== 'pessoal' && values.assetUse !== 'profissional') {
        issues.push(issue('assetUse', 'Informe se o uso é pessoal ou profissional.'));
      }
      if (values.residenceCep.trim() && invalidCep(values.residenceCep)) {
        issues.push(issue('residenceCep', 'Informe o CEP com 8 dígitos.'));
      }
    }
  }

  if (issues.length) return { success: false, error: new z.ZodError(issues) };
  return { success: true, data: values };
}

export function validateQuickQuoteField<K extends keyof QuickQuoteLeadValues>(field: K) {
  return (value: QuickQuoteLeadValues[K]): true | string => {
    const shape = quickQuoteLeadSchema.shape[field];
    const result = shape.safeParse(value);
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

const YES_NO_LABEL: Record<string, string> = { sim: 'Sim', nao: 'Não' };

/** Builds WhatsApp hand-off text for a quick-quote lead. */
export function buildQuickQuoteLeadMessage(input: {
  productTitle: string;
  kind: QuickQuoteFormKind;
  values: QuickQuoteLeadValues;
  sourcePath?: string;
}): string {
  const { productTitle, kind, values, sourcePath } = input;
  const separator = '------------';
  const lines = [
    `Olá! Meu nome é ${values.name} / Gostaria de solicitar uma cotação:`,
    '',
    separator,
    '*COTAÇÃO RÁPIDA XIK SEGUROS*',
    '',
    `*Produto:* ${productTitle}`,
    `*Renovação ou novo:* ${values.intent === 'renovacao' ? 'Renovação' : 'Seguro novo'}`,
    `*Nome:* ${values.name}`,
    `*CPF/CNPJ:* ${values.document}`,
    `*Telefone:* ${values.phone}`,
    `*E-mail:* ${values.email}`,
  ];

  if (values.intent === 'renovacao') {
    lines.push('*Anexo combinado:* cópia da apólice (enviar nesta conversa)');
  } else if (kind === 'auto') {
    lines.push(`*CEP pernoite:* ${values.overnightCep}`);
    lines.push(`*Estado civil:* ${values.maritalStatus}`);
    lines.push(`*Uso do veículo:* ${values.vehicleUse === 'comercial' ? 'Comercial' : 'Passeio'}`);
    lines.push(`*Garagem no trabalho:* ${YES_NO_LABEL[values.garageAtWork] ?? values.garageAtWork}`);
    lines.push(`*Garagem em casa:* ${YES_NO_LABEL[values.garageAtHome] ?? values.garageAtHome}`);
    lines.push(`*Moradia:* ${values.dwelling === 'apto' ? 'Apartamento' : 'Casa'}`);
    lines.push(`*Portão:* ${values.gateType === 'eletronico' ? 'Eletrônico' : 'Manual'}`);
    lines.push(`*Faculdade:* ${YES_NO_LABEL[values.goesToCollege] ?? values.goesToCollege}`);
    if (values.goesToCollege === 'sim') {
      lines.push(
        `*Garagem na faculdade:* ${YES_NO_LABEL[values.collegeGarage] ?? values.collegeGarage}`
      );
    }
    lines.push(
      `*Condutores menores de 25 anos:* ${YES_NO_LABEL[values.youngDrivers] ?? values.youngDrivers}`
    );
    lines.push('*Anexos combinados:* documento do veículo e habilitação (enviar nesta conversa)');
  } else if (kind === 'home') {
    lines.push(`*CEP do imóvel:* ${values.riskCep}`);
    lines.push(
      `*Uso do imóvel:* ${values.propertyUse === 'comercial' ? 'Comercial' : 'Residencial'}`
    );
    lines.push(`*Garagem:* ${YES_NO_LABEL[values.garageAtHome] ?? values.garageAtHome}`);
    lines.push(`*Tipo:* ${values.dwelling === 'apto' ? 'Apartamento' : 'Casa'}`);
    lines.push(`*Portão:* ${values.gateType === 'eletronico' ? 'Eletrônico' : 'Manual'}`);
  } else if (kind === 'services') {
    lines.push(`*Foco:* ${values.servicesFocus === 'auto' ? 'Auto' : 'Casa'}`);
    lines.push(`*CEP:* ${values.riskCep}`);
    if (values.servicesFocus === 'casa') {
      lines.push(`*Tipo:* ${values.dwelling === 'apto' ? 'Apartamento' : 'Casa'}`);
      lines.push(`*Portão:* ${values.gateType === 'eletronico' ? 'Eletrônico' : 'Manual'}`);
      lines.push(`*Garagem:* ${YES_NO_LABEL[values.garageAtHome] ?? values.garageAtHome}`);
    }
    if (values.servicesFocus === 'auto') {
      lines.push(`*Uso do veículo:* ${values.vehicleUse === 'comercial' ? 'Comercial' : 'Passeio'}`);
      lines.push(`*Garagem em casa:* ${YES_NO_LABEL[values.garageAtHome] ?? values.garageAtHome}`);
    }
  } else if (kind === 'light') {
    if (values.age) lines.push(`*Idade:* ${values.age}`);
    if (values.maritalStatus) lines.push(`*Estado civil:* ${values.maritalStatus}`);
    if (values.assetUse) {
      lines.push(`*Uso:* ${values.assetUse === 'profissional' ? 'Profissional' : 'Pessoal'}`);
    }
    if (values.residenceCep) lines.push(`*CEP:* ${values.residenceCep}`);
  }

  lines.push(separator);
  lines.push(`_Solicitação feita em ${formatHandoffTimestamp()} pelo site xikseguros.com.br_`);
  lines.push('*Página de origem:* Cotação online (home)');
  if (sourcePath) lines.push(`*Rota:* ${sourcePath}`);

  return lines.join('\n');
}
