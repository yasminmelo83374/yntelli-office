# Yntelli Office | Evidências de homologação (03/11/2026)

Escopo: cópia de desenvolvimento. Nenhum merge, deploy, rollback ou reinício do Habblaud instalado.

| Verificação | Evidência | Situação |
|---|---|---|
| Código-base e licença | Commit de origem faa1a01, MIT, Copyright Márcio Junior | CONFIRMADO |
| Backend de runtime | Nenhum arquivo de implementação server/ alterado | CONFIRMADO (diff) |
| TypeScript | npm run typecheck, exit 0 | CONFIRMADO |
| Build cliente + servidor | npm run build, exit 0 | CONFIRMADO |
| Internacionalização | i18n:check, EN/ES/FR 2982 de 2982 textos traduzidos cada; aliases legados conservados | CONFIRMADO |
| Suíte original completa (pré-ajustes) | 158 arquivos, 1884 testes: 1878 passed, 4 failed, 2 skipped | PARCIAL, não PASS total |
| Reteste de 4 arquivos (pós-ajustes) | 72 passed, 2 failed, 1 skipped | PARCIAL |
| Testes backend original | Os mesmos dois testes falham também na base original e não alterada | CONFIRMADO como falhas herdadas no Mac |
| GitHub Actions | Workflow de CI removido da distribuição | CONFIRMADO |
| DeepSeek nativo | Provider apenas Claude/Codex | SEM_EVIDÊNCIA |
| Frontend premium final | Ainda não implementado, só identidade inicial | SEM_EVIDÊNCIA |
| Teste E2E de UI redesenhada | Não executado | SEM_EVIDÊNCIA |

## Falhas presentes também na base original

1. server/http/http.test.ts: GET /api/stream envia retry, snapshot e feed; depois as mudanças.
2. server/world/uplink.test.ts: o tema e as opções do jogador: tema trocado manda de novo; tokens só com tokensVisible.

Falham com um worker tanto no fork de trabalho quanto no clone original. Isso não permite atribuir regressão ao rebranding, mas **não autoriza declarar PASS global**. Investigar antes de qualquer release funcional.

## Limites

- Traduções antigas preservadas para backend/World; o checker indica chaves antigas sem uso, mas nenhum texto sem tradução.
- Arte e ícones herdados permanecem parcialmente no código. O design final exigirá sua substituição aprovada.
- World pertence a serviço externo, com políticas e consentimentos próprios.
- Nenhum teste de consumo de recursos ou paridade de interface nova foi realizado.
- Repo público é publicação de código, não liberação de produção.

**Gate para deploy**: frontend final aprovado, paridade com APIs e hooks, QA E2E real, verificação de segurança e autorização escrita para o SHA do lançamento.
