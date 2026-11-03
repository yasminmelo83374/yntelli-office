# Yntelli Office | Frontend realista V1

Novo caminho /office.html, separado do Habblaud clássico em /. Sem substituição do backend.

Brandbook v3 CredTech: Instrument Sans, Syne, JetBrains Mono, fundo #06060a, superfícies #0d0d14 e lime #D6FF3F.

Three.js carregado sob demanda: seis setores (Atendimento, Margens, Comercial, Operações, Central API, Engenharia), objetos de escritório e consignado, personagens baseados em sessões reais Claude/Codex e estados de atividade. Fallback arquitetônico leve sem WebGL no headless, reduced-motion e dispositivos de baixa memória.

Módulos: Visão geral, Escritório, Agentes/Codex, Margens, Comercial, Operações, Central API, Histórico e entregas.

Dados reais: OfficeStore original com SSE; mensagens, solicitações e histórico usam APIs do Habblaud e /api/access. Nenhuma aprovação automática.

Central API: validação matemática de CPF no cliente e health check planejado via GET /api/office/central/health. Nenhum conector backend operacional ou consulta financeira executada. O formulário nunca transmite CPF ao banco.

Limitações: ainda falta validação visual 3D em GPU física real; o teste Chrome headless usa planta leve. Sem homologação E2E completa nem deploy.

Execução de desenvolvimento isolada: npm ci; npm run dev:client -- --host 127.0.0.1 --port 5777; abrir /office.html?mock=1. No Vite o proxy /api pode falar com localhost:4747, não altera produção.

MIT e direitos autorais originais preservados. Sem GitHub Actions.


## QA realizado nesta branch

- npm run typecheck: PASS.
- npm run build: PASS, separando cena 3D em chunk lazy.
- npm test com central.test, store.test, access.test e permission.test: 37/37 PASS.
- Chrome headless renderizou desktop e layout mobile com fallback de renderização.
- Chrome DevTools Protocol Emulation.setDeviceMetricsOverride 390×844: innerWidth=390, document.scrollWidth=390, stageWidth=358.
- Aceleração WebGL física real e integração financeira/consentimento E2E: NÃO HOMOLOGADAS.
- Backend em ~/habblaud permanece com status Git limpo e GET /api/health = 200.

A suíte completa da base já teve dois testes de backend com falha herdada (HTTP SSE e uplink World) também no clone original. Não declarar PASS geral sem resolver.
