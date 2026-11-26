-- ============================================================================
-- Script SQL para Supabase (Plano Gratuito) — Ministério Razão de Viver
-- Como usar:
--   1. Crie um projeto gratuito em https://supabase.com
--   2. Vá em "SQL Editor" -> "New query", cole este arquivo inteiro e clique em "Run"
--   3. Vá em "Authentication" -> "Users" -> "Add user" e crie o e-mail/senha da banda
--   4. Copie a Project URL e a Anon Public Key (Settings -> API) para js/config.js
-- ============================================================================

-- 1. Configurações gerais e links do ministério
create table if not exists public.settings (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- 2. Álbuns (CDs)
create table if not exists public.albums (
  id text primary key,
  title text not null,
  year text,
  cover_url text,
  description text,
  spotify_url text,
  youtube_url text,
  youtube_music_url text,
  apple_music_url text,
  deezer_url text,
  amazon_music_url text,
  tidal_url text,
  sort_order int default 0
);

-- 3. Faixas, letras e cifras
create table if not exists public.tracks (
  id text primary key,
  album_id text references public.albums(id) on delete cascade,
  track_number int not null default 1,
  title text not null,
  duration text,
  musical_key text,
  bpm text,
  listen_url text,
  lyrics_chords text default ''
);

-- 4. Agenda de eventos
create table if not exists public.events (
  id text primary key,
  title text not null,
  category text not null default 'Missa',
  event_date text not null,
  event_time text not null,
  location text not null,
  address text,
  description text,
  poster_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- 5. Pedidos de oração / intenções
create table if not exists public.prayers (
  id text primary key,
  name text not null default 'Anônimo',
  intention text not null,
  is_public boolean default false,
  approved boolean default false,
  prayed_count int default 1,
  status text default 'novo',
  created_at timestamptz default now()
);

-- 6. Convites para missas, shows e retiros
create table if not exists public.bookings (
  id text primary key,
  name text not null,
  parish text,
  event_type text,
  event_date text,
  city text,
  phone text,
  message text,
  status text default 'novo',
  created_at timestamptz default now()
);

-- 7. Enquetes / votação de repertório
create table if not exists public.polls (
  id text primary key,
  question text not null,
  active boolean default true,
  options jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);

-- ============================================================================
-- SEGURANÇA (Privilégios + Row Level Security — RLS)
-- ============================================================================
grant usage on schema public to anon, authenticated;
grant select on public.settings, public.albums, public.tracks, public.events, public.polls, public.prayers to anon, authenticated;
grant insert on public.prayers, public.bookings to anon, authenticated;
grant insert, update, delete on public.settings, public.albums, public.tracks, public.events, public.polls to authenticated;
grant select, update, delete on public.prayers, public.bookings to authenticated;

alter table public.settings enable row level security;
alter table public.albums enable row level security;
alter table public.tracks enable row level security;
alter table public.events enable row level security;
alter table public.prayers enable row level security;
alter table public.bookings enable row level security;
alter table public.polls enable row level security;

-- Leitura pública
create policy "Public read settings" on public.settings for select using (true);
create policy "Public read albums" on public.albums for select using (true);
create policy "Public read tracks" on public.tracks for select using (true);
create policy "Public read events" on public.events for select using (true);
create policy "Public read polls" on public.polls for select using (true);
create policy "Public read approved prayers" on public.prayers
  for select using (is_public = true and approved = true);

-- Envio público (pedidos de oração entram pendentes de aprovação e convites como novos)
create policy "Public insert prayers" on public.prayers
  for insert to anon, authenticated
  with check (
    char_length(trim(intention)) > 0
    and char_length(intention) <= 600
    and approved = false
    and status = 'novo'
  );
create policy "Public insert bookings" on public.bookings
  for insert to anon, authenticated
  with check (
    char_length(trim(name)) > 0
    and char_length(trim(message)) > 0
    and status = 'novo'
  );

-- Acesso total apenas para usuários autenticados (a banda)
create policy "Admin all settings" on public.settings for all to authenticated using (true) with check (true);
create policy "Admin all albums" on public.albums for all to authenticated using (true) with check (true);
create policy "Admin all tracks" on public.tracks for all to authenticated using (true) with check (true);
create policy "Admin all events" on public.events for all to authenticated using (true) with check (true);
create policy "Admin all prayers" on public.prayers for all to authenticated using (true) with check (true);
create policy "Admin all bookings" on public.bookings for all to authenticated using (true) with check (true);
create policy "Admin all polls" on public.polls for all to authenticated using (true) with check (true);

-- ============================================================================
-- FUNÇÕES RPC SEGURAS (para votar na enquete e clicar em "Estou rezando")
-- ============================================================================
create or replace function public.increment_prayer_count(prayer_id text)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.prayers
  set prayed_count = coalesce(prayed_count, 0) + 1
  where id = prayer_id and is_public = true and approved = true;
$$;

create or replace function public.vote_poll_option(target_poll_id text, target_option_id text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_options jsonb;
begin
  select jsonb_agg(
    case
      when elem->>'id' = target_option_id
      then jsonb_set(elem, '{votes}', to_jsonb(coalesce((elem->>'votes')::int, 0) + 1))
      else elem
    end
  )
  into updated_options
  from public.polls, jsonb_array_elements(options) as elem
  where id = target_poll_id and active = true;

  if updated_options is not null then
    update public.polls set options = updated_options where id = target_poll_id;
  end if;
end;
$$;

grant execute on function public.increment_prayer_count(text) to anon, authenticated;
grant execute on function public.vote_poll_option(text, text) to anon, authenticated;

-- Inserção dos 2 álbuns iniciais com links oficiais
insert into public.albums (
  id, title, year, cover_url, description,
  spotify_url, youtube_url, youtube_music_url, apple_music_url, deezer_url, amazon_music_url, tidal_url, sort_order
) values
  (
    'alb-eu-nao-morri',
    'Eu Não Morri em Vão',
    '2023',
    './assets/img/capa-eu-nao-morri-em-vao.jpg',
    'Um convite profundo à fé, ao perdão e à esperança no amor redentor de Cristo. Reúne 10 canções de adoração, entrega e devoção mariana.',
    'https://open.spotify.com/intl-pt/album/5mzHspGLcO4W63muX8bvrH',
    'https://www.youtube.com/playlist?list=OLAK5uy_mGogJUuDO79hlbUGs-uAjOo2Kg0PX6cvQ',
    'https://music.youtube.com/playlist?list=OLAK5uy_mGogJUuDO79hlbUGs-uAjOo2Kg0PX6cvQ',
    'https://music.apple.com/br/album/eu-n%C3%A3o-morri-em-v%C3%A3o/1713822740',
    'https://www.deezer.com/album/504873461',
    'https://music.amazon.com/albums/B0CLX12K59',
    'https://tidal.com/browse/album/324558487',
    1
  ),
  (
    'alb-minha-obra',
    'Minha Obra',
    '2023',
    './assets/img/capa-minha-obra.jpg',
    '10 canções que celebram a ação transformadora de Deus em cada vida — cura interior, vocação e o chamado para sermos instrumentos de Sua graça.',
    'https://open.spotify.com/intl-pt/album/2LAzjFP68xMJDWUUe91R5F',
    'https://www.youtube.com/playlist?list=OLAK5uy_mtfnEn_iW-hJfpXxN67cfxrT7LX-CC6Zk',
    'https://music.youtube.com/playlist?list=OLAK5uy_mtfnEn_iW-hJfpXxN67cfxrT7LX-CC6Zk',
    'https://music.apple.com/br/album/minha-obra/1713821377',
    'https://www.deezer.com/album/504873081',
    'https://music.amazon.com/albums/B0CLWYJRW5',
    'https://tidal.com/browse/album/324558289',
    2
  )
on conflict (id) do update set
  spotify_url = excluded.spotify_url,
  youtube_url = excluded.youtube_url,
  youtube_music_url = excluded.youtube_music_url,
  apple_music_url = excluded.apple_music_url,
  deezer_url = excluded.deezer_url,
  amazon_music_url = excluded.amazon_music_url,
  tidal_url = excluded.tidal_url;

-- Inserção da agenda inicial real do ministério
insert into public.events (
  id, title, category, event_date, event_time, location, address, description, poster_url, featured
) values
  (
    'evt-1',
    'FEMUP 2026 — Paróquia Nossa Senhora de Guadalupe',
    'Show',
    '2026-11-28',
    '13:45',
    'Paróquia Nossa Senhora de Guadalupe — Inhaúma',
    'Travessa Chiapas, s/n, Inhaúma, Rio de Janeiro - RJ',
    'Festival de Música Paroquial (FEMUP 2026) na Paróquia Nossa Senhora de Guadalupe (Travessa Chiapas, s/n — Inhaúma). Informações: @pnsg.guadalupe • (21) 97187-3170.',
    './assets/img/evento-femup-2026.jpg',
    true
  ),
  (
    'evt-2',
    'Rosas de Guadalupe — Festa da Padroeira',
    'Show',
    '2026-12-12',
    '19:30',
    'Paróquia Nossa Senhora de Guadalupe — Inhaúma',
    'Travessa Chiapas, s/n, Inhaúma, Rio de Janeiro - RJ',
    'Evento especial Rosas de Guadalupe na Festa da Padroeira Nossa Senhora de Guadalupe. Venha celebrar e louvar conosco!',
    null,
    true
  ),
  (
    'evt-3',
    'Santa Missa Dominical',
    'Missa',
    'Domingos',
    '07:00',
    'Paróquia Nossa Senhora de Guadalupe — Inhaúma',
    'Travessa Chiapas, s/n, Inhaúma, Rio de Janeiro - RJ',
    'Santa Missa todos os domingos às 07:00h na Paróquia Nossa Senhora de Guadalupe com o Ministério Razão de Viver.',
    null,
    false
  )
on conflict (id) do nothing;

-- Inserção da enquete inicial de repertório
insert into public.polls (id, question, active, options) values
  (
    'poll-1',
    'Qual música não pode faltar na nossa próxima apresentação?',
    true,
    '[
      {"id":"opt-1","label":"Eu Não Morri em Vão","votes":0},
      {"id":"opt-2","label":"Tudo Posso","votes":0},
      {"id":"opt-3","label":"Cura","votes":0},
      {"id":"opt-4","label":"Mãe da Igreja","votes":0},
      {"id":"opt-5","label":"O Senhor Está Aqui","votes":0}
    ]'::jsonb
  )
on conflict (id) do nothing;
