import { describe,it,expect,vi } from 'vitest';
import { cpfIsValid,maskCpf,readCentralHealth } from './central';
describe('Yntelli Office / Central API safe client adapter',()=>{
  it('rejects invalid or repeated CPF',()=>{
    expect(cpfIsValid('111.111.111-11')).toBe(false);
    expect(cpfIsValid('12345678900')).toBe(false);
  });
  it('formats CPF without leaking into URLs',()=>{
    expect(maskCpf('12345678909')).toBe('123.456.789-09');
    expect(maskCpf('12345678909abc')).toBe('123.456.789-09');
  });
  it('never queries or charges on status check',async()=>{
    const f=vi.fn(async()=>({ok:true,json:async()=>({connected:false,capabilities:[]})})) as unknown as typeof fetch;
    const r=await readCentralHealth(f);
    expect(r.connected).toBe(false);
    expect(f).toHaveBeenCalledWith('/api/office/central/health',{method:'GET',cache:'no-store',credentials:'same-origin'});
  });
  it('does not invent an active integration after 404',async()=>{
    const f=vi.fn(async()=>({ok:false,status:404})) as unknown as typeof fetch;
    await expect(readCentralHealth(f)).rejects.toThrow('não configurado');
  });
});
