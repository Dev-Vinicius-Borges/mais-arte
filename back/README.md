# +Arte Backend

O backend do +Arte é a parte do projeto que conversa com o banco e entrega os dados para o frontend. Neste momento, ele atende as primeiras necessidades do MVP: eventos próximos, artistas em destaque, espaços em destaque e busca geral.

## O que já está pronto

- API Fastify com TypeScript
- Supabase conectado ao backend
- Migrations do banco em `supabase/migrations/0001_mvp.sql` e `supabase/migrations/0002_ajustes_evento.sql`
- Repositório Supabase usando as tabelas do MVP
- Dados locais de fallback para desenvolvimento e testes
- Validação de parâmetros com Zod
- Testes automatizados das rotas principais
- CORS configurado para o frontend local

Quando `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estão preenchidos no `.env`, o backend usa o Supabase automaticamente. Sem essas variáveis, ou usando os valores-placeholder do `.env.example`, ele usa os dados locais de teste.

## Como executar

Instale as dependências:

```bash
pnpm install
```

Neste ambiente, caso o pnpm mostre `ERR_PNPM_IGNORED_BUILDS`, execute o servidor com:

```bash
npm --prefix back run dev
```

O backend ficará disponível em:

```text
http://127.0.0.1:3333
```

Para verificar se está funcionando:

```text
http://127.0.0.1:3333/health
```

## Supabase

O arquivo `back/.env` já contém as configurações do projeto localmente. Esse arquivo é ignorado pelo Git e não deve ser compartilhado.

A chave `SUPABASE_SERVICE_ROLE_KEY` é secreta. Ela deve ficar somente no backend, nunca no frontend.

O schema inicial está em [`supabase/migrations/0001_mvp.sql`](supabase/migrations/0001_mvp.sql). Para quem já executou essa migration, também é necessário executar [`0002_ajustes_evento.sql`](supabase/migrations/0002_ajustes_evento.sql), que adiciona `foto_principal` à tabela `evento`.

As migrations criam as tabelas:

- `perfil_artista`
- `banda`
- `espaco_cultural`
- `evento`

O arquivo `modelo_fisico.sql` continua sendo a referência conceitual do domínio, mas foi escrito para MySQL. A migration usada no Supabase está em PostgreSQL.

## Testar sem Supabase

Sim, é possível testar o backend sem acesso ao Supabase. Basta não criar o arquivo `back/.env`, ou deixar apenas as configurações do servidor sem preencher as variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`. O backend usará os dados locais de `src/data.ts`.

Nesse modo, é possível testar as rotas, o CRUD e a busca, mas os dados não serão persistidos depois que o processo for encerrado. Para testar com persistência real, é necessário usar o `.env` configurado e o schema aplicado no Supabase.

## Rotas disponíveis

| Método | Rota | O que retorna |
| --- | --- | --- |
| GET | `/health` | Status do backend |
| GET | `/api/v1/events/upcoming?limit=4` | Próximos eventos |
| GET | `/api/v1/artists/featured?limit=4` | Artistas verificados em destaque |
| GET | `/api/v1/spaces/featured?limit=3` | Espaços culturais verificados em destaque |
| GET | `/api/v1/search?q=música` | Busca geral na plataforma |
| GET | `/api/v1/search?q=música&type=artista` | Busca filtrada por tipo |
| GET | `/api/v1/artists` | Lista artistas ativos |
| POST | `/api/v1/artists` | Cria um artista |
| GET/PATCH/DELETE | `/api/v1/artists/:id` | Consulta, edita ou desativa um artista |
| GET/POST | `/api/v1/bands` | Lista ou cria uma banda |
| GET/PATCH/DELETE | `/api/v1/bands/:id` | Consulta, edita ou desativa uma banda |
| GET/POST | `/api/v1/spaces` | Lista ou cria um espaço cultural |
| GET/PATCH/DELETE | `/api/v1/spaces/:id` | Consulta, edita ou desativa um espaço |
| GET/POST | `/api/v1/events` | Lista ou cria um evento |
| GET/PATCH/DELETE | `/api/v1/events/:id` | Consulta, edita ou desativa um evento |

Os tipos aceitos na busca são `artista`, `banda`, `evento` e `espaco_cultural`. As respostas seguem o formato `{ data, meta }`. Erros seguem o formato `{ error, message }`.

O `DELETE` faz uma exclusão lógica: o registro continua no banco com `ativo=false`, mas deixa de aparecer nas consultas públicas. As rotas de escrita ainda não possuem autenticação; antes de disponibilizar cadastro e edição para usuários reais, elas devem receber proteção por perfil de acesso.

## O que ainda falta

A conexão entre Supabase e backend já está feita. O principal trabalho pendente agora é integrar o frontend com essas rotas.

Na prática, o frontend precisa:

1. chamar as rotas usando `fetch` ou um cliente HTTP;
2. substituir os dados estáticos pelos dados recebidos da API;
3. exibir estados de carregamento, erro e lista vazia;
4. configurar `NEXT_PUBLIC_API_URL=http://127.0.0.1:3333` no `.env.local` do frontend;
5. conectar a busca e os filtros à rota `/api/v1/search`.

Depois dessa integração, os próximos incrementos do MVP serão cadastro e edição de conteúdo, autenticação para colaboradores, workflow de publicação, paginação e filtros mais completos.

## Testes

Para executar o typecheck:

```bash
./node_modules/.bin/tsc -p back/tsconfig.json
```

Para executar os testes:

```bash
./back/node_modules/.bin/tsx --test back/src/app.test.ts
```