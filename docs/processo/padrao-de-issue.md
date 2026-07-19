# Padrão de Issues

**Versão:** 1.1.0  
**Data:** 2026-07-19  
**Status:** Ativo  
**Responsável:** Vinícius Borges

---

## 1. Objetivo

Definir regras de governança para uso de Issues no projeto, garantindo
rastreabilidade, priorização e execução previsível.

> O conteúdo descritivo da Issue é definido pelos templates oficiais em
> `.github/ISSUE_TEMPLATE/`.

---

## 2. Escopo

Aplica-se a toda demanda registrada no repositório:

- bug;
- feature;
- tarefa técnica;
- documentação;
- refatoração;
- melhoria de processo.

---

## 3. Fonte oficial de estrutura

A estrutura textual de cada Issue deve seguir os templates já existentes em:

- `.github/ISSUE_TEMPLATE/`

Este documento **não substitui** nem duplica os templates.  
Ele define apenas as regras de uso e governança.

---

## 4. Regras obrigatórias de criação

Toda Issue deve:

- usar um template oficial;
- ter título objetivo e específico;
- possuir labels mínimas obrigatórias;
- ter prioridade definida;
- entrar com status inicial correto.

---

## 5. Labels obrigatórias

## 5.1 Tipo (`type:*`)

Toda Issue deve ter 1 label de tipo:

- `type:bug`
- `type:feature`
- `type:chore`
- `type:docs`
- `type:refactor`
- `type:test`

## 5.2 Prioridade (`priority:*`)

Toda Issue deve ter 1 prioridade:

- `priority:s0`
- `priority:s1`
- `priority:s2`
- `priority:s3`

Referência oficial:

- `docs/processo/acordo-de-niveis-de-prioridade.md`

## 5.3 Status (`status:*`)

Toda Issue deve ter 1 status ativo por vez:

- `status:backlog`
- `status:refino`
- `status:ready`
- `status:in-progress`
- `status:review`
- `status:done`

---

## 6. Fluxo de status

Fluxo padrão:

1. `status:backlog`
2. `status:refino`
3. `status:ready`
4. `status:in-progress`
5. `status:review`
6. `status:done`

Regras:

- não pular para `in-progress` sem `ready`;
- `done` só após PR aprovada e mergeada;
- manter apenas um `status:*` por Issue.

---

## 7. Critério de prontidão para execução

A Issue só pode ser executada quando estiver em `status:ready`, conforme
Definition of Ready.

Referência:

- `docs/processo/definition-of-ready.md`

---

## 8. Relação com branch e PR

Ao iniciar execução de uma Issue:

1. criar branch no padrão oficial;
2. abrir PR vinculada à Issue;
3. usar `Closes #<id>` quando aplicável;
4. mover status da Issue conforme evolução.

Referências:

- `docs/processo/padrao-de-branches.md`
- `docs/processo/padrao-de-commits.md`
- `docs/processo/fluxo-de-code-review.md`
- `docs/processo/definition-of-done.md`

---

## 9. Proibições explícitas

- criar Issue fora de template oficial;
- manter Issue sem labels obrigatórias;
- usar mais de um `status:*` simultâneo;
- iniciar execução sem `status:ready`;
- fechar Issue sem PR associada (quando aplicável).

---

## 10. Conformidade

Uma Issue está conforme quando:

- [ ] foi criada com template oficial;
- [ ] possui 1 label `type:*`;
- [ ] possui 1 label `priority:*`;
- [ ] possui 1 label `status:*`;
- [ ] segue fluxo de status definido;
- [ ] possui rastreabilidade com branch/PR quando executada.

---

## 11. Histórico de versões

| Versão | Data | Autor | Mudanças |
| --- | --- | --- | --- |
| 1.1.0 | 2026-07-19 | Vinícius Borges | Remoção de duplicidade com ISSUE_TEMPLATE e foco em governança. |
| 1.0.0 | 2026-07-19 | Vinícius Borges | Criação inicial do padrão de Issues. |
