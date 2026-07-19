# Política de Uso de IA

**Versão:** 1.0.0  
**Data:** 2026-07-19  
**Status:** Ativo  
**Responsável:** Vinícius Borges

---

## 1. Objetivo

Estabelecer regras claras para uso de Inteligência Artificial (IA) no projeto, garantindo:

- qualidade técnica das entregas;
- responsabilidade humana sobre decisões;
- proteção de dados e contexto sensível;
- rastreabilidade do que foi produzido com apoio de IA.

---

## 2. Escopo

Esta política se aplica a todo uso de IA relacionado ao projeto, incluindo:

- geração e revisão de código;
- documentação técnica e de processo;
- testes, scripts e automações;
- análises e sugestões arquiteturais.

---

## 3. Princípios obrigatórios

1. IA é ferramenta de apoio, não substituto de responsabilidade técnica.
2. Toda saída de IA deve passar por validação humana antes de uso.
3. Não enviar dados sensíveis/confidenciais para ferramentas de IA.
4. Toda contribuição relevante com IA deve ser rastreável.
5. Em conflito entre IA e diretrizes do projeto, prevalecem as diretrizes do projeto.

---

## 4. Usos permitidos

É permitido usar IA para:

- acelerar rascunhos de código e documentação;
- melhorar clareza textual;
- sugerir refatorações;
- sugerir casos de teste;
- apoiar investigação inicial de problemas;
- propor alternativas técnicas para análise humana.

---

## 5. Usos proibidos

É proibido:

- aceitar saída de IA sem revisão humana;
- usar IA para tomar decisão final sem validação técnica;
- enviar credenciais, tokens, segredos ou dados pessoais sensíveis;
- gerar conteúdo “genérico” e publicar sem adequação ao contexto real;
- mascarar autoria de IA quando houver contribuição substancial;
- utilizar IA para burlar políticas, testes, revisão ou segurança.

---

## 6. Regras para código gerado com IA

Quando IA apoiar código:

- o autor humano continua 100% responsável pelo resultado;
- deve validar corretude, segurança e desempenho;
- deve ajustar o código aos padrões de arquitetura e estilo do projeto;
- deve incluir testes compatíveis com a mudança;
- deve remover trechos desnecessários ou “alucinações” técnicas.

---

## 7. Regras para documentação gerada com IA

Quando IA apoiar documentação:

- revisar consistência técnica e aderência ao projeto;
- remover generalidades sem aplicação prática;
- garantir alinhamento com documentos canônicos;
- atualizar histórico de versões quando aplicável;
- manter linguagem objetiva e verificável.

---

## 8. Privacidade e segurança da informação

Antes de usar IA, é obrigatório garantir que o prompt não contenha:

- senhas, tokens, chaves de API;
- dados pessoais sensíveis;
- informações sigilosas de infraestrutura;
- conteúdo protegido por obrigação contratual de confidencialidade.

Em caso de dúvida, não enviar.

---

## 9. Transparência e rastreabilidade

Quando houver uso relevante de IA em uma entrega, registrar na PR:

- onde a IA foi utilizada (código, testes, docs, análise);
- que tipo de apoio foi recebido;
- confirmação de revisão e validação humana.

---

## 10. Critérios mínimos para aprovação com uso de IA

Uma entrega com apoio de IA só pode ser aprovada quando:

- [ ] foi revisada por humano responsável;
- [ ] está aderente aos padrões técnicos do projeto;
- [ ] passou em testes e checks aplicáveis;
- [ ] não contém dados sensíveis expostos;
- [ ] possui rastreabilidade na PR (quando uso for relevante).

---

## 11. Não conformidades

É considerada não conformidade:

- uso de IA sem validação humana;
- inclusão de conteúdo incorreto por falta de revisão;
- ausência de transparência em uso substancial de IA;
- violação de privacidade e segurança.

Não conformidades podem bloquear PR até regularização.

---

## 12. Exemplo de declaração na PR

Exemplo objetivo de declaração de uso de IA:

- “IA utilizada para sugerir estrutura inicial da documentação e casos de teste. Conteúdo revisado, adaptado ao contexto do projeto e validado manualmente.”

---

## 13. Relação com documentos do processo

Esta política deve ser aplicada em conjunto com:

- `docs/processo/padrao-documentacao.md`
- `docs/processo/padrao-de-commits.md`
- `docs/processo/fluxo-de-code-review.md`
- `docs/processo/definition-of-done.md`

---

## 14. Histórico de versões

| Versão | Data | Autor | Mudanças |
| --- | --- | --- | --- |
| 1.0.0 | 2026-07-19 | Vinícius Borges | Criação da política oficial de uso de IA. |
