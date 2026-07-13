# +Arte Curitiba

Plataforma web colaborativa para mapear, organizar e divulgar artistas, bandas, espaços culturais e eventos do cenário cultural de Curitiba.

> **Status atual:** em estruturação técnica do MVP (Produto Mínimo Viável).  
> Este repositório é a **fonte única de verdade** do projeto.

---

## Aviso legal importante

Este projeto é **proprietário e confidencial**.  
**Não é permitido** copiar, reutilizar, modificar, redistribuir, publicar ou comercializar qualquer parte deste repositório sem autorização prévia e formal dos titulares.

Consulte o arquivo [`LICENSE`](./LICENSE) para os termos completos.

---

## Sumário

- [+Arte Curitiba](#arte-curitiba)
  - [Aviso legal importante](#aviso-legal-importante)
  - [Sumário](#sumário)
  - [1. Visão geral](#1-visão-geral)
  - [2. Objetivo do MVP](#2-objetivo-do-mvp)
  - [3. Escopo do MVP (in)](#3-escopo-do-mvp-in)
  - [4. Fora do escopo do MVP (out)](#4-fora-do-escopo-do-mvp-out)
  - [5. Estrutura do repositório](#5-estrutura-do-repositório)
  - [6. Como contribuir](#6-como-contribuir)
  - [7. Padrões obrigatórios](#7-padrões-obrigatórios)
  - [8. Fluxo de trabalho (resumo)](#8-fluxo-de-trabalho-resumo)
  - [9. Convenção de commits](#9-convenção-de-commits)
  - [10. Política de uso de IA](#10-política-de-uso-de-ia)
    - [Permitido](#permitido)
    - [Não permitido](#não-permitido)
  - [11. Roadmap macro](#11-roadmap-macro)
  - [12. Licença e uso](#12-licença-e-uso)
  - [13. Histórico de versões deste README](#13-histórico-de-versões-deste-readme)

---

## 1. Visão geral

O **+Arte Curitiba** nasce para resolver a fragmentação de informações culturais da cidade, conectando em um único ambiente:

- artistas independentes;
- bandas e coletivos;
- espaços culturais;
- agenda de eventos.

A proposta é construir uma base cultural viva, útil para público geral, agentes culturais e turistas.

---

## 2. Objetivo do MVP

Entregar uma primeira versão funcional, simples e sustentável da plataforma, com foco em:

1. cadastro de entidades principais;
2. visualização e busca básica;
3. painel inicial com indicadores essenciais;
4. arquitetura preparada para evoluções futuras.

---

## 3. Escopo do MVP (in)

Funcionalidades que **entram** no MVP:

- Cadastro e edição de **Artistas**
- Cadastro e edição de **Bandas**
- Cadastro e edição de **Espaços Culturais**
- Cadastro e edição de **Eventos**
- Listagem com filtros básicos
- Dashboard inicial (métricas básicas de conteúdo)
- Controle de acesso inicial por perfil (mínimo necessário)

---

## 4. Fora do escopo do MVP (out)

Funcionalidades que **não entram** nesta primeira fase:

- Aplicativo mobile
- Marketplace completo
- Módulos avançados de monetização
- Automação com IA para moderação
- Regras regulatórias avançadas não obrigatórias no estágio atual
- Expansões de alta complexidade sem validação de uso real

> Novas ideias são bem-vindas, mas seguem o fluxo de priorização formal (Issue + Refinamento + Aprovação).

---

## 5. Estrutura do repositório

```text
mais-arte/
├── README.md
├── LICENSE
├── .gitignore
├── CONTRIBUTING.md
├── CODEOWNERS
├── .github/
│   ├── pull_request_template.md
│   └── ISSUE_TEMPLATE/
├── docs/
│   ├── 00-carta-de-engenharia.md
│   ├── 01-visao-do-produto.md
│   ├── 02-regras-de-negocio.md
│   ├── 03-modelo-de-dominio.md
│   ├── 04-casos-de-uso.md
│   ├── 05-arquitetura.md
│   ├── 06-modelo-de-dados.md
│   ├── 07-roadmap-mvp.md
│   ├── 09-deploy.md
│   ├── adr/
│   └── processo/
├── diagrams/
│   ├── dominio/
│   ├── banco/
│   └── arquitetura/
├── database/
├── backend/
├── frontend/
└── docker/
```

---

## 6. Como contribuir

1. Leia os documentos obrigatórios em `docs/processo/`.
2. Abra uma **Issue** usando template apropriado.
3. Só inicie desenvolvimento quando a Issue estiver com critérios claros (DoR).
4. Crie branch seguindo o padrão definido.
5. Abra PR com template preenchido e evidências.
6. Aguarde review e aprovação antes de merge.

---

## 7. Padrões obrigatórios

- Repositório único como fonte oficial
- Commits semânticos
- PR obrigatório para qualquer mudança
- Proibido versionamento por nome de arquivo (`v2`, `final_final`)
- Atualizar arquivo raiz + histórico de mudanças do próprio documento
- Diagramas versionados no local correto (`diagrams/`)
- Decisões arquiteturais registradas em ADR

---

## 8. Fluxo de trabalho (resumo)

Backlog → Refinamento → Desenvolvimento → PR → Review → Merge

Condições mínimas:

- tarefa com critério de aceite;
- evidência de funcionamento;
- documentação atualizada;
- conformidade com DoD.

---

## 9. Convenção de commits

Padrão adotado (Conventional Commits):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `refactor:` refatoração sem mudança funcional
- `test:` testes
- `chore:` tarefas técnicas/infra sem impacto funcional direto

Exemplos:

- `feat(evento): adicionar cadastro de evento com validação de data`
- `docs(arquitetura): atualizar diagrama de containers`
- `fix(auth): corrigir expiração de sessão`

---

## 10. Política de uso de IA

IA é **apoio**, não substituição de autoria técnica.

### Permitido

- pesquisa
- revisão textual
- sugestões pontuais
- apoio didático

### Não permitido

- entregar conteúdo sem entendimento
- copiar/colar implementação sem validação
- usar IA para “simular entrega” sem responsabilidade técnica

Toda contribuição com apoio de IA deve ser informada no PR conforme política em:
`docs/processo/politica-de-uso-de-ia.md`

---

## 11. Roadmap macro

- **Fase 0:** Governança, padrões e arquitetura base
- **Fase 1:** CRUD núcleo (artistas, bandas, espaços, eventos)
- **Fase 2:** Busca, filtros e dashboard inicial
- **Fase 3:** Estabilização, testes e preparação de piloto
- **Fase 4:** Evolução orientada por uso real

---

## 12. Licença e uso

Este projeto está protegido por **licença proprietária** (`All Rights Reserved`).

- Uso não autorizado é proibido.
- Cópia, redistribuição, modificação e comercialização são proibidas sem autorização formal.
- Acesso ao repositório **não** concede direito de reutilização.

Leia os termos completos em [`LICENSE`](./LICENSE).

---

## 13. Histórico de versões deste README

| Versão | Data | Autor | Mudanças |
| -------- | ------------ | ------- | ---------- |
| 1.1.0 | 2026-07-12 | Equipe +Arte | Inclusão de aviso legal explícito e atualização da seção de licença para regime proprietário. |
| 1.0.0 | 2026-07-12 | Equipe +Arte | Criação do README inicial com governança, escopo MVP e fluxo de contribuição. |
