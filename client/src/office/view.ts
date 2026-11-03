/** Template-only UI. All dynamic strings from agents are escaped before insertion. */
import type { ZoneId } from './zones';
export type Screen='escritorio'|'visao'|'margens'|'central'|'agentes'|'comercial'|'operacao'|'historico';
export const NAV:{id:Screen,label:string,icon:string,group:string}[]=[
 {id:'visao',label:'Visão geral',icon:'grid',group:'Escritório'},
 {id:'escritorio',label:'Escritório 3D',icon:'building',group:'Escritório'},
 {id:'agentes',label:'Agentes & Codex',icon:'cpu',group:'Escritório'},
 {id:'margens',label:'Margens',icon:'wallet',group:'Consignado'},
 {id:'comercial',label:'Comercial',icon:'chart',group:'Consignado'},
 {id:'operacao',label:'Operações',icon:'layers',group:'Consignado'},
 {id:'central',label:'Central API',icon:'database',group:'Sistema'},
 {id:'historico',label:'Histórico & entregas',icon:'clock',group:'Sistema'},
];
export const ZONE_LABELS:Record<ZoneId,{label:string,note:string,screen:Screen}>={
 recepcao:{label:'Atendimento',note:'Recepção, triagem e qualificação',screen:'comercial'},
 margens:{label:'Mesa de margens',note:'INSS, CLT, SIAPE e convênios',screen:'margens'},
 comercial:{label:'Comercial',note:'Leads, propostas e follow-up',screen:'comercial'},
 operacao:{label:'Operações',note:'Contratos, averbação e acompanhamento',screen:'operacao'},
 central:{label:'Central API',note:'Integrações e status dos serviços',screen:'central'},
 engenharia:{label:'Agentes & Codex',note:'Sessões, solicitações e entregas',screen:'agentes'},
};
const shapes:Record<string,string>={
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 building:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 3v18M15 3v18M3 10h18M3 16h18"/>',
 cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v4m6-4v4m-6 12v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>',
 wallet:'<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18m-5 4h2M7 5V3h12"/>',
 chart:'<path d="M3 21h18M6 17v-6m6 6V4m6 13v-9"/><path d="m5 7 5-3 4 3 6-4"/>',
 layers:'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
 database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v7c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12v7c0 1.7 4 3 9 3s9-1.3 9-3v-7"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 3"/>',
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 refresh:'<path d="M20 6v5h-5M4 18v-5h5"/><path d="M20 11A8 8 0 0 0 6 6l-2 2M4 13a8 8 0 0 0 14 5l2-2"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 close:'<path d="m5 5 14 14M19 5 5 19"/>',
 compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2Z"/>',
 external:'<path d="M14 4h6v6M20 4l-9 9"/><path d="M20 14v6H4V4h6"/>',
 message:'<path d="M4 5h16v12H8l-4 4V5Z"/>',
};
export function icon(key:string,n=20):string{return '<svg class="icon" width="'+n+'" height="'+n+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(shapes[key]||shapes.grid)+'</svg>'}
export function safe(s:unknown):string{return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
const screenCopy:Record<Screen,[string,string,string]>={
 escritorio:['AMBIENTE / AO VIVO','O escritório está vivo.','Uma arquitetura viva para acompanhar agentes e explorar cada setor da operação de consignado.'],
 visao:['RESUMO / OPERAÇÕES','O que pede sua atenção.','Decisões com contexto, métricas verificáveis e prioridades da operação.'],
 margens:['CRÉDITO / CONSULTAS','Mesa de margens.','INSS, SIAPE, CLT e servidores públicos. Dados financeiros só com fonte autorizada.'],
 central:['INTEGRAÇÕES / PLATAFORMA','Central API.','Contratos, fontes e disponibilidade, sem credenciais no navegador.'],
 agentes:['INTELIGÊNCIA / EXECUÇÃO','Agentes e Codex.','Sessões reais, permissões, atividades, entregas e mensagens.'],
 comercial:['CRÉDITO / RELACIONAMENTO','Oportunidades.','Prospecção, qualificação, simulação e contratação em uma esteira clara.'],
 operacao:['CRÉDITO / BACKOFFICE','Esteira operacional.','Do recebimento à averbação. Etapas e bloqueios sem números fictícios.'],
 historico:['ATIVIDADE / ARQUIVO','Histórico e entregas.','Sessões anteriores e resultados acessíveis pelo backend do Habblaud.'],
};
export function heading(id:Screen):[string,string,string]{return screenCopy[id]}
export function shell(mock:boolean):string{
 let nav='';
 for(const group of ['Escritório','Consignado','Sistema']){
  nav+='<span class="nav-heading">'+group.toUpperCase()+'</span>';
  for(const n of NAV.filter(x=>x.group===group)){
   nav+='<button class="nav-item" type="button" data-screen="'+n.id+'">'+icon(n.icon,19)+'<span>'+safe(n.label)+'</span></button>';
  }
 }
 return '<a class="skip-link" href="#office-main">Pular para conteúdo</a>'+
 '<div class="layout"><aside class="rail" id="office-rail">'+
 '<a class="brand" href="/office.html"><span class="brand-orb" aria-hidden="true"></span><b>yntelli<span>/office</span></b></a>'+
 '<div class="rail-sub">CENTRO DE OPERAÇÕES</div><nav class="rail-nav" aria-label="Seções">'+nav+'</nav>'+
 '<div class="rail-footer"><span class="footer-orb"></span><div><b>YNTELLI OFFICE / V1</b><small>Software livre · base MIT</small></div></div></aside>'+
 '<div class="content-shell"><header class="topbar">'+
 '<button class="mobile-menu" data-action="toggle-menu" aria-label="Abrir navegação">'+icon('layers')+'</button>'+
 '<div class="breadcrumb">YNTELLI <span>/</span> <b id="bar-location">Escritório</b></div>'+
 '<div class="topbar-right"><span class="demo-label" '+(mock?'':'hidden')+'>DEMONSTRAÇÃO</span>'+
 '<span class="connection" id="connection-pill" data-state="connecting"><i></i><span id="connection-text">Conectando…</span></span>'+
 '<button class="icon-button" data-action="help" aria-label="Ajuda">'+icon('compass')+'</button></div></header>'+
 '<main class="main" id="office-main" tabindex="-1"><header class="page-heading">'+
 '<p class="eyebrow" id="page-kicker"></p><h1 id="page-title"></h1><p id="page-desc"></p></header>'+
 '<div id="page-content"></div><footer class="page-footer">YNTELLI OFFICE <span id="footer-mode">DADOS VINCULADOS A FONTES</span>'+
 '<a href="https://github.com/yasminmelo83374/yntelli-office" target="_blank" rel="noopener noreferrer">Open source '+icon('external',14)+'</a></footer></main></div></div>'+
 '<aside class="drawer" id="agent-drawer" hidden aria-label="Detalhes do agente"></aside>'+
 '<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>';
}
export function sectionHeader(kicker:string,title:string,right=''):string {
 return '<div class="section-head"><div><span class="eyebrow">'+kicker+'</span><h2>'+title+'</h2></div>'+right+'</div>';
}
export function statusLabel(s:string):string {return ({working:'Trabalhando',waiting:'Precisa de você',idle:'Disponível',shell:'Executando comando',done:'Concluído',offline:'Offline'} as Record<string,string>)[s]||s}
export function pageMarkup(screen:Screen):string {
 if(screen==='escritorio'){
  const zones=Object.entries(ZONE_LABELS).map(([key,v],i)=>
   '<button class="zone-select'+(key==='margens'?' selected':'')+'" data-zone="'+key+'"><span class="zone-id">0'+(i+1)+'</span><b>'+safe(v.label)+'</b>'+icon('arrow',15)+'</button>'
  ).join('');
  return '<section class="visual-stage">'+
   '<div class="stage-bar"><span><i class="live-mark"></i> IMERSÃO ARQUITETÔNICA / 06 AMBIENTES</span><div>'+
   '<button class="small-action" data-action="reset-camera">'+icon('refresh',15)+' Visão geral</button>'+
   '<small>ARRASTE PARA ORBITAR · ROLE PARA ZOOM</small></div></div>'+
   '<div class="scene-window"><canvas id="office-canvas" aria-label="Escritório Yntelli em três dimensões. Navegue também pelos botões dos setores abaixo." tabindex="0"></canvas>'+
   '<div class="scene-error" id="scene-error" hidden>Não foi possível iniciar WebGL. Os setores abaixo continuam acessíveis.</div>'+
   '<div class="fallback-floorplan" id="floorplan-fallback" hidden>'+
   '<div class="floorplan-header">PLANTA EXECUTIVA / REPRESENTAÇÃO LEVE</div>'+
   '<div class="floorplan-rooms">'+Object.entries(ZONE_LABELS).map(([key,v],i)=>
    '<button type="button" class="floorplan-room room-'+i+'" data-zone="'+key+'">'+
    '<span class="room-light"></span><span class="floorplan-monitor"></span>'+
    '<span class="floorplan-table"></span><span class="floorplan-seat"></span>'+
    '<b>'+safe(v.label)+'</b><small>'+safe(v.note)+'</small></button>'
   ).join('')+'</div></div>'+

   '<div class="scene-info"><span id="zone-index" class="eyebrow">02 / 06 · SETOR</span><h2 id="zone-title">Mesa de margens</h2>'+
   '<p id="zone-description">INSS, CLT, SIAPE e convênios</p><button data-action="open-zone" class="button button-primary">Abrir setor '+icon('arrow',16)+'</button></div>'+
   '<div class="scene-live"><span>SESSÕES MONITORADAS</span><strong id="scene-agent-count">—</strong><small id="scene-source-label">Aguardando backend</small></div>'+
   '<div class="scene-caption">PLANTA DIGITAL · VISUALIZAÇÃO 3D, NÃO DADO BANCÁRIO</div></div></section>'+
   '<nav class="zone-grid" aria-label="Setores do escritório">'+zones+'</nav>'+
   '<div class="content-columns"><section class="panel">'+sectionHeader('AO VIVO','Agentes em atividade','<button data-screen="agentes" class="text-link">Ver todos '+icon('arrow',15)+'</button>')+
   '<div class="agent-list" id="office-agent-preview"><div class="empty">Conectando às sessões…</div></div></section>'+
   '<section class="panel">'+sectionHeader('PRIORIDADES','Precisa da sua decisão','<span id="waiting-count" class="mini-badge">0 pendências</span>')+
   '<div id="office-requests"><p class="empty">Nenhuma solicitação registrada.</p></div></section></div>';
 }
 if(screen==='visao'){
  return '<div class="metrics"><article class="metric"><span>AGENTES EM EXECUÇÃO</span><b id="stat-working">—</b><small>Fonte: sessões Claude / Codex</small></article>'+
  '<article class="metric"><span>PEDIDOS PENDENTES</span><b id="stat-waiting">—</b><small>Fonte: hooks autorizados</small></article>'+
  '<article class="metric"><span>PROJETOS ABERTOS</span><b id="stat-rooms">—</b><small>Fonte: sessões locais</small></article>'+
  '<article class="metric"><span>CENTRAL API</span><b class="metric-status" id="stat-central">Não conectada</b><small>Sem números bancários fictícios</small></article></div>'+
  '<div class="content-columns"><section class="panel">'+sectionHeader('AGORA','Atividades recentes')+
  '<div class="feed-list" id="feed-list"><p class="empty">Sem eventos carregados.</p></div></section>'+
  '<section class="panel">'+sectionHeader('EXIGEM ATENÇÃO','Solicitações e bloqueios')+
  '<div id="overview-requests"><p class="empty">Aguardando o backend…</p></div></section></div>'+
  '<div class="feature-strip"><div><span class="eyebrow">ESCRITÓRIO IMERSIVO</span><h2>O contexto ganha espaço.</h2>'+
  '<p>Entre no ambiente 3D e acompanhe os agentes sem transformar o crédito em um painel de números soltos.</p></div>'+
  '<button class="button button-primary" data-screen="escritorio">Explorar escritório '+icon('arrow',16)+'</button></div>';
 }
 if(screen==='agentes'){
  return '<section class="panel">'+sectionHeader('SESSÕES DO HABBLAUD','Claude Code + Codex',
   '<div class="filter-buttons" role="group" aria-label="Filtrar por agente"><button data-filter="all" class="selected">Todos</button><button data-filter="codex">Codex</button><button data-filter="claude">Claude</button></div>')+
   '<label class="agent-search">'+icon('search',17)+'<input id="agent-search" placeholder="Buscar por projeto, sessão ou atividade" aria-label="Buscar agentes" autocomplete="off"/></label>'+
   '<div class="agent-list" id="agent-full-list"><p class="empty">Aguardando agentes reais…</p></div></section>'+
   '<p class="notice">'+icon('lock',16)+' O frontend respeita o backend. Nenhum hook, pedido ou comando é aprovado automaticamente.</p>';
 }
 if(screen==='margens'){
  const products=['INSS','SIAPE','CLT','SERVIDOR'];
  const productNames=['INSS · benefícios','SIAPE · federal','CLT · trabalhador','Servidor · convênio'];
  const options=products.map((p,i)=>'<option value="'+p+'">'+productNames[i]+'</option>').join('');
  return '<section class="panel margins-panel">'+sectionHeader('MESA DE CONSULTAS','Margem consignável',
   '<span class="tag-neutral">CONEXÃO DA CENTRAL PENDENTE</span>')+
   '<form id="margin-form" class="query-form" novalidate>'+
   '<div class="field"><label for="margin-product">Produto</label><select id="margin-product">'+options+'</select></div>'+
   '<div class="field"><label for="margin-cpf">CPF do titular</label><input id="margin-cpf" inputmode="numeric" maxlength="14" autocomplete="off" placeholder="000.000.000-00"/></div>'+
   '<div class="field"><label for="margin-convenio">Convênio / órgão</label><input id="margin-convenio" autocomplete="off" placeholder="Obrigatório quando exigido"/></div>'+
   '<button class="button button-primary" type="submit">Validar e preparar '+icon('arrow',16)+'</button></form>'+
   '<p class="privacy">'+icon('lock',14)+' Esta etapa apenas valida o formulário. Nenhum CPF é enviado para consulta financeira ou tarifável.</p>'+
   '<div id="margin-result" class="margin-result"><div class="empty-result"><b>%</b><div><strong>Nenhuma consulta realizada</strong><p>Os resultados de margem, contratos e simulações só aparecerão após uma integração autenticada com a Central API.</p></div></div></div></section>'+
   '<div class="three-cards"><article class="readout"><span>MARGEM DISPONÍVEL</span><b>—</b><small>Sem consulta real</small></article>'+
   '<article class="readout"><span>CONTRATOS ATIVOS</span><b>—</b><small>Sem consulta real</small></article>'+
   '<article class="readout"><span>ELEGIBILIDADE</span><b>—</b><small>Sem consulta real</small></article></div>'+
   '<section class="panel">'+sectionHeader('PRODUTOS','Fontes de crédito')+
   '<div class="service-grid">'+[['INSS','Novo · RMC · RCC'],['SIAPE','Margem federal'],['CLT','Vínculo e elegibilidade'],['Servidores','Convênios e órgãos']].map(([n,s])=>
   '<div class="service-card"><span class="service-light"></span><div><b>'+n+'</b><small>'+s+'</small></div><span>SEM CONEXÃO</span></div>').join('')+'</div></section>';
 }
 if(screen==='central'){
  return '<section class="panel central-intro"><div class="central-mark">'+icon('database',32)+'</div><div>'+
   '<span class="eyebrow">CONTROLE DE INTEGRAÇÕES</span><h2>Central API, com contratos.</h2>'+
   '<p>Uma única camada segura no backend para autenticação, tenant, permissão, consulta e auditoria. Nunca expomos tokens ao navegador.</p></div>'+
   '<button class="button button-secondary" data-action="check-central">'+icon('refresh',16)+' Testar conector</button></section>'+
   '<div class="connector-status" id="central-response" role="status">Sem verificação realizada. Não foi feita nenhuma consulta tarifável.</div>'+
   '<section class="panel">'+sectionHeader('CATÁLOGO INFORMATIVO','Capacidades previstas')+
   '<div class="service-grid">'+[['INSS','Consulta, contratos, margens'],['SIAPE','Margem e benefícios'],['Motor CLT','Vínculo e operações'],['Gestoras','Convênios e portais'],['Documentos','OCR e conferência'],['Radar','Oportunidades oficiais']].map(([n,s])=>
   '<div class="service-card"><span class="service-light"></span><div><b>'+n+'</b><small>'+s+'</small></div><span>NÃO VERIFICADO</span></div>').join('')+'</div></section>'+
   '<p class="notice">'+icon('external',16)+' O painel de produção permanece separado: <a href="https://apiservices.yntelli.com.br/painel" target="_blank" rel="noopener noreferrer">Abrir Central API</a>.</p>';
 }
 if(screen==='comercial'){
  return '<section class="panel">'+sectionHeader('CRÉDITO / COMERCIAL','Esteira de oportunidades','<span class="tag-neutral">SEM CRM CONECTADO</span>')+
   '<div class="pipeline">'+[['01','Primeira resposta','Contato e interesse'],['02','Qualificação','Aceite para simulação'],['03','Simulação','Proposta por produto'],['04','Contratação','Formalização e aceite']].map(([n,t,s])=>
   '<article class="pipeline-step"><span>'+n+'</span><h3>'+t+'</h3><p>'+s+'</p><small>Sem dados reais</small></article>').join('')+'</div>'+
   '<p class="empty">A fonte de leads e propostas ainda não está conectada. Não serão exibidas vendas ou taxas de conversão estimadas.</p></section>';
 }
 if(screen==='operacao'){
  return '<section class="panel">'+sectionHeader('ESTEIRA FINANCEIRA','Operação de ponta a ponta','<span class="tag-neutral">SEM CONECTOR OPERACIONAL</span>')+
   '<div class="flow-list">'+[['01','Recebimento','Origem, cliente, consentimento'],['02','Consulta','Margem, contratos e impedimentos'],['03','Simulação','Produto, banco, fator e prazo'],['04','Formalização','Documentos e regras'],['05','Averbação','Confirmação do convênio'],['06','Pagamento','Retorno e pós-venda']].map(([n,t,s])=>
   '<div class="flow-item"><span>'+n+'</span><div><b>'+t+'</b><small>'+s+'</small></div><em>AGUARDANDO FONTE</em></div>').join('')+'</div></section>';
 }
 return '<section class="panel">'+sectionHeader('HISTÓRICO / SESSÕES','Conversas anteriores',
  '<button class="button button-secondary" data-action="history-refresh">'+icon('refresh',16)+' Atualizar</button>')+
  '<div id="history-sessions"><p class="empty">Carregando sessões autorizadas…</p></div></section>'+
  '<section class="panel">'+sectionHeader('ENTREGAS DO HABBLAUD','Arquivos e resultados',
  '<button class="text-link" data-action="delivery-refresh">Atualizar '+icon('refresh',15)+'</button>')+
  '<div id="history-deliveries"><p class="empty">Carregando entregas…</p></div></section>';
}
