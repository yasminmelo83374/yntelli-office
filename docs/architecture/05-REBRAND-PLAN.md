# Yntelli Office | Rebranding sem romper compatibilidade

## Decisão de arquitetura

O produto público passa a ser **Yntelli Office**; repositório de trabalho **`yasminmelo83374/yntelli-office`**. A organização GitHub `yntelli` existe, mas a credencial conectada nesta sessão não aparece como membro autorizado, então a conta pessoal é a proprietária tecnicamente disponível. Transferência futura de propriedade deve ser deliberada.

**A marca do produto NÃO é o protocolo.** Os seguintes identificadores técnicos permanecem para compatibilidade:
- variáveis `HABBLAUD_*`, `~/.habblaud`, id/command de plugin `habblaud`, comandos `npm run mod:*`, `codex:*`, `docker:*`;
- caminhos `/api/*`, `HabblaudMessage`, IDs de SSE, contratos de sessão e nomes dos mounts;
- nome do container/rede e de LaunchAgents existentes, até existir plano de migração e recibo de homologação;
- **Habblaud World**, um serviço de terceiro separado (não rebatizar como serviço Yntelli).

O repositório deve apontar seus metadados e o mecanismo de atualização para **sua própria URL GitHub**. Nenhuma referência de marketing deve sugerir que o código é um produto oficial do autor original. O aviso MIT original em `LICENSE` permanece. A atribuição técnica está em `NOTICE.md`, sem removê-la dos históricos de autoria.

## Mapa de troca

| Arquivos | Agora | Futuro |
|---|---|---|
| `README.md`, `CONTRIBUTING.md`, metadados `package.json` | Nome, escopo, links e contribuições do projeto próprio | Documentação internacionalizada |
| `client/index.html` / `client/public/manifest.webmanifest` | Nome da aba, meta e PWA atualizados | Arte e identidade final |
| `client/src/ui/widgets.ts`, `ui/topbar.ts`, `ui/styles.css` | Wordmark de texto da Yntelli no lugar do original | Componente de marca canônico |
| `client/src/ui/version.ts` / `ui/update.ts` | Mensagens de versão com nome do produto | Painel About redesenhado |
| `mod/*/.claude-plugin/plugin.json` | Home/repo Yntelli; ID técnico original intacto | Auditoria da distribuição de plugins |
| `shared/locales/` | Traduções dos rótulos genéricos do produto, sem renomear World externo | Revisão linguística com QA |
| `server/updates/checker.ts` | **Sem mudança de código**: lê o `repository` de `package.json` | Testar release do novo repo |
| `.github/workflows/ci.yml` | Removido da distribuição inicial | Nenhum GitHub Actions sem mudança de regra |
| `client/public/assets/brand/` / `client/src/art/` | **Ativos originais temporários**; não proclamar redesign completo | Troca segura de iconografia/arte mediante design aprovado |
| `docs/architecture/*` | Novo inventário e gates | Manter atualizado após cada mudança de contrato |

## Mudanças que não devem ser feitas por substituição textual global

- Não alterar `/api/codex/events`, `/api/permissions` ou qualquer rota.
- Não renomear diretórios `mod/habblaud`, `~/.habblaud`, `shared/messages.ts` ou aliases do host.
- Não mudar `Provider` para `deepseek` sem implementar transportes, parser de eventos e testes.
- Não trocar o nome de serviços externos nos textos legais, política de privacidade, links ou fluxos de autenticação.
- Não apagar a licença e copyright de Márcio Junior.

## Pendências antes do frontend final

- Tokens, logos, tipografia, iconografia e mockups conforme o brandbook Yntelli oficial.
- Decidir se o World externo permanece visível ou como feature opt-in.
- Projetar adaptador de agentes externos (OpenClaw/DeepSeek), em projeto separado.
- Teste de atualização GitHub Releases a partir da nova origem.
- Versionamento semântico de nova UI com screenshots, QA e aprovação explícita.
