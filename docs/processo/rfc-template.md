# RFC Template

**Versão:** 1.0.0  
**Data:** 2026-07-19  
**Status:** Ativo  
**Responsável:** Vinícius Borges

---

## 1. Objetivo

Definir um padrão de estrutura textual para Requests for Change (RFC) no projeto, garantindo rastreabilidade, priorização e execução previsível.

> O conteúdo descritivo da RFC é definido pelo template oficial em
> `.github/ISSUE_TEMPLATE/rfc_mudanca_escopo.md`.

Abaixo será detalhado o padrão de estrutura textual para RFCs, incluindo seções obrigatórias, critérios de aceite e governança.

## 1. Identificação da RFC

| Campo | Valor |
| --- | --- |
| ID da RFC | RFC-YYYY-NNN |
| Título | |
| Autor | Vinícius Borges |
| Data de criação | YYYY-MM-DD |
| Status | Rascunho / Em revisão / Aprovada / Rejeitada / Substituída |
| Issue relacionada | # |
| PR relacionada | # |
| Documento substituído (se houver) | RFC-... |

---

## 2. Resumo executivo

Descreva em 5 a 10 linhas:

- qual problema será resolvido;
- qual mudança está sendo proposta;
- impacto esperado no projeto.

---

## 3. Contexto e problema

Detalhar:

- cenário atual;
- limitações ou dores;
- por que a abordagem atual não é suficiente;
- evidências do problema (logs, métricas, incidentes, retrabalho, etc.).

---

## 4. Objetivos

Listar objetivos mensuráveis da RFC.

Exemplos:

- reduzir tempo de build em X%;
- padronizar autenticação entre serviços;
- eliminar classe de erro recorrente;
- melhorar rastreabilidade de deploy.

---

## 5. Não objetivos

Declarar explicitamente o que **não** faz parte desta RFC para evitar expansão de escopo.

---

## 6. Proposta de solução

Descrever a solução recomendada com profundidade suficiente para decisão técnica.

Incluir:

- visão geral da abordagem;
- componentes afetados;
- mudanças em arquitetura;
- impacto em contratos (API/eventos/esquema);
- trade-offs.

Se necessário, incluir diagramas em `diagrams/` e referenciar aqui.

---

## 7. Alternativas consideradas

| Alternativa | Descrição | Prós | Contras | Motivo de descarte/aprovação |
| --- | --- | --- | --- | --- |
| A | | | | |
| B | | | | |
| C | | | | |

---

## 8. Impactos técnicos

## 8.1 Backend

Descrever impactos em serviços, regras, integrações e observabilidade.

## 8.2 Frontend

Descrever impactos em UI, fluxos, estado e contratos de consumo.

## 8.3 Banco de dados

Descrever impactos em modelo, migração, índices e compatibilidade.

## 8.4 DevOps/CI/CD

Descrever impactos em pipeline, ambientes, segredos e deploy.

## 8.5 Segurança e privacidade

Descrever riscos e controles (autenticação, autorização, dados sensíveis, auditoria).

---

## 9. Plano de implementação

Quebrar em etapas incrementais.

| Etapa | Descrição | Responsável | Dependências | Critério de conclusão |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

---

## 10. Plano de rollout

Definir como a mudança entra em produção com segurança:

- estratégia (big bang, gradual, feature flag);
- janela de execução;
- validações pós-release;
- critérios de sucesso.

---

## 11. Plano de rollback

Definir como desfazer com segurança em caso de falha:

- gatilhos de rollback;
- passos operacionais;
- impactos esperados durante reversão.

---

## 12. Riscos e mitigação

| Risco | Probabilidade | Impacto | Mitigação | Plano de contingência |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |

---

## 13. Critérios de aceite da RFC

A RFC será considerada aprovada para execução quando:

- [ ] Problema e objetivos estiverem claros
- [ ] Solução e trade-offs estiverem documentados
- [ ] Riscos e mitigação estiverem definidos
- [ ] Plano de implementação estiver viável
- [ ] Plano de rollout/rollback estiver definido
- [ ] Aprovação registrada pelos responsáveis

---

## 14. Governança e aprovações

| Papel | Nome | Decisão | Data | Comentário |
| --- | --- | --- | --- | --- |
| Autor | Vinícius Borges | | | |
| Tech Lead | | | | |
| Reviewer técnico | | | | |
| Stakeholder (se aplicável) | | | | |

---

## 15. Decisão final

- **Status final:** Aprovada / Rejeitada / Substituída
- **Resumo da decisão:**
- **Próximos passos:**

---

## 16. Relação com DoR e DoD

- A implementação derivada desta RFC só pode iniciar com DoR atendido.
- A entrega só pode ser concluída com DoD atendido.
- A RFC aprovada orienta escopo e critérios técnicos das Issues derivadas.

---

## 17. Referências

Listar links relevantes:

- Issues
- PRs
- ADRs
- Docs de arquitetura
- Métricas/painéis
- Incidentes relacionados

---

## 18. Histórico de versões

| Versão | Data | Autor | Mudanças |
| --- | --- | --- | --- |
| 1.0.0 | 2026-07-19 | Vinícius Borges | Criação do template oficial de RFC. |
