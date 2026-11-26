/**
 * Dados iniciais oficiais do Ministério Razão de Viver.
 * Tudo aqui pode ser editado diretamente no Painel Administrativo do app.
 */
export const SEED_DATA = {
  settings: {
    name: 'Ministério Razão de Viver',
    tagline: 'Evangelizando através da música católica',
    parish: 'Paróquia Nossa Senhora de Guadalupe',
    neighborhood: 'Complexo do Alemão — Rio de Janeiro, RJ',
    instagramHandle: '@razaodeviver.oficial',
    instagramUrl: 'https://www.instagram.com/razaodeviver.oficial/',
    spotifyUrl: 'https://open.spotify.com/intl-pt/album/2LAzjFP68xMJDWUUe91R5F',
    youtubeUrl: 'https://www.youtube.com/channel/UChgi_VG-Ez5u1rJnSK5gNUA/releases',
    youtubeMusicUrl: 'https://music.youtube.com/playlist?list=OLAK5uy_mtfnEn_iW-hJfpXxN67cfxrT7LX-CC6Zk',
    appleMusicUrl: 'https://music.apple.com/br/album/minha-obra/1713821377',
    deezerUrl: 'https://www.deezer.com/album/504873081',
    amazonMusicUrl: 'https://music.amazon.com/albums/B0CLWYJRW5',
    tidalUrl: 'https://tidal.com/browse/album/324558289',
    whatsappNumber: '5521992412774',
    contactEmail: 'ministeriorazaodeviver@gmail.com',
    heroNotice: 'Ouça nossos dois CDs nas plataformas digitais e envie seu pedido de oração!',
    aboutBio:
      'O Ministério Razão de Viver nasceu na Paróquia Nossa Senhora de Guadalupe, no Complexo do Alemão (Rio de Janeiro - RJ), com a missão de anunciar o Evangelho por meio da música católica. Com dois CDs gravados — "Eu Não Morri em Vão" e "Minha Obra" — levamos louvor, adoração e esperança para missas, grupos de oração, retiros e eventos em toda a comunidade e além.',
    missionQuote: '“Cantai ao Senhor um cântico novo, porque Ele fez maravilhas.” — Salmo 98,1',
    members: [
      { id: 'm1', name: 'Solymar Morais', role: 'Voz', photo: './assets/img/membro-solymar.jpg', photoPos: '50% 30%', photoScale: 1.05 },
      { id: 'm2', name: 'Valmir de Melo', role: 'Guitarra', photo: './assets/img/membro-valmir.jpg', photoPos: '56% 42%', photoScale: 1.55 },
      { id: 'm3', name: 'Fernando Santos', role: 'Baixo', photo: './assets/img/membro-fernando.jpg', photoPos: '48% 55%', photoScale: 2.15 },
      { id: 'm4', name: 'Luis Carlos', role: 'Bateria', photo: './assets/img/membro-luis.jpg?v=2', photoPos: '50% 35%', photoScale: 1.0 },
    ],
  },

  albums: [
    {
      id: 'alb-eu-nao-morri',
      title: 'Eu Não Morri em Vão',
      year: '2023',
      releaseDate: '04/11/2023 • Tratore',
      cover: './assets/img/capa-eu-nao-morri-em-vao.jpg?v=4',
      description:
        'Um convite profundo à fé, ao perdão e à esperança no amor redentor de Cristo. Reúne 10 canções de adoração, entrega e devoção mariana.',
      spotifyUrl: 'https://open.spotify.com/intl-pt/album/5mzHspGLcO4W63muX8bvrH',
      youtubeUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_mGogJUuDO79hlbUGs-uAjOo2Kg0PX6cvQ',
      youtubeMusicUrl: 'https://music.youtube.com/playlist?list=OLAK5uy_mGogJUuDO79hlbUGs-uAjOo2Kg0PX6cvQ',
      appleMusicUrl: 'https://music.apple.com/br/album/eu-n%C3%A3o-morri-em-v%C3%A3o/1713822740',
      deezerUrl: 'https://www.deezer.com/album/504873461',
      amazonMusicUrl: 'https://music.amazon.com/albums/B0CLX12K59',
      tidalUrl: 'https://tidal.com/browse/album/324558487',
    },
    {
      id: 'alb-minha-obra',
      title: 'Minha Obra',
      year: '2023',
      releaseDate: '04/11/2023 • Tratore',
      cover: './assets/img/capa-minha-obra.jpg?v=3',
      description:
        '10 canções que celebram a ação transformadora de Deus em cada vida — cura interior, vocação e o chamado para sermos instrumentos de Sua graça.',
      spotifyUrl: 'https://open.spotify.com/intl-pt/album/2LAzjFP68xMJDWUUe91R5F',
      youtubeUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_mtfnEn_iW-hJfpXxN67cfxrT7LX-CC6Zk',
      youtubeMusicUrl: 'https://music.youtube.com/playlist?list=OLAK5uy_mtfnEn_iW-hJfpXxN67cfxrT7LX-CC6Zk',
      appleMusicUrl: 'https://music.apple.com/br/album/minha-obra/1713821377',
      deezerUrl: 'https://www.deezer.com/album/504873081',
      amazonMusicUrl: 'https://music.amazon.com/albums/B0CLWYJRW5',
      tidalUrl: 'https://tidal.com/browse/album/324558289',
    },
  ],

  tracks: [
    // CD 1: Eu Não Morri em Vão (Letras + Cifras alinhadas sobre a letra com base na grade oficial do Enivaldo)
    {
      id: 'trk-1',
      albumId: 'alb-eu-nao-morri',
      number: 1,
      title: 'Eu Não Morri em Vão',
      duration: '4:32',
      key: 'A',
      bpm: '',
      listenUrl: 'https://music.youtube.com/watch?v=6MaAUzMMDTU',
      lyricsChords: `[Intro]
A9   F#m7   D9   E  D/F#  E/G#   (2x)

[Verso]
[A9]Eu sei que está difícil, eu sei que [F#m7]está pesado
[D9]Eu sei que o fardo é [Bm7]grande, mas Eu ca[E]minho a teu lado
[A9]Eu sei que a dor existe, conheço as [F#m7]tribulações
[D9]Eu sei que andavas [Bm7]triste, Eu ouço [E]suas ora[E4]ções  [E]  (2x)

[Pré-Refrão]
[F#m7]Mas Eu sei também que você não [D]deve desis[E]tir
[F#m7]Ignorando a sua mis[D9]são  [E]
[D9]Você é Meu filho a[E]mado (2x)

[Refrão]
[A]Então vai e não [E]caias [Fº]mais, [F#m7]mostre ao seu ir[D]mão
Que Eu não morri em [E]vão
[A]Vai, e se preci[E]sar, [Fº]olhe [F#m7]para a [A/E]cruz
[D]Vazia ela es[Bm7]tá, e se alguém pergun[E]tar...

[Solo]
A9   E  Fº   F#m7  D9   E   A9   E  Fº   F#m7  A/E   D9  Bm7   E

[Refrão Final]
[A9]Então vai e não [E]caias [Fº]mais, [F#m7]mostre ao seu ir[D9]mão
Que Eu não morri em [E]vão
[A9]Vai, e se preci[E]sar, [Fº]olhe [F#m7]para a [A/E]cruz
[D9]Vazia ela es[Bm7]tá, e se alguém pergun[E]tar...
[F]Meu nome é, [G]Meu nome é Je[A]sus!  [D/A]  [F/A]  [E/A]  [D/A]

Cifra alinhada da grade harmônica oficial (Enivaldo) — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-2',
      albumId: 'alb-eu-nao-morri',
      number: 2,
      title: 'Pai Perdoa (Pai)',
      duration: '4:18',
      key: 'D',
      bpm: '',
      listenUrl: 'https://music.youtube.com/watch?v=9RbfehQxUJk',
      lyricsChords: `[Verso 1]
[D]Pai, me per[G]doa
[D]Pai, me so[G]corre
[Em]Pai, não estou aqui à [A]toa
[Em]Pai, de quem tudo [A]pode

[Verso 2]
[D]Pai, eu sei que er[G]rei
[D]Pai, sei que omi[G]ti
[Em]Pai, eu sei que pe[A]quei
[Em]Pai, agora estou a[A]qui  [A4]  [A7]

[Refrão]
[D]Pai, perdoa os [A]meus pecados
[Bm]Pai, perdoa a falta de [F#m]oração
[G]Pai, perdoa toda a [D]humani[Bm]dade
[C]Pai, perdoa o [A]meu irmão  [A4]  [A7]

[Verso 2]
[D]Pai, eu sei que er[G]rei
[D]Pai, sei que omi[G]ti
[Em]Pai, eu sei que pe[A]quei
[Em]Pai, agora estou a[A]qui  [A4]  [A7]

[Refrão]
[D]Pai, perdoa os [A]meus pecados
[Bm]Pai, perdoa a falta de [F#m]oração
[G]Pai, perdoa toda a [D]humani[Bm]dade
[C]Pai, perdoa o [A]meu irmão  [A4]  [A7]

[Ponte]
[D]Tu és mara[A]vilha em [Bm]minha [F#m]vida
Com Tua [D]santa prote[A]ção
[D]Ao pe[A]dido de um [Bm]filho, [F#m]Pai
[D]Não sabe dizer [A]não

[Refrão Final (2x)]
[D]Pai, perdoa os [A]meus pecados
[Bm]Pai, perdoa a falta de [F#m]oração
[G]Pai, perdoa toda a [D]humani[Bm]dade
[C]Pai, perdoa o [A]meu irmão  [D]

Cifra alinhada da grade harmônica oficial (Enivaldo) — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-3',
      albumId: 'alb-eu-nao-morri',
      number: 3,
      title: 'Tudo Posso',
      duration: '3:55',
      key: 'D',
      bpm: '',
      listenUrl: 'https://music.youtube.com/watch?v=oUUImk5Asl0',
      lyricsChords: `[Intro]
A9  D9   E9  D9   A9  D9   E9  D9   (2x)

[Verso 1]
[D]Não existe dor, [G]não existe sofrimento
[D]Não existe tristeza, são fra[G]quezas de momento
[Bm]Que me fazem desa[G]bar
Minha [A]rocha é Jesus

[Verso 2]
[D]Mas existe fé, [G]não existe solidão
[D]Existe a Igreja constru[G]indo a comunhão
[Bm]Nada faz eu desvi[G]ar
Da es[A]trada de Jesus

[Refrão]
[D]Tudo posso nA[G]quele que me forta[A]lece
[D]Tudo posso nA[G]quele que venceu a [A]morte
[D]Tudo posso nA[G]quele que ouve minha [A]prece
[D]Quando estou [G]fraco é que estou [A]forte

[Verso 1]
[D]Não existe dor, [G]não existe sofrimento
[D]Não existe tristeza, são fra[G]quezas de momento
[Bm]Que me fazem desa[G]bar
Minha [A]rocha é Jesus

[Verso 2]
[D]Mas existe fé, [G]não existe solidão
[D]Existe a Igreja constru[G]indo a comunhão
[Bm]Nada faz eu desvi[G]ar
Da es[A]trada de Jesus

[Refrão Final]
[D]Tudo posso nA[G]quele que me forta[A]lece
[D]Tudo posso nA[G]quele que venceu a [A]morte
[D]Tudo posso nA[G]quele que ouve minha [A]prece
[D]Quando estou [G]fraco é que estou [A]forte

[Final (Intro)]
A9  D9   E9  D9   A9  D9   E9  D9   A

Cifra alinhada da grade harmônica oficial (Enivaldo) — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-4',
      albumId: 'alb-eu-nao-morri',
      number: 4,
      title: 'Servo Ungido',
      duration: '4:10',
      key: 'C',
      bpm: '',
      listenUrl: 'https://music.youtube.com/watch?v=eWwhI0oXdnM',
      lyricsChords: `[Intro]
Dm  F   C   Dm  F   C

[Verso 1]
[Dm]Tomado pelas [F]mãos para as nações derru[C]bar
[Dm]E diante [F]dele os reis desar[C]mar, disse o Senhor
[Dm]Eu sou o Se[F]nhor, sem ri[C]val
[Dm]Eu sou o Se[F]nhor, sem ri[C]val

[Verso 2]
[Dm]Tomado pelas [F]mãos para as nações derru[C]bar
[Dm]E diante [F]dele os reis desar[C]mar, disse o Senhor
[Dm]Eu sou o Se[F]nhor, sem ri[C]val
[Dm]Eu sou o Se[F]nhor, sem ri[C]val

[Ponte 1]
[Am]E Eu mesmo diante de [E]ti, aplainando montanhas
[C]Derrubando os batentes de [G/B]bronze da Babi[G]lônia
[Am]E arrancando os ferrolhos de [E]ferro
[Am]Não há outro Deus além de [E]Mim

[Ponte 2]
[C]Eu te cingi quando tu [G/B]não Me conhe[G]cias
[C]Para que saibam, do le[G/B]vante ao po[G]ente
[Am]Porque não existe nada fora de [E]Mim
[Am]Porque não existe nada fora de [E]Mim

[Refrão Final (repete até o final)]
Porque Eu [F]sou o Senhor, sem ri[C]val
Eu [F]sou o Senhor, sem ri[C]val
Eu [F]sou o Senhor, sem ri[C]val
Eu [F]sou o Senhor, sem ri[C]val

Cifra alinhada da grade harmônica oficial (Enivaldo) — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-5',
      albumId: 'alb-eu-nao-morri',
      number: 5,
      title: 'O Senhor Está Aqui',
      duration: '4:40',
      key: 'Em',
      bpm: '',
      listenUrl: 'https://music.youtube.com/watch?v=4_zhdH-Dptk',
      lyricsChords: `[Intro]
Em   D/F#   G   C  B7   Em   D/F#   G   C

[Refrão (2x)]
[Em]É preciso Te encon[D/F#]trar
[G]É preciso Te se[C]guir  [B7]
[Em]É preciso Te to[D/F#]car
[G]O Senhor está a[C]qui  [B7]

[Verso]
[Em]O Senhor está [D/F#]dentro de [G]nós
[C]O Senhor está [G]dentro de [D]mim
[Em]O Senhor quer ou[D/F#]vir sua [G]voz
[C]É preciso di[G]zer: "[D]Sim"

[Ponte]
[Am]O que Maria fa[C]lou eu também quero e posso fa[G]lar
[Am]Agora que eu posso, Se[C]nhor, tocar e can[B7]tar

[Refrão (2x)]
[Em]É preciso Te encon[D/F#]trar
[G]É preciso Te se[C]guir  [B7]
[Em]É preciso Te to[D/F#]car
[G]O Senhor está a[C]qui  [B7]

[Verso]
[Em]O Senhor está [D/F#]dentro de [G]nós
[C]O Senhor está [G]dentro de [D]mim
[Em]O Senhor quer ou[D/F#]vir sua [G]voz
[C]É preciso di[G]zer: "[D]Sim"

[Ponte]
[Am]O que Maria fa[C]lou eu também quero e posso fa[G]lar
[Am]Agora que eu posso, Se[C]nhor, tocar e can[B7]tar

[Refrão (2x)]
[Em]É preciso Te encon[D/F#]trar
[G]É preciso Te se[C]guir  [B7]
[Em]É preciso Te to[D/F#]car
[G]O Senhor está a[C]qui  [B7]

[Solo de Guitarra]
Em   D/F#   G   C  B7   (2x)

[Ponte]
[Am]O que Maria fa[C]lou eu também quero e posso fa[G]lar
[Am]Agora que eu posso, Se[C]nhor, tocar e can[B7]tar

[Refrão Final (2x)]
[Em]É preciso Te encon[D/F#]trar
[G]É preciso Te se[C]guir  [B7]
[Em]É preciso Te to[D/F#]car
[G]O Senhor está a[C]qui  [B7]
[Em]O Senhor está a[D/F#]qui, [G]O Senhor está a[C]qui  [B7]  [Em]

Cifra alinhada da grade harmônica oficial (Enivaldo) — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-6',
      albumId: 'alb-eu-nao-morri',
      number: 6,
      title: 'Mãe da Igreja',
      duration: '4:25',
      key: 'E',
      bpm: '',
      listenUrl: 'https://music.youtube.com/watch?v=YLc-feH-yT8',
      lyricsChords: `[Intro]
E   A9   E   A9

[Refrão]
[E]Maria, meu re[A9]fúgio
[E]Maria, forta[A9]leza
[E]Maria, Mãe de [A9]Deus
[E]Maria, Mãe da I[A9]greja

[Verso]
[E]És Virgem Imacu[A9]lada
[E]A Mãe do meu Se[A9]nhor
[E]A Mãe interces[A9]sora
[E]Junto ao meu Salva[A9]dor

[Ponte]
[G]Te faço lou[D]vores, ó Se[Em]nhora  [C]
[G]Ave, cheia de [C]graça, Mãe da vi[D]tória
Ventre livre das chagas (revisar verso)  [D4]  [D]

[Refrão]
[E]Maria, meu re[A9]fúgio
[E]Maria, forta[A9]leza
[E]Maria, Mãe de [A9]Deus
[E]Maria, Mãe da I[A9]greja

[Verso]
[E]És Virgem Imacu[A9]lada
[E]A Mãe do meu Se[A9]nhor
[E]A Mãe interces[A9]sora
[E]Junto ao meu Salva[A9]dor

[Ponte]
[G]Te faço lou[D]vores, ó Se[Em]nhora  [C]
[G]Ave, cheia de [C]graça, Mãe da vi[D]tória
Ventre livre das chagas (revisar verso)  [D4]  [D]

[Refrão Final (2x — só vocal ao final)]
[E]Maria, meu re[A9]fúgio, [E]Maria, forta[A9]leza
[E]Maria, Mãe de [A9]Deus, [E]Maria, Mãe da I[A9]greja
[E]És Virgem Imacu[A9]lada, [E]a Mãe do meu Se[A9]nhor
[E]A Mãe interces[A9]sora, [E]junto ao meu Salva[A9]dor
[E]Junto ao meu Salva[A9]dor, Salva[E]dor

Cifra alinhada da grade harmônica oficial (Enivaldo) — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-7',
      albumId: 'alb-eu-nao-morri',
      number: 7,
      title: 'Reencontro',
      duration: '3:58',
      key: 'A',
      bpm: '',
      listenUrl: 'https://music.youtube.com/watch?v=rljQJeYjJao',
      lyricsChords: `[Intro]
A  A/G   D/F#  Dm/F   A/E  E   A  E

[Verso 1]
[A]Por quantas vezes eu so[E]fri, menti, fin[F#m]gi, cho[A/E]rei
[D]E até ten[A/C#]tei sor[G]rir, um riso ilu[E]dido...
[A]Por quantas vezes eu ten[E]tei algum [F#m]dia  [A/E]
[D]Encontrar uma ra[A/C#]zão, uma res[G]posta pro meu va[E]zio
[A]Foi qui[C#7/G#]mera, ilu[F#m]são  [A/E]
[D]Comodismo, [G]soli[E]dão...

[Refrão]
[A]Eu quero vol[E]tar, eu pre[F#m]ciso es[A/E]tar ao [D]lado
[A]Do Se[E]nhor  [A]  [E]

[Verso 2]
[F#m]E do Se[F#m/F]nhor ten[F#m/E]tei me afas[F#m/Eb]tar
[F#m]Por não conhe[F#m/F]cer ou não que[F#m/E]rer por [F#m/Eb]Ele
[G]Ser reconhe[E]cido...

[Refrão Final (2x)]
[A]Eu quero vol[E]tar, eu pre[F#m]ciso es[A/E]tar ao [D]lado
[A]Do Se[E]nhor  [A]  [E]
[A]Eu quero vol[E]tar, eu pre[F#m]ciso es[A/E]tar ao [D]lado
[A]Do Se[E]nhor  [A]  [D]  [Dm/F]  [A7M]

Cifra alinhada da grade harmônica oficial (Enivaldo) — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-8',
      albumId: 'alb-eu-nao-morri',
      number: 8,
      title: 'De Que Valem as Lágrimas',
      duration: '4:15',
      key: 'D',
      bpm: '',
      listenUrl: 'https://music.youtube.com/watch?v=0NuGq-1KWa4',
      lyricsChords: `[Intro]
D   G   A9   (2x)

[Verso 1]
[D]De que valem as [G]lágrimas
[Em]Se não houver o arrepen[A9]dimento?
[D]De que vale o a[G]mor
[Em]Se não praticamos esse senti[A9]mento?

[Refrão]
[Bm]E de que vale ser [G]tudo?
[Bm]E de que vale ser [G]tudo
[Em]Se sem Deus não somos [A9]nada?
Nós não somos nada

[Verso 2]
[D]De que vale a ami[G]zade
[Em]Se só traz a falsi[A9]dade?
[D]De que vale a men[G]tira
[Em]Quando existe a ver[A9]dade?

[Refrão]
[Bm]E de que vale ser [G]tudo?
[Bm]E de que vale ser [G]tudo
[Em]Se sem Deus não somos [A9]nada?
Não somos nada

[Ponte]
[Bm]O que fazes é previ[F#m]sível, [G]nada se es[A9]conde
[Bm]O que falas também é sen[F#m]sível e [G]falta a ver[A9]dade

[Verso 3]
[D]De que vale fu[G]gir
[Em]De sua fé, religi[A9]ão?
[D]Somos todos filhos de [G]Deus
[Em]Brancos, negros, sem discrimina[A9]ção

[Final]
[Bm]O que adianta o[G]rar
[Bm]Se fazemos tudo er[G]rado?
[Bm]É fácil ter Cristo no [G]peito
[Em]Difícil é andar ao Seu [A9]lado
[D]Ao Seu [G]lado, [Em]ao Seu [A9]lado  [D]

Cifra alinhada da grade harmônica oficial (Enivaldo) — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-9',
      albumId: 'alb-eu-nao-morri',
      number: 9,
      title: 'Face',
      duration: '4:02',
      key: 'C',
      bpm: '',
      listenUrl: 'https://music.youtube.com/watch?v=zDSyyXsBfx4',
      lyricsChords: `[Intro]
C   G   Bb   F   (2x)

[Verso 1]
[C]Há em mim uma [G]chama de amor
[Am]Que é de Deus e que [C/G]brilha
[G#]Nos caminhos por [Fm]onde eu andar
A [G4]chama lá esta[G]rá
[C]Há em mim um [G]vento impetuoso
[Am]Que restaura e que [C/G]cura
[G#]E quando me [Fm]ponho a orar
[G4]Tu em mim es[G]tás

[Refrão (2x)]
[C]De Ti [G]nada posso escon[Am]der  [Em]
[F]Não tenho se[Dm]gredo a guar[Bb]dar  [G]
[C]Minha [G]face Te [Am]busca  [Em]
[F]Só Tu [Dm]podes me ampa[Bb]rar  [G]

[Verso 2]
[C]Há em mim uma [G]chama de amor
[Am]Que é de Deus e que [C/G]brilha
[G#]Nos caminhos por [Fm]onde eu andar
A [G4]chama lá esta[G]rá
[C]Há em mim um [G]vento impetuoso
[Am]Que restaura e que [C/G]cura
[G#]E quando me [Fm]ponho a orar
[G4]Tu em mim esta[G]rás

[Refrão (2x)]
[C]De Ti [G]nada posso escon[Am]der  [Em]
[F]Não tenho se[Dm]gredo a guar[Bb]dar  [G]
[C]Minha [G]face Te [Am]busca  [Em]
[F]Só Tu [Dm]podes me ampa[Bb]rar  [G]

[Ponte]
[Bb]Eu quero Te [F]ver, [C]face a face
[Bb]Sem cessar em [F]mim acen[C]der
[Bb]És Tu, Se[F]nhor, o [C]Deus que tudo pode
[Bb]Em meio às [F]tribula[G]ções

[Refrão Final (2x)]
[C]De Ti [G]nada posso escon[Am]der  [Em]
[F]Não tenho se[Dm]gredo a guar[Bb]dar  [G]
[C]Minha [G]face Te [Am]busca  [Em]
[F]Só Tu [Dm]podes me ampa[Bb]rar  [G]  [C]

Cifra alinhada da grade harmônica oficial (Enivaldo) — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-10',
      albumId: 'alb-eu-nao-morri',
      number: 10,
      title: 'Sem o Sol',
      duration: '3:50',
      key: 'E',
      bpm: '',
      listenUrl: 'https://music.youtube.com/watch?v=ZiYqzLnzt10',
      lyricsChords: `[Intro]
E   (4x)

[Verso 1]
[C#m]Certas manhãs sem o [A9]sol
[B]Quando o frio [E]cai  [E7M]
[C#m]Qual direção em que [A9]vou?
[B]Sem a Tua mão não [E]dá
[C#m]Nessas manhãs sem o [A9]sol
[B]E tudo se [E]vai  [E7M]
[C#m]Qual o lugar em que es[A9]tou?
[B]Sem a Tua voz não [E]dá

[Refrão]
[F#m]Você faz tudo [B]aconte[C#m]cer
[F#m]Coração para [B]de do[C#m]er
[G#]Quando estás aqui

[Verso 2]
[C#m]Outras manhãs sem o [A9]sol
[B]Quando Você [E]sai  [E7M]
[C#m]Eu me pergunto quem [A9]sou
[B]E a solidão em [E]mim

[Refrão]
[F#m]Você faz tudo [B]aconte[C#m]cer
[F#m]Coração para [B]de do[C#m]er
[G#]Quando estás aqui

[Ponte]
[F#]Traz o sol com Você pra [G#]mim
[F#]Todas as manhãs as[G#]sim
[C#]Então tudo se a[F#]calma  [B]
[C#]Calor invade minh'[F#]alma  [B]  [E]

[Refrão Final]
[F#m]Você faz tudo [B]aconte[C#m]cer
[F#m]Coração para [B]de do[C#m]er
[F#m]Você faz tudo [B]aconte[C#m]cer
[F#m]Coração para [B]de do[C#m]er
[G#]Quando estás aqui
Sempre [C#m]Tu

Cifra alinhada da grade harmônica oficial (Enivaldo) — ajustável no Painel da Banda`,
    },

    // CD 2: Minha Obra (Todas as 10 faixas com letras e cifras em formato de cancioneiro)
    {
      id: 'trk-11',
      albumId: 'alb-minha-obra',
      number: 1,
      title: 'Revelar',
      duration: '4:10',
      key: 'A',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
A   E   F#m   D   (2x)

[Verso]
[A]Não posso tocar, [E]não posso ver
[F#m]Mas posso sentir, [D]mas posso crer
[A]Eu posso tocar, [E]não posso ver
[F#m]Mas posso sentir e [D]posso viver

[Refrão]
[A]Deus é o Espírito, [E]devemos adorar
[D]Ele revela a Jesus e eu devo revelar
[A]Deus é o Espírito, [E]devemos adorar
[D]Ele revela a Jesus e eu devo revelar

[Ponte]
[F#m]Fortalece
[E]Engrandece
[D]Atendei a cada prece
Que a Ti há de chegar

[Verso]
[A]Não posso tocar, [E]não posso ver
[F#m]Mas posso sentir, [D]mas posso viver

[Refrão]
[A]Deus é o Espírito, [E]devemos adorar
[D]Ele revela a Jesus e eu devo revelar (2x)

[Ponte]
[F#m]Fortalece, [E]engrandece
[D]Atendei a cada prece que a Ti há de chegar

[Final]
[F#m]Deus é o Espírito, [D]devemos adorar
[E]Ele revela a Jesus e eu devo revelar [A]

Cifra base adaptada da gravação — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-12',
      albumId: 'alb-minha-obra',
      number: 2,
      title: 'Cura',
      duration: '4:27',
      key: 'D',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
Bm   D   A   (2x)   Bm   D   A   D

[Verso 1]
[Em]Minhas pernas já não [G]podem se mover
[D]Minha alma Te pede, pre[A]ciso Te tocar
[Em]Meus problemas me o[G]fuscam a visão
[D]Quero enxergar, faz-me [A]ver com o coração

[Verso 2]
[Em]Eu sei quem és, em Teu [G]colo posso repousar
[D]Com Teu sangue [A]podes me lavar
[Em]Elimina o que em mim vem de [G]Ti me afastar
[D]Se queres, podes me cu[A]rar

[Refrão (2x)]
[D]Vem e cura a minha [A]vida
E trans[D]forma o meu ser
[D]Vem e cura a minha [A]vida
Teste[Bm]munho eu vou [G]ser

[Ponte]
[Bm]Sei, não sou digna de Tuas san[G]dálias desatar
[D]Diante de Ti, Senhor, vou me pros[A]trar
[Bm]Liberta-me, Jesus
[D]Liberta-me, Jesus
[A]Cura-me, Jesus
[Bm]Cura-me, Je[D]sus

[Refrão Final (2x)]
[D]Vem e cura a minha [A]vida
E trans[Bm]forma o meu [D]ser
[D]Vem e cura a minha [A]vida
Teste[Bm]munho eu vou [D]ser  [A]  [D]

Cifra base adaptada da gravação — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-13',
      albumId: 'alb-minha-obra',
      number: 3,
      title: 'Coragem',
      duration: '3:48',
      key: 'A',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
A   E   D   E   D   A   D   E

[Verso 1]
[A]Em tempos difíceis sen[E]timos o carinho de [D]Deus
Mão forte e pode[A]rosa que vem nos arrebatar

[Verso 2]
[D]Luz que impulsiona, vento que [A]sopra onde quer
Doce presença, voz reve[E]lada pela fé

[Refrão (2x)]
[F#m]Sim, já não há o que te[D]mer
Se co[Bm]nosco es[A]tás
A vi[D]tória em nossa [E]vida é certa
Verdade, promessa do [A]Pai

[Ponte]
[F#m]Disse o Senhor:
No mundo afli[D]ções encontrarás
[Bm]Coragem, Eu venci o mundo
Por vo[E]cê   [A]

[Refrão Final (2x)]
[F#m]Sim, já não há o que te[D]mer
Se co[Bm]nosco es[A]tás
A vi[D]tória em nossa [E]vida é certa
Verdade, promessa do [A]Pai

Cifra base adaptada da gravação — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-14',
      albumId: 'alb-minha-obra',
      number: 4,
      title: 'Estou Aqui',
      duration: '4:30',
      key: 'A',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
A   E   C#m   A   E   A

[Verso 1]
[A]Quantos caminhos, quantas [D]vezes me per[E]di
[F#m]Quantas vezes nem olhei pra [Bm]Ti, tive pressa
E esque[D]ci do que devo [E]ser
[A]Ao meu redor só soli[D]dão, estou tão [E]só
Um va[F#m]zio que cresce [D]dentro de [E]mim

[Refrão]
[A]Estou aqui, quero em [D]Teus braços [E]me aconche[F#m]gar
Sara o meu so[D]frer e a minha [E]dor
[A]Estou aqui, quero em [D]Teus braços [E]me aconche[F#m]gar
Sara o meu so[Bm]frer e alivia a [E]minha dor
[C#m]Hoje, Se[F#m]nhor, [D]vem me [E]restau[A]rar

[Verso 2]
[A]Preciso de uma luz, pre[D]ciso de uma dire[E]ção
[F#m]Não sei o que fazer, sem [Bm]rumo, sem paz, sem Vo[D]cê  [E]

[Ponte]
[Bm]Eu quero ser um [E]vaso novo [A]
E ser la[Bm]vado em Teu [E]sangue derra[A]mado
[G#m]  [F#m]  [E]  [B]  [E]

[Refrão Final]
[A]Estou aqui, quero em [D]Teus braços [E]me aconche[F#m]gar
Sara o meu so[D]frer e a minha [E]dor
[A]Estou aqui, quero em [D]Teus braços [E]me aconche[F#m]gar
Sara o meu so[Bm]frer e alivia a [E]minha dor
[C#m]Hoje, Se[F#m]nhor, [D]vem me [E]restau[D]rar  [Bm]  [E]  [A]

Cifra base adaptada da gravação — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-15',
      albumId: 'alb-minha-obra',
      number: 5,
      title: 'Grão de Areia',
      duration: '5:04',
      key: 'D',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
D   A   Bm   G   (2x)

[Verso]
[D]Um grão de areia
Tão [A]sujo, tão pe[G]queno
[D]Um grão de areia
Tão [A]fraco, tão in[G]gênuo
[Bm]O pecado me corrói
A dis[G]tância me destrói
Me a[D]fastam do mar de [A]Deus

[Pré-Refrão]
[Bm]É a vontade de vol[G]tar
E eu pre[D]ciso mergu[A]lhar
No amor de [G]Deus

[Refrão]
[D]Sou um grão de a[A]reia
Em [Bm]busca de um [G]mar
Um [D]mar de [A]Deus
[D]Sou um grão de a[A]reia
Que pre[Bm]cisa vol[G]tar
Pro [D]mar que é [A]Deus

[Ponte]
[Bm]Eu preciso mergu[A]lhar
Eu pre[D]ciso vol[G]tar
[Bm]O mar é [A]Deus
O [G]grão sou eu
O a[A]mor é Teu

[Refrão Final]
[D]Sou um grão de a[A]reia
Que pre[Bm]cisa vol[G]tar
Pro [D]mar de [A]Deus
[D]Sou um grão de a[A]reia
Em [Bm]busca de um [G]mar
Um [D]mar de [A]Deus  [Bm]  [D]

Cifra base adaptada da gravação — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-16',
      albumId: 'alb-minha-obra',
      number: 6,
      title: 'Identidade',
      duration: '5:01',
      key: 'E',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
F#m   A   E   (4x)

[Verso]
[F#m]Céu, Tu fi[A]zeste o [E]céu
[F#m]Tu fi[A]zeste a [E]terra e pairavas no mar
[C#m]Teu, me cri[G#m]aste, sou Teu
[C#m]Nasci pra Te lou[G#m]var e sempre Te adorar
[C#m]Teu sopro de a[G#m]mor no barro então tocou
[B]Estou aqui, Se[A]nhor

[Refrão]
[E]Sou Tua imagem e seme[A]lhança
Sou Tua [D#m]obra
[C#m]Sou cri[F#m]ança em Tuas mãos
Eu quero es[B]tar
[E]Sou Tua imagem e seme[A]lhança
No Teu [D#m]colo
[C#m]Sou cri[F#m]ança em Tuas mãos
Eu quero es[B]tar

[Verso]
[F#m]Céu, Tu fi[A]zeste o [E]céu
[F#m]Tu fi[A]zeste a [E]terra e pairavas no mar
[C#m]Teu, me cri[G#m]aste, sou Teu
[C#m]Nasci pra Te lou[G#m]var e sempre Te adorar
[C#m]Teu sopro de a[G#m]mor no barro então tocou
[B]Estou aqui, Se[A]nhor

[Refrão Final (2x)]
[E]Sou Tua imagem e seme[A]lhança, sou Tua [D#m]obra
[C#m]Sou cri[F#m]ança em Tuas mãos, eu quero es[B]tar
[E]Sou Tua imagem e seme[A]lhança, no Teu [D#m]colo
[C#m]Sou cri[F#m]ança em Tuas mãos, eu quero es[B]tar  [E]

Cifra base adaptada da gravação — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-17',
      albumId: 'alb-minha-obra',
      number: 7,
      title: 'Combate',
      duration: '5:31',
      key: 'Bm',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
Bm   A   Bm

[Verso 1]
[Bm]Mesmo que eu ande pelo vale tenebroso
[A]Mesmo que a sombra da tristeza venha
[Bm]Mesmo que venha a forte opressão
[A]Eu não desisti[Bm]rei

[Verso 2]
[Bm]Caiam mil ao meu lado, dez mil à direita
[A]Mesmo diante da sombra do meu pecado
[Bm]Eu não desisti[A]rei

[Refrão (2x)]
[G]Cantarei vi[A]tória ao Se[D]nhor
Anunciarei Sua ver[F#]dade
[G]Não olharei mi[A]nhas fraquezas
[D]Adestra minhas mãos pro com[F#]bate
[G]E serei mais que [A]vence[Bm]dor

[Ponte]
[G]E ainda que eu [A]caia
Não fica[Em]rei pros[D]trado
[C#m]O Senhor me sus[F#]tenta pela mão
[G]E eu não desis[A]tirei  [Bm]

[Refrão Final (2x)]
[G]Cantarei vi[A]tória ao Se[D]nhor
Anunciarei Sua ver[F#]dade
[G]Não olharei mi[A]nhas fraquezas
[D]Adestra minhas mãos pro com[F#]bate
[G]E serei mais que [A]vence[Bm]dor

Cifra base adaptada da gravação — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-18',
      albumId: 'alb-minha-obra',
      number: 8,
      title: 'Fidelidade',
      duration: '3:04',
      key: 'C',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
G   Am   Em   F   C   Am   G   C

[Verso]
[G]Ave-Maria, me[Am]nina e mulher
[Em]Cheia de Graça, Di[F]vina Mãe
[C]Bendita sois vós entre as mu[Am]lheres [G]  [C]
[G]Inspiração dos céus, inspi[Am]ração na terra
[Em]Sublime presença, [F]força implacável
[C]Determinada e doce, profun[Dm]damente sábia
[G]Bendito é o fruto do [Am]teu ventre
[Em]Santa Maria, [F]filha e [C]Mãe de [Dm]Deus  [G]

[Refrão]
[Am]Roga por [Em]nós, peca[F]dores
[C]Eleva as preces, [Dm]dores dos filhos [G]teus  [C]
[Am]Roga por [Em]nós, peca[F]dores
[C]Eleva as preces, [Dm]dores dos filhos [G]teus, filhos [C]teus

[Ponte]
[C]Agora e na [G]hora da [F]morte
Ergue co[C]nosco a Cruz
[G]Nas quedas e [F]lágrimas somos
Imagem de teu Filho Je[G]sus

[Final]
[C]Filho Je[G]sus, Filho Je[C]sus
Filho Je[G]sus, Filho Je[C]sus

Cifra base adaptada da gravação — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-19',
      albumId: 'alb-minha-obra',
      number: 9,
      title: 'Por Tudo',
      duration: '3:42',
      key: 'E',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Abertura]
[E]Em nome do Pai, em nome do [A]Filho
Do Espírito [E]Santo

[Refrão]
[E]Te dou graças, [F#m]glória a [A]Ti, Se[E]nhor
[E]Te dou graças, [F#m]glória a [A]Ti, Se[E]nhor

[Verso 1]
[E]Pelo céu, pela terra, o sol e o [A]mar
Pela chuva que sacia a [E]sede
Pelas flores, os campos e as planta[F#m]ções
Pelo [A]vento que sopra no [E]rosto das multidões

[Refrão]
[E]Te dou graças, [F#m]glória a [A]Ti, Se[E]nhor (2x)

[Verso 2]
[E]Pelo ar que eu respiro
Pelo [A]que os meus olhos podem contem[E]plar
Por toda a cria[F#m]tura do céu, da [A]terra e do [E]mar

[Refrão]
[E]Te dou graças, [F#m]glória a [A]Ti, Se[E]nhor (2x)

[Verso 3]
[C#m]Pelo sim, pelo [E]não
Cada [A]dia o pão, seme[F#m]lhante ao ir[A]mão  [E]

[Refrão Final (4x)]
[E]Te dou graças, [F#m]glória a [A]Ti, Se[E]nhor

[Encerramento]
[E]Em nome do Pai, em nome do [A]Filho
E do Espírito [E]Santo

Cifra base adaptada da gravação — ajustável no Painel da Banda`,
    },
    {
      id: 'trk-20',
      albumId: 'alb-minha-obra',
      number: 10,
      title: 'Sou Teu',
      duration: '4:34',
      key: 'B',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
B   C#m   G#m   E   F#   B

[Verso]
[B]Por que tanta aflição?
Pra que a insegu[C#m]rança?
[G#m]Por que o desespero?
Pra que o se[E]gredo? Cadê a [F#]fé?  [B]

[Pré-Refrão]
[C#m]Ter medo é normal, mas Eu te pro[E]tejo
[F#]Segue meus passos, caminha na [E]glória
[B]Eu fui, Eu sou, sempre a vi[F#]tória

[Refrão]
[E]Me entregue o can[B]saço
Me [E]dá teu si[F#]lêncio
Encare os pro[E]blemas, estou a[B]qui
[E]Me entregue o can[F#]saço
Me [G#m]dá teu si[F#]lêncio
Encare os pro[E]blemas
[F#]Sou Teu, sou [E]Teu, sou Teu
Sou [B]Teu, sou Teu Je[F#]sus  [B]

[Pré-Refrão]
[C#m]Ter medo é normal, mas Eu te pro[E]tejo
[F#]Segue meus passos, caminha na [E]glória
[B]Eu fui, Eu sou, sempre a vi[F#]tória

[Refrão Final (2x)]
[E]Me entregue o can[B]saço, me [E]dá teu si[F#]lêncio
Encare os pro[E]blemas, estou a[B]qui
[E]Me entregue o can[F#]saço, me [G#m]dá teu si[F#]lêncio
Encare os pro[E]blemas, [F#]sou Teu, sou [E]Teu, sou Teu Je[B]sus

[Encerramento]
[E]Sou Teu, sou [F#]Teu, sou [E]Teu, sou [B]Teu
Sou [F#]Teu Je[B]sus

Cifra base adaptada da gravação — ajustável no Painel da Banda`,
    },
  ],

  events: [
    {
      id: 'evt-1',
      title: 'FEMUP 2026 — Paróquia Nossa Senhora de Guadalupe',
      category: 'Show',
      date: '2026-11-28',
      time: '13:45',
      location: 'Paróquia Nossa Senhora de Guadalupe — Inhaúma',
      address: 'Travessa Chiapas, s/n, Inhaúma, Rio de Janeiro - RJ',
      description: 'Festival de Música Paroquial (FEMUP 2026) na Paróquia Nossa Senhora de Guadalupe (Travessa Chiapas, s/n — Inhaúma). Informações: @pnsg.guadalupe • (21) 97187-3170.',
      poster: './assets/img/evento-femup-2026.jpg',
      featured: true,
    },
    {
      id: 'evt-2',
      title: 'Rosas de Guadalupe — Festa da Padroeira',
      category: 'Show',
      date: '2026-12-12',
      time: '19:30',
      location: 'Paróquia Nossa Senhora de Guadalupe — Inhaúma',
      address: 'Travessa Chiapas, s/n, Inhaúma, Rio de Janeiro - RJ',
      description: 'Evento especial Rosas de Guadalupe na Festa da Padroeira Nossa Senhora de Guadalupe. Venha celebrar e louvar conosco!',
      featured: true,
    },
    {
      id: 'evt-3',
      title: 'Santa Missa Dominical',
      category: 'Missa',
      date: 'Domingos',
      time: '07:00',
      location: 'Paróquia Nossa Senhora de Guadalupe — Inhaúma',
      address: 'Travessa Chiapas, s/n, Inhaúma, Rio de Janeiro - RJ',
      description: 'Santa Missa todos os domingos às 07:00h na Paróquia Nossa Senhora de Guadalupe com o Ministério Razão de Viver.',
      featured: false,
    },
  ],

  prayers: [
    {
      id: 'pry-1',
      name: 'Maria Clara',
      intention: 'Peço orações pela saúde da minha mãe e pela paz em todas as famílias da nossa comunidade.',
      isPublic: true,
      approved: true,
      prayedCount: 18,
      status: 'rezando',
      createdAt: '2026-11-17T14:20:00Z',
    },
    {
      id: 'pry-2',
      name: 'João Pedro',
      intention: 'Agradeço a Deus por uma porta de emprego aberta e peço bênçãos sobre o Ministério Razão de Viver!',
      isPublic: true,
      approved: true,
      prayedCount: 12,
      status: 'rezando',
      createdAt: '2026-11-18T18:45:00Z',
    },
  ],

  bookings: [
    {
      id: 'bkg-1',
      name: 'Coordenação Pastoral (Exemplo)',
      parish: 'Comunidade São José',
      eventType: 'Retiro / Encontro de Jovens',
      eventDate: '2027-01-24',
      city: 'Rio de Janeiro - RJ',
      phone: '(21) 98888-0000',
      message: 'Gostaríamos de convidar o ministério para conduzir o momento de adoração e louvor do nosso retiro.',
      status: 'novo',
      createdAt: '2026-11-16T10:00:00Z',
    },
  ],

  polls: [
    {
      id: 'poll-1',
      question: 'Qual música não pode faltar na nossa próxima Noite de Louvor?',
      active: true,
      options: [
        { id: 'opt-1', label: 'Eu Não Morri em Vão', votes: 34 },
        { id: 'opt-2', label: 'Minha Obra', votes: 29 },
        { id: 'opt-3', label: 'Cura', votes: 24 },
        { id: 'opt-4', label: 'Mãe da Igreja', votes: 21 },
        { id: 'opt-5', label: 'O Senhor Está Aqui', votes: 17 },
      ],
    },
  ],
};
