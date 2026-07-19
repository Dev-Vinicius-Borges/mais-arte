# Acordo de Níveis de Prioridade

**Versão:** 1.0.0  
**Data:** 2026-07-19  
**Status:** Ativo  
**Responsável:** Vinícius Borges

---

## 1. Objetivo

Definir um padrão único de prioridade para demandas do projeto, garantindo:

- decisão rápida sobre o que executar primeiro;
- alinhamento entre impacto e urgência;
- previsibilidade de atendimento;
- comunicação objetiva com o time.

---

## 2. Escopo

Este acordo se aplica a:

- bugs;
- features;
- tarefas técnicas;
- documentação com impacto operacional;
- incidentes e correções urgentes.

---

## 3. Princípios obrigatórios

1. Prioridade é definida por **impacto + urgência**, não por preferência pessoal.
2. Toda Issue deve receber nível de prioridade no refinamento.
3. Prioridade pode ser revisada quando contexto mudar.
4. Demandas críticas interrompem fila normal quando necessário.
5. O nível de prioridade deve ser explícito em label.

---

## 4. Níveis oficiais de prioridade

| Nível | Nome | Definição |
| --- | --- | --- |
| S0 | Crítica | Falha grave, incidente ativo ou risco alto imediato para operação/dados |
| S1 | Alta | Impacto relevante no fluxo principal, sem colapso total |
| S2 | Média | Impacto moderado, com workaround viável |
| S3 | Baixa | Melhoria incremental, ajuste de baixo impacto ou otimização |

---

## 5. Critérios de classificação por nível

## 5.1 S0 — Crítica

Usar quando houver pelo menos um cenário:

- indisponibilidade total de funcionalidade central;
- falha com risco de perda/corrupção de dados;
- incidente de segurança com risco ativo;
- bloqueio total de operação sem alternativa.

### Tratamento esperado

- atuação imediata;
- criação de `hotfix/*` quando aplicável;
- comunicação rápida ao time;
- prioridade absoluta até estabilização.

## 5.2 S1 — Alta

Usar quando houver:

- degradação forte em fluxo principal;
- erro recorrente com impacto alto ao usuário;
- risco relevante de virar S0 se não tratado;
- bloqueio parcial sem solução satisfatória.

### Tratamento esperado

- entrar no próximo ciclo de execução prioritária;
- acompanhamento próximo até resolução.

## 5.3 S2 — Média

Usar quando houver:

- impacto moderado;
- workaround aceitável;
- melhoria importante, mas não crítica;
- débito técnico com retorno claro.

### Tratamento esperado

- execução planejada em sprint/ciclo regular;
- sem interrupção de demandas S0/S1.

## 5.4 S3 — Baixa

Usar quando houver:

- melhoria cosmética;
- otimização de baixo risco;
- ajuste não urgente;
- item desejável sem impacto imediato.

### Tratamento esperado

- execução oportunística;
- pode compor backlog de melhoria contínua.

---

## 6. SLA recomendado por prioridade

| Nível | Primeiro atendimento | Meta de resolução |
| --- | --- | --- |
| S0 | Imediato | O mais rápido possível no mesmo ciclo crítico |
| S1 | Até 1 dia útil | Até 3 dias úteis (dependendo do escopo) |
| S2 | Até 3 dias úteis | Planejado no ciclo vigente |
| S3 | Até 5 dias úteis | Conforme capacidade e priorização de backlog |

> Os SLAs são metas operacionais de referência e podem variar conforme complexidade e dependências externas.

---

## 7. Labels padrão obrigatórias

Toda Issue deve conter label de prioridade:

- `priority:s0`
- `priority:s1`
- `priority:s2`
- `priority:s3`

Recomendação complementar: combinar com label de tipo:

- `type:bug`
- `type:feature`
- `type:chore`
- `type:docs`
- `type:refactor`

---

## 8. Matriz rápida de decisão (impacto x urgência)

| Impacto \ Urgência | Alta urgência | Média urgência | Baixa urgência |
| --- | --- | --- | --- |
| Alto impacto | S0/S1 | S1 | S2 |
| Médio impacto | S1 | S2 | S2/S3 |
| Baixo impacto | S2 | S3 | S3 |

> Em empate de interpretação, prevalece a avaliação do Tech Lead com justificativa registrada na Issue.

---

## 9. Reclassificação de prioridade

A prioridade pode (e deve) ser atualizada quando houver:

- aumento de impacto observado;
- surgimento de incidente relacionado;
- nova dependência crítica;
- mudança de contexto de negócio/produto;
- descoberta técnica que eleve risco.

Toda reclassificação deve registrar motivo na Issue.

---

## 10. Fluxo operacional de priorização

1. Criar Issue no template correto.
2. Classificar impacto e urgência.
3. Definir prioridade inicial (S0-S3).
4. Aplicar label de prioridade.
5. Validar em refinamento com responsável técnico.
6. Ordenar execução conforme prioridade e capacidade.
7. Reavaliar prioridade durante o ciclo, se necessário.

---

## 11. Regras de execução por prioridade

1. S0 sempre tem precedência.
2. S1 entra antes de novas S2/S3.
3. S2 compõe a base do planejamento regular.
4. S3 não deve bloquear entrega essencial.
5. Hotfix S0 deve ter pós-correção com análise de causa raiz.

---

## 12. Critérios de conformidade

Uma Issue está conforme este acordo quando:

- [ ] Possui label de prioridade (S0-S3)
- [ ] Possui justificativa coerente de classificação
- [ ] Está alinhada com impacto e urgência reais
- [ ] Está ordenada corretamente no backlog/ciclo
- [ ] Reclassificações (se houver) estão registradas

---

## 13. Exemplo prático

### Exemplo 1

Problema: sistema indisponível no login de usuários.

Classificação:

- impacto: alto
- urgência: alta
- prioridade: **S0**
- ação: hotfix imediato

### Exemplo 2

Problema: filtro secundário de busca retorna ordem incorreta, com workaround manual.

Classificação:

- impacto: médio
- urgência: média
- prioridade: **S2**
- ação: sprint regular

### Exemplo 3

Problema: melhoria visual em card de evento sem impacto funcional.

Classificação:

- impacto: baixo
- urgência: baixa
- prioridade: **S3**
- ação: backlog de melhoria

---

## 14. Histórico de versões

| Versão | Data | Autor | Mudanças |
| --- | --- | --- | --- |
| 1.0.0 | 2026-07-19 | Vinícius Borges | Criação do acordo oficial de níveis de prioridade (S0-S3). |
