# Guia de Contribuição — +Arte Curitiba

Obrigado por contribuir com o +Arte Curitiba.  
Este documento define **como contribuir de forma técnica, organizada e responsável**.

> **Regra central:** neste projeto, contribuição sem processo **não é aceita**.

---

## 1) Objetivo deste guia

Padronizar a colaboração para garantir:

- qualidade técnica;
- previsibilidade de entregas;
- rastreabilidade de mudanças;
- redução de retrabalho;
- evolução sustentável do produto.

---

## 2) Pré-requisitos para contribuir

Antes de iniciar qualquer tarefa, você deve:

1. Ler o `README.md`.
2. Ler os documentos em `docs/processo/`:
   - `definition-of-ready.md`
   - `definition-of-done.md`
   - `padrao-de-commits.md`
   - `padrao-de-branches.md`
   - `politica-de-uso-de-ia.md`
3. Estar vinculado a uma **Issue** ativa.
4. Entender claramente o critério de aceite da tarefa.

Sem isso, a contribuição será recusada no review.

---

## 3) Fluxo oficial de trabalho

Toda contribuição deve seguir o fluxo:

Issue → Refinamento → Branch → Desenvolvimento → PR → Code Review → Merge

### 3.1 Abrir ou selecionar uma Issue

- Use os templates em `.github/ISSUE_TEMPLATE/`.
- Defina escopo, objetivo e critérios de aceite.
- Classifique tipo da demanda: `feature`, `bug`, `task`, `rfc`.

### 3.2 Validar se a tarefa está pronta (DoR)

Não inicie implementação sem passar no Definition of Ready.

### 3.3 Criar branch

Padrão de nomenclatura:

- `feature/<descricao-curta>`
- `fix/<descricao-curta>`
- `docs/<descricao-curta>`
- `refactor/<descricao-curta>`
- `chore/<descricao-curta>`

Exemplo:

- `feature/cadastro-evento`
- `docs/atualiza-modelo-dados`

### 3.4 Desenvolver com escopo limitado

- Faça alterações objetivas e coesas.
- Evite PRs gigantes.
- Atualize documentação impactada.

### 3.5 Commitar com padrão semântico

Siga Conventional Commits:

- `feat:`
- `fix:`
- `docs:`
- `refactor:`
- `test:`
- `chore:`

Exemplo:

- `feat(evento): criar endpoint de cadastro com validação de data`

### 3.6 Abrir Pull Request

- Use o template de PR obrigatório.
- Preencha todas as seções.
- Inclua evidências (print, gif, log, query, etc.).
- Referencie a Issue (`Closes #123`).

### 3.7 Passar por Code Review

- Toda PR precisa de aprovação.
- Ajustes solicitados devem ser resolvidos antes de merge.
- Sem aprovação, sem merge.

---

## 4) Regras de qualidade obrigatórias

Uma contribuição só é aceita quando:

- atende aos critérios de aceite da Issue;
- cumpre DoD (Definition of Done);
- está com commits semânticos;
- possui documentação coerente com a entrega;
- não quebra padrões arquiteturais do projeto;
- apresenta evidência de validação mínima.

---

## 5) Política de documentação

- Não criar arquivos duplicados com sufixos (`_final`, `_v2`, `_novo`).
- Atualizar o arquivo canônico existente.
- Registrar mudanças no histórico do próprio documento.
- Diagramas devem ficar em `diagrams/` e seus fontes versionáveis (ex.: `.drawio`) devem ser preservados.
- Textos devem ser claros, objetivos e tecnicamente defensáveis.

---

## 6) Política de uso de IA (resumo)

IA é permitida como **apoio**, não como substituição de autoria.

### Permitido

- revisão textual;
- apoio de estudo;
- sugestões pontuais.

### Proibido

- submissão de conteúdo sem entendimento;
- copiar/colar solução sem validação;
- “entrega cosmética” sem responsabilidade técnica.

### Obrigatório em PR com IA

Informar:

1. ferramenta utilizada;
2. trecho apoiado por IA;
3. ajustes humanos aplicados;
4. forma de validação executada.

Consulte: `docs/processo/politica-de-uso-de-ia.md`.

---

## 7) Mudança de escopo

Ideias fora do MVP não entram direto na sprint.

Processo:

1. abrir Issue do tipo `RFC`;
2. descrever motivação e impacto;
3. estimar esforço, risco e dependências;
4. aguardar decisão do Tech Lead + responsáveis.

Sem RFC aprovada, a ideia vai para backlog futuro.

---

## 8) Regras de conduta técnica

- Critique código e processo, não pessoas.
- Seja objetivo e respeitoso nos reviews.
- Não “empurre” tarefa incompleta para outro membro sem alinhamento.
- Quem abre PR é responsável por defender tecnicamente sua entrega.

---

## 9) Critérios de bloqueio de PR (reprovação automática)

A PR será bloqueada se houver:

- ausência de Issue vinculada;
- ausência de critério de aceite;
- ausência de evidência de teste/validação;
- quebra de padrão de commit/branch;
- conteúdo incoerente com arquitetura definida;
- conteúdo copiado sem autoria/entendimento técnico;
- falta de transparência no uso de IA.

---

## 10) Dúvidas e escalonamento

Em caso de conflito técnico ou ambiguidade de requisito:

1. registrar dúvida na própria Issue;
2. propor opção A/B com trade-offs;
3. escalar para decisão do Tech Lead;
4. registrar decisão em documentação (ou ADR, se arquitetural).

---

## 11) Checklist rápido antes de abrir PR

- [ ] Existe Issue vinculada
- [ ] Tarefa passou no DoR
- [ ] Commits seguem padrão semântico
- [ ] Documentação foi atualizada
- [ ] Evidências foram anexadas
- [ ] Critérios de aceite foram atendidos
- [ ] Uso de IA foi declarado (quando aplicável)
- [ ] PR está pronta para review

---

## 12) Histórico de versões

| Versão | Data | Autor | Mudanças |
| -------- | ------------ | ------- | ---------- |
| 1.0.0 | 2026-07-12 | Equipe +Arte | Criação do guia oficial de contribuição com fluxo, qualidade e política de IA. |
