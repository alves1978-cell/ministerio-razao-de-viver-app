/**
 * Ponto de entrada do PWA Ministério Razão de Viver.
 * Controla roteamento, instalação PWA (Android/Desktop/iOS), modais e toasts.
 */
import { store } from './store.js';
import { renderHome, renderMusic, renderAgenda, renderInteract, renderAbout } from './ui-public.js';
import { renderAdmin } from './ui-admin.js';

const VALID_ROUTES = ['home', 'music', 'agenda', 'interact', 'about', 'admin'];
let currentRoute = 'home';
let deferredInstallPrompt = null;

const viewEl = document.getElementById('app-view');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalBody = document.getElementById('modal-body');
const toastContainer = document.getElementById('toast-container');

function toast(message, isError = false) {
  const el = document.createElement('div');
  el.className = `toast ${isError ? 'error' : ''}`;
  el.textContent = message;
  toastContainer.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.25s ease';
    setTimeout(() => el.remove(), 260);
  }, 3200);
}

function openModal({ title, subtitle = '', html }) {
  modalTitle.textContent = title;
  modalSubtitle.textContent = subtitle;
  modalSubtitle.classList.toggle('hidden', !subtitle);
  modalBody.innerHTML = html;
  modalBackdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBackdrop.classList.add('hidden');
  document.body.style.overflow = '';
}

function openInstallGuideModal() {
  openModal({
    title: 'Instalar o App no Celular',
    subtitle: 'Sem precisar baixar na loja • Gratuito e leve',
    html: `
      <div class="form-grid">
        <div class="card-subtle">
          <strong style="color:var(--gold-light);display:block;margin-bottom:6px;">🤖 No Android (Google Chrome)</strong>
          <ol style="margin:0;padding-left:18px;font-size:0.88rem;color:#DFD7CA;">
            <li>Abra o link do app no Chrome.</li>
            <li>Toque no botão <strong>"Instalar"</strong> no topo ou no menu <strong>⋮</strong> (3 pontinhos).</li>
            <li>Escolha <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.</li>
          </ol>
        </div>
        <div class="card-subtle">
          <strong style="color:var(--gold-light);display:block;margin-bottom:6px;">🍎 No iPhone / iPad (Safari)</strong>
          <ol style="margin:0;padding-left:18px;font-size:0.88rem;color:#DFD7CA;">
            <li>Abra o link do app no navegador <strong>Safari</strong>.</li>
            <li>Toque no ícone de <strong>Compartilhar</strong> (quadrado com seta para cima na barra inferior).</li>
            <li>Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.</li>
          </ol>
        </div>
        ${deferredInstallPrompt ? `<button class="btn btn-gold" id="modal-trigger-install">Instalar agora neste dispositivo</button>` : ''}
      </div>
    `,
  });

  document.getElementById('modal-trigger-install')?.addEventListener('click', () => {
    closeModal();
    triggerPwaInstall();
  });
}

const ctx = {
  navigate,
  toast,
  openModal,
  closeModal,
  openInstallGuideModal,
};

function updateNavActive(route) {
  document.querySelectorAll('[data-route]').forEach((el) => {
    el.classList.toggle('active', el.dataset.route === route);
  });
}

function renderCurrentRoute() {
  updateNavActive(currentRoute);
  viewEl.innerHTML = '';

  if (currentRoute === 'home') renderHome(viewEl, ctx);
  else if (currentRoute === 'music') renderMusic(viewEl, ctx);
  else if (currentRoute === 'agenda') renderAgenda(viewEl, ctx);
  else if (currentRoute === 'interact') renderInteract(viewEl, ctx);
  else if (currentRoute === 'about') renderAbout(viewEl, ctx);
  else if (currentRoute === 'admin') renderAdmin(viewEl, ctx);

  window.scrollTo({ top: 0, behavior: 'instant' });
}

function navigate(route, updateHash = true) {
  const next = VALID_ROUTES.includes(route) ? route : 'home';
  currentRoute = next;
  if (updateHash && window.location.hash !== `#${next}`) {
    window.location.hash = next;
  }
  renderCurrentRoute();
}

function syncFromHash() {
  const hash = (window.location.hash || '#home').replace('#', '').trim();
  navigate(VALID_ROUTES.includes(hash) ? hash : 'home', false);
}

// Eventos globais de navegação e modal
document.querySelectorAll('[data-route]').forEach((el) => {
  el.addEventListener('click', () => navigate(el.dataset.route));
});

document.getElementById('modal-close').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) closeModal();
});

// Botão compartilhar app
document.getElementById('btn-share-app').addEventListener('click', async () => {
  const shareData = {
    title: 'Ministério Razão de Viver',
    text: 'Conheça o app oficial do Ministério Razão de Viver — Músicas, Letras, Cifras, Agenda e Pedidos de Oração!',
    url: window.location.href,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch {}
  }
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast('Link do app copiado! Compartilhe no WhatsApp ou Instagram.');
  } catch {
    toast('Copie o endereço da barra do navegador para compartilhar.');
  }
});

// Instalação PWA
async function triggerPwaInstall() {
  if (!deferredInstallPrompt) {
    openInstallGuideModal();
    return;
  }
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  if (outcome === 'accepted') {
    toast('App instalado! Agora ele aparece na tela inicial do seu aparelho 🎉');
  }
  deferredInstallPrompt = null;
  document.getElementById('install-banner').classList.add('hidden');
  document.getElementById('btn-install-mobile').classList.add('hidden');
  document.getElementById('btn-install-desktop').classList.add('hidden');
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  document.getElementById('btn-install-mobile').classList.remove('hidden');
  document.getElementById('btn-install-desktop').classList.remove('hidden');
  if (!sessionStorage.getItem('mrv_install_dismissed')) {
    document.getElementById('install-banner').classList.remove('hidden');
  }
});

document.getElementById('btn-install-mobile').addEventListener('click', triggerPwaInstall);
document.getElementById('btn-install-desktop').addEventListener('click', triggerPwaInstall);
document.getElementById('btn-install-banner-go').addEventListener('click', triggerPwaInstall);
document.getElementById('btn-install-banner-close').addEventListener('click', () => {
  sessionStorage.setItem('mrv_install_dismissed', '1');
  document.getElementById('install-banner').classList.add('hidden');
});

// Registro do Service Worker (PWA Offline)
if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('Service Worker não registrado:', err);
    });
  });
}

window.addEventListener('hashchange', syncFromHash);

// Inicialização
(async function bootstrap() {
  await store.init();
  syncFromHash();
})();
