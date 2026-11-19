/**
 * Camada unificada de dados (Store) para o Ministério Razão de Viver.
 *
 * - Funciona 100% no Modo Local (localStorage) sem precisar de servidor ou banco.
 * - Se `CONFIG.supabaseUrl` e `CONFIG.supabaseAnonKey` estiverem preenchidos em js/config.js,
 *   conecta automaticamente ao Supabase (banco Postgres + autenticação gratuita).
 */
import { CONFIG } from './config.js';
import { SEED_DATA } from './seed-data.js';

const STORAGE_KEY = 'mrv_app_state_v1';
const DATA_VERSION = 5;
const VOTED_POLLS_KEY = 'mrv_voted_polls_v1';
const PRAYED_IDS_KEY = 'mrv_prayed_ids_v1';
const ADMIN_SESSION_KEY = 'mrv_admin_session_v1';

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

class AppStore {
  constructor() {
    this.mode = (CONFIG.supabaseUrl && CONFIG.supabaseAnonKey) ? 'supabase' : 'local';
    this.supabase = null;
    this.state = clone(SEED_DATA);
    this.isAdmin = false;
    this.adminEmail = '';
    this.listeners = new Set();
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.state));
  }

  async init() {
    if (this.mode === 'supabase') {
      try {
        const mod = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        this.supabase = mod.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
        const { data: { session } } = await this.supabase.auth.getSession();
        this.isAdmin = Boolean(session?.user);
        this.adminEmail = session?.user?.email || '';
        await this.refreshFromSupabase();
      } catch (err) {
        console.warn('Falha ao iniciar Supabase, usando Modo Local como reserva:', err);
        this.mode = 'local';
        this.loadLocal();
      }
    } else {
      this.loadLocal();
      this.isAdmin = sessionStorage.getItem(ADMIN_SESSION_KEY) === '1';
    }
    this.notify();
  }

  loadLocal() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = {
          ...clone(SEED_DATA),
          ...parsed,
          settings: { ...SEED_DATA.settings, ...(parsed.settings || {}) },
        };
        // Migração automática para versão 2 e 3: aplica links oficiais, capa oficial de "Minha Obra"
        // e as 10 cifras oficiais do CD "Eu Não Morri em Vão" sem apagar eventos/orações do usuário.
        if ((parsed._dataVersion || 1) < DATA_VERSION) {
          this.state.settings.youtubeUrl = SEED_DATA.settings.youtubeUrl;
          this.state.settings.youtubeMusicUrl = SEED_DATA.settings.youtubeMusicUrl;
          this.state.settings.appleMusicUrl = SEED_DATA.settings.appleMusicUrl;
          this.state.settings.deezerUrl = SEED_DATA.settings.deezerUrl;
          this.state.settings.amazonMusicUrl = SEED_DATA.settings.amazonMusicUrl;
          this.state.settings.tidalUrl = SEED_DATA.settings.tidalUrl;
          this.state.albums = (this.state.albums || []).map((alb) => {
            const seedAlb = SEED_DATA.albums.find((s) => s.id === alb.id);
            if (!seedAlb) return alb;
            return {
              ...alb,
              cover: seedAlb.cover,
              releaseDate: seedAlb.releaseDate,
              youtubeUrl: seedAlb.youtubeUrl,
              youtubeMusicUrl: seedAlb.youtubeMusicUrl,
              appleMusicUrl: seedAlb.appleMusicUrl,
              deezerUrl: seedAlb.deezerUrl,
              amazonMusicUrl: seedAlb.amazonMusicUrl,
              tidalUrl: seedAlb.tidalUrl,
              spotifyUrl: seedAlb.spotifyUrl,
            };
          });
          if ((parsed._dataVersion || 1) < 3) {
            this.state.tracks = (this.state.tracks || []).map((trk) => {
              const seedTrk = SEED_DATA.tracks.find((s) => s.id === trk.id && s.albumId === 'alb-eu-nao-morri');
              return seedTrk ? { ...trk, title: seedTrk.title, key: seedTrk.key, lyricsChords: seedTrk.lyricsChords } : trk;
            });
          }
          if ((parsed._dataVersion || 1) < 5) {
            // Substitui os placeholders iniciais do CD "Minha Obra" pelas 10 faixas oficiais com letras e cifras
            const otherTracks = (this.state.tracks || []).filter((t) => t.albumId !== 'alb-minha-obra');
            const minhaObraTracks = clone(SEED_DATA.tracks.filter((t) => t.albumId === 'alb-minha-obra'));
            this.state.tracks = [...otherTracks, ...minhaObraTracks];
          }
          this.state._dataVersion = DATA_VERSION;
          this.saveLocal();
        }
      } else {
        this.state = { ...clone(SEED_DATA), _dataVersion: DATA_VERSION };
        this.saveLocal();
      }
    } catch {
      this.state = { ...clone(SEED_DATA), _dataVersion: DATA_VERSION };
    }
  }

  saveLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Erro ao salvar no navegador:', e);
    }
  }

  async refreshFromSupabase() {
    if (!this.supabase) return;
    const [settingsRes, albumsRes, tracksRes, eventsRes, prayersRes, pollsRes] = await Promise.all([
      this.supabase.from('settings').select('*').eq('id', 1).maybeSingle(),
      this.supabase.from('albums').select('*').order('sort_order', { ascending: true }),
      this.supabase.from('tracks').select('*').order('track_number', { ascending: true }),
      this.supabase.from('events').select('*').order('event_date', { ascending: true }),
      this.supabase.from('prayers').select('*').order('created_at', { ascending: false }),
      this.supabase.from('polls').select('*').order('created_at', { ascending: false }),
    ]);

    if (settingsRes.data?.data) {
      this.state.settings = { ...SEED_DATA.settings, ...settingsRes.data.data };
    }
    if (albumsRes.data?.length) {
      this.state.albums = albumsRes.data.map((a) => ({
        id: a.id,
        title: a.title,
        year: a.year,
        cover: a.cover_url,
        description: a.description,
        spotifyUrl: a.spotify_url || '',
        youtubeUrl: a.youtube_url || '',
        youtubeMusicUrl: a.youtube_music_url || '',
        appleMusicUrl: a.apple_music_url || '',
        deezerUrl: a.deezer_url || '',
        amazonMusicUrl: a.amazon_music_url || '',
        tidalUrl: a.tidal_url || '',
      }));
    }
    if (tracksRes.data?.length) {
      this.state.tracks = tracksRes.data.map((t) => ({
        id: t.id,
        albumId: t.album_id,
        number: t.track_number,
        title: t.title,
        duration: t.duration || '',
        key: t.musical_key || '',
        bpm: t.bpm || '',
        listenUrl: t.listen_url || '',
        lyricsChords: t.lyrics_chords || '',
      }));
    }
    if (eventsRes.data) {
      this.state.events = eventsRes.data.map((e) => ({
        id: e.id,
        title: e.title,
        category: e.category,
        date: e.event_date,
        time: e.event_time,
        location: e.location,
        address: e.address || '',
        description: e.description || '',
        featured: Boolean(e.featured),
      }));
    }
    if (prayersRes.data) {
      this.state.prayers = prayersRes.data.map((p) => ({
        id: p.id,
        name: p.name,
        intention: p.intention,
        isPublic: Boolean(p.is_public),
        approved: Boolean(p.approved),
        prayedCount: p.prayed_count || 0,
        status: p.status || 'novo',
        createdAt: p.created_at,
      }));
    }
    if (pollsRes.data?.length) {
      this.state.polls = pollsRes.data.map((pl) => ({
        id: pl.id,
        question: pl.question,
        active: Boolean(pl.active),
        options: Array.isArray(pl.options) ? pl.options : [],
      }));
    }
    if (this.isAdmin) {
      const bookingsRes = await this.supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (bookingsRes.data) {
        this.state.bookings = bookingsRes.data.map((b) => ({
          id: b.id,
          name: b.name,
          parish: b.parish || '',
          eventType: b.event_type || '',
          eventDate: b.event_date || '',
          city: b.city || '',
          phone: b.phone || '',
          message: b.message || '',
          status: b.status || 'novo',
          createdAt: b.created_at,
        }));
      }
    }
    this.notify();
  }

  // ---------- AUTENTICAÇÃO ADMIN ----------
  async loginAdmin({ pin, email, password }) {
    if (this.mode === 'supabase' && this.supabase) {
      const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error('E-mail ou senha incorretos no Supabase.');
      this.isAdmin = true;
      this.adminEmail = data.user?.email || email;
      await this.refreshFromSupabase();
      return true;
    }

    if (String(pin).trim() !== String(CONFIG.localAdminPin).trim()) {
      throw new Error('PIN incorreto. O PIN padrão de demonstração é ' + CONFIG.localAdminPin + '.');
    }
    this.isAdmin = true;
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    this.notify();
    return true;
  }

  async logoutAdmin() {
    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.auth.signOut();
    }
    this.isAdmin = false;
    this.adminEmail = '';
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    this.notify();
  }

  // ---------- AÇÕES PÚBLICAS ----------
  async submitPrayer({ name, intention, isPublic }) {
    const item = {
      id: uid('pry'),
      name: name.trim() || 'Anônimo',
      intention: intention.trim(),
      isPublic: Boolean(isPublic),
      // No modo local, se público já aparece no mural para teste imediato;
      // o admin pode moderar/ocultar a qualquer momento.
      approved: Boolean(isPublic),
      prayedCount: 1,
      status: 'novo',
      createdAt: new Date().toISOString(),
    };

    if (this.mode === 'supabase' && this.supabase) {
      const { error } = await this.supabase.from('prayers').insert({
        id: item.id,
        name: item.name,
        intention: item.intention,
        is_public: item.isPublic,
        approved: false, // no modo nuvem, admin aprova antes de ir ao mural público
        prayed_count: 1,
        status: 'novo',
      });
      if (error) throw error;
      await this.refreshFromSupabase();
      return item;
    }

    this.state.prayers.unshift(item);
    this.saveLocal();
    this.notify();
    return item;
  }

  hasPrayedFor(prayerId) {
    try {
      const list = JSON.parse(localStorage.getItem(PRAYED_IDS_KEY) || '[]');
      return list.includes(prayerId);
    } catch {
      return false;
    }
  }

  async incrementPrayerCount(prayerId) {
    if (this.hasPrayedFor(prayerId)) return false;
    const prayer = this.state.prayers.find((p) => p.id === prayerId);
    if (!prayer) return false;

    prayer.prayedCount = (prayer.prayedCount || 0) + 1;
    try {
      const list = JSON.parse(localStorage.getItem(PRAYED_IDS_KEY) || '[]');
      list.push(prayerId);
      localStorage.setItem(PRAYED_IDS_KEY, JSON.stringify(list));
    } catch {}

    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.rpc('increment_prayer_count', { prayer_id: prayerId });
    } else {
      this.saveLocal();
    }
    this.notify();
    return true;
  }

  async submitBooking(payload) {
    const item = {
      id: uid('bkg'),
      name: payload.name.trim(),
      parish: payload.parish.trim(),
      eventType: payload.eventType,
      eventDate: payload.eventDate,
      city: payload.city.trim(),
      phone: payload.phone.trim(),
      message: payload.message.trim(),
      status: 'novo',
      createdAt: new Date().toISOString(),
    };

    if (this.mode === 'supabase' && this.supabase) {
      const { error } = await this.supabase.from('bookings').insert({
        id: item.id,
        name: item.name,
        parish: item.parish,
        event_type: item.eventType,
        event_date: item.eventDate,
        city: item.city,
        phone: item.phone,
        message: item.message,
        status: 'novo',
      });
      if (error) throw error;
      return item;
    }

    this.state.bookings.unshift(item);
    this.saveLocal();
    this.notify();
    return item;
  }

  getVotedOption(pollId) {
    try {
      const map = JSON.parse(localStorage.getItem(VOTED_POLLS_KEY) || '{}');
      return map[pollId] || null;
    } catch {
      return null;
    }
  }

  async votePoll(pollId, optionId) {
    if (this.getVotedOption(pollId)) return false;
    const poll = this.state.polls.find((p) => p.id === pollId);
    if (!poll) return false;
    const opt = poll.options.find((o) => o.id === optionId);
    if (!opt) return false;

    opt.votes = (opt.votes || 0) + 1;
    try {
      const map = JSON.parse(localStorage.getItem(VOTED_POLLS_KEY) || '{}');
      map[pollId] = optionId;
      localStorage.setItem(VOTED_POLLS_KEY, JSON.stringify(map));
    } catch {}

    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.rpc('vote_poll_option', { target_poll_id: pollId, target_option_id: optionId });
    } else {
      this.saveLocal();
    }
    this.notify();
    return true;
  }

  // ---------- AÇÕES ADMIN ----------
  async saveSettings(partial) {
    this.state.settings = { ...this.state.settings, ...partial };
    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('settings').upsert({ id: 1, data: this.state.settings });
    } else {
      this.saveLocal();
    }
    this.notify();
  }

  async saveEvent(evt) {
    const isNew = !evt.id;
    const record = {
      id: evt.id || uid('evt'),
      title: evt.title.trim(),
      category: evt.category || 'Missa',
      date: evt.date,
      time: evt.time,
      location: evt.location.trim(),
      address: (evt.address || '').trim(),
      description: (evt.description || '').trim(),
      featured: Boolean(evt.featured),
    };

    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('events').upsert({
        id: record.id,
        title: record.title,
        category: record.category,
        event_date: record.date,
        event_time: record.time,
        location: record.location,
        address: record.address,
        description: record.description,
        featured: record.featured,
      });
      await this.refreshFromSupabase();
      return;
    }

    if (isNew) {
      this.state.events.push(record);
    } else {
      const idx = this.state.events.findIndex((e) => e.id === record.id);
      if (idx >= 0) this.state.events[idx] = record;
    }
    this.state.events.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    this.saveLocal();
    this.notify();
  }

  async deleteEvent(id) {
    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('events').delete().eq('id', id);
    }
    this.state.events = this.state.events.filter((e) => e.id !== id);
    this.saveLocal();
    this.notify();
  }

  async saveTrack(track) {
    const isNew = !track.id;
    const albumTracks = this.state.tracks.filter((t) => t.albumId === track.albumId);
    const record = {
      id: track.id || uid('trk'),
      albumId: track.albumId,
      number: Number(track.number) || albumTracks.length + 1,
      title: track.title.trim(),
      duration: (track.duration || '').trim(),
      key: (track.key || '').trim(),
      bpm: (track.bpm || '').trim(),
      listenUrl: (track.listenUrl || '').trim(),
      lyricsChords: track.lyricsChords || '',
    };

    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('tracks').upsert({
        id: record.id,
        album_id: record.albumId,
        track_number: record.number,
        title: record.title,
        duration: record.duration,
        musical_key: record.key,
        bpm: record.bpm,
        listen_url: record.listenUrl,
        lyrics_chords: record.lyricsChords,
      });
      await this.refreshFromSupabase();
      return;
    }

    if (isNew) {
      this.state.tracks.push(record);
    } else {
      const idx = this.state.tracks.findIndex((t) => t.id === record.id);
      if (idx >= 0) this.state.tracks[idx] = record;
    }
    this.state.tracks.sort((a, b) => a.number - b.number);
    this.saveLocal();
    this.notify();
  }

  async deleteTrack(id) {
    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('tracks').delete().eq('id', id);
    }
    this.state.tracks = this.state.tracks.filter((t) => t.id !== id);
    this.saveLocal();
    this.notify();
  }

  async updateAlbumLinks(albumId, updates) {
    const alb = this.state.albums.find((a) => a.id === albumId);
    if (!alb) return;
    Object.assign(alb, updates);
    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('albums').update({
        title: alb.title,
        year: alb.year,
        description: alb.description,
        spotify_url: alb.spotifyUrl,
        youtube_url: alb.youtubeUrl,
        youtube_music_url: alb.youtubeMusicUrl,
        apple_music_url: alb.appleMusicUrl,
        deezer_url: alb.deezerUrl,
        amazon_music_url: alb.amazonMusicUrl,
        tidal_url: alb.tidalUrl,
      }).eq('id', albumId);
    } else {
      this.saveLocal();
    }
    this.notify();
  }

  async updatePrayer(id, updates) {
    const item = this.state.prayers.find((p) => p.id === id);
    if (!item) return;
    Object.assign(item, updates);
    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('prayers').update({
        approved: item.approved,
        status: item.status,
      }).eq('id', id);
    } else {
      this.saveLocal();
    }
    this.notify();
  }

  async deletePrayer(id) {
    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('prayers').delete().eq('id', id);
    }
    this.state.prayers = this.state.prayers.filter((p) => p.id !== id);
    this.saveLocal();
    this.notify();
  }

  async updateBookingStatus(id, status) {
    const item = this.state.bookings.find((b) => b.id === id);
    if (!item) return;
    item.status = status;
    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('bookings').update({ status }).eq('id', id);
    } else {
      this.saveLocal();
    }
    this.notify();
  }

  async deleteBooking(id) {
    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('bookings').delete().eq('id', id);
    }
    this.state.bookings = this.state.bookings.filter((b) => b.id !== id);
    this.saveLocal();
    this.notify();
  }

  async savePoll(pollData) {
    const record = {
      id: pollData.id || uid('poll'),
      question: pollData.question.trim(),
      active: true,
      options: pollData.options.map((label, idx) => ({
        id: `opt-${idx + 1}-${Date.now().toString(36).slice(-3)}`,
        label: label.trim(),
        votes: 0,
      })),
    };

    // Desativa enquetes anteriores para manter a nova em destaque
    this.state.polls.forEach((p) => { p.active = false; });
    this.state.polls.unshift(record);

    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('polls').update({ active: false }).neq('id', record.id);
      await this.supabase.from('polls').insert({
        id: record.id,
        question: record.question,
        active: true,
        options: record.options,
      });
    } else {
      this.saveLocal();
    }
    this.notify();
  }

  async deletePoll(id) {
    if (this.mode === 'supabase' && this.supabase) {
      await this.supabase.from('polls').delete().eq('id', id);
    }
    this.state.polls = this.state.polls.filter((p) => p.id !== id);
    this.saveLocal();
    this.notify();
  }

  exportJson() {
    return JSON.stringify(this.state, null, 2);
  }

  importJson(raw) {
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.settings || !Array.isArray(parsed.albums)) {
      throw new Error('Arquivo de backup inválido.');
    }
    this.state = parsed;
    this.saveLocal();
    this.notify();
  }

  resetDemoData() {
    this.state = clone(SEED_DATA);
    localStorage.removeItem(VOTED_POLLS_KEY);
    localStorage.removeItem(PRAYED_IDS_KEY);
    this.saveLocal();
    this.notify();
  }
}

export const store = new AppStore();
