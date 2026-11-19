# CONTEXTO DO PROJETO — App Oficial Ministério Razão de Viver

> **Para retomar no Mac ou em outro PC:** abra a pasta deste repositório no Antigravity e peça:
> *"Leia o `CONTEXTO.md` e vamos continuar de onde paramos."*

---

## 1. Identidade do Projeto
- **Ministério:** Ministério Razão de Viver (Ministério de Música Católico)
- **Origem:** Paróquia Nossa Senhora de Guadalupe — Complexo do Alemão, Rio de Janeiro - RJ
- **Instagram:** `@razaodeviver.oficial` (https://www.instagram.com/razaodeviver.oficial/)
- **Repositório GitHub:** https://github.com/alves1978-cell/ministerio-razao-de-viver-app
- **Link Online (GitHub Pages — PWA):** https://alves1978-cell.github.io/ministerio-razao-de-viver-app/
- **Outro projeto na mesma conta GitHub (`alves1978-cell`):** `antropometria-hc2` (https://alves1978-cell.github.io/antropometria-hc2/)

---

## 2. Decisões de Arquitetura e Design
- **Formato:** Web App instalável (**PWA**) em HTML5, CSS3 e JavaScript modular (ES Modules), sem build nem dependência de Node.js — funciona direto no **GitHub Pages** gratuitamente e instala no Android e iPhone.
- **Visual:** Tema escuro elegante (`#0B0A09`) com detalhes em dourado/âmbar (`#E6A93B`), mobile-first com barra inferior fixa no celular e menu lateral no desktop.
- **Ícone oficial:** Marca **RV + Cruz** aplicada em `assets/img/icon-192.png` e `assets/img/icon-512.png`.
- **Banco de dados:** Atualmente em **Modo Local** (`localStorage` com migração automática por `DATA_VERSION = 5` em `js/store.js`, PIN admin padrão `2026` em `js/config.js`), já estruturado para conectar ao **Supabase gratuito** (`supabase/schema.sql`) assim que o ministério quiser sincronização em tempo real entre todos os usuários.

---

## 3. O Que Já Foi Feito (Status em 19/11/2026)
- [x] **Telas públicas completas** (`js/ui-public.js`):
  - **Início (`#home`):** Hero banner, aviso em destaque, barra com 8 plataformas, vitrine dos 2 CDs, próximo evento e chamada da enquete.
  - **Músicas & Cifras (`#music`):** Filtro por CD, busca por faixa, links diretos das plataformas e modal de **Letras & Cifras** com transposição automática (`−½` / `+½` semitons), sustenido/bemol, modo *Só Letra*, controle de fonte e botão copiar.
  - **Agenda (`#agenda`):** Filtros por categoria, link de rota Google Maps e compartilhamento.
  - **Interagir (`#interact`):** Pedidos de Oração (mural público com *"Estou rezando"* + opção sigilosa), Convites de Eventos (com botão WhatsApp) e Enquete de Repertório.
  - **Sobre (`#about`):** História, versículo, formação/integrantes, mapa da paróquia e guia de instalação no celular.
- [x] **Painel Administrativo da Banda** (`#admin`, `js/ui-admin.js`): CRUD de Agenda, CDs/Faixas/Cifras com prévia ao vivo, moderação de Pedidos de Oração, gestão de Convites (com resposta direta no WhatsApp), Enquetes, Configurações/Links e Backup JSON.
- [x] **Links oficiais integrados** (YouTube Topic, YouTube Music, Apple Music, Deezer, Amazon Music, TIDAL; Spotify com link de busca até confirmar URLs diretas dos álbuns).
- [x] **Capas oficiais dos 2 CDs aplicadas:**
  - `assets/img/capa-eu-nao-morri-em-vao.jpg`
  - `assets/img/capa-minha-obra.jpg`
- [x] **Discografia completa (20 faixas com cifras):**
  - **CD "Eu Não Morri em Vão" (10 faixas):** grades harmônicas oficiais (Enivaldo) com compassos `|`, ritornelos `||: :||`, `%`, `Fº` e transposição funcionando.
  - **CD "Minha Obra" (10 faixas):** *Revelar, Cura, Coragem, Estou Aqui, Grão de Areia, Identidade, Combate, Fidelidade, Por Tudo, Sou Teu* — letras revisadas e cifras em formato de cancioneiro (`[Acorde]sílaba`) prontas para ajuste fino no Painel da Banda.
- [x] **Publicação online no GitHub Pages** com HTTPS e Service Worker (`sw.js`, cache `razao-de-viver-v6`).

---

## 4. Próximos Passos Pendentes (Para Retomar Depois)
- [ ] Cadastrar os **nomes reais dos integrantes** da banda e seus instrumentos/funções (`js/seed-data.js` → `settings.members`).
- [ ] Atualizar o **WhatsApp oficial** de convites (`js/seed-data.js` → `settings.whatsappNumber`, atualmente placeholder `5521999999999`) e o e-mail de contato.
- [ ] Cadastrar a **agenda real** de missas, ensaios, retiros e eventos da banda.
- [ ] Revisar com os músicos eventuais detalhes de letras/acordes das 10 faixas preliminares do CD *"Minha Obra"* (e adicionar letras das 10 faixas de *"Eu Não Morri em Vão"* se desejarem).
- [ ] Confirmar e colar os **links diretos do Spotify** para os 2 álbuns (se disponíveis).
- [ ] Trocar a foto de fundo do banner inicial (`assets/img/hero-bg.jpg`) por uma foto real da banda tocando (opcional).
- [ ] **Ativar Supabase gratuito** (quando aprovarem a prévia com a banda): rodar `supabase/schema.sql`, criar login da banda em *Authentication → Users* e preencher `supabaseUrl` e `supabaseAnonKey` em `js/config.js` para que agenda, orações, convites e enquetes funcionem em tempo real para todo o público.

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
