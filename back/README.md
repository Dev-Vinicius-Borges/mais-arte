# +Arte Backend — persistência

Camada de persistência do +Arte em Java 17, Spring Boot, Spring Data JPA/Hibernate e PostgreSQL. Este módulo contém entidades, repositórios e serviços de domínio; controllers e integração HTTP com o frontend estão fora do escopo atual.

Os nomes das classes, arquivos, pacotes e métodos próprios do projeto ficam em português, inclusive os serviços ainda não utilizados. Nomes de APIs e anotações do Java, Spring e Hibernate mantêm a grafia original.

## Requisitos

- JDK 17 ou superior
- Maven 3.9 ou superior
- PostgreSQL

## Configuração

Copie `.env.example` para `.env` e defina os dados de conexão JDBC:

- `DATABASE_URL`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`

O Spring carrega esse arquivo local se ele existir. Também é possível fornecer as três variáveis diretamente no ambiente. O `.env` é ignorado pelo Git e não deve conter credenciais versionadas.

Para usar o PostgreSQL hospedado pelo Supabase, configure a URL JDBC e as credenciais do banco. `SUPABASE_URL` e chaves da API (publishable ou service role) não substituem as credenciais JDBC e não são usadas pelo backend Java.

O Hibernate usa `ddl-auto: validate`: o schema precisa estar aplicado antes de iniciar a aplicação e divergências são reportadas, não corrigidas silenciosamente.

## Banco de dados

Execute em ordem as migrations em `supabase/migrations/`:

1. `0001_mvp.sql`
2. `0002_ajustes_evento.sql`
3. `0003_endereco_evento_espacos.sql`
4. `0004_ajustes_espaco_cultural.sql`
5. `0005_modelo_endereco_texto.sql`

A migration `0003` cria a entidade de endereço e a associação opcional entre eventos e espaços culturais. A migration `0005` converte os dados estruturados de endereço em texto no evento, preserva os componentes existentes e então remove a tabela `endereco` e a FK antiga. Ela interrompe a execução se houver evento sem endereço válido. A remoção da tabela é intencional e definitiva; confirme o banco de destino e faça backup antes de aplicar migrations manualmente.

Cada evento possui um endereço em texto obrigatório e pode estar associado a nenhum, um ou vários espaços culturais. A associação usa `evento_espaco_cultural`.

## Validar conexão e schema

```bash
mvn spring-boot:run
```

O comando inicia o contexto Spring e valida a conexão e o schema do banco; não há servidor HTTP nem endpoints neste módulo.

Para compilar e executar os testes:

```bash
mvn verify
```

## Estado da API

O backend nesta etapa contém somente a persistência e os serviços Java; não inicia servidor HTTP nem disponibiliza endpoints. O runtime antigo em TypeScript/Fastify e seu cliente Supabase foram removidos. O frontend versionado ainda não consome essas rotas; os endpoints Java e a integração com o frontend ficam para uma etapa posterior.
