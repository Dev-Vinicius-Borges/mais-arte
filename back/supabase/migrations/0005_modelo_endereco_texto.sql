begin;

alter table public.evento
  add column if not exists endereco text;

update public.evento evento
set endereco = concat_ws(
  ', ',
  nullif(btrim(endereco_antigo.logradouro), ''),
  nullif(btrim(endereco_antigo.numero), ''),
  nullif(btrim(endereco_antigo.complemento), ''),
  nullif(btrim(endereco_antigo.bairro), ''),
  nullif(btrim(endereco_antigo.cidade), ''),
  nullif(btrim(endereco_antigo.uf), ''),
  case
    when endereco_antigo.cep is not null then 'CEP ' || endereco_antigo.cep
  end,
  nullif(btrim(endereco_antigo.ponto_referencia), '')
)
from public.endereco endereco_antigo
where evento.fk_id_endereco = endereco_antigo.id_endereco
  and (evento.endereco is null or btrim(evento.endereco) = '');

do $$
begin
  if exists (
    select 1
    from public.evento
    where endereco is null or btrim(endereco) = ''
  ) then
    raise exception 'Preencha o endereço dos eventos sem endereço antes de aplicar esta migration.';
  end if;
end
$$;

alter table public.evento
  alter column endereco set not null;

alter table public.evento
  drop constraint if exists ck_evento_endereco_nao_vazio;

alter table public.evento
  add constraint ck_evento_endereco_nao_vazio check (btrim(endereco) <> '');

drop policy if exists "enderecos podem ser lidos publicamente" on public.endereco;
drop index if exists public.idx_evento_endereco;

alter table public.evento
  drop column if exists fk_id_endereco;

drop table if exists public.endereco;

commit;
