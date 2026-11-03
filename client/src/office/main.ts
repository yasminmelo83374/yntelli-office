import './office.css';
import { OfficeStore } from '../net/store';
import { access,loadAccess } from '../net/access';
import type { AgentInfo,OfficeSnapshot,RecentSession,DeliveriesResponse,FeedItem } from '../../../shared/types';
import { ZONES,type ZoneId } from './zones';
import type { Office3D } from './scene3d';
import { readCentralHealth,cpfIsValid,maskCpf,safeError } from './central';
import { NAV,ZONE_LABELS,heading,icon,pageMarkup,safe,shell,statusLabel,type Screen } from './view';

const root=document.querySelector<HTMLElement>('#yntelli-office-root');
if(!root)throw new Error('Elemento raiz da interface ausente');
const app=root;
const params=new URLSearchParams(location.search);
const mock=params.get('mock')==='1';
const store=new OfficeStore({mock,search:location.search});
let screen:Screen='escritorio',zone:ZoneId='margens',scene:Office3D|null=null;
let selectedAgentId:string|null=null,filter:'all'|'codex'|'claude'='all',searchValue='';
let centralStatus:'pending'|'online'|'offline'='pending';
let toastTimer:number|undefined;
const $=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T|null;
const updateText=(id:string,text:string)=>{const e=$(id);if(e)e.textContent=text};
const list=(arr:AgentInfo[])=>arr.slice().sort((a,b)=>{
 const rank=(x:AgentInfo)=>x.permission?0:x.status==='waiting'?1:x.status==='working'?2:x.status==='shell'?3:4;
 return rank(a)-rank(b)||b.lastEventAt-a.lastEventAt;
});
function renderTime(t:number):string{
 if(!t||!Number.isFinite(t))return 'Sem horário';
 return new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit'}).format(t);
}
function toast(msg:string):void{
 const el=$('toast');if(!el)return;
 el.textContent=msg;el.hidden=false;
 if(toastTimer)window.clearTimeout(toastTimer);
 toastTimer=window.setTimeout(()=>{el.hidden=true},5000);
}
function badgeState(status:string):string{
 const className=['working','waiting','idle','shell','done','offline'].includes(status)?status:'idle';
 return '<span class="state-pill state-'+className+'"><i></i>'+safe(statusLabel(status))+'</span>';
}
function agentRow(a:AgentInfo):string{
 const provider=(a.provider??'claude')==='codex'?'CODEX':'CLAUDE';
 return '<button type="button" class="agent-row" data-agent="'+safe(a.id)+'"><span class="avatar '+(provider==='CODEX'?'avatar-code':'')+'">'+safe(a.name[0]||'A')+'</span>'+
 '<span class="agent-row-main"><b>'+safe(a.name)+'<small class="provider-chip">'+provider+'</small></b><small class="agent-activity">'+safe(a.activity?.text||a.title||a.role||'Sem atividade recente')+'</small>'+
 '<small class="project-name">'+safe(store.room(a.roomId)?.name||a.roomId)+'</small></span>'+badgeState(a.status)+icon('arrow',16)+'</button>';
}
function requestRows(agents:AgentInfo[]):string{
 const waiting=agents.filter(a=>a.permission||a.status==='waiting');
 if(!waiting.length)return '<div class="empty">Nenhuma pendência registrada.</div>';
 return waiting.slice(0,6).map(a=>'<button class="attention-item" data-agent="'+safe(a.id)+'" type="button"><span class="attention-mark">'+icon('lock',16)+
 '</span><div><b>'+safe(a.name)+'</b><small>'+safe(a.permission?.title||a.waitingFor||'Aguardando ação no terminal')+'</small></div>'+icon('arrow',16)+'</button>').join('');
}
function feedRows(items:FeedItem[]):string{
 if(!items.length)return '<div class="empty">Nenhum evento registrado.</div>';
 return items.slice(-10).reverse().map(i=>'<button class="feed-item" type="button" data-agent="'+safe(i.agentId)+'"><span class="feed-dot"></span><div><b>'+safe(i.agentName)+'</b><p>'+
 safe(i.activity.text)+'</p><small>'+safe(i.roomName)+' · '+renderTime(i.activity.at)+'</small></div></button>').join('');
}
function snapshot():OfficeSnapshot|null{return store.snapshot}
function updateConnection():void{
 const pill=$('connection-pill');if(!pill)return;
 const state=mock?'demo':store.connection;
 pill.dataset.state=state;
 updateText('connection-text',state==='open'?'Conectado ao Habblaud':state==='demo'||state==='mock'?'Demonstração':state==='connecting'?'Conectando…':'Reconectando…');
 updateText('footer-mode',mock?'DADOS DE DEMONSTRAÇÃO · NÃO REAIS':'SESSÕES LOCAIS · CENTRAL INDEPENDENTE');
}
function renderLive():void{
 updateConnection();
 const snap=snapshot(),agents=list(snap?.agents||[]);
 const working=agents.filter(a=>a.status==='working'||a.status==='shell');
 const pending=agents.filter(a=>a.permission||a.status==='waiting');
 const show=(id:string,markup:string)=>{const el=$(id);if(el)el.innerHTML=markup};
 updateText('scene-agent-count',snap?String(working.length):'—');
 updateText('scene-source-label',snap?(snap.accounts.map(a=>a.provider==='codex'?'Codex':'Claude').join(' · ')||'Nenhuma conta'):'Aguardando backend');
 updateText('waiting-count',pending.length+' pendência'+(pending.length===1?'':'s'));
 updateText('stat-working',snap?String(working.length):'—');
 updateText('stat-waiting',snap?String(pending.length):'—');
 updateText('stat-rooms',snap?String(snap.rooms.length):'—');
 updateText('stat-central',centralStatus==='online'?'Conectado':centralStatus==='offline'?'Indisponível':'Não verificado');
 if(screen==='escritorio'){
  show('office-agent-preview',agents.length?agents.slice(0,5).map(agentRow).join(''):'<div class="empty">Abra Claude Code ou Codex para ver as sessões.</div>');
  show('office-requests',requestRows(agents));
 }
 if(screen==='visao'){
  show('feed-list',feedRows(store.feed));
  show('overview-requests',requestRows(agents));
 }
 if(screen==='agentes'){
  const matching=agents.filter(a=>(filter==='all'||(a.provider??'claude')===filter)&&
    (a.name+' '+(a.title||'')+' '+(a.activity?.text||'')+' '+(store.room(a.roomId)?.name||'')).toLowerCase().includes(searchValue.toLowerCase()));
  show('agent-full-list',matching.length?matching.map(agentRow).join(''):'<p class="empty">'+(snap?'Nenhum agente encontrado neste filtro.':'Aguardando sessão…')+'</p>');
 }
 scene?.updateAgents(agents);
 if(selectedAgentId)renderDrawer();
}
function updateNav():void{
 for(const el of app.querySelectorAll<HTMLElement>('[data-screen]')){
  if(!el.classList.contains('nav-item'))continue;
  el.classList.toggle('selected',el.dataset.screen===screen);
  if(el.dataset.screen===screen)el.setAttribute('aria-current','page');
  else el.removeAttribute('aria-current');
 }
 updateText('bar-location',NAV.find(n=>n.id===screen)?.label||'Escritório');
}
function updateZone():void{
 const v=ZONE_LABELS[zone],i=ZONES.findIndex(x=>x.id===zone);
 updateText('zone-title',v.label);updateText('zone-description',v.note);
 updateText('zone-index','0'+(i+1)+' / 06 · SETOR');
 app.querySelectorAll<HTMLElement>('[data-zone]').forEach(el=>el.classList.toggle('selected',el.dataset.zone===zone));
}
async function init3D():Promise<void>{
 const canvas=$<HTMLCanvasElement>('office-canvas');if(!canvas)return;
 const fallback=()=>{
  canvas.hidden=true;
  const map=$('floorplan-fallback');if(map)map.hidden=false;
  const message=$('scene-error');if(message)message.hidden=true;
 };
 // Headless, reduced-motion and constrained-memory browsers receive a fully usable
 // non-WebGL floor plan. Hardware browsers load 3D only on this view.
 if(/HeadlessChrome/i.test(navigator.userAgent)||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches||
    (Number((navigator as Navigator & {deviceMemory?:number}).deviceMemory)||8)<3){
  fallback();return;
 }
 try{
  const {mountOffice3D}=await import('./scene3d');
  if(!canvas.isConnected||screen!=='escritorio')return;
  scene?.dispose();scene=mountOffice3D(canvas,(id)=>{zone=id;updateZone()});
  scene.updateAgents(store.snapshot?.agents??[]);
 }catch(e){
  console.warn('[yntelli-office] 3D unavailable',e);
  fallback();
 }
}
function navigate(next:Screen,writeHistory=true):void{
 scene?.dispose();scene=null;screen=next;
 const [k,t,d]=heading(screen);
 updateText('page-kicker',k);updateText('page-title',t);updateText('page-desc',d);
 const content=$('page-content');if(content)content.innerHTML=pageMarkup(screen);
 updateNav();renderLive();
 if(screen==='escritorio'){updateZone();void init3D()}
 if(screen==='historico'){void refreshSessions();void refreshDeliveries()}
 if(writeHistory){const u=new URL(location.href);u.searchParams.set('view',screen);history.pushState({screen},'',u)}
 if(innerWidth<780)app.classList.remove('menu-open');
}
function openAgent(id:string):void{
 if(!store.agent(id)){toast('Esta sessão não está mais disponível.');return}
 selectedAgentId=id;const drawer=$('agent-drawer');if(drawer){drawer.hidden=false;drawer.dataset.viewKey=''}
 renderDrawer();
}
function closeDrawer():void{
 selectedAgentId=null;const drawer=$('agent-drawer');
 if(drawer){drawer.hidden=true;drawer.innerHTML='';drawer.dataset.viewKey=''}
}
function renderDrawer():void{
 const drawer=$('agent-drawer'),a=selectedAgentId?store.agent(selectedAgentId):undefined;
 if(!drawer||!a)return;
 const req=a.permission;
 const canDecide=!!req&&Date.now()<req.expiresAt&&(store.mock||access().permissions);
 const messageAllowed=!!a.canMessage&&(store.mock||store.connection==='open')&&(store.mock||access().messages);
 const key=[a.id,a.lastEventAt,a.status,req?.id,canDecide,a.canMessage,messageAllowed].join(':');
 if(drawer.dataset.viewKey===key)return;
 drawer.dataset.viewKey=key;
 const draft=$<HTMLTextAreaElement>('agent-message')?.value||'';
 const provider=a.provider==='codex'?'Codex':'Claude Code';
 const pair=(k:string,v:unknown)=>'<div class="info-pair"><span>'+safe(k)+'</span><b>'+safe(v||'Não informado')+'</b></div>';
 const tasks=a.tasks.length?a.tasks.slice(0,8).map(t=>'<div class="task-row"><i class="'+safe(t.status)+'"></i><span>'+safe(t.title)+'</span></div>').join(''):'<p class="empty">Nenhuma tarefa registrada.</p>';
 const request=req?'<div class="request-box"><b>'+safe(req.title)+'</b><p>'+safe(req.text)+'</p>'+
  (canDecide?'<div class="request-actions"><button class="button button-primary" data-action="allow-permission" data-request="'+safe(req.id)+'">Aprovar</button>'+
  '<button class="button button-secondary" data-action="deny-permission" data-request="'+safe(req.id)+'">Recusar</button></div>':
  '<small>Este pedido requer resposta no terminal ou já expirou.</small>')+'</div>':
  '<p class="empty">Nenhuma permissão ativa.</p>';
 const composer=messageAllowed?
  '<form id="message-form"><label class="field"><span>Mensagem para '+safe(a.name)+'</span><textarea id="agent-message" required rows="3" maxlength="20000" placeholder="Uma instrução objetiva, sem segredos…"></textarea></label>'+
  '<button type="submit" class="button button-primary">Enviar '+icon('arrow',16)+'</button></form>':
  '<p class="empty">Mensagens indisponíveis nesta sessão. O backend decide quando o agente pode recebê-las.</p>';
 drawer.innerHTML='<header class="drawer-header"><div><span class="eyebrow">SESSÃO / '+safe(provider.toUpperCase())+'</span><h2>'+safe(a.name)+'</h2></div>'+
  '<button class="icon-button" data-action="close-drawer" aria-label="Fechar detalhes">'+icon('close')+'</button></header>'+
  '<div class="drawer-scroll"><div class="drawer-agent"><span class="drawer-avatar">'+safe(a.name[0]||'A')+'</span><div><b>'+safe(a.title||a.role||provider)+'</b><p>'+badgeState(a.status)+'</p></div></div>'+
  pair('Projeto',store.room(a.roomId)?.name||a.roomId)+pair('Modelo',a.model)+pair('Atividade',a.activity?.text||'Sem atividade')+
  pair('Último evento',renderTime(a.lastEventAt))+
  '<div class="divider"></div><span class="eyebrow">TAREFAS</span><div class="task-list">'+tasks+'</div>'+
  '<div class="divider"></div><span class="eyebrow">PERMISSÕES</span>'+request+
  '<div class="divider"></div><span class="eyebrow">MANDAR MENSAGEM</span>'+composer+
  '<div class="message-progress" id="message-progress" role="status"></div>'+
  '<div class="divider"></div><button class="button button-secondary" data-action="agent-history">'+icon('clock',17)+' Histórico do agente</button>'+
  '<div id="agent-history"></div><p class="drawer-foot">Terminal completo: <a href="/" target="_blank" rel="noopener noreferrer">Habblaud clássico</a>.</p></div>';
 if(draft){const text=$<HTMLTextAreaElement>('agent-message');if(text)text.value=draft}
}
async function decidePermission(mode:'allow'|'deny',id:string):Promise<void>{
 const a=selectedAgentId?store.agent(selectedAgentId):undefined;
 if(!a?.permission||a.permission.id!==id)return;
 if(mode==='allow'&&!window.confirm('Confirma a aprovação desta solicitação específica?'))return;
 const decision=mode==='allow'?{behavior:'allow' as const}:{behavior:'deny' as const,message:'Recusado na interface Yntelli Office'};
 try{
  const error=await store.decidePermission(id,decision);
  toast(error||'Decisão enviada. Acompanhe o status da sessão.');
 }catch(e){toast('Falha ao enviar decisão: '+safeError(e))}
}
async function sendAgentMessage():Promise<void>{
 const id=selectedAgentId,field=$<HTMLTextAreaElement>('agent-message');
 if(!id||!field)return;
 const text=field.value.trim();if(!text)return;
 if(!store.agent(id)?.canMessage||(!mock&&!access().messages)){toast('Mensagens não permitidas nesta sessão.');return}
 const progress=$('message-progress');if(progress)progress.textContent='Enviando…';
 try{
  const r=await store.sendMessage(id,text);
  if('error' in r){if(progress)progress.textContent='Não enviada: '+r.error;return}
  field.value='';if(progress)progress.textContent='Mensagem na fila ('+r.message.status+').';
  if(!mock){
   for(let i=0;i<8;i++){
    await new Promise(r=>setTimeout(r,1200));
    const status=await store.messageStatus(r.message.id);
    if(!status)break;
    if(progress)progress.textContent='Estado: '+status.status+(status.error?' · '+status.error:'');
    if(status.status==='delivered'||status.status==='failed')break;
   }
  }
 }catch(e){if(progress)progress.textContent='Falha de rede: '+safeError(e)}
}
async function refreshSessions():Promise<void>{
 const el=$('history-sessions');if(!el)return;
 if(mock){el.textContent='Histórico real indisponível no modo demonstração.';return}
 el.textContent='Carregando sessões autorizadas…';
 try{
  const r=await fetch('/api/sessions/recent',{cache:'no-store'});
  if(!r.ok)throw new Error('HTTP '+r.status);
  const body=await r.json() as {sessions:RecentSession[]};
  el.innerHTML=(body.sessions||[]).slice(0,30).map(s=>'<div class="history-row"><div><b>'+safe(s.title||s.projectDir)+'</b>'+
   '<small>'+safe(s.provider==='codex'?'Codex':'Claude')+' · '+safe(s.project||s.projectDir)+'</small></div><time>'+renderTime(s.lastAt)+'</time></div>').join('')||
   '<p class="empty">Nenhuma sessão encontrada.</p>';
 }catch(e){el.textContent='Histórico indisponível: '+safeError(e)}
}
async function refreshDeliveries():Promise<void>{
 const el=$('history-deliveries');if(!el)return;
 if(mock){el.textContent='Entregas reais indisponíveis na demonstração.';return}
 el.textContent='Carregando entregas…';
 try{
  const r=await fetch('/api/deliveries',{cache:'no-store'});
  if(!r.ok)throw new Error('HTTP '+r.status);
  const body=await r.json() as DeliveriesResponse;
  el.innerHTML=(body.deliveries||[]).slice(0,20).map(d=>'<div class="history-row"><div><b>'+safe(d.headline||d.request)+'</b><small>'+
    safe(d.agentName||d.project||'Agente')+' · '+safe(d.summary||'Entrega registrada')+'</small></div><time>'+renderTime(d.finishedAt)+'</time></div>').join('')||
    '<p class="empty">Nenhuma entrega registrada.</p>';
 }catch(e){el.textContent='Entregas indisponíveis: '+safeError(e)}
}
async function loadAgentHistory():Promise<void>{
 const el=$('agent-history'),id=selectedAgentId;if(!el||!id)return;
 el.textContent='Carregando histórico…';
 try{
  const items=await store.agentHistory(id);
  el.innerHTML=items.slice(-25).reverse().map(x=>'<div class="history-activity"><time>'+renderTime(x.at)+'</time><span>'+safe(x.text)+'</span></div>').join('')||
   '<p class="empty">Sem atividades.</p>';
 }catch(e){el.textContent='Histórico indisponível: '+safeError(e)}
}
async function checkCentral():Promise<void>{
 const el=$('central-response');if(el)el.textContent='Verificando apenas o endpoint de saúde…';
 try{
  const r=await readCentralHealth();
  centralStatus=r.connected?'online':'offline';
  if(el)el.textContent=r.connected?'Conector respondeu. Capabilities: '+r.capabilities.length+'.':'Conector desligado. '+(r.reason||'');
 }catch(e){
  centralStatus='offline';
  if(el)el.textContent='SEM_CONEXÃO · '+safeError(e)+' Nenhuma consulta financeira executada.';
 }
 renderLive();
}
function prepareMargin():void{
 const value=$<HTMLInputElement>('margin-cpf')?.value||'';
 const product=$<HTMLSelectElement>('margin-product')?.value||'';
 const result=$('margin-result');if(!result)return;
 if(!cpfIsValid(value)){result.innerHTML='<div class="validation-error">CPF inválido. Confira o número.</div>';return}
 if(!['INSS','SIAPE','CLT','SERVIDOR'].includes(product)){result.textContent='Produto não suportado.';return}
 const last=maskCpf(value).slice(-2);
 result.innerHTML='<div class="prepared"><b>CPF matematicamente válido. Nenhuma consulta realizada.</b><p>'+safe(product)+
  ' · final '+safe(last)+' · Para executar uma consulta tarifável, precisamos do conector autenticado com tenant, consentimento e escopo.</p>'+
  '<a href="https://apiservices.yntelli.com.br/painel" target="_blank" rel="noopener noreferrer">Consultar no painel Central API '+icon('external',15)+'</a></div>';
}
function onClick(e:MouseEvent):void{
 const target=e.target;
 if(!(target instanceof Element))return;
 const el=target.closest<HTMLElement>('[data-screen],[data-zone],[data-agent],[data-action],[data-filter]');
 if(!el)return;
 if(el.dataset.screen){navigate(el.dataset.screen as Screen);return}
 if(el.dataset.zone){zone=el.dataset.zone as ZoneId;scene?.selectZone(zone);updateZone();return}
 if(el.dataset.agent){openAgent(el.dataset.agent);return}
 if(el.dataset.filter){
  filter=el.dataset.filter as typeof filter;
  app.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('selected',b===el));
  renderLive();return
 }
 const action=el.dataset.action;
 if(action==='toggle-menu'){app.classList.toggle('menu-open');return}
 if(action==='close-drawer'){closeDrawer();return}
 if(action==='open-zone'){navigate(ZONE_LABELS[zone].screen);return}
 if(action==='reset-camera'){scene?.resetCamera();return}
 if(action==='allow-permission'||action==='deny-permission'){
  void decidePermission(action==='allow-permission'?'allow':'deny',el.dataset.request||'');return
 }
 if(action==='check-central'){void checkCentral();return}
 if(action==='history-refresh'){void refreshSessions();return}
 if(action==='delivery-refresh'){void refreshDeliveries();return}
 if(action==='agent-history'){void loadAgentHistory();return}
 if(action==='help'){toast('Escolha um setor ou agente. Use / para buscar, Esc para fechar e a visão 3D para explorar.');return}
}
function onInput(e:Event):void{
 const target=e.target;
 if(!(target instanceof HTMLElement))return;
 if(target.id==='agent-search'&&target instanceof HTMLInputElement){
  searchValue=target.value;renderLive();
 }
 if(target.id==='margin-cpf'&&target instanceof HTMLInputElement){
  const old=target.value;target.value=maskCpf(old);
  if(target.selectionStart===old.length)target.setSelectionRange(target.value.length,target.value.length);
 }
}
function onSubmit(e:Event):void{
 const form=e.target as HTMLFormElement;
 if(form.id==='margin-form'){e.preventDefault();prepareMargin()}
 if(form.id==='message-form'){e.preventDefault();void sendAgentMessage()}
}
function onKeydown(e:KeyboardEvent):void{
 const typing=e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement;
 if(e.key==='Escape'){closeDrawer();app.classList.remove('menu-open')}
 if(e.key==='/'&&!typing){e.preventDefault();navigate('agentes');$<HTMLInputElement>('agent-search')?.focus()}
}
app.innerHTML=shell(mock);
app.addEventListener('click',onClick);
app.addEventListener('input',onInput);
app.addEventListener('submit',onSubmit);
document.addEventListener('keydown',onKeydown);
store.on('snapshot',renderLive);
store.on('connection',renderLive);
store.on('feed',renderLive);
store.on('notice',n=>toast(n.text));
const initial=params.get('view');
navigate((NAV.some(n=>n.id===initial)?initial:'escritorio') as Screen,false);
if(mock)store.connect();
else void loadAccess().finally(()=>store.connect());
window.addEventListener('popstate',()=>{
 const next=new URLSearchParams(location.search).get('view');
 navigate((NAV.some(n=>n.id===next)?next:'escritorio') as Screen,false);
});
window.addEventListener('pagehide',()=>{scene?.dispose();store.disconnect()},{once:true});
