# Padrão de Branches

**Versão:** 1.0.0  
**Data:** 2026-07-18  
**Status:** Ativo  
**Responsável:** Vinícius Borges

---

## 1. Objetivo

Definir um padrão único para criação, uso e encerramento de branches, garantindo:

- organização do fluxo de trabalho;
- rastreabilidade entre Issue, branch e PR;
- redução de conflitos e retrabalho;
- segurança da branch principal protegida.

---

## 2. Princípios obrigatórios

1. Toda alteração deve nascer de uma **Issue**.
2. Toda alteração deve ser feita em **branch própria**.
3. Toda integração deve ocorrer via **Pull Request**.
4. Não é permitido trabalho direto em branch protegida (`main`).
5. Branch deve ter nome padronizado e sem ambiguidade.

---

## 3. Branches oficiais do repositório

## 3.1 `main`

- Branch estável e protegida.
- Contém apenas entregas revisadas e aprovadas.
- Não recebe push direto.

## 3.2 `development`

- Branch de integração contínua do ciclo.
- Recebe PRs de features/fixes/tasks antes da promoção para `main`.
- Uso opcional conforme estratégia ativa do time.

---

## 4. Tipos de branch de trabalho

## 4.1 `feature/`

Para novas funcionalidades.  
Exemplo: `feature/123-cadastro-de-artista`

## 4.2 `fix/`

Para correções de bug.  
Exemplo: `fix/245-correcao-filtro-eventos`

## 4.3 `chore/`

Para tarefas técnicas, manutenção, ajustes de estrutura e pipeline.  
Exemplo: `chore/310-ajuste-ci-markdownlint`

## 4.4 `docs/`

Para alterações de documentação sem mudança funcional de código.  
Exemplo: `docs/402-definition-of-done`

## 4.5 `refactor/`

Para refatoração sem alteração de regra funcional.  
Exemplo: `refactor/518-servico-busca-eventos`

## 4.6 `hotfix/`

Para correção urgente em produção, com prioridade alta.  
Exemplo: `hotfix/601-correcao-login-producao`

---

## 5. Convenção obrigatória de nomenclatura

Formato:

`<tipo>/<id-issue>-<descricao-curta-kebab-case>`

Regras:

- `<tipo>` deve ser um dos tipos do tópico 4.
- `<id-issue>` deve ser o número da Issue no GitHub.
- `<descricao>` deve ser curta, objetiva e em `kebab-case`.
- Não usar acentos, espaços ou caracteres especiais.
- Máximo recomendado: 60 caracteres no total.

Exemplos válidos:

- `feature/123-cadastro-de-artista`
- `fix/245-correcao-filtro-eventos`
- `docs/402-padrao-de-branches`

Exemplos inválidos:

- `nova-feature-artista` (sem tipo e sem issue)
- `feature/cadastro artista` (com espaço)
- `ajuste-final-v2` (ambígua e sem rastreabilidade)

---

## 6. Fluxo padrão de trabalho com branches

1. Issue criada e refinada (Ready).
2. Criar branch a partir da branch base oficial (`main` ou `development`).
3. Implementar alterações somente nessa branch.
4. Fazer commits semânticos e frequentes.
5. Abrir PR para branch de destino.
6. Passar por review, checks e ajustes.
7. Fazer merge após aprovação.
8. Excluir branch de trabalho após merge.

---

## 7. Regras de abertura de PR (Pull Request)

- PR deve referenciar a Issue relacionada.
- Origem e destino devem ser branches diferentes.
- PR deve usar o template oficial do repositório.
- PR só pode ser mergeada com checks obrigatórios verdes.
- PR só pode ser mergeada com aprovação exigida por branch protection/CODEOWNERS.

---

## 8. Estratégia de atualização da branch de trabalho

Quando a branch ficar desatualizada em relação à base:

- Preferencial: atualizar com merge/rebase da base conforme política do repositório.
- Resolver conflitos na branch de trabalho.
- Revalidar testes/checks após atualização.

---

## 9. Regras para hotfix

1. Criar `hotfix/` com Issue vinculada.
2. PR com prioridade alta e revisão acelerada.
3. Após merge, garantir sincronização das branches de integração (`development`, se existir).
4. Registrar claramente causa, impacto e correção aplicada.

---

## 10. Proibições explícitas

- Push direto na `main`.
- Branch sem vínculo com Issue.
- Nome fora do padrão definido.
- PR sem template preenchido.
- Manter branch de trabalho aberta após merge sem justificativa.
- Reutilizar a mesma branch para múltiplas demandas não relacionadas.

---

## 11. Critérios de conformidade

Uma branch está em conformidade quando:

- [ ] Possui nome no padrão oficial
- [ ] Está vinculada a uma Issue
- [ ] Foi usada para uma única demanda
- [ ] Possui PR aberta para integração
- [ ] Passou por review/checks obrigatórios
- [ ] Foi removida após merge (quando concluída)

---

## 12. Exemplo prático (fim a fim)

Issue `#432` criada para ajustar busca de espaços culturais.

1. Criar branch: `fix/432-ajuste-busca-espacos`
2. Implementar correção
3. Commit: `fix: corrigir filtro de bairro na busca de espaços`
4. Abrir PR com `Closes #432`
5. Passar em checks/review
6. Merge
7. Excluir branch

Resultado: rastreabilidade completa entre Issue → branch → commits → PR → merge.

---

## 13. Histórico de versões

| Versão | Data | Autor | Mudanças |
| -------- | ------------ | ------------------ | ---------- |
| 1.0.0 | 2026-07-18 | Vinícius Borges | Criação do padrão oficial de branches. |
