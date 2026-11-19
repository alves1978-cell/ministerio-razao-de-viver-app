/**
 * Painel Administrativo da Banda — Ministério Razão de Viver
 * Permite gerenciar sem programar:
 *  - Agenda de eventos
 *  - Discografia, links dos CDs, letras e cifras (com prévia em tempo real)
 *  - Pedidos de oração (sigilosos e públicos)
 *  - Convites recebidos
 *  - Enquetes de repertório
 *  - Configurações gerais, links das plataformas e Backup JSON
 */
import { store } from './store.js';
import { CONFIG } from './config.js';
import { esc, parseEventDate } from './ui-public.js';
import { renderChordSheet } from './chords.js';

const adminUi = {
  tab: 'events', // events | music | prayers | bookings | polls | settings
  editingEventId: null,
  editingTrackId: null,
};

export function renderAdmin(container, ctx) {
  if (!store.isAdmin) {
    renderAdminLogin(container, ctx);
    return;
  }

  const { events, tracks, prayers, bookings, polls } = store.state;
  const newPrayers = prayers.filter((p) => p.status === 'novo').length;
  const newBookings = bookings.filter((b) => b.status === 'novo').length;

  container.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px;">
      <div>
        <span class="section-kicker">Painel Administrativo</span>
        <h1 class="page-title" style="margin-bottom:2px;">Área da Banda</h1>
        <span style="font-size:0.8rem;color:var(--text-muted);">
          Modo: <strong>${store.mode === 'supabase' ? '☁️ Nuvem (Supabase)' : '💾 Local (Pronto para testes)'}</strong>
          ${store.adminEmail ? ` • ${esc(store.adminEmail)}` : ''}
        </span>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-outline btn-sm" id="btn-admin-view-site">👁 Ver App Público</button>
        <button class="btn btn-danger btn-sm" id="btn-admin-logout">Sair</button>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-value">${events.length}</div>
        <div class="stat-label">Eventos na Agenda</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${tracks.length}</div>
        <div class="stat-label">Faixas Cadastradas</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${prayers.length}</div>
        <div class="stat-label">Pedidos de Oração${newPrayers ? ` (${newPrayers} novos)` : ''}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${bookings.length}</div>
        <div class="stat-label">Convites${newBookings ? ` (${newBookings} novos)` : ''}</div>
      </div>
    </div>

    <div class="admin-tabs">
      <button class="pill-btn ${adminUi.tab === 'events' ? 'active' : ''}" data-atab="events">📅 Agenda</button>
      <button class="pill-btn ${adminUi.tab === 'music' ? 'active' : ''}" data-atab="music">🎵 CDs & Cifras</button>
      <button class="pill-btn ${adminUi.tab === 'prayers' ? 'active' : ''}" data-atab="prayers">🙏 Orações (${prayers.length})</button>
      <button class="pill-btn ${adminUi.tab === 'bookings' ? 'active' : ''}" data-atab="bookings">📩 Convites (${bookings.length})</button>
      <button class="pill-btn ${adminUi.tab === 'polls' ? 'active' : ''}" data-atab="polls">📊 Enquetes (${polls.length})</button>
      <button class="pill-btn ${adminUi.tab === 'settings' ? 'active' : ''}" data-atab="settings">⚙ Links & Config</button>
    </div>

    <div id="admin-tab-body"></div>
  `;

  container.querySelector('#btn-admin-view-site').addEventListener('click', () => ctx.navigate('home'));
  container.querySelector('#btn-admin-logout').addEventListener('click', async () => {
    await store.logoutAdmin();
    ctx.toast('Você saiu do Painel Administrativo.');
    renderAdmin(container, ctx);
  });

  container.querySelectorAll('[data-atab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      adminUi.tab = btn.dataset.atab;
      adminUi.editingEventId = null;
      adminUi.editingTrackId = null;
      renderAdmin(container, ctx);
    });
  });

  const body = container.querySelector('#admin-tab-body');
  if (adminUi.tab === 'events') renderAdminEvents(body, ctx, () => renderAdmin(container, ctx));
  else if (adminUi.tab === 'music') renderAdminMusic(body, ctx, () => renderAdmin(container, ctx));
  else if (adminUi.tab === 'prayers') renderAdminPrayers(body, ctx, () => renderAdmin(container, ctx));
  else if (adminUi.tab === 'bookings') renderAdminBookings(body, ctx, () => renderAdmin(container, ctx));
  else if (adminUi.tab === 'polls') renderAdminPolls(body, ctx, () => renderAdmin(container, ctx));
  else renderAdminSettings(body, ctx, () => renderAdmin(container, ctx));
}

function renderAdminLogin(container, ctx) {
  const isCloud = store.mode === 'supabase';
  container.innerHTML = `
    <div style="max-width:440px;margin:24px auto;">
      <div class="card">
        <span class="badge" style="margin-bottom:10px;">🔒 Acesso Restrito da Banda</span>
        <h1 style="margin:0 0 6px;font-family:var(--font-serif);font-size:1.55rem;">Painel Administrativo</h1>
        <p style="margin:0 0 18px;font-size:0.86rem;color:var(--text-muted);">
          ${isCloud
            ? 'Entre com o e-mail e senha de administrador cadastrados no Supabase.'
            : `Modo Local ativo: use o PIN de acesso da banda (padrão inicial: <strong>${esc(CONFIG.localAdminPin)}</strong>).`}
        </p>

        <form id="admin-login-form" class="form-grid">
          ${isCloud ? `
            <div class="field">
              <label for="adm-email">E-mail</label>
              <input id="adm-email" class="input" type="email" required placeholder="banda@paroquia.org" />
            </div>
            <div class="field">
              <label for="adm-pass">Senha</label>
              <input id="adm-pass" class="input" type="password" required placeholder="••••••••" />
            </div>
          ` : `
            <div class="field">
              <label for="adm-pin">PIN da Banda</label>
              <input id="adm-pin" class="input" type="password" inputmode="numeric" required placeholder="Digite o PIN (ex: 2026)" />
            </div>
          `}
          <button type="submit" class="btn btn-gold">Entrar no Painel</button>
        </form>
      </div>
    </div>
  `;

  container.querySelector('#admin-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      if (isCloud) {
        await store.loginAdmin({
          email: container.querySelector('#adm-email').value,
          password: container.querySelector('#adm-pass').value,
        });
      } else {
        await store.loginAdmin({
          pin: container.querySelector('#adm-pin').value,
        });
      }
      ctx.toast('Bem-vindo ao Painel do Ministério Razão de Viver!');
      renderAdmin(container, ctx);
    } catch (err) {
      ctx.toast(err.message, true);
    }
  });
}

// ---------- ABA AGENDA ----------
function renderAdminEvents(body, ctx, refresh) {
  const editing = store.state.events.find((e) => e.id === adminUi.editingEventId) || null;

  body.innerHTML = `
    <div class="card" style="margin-bottom:18px;">
      <h2 style="margin:0 0 12px;font-size:1.1rem;">${editing ? 'Editar Evento' : 'Novo Evento na Agenda'}</h2>
      <form id="adm-event-form" class="form-grid">
        <div class="form-grid form-grid-2">
          <div class="field">
            <label>Título do Evento *</label>
            <input id="ev-title" class="input" required value="${esc(editing?.title || '')}" placeholder="Ex: Santa Missa Dominical" />
          </div>
          <div class="field">
            <label>Categoria</label>
            <select id="ev-cat" class="select">
              ${['Missa', 'Adoração', 'Show', 'Retiro', 'Grupo de Oração'].map((c) => `
                <option value="${c}" ${editing?.category === c ? 'selected' : ''}>${c}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="form-grid form-grid-2">
          <div class="field">
            <label>Data *</label>
            <input id="ev-date" class="input" type="date" required value="${esc(editing?.date || '')}" />
          </div>
          <div class="field">
            <label>Horário *</label>
            <input id="ev-time" class="input" type="time" required value="${esc(editing?.time || '19:00')}" />
          </div>
        </div>

        <div class="form-grid form-grid-2">
          <div class="field">
            <label>Local *</label>
            <input id="ev-loc" class="input" required value="${esc(editing?.location || 'Paróquia Nossa Senhora de Guadalupe')}" />
          </div>
          <div class="field">
            <label>Endereço completo (para o botão Google Maps)</label>
            <input id="ev-addr" class="input" value="${esc(editing?.address || '')}" placeholder="Rua, Bairro, Rio de Janeiro - RJ" />
          </div>
        </div>

        <div class="field">
          <label>Descrição / Observações</label>
          <textarea id="ev-desc" class="textarea" placeholder="Informações sobre entrada, participação, horário de chegada...">${esc(editing?.description || '')}</textarea>
        </div>

        <label class="checkbox-row">
          <input type="checkbox" id="ev-feat" ${editing?.featured ? 'checked' : ''} />
          <span>Destacar este evento com borda dourada na agenda</span>
        </label>

        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="submit" class="btn btn-gold">${editing ? 'Salvar Alterações' : '+ Publicar Evento'}</button>
          ${editing ? `<button type="button" class="btn btn-dark" id="ev-cancel">Cancelar edição</button>` : ''}
        </div>
      </form>
    </div>

    <h3 style="margin:0 0 10px;">Eventos Publicados (${store.state.events.length})</h3>
    ${store.state.events.map((e) => {
      const dt = parseEventDate(e.date);
      return `
        <div class="admin-item">
          <div>
            <strong>${esc(e.title)}</strong> <span class="badge">${esc(e.category)}</span>
            <div style="font-size:0.82rem;color:var(--text-muted);margin-top:3px;">
              📅 ${esc(dt.full)} às ${esc(e.time)} • 📍 ${esc(e.location)}
            </div>
          </div>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-outline btn-sm" data-edit-ev="${esc(e.id)}">Editar</button>
            <button class="btn btn-danger btn-sm" data-del-ev="${esc(e.id)}">Excluir</button>
          </div>
        </div>
      `;
    }).join('') || '<p style="color:var(--text-muted);">Nenhum evento cadastrado.</p>'}
  `;

  body.querySelector('#adm-event-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    await store.saveEvent({
      id: editing?.id,
      title: body.querySelector('#ev-title').value,
      category: body.querySelector('#ev-cat').value,
      date: body.querySelector('#ev-date').value,
      time: body.querySelector('#ev-time').value,
      location: body.querySelector('#ev-loc').value,
      address: body.querySelector('#ev-addr').value,
      description: body.querySelector('#ev-desc').value,
      featured: body.querySelector('#ev-feat').checked,
    });
    adminUi.editingEventId = null;
    ctx.toast(editing ? 'Evento atualizado!' : 'Evento publicado na agenda!');
    refresh();
  });

  body.querySelector('#ev-cancel')?.addEventListener('click', () => {
    adminUi.editingEventId = null;
    refresh();
  });

  body.querySelectorAll('[data-edit-ev]').forEach((b) => {
    b.addEventListener('click', () => {
      adminUi.editingEventId = b.dataset.editEv;
      refresh();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  body.querySelectorAll('[data-del-ev]').forEach((b) => {
    b.addEventListener('click', async () => {
      if (!confirm('Remover este evento da agenda?')) return;
      await store.deleteEvent(b.dataset.delEv);
      ctx.toast('Evento removido.');
      refresh();
    });
  });
}

// ---------- ABA MÚSICAS, CDS E CIFRAS ----------
function renderAdminMusic(body, ctx, refresh) {
  const { albums, tracks } = store.state;
  const editing = tracks.find((t) => t.id === adminUi.editingTrackId) || null;

  body.innerHTML = `
    <div class="card" style="margin-bottom:18px;">
      <h2 style="margin:0 0 12px;font-size:1.1rem;">${editing ? `Editando Faixa: ${esc(editing.title)}` : 'Adicionar Nova Faixa / Letra & Cifra'}</h2>
      <form id="adm-track-form" class="form-grid">
        <div class="form-grid form-grid-2">
          <div class="field">
            <label>CD / Álbum *</label>
            <select id="tr-album" class="select">
              ${albums.map((a) => `<option value="${esc(a.id)}" ${editing?.albumId === a.id ? 'selected' : ''}>${esc(a.title)}</option>`).join('')}
            </select>
          </div>
          <div class="field">
            <label>Nome da Música *</label>
            <input id="tr-title" class="input" required value="${esc(editing?.title || '')}" placeholder="Ex: Minha Obra" />
          </div>
        </div>

        <div class="form-grid form-grid-2">
          <div class="field">
            <label>Número da Faixa</label>
            <input id="tr-num" class="input" type="number" min="1" value="${esc(editing?.number || '')}" placeholder="1" />
          </div>
          <div class="field">
            <label>Tom Original (ex: G, D, Am, F#m)</label>
            <input id="tr-key" class="input" value="${esc(editing?.key || '')}" placeholder="G" />
          </div>
        </div>

        <div class="form-grid form-grid-2">
          <div class="field">
            <label>Duração (opcional)</label>
            <input id="tr-dur" class="input" value="${esc(editing?.duration || '')}" placeholder="4:20" />
          </div>
          <div class="field">
            <label>Link direto da faixa (Spotify ou YouTube — opcional)</label>
            <input id="tr-url" class="input" type="url" value="${esc(editing?.listenUrl || '')}" placeholder="https://open.spotify.com/track/..." />
          </div>
        </div>

        <div class="field">
          <label>Letra e Cifra (use [G]palavra ou acordes na linha acima — transposição automática!)</label>
          <textarea id="tr-lyrics" class="textarea textarea-code" placeholder="[Intro]\nG   D/F#   Em7   C9\n\n[Refrão]\n[G]Escreva sua [D/F#]letra com [Em7]cifras...">${esc(editing?.lyricsChords || '')}</textarea>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="submit" class="btn btn-gold">${editing ? 'Salvar Faixa' : '+ Adicionar Faixa'}</button>
          <button type="button" class="btn btn-outline" id="btn-preview-chords">👁 Pré-visualizar Cifra</button>
          ${editing ? `<button type="button" class="btn btn-dark" id="tr-cancel">Cancelar</button>` : ''}
        </div>
      </form>
    </div>

    <div class="card" style="margin-bottom:18px;">
      <h2 style="margin:0 0 12px;font-size:1.1rem;">Links Oficiais dos 2 CDs</h2>
      <p style="margin:0 0 14px;font-size:0.84rem;color:var(--text-muted);">
        Cole aqui os links exatos de cada álbum no Spotify, YouTube, Apple Music e Deezer.
      </p>
      ${albums.map((alb) => `
        <form class="album-links-form card-subtle" data-alb-id="${esc(alb.id)}" style="margin-bottom:12px;">
          <strong style="display:block;margin-bottom:10px;color:var(--gold-light);">💿 CD "${esc(alb.title)}"</strong>
          <div class="form-grid form-grid-2">
            <div class="field"><label>YouTube</label><input name="youtubeUrl" class="input" value="${esc(alb.youtubeUrl || '')}" /></div>
            <div class="field"><label>YouTube Music</label><input name="youtubeMusicUrl" class="input" value="${esc(alb.youtubeMusicUrl || '')}" /></div>
            <div class="field"><label>Apple Music</label><input name="appleMusicUrl" class="input" value="${esc(alb.appleMusicUrl || '')}" /></div>
            <div class="field"><label>Deezer</label><input name="deezerUrl" class="input" value="${esc(alb.deezerUrl || '')}" /></div>
            <div class="field"><label>Amazon Music</label><input name="amazonMusicUrl" class="input" value="${esc(alb.amazonMusicUrl || '')}" /></div>
            <div class="field"><label>TIDAL</label><input name="tidalUrl" class="input" value="${esc(alb.tidalUrl || '')}" /></div>
            <div class="field"><label>Spotify</label><input name="spotifyUrl" class="input" value="${esc(alb.spotifyUrl || '')}" /></div>
          </div>
          <button type="submit" class="btn btn-outline btn-sm" style="margin-top:10px;">Salvar links do CD</button>
        </form>
      `).join('')}
    </div>

    <h3 style="margin:0 0 10px;">Todas as Faixas (${tracks.length})</h3>
    ${tracks.map((t) => {
      const alb = albums.find((a) => a.id === t.albumId);
      const hasLyrics = Boolean(t.lyricsChords?.trim());
      return `
        <div class="admin-item">
          <div>
            <strong>${String(t.number).padStart(2, '0')}. ${esc(t.title)}</strong>
            <span class="badge ${hasLyrics ? 'badge-success' : 'badge-muted'}">${hasLyrics ? 'Com Cifra' : 'Sem letra'}</span>
            <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;">
              💿 ${esc(alb?.title || '')} ${t.key ? `• Tom: ${esc(t.key)}` : ''}
            </div>
          </div>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-outline btn-sm" data-edit-tr="${esc(t.id)}">Editar Letra/Cifra</button>
            <button class="btn btn-danger btn-sm" data-del-tr="${esc(t.id)}">Excluir</button>
          </div>
        </div>
      `;
    }).join('')}
  `;

  body.querySelector('#adm-track-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    await store.saveTrack({
      id: editing?.id,
      albumId: body.querySelector('#tr-album').value,
      title: body.querySelector('#tr-title').value,
      number: body.querySelector('#tr-num').value,
      key: body.querySelector('#tr-key').value,
      duration: body.querySelector('#tr-dur').value,
      listenUrl: body.querySelector('#tr-url').value,
      lyricsChords: body.querySelector('#tr-lyrics').value,
    });
    adminUi.editingTrackId = null;
    ctx.toast(editing ? 'Faixa atualizada!' : 'Faixa adicionada ao CD!');
    refresh();
  });

  body.querySelector('#btn-preview-chords').addEventListener('click', () => {
    const raw = body.querySelector('#tr-lyrics').value;
    const title = body.querySelector('#tr-title').value || 'Prévia da Cifra';
    ctx.openModal({
      title,
      subtitle: 'Pré-visualização da formatação de acordes',
      html: `<div class="chord-sheet">${renderChordSheet(raw, { showChords: true, semitones: 0 })}</div>`,
    });
  });

  body.querySelector('#tr-cancel')?.addEventListener('click', () => {
    adminUi.editingTrackId = null;
    refresh();
  });

  body.querySelectorAll('.album-links-form').forEach((form) => {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);
      await store.updateAlbumLinks(form.dataset.albId, {
        spotifyUrl: fd.get('spotifyUrl'),
        youtubeUrl: fd.get('youtubeUrl'),
        youtubeMusicUrl: fd.get('youtubeMusicUrl'),
        appleMusicUrl: fd.get('appleMusicUrl'),
        deezerUrl: fd.get('deezerUrl'),
        amazonMusicUrl: fd.get('amazonMusicUrl'),
        tidalUrl: fd.get('tidalUrl'),
      });
      ctx.toast('Links do CD salvos!');
    });
  });

  body.querySelectorAll('[data-edit-tr]').forEach((b) => {
    b.addEventListener('click', () => {
      adminUi.editingTrackId = b.dataset.editTr;
      refresh();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  body.querySelectorAll('[data-del-tr]').forEach((b) => {
    b.addEventListener('click', async () => {
      if (!confirm('Excluir esta faixa?')) return;
      await store.deleteTrack(b.dataset.delTr);
      ctx.toast('Faixa excluída.');
      refresh();
    });
  });
}

// ---------- ABA PEDIDOS DE ORAÇÃO ----------
function renderAdminPrayers(body, ctx, refresh) {
  const { prayers } = store.state;
  body.innerHTML = `
    <p style="margin:0 0 14px;font-size:0.86rem;color:var(--text-muted);">
      Aqui aparecem <strong>todos</strong> os pedidos de oração, incluindo os marcados como sigilosos.
    </p>
    ${prayers.length ? prayers.map((p) => `
      <div class="admin-item" style="align-items:flex-start;">
        <div style="flex:1;min-width:240px;">
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px;">
            <strong>${esc(p.name)}</strong>
            <span class="badge ${p.isPublic ? 'badge-success' : 'badge-muted'}">${p.isPublic ? 'Autorizado no mural' : '🔒 Sigiloso'}</span>
            ${p.isPublic ? `<span class="badge">${p.approved ? 'Visível no mural' : 'Aguardando aprovação'}</span>` : ''}
            <span class="badge">${p.status === 'orado' ? '✓ Orado' : '🙏 Em oração'}</span>
          </div>
          <p style="margin:0;font-size:0.9rem;color:#DFD7CA;">“${esc(p.intention)}”</p>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${p.isPublic ? `
            <button class="btn btn-outline btn-sm" data-toggle-app="${esc(p.id)}">
              ${p.approved ? 'Ocultar do mural' : 'Aprovar no mural'}
            </button>
          ` : ''}
          <button class="btn btn-success btn-sm" data-mark-prayed="${esc(p.id)}">
            ${p.status === 'orado' ? 'Reabrir' : 'Marcar Orado'}
          </button>
          <button class="btn btn-danger btn-sm" data-del-pry="${esc(p.id)}">Excluir</button>
        </div>
      </div>
    `).join('') : '<p style="color:var(--text-muted);">Nenhum pedido de oração recebido ainda.</p>'}
  `;

  body.querySelectorAll('[data-toggle-app]').forEach((b) => {
    b.addEventListener('click', async () => {
      const p = prayers.find((x) => x.id === b.dataset.toggleApp);
      await store.updatePrayer(p.id, { approved: !p.approved });
      ctx.toast(p.approved ? 'Visível no mural!' : 'Ocultado do mural.');
      refresh();
    });
  });

  body.querySelectorAll('[data-mark-prayed]').forEach((b) => {
    b.addEventListener('click', async () => {
      const p = prayers.find((x) => x.id === b.dataset.markPrayed);
      await store.updatePrayer(p.id, { status: p.status === 'orado' ? 'rezando' : 'orado' });
      ctx.toast('Status do pedido atualizado.');
      refresh();
    });
  });

  body.querySelectorAll('[data-del-pry]').forEach((b) => {
    b.addEventListener('click', async () => {
      if (!confirm('Excluir este pedido de oração?')) return;
      await store.deletePrayer(b.dataset.delPry);
      ctx.toast('Pedido excluído.');
      refresh();
    });
  });
}

// ---------- ABA CONVITES ----------
function renderAdminBookings(body, ctx, refresh) {
  const { bookings } = store.state;
  body.innerHTML = bookings.length ? bookings.map((b) => {
    const cleanPhone = String(b.phone || '').replace(/\D/g, '');
    const waUrl = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone}?text=${encodeURIComponent(`Olá ${b.name}! Aqui é o Ministério Razão de Viver, recebemos seu convite para ${b.eventType} em ${b.parish}. Vamos conversar?`)}` : '';
    return `
      <div class="admin-item" style="align-items:flex-start;">
        <div style="flex:1;min-width:250px;">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:6px;">
            <strong>${esc(b.parish)} — ${esc(b.eventType)}</strong>
            <span class="badge ${b.status === 'confirmado' ? 'badge-success' : ''}">${esc(b.status)}</span>
          </div>
          <div style="font-size:0.83rem;color:var(--text-muted);margin-bottom:6px;">
            👤 ${esc(b.name)} • 📱 ${esc(b.phone)} • 📅 ${esc(b.eventDate || 'A combinar')} • 📍 ${esc(b.city)}
          </div>
          <p style="margin:0;font-size:0.88rem;color:#DFD7CA;">${esc(b.message)}</p>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${waUrl ? `<a class="btn btn-success btn-sm" href="${waUrl}" target="_blank" rel="noopener">💬 Responder WhatsApp</a>` : ''}
          <button class="btn btn-outline btn-sm" data-bk-status="${esc(b.id)}">
            ${b.status === 'confirmado' ? 'Marcar Novo' : 'Marcar Confirmado'}
          </button>
          <button class="btn btn-danger btn-sm" data-del-bk="${esc(b.id)}">Excluir</button>
        </div>
      </div>
    `;
  }).join('') : '<p style="color:var(--text-muted);">Nenhum convite recebido ainda.</p>';

  body.querySelectorAll('[data-bk-status]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const b = bookings.find((x) => x.id === btn.dataset.bkStatus);
      await store.updateBookingStatus(b.id, b.status === 'confirmado' ? 'novo' : 'confirmado');
      ctx.toast('Status do convite atualizado.');
      refresh();
    });
  });

  body.querySelectorAll('[data-del-bk]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!confirm('Remover este convite?')) return;
      await store.deleteBooking(btn.dataset.delBk);
      ctx.toast('Convite removido.');
      refresh();
    });
  });
}

// ---------- ABA ENQUETES ----------
function renderAdminPolls(body, ctx, refresh) {
  body.innerHTML = `
    <div class="card" style="margin-bottom:18px;">
      <h2 style="margin:0 0 10px;font-size:1.1rem;">Criar Nova Enquete de Repertório</h2>
      <form id="adm-poll-form" class="form-grid">
        <div class="field">
          <label>Pergunta da Enquete *</label>
          <input id="pl-q" class="input" required placeholder="Ex: Qual música você quer ouvir na Missa de Domingo?" />
        </div>
        <div class="field">
          <label>Opções (uma por linha, mínimo 2) *</label>
          <textarea id="pl-opts" class="textarea" required placeholder="Eu Não Morri em Vão&#10;Minha Obra&#10;Cura&#10;Mãe da Igreja"></textarea>
        </div>
        <div>
          <button type="submit" class="btn btn-gold">+ Publicar Enquete Ativa</button>
        </div>
      </form>
    </div>

    <h3 style="margin:0 0 10px;">Enquetes Existentes</h3>
    ${store.state.polls.map((pl) => {
      const total = pl.options.reduce((s, o) => s + (o.votes || 0), 0);
      return `
        <div class="admin-item" style="align-items:flex-start;">
          <div style="flex:1;">
            <strong>${esc(pl.question)}</strong>
            ${pl.active ? '<span class="badge badge-success" style="margin-left:6px;">Ativa</span>' : '<span class="badge badge-muted" style="margin-left:6px;">Encerrada</span>'}
            <div style="font-size:0.82rem;color:var(--text-muted);margin-top:6px;">
              ${pl.options.map((o) => `• ${esc(o.label)}: <strong>${o.votes || 0}</strong>`).join(' &nbsp; ')}
              <div style="margin-top:4px;">Total: ${total} votos</div>
            </div>
          </div>
          <button class="btn btn-danger btn-sm" data-del-pl="${esc(pl.id)}">Excluir</button>
        </div>
      `;
    }).join('')}
  `;

  body.querySelector('#adm-poll-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const question = body.querySelector('#pl-q').value;
    const options = body.querySelector('#pl-opts').value.split('\n').map((s) => s.trim()).filter(Boolean);
    if (options.length < 2) {
      ctx.toast('Digite pelo menos 2 opções (uma por linha).', true);
      return;
    }
    await store.savePoll({ question, options });
    ctx.toast('Nova enquete publicada!');
    refresh();
  });

  body.querySelectorAll('[data-del-pl]').forEach((b) => {
    b.addEventListener('click', async () => {
      if (!confirm('Excluir esta enquete?')) return;
      await store.deletePoll(b.dataset.delPl);
      ctx.toast('Enquete removida.');
      refresh();
    });
  });
}

// ---------- ABA CONFIGURAÇÕES & LINKS ----------
function renderAdminSettings(body, ctx, refresh) {
  const s = store.state.settings;
  body.innerHTML = `
    <div class="card" style="margin-bottom:18px;">
      <h2 style="margin:0 0 12px;font-size:1.1rem;">Links das Plataformas & Perfil do Ministério</h2>
      <form id="adm-settings-form" class="form-grid">
        <div class="form-grid form-grid-2">
          <div class="field"><label>Nome do Ministério</label><input id="st-name" class="input" value="${esc(s.name)}" /></div>
          <div class="field"><label>Frase / Subtítulo</label><input id="st-tag" class="input" value="${esc(s.tagline)}" /></div>
          <div class="field"><label>Paróquia</label><input id="st-parish" class="input" value="${esc(s.parish)}" /></div>
          <div class="field"><label>Bairro / Cidade</label><input id="st-neigh" class="input" value="${esc(s.neighborhood)}" /></div>
          <div class="field"><label>Instagram (@)</label><input id="st-ig-h" class="input" value="${esc(s.instagramHandle)}" /></div>
          <div class="field"><label>Link do Instagram</label><input id="st-ig-u" class="input" value="${esc(s.instagramUrl)}" /></div>
          <div class="field"><label>Link do YouTube (Canal / Lançamentos)</label><input id="st-yt" class="input" value="${esc(s.youtubeUrl || '')}" /></div>
          <div class="field"><label>Link do YouTube Music</label><input id="st-ytm" class="input" value="${esc(s.youtubeMusicUrl || '')}" /></div>
          <div class="field"><label>Link do Apple Music</label><input id="st-ap" class="input" value="${esc(s.appleMusicUrl || '')}" /></div>
          <div class="field"><label>Link do Deezer</label><input id="st-dz" class="input" value="${esc(s.deezerUrl || '')}" /></div>
          <div class="field"><label>Link do Amazon Music</label><input id="st-amz" class="input" value="${esc(s.amazonMusicUrl || '')}" /></div>
          <div class="field"><label>Link do TIDAL</label><input id="st-tdl" class="input" value="${esc(s.tidalUrl || '')}" /></div>
          <div class="field"><label>Link do Spotify</label><input id="st-sp" class="input" value="${esc(s.spotifyUrl || '')}" /></div>
          <div class="field"><label>WhatsApp de Convites (somente números com 55+DDD)</label><input id="st-wa" class="input" value="${esc(s.whatsappNumber)}" placeholder="5521999999999" /></div>
          <div class="field"><label>Aviso em Destaque na Tela Inicial</label><input id="st-notice" class="input" value="${esc(s.heroNotice)}" /></div>
        </div>
        <div class="field">
          <label>História / Sobre o Ministério</label>
          <textarea id="st-bio" class="textarea">${esc(s.aboutBio)}</textarea>
        </div>
        <div class="field">
          <label>Versículo / Frase de Missão</label>
          <input id="st-quote" class="input" value="${esc(s.missionQuote)}" />
        </div>
        <div>
          <button type="submit" class="btn btn-gold">💾 Salvar Configurações</button>
        </div>
      </form>
    </div>

    <div class="card">
      <h2 style="margin:0 0 8px;font-size:1.1rem;">Backup & Restauração dos Dados</h2>
      <p style="margin:0 0 14px;font-size:0.84rem;color:var(--text-muted);">
        Exporte tudo o que você cadastrou (agenda, letras, cifras e links) em um arquivo JSON ou restaure um backup anterior.
      </p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-outline btn-sm" id="btn-export-json">⬇ Exportar Backup JSON</button>
        <label class="btn btn-dark btn-sm" style="cursor:pointer;">
          ⬆ Importar Backup JSON
          <input type="file" id="input-import-json" accept="application/json" style="display:none;" />
        </label>
        <button class="btn btn-danger btn-sm" id="btn-reset-demo">↺ Restaurar Dados Iniciais</button>
      </div>
    </div>
  `;

  body.querySelector('#adm-settings-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    await store.saveSettings({
      name: body.querySelector('#st-name').value.trim(),
      tagline: body.querySelector('#st-tag').value.trim(),
      parish: body.querySelector('#st-parish').value.trim(),
      neighborhood: body.querySelector('#st-neigh').value.trim(),
      instagramHandle: body.querySelector('#st-ig-h').value.trim(),
      instagramUrl: body.querySelector('#st-ig-u').value.trim(),
      spotifyUrl: body.querySelector('#st-sp').value.trim(),
      youtubeUrl: body.querySelector('#st-yt').value.trim(),
      youtubeMusicUrl: body.querySelector('#st-ytm').value.trim(),
      appleMusicUrl: body.querySelector('#st-ap').value.trim(),
      deezerUrl: body.querySelector('#st-dz').value.trim(),
      amazonMusicUrl: body.querySelector('#st-amz').value.trim(),
      tidalUrl: body.querySelector('#st-tdl').value.trim(),
      whatsappNumber: body.querySelector('#st-wa').value.trim(),
      heroNotice: body.querySelector('#st-notice').value.trim(),
      aboutBio: body.querySelector('#st-bio').value.trim(),
      missionQuote: body.querySelector('#st-quote').value.trim(),
    });
    ctx.toast('Configurações salvas com sucesso!');
    refresh();
  });

  body.querySelector('#btn-export-json').addEventListener('click', () => {
    const blob = new Blob([store.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-razao-de-viver-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    ctx.toast('Backup JSON baixado!');
  });

  body.querySelector('#input-import-json').addEventListener('change', (ev) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        store.importJson(reader.result);
        ctx.toast('Backup importado com sucesso!');
        refresh();
      } catch (err) {
        ctx.toast(err.message, true);
      }
    };
    reader.readAsText(file);
  });

  body.querySelector('#btn-reset-demo').addEventListener('click', () => {
    if (!confirm('Isso vai restaurar os dados iniciais de demonstração neste navegador. Continuar?')) return;
    store.resetDemoData();
    ctx.toast('Dados iniciais restaurados.');
    refresh();
  });
}
