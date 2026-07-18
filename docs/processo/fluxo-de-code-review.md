# Fluxo de Code Review

**Versão:** 1.0.0  
**Data:** 2026-07-18  
**Status:** Ativo  
**Responsável:** Vinícius Borges

---

## 1. Objetivo

Definir um fluxo claro de revisão de Pull Requests para garantir:

- qualidade técnica das entregas;
- conformidade com padrões do repositório;
- redução de bugs e regressões;
- consistência entre código, documentação e processo.

---

## 2. Princípios obrigatórios

1. Nenhuma PR é mergeada sem review.
2. Review deve avaliar conteúdo técnico, não apenas estilo.
3. Toda observação crítica deve ser tratada antes do merge.
4. Code review é etapa de qualidade, não formalidade.
5. O processo deve ser rastreável e objetivo.

---

## 3. Escopo

Este fluxo se aplica a:

- features;
- correções de bugs;
- refatorações;
- tarefas técnicas;
- documentação relevante;
- mudanças de CI/CD e infraestrutura.

---

## 4. Papéis e responsabilidades

| Papel | Responsabilidade |
| --- | --- |
| Autor da PR | Abrir PR completa, com contexto, evidências e checklist preenchido |
| Reviewer | Avaliar qualidade, riscos, critérios de aceite e conformidade |
| Code Owner | Aprovar/reprovar mudanças em áreas críticas sob sua responsabilidade |
| Tech Lead | Garantir padrão técnico, arbitrar conflitos e decidir exceções justificadas |

---

## 5. Pré-requisitos para abrir PR

Antes de solicitar review, o autor deve garantir:

- [ ] Branch no padrão oficial (`tipo/id-descricao`)
- [ ] Commits no padrão semântico
- [ ] PR vinculada à Issue (`Closes #...` quando aplicável)
- [ ] Template de PR preenchido
- [ ] Checks automáticos executados
- [ ] Escopo condizente com a proposta da Issue
- [ ] Documentação atualizada (quando houver impacto)

---

## 6. Etapas do fluxo de review

## 6.1 Abertura da PR

O autor abre PR com:

- resumo claro do que foi alterado;
- motivação da mudança;
- evidências de validação;
- riscos conhecidos;
- relação com a Issue.

## 6.2 Triagem inicial

Reviewer/Code Owner valida se a PR está revisável:

- contexto suficiente;
- escopo adequado;
- sem bloqueio estrutural óbvio.

Se não estiver revisável, devolve para ajuste inicial.

## 6.3 Revisão técnica

A revisão deve cobrir:

- corretude da solução;
- aderência à arquitetura;
- legibilidade e manutenção;
- tratamento de erros;
- impactos em segurança;
- possíveis efeitos colaterais/regressão.

## 6.4 Revisão de processo e qualidade

Conferir:

- padrão de branches/commits;
- documentação impactada;
- aderência ao DoD;
- conformidade com políticas do repositório.

## 6.5 Tratativa de comentários

Autor responde e resolve comentários:

- corrigindo código/documentação; ou
- justificando tecnicamente quando não aplicar.

Comentários críticos devem ser resolvidos antes de aprovação final.

## 6.6 Revalidação e aprovação

Após ajustes:

- reviewer revalida os pontos;
- checks devem estar verdes;
- aprovação é concedida conforme branch protection/CODEOWNERS.

## 6.7 Merge e encerramento

Com tudo aprovado:

- realizar merge conforme estratégia definida;
- confirmar fechamento da Issue;
- excluir branch de trabalho.

---

## 7. Critérios de aprovação

Uma PR está apta para aprovação quando:

- [ ] Resolve o problema proposto
- [ ] Atende critérios de aceite da Issue
- [ ] Não introduz risco crítico não mitigado
- [ ] Passa nos checks obrigatórios
- [ ] Possui documentação compatível com a mudança
- [ ] Está em conformidade com DoD
- [ ] Não há comentários críticos em aberto

---

## 8. Critérios de reprovação / bloqueio

A PR deve ser bloqueada quando houver:

- falta de contexto para revisão;
- divergência forte de escopo;
- solução tecnicamente frágil;
- ausência de validação mínima;
- risco relevante sem mitigação;
- não conformidade com padrões obrigatórios;
- check obrigatório falhando.

---

## 9. Níveis de severidade de comentários

| Nível | Significado | Ação esperada |
| --- | --- | --- |
| Crítico | Impede merge (erro funcional, segurança, quebra de regra obrigatória) | Correção obrigatória antes de aprovar |
| Alto | Risco significativo de manutenção/qualidade | Ajuste obrigatório ou justificativa técnica aceita |
| Médio | Melhoria relevante, sem bloqueio imediato | Ajustar nesta PR ou registrar débito técnico |
| Baixo | Sugestão de clareza/estilo | Ajuste opcional, a critério do autor/reviewer |

---

## 10. SLA recomendado de review

| Tipo de PR | SLA recomendado |
| --- | --- |
| Hotfix | Prioridade imediata |
| Fix | Até 1 dia útil |
| Feature pequena | Até 2 dias úteis |
| Feature/refactor maior | Até 3 dias úteis |
| Docs/processo | Até 2 dias úteis |

> SLA é referência operacional. Casos excepcionais podem ser priorizados pelo Tech Lead.

---

## 11. Boas práticas para o autor

- abrir PRs menores e objetivas;
- evitar misturar múltiplas demandas na mesma PR;
- antecipar riscos e pontos sensíveis no texto da PR;
- anexar evidências claras (prints, logs, testes);
- responder comentários com objetividade e respeito.

---

## 12. Boas práticas para reviewer

- revisar com foco em risco e qualidade real;
- evitar comentários subjetivos sem critério;
- apontar problema + motivo + sugestão;
- diferenciar bloqueio de sugestão;
- manter comunicação técnica, direta e colaborativa.

---

## 13. Relação com DoR e DoD

- DoR garante entrada qualificada da demanda.
- Code Review garante validação técnica da implementação.
- DoD garante saída com qualidade e rastreabilidade.

Os três pilares devem operar em conjunto.

---

## 14. Fluxo resumido (visão rápida)

1. Issue pronta (DoR)
2. Branch da demanda
3. Implementação + commits semânticos
4. PR com template e evidências
5. Review técnico/processual
6. Ajustes
7. Aprovação + checks verdes
8. Merge + encerramento

---

## 15. Histórico de versões

| Versão | Data | Autor | Mudanças |
| --- | --- | --- | --- |
| 1.0.0 | 2026-07-18 | Vinícius Borges | Criação do fluxo oficial de code review. |
