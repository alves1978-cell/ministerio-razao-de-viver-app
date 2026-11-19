# App Oficial — Ministério Razão de Viver

Bem-vindo ao projeto do aplicativo Web instalável (**PWA**) do **Ministério Razão de Viver** (Paróquia Nossa Senhora de Guadalupe — Complexo do Alemão, Rio de Janeiro - RJ).

Este app foi construído sem dependências pesadas: **não precisa instalar Node.js, Android Studio nem Xcode** para testar, editar ou publicar gratuitamente.

---

## 1. Como abrir e testar agora no seu computador (Windows)

1. Dê um **duplo clique** no arquivo `iniciar-local.bat`.
2. O app abrirá automaticamente no navegador em `http://127.0.0.1:8080`.
3. Para acessar a **Área da Banda (Painel Administrativo)**, clique no ícone de cadeado (🔒) ou em **Área da Banda** na barra lateral e digite o PIN padrão: **`2026`**.

> **Dica:** Para trocar o PIN do modo local, edite `localAdminPin` no arquivo `js/config.js`.

---

## 2. Como personalizar com as capas e links oficiais da banda

### Trocar imagens e capas dos CDs
Substitua os arquivos dentro da pasta `assets/img/` mantendo o mesmo nome:
- `assets/img/capa-eu-nao-morri-em-vao.jpg` — Capa oficial do CD *"Eu Não Morri em Vão"*
- `assets/img/capa-minha-obra.jpg` — Capa oficial do CD *"Minha Obra"*
- `assets/img/hero-bg.jpg` — Foto da banda ao vivo para o banner inicial
- `assets/img/icon-512.png` e `assets/img/icon-192.png` — Logo oficial do ministério (aparece como ícone na tela inicial do celular)

### Atualizar links, agenda, letras e cifras (sem mexer em código!)
Entre no **Painel Administrativo (🔒)**:
- **Links & Config:** Cole os links diretos do Spotify, YouTube, Apple Music, Deezer, Instagram (`@razaodeviver.oficial`) e o número de WhatsApp oficial para receber convites.
- **CDs & Cifras:** Cole as letras e cifras oficiais de todas as faixas. Você pode usar:
  - Formato `[G]palavra` para alinhar acordes exatamente sobre a sílaba, **ou**
  - Formato tradicional com os acordes na linha acima da letra.
  - O app reconhece e faz a **transposição de tom (`-½` / `+½`) automaticamente**!
- **Agenda:** Cadastre missas, shows, retiros e grupos de oração.
- **Orações / Convites / Enquetes:** Modere intenções, responda convites direto no WhatsApp e lance votações de repertório.

---

## 3. Como ativar o Banco de Dados Gratuito na Nuvem (Supabase)

No modo inicial (**Modo Local**), tudo o que você edita fica salvo no seu navegador (ótimo para testar e montar tudo). Para que **todo o público veja sua agenda atualizada, vote nas enquetes e envie pedidos de oração em tempo real**, conecte ao **Supabase** (plano gratuito):

1. Crie uma conta gratuita em **https://supabase.com** e clique em **New Project**.
2. No menu esquerdo do Supabase, abra **SQL Editor** → **New query**.
3. Copie todo o conteúdo do arquivo `supabase/schema.sql`, cole lá e clique em **Run**.
4. No menu **Authentication** → **Users** → **Add user**, crie o e-mail e senha que a banda vai usar para entrar no Painel Admin.
5. Vá em **Project Settings** → **API** e copie:
   - **Project URL**
   - **anon public key**
6. Cole esses dois valores no arquivo `js/config.js`:
   ```js
   supabaseUrl: 'https://SEU-PROJETO.supabase.co',
   supabaseAnonKey: 'SUA-CHAVE-ANON-AQUI',
   ```
Pronto! O app detecta automaticamente e passa a funcionar 100% online na nuvem com login seguro da banda.

---

## 4. Como publicar gratuitamente na internet (e gerar QR Code para shows e missas)

A forma mais fácil e 100% gratuita (com cadeado HTTPS obrigatório para instalar como PWA):

### Opção A — Netlify Drop (mais rápido, 30 segundos)
1. Acesse **https://app.netlify.com/drop** (faça login gratuito).
2. Arraste a pasta inteira `ministerio-razao-de-viver-app` para a página.
3. O Netlify gera na hora um endereço `https://...netlify.app` (você pode renomear para algo como `razaodeviver.netlify.app`).

### Opção B — Vercel ou GitHub Pages
Também funcionam 100% gratuitamente com esta pasta sem precisar de comando de build.

### Divulgação nas missas e no Instagram
- Coloque o link do app na bio do `@razaodeviver.oficial`.
- Gere um **QR Code** com esse link para projetar no telão ou colocar nos banners de shows e missas: quem apontar a câmera já abre e instala o app direto no Android ou iPhone!
