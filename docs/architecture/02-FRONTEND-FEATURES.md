# Yntelli Office | Inventário funcional do frontend

Esta matriz é o backlog de paridade. **Não é uma lista de telas já redesenhadas.**
Fonte: `client/src/ui/`, `client/src/net/`, `client/src/world/`, `shared/types.ts`, `server/http/`.

| Área | Arquivos de origem | Função e interações a preservar |
|---|---|---|
| Boot e idiomas | `main.ts`, `app.ts`, `shared/i18n.ts` | PT/EN/ES/FR, fallback de idioma, erro de rede, mock |
| Topbar e conexão | `ui/topbar.ts`, `ui/overlays.ts`, `ui/version.ts` | servidor online/offline, versão, atualização, indicadores, ações rápidas |
| Lista/salas | `ui/sidebar.ts`, `ui/rows.ts`, `ui/roomorder.ts` | busca, filtros, grupos por projeto, ordenação, seleções |
| Canvas e câmera | `world/index.ts`, `world/camera.ts`, `world/input.ts` | sala por projeto, agentes, posição, pan, zoom, foco e modo geral |
| Detalhes | `ui/drawer.ts`, `ui/model.ts` | agente, status, papel, atividade, tarefas, subagentes e ações |
| Feed e notificações | `ui/feed.ts`, `ui/notify.ts`, `ui/toasts.ts` | eventos recentes, atualização incremental, badges e alertas |
| Permissões | `ui/permission.ts`, `ui/widgets.ts` | aprovar, recusar, responder no terminal, expiração e erros |
| Mensagens | `ui/composer.ts`, `ui/composer-model.ts` | escolher agente, compor, enviar, fila, estados de entrega e timeout |
| Terminal leitura | `ui/terminal.ts`, `ui/termactions.ts` | transcript, comandos, diff, entrada JSON, scroll, histórico |
| PTY interativo | `ui/pty.ts`, `ui/ptypane.ts`, `ui/ptyapi.ts` | apenas quando habilitado pelo backend: abrir/assumir/escrever/fechar |
| Histórico | `ui/history.ts`, `ui/termtabs.ts` | sessões anteriores, seleção e reabertura autorizada |
| Entregas | `ui/deliveries.ts` | lista, detalhe, anexos e download de arquivos autorizados |
| Meu dia | `ui/daystats.ts`, `ui/daystats-model.ts` | métricas por conta/projeto/horário, filtros e gráficos |
| Timelapse | `ui/timelapse.ts`, `net/timeline.ts` | replay, play/pause, velocidade, sair do replay e restabelecer live |
| Novo agente | `ui/spawn.ts`, `ui/pty.ts` | escolher pasta, conta, tipo de execução e validar disponibilidade |
| Personalização | `ui/character-editor.ts`, `ui/appearance-fields.ts` | personagem/aparência, salvar, desfazer, restrições de edição |
| Configurações | `ui/settings.ts`, `ui/prefs.ts` | idioma, som, painéis, demo, preferências salvas e ajuda |
| Som | `ui/sound.ts`, `audio/` | notificações silenciáveis, acessibilidade, sem reprodução involuntária |
| World opcional | `ui/world/`, `world/city/`, `net/world*.ts` | conta externa, cidade, prédios, visibilidade, privacidade e social |
| Responsivo | `ui/styles.css`, `ui/viewport.ts` | desktop/mobile, gavetas, regiões de toque, espaço livre do canvas |
| Acessibilidade | `ui/dom.ts`, `ui/help.ts`, `ui/overlays.ts` | teclado, foco, aria-live, labels, reduced-motion e estados vazios |
| Mock/demo | `net/store.ts`, `shared/demo/` | `?mock=1` para testar sem sessões reais |

## Estados e entidades de interface

- **Agente:** `main | sub`; status `working | waiting | idle | shell | done | offline`. Não tratar `waiting` como erro automático.
- **Provider:** Claude ou Codex, com marca visual distinta e sem inferir DeepSeek.
- **Mensagens:** `queued | sent | delivered | failed`; exibir estados reais, sem otimização fictícia.
- **Permissão:** pendente/decidida/expirada, motivo de recusa, fallback ao terminal e limitações específicas do Codex.
- **Conexão:** carregando, aberta, instável, reconectando, encerrada, mock.
- **Replay:** dados do histórico não devem habilitar ações em agentes atuais.
- **Acesso:** local vs remoto; ações escondidas/desabilitadas conforme `/api/access`.
- **World:** indisponível, desconectado, registro/login, conectado, pausado e estados de erro externos.

## Direção da futura UI canônica

- Organização por **hierarquia**: situação geral -> ações urgentes -> projetos -> agentes -> detalhe contextual.
- Mobile: lista funcional como navegação primária; nenhum painel permanente bloqueando o conteúdo principal.
- Desktop: painel de projetos + área de agentes + drawer contextual; terminal e histórico em camadas separadas.
- Badges de autorização e erros devem ter significado real, nunca exclusivamente decorativo.
- Preservar a possibilidade de mundo visual, mas não tornar Canvas obrigatório para operar mensagens e aprovações.
- Aplicar identidade Yntelli/brandbook na próxima etapa; **não reutilizar automaticamente o logotipo e as artes do projeto de origem**.
- Evitar duplicar requisições: uma conexão SSE central, caches compartilhados e renderização incremental.

## Entregáveis visuais futuros

1. Wireframe desktop e mobile baseado na matriz acima.
2. Tokens de design canônicos e biblioteca de componentes.
3. Novo shell de navegação (sem alterar rotas do backend).
4. Adapters para store, actions e controles de acesso.
5. Paridade funcional, teste por teclado e mobile, regressão com Claude/Codex.
6. Migração visual progressiva, com rollback **preparado**, mas não executado sem autorização.
