/**
 * Contrato do painel de crédito. Não faz consulta externa por conta própria.
 * O conector financeiro REAL será um BFF isolado, com auth, tenant, consentimento,
 * trilha e política de cobrança. Nunca armazenar credenciais no browser.
 */
export type CreditProduct = 'INSS' | 'SIAPE' | 'CLT' | 'SERVIDOR';
export interface MarginDraft {
  cpf: string;
  product: CreditProduct;
  convenio: string;
}
export interface CentralHealth {
  connected: boolean;
  lastCheckedAt: number;
  capabilities: string[];
  reason?: string;
}
export function onlyDigits(v:string):string { return v.replace(/\D/g,''); }
export function cpfIsValid(value:string):boolean {
  const cpf=onlyDigits(value);
  if(!/^\d{11}$/.test(cpf)||/^(\d)\1{10}$/.test(cpf))return false;
  const check=(length:number)=>{
    const sum=Array.from({length},(_,i)=>Number(cpf[i])*(length+1-i)).reduce((a,b)=>a+b,0);
    const rem=(sum*10)%11;return rem===10?0:rem;
  };
  return check(9)===Number(cpf[9])&&check(10)===Number(cpf[10]);
}
export function maskCpf(raw:string):string {
  const d=onlyDigits(raw).slice(0,11);
  if(d.length===11)return d.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,'$1.$2.$3-$4');
  return d;
}
export function safeError(error:unknown):string {
  return error instanceof Error?error.message:'Erro inesperado de conexão.';
}
/** Status sem efeitos colaterais nem consulta tarifável. */
export async function readCentralHealth(fetcher:typeof fetch=fetch):Promise<CentralHealth> {
  const r=await fetcher('/api/office/central/health',{method:'GET',cache:'no-store',credentials:'same-origin'});
  if(!r.ok)throw new Error(r.status===404?'Conector da Central ainda não configurado neste backend.':`A conexão retornou HTTP ${r.status}.`);
  const body=await r.json() as Partial<CentralHealth>;
  if(typeof body.connected!=='boolean'||!Array.isArray(body.capabilities))throw new Error('Resposta do conector fora do contrato.');
  return {connected:body.connected,capabilities:body.capabilities.filter((x):x is string=>typeof x==='string'),lastCheckedAt:Date.now(),reason:body.reason};
}
