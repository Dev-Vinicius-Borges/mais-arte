-- Ajustes necessários para o retorno completo dos eventos no MVP.
alter table public.evento
  add column if not exists foto_principal varchar(255);