# Yntelli Office | Plano de homologação do novo frontend

**Status da implantação atual:** intocada. Esta entrega cria inventário e uma identidade de bootstrap no código preparado, sem deploy ou merge. **Nenhum PASS de homologação é presumido.**

## Gate 0: ambiente
- Branch/repositório separado, sem credenciais de usuário e sem `.env` real.
- Dependências travadas em `package-lock.json`; teste manual com `npm ci`.
- **GitHub Actions não utilizado** (workflow removido da cópia inicial).
- Build e testes em ambiente isolado, nunca no runtime Docker que monitora sessões ativas.

## Gate 1: contrato
- `npm run typecheck`, `npm test`, `npm run i18n:check`, `npm run build`.
- `GET /api/health` e `GET /api/access`: capacidade real; comparar com snapshot.
- `GET /api/stream`: sequência inicial, SSE reconnection, atraso e atualização, sem duplicar eventos.
- Todos os estados `AgentStatus`, `Provider`, `OutboxStatus`, `PermissionDecision`, `AccessInfo`.
- Dados sem opções do World ou sem PTY também devem renderizar corretamente.

## Gate 2: UX operacional
- Desktop amplo, laptop e mobile; teclado e foco/aria, rolagem, alto contraste, reduced-motion.
- Iniciar sem sessões, 1 agente, muitas salas, muitos subagentes, shells em espera e offline.
- Com 3+ projetos, não perder contexto da sala quando trocar de agente.
- Chat: envio, fila, sucesso, erro, timeout, simultaneidade; nunca alegar envio sem recibo.
- Permissões: permitir, negar, responder no terminal, conflito, expiração e fallback Codex de 25 s.
- Terminal leitura e histórico, diff, comandos, anexos e sessões encerradas.
- Timelapse não permite acionar ações de produção; ao sair retorna ao snapshot live.
- Configurações persistem e podem ser redefinidas; modo mock não toca agentes reais.

## Gate 3: compatibilidade real
- Claude Code: mod e plugins funcionais, permissões e mensagens, 5 h/semanal se disponíveis.
- Codex: 9/9 hooks instalados **e aprovados pelo usuário** em `/hooks`, eventos, pedidos e bridge conectada.
- World: conexão opt-in, autenticação, controles de privacidade e sem assumir marca/serviço externo.
- Em Docker: `terminal=true` não implica PTY interativo. Testar essa diferença.
- Sem alterações nas rotas/schemas de `server/` e no handshake das integrações.
- Comparar snapshots e eventos da UI nova com a antiga para mesmas fixtures e uma sessão real autorizada.

## Gate 4: segurança e recursos
- Nenhum segredo, CPF, credencial, arquivo privado, `auth.json` ou log local publicado.
- Nenhuma aprovação de hooks feita por automação.
- Nenhum envio externo de mensagens/arquivos sem ação explícita do usuário.
- Profiling de CPU/memória, FPS/renderizações e consumo de disco, especialmente Mac.
- Contratos e guards remotos/local-only inalterados.
- Canário em instância separada, nunca sobre produção sem autorização de deploy.

## Como marcar a evidência
- **CONFIRMADO:** comando executado com exit code, fixture/fonte e recibo.
- **PROVÁVEL_CORRELAÇÃO:** resultado indireto, sem prova de fluxo E2E.
- **SEM_EVIDÊNCIA:** não executado/medido.
- **BLOQUEADO:** faltam ambiente, acesso, evento, confirmação ou autorização.

## Gate de publicação
Não fazer merge, deploy, rollback nem alterar ambiente operacional sem autorização escrita, escopo, SHA e retorno de QA. Criar repositório/branch de desenvolvimento não é deploy.
