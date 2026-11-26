# CONTEXTO DO PROJETO — App Oficial Ministério Razão de Viver

> **Para retomar no Mac ou em outro PC:** abra a pasta deste repositório no Antigravity e peça:
> *"Leia o `CONTEXTO.md` e vamos continuar de onde paramos."*

---

## 1. Identidade do Projeto
- **Ministério:** Ministério Razão de Viver (Ministério de Música Católico)
- **Origem:** Paróquia Nossa Senhora de Guadalupe — Complexo do Alemão, Rio de Janeiro - RJ
- **Instagram:** `@razaodeviver.oficial` (https://www.instagram.com/razaodeviver.oficial/)
- **Repositório GitHub:** https://github.com/alves1978-cell/ministerio-razao-de-viver-app
- **Domínio Oficial (GitHub Pages — PWA):** https://razaodeviver.com.br (arquivo `CNAME` configurado; fallback: https://alves1978-cell.github.io/ministerio-razao-de-viver-app/)
- **Outro projeto na mesma conta GitHub (`alves1978-cell`):** `antropometria-hc2` (https://alves1978-cell.github.io/antropometria-hc2/)

---

## 2. Decisões de Arquitetura e Design
- **Formato:** Web App instalável (**PWA**) em HTML5, CSS3 e JavaScript modular (ES Modules), sem build nem dependência de Node.js — funciona direto no **GitHub Pages** gratuitamente e instala no Android e iPhone.
- **Visual:** Tema escuro elegante (`#0B0A09`) com detalhes em dourado/âmbar (`#E6A93B`), mobile-first com barra inferior fixa no celular e menu lateral no desktop.
- **Ícone oficial:** Marca **RV + Cruz** aplicada em `assets/img/icon-192.png` e `assets/img/icon-512.png`.
- **Banco de dados:** Conectado ao **Supabase gratuito** (projeto `razaodeviver.oficial` — `https://luqsdvbjjvalgtymtnee.supabase.co`, tabelas + RLS + RPCs aplicados via `supabase/schema.sql`), com fallback automático para Modo Local (`DATA_VERSION = 16`) caso fique offline.

---

## 3. O Que Já Foi Feito (Status em 19/11/2026)
- [x] **Telas públicas completas** (`js/ui-public.js`):
  - **Início (`#home`):** Hero banner, aviso em destaque, barra com 8 plataformas, vitrine dos 2 CDs, próximo evento e chamada da enquete.
  - **Músicas & Cifras (`#music`):** Filtro por CD, busca por faixa, links diretos das plataformas e modal de **Letras & Cifras** com transposição automática (`−½` / `+½` semitons), sustenido/bemol, modo *Só Letra*, controle de fonte e botão copiar.
  - **Agenda (`#agenda`):** Filtros por categoria, link de rota Google Maps e compartilhamento.
  - **Interagir (`#interact`):** Pedidos de Oração (mural público com *"Estou rezando"* + opção sigilosa), Convites de Eventos (com botão WhatsApp) e Enquete de Repertório.
  - **Sobre (`#about`):** História, versículo, formação/integrantes, mapa da paróquia e guia de instalação no celular.
- [x] **Painel Administrativo da Banda** (`#admin`, `js/ui-admin.js`): CRUD de Agenda, CDs/Faixas/Cifras com prévia ao vivo, moderação de Pedidos de Oração, gestão de Convites (com resposta direta no WhatsApp), Enquetes, Configurações/Links e Backup JSON.
- [x] **Links oficiais integrados** em todas as plataformas (Spotify direto para os 2 álbuns, YouTube Topic, YouTube Music, Apple Music, Deezer, Amazon Music e TIDAL).
- [x] **Capas oficiais dos 2 CDs aplicadas:**
  - `assets/img/capa-eu-nao-morri-em-vao.jpg`
  - `assets/img/capa-minha-obra.jpg`
- [x] **Discografia completa (20 faixas com letras e cifras em formato de cancioneiro):**
  - **CD "Eu Não Morri em Vão" (10 faixas):** todas as 10 faixas com letras completas, links individuais do YouTube Music e cifras oficiais (grade Enivaldo) alinhadas em formato de cancioneiro (`[Acorde]sílaba`), com transposição e modo *Só Letra* funcionando.
  - **CD "Minha Obra" (10 faixas):** *Revelar, Cura, Coragem, Estou Aqui, Grão de Areia, Identidade, Combate, Fidelidade, Por Tudo, Sou Teu* — letras revisadas e cifras em formato de cancioneiro (`[Acorde]sílaba`) prontas para ajuste fino no Painel da Banda.
- [x] **Formação oficial da banda com fotos reais cadastrada** (`js/seed-data.js` → `settings.members` + `assets/img/membro-*.jpg`): Solymar Morais (Voz), Valmir de Melo (Guitarra), Fernando Santos (Baixo) e Luis Carlos (Bateria).
- [x] **Foto real da banda aplicada no banner inicial** (`assets/img/hero-bg.jpg`, quarteto acústico).
- [x] **Contato oficial atualizado** (`js/seed-data.js`): WhatsApp `(21) 99241-2774` (`5521992412774`) e e-mail `ministeriorazaodeviver@gmail.com` integrados em Convites, Sobre e Painel Admin.
- [x] **Agenda real cadastrada** (`js/seed-data.js`): **FEMUP 2026** (28/11/2026 às 13:45 com cartaz oficial `assets/img/evento-femup-2026.jpg` visualizável em modal), **Rosas de Guadalupe — Festa da Padroeira** (12/12/2026 às 19:30) e **Santa Missa Dominical** (Domingos às 07:00), todos na Paróquia Nossa Senhora de Guadalupe — Travessa Chiapas, s/n, Inhaúma, RJ.
- [x] **Cancioneiro Oficial em PDF disponível para download** (`assets/docs/cancioneiro-ministerio-razao-de-viver.pdf`, 44 páginas com todas as 20 faixas em versões Letra e Letra + Cifra) na seção **Músicas & Cifras (`#music`)** e atalho no **Início (`#home`)**.
- [x] **Supabase ativado na nuvem** (`razaodeviver.oficial` — `luqsdvbjjvalgtymtnee.supabase.co`): tabelas, segurança RLS, RPCs (`increment_prayer_count`, `vote_poll_option`), 2 álbuns, 3 eventos reais e enquete inicial criados e integrados em `js/config.js`.
- [x] **Publicação online no GitHub Pages** com HTTPS e Service Worker (`sw.js`, cache `razao-de-viver-v22`).

---

## 4. Próximos Passos Pendentes (Para Retomar Depois)
- [ ] Criar o usuário administrador da banda no Supabase (*Authentication → Users → Add user*, ex.: `ministeriorazaodeviver@gmail.com` + senha escolhida pela banda) para fazer login no Painel Admin (`#admin`).
- [ ] Revisar com os músicos eventuais detalhes de letras/posição dos acordes das faixas dos 2 CDs (incluindo o verso marcado para revisão em *"Mãe da Igreja"*).

---

## 5. Estrutura Principal dos Arquivos
- `index.html` — Estrutura do app e navegação (mobile bottom bar + desktop sidebar)
- `styles/app.css` — Tema escuro + dourado/âmbar responsivo
- `js/config.js` — PIN local e credenciais futuras do Supabase
- `js/seed-data.js` — Dados iniciais da banda, 2 CDs, 20 faixas e links oficiais
- `js/store.js` — Persistência unificada (`localStorage` + migração automática + suporte Supabase)
- `js/chords.js` — Motor de renderização e transposição de cifras (ChordPro + grades com compassos)
- `js/ui-public.js` / `js/ui-admin.js` / `js/app.js` — Telas públicas, Painel Admin e roteador PWA
- `manifest.webmanifest` e `sw.js` — Configuração de instalação PWA e cache offline
- `supabase/schema.sql` — Tabelas, segurança RLS e RPCs prontos para o Supabase
- `iniciar-local.bat` / `iniciar-local.ps1` — Servidor local 1-clique para Windows
