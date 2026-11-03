# Como contribuir com o Yntelli Office

Contribuições são bem-vindas. O projeto usa licença MIT e preserva os créditos originais em `LICENSE` e `NOTICE.md`.

1. Abra uma issue descrevendo mudança, impacto e motivação.
2. Crie uma branch isolada. Não altere rotas, hooks nem contratos do backend sem mapeamento e testes.
3. Execute `npm run typecheck`, `npm test`, `npm run i18n:check` e `npm run build` localmente ou em runner isolado autorizado.
4. Inclua testes e atualize `docs/architecture/` quando tocar estado, APIs ou UX.
5. Prepare PR com evidência e screenshots; **nenhum merge/deploy/rollback automático**.

Não publique credenciais, dados de sessões reais, `.env` ou arquivos privados. Não habilitamos GitHub Actions neste repositório.
