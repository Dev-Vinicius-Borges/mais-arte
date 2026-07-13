# Definition of Ready (DoR)

**Versão:** 1.0.0  
**Data:** 2026-07-13  
**Status:** Ativo  
**Responsável:** Vinícius Borges

---

## 1. Objetivo

O **Definition of Ready (DoR)** define os critérios mínimos para que uma demanda esteja pronta para entrar em desenvolvimento.

Sem DoR atendido, a tarefa **não deve** ser iniciada.

---

## 2. Regra principal

Uma Issue só pode ser movida para “Em Desenvolvimento” quando todos os critérios obrigatórios deste documento forem atendidos.

---

## 3. Escopo de aplicação

Este DoR se aplica a:

- features;
- correções de bug;
- tarefas técnicas;
- alterações de documentação com impacto relevante;
- RFCs aprovadas que viraram execução.

---

## 4. Critérios obrigatórios de prontidão

## 4.1 Contexto e objetivo claros

- [ ] O problema está descrito de forma objetiva.
- [ ] O objetivo da tarefa está explícito.
- [ ] O resultado esperado está claro.

## 4.2 Escopo delimitado

- [ ] Está definido o que entra.
- [ ] Está definido o que não entra.
- [ ] Não há ambiguidade crítica de interpretação.

## 4.3 Critérios de aceite definidos

- [ ] Existem critérios testáveis.
- [ ] Os critérios permitem validar “pronto” vs “não pronto”.
- [ ] Critérios estão alinhados ao tipo de tarefa (feature/bug/task).

## 4.4 Dependências mapeadas

- [ ] Dependências técnicas identificadas (API, banco, serviço, acesso).
- [ ] Dependências de decisão identificadas (produto, arquitetura, negócio).
- [ ] Bloqueios externos registrados.

## 4.5 Viabilidade técnica inicial

- [ ] Existe caminho técnico viável para implementação.
- [ ] Riscos relevantes foram mapeados.
- [ ] Não existe impedimento técnico conhecido sem plano de ação.

## 4.6 Governança e rastreabilidade

- [ ] Issue está no template correto.
- [ ] Labels mínimas aplicadas (`type:*`, `status:*`).
- [ ] Responsável inicial definido (quando aplicável).
- [ ] Relação com épico/módulo registrada (quando aplicável).

---

## 5. Critérios complementares por tipo de demanda

## 5.1 Feature

- [ ] Fluxo funcional principal descrito.
- [ ] Impactos em front/back/banco indicados.
- [ ] Regra de negócio associada identificada (se houver).

## 5.2 Bug

- [ ] Passos de reprodução documentados.
- [ ] Comportamento atual vs esperado registrado.
- [ ] Evidência anexada (print/log/stack trace) quando possível.
- [ ] Severidade classificada.

## 5.3 Tarefa técnica

- [ ] Objetivo técnico mensurável definido.
- [ ] Critério de conclusão técnica definido.
- [ ] Risco de impacto colateral considerado.

## 5.4 Documentação relevante

- [ ] Documento canônico alvo identificado.
- [ ] Tipo do documento definido (técnico vs acadêmico).
- [ ] Resultado esperado da atualização descrito.

---

## 6. Itens que bloqueiam início imediato

A tarefa **não está pronta** se houver qualquer item abaixo:

- ausência de critério de aceite;
- escopo genérico (“melhorar sistema”, “arrumar tela”) sem detalhamento;
- dependência crítica não mapeada;
- dúvida estrutural de arquitetura sem decisão;
- ausência de evidência mínima em bug report;
- RFC ainda não aprovada para mudanças de escopo.

---

## 7. Checklist oficial de Ready

Uma demanda está **Ready** somente quando:

- [ ] Objetivo claro
- [ ] Escopo delimitado (inclui/não inclui)
- [ ] Critérios de aceite testáveis
- [ ] Dependências mapeadas
- [ ] Viabilidade técnica inicial validada
- [ ] Riscos principais registrados
- [ ] Template correto preenchido
- [ ] Labels mínimas aplicadas
- [ ] Sem bloqueios críticos abertos

---

## 8. Responsabilidades

## 8.1 Autor da Issue

- preencher corretamente o template;
- descrever contexto, escopo e critérios de aceite;
- anexar evidências quando necessário.

## 8.2 Tech Lead (ou responsável técnico)

- validar prontidão técnica;
- identificar riscos e dependências;
- aprovar entrada em desenvolvimento.

## 8.3 Time

- sinalizar ambiguidades antes de iniciar;
- não iniciar tarefa sem status de Ready.

---

## 9. Fluxo operacional (uso prático)

1. Criar Issue no template apropriado.
2. Refinar conteúdo até cumprir os critérios do DoR.
3. Revisar checklist oficial de Ready.
4. Validar com responsável técnico.
5. Marcar Issue como pronta.
6. Só então criar branch e iniciar desenvolvimento.

---

## 10. Relação com Definition of Done (DoD)

- **DoR**: critério de entrada (pode começar?).
- **DoD**: critério de saída (pode entregar/mergear?).

Ambos são obrigatórios para manter qualidade e previsibilidade.

---

## 11. Exemplo rápido (referência)

## Exemplo ruim (não Ready)

“Criar dashboard melhor.”

Problemas:

- sem contexto;
- sem critério de aceite;
- sem escopo;
- sem dependências.

## Exemplo bom (Ready)

“Criar dashboard inicial com total de artistas, bandas, espaços e eventos cadastrados, com atualização em tempo real na abertura da página.”

Critérios de aceite:

- [ ] Exibe 4 cards com contagem correta.
- [ ] Não permite valor negativo/nulo sem fallback.
- [ ] Carregamento inicial em até X segundos no ambiente local.
- [ ] Documentação da rota/consulta atualizada.

---

## 12. Histórico de versões

| Versão | Data | Autor | Mudanças |
| -------- | ------------ | ------------------ | ---------- |
| 1.0.0 | 2026-07-13 | Vinícius Borges | Criação do Definition of Ready (DoR) oficial do projeto. |
