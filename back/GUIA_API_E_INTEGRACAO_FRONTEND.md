# Guia da API Java e integração com o frontend

Este documento descreve o estado atual do módulo `back/` e como consumir e evoluir sua API REST a partir do frontend.

## 1. Resumo da arquitetura

O backend usa Java 17, Spring Boot 3.5, Spring MVC, Spring Data JPA/Hibernate e PostgreSQL. O fluxo normal de uma consulta é:

```text
Frontend (HTTP/JSON) -> Controller -> Serviço -> Repositório JPA -> PostgreSQL
```

- **Controllers:** definem os caminhos HTTP, recebem parâmetros e convertem entidades em DTOs.
- **Serviços:** aplicam operações de domínio e coordenam repositórios.
- **Repositórios:** consultam o banco com JPQL parametrizado.
- **Entidades:** representam as tabelas persistidas.
- **DTOs:** definem o formato JSON devolvido ao frontend; as entidades não devem ser serializadas diretamente.
- **`ApiErrorHandler`:** converte erros conhecidos em respostas JSON.

Os nomes de classes e pacotes próprios do projeto são em português. O ponto de entrada é `AplicacaoMaisArte`.

## 2. Estado funcional atual

- A API inicia como servidor HTTP Spring Boot; a porta padrão é `8080`.
- As consultas são públicas e não exigem autenticação.
- Os controllers de artistas, bandas, espaços culturais e eventos expõem somente `GET`. Rotas de escrita não estão disponíveis enquanto autenticação e autorização não forem implementadas.
- Todas as consultas públicas nos repositórios filtram `ativo = true` e `verificado = true`. O backend ainda não mapeia os campos `status_moderacao`, `motivo_rejeicao` e `data_moderacao`; não trate `verificado` como decisão auditável de curadoria.
- Existe o serviço `ServicoBuscaCatalogo`, mas ainda não existe controller/endpoint REST para busca global.
- Não há configuração de Flyway no `pom.xml`. As migrations ficam em `supabase/migrations/`; verifique o banco de destino e aplique-as pelo processo adotado pela equipe.

## 3. Configuração e execução local

Requisitos:

- JDK 17 ou superior;
- Maven 3.9 ou superior;
- PostgreSQL com schema compatível com as entidades Java.

Configure estas variáveis no ambiente ou no arquivo local `back/.env`:

| Variável | Exemplo local | Uso |
|---|---|---|
| `DATABASE_URL` | `jdbc:postgresql://127.0.0.1:5432/mais_arte` | URL JDBC do PostgreSQL |
| `DATABASE_USERNAME` | `postgres` | Usuário do banco |
| `DATABASE_PASSWORD` | (local) | Senha do banco |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:3000` | Origens web autorizadas, separadas por vírgula |

O arquivo `.env` é local e não deve conter credenciais versionadas. Não use credenciais administrativas em ambientes compartilhados ou produção.

Na pasta `back/`, inicie o servidor:

```bash
mvn spring-boot:run
```

O Hibernate está configurado com `ddl-auto: validate`: ele verifica o schema no início, mas não cria nem corrige tabelas. A aplicação inicia apenas se puder conectar ao banco e validar o mapeamento. Para compilar e executar os testes:

```bash
mvn verify
```

## 4. Endpoints disponíveis

Base local: `http://localhost:8080`. Todas as rotas abaixo são `GET` e devolvem JSON.

| Método | Caminho | Resposta | Observações |
|---|---|---|---|
| GET | `/api/artistas` | `ArtistaDto[]` | Lista artistas ativos e verificados |
| GET | `/api/artistas/{id}` | `ArtistaDto` | Detalhe de artista ativo e verificado |
| GET | `/api/artistas/destaques?limite=4` | `ArtistaDto[]` | Limite de 1 a 4; padrão 4 |
| GET | `/api/bandas` | `BandaDto[]` | Lista bandas ativas e verificadas |
| GET | `/api/bandas/{id}` | `BandaDto` | Detalhe de banda ativa e verificada |
| GET | `/api/bandas/pesquisa?termo={termo}&limite=10` | `BandaDto[]` | Busca de bandas; `limite` padrão 10 |
| GET | `/api/espacos-culturais` | `EspacoCulturalDto[]` | Lista espaços ativos e verificados |
| GET | `/api/espacos-culturais/{id}` | `EspacoCulturalDto` | Detalhe de espaço ativo e verificado |
| GET | `/api/espacos-culturais/destaques?limite=3` | `EspacoCulturalDto[]` | Limite de 1 a 3; padrão 3 |
| GET | `/api/eventos` | `EventoDto[]` | Lista eventos ativos e verificados |
| GET | `/api/eventos/{id}` | `EventoDto` | Detalhe de evento ativo e verificado |
| GET | `/api/eventos/proximos?limite=4` | `EventoDto[]` | Eventos a partir de hoje, ordenados por data e hora; limite de 1 a 4, padrão 4 |

Valores de `limite` fora dos intervalos dos destaques e eventos próximos retornam HTTP 400. A pesquisa de bandas usa paginação interna limitada ao valor informado, mas ainda não possui a mesma validação de faixa. Não envie um limite arbitrariamente alto.

O caminho `/api/catalogo/busca` ainda **não está disponível**. A busca unificada existente no serviço não deve ser chamada diretamente pelo navegador; para publicá-la, implemente e teste um controller REST.

## 5. Formato dos DTOs

Os campos são serializados em JSON com os nomes abaixo. Campos opcionais podem vir como `null`; listas podem vir vazias.

### Artista — `ArtistaDto`

```json
{
  "id": 1,
  "nomeArtistico": "Nome do artista",
  "bioProfissional": "Descrição",
  "dataInicioAtividade": "2020-01-15",
  "generosMusicais": ["MPB"],
  "fotoPrincipal": "https://exemplo/imagem.jpg",
  "reputacaoScore": 0.0,
  "verificado": true,
  "ativo": true
}
```

### Banda — `BandaDto`

Campos: `id`, `nomeBanda`, `descricao`, `dataFormacao` (`YYYY-MM-DD`), `generosMusicais`, `fotoPrincipal`, `reputacaoScore`, `verificado`, `ativo`.

### Espaço cultural — `EspacoCulturalDto`

Campos: `id`, `nomeEspaco`, `descricao`, `site`, `horarioFuncionamento` (objeto chave/valor), `capacidadeMaxima`, `publico`, `endereco`, `fotoPrincipal`, `reputacaoScore`, `verificado`, `ativo`.

### Evento — `EventoDto`

Campos: `id`, `nomeEvento`, `descricao`, `dataEvento` (`YYYY-MM-DD`), `horaInicio` e `horaFim` (`HH:mm:ss`), `urlCartaz`, `linkIngresso`, `precoIngresso`, `endereco`, `espacosCulturais` (lista de IDs), `fotoPrincipal`, `reputacaoScore`, `verificado`, `ativo`.

Datas de calendário são datas locais (`YYYY-MM-DD`), não instantes UTC. No frontend, evite convertê-las para UTC de forma que altere o dia exibido.

## 6. Consumindo a API no frontend

Defina a URL base do lado do navegador em uma variável pública do framework, por exemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Exemplo simples em TypeScript:

```ts
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL não está configurada");
}

export async function obterEventosProximos() {
  const url = new URL("/api/eventos/proximos", apiUrl);
  url.searchParams.set("limite", "4");

  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error(`Falha ao carregar eventos: HTTP ${resposta.status}`);
  }

  return resposta.json();
}
```

Em conectores reais:

1. Centralize URL base, `fetch`, tratamento de status HTTP e decodificação de resposta.
2. Crie tipos TypeScript alinhados aos DTOs, não às entidades JPA.
3. Separe estados de carregamento, erro e lista vazia na interface.
4. Trate erros de rede e HTTP sem convertê-los em listas vazias silenciosamente.
5. Não coloque credenciais do PostgreSQL ou chaves administrativas do Supabase no frontend. O navegador chama somente a API HTTP.
6. Configure `CORS_ALLOWED_ORIGINS` para a origem exata do frontend. O backend permite `GET` e `OPTIONS` em `/api/**`, sem credenciais CORS e sem origem curinga por padrão.

## 7. Erros HTTP

Para recurso inexistente/inativo/não verificado, o serviço lança `ErroRecursoNaoEncontrado`, tratado como HTTP 404. Erros de validação tratados pelo `ApiErrorHandler` retornam HTTP 400.

Formato dos erros cobertos por esse handler:

```json
{
  "timestamp": "2026-11-03T17:00:00-03:00",
  "status": 404,
  "error": "Not Found",
  "message": "Evento não encontrado."
}
```

Como a API está em modo somente leitura, tentativas de POST, PUT ou DELETE nos recursos acima não são rotas válidas e retornam HTTP 405 (método não permitido).

## 8. Como adicionar uma rota REST

Antes de criar uma rota:

1. Defina o caso de uso, o caminho HTTP, parâmetros, formato da resposta e códigos de erro.
2. Reaproveite um DTO existente ou crie um DTO explícito. Não exponha diretamente a entidade JPA.
3. Coloque no controller somente a responsabilidade HTTP; delegue lógica e transações ao serviço.
4. Adicione uma operação ao serviço e uma consulta ao repositório se o caso de uso precisar. Para JPQL, mantenha valores externos como parâmetros nomeados (`:termo`); não concatene entrada do usuário na query.
5. Preserve filtros de visibilidade (`ativo = true` e `verificado = true`) em consultas públicas, inclusive busca, listagem, detalhe e destaques.
6. Valide entrada e limites no servidor; não dependa de validação feita apenas pelo frontend.
7. Teste o controller, a regra do serviço e a consulta pertinente. Para rotas HTTP, use `MockMvc` e confira status, corpo e casos de erro.

As rotas de escrita permanecem desabilitadas até que autenticação e autorização sejam implementadas. Não reintroduza POST/PUT/DELETE sem validar a identidade e as permissões no backend.

## 9. Banco de dados e migrations

O repositório contém migrations de `0001` a `0007`. Não as aplique às cegas:

- `0006_recriar_schema_java.sql` contém operações `DROP TABLE` e é destrutiva para tabelas existentes.
- `0007_preparar_curadoria_e_moderacao.sql` adiciona campos de moderação e altera dados e políticas RLS; entre outras operações, transforma registros `verificado = true` em `APROVADO`.
- A aplicação Java atual não mapeia os campos de moderação. As consultas Java usam `ativo` e `verificado`, enquanto regras RLS são administradas pelo PostgreSQL/Supabase e dependem da role efetiva usada na conexão JDBC.

Confirme o estado e a role do banco de destino, faça backup quando aplicável e valide o schema antes de executar migrations. O `ddl-auto: validate` não substitui versionamento nem aplicação de migrations.
