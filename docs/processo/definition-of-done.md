# Definition of Done (DoD)

**Versão:** 1.0.0  
**Data:** 2026-07-18  
**Status:** Ativo  
**Responsável:** Vinícius Borges

---

## 1. Objetivo

O **Definition of Done (DoD)** define os critérios obrigatórios para que uma entrega seja considerada concluída com qualidade e esteja apta para merge.

Sem DoD atendido, a tarefa **não está concluída**.

---

## 2. Regra principal

Uma Issue/PR só pode ser considerada “Done” quando todos os critérios obrigatórios deste documento forem cumpridos e validados em review.

---

## 3. Escopo de aplicação

Este DoD se aplica a:

- features;
- correções de bug;
- tarefas técnicas;
- documentação técnica;
- ajustes estruturais com impacto em código, dados ou processo.

---

## 4. Critérios obrigatórios de conclusão

## 4.1 Entrega funcional/técnica concluída

- [ ] O que foi implementado corresponde ao escopo aprovado.
- [ ] Não há itens críticos pendentes na entrega.
- [ ] A solução está coerente com a arquitetura e padrões definidos.

## 4.2 Critérios de aceite atendidos

- [ ] Todos os critérios de aceite da Issue foram cumpridos.
- [ ] Há evidência objetiva de cumprimento (print, log, teste, payload, etc.).

## 4.3 Qualidade de código e estrutura

- [ ] Código/documentação estão legíveis e consistentes.
- [ ] Não há duplicação desnecessária.
- [ ] Não foram introduzidos artefatos temporários indevidos.
- [ ] Estrutura de pastas e arquivos foi respeitada.

## 4.4 Testes e validação

- [ ] Testes aplicáveis foram executados (manuais e/ou automatizados).
- [ ] Resultado dos testes foi registrado na PR.
- [ ] Não há falha conhecida sem registro e plano de mitigação.

## 4.5 CI/CD e checks

- [ ] Workflows obrigatórios passaram com sucesso.
- [ ] Lint/validações relevantes passaram.
- [ ] Não há bloqueio de status check no PR.

## 4.6 Documentação atualizada

- [ ] Documentação impactada foi atualizada no arquivo canônico.
- [ ] Histórico de versões foi atualizado (quando aplicável).
- [ ] Mudanças técnicas relevantes foram registradas (incluindo ADR quando necessário).

## 4.7 Governança de PR

- [ ] PR aberta a partir de branch específica da tarefa.
- [ ] Template de PR preenchido corretamente.
- [ ] Issue vinculada corretamente (`Closes #...` quando aplicável).
- [ ] Review concluído conforme regra de branch protection.
- [ ] Comentários de review críticos foram resolvidos.

## 4.8 Segurança e conformidade (quando aplicável)

- [ ] Não expõe segredo/token/dado sensível.
- [ ] Permissões e regras de acesso foram respeitadas.
- [ ] Mudanças com impacto de segurança foram explicitadas.

## 4.9 Uso de IA (quando aplicável)

- [ ] Uso de IA foi declarado na PR conforme política do projeto.
- [ ] Trechos apoiados por IA foram revisados e validados tecnicamente por humano responsável.

---

## 5. Critérios complementares por tipo de demanda

## 5.1 Feature

- [ ] Fluxo principal funciona de ponta a ponta.
- [ ] Casos de erro esperados foram tratados.
- [ ] Impacto em UX/UI foi validado (quando aplicável).

## 5.2 Bug

- [ ] Cenário reportado deixou de falhar.
- [ ] Correção não gerou regressão aparente.
- [ ] Evidência de antes/depois foi anexada.

## 5.3 Tarefa técnica

- [ ] Objetivo técnico mensurável foi alcançado.
- [ ] Resultado técnico foi demonstrado (log, métrica, diff, relatório).
- [ ] Impactos colaterais foram verificados.

## 5.4 Documentação técnica

- [ ] Documento atualizado segue padrão documental vigente.
- [ ] Conteúdo está consistente com o estado atual do projeto.
- [ ] Não houve criação de arquivos duplicados de versão (`_v2`, `_final`, etc.).

---

## 6. Itens que bloqueiam conclusão

A entrega **não pode** ser marcada como Done se houver:

- critério de aceite não atendido;
- ausência de evidência mínima de validação;
- PR sem review obrigatório;
- checks obrigatórios falhando;
- documentação impactada não atualizada;
- mudança relevante sem rastreabilidade (Issue/PR/ADR);
- uso de IA não declarado quando aplicável.

---

## 7. Checklist oficial de Done

Uma entrega está **Done** somente quando:

- [ ] Escopo aprovado foi entregue
- [ ] Critérios de aceite atendidos
- [ ] Evidências anexadas na PR
- [ ] Testes/validações executados
- [ ] Checks obrigatórios aprovados
- [ ] Documentação atualizada
- [ ] Review concluído e sem pendências críticas
- [ ] Issue vinculada e rastreável
- [ ] Política de IA cumprida (quando aplicável)

---

## 8. Responsabilidades

## 8.1 Autor da entrega

- garantir cumprimento do DoD;
- anexar evidências e contexto técnico na PR;
- corrigir pendências apontadas em review;
- manter rastreabilidade da entrega.

## 8.2 Reviewer / Code Owner

- validar critérios de aceite e qualidade;
- reprovar PR incompleta ou sem evidência;
- garantir aderência a arquitetura, segurança e processo.

## 8.3 Tech Lead

- arbitrar exceções justificadas;
- preservar padrão de qualidade e previsibilidade;
- impedir merge de entregas fora do DoD.

---

## 9. Fluxo operacional (uso prático)

1. Finalizar implementação conforme escopo aprovado.
2. Executar testes/validações e coletar evidências.
3. Atualizar documentação impactada.
4. Preencher template de PR completamente.
5. Abrir PR vinculada à Issue.
6. Passar por review e resolver pendências.
7. Validar checklist do DoD.
8. Merge somente após aprovação e checks verdes.

---

## 10. Relação com Definition of Ready (DoR)

- **DoR**: garante que a tarefa pode começar.
- **DoD**: garante que a tarefa pode terminar com qualidade.

O processo só é saudável quando **ambos** são respeitados.

---

## 11. Exemplo rápido (referência)

## Exemplo não Done

- Funcionalidade implementada, porém:
  - sem evidência;
  - sem atualização de documentação;
  - PR sem review final;
  - check de lint quebrado.

Resultado: **não pode fazer merge**.

## Exemplo Done

- Escopo entregue;
- critérios de aceite marcados e validados;
- evidências anexadas;
- docs atualizadas;
- checks aprovados;
- review concluído.

Resultado: **apta para merge**.

---

## 12. Histórico de versões

| Versão | Data | Autor | Mudanças |
| -------- | ------ | ------- | ---------- |
| 1.0.0 | 2026-07-18 | Vinícius Borges | Criação do Definition of Done (DoD) oficial do projeto. |
