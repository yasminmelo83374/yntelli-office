# Yntelli Office

**Escritório open source para acompanhar agentes de código, sessões, tarefas, permissões e entregas.**

Distribuição Yntelli de uma base MIT existente. **Backend, contratos e hooks de compatibilidade preservados.** O frontend original está em migração para uma interface própria; o novo design completo **ainda não foi implementado**.

## O que funciona na base

- Claude Code e Codex CLI/app, múltiplas sessões e salas por projeto.
- Atualização ao vivo com SSE, status de agentes e subagentes.
- Solicitações de permissão, mensagens ao agente e fila de execução.
- Terminal de leitura, PTY local opcional, histórico, entregas e métricas.
- Desktop, mobile, idiomas, modo demonstração e World externo opcional.

**DeepSeek não é integrado nativamente**; exigirá adaptador de runtime/agentes.

## Documentação para criar o frontend

- [01 Arquitetura e limites](docs/architecture/01-ARCHITECTURE.md)
- [02 Inventário de todas as áreas de UI](docs/architecture/02-FRONTEND-FEATURES.md)
- [03 Inventário de APIs, eventos e rotas](docs/architecture/03-API-INVENTORY.md)
- [04 Gates de teste e segurança](docs/architecture/04-QUALITY-GATES.md)
- [05 Plano de identidade e compatibilidade](docs/architecture/05-REBRAND-PLAN.md)
- [06 Evidências de homologação](docs/architecture/06-VERIFICATION.md)
- [07 Índice arquivo por arquivo](docs/architecture/07-SOURCE-INDEX.md)

## Desenvolvimento (isolado)

Pré-requisitos: Node.js 22.12+, npm, Git, e Docker Engine + Compose v2 **apenas para executar o servidor containerizado**.

```bash
npm ci
npm run typecheck
npm test
npm run i18n:check
npm run build
```

`npm run docker:up` sobe o backend Docker, mas **não o execute automaticamente sobre a instalação já em uso**. Os hooks e integrações do host mantêm nomes técnicos `habblaud` por compatibilidade. Consulte a documentação de arquitetura antes de qualquer rename profundo.

Não há GitHub Actions automático. A infraestrutura do Mac e qualquer ambiente de produção são independentes deste repositório.

## Licença e atribuição

MIT. O software de base é copyright © 2026 Márcio Junior; os créditos exigidos estão preservados em [LICENSE](LICENSE) e [NOTICE.md](NOTICE.md). Yntelli Office é uma distribuição derivada, não uma alegação de autoria do código de base.
