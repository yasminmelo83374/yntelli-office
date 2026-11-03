# Yntelli Office | Inventário HTTP/SSE e contratos de interação

Fonte de verdade: **`server/http/app.ts`**, handlers em `server/http/`, `server/world/http.ts`, `server/messages/http.ts`, `server/permissions/http.ts` e tipos em `shared/`. A relação de URLs ao final é extraída automaticamente da árvore de código; **uma string encontrada não prova, sozinha, que uma rota está habilitada**.

## 1. API consumida pelo frontend

| Método | Endpoint / família | Uso | Cuidado |
|---|---|---|---|
| GET | `/api/health` | status, versão, capacidades e fontes | não inventar disponibilidade |
| GET | `/api/access` | capabilities da página | gating de permissão obrigatório |
| GET | `/api/snapshot` | snapshot integral | compatibilidade do tipo `OfficeSnapshot` |
| GET (SSE) | `/api/stream` | eventos `snapshot`, `feed`, `notice` | reconexão + snapshots atômicos |
| GET | `/api/agents/:id` | detalhe de agente | validar id e respostas 404 |
| PUT/DELETE | `/api/agents/:id/character` | editar/limpar aparência | apenas quando backend autoriza |
| GET | `/api/agents/:id/terminal` | transcript de terminal | local/terminal read-only |
| GET | `/api/sessions/recent` | histórico recente | acesso controlado |
| GET | `/api/sessions/:conta/:sessionId/terminal` | terminal histórico | não executar sobre replay |
| POST | `/api/messages` | enviar mensagem | exige `canMessage` e `access.messages` |
| GET | `/api/messages/:id` | status da mensagem | fila assíncrona, timeout |
| POST | `/api/permissions/:id/decision` | aprovar/recusar/perguntas | decisão real; não autoaprovar |
| GET | `/api/permissions/:id` | detalhes do pedido | visualização autorizada |
| POST | `/api/rooms/rename` | renomear sala | local-only |
| GET | `/api/deliveries` | entregas | exige terminal/disponibilidade |
| GET | `/api/deliveries/file/:id` | anexos de entrega | acesso restrito |
| GET | `/api/stats`, `/api/stats/days` | Meu dia / métricas | fuso horário explícito |
| GET/HEAD | `/api/timeline/days`, `/api/timeline/:dia` | replay histórico | keyframe + deltas |
| GET/POST | `/api/spawn` | status e criação de novo agente | apenas capacidade autorizada |
| GET | `/api/spawn/folders` | pastas permitidas | lista do backend |
| POST | `/api/spawn/attachments` | anexos para novo agente | validação de conteúdo e limite |
| GET/POST | `/api/dictation` | status e envio de áudio | requer Whisper host disponível |
| GET | `/api/updates` | estado da versão | deriva do repositório configurado |
| POST | `/api/updates/check` | verificar release | limite de consultas |
| POST | `/api/demo` | demonstração | não executar em remote |

## 2. Rotas internas (não consumir diretamente pelo novo frontend)

| Família | Finalidade |
|---|---|
| `POST /api/codex/events` | hook Codex host -> servidor |
| `POST /api/codex/bridge/poll`, `POST /api/codex/bridge/ack` | ponte Codex no host |
| `POST /api/mod/inbox`, `POST /api/mod/inbox/ack` | plugin de mensagens Claude |
| `POST /api/permissions`, `GET /api/permissions/:id/wait` | criação/espera do hook de permissão |
| `POST /api/host/spawn/poll|ack` | fila de spawn via host |
| `POST /api/host/files/poll|ack` | entregas via host |
| `POST /api/host/dictation/poll|ack` | ditado via host |
| `/api/pty*`, `/api/agents/:id/takeover|stop` | PTY local opcional; não garantido no Docker |

Estas rotas são parte do **backend/hook**. Alterar seus nomes, payloads ou métodos quebra integrações. Não usar permissões de UI para burlar `trusted(req)` ou `isLocalOnlyPath`.

## 3. Habblaud World é integração externa separada

`server/world/http.ts` expõe uma família independente: `/api/world/status`, `register`, `verify`, `login`, `logout`, `resend`, `password/forgot`, `password/reset`, `join`, `leave`, `pause`, `resume`, `character`, `theme`, `visibility`, `devices`, `delete-account`, `delete-account/confirm`, `export`, `last-uplink`, `stream`, `cmd`, `summary/seen` e `unblock`, entre outras rotas condicionais. **Não rebatizar o serviço externo nem aceitar seus termos em nome de ninguém.**

- `client/src/net/world.ts`: ações, estado, cadastro e login do World.
- `client/src/net/world-stream.ts`: stream da cena e comandos.
- `client/src/ui/world/`: interface e permissões dessa integração.
- `shared/world/`: formatos/validações da cena.
- `server/world/`: serviço, transporte e protocolos.

## 4. Respostas e falhas a manter

- JSON de erro com status HTTP real (400, 403, 404, 405, 409, 413, 415, 429, 500, conforme contrato). `World` tem objeto de erro próprio.
- O novo frontend deve **tratar erro por status**, não por palavra solta na mensagem.
- SSE `snapshot` inclui o estado autoritativo; `feed` e `notice` são eventos independentes.
- Com desconexão, manter estado conhecido como **desatualizado**, não “online”.
- Resposta de decisão expirada/consumida não é sucesso; Codex respeita fallback ao terminal.
- POST de mensagem com status `queued` não significa que o agente a leu.
- Atributos opcionais do snapshot e APIs condicionais devem ser testados antes de exibir botões.

## 5. Registro completo de URLs encontradas no código

Gerado a partir de arquivos `*.ts` em `client/src` e `server`, excluindo testes. Contém exemplos em comentários e rotas dinâmicas; **a tabela acima e os handlers são a referência para métodos/autorizações**.

| URL ou padrão literal | Arquivos de referência |
|---|---|
| `/api/access` | `client/src/net/access.ts`, `server/http/app.ts` |
| `/api/agents` | `client/src/net/store.ts`, `client/src/ui/ptyapi.ts` (+2) |
| `/api/agents/:id` | `server/http/pty.ts`, `server/model/office.ts` |
| `/api/agents/:id/character` | `client/src/net/store.ts`, `server/http/app.ts` |
| `/api/agents/:id/stop` | `server/http/app.ts`, `server/http/pty.ts` |
| `/api/agents/:id/takeover` | `server/http/pty.ts` |
| `/api/agents/:id/terminal` | `client/src/ui/terminal.ts`, `server/config.ts` (+2) |
| `/api/codex` | `server/http/app.ts` |
| `/api/codex/bridge` | `server/http/app.ts` |
| `/api/codex/bridge/ack` | `server/http/app.ts`, `server/messages/codex.ts` (+2) |
| `/api/codex/bridge/poll` | `server/http/app.ts`, `server/messages/codex.ts` (+2) |
| `/api/codex/events` | `server/codex/http.ts`, `server/http/app.ts` (+3) |
| `/api/deliveries` | `client/src/ui/deliveries.ts`, `server/http/app.ts` |
| `/api/deliveries/file` | `client/src/ui/deliveries.ts`, `server/http/app.ts` |
| `/api/deliveries/file/:id` | `client/src/ui/deliveries.ts`, `server/http/app.ts` |
| `/api/demo` | `client/src/net/store.ts`, `server/http/app.ts` |
| `/api/dictation` | `client/src/ui/dictation.ts`, `server/dictation/dictation.ts` (+1) |
| `/api/dictation/:id` | `server/dictation/dictation.ts` |
| `/api/health` | `server/history/timeline.ts`, `server/http/app.ts` (+1) |
| `/api/host` | `server/http/app.ts` |
| `/api/host/dictation` | `server/http/app.ts` |
| `/api/host/dictation/ack` | `server/dictation/dictation.ts`, `server/http/app.ts` |
| `/api/host/dictation/poll` | `server/dictation/dictation.ts`, `server/http/app.ts` |
| `/api/host/files` | `server/http/app.ts` |
| `/api/host/files/ack` | `server/deliveries/fetcher.ts`, `server/http/app.ts` |
| `/api/host/files/poll` | `server/deliveries/fetcher.ts`, `server/http/app.ts` |
| `/api/host/spawn` | `server/http/app.ts` |
| `/api/host/spawn/ack` | `server/http/app.ts`, `server/spawn/spawn.ts` |
| `/api/host/spawn/poll` | `server/http/app.ts`, `server/spawn/spawn.ts` |
| `/api/messages` | `client/src/net/store.ts`, `client/src/ui/composer.ts` (+4) |
| `/api/messages/:id` | `client/src/net/store.ts`, `client/src/ui/composer.ts` (+2) |
| `/api/mod/inbox` | `server/http/app.ts`, `server/messages/http.ts` (+1) |
| `/api/mod/inbox/ack` | `server/http/app.ts`, `server/messages/http.ts` (+1) |
| `/api/mod/summary` | `server/http/app.ts` |
| `/api/permissions` | `client/src/net/store.ts`, `server/http/app.ts` (+3) |
| `/api/permissions/:id` | `client/src/net/store.ts`, `server/permissions/codex.ts` (+2) |
| `/api/permissions/:id/decision` | `server/permissions/http.ts`, `server/permissions/registry.ts` |
| `/api/permissions/:id/wait` | `server/permissions/http.ts`, `server/permissions/registry.ts` |
| `/api/pty` | `client/src/ui/ptyapi.ts`, `client/src/ui/ptypane.ts` (+2) |
| `/api/pty/:id/input` | `server/http/pty.ts` |
| `/api/pty/:id/stream` | `client/src/ui/ptypane.ts`, `server/http/pty.ts` (+1) |
| `/api/remote/login` | `server/http/remote.ts` |
| `/api/remote/logout` | `client/src/net/access.ts`, `server/http/remote.ts` |
| `/api/rooms/rename` | `client/src/ui/roomrename.ts`, `server/http/app.ts` |
| `/api/sessions` | `client/src/ui/terminal.ts`, `server/http/app.ts` (+2) |
| `/api/sessions/:conta/:sessionId/terminal` | `client/src/ui/terminal.ts`, `server/http/sessions.ts` (+1) |
| `/api/sessions/recent` | `client/src/ui/history.ts`, `server/http/sessions.ts` |
| `/api/snapshot` | `server/history/timeline.ts`, `server/http/app.ts` (+3) |
| `/api/spawn` | `client/src/ui/spawn.ts`, `server/http/app.ts` (+1) |
| `/api/spawn/attachments` | `client/src/ui/spawn.ts`, `server/http/app.ts` (+2) |
| `/api/spawn/folders` | `client/src/ui/spawn.ts`, `server/http/app.ts` |
| `/api/stats` | `client/src/ui/daystats-model.ts`, `client/src/ui/daystats.ts` (+2) |
| `/api/stats/days` | `client/src/ui/daystats-model.ts`, `server/http/stats.ts` |
| `/api/stats/days?tz` | `server/http/stats.ts` |
| `/api/stats?day` | `server/http/stats.ts` |
| `/api/stream` | `client/src/net/store.ts`, `server/http/app.ts` (+1) |
| `/api/timeline` | `client/src/net/timeline.ts`, `server/http/app.ts` (+1) |
| `/api/timeline/:dia` | `server/http/timeline.ts` |
| `/api/timeline/days` | `client/src/net/timeline.ts`, `server/http/timeline.ts` |
| `/api/updates` | `server/http/app.ts` |
| `/api/updates/check` | `client/src/net/store.ts`, `server/http/app.ts` |
| `/api/world` | `client/src/net/world-stream.ts`, `client/src/net/world.ts` (+5) |
| `/api/world/character` | `server/world/http.ts` |
| `/api/world/cmd` | `client/src/app.ts`, `client/src/net/world-stream.ts` (+4) |
| `/api/world/delete-account` | `client/src/net/world.ts`, `server/world/http.ts` |
| `/api/world/delete-account/confirm` | `server/world/http.ts` |
| `/api/world/devices` | `server/world/http.ts` |
| `/api/world/export` | `client/src/net/world.ts`, `client/src/ui/world/world-model.ts` (+1) |
| `/api/world/join` | `client/src/net/world.ts`, `server/world/http.ts` |
| `/api/world/last-uplink` | `client/src/net/world.ts`, `client/src/ui/world/building.ts` (+3) |
| `/api/world/leave` | `server/world/http.ts`, `server/world/settings.ts` |
| `/api/world/login` | `server/world/http.ts` |
| `/api/world/logout` | `server/world/http.ts` |
| `/api/world/password/forgot` | `server/world/http.ts` |
| `/api/world/password/reset` | `server/world/http.ts` |
| `/api/world/pause` | `client/src/net/world.ts`, `server/world/http.ts` (+1) |
| `/api/world/register` | `server/world/http.ts` |
| `/api/world/resend` | `server/world/http.ts` |
| `/api/world/resume` | `server/world/http.ts` |
| `/api/world/status` | `client/src/net/world.ts`, `client/src/ui/world/world-model.ts` (+4) |
| `/api/world/stream` | `client/src/app.ts`, `client/src/net/world-stream.ts` (+2) |
| `/api/world/summary/seen` | `client/src/net/world.ts`, `client/src/ui/world/away-summary.ts` (+1) |
| `/api/world/theme` | `client/src/net/world.ts`, `client/src/ui/world/settings-world.ts` (+2) |
| `/api/world/unblock` | `client/src/ui/world/blocked.ts`, `server/world/social.ts` |
| `/api/world/verify` | `server/world/http.ts` |
| `/api/world/visibility` | `client/src/ui/world/world-model.ts`, `server/world/http.ts` |

**Contagem:** 86 padrões literais distintos detectados nesta revisão. Não equivale a 86 endpoints documentados ou expostos.
