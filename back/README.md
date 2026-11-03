# +Arte Backend

API REST do +Arte em Java 17, Spring Boot, Spring MVC, Spring Data JPA/Hibernate e PostgreSQL. O módulo contém controllers somente leitura, DTOs, serviços de domínio, repositórios e entidades.

Consulte o [Guia da API Java e integração com o frontend](./GUIA_API_E_INTEGRACAO_FRONTEND.md) para endpoints, contratos JSON, configuração, execução local, consumo pelo frontend e instruções para adicionar rotas.

Os nomes das classes, arquivos, pacotes e métodos próprios do projeto ficam em português, inclusive os serviços ainda não utilizados. Nomes de APIs e anotações do Java, Spring e Hibernate mantêm a grafia original.

## Requisitos

- JDK 17 ou superior
- Maven 3.9 ou superior
- PostgreSQL

## Configuração

Defina os dados de conexão JDBC em `back/.env` (se houver um arquivo de exemplo no checkout, use-o como base) ou diretamente no ambiente:

- `DATABASE_URL`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `CORS_ALLOWED_ORIGINS` (padrão local: `http://localhost:3000`)

O Spring carrega esse arquivo local se ele existir. Também é possível fornecer as três variáveis diretamente no ambiente. O `.env` é ignorado pelo Git e não deve conter credenciais versionadas.

Para usar o PostgreSQL hospedado pelo Supabase, configure a URL JDBC e as credenciais do banco. `SUPABASE_URL` e chaves da API (publishable ou service role) não substituem as credenciais JDBC e não são usadas pelo backend Java.

O Hibernate usa `ddl-auto: validate`: o schema precisa estar aplicado antes de iniciar a aplicação e divergências são reportadas, não corrigidas silenciosamente.

## Banco de dados

Os scripts de `0001` a `0007` estão em `supabase/migrations/`. O projeto não configura Flyway nem aplica migrations automaticamente; confira o estado do banco e use o processo de migração adotado pela equipe. Em especial, `0006_recriar_schema_java.sql` contém operações `DROP TABLE`, e `0007_preparar_curadoria_e_moderacao.sql` altera dados e políticas RLS. Não execute esses scripts sem confirmar o banco de destino e, quando aplicável, fazer backup. Consulte o [guia de API](./GUIA_API_E_INTEGRACAO_FRONTEND.md#9-banco-de-dados-e-migrations) para os detalhes e ressalvas.

Cada evento possui um endereço em texto obrigatório e pode estar associado a nenhum, um ou vários espaços culturais. A associação usa `evento_espaco_cultural`.

## Iniciar o servidor e validar conexão/schema

```bash
mvn spring-boot:run
```

O comando inicia o servidor HTTP na porta `8080` e valida a conexão e o schema do banco com `ddl-auto: validate`.

Para compilar e executar os testes:

```bash
mvn verify
```

## Estado da API

A aplicação inicia um servidor HTTP Spring Boot na porta padrão `8080`. Os endpoints GET estão disponíveis para artistas, bandas, espaços culturais e eventos. As rotas de escrita não estão disponíveis até a implementação de autenticação e autorização. A busca global existe como serviço, mas ainda não tem endpoint REST.
