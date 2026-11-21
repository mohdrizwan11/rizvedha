-- ------------------------------------------------------------------
-- Riz Vedha — Supabase schema
-- Run this once in the Supabase dashboard → SQL Editor.
-- ------------------------------------------------------------------

create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  state      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.progress is 'One portable snapshot of a learner''s local progress state.';

alter table public.progress enable row level security;

-- a user can only ever read and write their own row
drop policy if exists "progress: read own" on public.progress;
create policy "progress: read own"
  on public.progress for select
  using (auth.uid() = user_id);

drop policy if exists "progress: insert own" on public.progress;
create policy "progress: insert own"
  on public.progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "progress: update own" on public.progress;
create policy "progress: update own"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "progress: delete own" on public.progress;
create policy "progress: delete own"
  on public.progress for delete
  using (auth.uid() = user_id);

-- keep updated_at honest even if a client forgets to send it
create or replace function public.touch_progress()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists progress_touch on public.progress;
create trigger progress_touch
  before insert or update on public.progress
  for each row execute function public.touch_progress();

-- ------------------------------------------------------------------
-- Anonymous site usage. One random device id counts once per day;
-- nothing here stores a name, email or IP address.
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
    (select count(*) from public.site_daily),
    (select count(*) from public.site_daily where day = current_date),
    (select count(*) from public.site_hits),
    (select count(*) from public.site_hits where at >= now() - interval '28 days');
$$;

revoke all on function public.rv_hit(text, text) from public;
grant execute on function public.rv_hit(text, text) to anon, authenticated;
revoke all on function public.rv_stats() from public;
grant execute on function public.rv_stats() to anon, authenticated;
