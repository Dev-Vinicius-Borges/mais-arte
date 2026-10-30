alter table public.espaco_cultural
  add column if not exists foto_principal varchar(255),
  add column if not exists reputacao_score double precision not null default 0;
