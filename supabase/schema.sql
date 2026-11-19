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
-- SEGURANÇA (Row Level Security — RLS)
-- ============================================================================
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

-- Envio público (pedidos de oração e convites)
create policy "Public insert prayers" on public.prayers for insert with check (true);
create policy "Public insert bookings" on public.bookings for insert with check (true);

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
as $$
  update public.prayers
  set prayed_count = coalesce(prayed_count, 0) + 1
  where id = prayer_id and is_public = true and approved = true;
$$;

create or replace function public.vote_poll_option(target_poll_id text, target_option_id text)
returns void
language plpgsql
security definer
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
    'https://open.spotify.com/search/Minist%C3%A9rio%20Raz%C3%A3o%20de%20Viver',
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
    'https://open.spotify.com/search/Minist%C3%A9rio%20Raz%C3%A3o%20de%20Viver',
    'https://www.youtube.com/playlist?list=OLAK5uy_mtfnEn_iW-hJfpXxN67cfxrT7LX-CC6Zk',
    'https://music.youtube.com/playlist?list=OLAK5uy_mtfnEn_iW-hJfpXxN67cfxrT7LX-CC6Zk',
    'https://music.apple.com/br/album/minha-obra/1713821377',
    'https://www.deezer.com/album/504873081',
    'https://music.amazon.com/albums/B0CLWYJRW5',
    'https://tidal.com/browse/album/324558289',
    2
  )
on conflict (id) do nothing;
