# Acordo de Branches Protegidas

**Versão:** 1.0.0  
**Data:** 2026-07-19  
**Status:** Ativo  
**Responsável:** Vinícius Borges

---

## 1. Objetivo

Definir regras de proteção de branches para preservar estabilidade, qualidade e rastreabilidade das entregas.

Este acordo estabelece quais branches são protegidas, quais regras de merge são obrigatórias e como tratar exceções.

---

## 2. Escopo

Aplica-se a todo o repositório e a todos os colaboradores com permissão de escrita/merge.

Inclui:

- branches principais de integração e release;
- PRs abertas contra branches protegidas;
- workflows e status checks obrigatórios;
- regras de aprovação e governança de merge.

---

## 3. Branches protegidas oficiais

## 3.1 `main` (obrigatória)

Branch estável e oficial do projeto.

Proteções mínimas obrigatórias:

- bloquear push direto;
- exigir Pull Request para merge;
- exigir aprovação de review;
- exigir status checks obrigatórios;
- impedir merge com conversa não resolvida.

## 3.2 `develop` (quando existir)

Branch de integração contínua.

Proteções recomendadas:

- bloquear push direto;
- exigir Pull Request;
- exigir checks obrigatórios;
- exigir ao menos uma aprovação.

> Caso o repositório não utilize `develop`, todas as integrações ocorrem diretamente via PR para `main`.

---

## 4. Regras obrigatórias para merge em branch protegida

Uma PR só pode ser mergeada quando:

- [ ] origem e destino são branches diferentes;
- [ ] PR está vinculada à Issue (quando aplicável);
- [ ] template de PR foi preenchido;
- [ ] checks obrigatórios estão verdes;
- [ ] reviews obrigatórios foram aprovados;
- [ ] comentários críticos foram resolvidos;
- [ ] não há conflito pendente.

---

## 5. Status checks obrigatórios

Os checks obrigatórios devem refletir a stack do repositório e incluir no mínimo:

- validação de build (quando aplicável);
- lint/qualidade estática;
- testes automatizados principais;
- validações de segurança obrigatórias (quando configuradas).

Se um check obrigatório falhar, o merge é bloqueado.

---

## 6. Aprovações e revisão

Padrão mínimo recomendado:

- pelo menos 1 aprovação para PR comum;
- revisão obrigatória de Code Owner em áreas críticas;
- autor da PR não pode autoaprovar para cumprir regra mínima;
- novo commit relevante após aprovação pode exigir nova revisão (conforme configuração do repositório).

---

## 7. Estratégia de merge permitida

Estratégia padrão recomendada:

- `Squash and merge` para manter histórico principal limpo.

Também pode ser permitido, conforme decisão do projeto:

- `Merge commit` para preservar histórico completo da branch;
- `Rebase and merge` quando houver política explícita para histórico linear.

A estratégia ativa deve ser única e conhecida pelo time.

---

## 8. Hotfix em branch protegida

Para incidentes críticos:

1. criar branch `hotfix/*` vinculada a Issue;
2. abrir PR com prioridade máxima;
3. executar review acelerado com responsável técnico;
4. manter checks mínimos obrigatórios;
5. após merge, registrar análise de causa e ações preventivas.

Hotfix não elimina rastreabilidade nem revisão, apenas reduz tempo de ciclo.

---

## 9. Administração de exceções

Exceções devem ser raras e justificadas.

Condições para exceção:

- incidente crítico comprovado;
- risco maior em aguardar fluxo normal;
- aprovação explícita do responsável técnico.

Toda exceção deve registrar:

- motivo;
- responsável pela autorização;
- data/hora;
- plano de correção pós-exceção.

---

## 10. Proibições explícitas

- push direto em `main`;
- merge sem PR em branch protegida;
- merge com checks obrigatórios falhando;
- merge com comentário crítico aberto;
- bypass de regra sem justificativa registrada;
- desativar proteção sem alinhamento formal.

---

## 11. Checklist de conformidade

| Item | Obrigatório |
| --- | --- |
| Branch protegida configurada (`main`) | Sim |
| Push direto bloqueado | Sim |
| PR obrigatória para merge | Sim |
| Aprovação mínima configurada | Sim |
| Checks obrigatórios configurados | Sim |
| Conversas não resolvidas bloqueiam merge | Sim |
| Regra para exceção definida | Sim |

---

## 12. Exemplo prático

Cenário:

- PR de `feature/512-cadastro-de-espacos` para `main`.

Fluxo esperado:

1. PR aberta com template e `Closes #512`;
2. CI executa checks obrigatórios;
3. reviewer aprova;
4. comentários são resolvidos;
5. merge permitido;
6. branch removida.

Se algum check falhar, merge permanece bloqueado até correção.

---

## 13. Relação com demais documentos

Este acordo deve operar em conjunto com:

- `docs/processo/padrao-de-branches.md`
- `docs/processo/padrao-de-commits.md`
- `docs/processo/fluxo-de-code-review.md`
- `docs/processo/definition-of-done.md`

---

## 14. Histórico de versões

| Versão | Data | Autor | Mudanças |
| --- | --- | --- | --- |
| 1.0.0 | 2026-07-19 | Vinícius Borges | Criação do acordo de branches protegidas. |
