# Yntelli Office | Mapeamento da arquitetura

**Base auditada:** versão 1.0.3, commit de origem `faa1a01` (03/11/2026).
**Natureza:** aplicação open source derivada de software MIT. Veja `LICENSE` e `NOTICE.md`.
**Objetivo:** substituir a experiência visual e preservar o contrato existente do backend, hooks e agentes. Esta documentação é o mapa de implementação, não comprovação de paridade do futuro frontend.

## 1. Arquitetura real

```text
Claude Code + plugin/hook ----> arquivos e eventos do host ----┐
Codex CLI/app + 9 hooks ------> arquivos e eventos do host -----┤
Codex bridge (LaunchAgent) ---> POST local de eventos/mensagens -┤
                                                                v
                                                     server/ (Node + TS)
                                                   fonte / office / APIs
                                                        /     |    \
                                             shared/types   SSE   histórico
                                                        \     |    /
                                                    client/net/store
                                                             |
                                      client/ui (painéis DOM) + client/world (Canvas)
                                                             |
                                                       navegador local
```

- **`client/index.html`**: HTML, metadata, PWA e elementos `#world` e `#ui`.
- **`client/src/main.ts`**: seleção do idioma, importação dinâmica e boot.
- **`client/src/app.ts`**: inicializa `OfficeStore`, mundo 2D, cena de cidade e UI; conecta dados após `/api/access`.
- **`client/src/net/store.ts`**: store reativa com SSE, reconexão, snapshots, feeds, avisos, envio de mensagens, decisões e edição de personagem.
- **`client/src/ui/index.ts`**: composição incremental das janelas e overlays; usa `UiContext`, `requestAnimationFrame`, relógios de 1 s e 5 s. Layout estreito a partir de 900 px.
- **`client/src/world/`**: renderização do escritório em Canvas, câmera, pathfinding, layouts, efeitos, interação, som e cidade opcional.
- **`client/src/art/`**: arte, personagens, superfícies, ícones; **`client/src/audio/`**: Web Audio/sinais.
- **`server/http/`**: API HTTP, SSE, guardas locais, sessões, estatísticas, terminal, PTY, timeline e acesso remoto.
- **`server/sources/`**: descoberta de sessões, watchers de arquivos, histórico, Codex e Claude, shell/subagentes.
- **`server/model/`**: estado do escritório, salas, aliases e nomes.
- **`server/messages/`**: fila de mensagens Claude/Codex e ponte Codex host.
- **`server/permissions/`**: registro, espera e decisão de solicitações de permissão.
- **`server/pty/`**: terminal interativo local, opcional; desativado no atual Docker.
- **`server/history/`**: métricas de dias e timeline; **`server/deliveries/`**: entregas e anexos.
- **`server/spawn/`**: lançamento de novos agentes; **`server/dictation/`**: ditado local opcional.
- **`server/world/`**: serviço externo opcional de cidade/social; **não confundir com backend local de agentes**.
- **`shared/`**: fonte canônica dos contratos de dados, i18n e utilitários comuns.
- **`mod/`**: IDs e eventos de hooks Claude/Codex; **`scripts/`**: instalação, Docker, bridge e ferramentas.
- **`Dockerfile` / `docker-compose.yml`**: compilação Node e execução do servidor no container, com mounts de sessões em leitura.

## 2. Contratos canônicos

| Fonte | Contratos principais | Uso pelo novo frontend |
|---|---|---|
| `shared/types.ts` | `OfficeSnapshot`, `AgentInfo`, `RoomInfo`, `AccountInfo`, `AgentStatus`, `FeedItem`, `Notice`, `AccessInfo` | Estado do dashboard e permissões |
| `shared/types.ts` | `ServerMessage` (`snapshot`, `feed`, `notice`), `AgentDetail` | Atualizações ao vivo e detalhes |
| `shared/types.ts` | `PermissionRequestInfo`, `PermissionDecision`, `OutboxMessage` | Aprovar/recusar e enviar mensagens |
| `shared/types.ts` | `TerminalEntry`, `TerminalMessage`, `RecentSession`, `DeliveryInfo` | Terminal, histórico e entregas |
| `shared/timeline.ts` | keyframe/delta/end, histórico reconstituído | Replay e linha do tempo |
| `shared/daystats.ts` | métricas por dia, sala e agente | Meu dia |
| `shared/world/api.ts` / `shared/world/protocol.ts` | contratos de World | Mundo opcional |
| `shared/i18n.ts` / `shared/locales/` | PT, EN, ES, FR | Localização; preservar dicionários |

`Provider` é **somente** `'claude' | 'codex'` no contrato atual. DeepSeek/funcionários OpenClaw precisam de **adaptador próprio**, não devem ser exibidos como integração já suportada. O adaptador exige extensão versionada do contrato e implementação correspondente de ingestão; não faz parte deste bootstrap.

## 3. Modelo ao vivo

1. `GET /api/access`: restrições de acesso da página.
2. `GET /api/stream` com `EventSource`: envio inicial de `snapshot` completo e `feed` recente, depois eventos `snapshot`, `feed` e `notice`.
3. Snapshots são enviados com throttle de aproximadamente **200 ms**, e o servidor envia keepalive a cada **15 s** (`server/http/sse.ts`).
4. `OfficeSnapshot` contém `rev`, `serverTime`, `rooms[]`, `agents[]`, `accounts[]` e `meta`; opcionalmente `ptys[]`.
5. A UI reconcilia mudanças em um frame; relógios são derivados localmente e não exigem nova requisição por segundo.
6. O store reconecta após perda de SSE; há modo demonstração `?mock=1`.

**Recomendação para substituição visual:** manter o `OfficeStore` e os tipos `shared/*` como camada de compatibilidade inicial. Criar um novo `client/src/ui-next/` ou app independente consumindo os mesmos dados e endpoints. Evitar refazer a lógica de sessões, mensagens, autorização e timer.

## 4. Travas e segurança que não podem desaparecer

- O servidor limita ações por **origem, host, localização (loopback) e permissões**; não habilitar funcionalidades alterando só a UI.
- `GET /api/access` governa os controles. O frontend deve refletir permissões, mas **não é fonte de autorização**.
- No Docker atual, `meta.terminal=true` pode significar **terminal de leitura**; PTY interativo é separado e pode estar indisponível.
- `PermissionRequest` Codex respeita aceite prévio em `/hooks`, espera máxima configurada e fallback ao terminal. Não criar um botão de “autoaprovar”.
- A ponte Codex é um processo **do host**; o Docker isolado não executa o Codex automaticamente.
- Os mounts das contas são parciais e em leitura; credenciais e arquivos de configuração ficam no host.
- `server/world/` se comunica com um serviço externo independente. Nomear e sinalizar como integração de terceiro; não apropriar identidade, termos, políticas ou contas externas.
- `HABBLAUD_*`, nomes dos módulos, endpoints e IDs de plugin são **contratos técnicos legados**. Mantê-los até existir migração com testes.
- Em desenvolvimento, **não habilitar CI por GitHub Actions**. Rodar testes manualmente ou em runner isolado autorizado.
- Não copiar `.env`, tokens, credenciais ou dados de sessões da instalação pessoal para o repositório público.

## 5. Escopo exato de “manter o backend”

**Preservar sem mudança de comportamento:** `server/`, `shared/` (até extensão planejada de providers), hooks do `mod/`, contratos de rede, nomes de eventos, guards, leitura dos dados, modelos e formatos de erro. Mudanças de nome de pacote/metadados não podem renomear rotas ou eventos.

**Substituir gradualmente:** HTML, PWA, marca, tokens CSS, componentes de `client/src/ui`, artes/ícones e, se escolhido, o renderer `client/src/world`. Cada interação exige paridade funcional antes de remover seu componente antigo.

**Fora do escopo desta entrega:** nova interface final, integrações DeepSeek, migração da execução do servidor para nuvem, deploy, alteração de produção.

Veja `02-FRONTEND-FEATURES.md`, `03-API-INVENTORY.md` e `04-QUALITY-GATES.md`.
