# Padrão de Commits

**Versão:** 1.0.0  
**Data:** 2026-07-18  
**Status:** Ativo  
**Responsável:** Vinícius Borges

---

## 1. Objetivo

Definir um padrão único de mensagens de commit para garantir:

- histórico legível e rastreável;
- facilidade de auditoria e revisão;
- clareza sobre intenção de cada alteração;
- integração consistente com branches, PRs e Issues.

---

## 2. Princípios obrigatórios

1. Todo commit deve descrever **intenção real da mudança**.
2. Commits devem ser **pequenos e atômicos** (uma mudança lógica por commit).
3. Mensagens devem seguir padrão semântico.
4. Evitar commits genéricos como “ajustes”, “update”, “final”.
5. Commits devem ser feitos na branch da demanda correspondente.

---

## 3. Formato oficial

Formato obrigatório:

`<tipo>: <descrição curta no infinitivo>`

Exemplos:
- `feat: adicionar filtro por categoria de evento`
- `fix: corrigir validação de e-mail no cadastro`
- `docs: atualizar definition of done`
- `chore: ajustar workflow de markdown lint`

---

## 4. Tipos de commit permitidos

## 4.1 `feat`
Nova funcionalidade.

## 4.2 `fix`
Correção de bug.

## 4.3 `docs`
Alteração de documentação (sem impacto funcional direto).

## 4.4 `refactor`
Refatoração sem mudança de regra funcional.

## 4.5 `test`
Criação/ajuste de testes.

## 4.6 `chore`
Tarefa técnica, manutenção, tooling, pipeline, configuração.

## 4.7 `perf`
Melhoria de performance.

## 4.8 `build`
Mudanças de build, dependências, empacotamento.

## 4.9 `ci`
Mudanças específicas de CI/CD.

---

## 5. Regras de escrita da mensagem

1. Usar letra minúscula no tipo (`feat`, não `FEAT`).
2. Após o tipo, usar `:` e espaço.
3. Descrição curta, objetiva e específica.
4. Preferir verbo no infinitivo (`adicionar`, `corrigir`, `atualizar`).
5. Não terminar com ponto final.
6. Máximo recomendado da linha: 72 caracteres.
7. Evitar siglas não conhecidas pelo time.

---

## 6. Exemplos válidos e inválidos

## Válidos
- `feat: adicionar listagem de artistas por bairro`
- `fix: corrigir paginação da busca de eventos`
- `docs: atualizar padrao de branches`
- `ci: adicionar workflow de validacao estrutural`

## Inválidos
- `update`
- `ajustes finais`
- `feat adicionado tela` (sem `:`)
- `correções` (sem tipo)
- `WIP`
- `final_final_agora_vai`

---

## 7. Commits atômicos (regra prática)

Um commit deve representar **uma unidade lógica de alteração**.

### Bom exemplo
1. `feat: adicionar endpoint de cadastro de artista`
2. `test: criar testes do endpoint de cadastro de artista`
3. `docs: documentar endpoint de cadastro de artista`

### Mau exemplo
- `feat: mexer em cadastro, eventos, deploy, docs e testes`

---

## 8. Relação entre commit, branch e issue

- Branch deve seguir padrão definido em `padrao-de-branches.md`.
- Commit deve ser coerente com o objetivo da branch.
- PR deve consolidar os commits da mesma demanda.
- Issue relacionada deve estar vinculada na PR (`Closes #...`).

---

## 9. Commits para documentação acadêmica vs técnica

## 9.1 Documentação técnica (.md e processo)
Usar `docs:` normalmente.

Exemplos:
- `docs: criar definition of ready`
- `docs: atualizar padrao de documentacao`

## 9.2 Entregáveis acadêmicos (ABNT)
Quando versionados no repositório, também usar `docs:`, mas com descrição contextual clara.

Exemplo:
- `docs: atualizar relatorio parcial com secao de metodologia`

---

## 10. Política para squash/rebase/merge

- Preferencial: manter histórico limpo e legível.
- Se houver muitos commits intermediários ruins (“wip”), usar squash antes do merge.
- Mensagem final do squash deve respeitar o padrão semântico.
- Nunca manter commits com mensagens genéricas no histórico principal.

---

## 11. Critérios de conformidade

Um commit está conforme quando:

- [ ] Usa tipo permitido
- [ ] Respeita formato `<tipo>: <descrição>`
- [ ] Mensagem é específica e objetiva
- [ ] Está coerente com branch e demanda
- [ ] Não é genérico nem ambíguo

---

## 12. Exemplo prático (fim a fim)

Issue `#455`: corrigir filtro de data de eventos.

Branch:
`fix/455-correcao-filtro-data-eventos`

Commits:
1. `fix: corrigir comparacao de data no filtro de eventos`
2. `test: adicionar cobertura para filtro de data invalida`
3. `docs: atualizar comportamento do filtro de data`

PR:
`Closes #455`

Resultado: rastreabilidade completa e histórico claro.

---

## 13. Histórico de versões

| Versão | Data | Autor | Mudanças |
| -------- | ------------ | ------------------ | ---------- |
| 1.0.0 | 2026-07-18 | Vinícius Borges | Criação do padrão oficial de commits. |
