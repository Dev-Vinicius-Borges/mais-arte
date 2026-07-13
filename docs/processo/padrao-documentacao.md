# Padrão de Documentação

**Versão:** 1.2.1  
**Data:** 2026-07-13  
**Status:** Ativo  
**Aplicação:** Obrigatória para documentação técnica e de processo do repositório

---

## 1. Objetivo

Estabelecer um padrão único de documentação para garantir:

- clareza técnica;
- consistência de conteúdo;
- rastreabilidade de mudanças;
- qualidade acadêmica e profissional;
- redução de retrabalho.

Este padrão se aplica à documentação técnica e de processo do projeto, com distinção explícita para documentos acadêmicos formais.

---

## 2. Escopo de aplicação deste padrão

Este padrão possui **dois regimes de documentação**:

1. **Regime Técnico/Produto (obrigatório)**  
   Aplica-se a arquivos `.md` e demais documentos não acadêmicos do projeto, incluindo:
   - `README.md`
   - `CONTRIBUTING.md`
   - documentos em `docs/processo/`
   - ADRs
   - documentação de arquitetura, dados, deploy, domínio, casos de uso etc.

2. **Regime Acadêmico ABNT (exceção controlada)**  
   Aplica-se a documentos acadêmicos formais (relatórios, artigos, entregas institucionais em formato acadêmico), que seguem as normas ABNT e **não são obrigados à estrutura do tópico 3** deste documento.

---

## 3. Estrutura padrão para documentos técnicos (não acadêmicos)

Todo documento técnico (principalmente `.md`) deve conter, no mínimo:

1. **Título**
2. **Metadados iniciais**
   - Versão
   - Data
   - Status (Rascunho / Em revisão / Aprovado)
   - Responsável
3. **Objetivo**
4. **Escopo**
   - Inclui
   - Não inclui
5. **Conteúdo principal**
6. **Referências** (quando aplicável)
7. **Histórico de versões** (tabela no final)

> **Importante:** esta estrutura **não é obrigatória** para documentos acadêmicos formais regidos por ABNT.

---

## 4. Princípios obrigatórios

1. **Arquivo único por assunto**  
   Cada tema deve possuir um arquivo canônico fixo.  
   Não criar cópias com sufixos como: `_v2`, `_final`, `_novo`, `_corrigido`.

2. **Atualização incremental**  
   Alterações devem ser feitas no mesmo arquivo, com histórico de mudanças registrado.

3. **Clareza e objetividade**  
   Escrever de forma direta, sem excesso de texto e sem ambiguidade.

4. **Coerência técnica**  
   Toda decisão documentada deve ser defensável tecnicamente e alinhada ao estado real do projeto.

5. **Rastreabilidade**  
   Mudanças importantes devem apontar origem (issue, PR, ADR ou decisão de reunião).

---

## 5. Convenções de escrita (documentação técnica)

### 5.1 Estilo

- Frases curtas e diretas.
- Evitar linguagem vaga (“talvez”, “depois vemos”, “pode ser”).
- Evitar adjetivação excessiva.
- Preferir listas e tabelas para critérios e regras.

### 5.2 Terminologia

- Usar termos consistentes ao longo dos arquivos.
- Consultar `docs/08-glossario.md` para nomenclaturas oficiais.

---

## 6. Padrão acadêmico (ABNT) para entregáveis formais

Quando o documento for de natureza acadêmica (relatórios, artigos, entregas institucionais), adotar:

- Fonte: **Arial**
- Tamanho: **12**
- Cor do texto: **preto**
- Conteúdo sem elementos decorativos desnecessários
- Tabelas objetivas, com títulos claros
- Figuras com legenda e referência
- Coerência argumentativa e justificativa técnica plausível

Documentos acadêmicos seguem estrutura própria ABNT e podem divergir da estrutura técnica do tópico 3.

---

## 7. Padrão de imagens, diagramas e tabelas

### 7.1 Imagens

- Devem ser nítidas e legíveis.
- Nome de arquivo descritivo (ex.: `diagrama-casos-de-uso-v1.png`).
- Inserir legenda e contexto no documento.

### 7.2 Diagramas

- Arquivos-fonte obrigatórios (ex.: `.drawio`) devem ser versionados.
- Exportações (`.png`, `.svg`) devem ficar junto ao fonte correspondente.
- Local obrigatório: `diagrams/` (subpastas por domínio, banco, arquitetura).

### 7.3 Tabelas

- Usar colunas objetivas.
- Evitar tabelas com texto prolixo.
- Indicar unidade e contexto quando necessário.

---

## 8. Política de versionamento de documentos

### 8.1 Regra principal

Não versionar por nome de arquivo.  
Versionar por **Git + tabela de histórico dentro do documento**.

### 8.2 Versão semântica para documentos

Formato: `MAJOR.MINOR.PATCH`

- **MAJOR**: mudança estrutural ou de diretriz
- **MINOR**: inclusão relevante de conteúdo
- **PATCH**: correção textual/ajuste pontual sem alterar sentido

### 8.3 Histórico obrigatório

- Documentação técnica: obrigatório no próprio arquivo.
- Documento acadêmico ABNT: seguir o controle de versão institucional/acadêmico definido para a entrega.

---

## 9. Política de uso de IA na documentação

IA pode ser usada como apoio, nunca como autoria integral não validada.

### Permitido

- correção gramatical;
- melhoria de clareza textual;
- sugestão de estrutura;
- apoio de pesquisa inicial.

### Proibido

- gerar documento completo sem validação humana;
- inserir conteúdo não verificado;
- usar texto genérico sem aderência ao contexto do projeto.

### Obrigatório

Quando houver apoio de IA, o autor do documento continua responsável por:

- verificar consistência técnica;
- adaptar ao contexto real;
- remover generalidades sem evidência.

Consultar: `docs/processo/politica-de-uso-de-ia.md`.

---

## 10. Controle de qualidade antes de commit (checklist)

Antes de abrir PR com alteração documental, confirme:

- [ ] Arquivo canônico foi atualizado (sem duplicação)
- [ ] Estrutura mínima foi respeitada (quando documento técnico)
- [ ] Texto está claro, objetivo e coerente
- [ ] Termos estão padronizados
- [ ] Diagramas/imagens estão em local correto
- [ ] Histórico de versões foi atualizado (quando aplicável)
- [ ] Commit segue padrão semântico (`docs:`)
- [ ] PR contém descrição adequada da mudança

---

## 11. Critérios de reprovação de documentação

A documentação deve ser reprovada em review quando houver:

- duplicação de arquivo por nome de versão;
- conteúdo contraditório ao sistema implementado;
- texto genérico sem aplicação prática;
- ausência de contexto/objetivo/escopo (documentação técnica);
- uso de IA sem validação mínima do autor.

---

## 12. Fluxo de atualização documental

Para **cada atualização/mudança**, o fluxo obrigatório é:

1. Criar uma **branch específica** a partir da branch base oficial.
2. Realizar as alterações no arquivo canônico correspondente.
3. Atualizar histórico de versão (quando aplicável ao tipo de documento).
4. Fazer commit com padrão semântico (`docs: ...`).
5. Abrir Pull Request da branch de trabalho para a branch base.

---

## 13. Histórico de versões

| Versão | Data | Autor | Mudanças |
| -------- | ------------ | -------------- | ---------- |
| 1.2.1 | 2026-07-13 | Vinícius Borges | Remoção da seção “Regra obrigatória de PR” por redundância com o fluxo nativo do GitHub. |
| 1.2.0 | 2026-07-13 | Vinícius Borges | Ajuste de escopo: estrutura do tópico 3 passa a ser obrigatória apenas para documentação técnica/não acadêmica; documentos acadêmicos seguem ABNT. |
| 1.1.0 | 2026-07-13 | Vinícius Borges | Ajuste do nome do projeto, remoção da regra de idioma e atualização do fluxo para branch obrigatória por mudança. |
| 1.0.0 | 2026-07-13 | Vinícius Borges | Criação do padrão oficial de documentação. |
