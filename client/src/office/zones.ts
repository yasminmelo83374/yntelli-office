/** Setores conceituais do escritório; não são inferências bancárias. */
export type ZoneId = 'recepcao' | 'margens' | 'comercial' | 'operacao' | 'central' | 'engenharia';
export interface Zone { id: ZoneId; name: string; eyebrow: string; note: string }
export const ZONES: Zone[] = [
  { id: 'recepcao', name: 'Atendimento', eyebrow: '01 / CLIENTES', note: 'Recepção, triagem e qualificação' },
  { id: 'margens', name: 'Mesa de margens', eyebrow: '02 / CRÉDITO', note: 'INSS, CLT, SIAPE e convênios' },
  { id: 'comercial', name: 'Comercial', eyebrow: '03 / OPORTUNIDADES', note: 'Funil, propostas e follow-up' },
  { id: 'operacao', name: 'Operações', eyebrow: '04 / ESTEIRA', note: 'Documentos, averbação e contratos' },
  { id: 'central', name: 'Central API', eyebrow: '05 / INTEGRAÇÕES', note: 'Consulta, status e contratos' },
  { id: 'engenharia', name: 'Agentes & Codex', eyebrow: '06 / ENGENHARIA', note: 'Sessões, terminal e aprovações' },
];
