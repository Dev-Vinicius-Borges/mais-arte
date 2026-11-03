begin;

-- ============================================================================
-- Migration: 0007_preparar_curadoria_e_moderacao.sql
-- Objetivo: Preparar a base de dados relacional para o ciclo de curadoria
--           e moderação de conteúdo (Artistas, Bandas, Espaços e Eventos),
--           mantendo compatibilidade com o backend Java e o MVP atual.
-- ============================================================================

-- 1. Inclusão das colunas de moderação nas tabelas base de conteúdo
alter table public.perfil_artista
  add column if not exists status_moderacao varchar(20) not null default 'PENDENTE',
  add column if not exists motivo_rejeicao text,
  add column if not exists data_moderacao timestamptz;

alter table public.banda
  add column if not exists status_moderacao varchar(20) not null default 'PENDENTE',
  add column if not exists motivo_rejeicao text,
  add column if not exists data_moderacao timestamptz;

alter table public.espaco_cultural
  add column if not exists status_moderacao varchar(20) not null default 'PENDENTE',
  add column if not exists motivo_rejeicao text,
  add column if not exists data_moderacao timestamptz;

alter table public.evento
  add column if not exists status_moderacao varchar(20) not null default 'PENDENTE',
  add column if not exists motivo_rejeicao text,
  add column if not exists data_moderacao timestamptz;

-- 2. Constraints de integridade para os valores de status permitidos
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'chk_artista_status_moderacao') then
    alter table public.perfil_artista
      add constraint chk_artista_status_moderacao
      check (status_moderacao in ('PENDENTE', 'APROVADO', 'REJEITADO'));
  end if;

  if not exists (select 1 from pg_constraint where conname = 'chk_banda_status_moderacao') then
    alter table public.banda
      add constraint chk_banda_status_moderacao
      check (status_moderacao in ('PENDENTE', 'APROVADO', 'REJEITADO'));
  end if;

  if not exists (select 1 from pg_constraint where conname = 'chk_espaco_status_moderacao') then
    alter table public.espaco_cultural
      add constraint chk_espaco_status_moderacao
      check (status_moderacao in ('PENDENTE', 'APROVADO', 'REJEITADO'));
  end if;

  if not exists (select 1 from pg_constraint where conname = 'chk_evento_status_moderacao') then
    alter table public.evento
      add constraint chk_evento_status_moderacao
      check (status_moderacao in ('PENDENTE', 'APROVADO', 'REJEITADO'));
  end if;
end $$;

-- 3. Transição suave e retrocompatibilidade com registros existentes
-- Registros que já estavam marcados como verificados tornam-se APROVADO
update public.perfil_artista
set status_moderacao = 'APROVADO',
    data_moderacao = coalesce(data_moderacao, clock_timestamp())
where verificado = true and status_moderacao = 'PENDENTE';

update public.espaco_cultural
set status_moderacao = 'APROVADO',
    data_moderacao = coalesce(data_moderacao, clock_timestamp())
where verificado = true and status_moderacao = 'PENDENTE';

update public.evento
set status_moderacao = 'APROVADO',
    data_moderacao = coalesce(data_moderacao, clock_timestamp())
where verificado = true and status_moderacao = 'PENDENTE';

update public.banda
set status_moderacao = 'APROVADO',
    data_moderacao = coalesce(data_moderacao, clock_timestamp())
where verificado = true and status_moderacao = 'PENDENTE';

-- 4. Índices para otimização de consultas públicas filtradas por moderação
create index if not exists idx_artista_ativo_moderacao
  on public.perfil_artista (ativo, status_moderacao);

create index if not exists idx_banda_ativo_moderacao
  on public.banda (ativo, status_moderacao);

create index if not exists idx_espaco_ativo_moderacao
  on public.espaco_cultural (ativo, status_moderacao);

create index if not exists idx_evento_ativo_moderacao
  on public.evento (ativo, status_moderacao);

-- 5. Atualização das políticas de Row Level Security (RLS)
-- Garante que leituras públicas vejam registros ativos e aprovados (ou legados com verificado = true)
drop policy if exists "conteudo ativo pode ser lido publicamente" on public.perfil_artista;
create policy "conteudo ativo pode ser lido publicamente"
  on public.perfil_artista for select
  using (ativo = true and (status_moderacao = 'APROVADO' or verificado = true));

drop policy if exists "espacos ativos podem ser lidos publicamente" on public.espaco_cultural;
create policy "espacos ativos podem ser lidos publicamente"
  on public.espaco_cultural for select
  using (ativo = true and (status_moderacao = 'APROVADO' or verificado = true));

-- 6. Documentação das colunas via comentários no PostgreSQL
comment on column public.perfil_artista.status_moderacao is 'Status do ciclo de curadoria: PENDENTE, APROVADO ou REJEITADO';
comment on column public.perfil_artista.motivo_rejeicao is 'Justificativa do curador em caso de rejeição de conteúdo';
comment on column public.perfil_artista.data_moderacao is 'Data e hora da avaliação realizada pelo curador';

comment on column public.espaco_cultural.status_moderacao is 'Status do ciclo de curadoria: PENDENTE, APROVADO ou REJEITADO';
comment on column public.espaco_cultural.motivo_rejeicao is 'Justificativa do curador em caso de rejeição de conteúdo';
comment on column public.espaco_cultural.data_moderacao is 'Data e hora da avaliação realizada pelo curador';

comment on column public.evento.status_moderacao is 'Status do ciclo de curadoria: PENDENTE, APROVADO ou REJEITADO';
comment on column public.evento.motivo_rejeicao is 'Justificativa do curador em caso de rejeição de conteúdo';
comment on column public.evento.data_moderacao is 'Data e hora da avaliação realizada pelo curador';

comment on column public.banda.status_moderacao is 'Status do ciclo de curadoria: PENDENTE, APROVADO ou REJEITADO';
comment on column public.banda.motivo_rejeicao is 'Justificativa do curador em caso de rejeição de conteúdo';
comment on column public.banda.data_moderacao is 'Data e hora da avaliação realizada pelo curador';

commit;
