/**
 * Telas públicas do App Ministério Razão de Viver:
 *  - Início (Home)
 *  - Músicas, Plataformas, Letras & Cifras (com transposição de tom)
 *  - Agenda (com filtros e rotas Google Maps)
 *  - Interagir (Pedidos de Oração, Convites / WhatsApp, Enquetes de Repertório)
 *  - Sobre o Ministério
 */
import { store } from './store.js';
import { renderChordSheet, transposeKey } from './chords.js';

export function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const MONTHS_PT = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

export function parseEventDate(isoDate) {
  if (!isoDate) return { day: '--', month: '---', full: '' };
  if (!isoDate.includes('-')) {
    const label = String(isoDate).trim();
    const isWeekly = /^doming|^segund|^terç|^terc|^quart|^quint|^sext|^sábad|^sabad/i.test(label);
    return {
      day: label.slice(0, 3).toUpperCase(),
      month: isWeekly ? 'SEMANAL' : 'FIXO',
      full: label,
    };
  }
  const [y, m, d] = isoDate.split('-');
  const monthIdx = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
  return {
    day: d,
    month: MONTHS_PT[monthIdx] || m,
    full: `${d}/${m}/${y}`,
  };
}

function mapsUrl(address, location) {
  const q = encodeURIComponent(address || location || 'Paróquia Nossa Senhora de Guadalupe, Rio de Janeiro');
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function whatsappLink(number, text) {
  const digits = String(number || '').replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

// Estado local de UI (filtros e aba ativa)
const uiState = {
  selectedAlbumId: 'all',
  trackSearch: '',
  agendaCategory: 'Todos',
  interactTab: 'prayers', // prayers | booking | poll
};

function renderPlatformsStrip(settings) {
  const items = [
    { label: 'YouTube', sub: 'Canal oficial', url: settings.youtubeUrl, cls: 'plat-youtube', icon: '▶' },
    { label: 'YouTube Music', sub: 'Ouvir álbum', url: settings.youtubeMusicUrl, cls: 'plat-ytmusic', icon: '♫' },
    { label: 'Apple Music', sub: 'Álbum oficial', url: settings.appleMusicUrl, cls: 'plat-apple', icon: '♪' },
    { label: 'Deezer', sub: 'Álbum oficial', url: settings.deezerUrl, cls: 'plat-deezer', icon: '◈' },
    { label: 'Amazon Music', sub: 'Álbum oficial', url: settings.amazonMusicUrl, cls: 'plat-amazon', icon: '♬' },
    { label: 'TIDAL', sub: 'Áudio HiFi', url: settings.tidalUrl, cls: 'plat-tidal', icon: '❖' },
    { label: 'Spotify', sub: 'Álbum oficial', url: settings.spotifyUrl, cls: 'plat-spotify', icon: '◉' },
    { label: 'Instagram', sub: settings.instagramHandle || '@razaodeviver.oficial', url: settings.instagramUrl, cls: 'plat-insta', icon: '◎' },
  ].filter((p) => p.url);

  return `
    <div class="platform-grid">
      ${items.map((p) => `
        <a class="platform-btn" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">
          <span class="platform-dot ${p.cls}" aria-hidden="true">${p.icon}</span>
          <span class="platform-meta">
            <span>${esc(p.label)}</span>
            <small>${esc(p.sub)}</small>
          </span>
        </a>
      `).join('')}
    </div>
  `;
}

// ============================================================================
// 1. INÍCIO (HOME)
// ============================================================================
export function renderHome(container, ctx) {
  const { settings, albums, events, polls } = store.state;
  const nextEvent = events[0];
  const activePoll = polls.find((p) => p.active) || polls[0];

  container.innerHTML = `
    <section class="hero-card">
      <img src="./assets/img/hero-bg.jpg?v=2" alt="Ministério Razão de Viver" class="hero-bg" />
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-pill">✝ ${esc(settings.parish)}</div>
        <h1 class="hero-title">${esc(settings.name)}</h1>
        <p class="hero-subtitle">${esc(settings.tagline)} • ${esc(settings.neighborhood)}</p>
        <div class="hero-actions">
          <button class="btn btn-gold" data-nav="music">♫ Ouvir CDs & Cifras</button>
          <button class="btn btn-outline" data-nav="interact" data-sub="prayers">🙏 Pedido de Oração</button>
          <button class="btn btn-outline" data-nav="interact" data-sub="booking">📩 Convidar Banda</button>
        </div>
      </div>
    </section>

    ${settings.heroNotice ? `
      <div class="notice-bar">
        <span>✨</span>
        <span>${esc(settings.heroNotice)}</span>
      </div>
    ` : ''}

    <div class="section-header">
      <div>
        <span class="section-kicker">Plataformas Digitais</span>
        <h2 class="section-title">Ouça e acompanhe o Ministério</h2>
      </div>
    </div>
    ${renderPlatformsStrip(settings)}

    <div class="section-header">
      <div>
        <span class="section-kicker">Discografia Oficial</span>
        <h2 class="section-title">Nossos 2 CDs Gravados</h2>
      </div>
      <button class="btn-link" data-nav="music">Ver faixas e cifras →</button>
    </div>
    <div class="albums-grid">
      ${albums.map((alb) => {
        const count = store.state.tracks.filter((t) => t.albumId === alb.id).length;
        return `
          <article class="album-card">
            <div class="album-top">
              <img src="${esc(alb.cover)}" alt="Capa do CD ${esc(alb.title)}" class="album-cover" />
              <div class="album-info">
                <span class="badge">CD • ${esc(alb.year)} • ${count} faixas</span>
                <h3>${esc(alb.title)}</h3>
                <p>${esc(alb.description)}</p>
              </div>
            </div>
            <div class="album-actions">
              <button class="btn btn-gold btn-sm" data-open-album="${esc(alb.id)}">Letras & Cifras</button>
              ${alb.youtubeUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.youtubeUrl)}" target="_blank" rel="noopener">YouTube</a>` : ''}
              ${alb.youtubeMusicUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.youtubeMusicUrl)}" target="_blank" rel="noopener">YT Music</a>` : ''}
              ${alb.appleMusicUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.appleMusicUrl)}" target="_blank" rel="noopener">Apple</a>` : ''}
              ${alb.deezerUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.deezerUrl)}" target="_blank" rel="noopener">Deezer</a>` : ''}
              ${alb.amazonMusicUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.amazonMusicUrl)}" target="_blank" rel="noopener">Amazon</a>` : ''}
              ${alb.tidalUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.tidalUrl)}" target="_blank" rel="noopener">TIDAL</a>` : ''}
              ${alb.spotifyUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.spotifyUrl)}" target="_blank" rel="noopener">Spotify</a>` : ''}
            </div>
          </article>
        `;
      }).join('')}
    </div>

    <div class="section-header">
      <div>
        <span class="section-kicker">Em Destaque</span>
        <h2 class="section-title">Próximo Evento & Participação</h2>
      </div>
    </div>
    <div class="home-grid">
      <div class="card">
        <span class="section-kicker">Próxima Agenda</span>
        ${nextEvent ? (() => {
          const dt = parseEventDate(nextEvent.date);
          return `
            <div style="display:flex;gap:14px;align-items:flex-start;margin-top:8px;">
              <div class="event-date-box">
                <span class="event-day">${esc(dt.day)}</span>
                <span class="event-month">${esc(dt.month)}</span>
              </div>
              <div>
                <span class="badge">${esc(nextEvent.category)}</span>
                <h3 style="margin:6px 0 4px;font-size:1.05rem;">${esc(nextEvent.title)}</h3>
                <p style="margin:0 0 10px;font-size:0.84rem;color:var(--text-muted);">
                  ⏰ ${esc(nextEvent.time)} • 📍 ${esc(nextEvent.location)}
                </p>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <button class="btn btn-outline btn-sm" data-nav="agenda">Ver agenda completa</button>
                  <a class="btn btn-dark btn-sm" href="${mapsUrl(nextEvent.address, nextEvent.location)}" target="_blank" rel="noopener">Como chegar</a>
                </div>
              </div>
            </div>
          `;
        })() : '<p style="color:var(--text-muted);">Nenhum evento agendado no momento. Acompanhe em breve!</p>'}
      </div>

      <div class="card">
        <span class="section-kicker">Votação de Repertório</span>
        ${activePoll ? `
          <h3 style="margin:6px 0 10px;font-size:1.05rem;">${esc(activePoll.question)}</h3>
          <p style="margin:0 0 14px;font-size:0.85rem;color:var(--text-muted);">
            Ajude o Ministério Razão de Viver a escolher as canções dos próximos encontros e missas.
          </p>
          <button class="btn btn-gold btn-sm" data-nav="interact" data-sub="poll">Votar na Enquete →</button>
        ` : `
          <h3 style="margin:6px 0 10px;font-size:1.05rem;">Fale com o Ministério</h3>
          <p style="margin:0 0 14px;font-size:0.85rem;color:var(--text-muted);">Envie intenções de oração ou convide nossa banda para sua paróquia.</p>
          <button class="btn btn-gold btn-sm" data-nav="interact">Participar agora →</button>
        `}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-nav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.sub) uiState.interactTab = btn.dataset.sub;
      ctx.navigate(btn.dataset.nav);
    });
  });

  container.querySelectorAll('[data-open-album]').forEach((btn) => {
    btn.addEventListener('click', () => {
      uiState.selectedAlbumId = btn.dataset.openAlbum;
      ctx.navigate('music');
    });
  });
}

// ============================================================================
// 2. MÚSICAS, PLATAFORMAS, LETRAS E CIFRAS
// ============================================================================
export function renderMusic(container, ctx) {
  const { albums, tracks, settings } = store.state;
  const search = uiState.trackSearch.trim().toLowerCase();

  const filteredTracks = tracks.filter((t) => {
    const matchAlbum = uiState.selectedAlbumId === 'all' || t.albumId === uiState.selectedAlbumId;
    const matchSearch = !search || t.title.toLowerCase().includes(search);
    return matchAlbum && matchSearch;
  });

  container.innerHTML = `
    <span class="section-kicker">Discografia & Cifras</span>
    <h1 class="page-title">Músicas & Plataformas</h1>
    <p class="page-lead">
      Ouça nossos dois CDs nas plataformas digitais e abra as letras e cifras com transposição automática de tom para tocar na sua paróquia ou grupo de oração.
    </p>

    ${renderPlatformsStrip(settings)}

    <div class="section-header">
      <div>
        <span class="section-kicker">Álbuns</span>
        <h2 class="section-title">Selecione um CD</h2>
      </div>
    </div>

    <div class="albums-grid">
      ${albums.map((alb) => {
        const selected = uiState.selectedAlbumId === alb.id;
        const count = tracks.filter((t) => t.albumId === alb.id).length;
        return `
          <article class="album-card ${selected ? 'selected' : ''}">
            <div class="album-top">
              <img src="${esc(alb.cover)}" alt="Capa ${esc(alb.title)}" class="album-cover" />
              <div class="album-info">
                <span class="badge">${esc(alb.year)} • ${count} faixas</span>
                <h3>${esc(alb.title)}</h3>
                <p>${esc(alb.description)}</p>
              </div>
            </div>
            <div class="album-actions">
              <button class="btn ${selected ? 'btn-gold' : 'btn-outline'} btn-sm" data-filter-album="${esc(alb.id)}">
                ${selected ? '✓ Exibindo faixas' : 'Filtrar faixas'}
              </button>
              ${alb.youtubeUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.youtubeUrl)}" target="_blank" rel="noopener">YouTube</a>` : ''}
              ${alb.youtubeMusicUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.youtubeMusicUrl)}" target="_blank" rel="noopener">YT Music</a>` : ''}
              ${alb.appleMusicUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.appleMusicUrl)}" target="_blank" rel="noopener">Apple Music</a>` : ''}
              ${alb.deezerUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.deezerUrl)}" target="_blank" rel="noopener">Deezer</a>` : ''}
              ${alb.amazonMusicUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.amazonMusicUrl)}" target="_blank" rel="noopener">Amazon</a>` : ''}
              ${alb.tidalUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.tidalUrl)}" target="_blank" rel="noopener">TIDAL</a>` : ''}
              ${alb.spotifyUrl ? `<a class="btn btn-dark btn-sm" href="${esc(alb.spotifyUrl)}" target="_blank" rel="noopener">Spotify</a>` : ''}
            </div>
          </article>
        `;
      }).join('')}
    </div>

    <div class="section-header">
      <div>
        <span class="section-kicker">Repertório</span>
        <h2 class="section-title">Faixas, Letras & Cifras (${filteredTracks.length})</h2>
      </div>
      ${uiState.selectedAlbumId !== 'all' ? `<button class="btn-link" id="btn-show-all-albums">Mostrar ambos os CDs</button>` : ''}
    </div>

    <div class="track-search-row">
      <input
        type="search"
        id="track-search-input"
        class="input"
        placeholder="Buscar música pelo nome..."
        value="${esc(uiState.trackSearch)}"
      />
    </div>

    <div class="track-list">
      ${filteredTracks.length ? filteredTracks.map((trk) => {
        const alb = albums.find((a) => a.id === trk.albumId);
        const hasLyrics = Boolean(trk.lyricsChords && trk.lyricsChords.trim());
        return `
          <div class="track-row">
            <span class="track-num">${String(trk.number).padStart(2, '0')}</span>
            <div class="track-main">
              <div class="track-title">${esc(trk.title)}</div>
              <div class="track-meta">
                <span>💿 ${esc(alb?.title || '')}</span>
                ${trk.key ? `<span>🎸 Tom: <strong>${esc(trk.key)}</strong></span>` : ''}
                ${trk.duration ? `<span>⏱ ${esc(trk.duration)}</span>` : ''}
              </div>
            </div>
            <div class="track-actions">
              <button class="btn ${hasLyrics ? 'btn-gold' : 'btn-outline'} btn-sm" data-open-track="${esc(trk.id)}">
                ${hasLyrics ? 'Letra & Cifra' : 'Ver faixa'}
              </button>
            </div>
          </div>
        `;
      }).join('') : `
        <div class="card-subtle" style="text-align:center;color:var(--text-muted);">
          Nenhuma música encontrada para "${esc(uiState.trackSearch)}".
        </div>
      `}
    </div>
  `;

  container.querySelectorAll('[data-filter-album]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.filterAlbum;
      uiState.selectedAlbumId = uiState.selectedAlbumId === id ? 'all' : id;
      renderMusic(container, ctx);
    });
  });

  const allBtn = container.querySelector('#btn-show-all-albums');
  if (allBtn) {
    allBtn.addEventListener('click', () => {
      uiState.selectedAlbumId = 'all';
      renderMusic(container, ctx);
    });
  }

  const searchInput = container.querySelector('#track-search-input');
  searchInput.addEventListener('input', (e) => {
    uiState.trackSearch = e.target.value;
    renderMusic(container, ctx);
    const nextInput = container.querySelector('#track-search-input');
    nextInput.focus();
    nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
  });

  container.querySelectorAll('[data-open-track]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const track = store.state.tracks.find((t) => t.id === btn.dataset.openTrack);
      if (track) openTrackSheetModal(track, ctx);
    });
  });
}

function openTrackSheetModal(track, ctx) {
  const album = store.state.albums.find((a) => a.id === track.albumId);
  let semitones = 0;
  let showChords = true;
  let preferFlats = false;
  let fontSize = 15;

  function renderModalContent() {
    const currentKey = track.key ? transposeKey(track.key, semitones, preferFlats) : '—';
    const semitoneLabel = semitones === 0 ? 'Original' : (semitones > 0 ? `+${semitones}` : `${semitones}`);

    const html = `
      <div class="chord-toolbar">
        <button class="btn ${showChords ? 'btn-gold' : 'btn-dark'} btn-sm" id="btn-toggle-chords">
          ${showChords ? '🎸 Cifras: ON' : '📄 Só Letra'}
        </button>

        <div class="transpose-group" aria-label="Transpor tom">
          <button id="btn-tr-down" title="Baixar meio tom">−½</button>
          <span class="transpose-readout">Tom: ${esc(currentKey)} (${semitoneLabel})</span>
          <button id="btn-tr-up" title="Subir meio tom">+½</button>
        </div>

        <button class="btn btn-dark btn-sm" id="btn-tr-reset">Resetar</button>
        <button class="btn btn-dark btn-sm" id="btn-toggle-flats" title="Alternar sustenido ou bemol">
          ${preferFlats ? 'Bemol (b)' : 'Sustenido (#)'}
        </button>
        <button class="btn btn-dark btn-sm" id="btn-font-dec" title="Diminuir letra">A−</button>
        <button class="btn btn-dark btn-sm" id="btn-font-inc" title="Aumentar letra">A+</button>
        <button class="btn btn-outline btn-sm" id="btn-copy-sheet">📋 Copiar</button>
      </div>

      <div class="chord-sheet" id="chord-sheet-view" style="font-size:${fontSize}px;">
        ${renderChordSheet(track.lyricsChords, { showChords, semitones, preferFlats })}
      </div>

      <div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center;">
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${album?.spotifyUrl ? `<a class="btn btn-dark btn-sm" href="${esc(album.spotifyUrl)}" target="_blank" rel="noopener">◉ Spotify</a>` : ''}
          ${album?.youtubeMusicUrl ? `<a class="btn btn-dark btn-sm" href="${esc(track.listenUrl || album.youtubeMusicUrl)}" target="_blank" rel="noopener">♫ YouTube Music</a>` : ''}
          ${album?.youtubeUrl ? `<a class="btn btn-dark btn-sm" href="${esc(album.youtubeUrl)}" target="_blank" rel="noopener">▶ YouTube</a>` : ''}
          ${album?.appleMusicUrl ? `<a class="btn btn-dark btn-sm" href="${esc(album.appleMusicUrl)}" target="_blank" rel="noopener">♪ Apple Music</a>` : ''}
          ${album?.deezerUrl ? `<a class="btn btn-dark btn-sm" href="${esc(album.deezerUrl)}" target="_blank" rel="noopener">◈ Deezer</a>` : ''}
        </div>
        <button class="btn-link" id="btn-edit-from-modal">Editar no Painel da Banda →</button>
      </div>
    `;

    ctx.openModal({
      title: track.title,
      subtitle: `CD "${album?.title || ''}" ${track.bpm ? `• ${track.bpm} BPM` : ''} ${track.duration ? `• ${track.duration}` : ''}`,
      html,
    });

    const body = document.getElementById('modal-body');
    body.querySelector('#btn-toggle-chords').addEventListener('click', () => {
      showChords = !showChords;
      renderModalContent();
    });
    body.querySelector('#btn-tr-down').addEventListener('click', () => {
      semitones = semitones <= -6 ? 6 : semitones - 1;
      renderModalContent();
    });
    body.querySelector('#btn-tr-up').addEventListener('click', () => {
      semitones = semitones >= 6 ? -6 : semitones + 1;
      renderModalContent();
    });
    body.querySelector('#btn-tr-reset').addEventListener('click', () => {
      semitones = 0;
      renderModalContent();
    });
    body.querySelector('#btn-toggle-flats').addEventListener('click', () => {
      preferFlats = !preferFlats;
      renderModalContent();
    });
    body.querySelector('#btn-font-dec').addEventListener('click', () => {
      fontSize = Math.max(12, fontSize - 2);
      renderModalContent();
    });
    body.querySelector('#btn-font-inc').addEventListener('click', () => {
      fontSize = Math.min(24, fontSize + 2);
      renderModalContent();
    });
    body.querySelector('#btn-copy-sheet').addEventListener('click', async () => {
      const text = body.querySelector('#chord-sheet-view').innerText;
      try {
        await navigator.clipboard.writeText(`${track.title} — Ministério Razão de Viver\nTom: ${currentKey}\n\n${text}`);
        ctx.toast('Letra/cifra copiada para a área de transferência!');
      } catch {
        ctx.toast('Não foi possível copiar automaticamente.', true);
      }
    });
    body.querySelector('#btn-edit-from-modal').addEventListener('click', () => {
      ctx.closeModal();
      ctx.navigate('admin');
    });
  }

  renderModalContent();
}

// ============================================================================
// 3. AGENDA
// ============================================================================
export function renderAgenda(container, ctx) {
  const { events } = store.state;
  const categories = ['Todos', 'Missa', 'Adoração', 'Show', 'Retiro', 'Grupo de Oração'];
  const filtered = uiState.agendaCategory === 'Todos'
    ? events
    : events.filter((e) => e.category === uiState.agendaCategory);

  container.innerHTML = `
    <span class="section-kicker">Programação</span>
    <h1 class="page-title">Agenda do Ministério</h1>
    <p class="page-lead">
      Acompanhe nossas próximas missas, noites de louvor, retiros e eventos. Quer levar o Ministério Razão de Viver para a sua paróquia?
      <button class="btn-link" id="btn-agenda-invite">Envie um convite →</button>
    </p>

    <div class="filter-pills">
      ${categories.map((cat) => `
        <button class="pill-btn ${uiState.agendaCategory === cat ? 'active' : ''}" data-cat="${esc(cat)}">
          ${esc(cat)}
        </button>
      `).join('')}
    </div>

    <div class="event-list">
      ${filtered.length ? filtered.map((evt) => {
        const dt = parseEventDate(evt.date);
        return `
          <article class="event-card ${evt.featured ? 'featured' : ''}">
            <div class="event-date-box">
              <span class="event-day">${esc(dt.day)}</span>
              <span class="event-month">${esc(dt.month)}</span>
            </div>
            <div class="event-body">
              <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <span class="badge">${esc(evt.category)}</span>
                ${evt.featured ? '<span class="badge badge-success">★ Destaque</span>' : ''}
              </div>
              <h3>${esc(evt.title)}</h3>
              <div class="event-meta">
                <span>📅 ${esc(dt.full)}</span>
                <span>⏰ ${esc(evt.time)}</span>
                <span>📍 ${esc(evt.location)}</span>
              </div>
              ${evt.description ? `<p class="event-desc">${esc(evt.description)}</p>` : ''}
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                ${evt.poster ? `<button class="btn btn-gold btn-sm" data-poster-event="${esc(evt.id)}">🖼 Ver Cartaz</button>` : ''}
                <a class="btn btn-outline btn-sm" href="${mapsUrl(evt.address, evt.location)}" target="_blank" rel="noopener">
                  📍 Abrir no Mapa
                </a>
                <button class="btn btn-dark btn-sm" data-share-event="${esc(evt.id)}">
                  ↗ Compartilhar
                </button>
              </div>
            </div>
          </article>
        `;
      }).join('') : `
        <div class="card" style="text-align:center;color:var(--text-muted);">
          Nenhum evento encontrado na categoria "${esc(uiState.agendaCategory)}".
        </div>
      `}
    </div>
  `;

  container.querySelector('#btn-agenda-invite').addEventListener('click', () => {
    uiState.interactTab = 'booking';
    ctx.navigate('interact');
  });

  container.querySelectorAll('[data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      uiState.agendaCategory = btn.dataset.cat;
      renderAgenda(container, ctx);
    });
  });

  container.querySelectorAll('[data-poster-event]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const evt = events.find((e) => e.id === btn.dataset.posterEvent);
      if (!evt || !evt.poster) return;
      const dt = parseEventDate(evt.date);
      ctx.openModal({
        title: evt.title,
        subtitle: `📅 ${dt.full} às ${evt.time} • 📍 ${evt.location}`,
        html: `<div style="text-align:center;"><img src="${esc(evt.poster)}" alt="Cartaz ${esc(evt.title)}" style="max-width:100%;max-height:72vh;border-radius:14px;border:1px solid var(--border-strong);" /></div>`,
      });
    });
  });

  container.querySelectorAll('[data-share-event]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const evt = events.find((e) => e.id === btn.dataset.shareEvent);
      if (!evt) return;
      const dt = parseEventDate(evt.date);
      const shareText = `${evt.title}\n📅 ${dt.full} às ${evt.time}\n📍 ${evt.location}\n\nMinistério Razão de Viver`;
      if (navigator.share) {
        try {
          await navigator.share({ title: evt.title, text: shareText });
          return;
        } catch {}
      }
      try {
        await navigator.clipboard.writeText(shareText);
        ctx.toast('Detalhes do evento copiados para compartilhar!');
      } catch {
        ctx.toast('Compartilhe a data: ' + dt.full);
      }
    });
  });
}

// ============================================================================
// 4. INTERAGIR (ORAÇÕES + CONVITES + ENQUETES)
// ============================================================================
export function renderInteract(container, ctx) {
  container.innerHTML = `
    <span class="section-kicker">Comunidade & Fé</span>
    <h1 class="page-title">Interagir com o Ministério</h1>
    <p class="page-lead">
      Envie seu pedido de oração, convide nossa banda para sua paróquia ou vote nas músicas do próximo repertório.
    </p>

    <div class="segmented-tabs" role="tablist">
      <button class="seg-tab ${uiState.interactTab === 'prayers' ? 'active' : ''}" data-tab="prayers">🙏 Oração</button>
      <button class="seg-tab ${uiState.interactTab === 'booking' ? 'active' : ''}" data-tab="booking">📩 Convites</button>
      <button class="seg-tab ${uiState.interactTab === 'poll' ? 'active' : ''}" data-tab="poll">🎵 Enquete</button>
    </div>

    <div id="interact-panel"></div>
  `;

  container.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      uiState.interactTab = btn.dataset.tab;
      renderInteract(container, ctx);
    });
  });

  const panel = container.querySelector('#interact-panel');
  if (uiState.interactTab === 'prayers') renderPrayersTab(panel, ctx);
  else if (uiState.interactTab === 'booking') renderBookingTab(panel, ctx);
  else renderPollTab(panel, ctx);
}

function renderPrayersTab(panel, ctx) {
  const publicPrayers = store.state.prayers.filter((p) => p.isPublic && p.approved);

  panel.innerHTML = `
    <div class="card">
      <h2 style="margin:0 0 6px;font-size:1.15rem;">Envie seu Pedido de Oração</h2>
      <p style="margin:0 0 16px;font-size:0.86rem;color:var(--text-muted);">
        Nossa equipe de intercessão coloca todas as intenções diante do altar nas nossas missas e ensaios.
      </p>

      <form id="prayer-form" class="form-grid">
        <div class="field">
          <label for="prayer-name">Seu nome (opcional)</label>
          <input id="prayer-name" class="input" type="text" placeholder="Ex: Maria, João ou deixe em branco para Anônimo" maxlength="60" />
        </div>
        <div class="field">
          <label for="prayer-text">Sua intenção de oração *</label>
          <textarea id="prayer-text" class="textarea" required placeholder="Escreva aqui pela sua família, saúde, ação de graças ou intenção especial..." maxlength="500"></textarea>
        </div>
        <label class="checkbox-row">
          <input type="checkbox" id="prayer-public" checked />
          <span>Permitir exibir no Mural de Intercessão para que outras pessoas também rezem por esta intenção. (Desmarque para manter sigiloso apenas com o Ministério.)</span>
        </label>
        <div>
          <button type="submit" class="btn btn-gold">🙏 Enviar Pedido de Oração</button>
        </div>
      </form>
    </div>

    <div class="section-header">
      <div>
        <span class="section-kicker">Interceda conosco</span>
        <h2 class="section-title">Mural de Intercessão (${publicPrayers.length})</h2>
      </div>
    </div>

    <div class="prayer-list">
      ${publicPrayers.length ? publicPrayers.map((p) => {
        const prayed = store.hasPrayedFor(p.id);
        return `
          <article class="prayer-card">
            <p class="prayer-quote">“${esc(p.intention)}”</p>
            <div class="prayer-footer">
              <span class="prayer-author">— ${esc(p.name)}</span>
              <button class="btn-amen ${prayed ? 'prayed' : ''}" data-pray-id="${esc(p.id)}" ${prayed ? 'disabled' : ''}>
                🙏 ${prayed ? 'Você rezou' : 'Estou rezando'} (${p.prayedCount || 1})
              </button>
            </div>
          </article>
        `;
      }).join('') : `
        <div class="card-subtle" style="text-align:center;color:var(--text-muted);">
          Seja o primeiro a compartilhar uma intenção no mural.
        </div>
      `}
    </div>
  `;

  panel.querySelector('#prayer-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = panel.querySelector('#prayer-name').value;
    const intention = panel.querySelector('#prayer-text').value;
    const isPublic = panel.querySelector('#prayer-public').checked;
    if (!intention.trim()) return;

    try {
      await store.submitPrayer({ name, intention, isPublic });
      ctx.toast(
        isPublic
          ? 'Pedido enviado! Estamos em oração por você 🙏'
          : 'Pedido sigiloso enviado para a equipe do Ministério 🙏'
      );
      renderPrayersTab(panel, ctx);
    } catch (err) {
      ctx.toast('Erro ao enviar pedido: ' + err.message, true);
    }
  });

  panel.querySelectorAll('[data-pray-id]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const ok = await store.incrementPrayerCount(btn.dataset.prayId);
      if (ok) {
        ctx.toast('Obrigado por interceder! 🙏');
        renderPrayersTab(panel, ctx);
      }
    });
  });
}

function renderBookingTab(panel, ctx) {
  const { settings } = store.state;
  panel.innerHTML = `
    <div class="card">
      <h2 style="margin:0 0 6px;font-size:1.15rem;">Convide o Ministério Razão de Viver</h2>
      <p style="margin:0 0 16px;font-size:0.86rem;color:var(--text-muted);">
        Preencha os dados do evento (missa, retiro, grupo de oração, festa paroquial ou show). O convite fica registrado no nosso painel e você também pode enviar direto pelo WhatsApp!
      </p>

      <form id="booking-form" class="form-grid">
        <div class="form-grid form-grid-2">
          <div class="field">
            <label for="bk-name">Seu nome *</label>
            <input id="bk-name" class="input" required placeholder="Nome completo" />
          </div>
          <div class="field">
            <label for="bk-phone">WhatsApp / Telefone *</label>
            <input id="bk-phone" class="input" required placeholder="(21) 99999-9999" />
          </div>
        </div>

        <div class="form-grid form-grid-2">
          <div class="field">
            <label for="bk-parish">Paróquia / Comunidade / Movimento *</label>
            <input id="bk-parish" class="input" required placeholder="Ex: Paróquia São José" />
          </div>
          <div class="field">
            <label for="bk-type">Tipo de Evento *</label>
            <select id="bk-type" class="select">
              <option value="Santa Missa">Santa Missa</option>
              <option value="Noite de Louvor / Adoração">Noite de Louvor / Adoração</option>
              <option value="Retiro / Encontro">Retiro / Encontro</option>
              <option value="Festa Paroquial / Show">Festa Paroquial / Show</option>
              <option value="Grupo de Oração">Grupo de Oração</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>

        <div class="form-grid form-grid-2">
          <div class="field">
            <label for="bk-date">Data prevista</label>
            <input id="bk-date" class="input" type="date" />
          </div>
          <div class="field">
            <label for="bk-city">Bairro / Cidade *</label>
            <input id="bk-city" class="input" required placeholder="Ex: Rio de Janeiro - RJ" />
          </div>
        </div>

        <div class="field">
          <label for="bk-msg">Detalhes do convite *</label>
          <textarea id="bk-msg" class="textarea" required placeholder="Horário previsto, estrutura de som, público estimado e observações..."></textarea>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
          <button type="submit" class="btn btn-gold">📩 Enviar Convite</button>
          <button type="button" class="btn btn-success" id="btn-booking-wa">💬 Enviar via WhatsApp</button>
        </div>
      </form>
    </div>
  `;

  function readPayload() {
    return {
      name: panel.querySelector('#bk-name').value,
      phone: panel.querySelector('#bk-phone').value,
      parish: panel.querySelector('#bk-parish').value,
      eventType: panel.querySelector('#bk-type').value,
      eventDate: panel.querySelector('#bk-date').value,
      city: panel.querySelector('#bk-city').value,
      message: panel.querySelector('#bk-msg').value,
    };
  }

  function buildWhatsappText(p) {
    return `Olá, Ministério Razão de Viver! 🙏🎵\n\nGostaria de fazer um convite para evento:\n• Nome: ${p.name || '-'}\n• Paróquia/Comunidade: ${p.parish || '-'}\n• Tipo: ${p.eventType}\n• Data prevista: ${p.eventDate || 'A combinar'}\n• Local: ${p.city || '-'}\n• Contato: ${p.phone || '-'}\n\nDetalhes: ${p.message || '-'}`;
  }

  panel.querySelector('#booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = readPayload();
    try {
      await store.submitBooking(payload);
      ctx.toast('Convite enviado com sucesso! Em breve entraremos em contato.');
      panel.querySelector('#booking-form').reset();
    } catch (err) {
      ctx.toast('Erro ao registrar convite: ' + err.message, true);
    }
  });

  panel.querySelector('#btn-booking-wa').addEventListener('click', () => {
    const payload = readPayload();
    const url = whatsappLink(settings.whatsappNumber, buildWhatsappText(payload));
    window.open(url, '_blank', 'noopener');
  });
}

function renderPollTab(panel, ctx) {
  const activePolls = store.state.polls.filter((p) => p.active);
  const pollsToShow = activePolls.length ? activePolls : store.state.polls.slice(0, 1);

  if (!pollsToShow.length) {
    panel.innerHTML = `
      <div class="card" style="text-align:center;color:var(--text-muted);">
        Nenhuma enquete aberta no momento. Fique de olho para as próximas votações de repertório!
      </div>
    `;
    return;
  }

  panel.innerHTML = pollsToShow.map((poll) => {
    const votedOptId = store.getVotedOption(poll.id);
    const totalVotes = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);

    return `
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">
          <span class="badge">🎵 Enquete Ativa</span>
          <span style="font-size:0.8rem;color:var(--text-muted);">${totalVotes} votos</span>
        </div>
        <h2 style="margin:0 0 16px;font-size:1.15rem;">${esc(poll.question)}</h2>

        <div>
          ${poll.options.map((opt) => {
            const pct = totalVotes > 0 ? Math.round(((opt.votes || 0) / totalVotes) * 100) : 0;
            const isChosen = votedOptId === opt.id;
            return `
              <button
                class="poll-option ${isChosen ? 'voted' : ''}"
                data-poll-id="${esc(poll.id)}"
                data-opt-id="${esc(opt.id)}"
                ${votedOptId ? 'disabled' : ''}
              >
                <div class="poll-bar" style="width:${votedOptId ? pct : 0}%;"></div>
                <div class="poll-content">
                  <span>${isChosen ? '✓ ' : ''}${esc(opt.label)}</span>
                  <span class="poll-pct">${votedOptId ? `${pct}% (${opt.votes || 0})` : 'Votar'}</span>
                </div>
              </button>
            `;
          }).join('')}
        </div>

        <p style="margin:8px 0 0;font-size:0.8rem;color:var(--text-muted);">
          ${votedOptId ? 'Seu voto foi computado! Obrigado por participar do repertório.' : 'Toque na sua música preferida para registrar seu voto.'}
        </p>
      </div>
    `;
  }).join('');

  panel.querySelectorAll('[data-poll-id]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const ok = await store.votePoll(btn.dataset.pollId, btn.dataset.optId);
      if (ok) {
        ctx.toast('Voto registrado! 🎵');
        renderPollTab(panel, ctx);
      }
    });
  });
}

// ============================================================================
// 5. SOBRE O MINISTÉRIO
// ============================================================================
export function renderAbout(container, ctx) {
  const { settings, albums } = store.state;
  const members = settings.members || [];

  container.innerHTML = `
    <span class="section-kicker">Nossa História & Missão</span>
    <h1 class="page-title">${esc(settings.name)}</h1>
    <p class="page-lead">${esc(settings.parish)} • ${esc(settings.neighborhood)}</p>

    <div class="card">
      <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
        <img src="./assets/img/icon-192.png?v=6" alt="Logo" style="width:68px;height:68px;border-radius:16px;border:1px solid var(--border-strong);" />
        <div>
          <span class="badge">Ministério de Música Católico</span>
          <h2 style="margin:6px 0 2px;font-size:1.2rem;">Evangelizando através da música</h2>
          <span style="font-size:0.84rem;color:var(--text-muted);">${albums.length} CDs gravados • Instagram ${esc(settings.instagramHandle)}</span>
        </div>
      </div>
      <p style="margin:0;color:#DFD7CA;line-height:1.7;">${esc(settings.aboutBio)}</p>
    </div>

    ${settings.missionQuote ? `<blockquote class="quote-card">${esc(settings.missionQuote)}</blockquote>` : ''}

    <div class="section-header">
      <div>
        <span class="section-kicker">Quem serve conosco</span>
        <h2 class="section-title">Formação & Ministérios</h2>
      </div>
    </div>

    <div class="members-grid">
      ${members.map((m) => {
        const parts = String(m.name || '').trim().split(/\s+/).filter((p) => !/^(de|da|do|dos|das)$/i.test(p));
        const initials = parts.length >= 2
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
          : String(m.name || '').slice(0, 2).toUpperCase();
        const pos = m.photoPos || '50% 35%';
        const scale = m.photoScale && m.photoScale !== 1 ? `transform:scale(${Number(m.photoScale)});transform-origin:${esc(pos)};` : '';
        if (m.photo) {
          return `
            <article class="member-card member-card-photo">
              <div class="member-photo-wrap">
                <img
                  src="${esc(m.photo)}"
                  alt="${esc(m.name)} — ${esc(m.role)}"
                  class="member-photo"
                  style="object-position:${esc(pos)};${scale}"
                  loading="lazy"
                />
                <div class="member-photo-fade"></div>
              </div>
              <div class="member-caption">
                <div class="member-name">${esc(m.name)}</div>
                <div class="member-role">${esc(m.role)}</div>
              </div>
            </article>
          `;
        }
        return `
          <div class="member-card">
            <div class="member-avatar">${esc(initials)}</div>
            <div>
              <div class="member-name">${esc(m.name)}</div>
              <div class="member-role">${esc(m.role)}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="section-header">
      <div>
        <span class="section-kicker">Onde nos encontrar</span>
        <h2 class="section-title">Paróquia & Redes Sociais</h2>
      </div>
    </div>

    <div class="card" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;">
      <div>
        <div style="font-weight:700;font-size:1rem;">⛪ ${esc(settings.parish)}</div>
        <div style="font-size:0.86rem;color:var(--text-muted);margin-top:2px;">${esc(settings.neighborhood)}</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <a class="btn btn-outline btn-sm" href="${mapsUrl(settings.parish + ', ' + settings.neighborhood)}" target="_blank" rel="noopener">
          📍 Ver no Mapa
        </a>
        ${settings.whatsappNumber ? `<a class="btn btn-success btn-sm" href="${whatsappLink(settings.whatsappNumber, 'Olá, Ministério Razão de Viver! 🙏🎵')}" target="_blank" rel="noopener">💬 WhatsApp</a>` : ''}
        ${settings.contactEmail ? `<a class="btn btn-dark btn-sm" href="mailto:${esc(settings.contactEmail)}">✉ ${esc(settings.contactEmail)}</a>` : ''}
        <a class="btn btn-gold btn-sm" href="${esc(settings.instagramUrl)}" target="_blank" rel="noopener">
          ◎ Seguir ${esc(settings.instagramHandle)}
        </a>
      </div>
    </div>

    <div style="margin-top:24px;text-align:center;">
      <button class="btn btn-dark btn-sm" id="btn-about-install-help">📱 Como instalar este app no celular?</button>
    </div>
  `;

  container.querySelector('#btn-about-install-help').addEventListener('click', () => {
    ctx.openInstallGuideModal();
  });
}
