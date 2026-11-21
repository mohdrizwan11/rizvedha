-- ------------------------------------------------------------------
-- Riz Vedha — anonymous site-usage schema
-- Run this once in the Supabase dashboard → SQL Editor.
-- Only counts are stored: no names, emails or IP addresses.
-- ------------------------------------------------------------------

create table if not exists public.site_daily (
  day     date not null,
  visitor text not null,
  primary key (day, visitor)
);

create table if not exists public.site_hits (
  id      bigint generated always as identity primary key,
  visitor text not null,
  path    text not null,
  at      timestamptz not null default now()
);

alter table public.site_daily enable row level security;
alter table public.site_hits enable row level security;
-- deliberately no policies: clients reach these tables only through the
-- two security-definer functions below, so nobody can forge or erase stats.

create or replace function public.rv_hit(p_visitor text, p_path text default '')
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_visitor is null or char_length(p_visitor) < 8 or char_length(p_visitor) > 80 then
    return;
  end if;
  insert into public.site_daily (day, visitor)
  values (current_date, p_visitor)
  on conflict do nothing;
  insert into public.site_hits (visitor, path)
  values (p_visitor, left(coalesce(p_path, ''), 200));
end;
$$;

create or replace function public.rv_stats()
returns table (
  unique_visitors bigint,
  today_visitors  bigint,
  page_views      bigint,
  last_28_days    bigint
)
language sql
security definer
set search_path = public
as $$
  select
    (select count(distinct visitor) from public.site_daily),
    (select count(*) from public.site_daily where day = current_date),
    (select count(*) from public.site_hits),
    (select count(*) from public.site_hits where at >= now() - interval '28 days');
$$;

revoke all on function public.rv_hit(text, text) from public;
grant execute on function public.rv_hit(text, text) to anon, authenticated;
revoke all on function public.rv_stats() from public;
grant execute on function public.rv_stats() to anon, authenticated;