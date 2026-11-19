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
    spotifyUrl: 'https://open.spotify.com/search/Minist%C3%A9rio%20Raz%C3%A3o%20de%20Viver',
    youtubeUrl: 'https://www.youtube.com/channel/UChgi_VG-Ez5u1rJnSK5gNUA/releases',
    youtubeMusicUrl: 'https://music.youtube.com/playlist?list=OLAK5uy_mtfnEn_iW-hJfpXxN67cfxrT7LX-CC6Zk',
    appleMusicUrl: 'https://music.apple.com/br/album/minha-obra/1713821377',
    deezerUrl: 'https://www.deezer.com/album/504873081',
    amazonMusicUrl: 'https://music.amazon.com/albums/B0CLWYJRW5',
    tidalUrl: 'https://tidal.com/browse/album/324558289',
    whatsappNumber: '5521999999999',
    contactEmail: 'contato@razaodeviver.com.br',
    heroNotice: 'Ouça nossos dois CDs nas plataformas digitais e envie seu pedido de oração!',
    aboutBio:
      'O Ministério Razão de Viver nasceu na Paróquia Nossa Senhora de Guadalupe, no Complexo do Alemão (Rio de Janeiro - RJ), com a missão de anunciar o Evangelho por meio da música católica. Com dois CDs gravados — "Eu Não Morri em Vão" e "Minha Obra" — levamos louvor, adoração e esperança para missas, grupos de oração, retiros e eventos em toda a comunidade e além.',
    missionQuote: '“Cantai ao Senhor um cântico novo, porque Ele fez maravilhas.” — Salmo 98,1',
    members: [
      { id: 'm1', name: 'Equipe de Vozes', role: 'Vocais & Ministração' },
      { id: 'm2', name: 'Cordas & Harmonia', role: 'Violão, Guitarra & Baixo' },
      { id: 'm3', name: 'Teclas & Percussão', role: 'Teclado & Bateria' },
      { id: 'm4', name: 'Intercessão & Mídia', role: 'Oração, Som & Evangelização Digital' },
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
      spotifyUrl: 'https://open.spotify.com/search/Minist%C3%A9rio%20Raz%C3%A3o%20de%20Viver',
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
      spotifyUrl: 'https://open.spotify.com/search/Minist%C3%A9rio%20Raz%C3%A3o%20de%20Viver',
      youtubeUrl: 'https://www.youtube.com/playlist?list=OLAK5uy_mtfnEn_iW-hJfpXxN67cfxrT7LX-CC6Zk',
      youtubeMusicUrl: 'https://music.youtube.com/playlist?list=OLAK5uy_mtfnEn_iW-hJfpXxN67cfxrT7LX-CC6Zk',
      appleMusicUrl: 'https://music.apple.com/br/album/minha-obra/1713821377',
      deezerUrl: 'https://www.deezer.com/album/504873081',
      amazonMusicUrl: 'https://music.amazon.com/albums/B0CLWYJRW5',
      tidalUrl: 'https://tidal.com/browse/album/324558289',
    },
  ],

  tracks: [
    // CD 1: Eu Não Morri em Vão (Todas as 10 cifras oficiais — Arranjo/Grade: Enivaldo)
    {
      id: 'trk-1',
      albumId: 'alb-eu-nao-morri',
      number: 1,
      title: 'Eu Não Morri em Vão',
      duration: '4:32',
      key: 'A',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
||: A9 | F#m7 | D9 | E  D/F#  E/G# :||

[Voz]
||: A9 | F#m7 | D9  Bm7 | E :|| E4  E |

[Banda]
||: A9 | F#m7 | D9  Bm7 | E :|| D  E |
| F#m7 | D  E | F#m7 | D9 | E | D9 |
| E | A | E  Fº | F#m7  D | E | A |
| E  Fº | F#m7  A/E | D  Bm7 | E | % |

[Solo]
| A9 | E  Fº | F#m7  D9 | E | % | A9 |
| E  Fº | F#m7  A/E | D9  Bm7 | E | % |

[Voz]
| A9 | E  Fº | F#m7  D9 | E | A9 | E  Fº |
| F#m7  A/E | D9  Bm7 | E | % | F |
| G | A  D/A | F/A  E/A  D/A ||

Grade Harmônica / Cifra: Enivaldo`,
    },
    {
      id: 'trk-2',
      albumId: 'alb-eu-nao-morri',
      number: 2,
      title: 'Pai Perdoa (Pai)',
      duration: '4:18',
      key: 'D',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Cifra Oficial]
||: D | G | D | G | Em | A |
| Em | A :|| A4  A7 | D | A | Bm |
| F#m | G | D  Bm | C | A |
| A4  A7 | D | G | D | G | Em |
| A | Em | A | A4  A7 | D | A |
| Bm | F#m | G | D  Bm | C |
| A | A4  A7 | D | A  Bm | F#m |
| D  A | D | A  Bm | F#m | D |
| A ||: D | A | Bm | F#m | G |
| D  Bm | C | A :|| % | D ||

Grade Harmônica / Cifra: Enivaldo`,
    },
    {
      id: 'trk-3',
      albumId: 'alb-eu-nao-morri',
      number: 3,
      title: 'Tudo Posso',
      duration: '3:55',
      key: 'D',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
| A9  D9 | E9  D9 | A9  D9 | E9  D9 |
| A9  D9 | E9  D9 | A9  D9 | E9 |

[Voz]
||: D | G | D | G | Bm | G |
| A | % :||: D | G | A | % |
| D | G | A | % :||

[Final (Intro)]
| A9  D9 | E9  D9 | A9  D9 | E9  D9 |
| A9  D9 | E9  D9 | A9  D9 | E9 | A ||

Grade Harmônica / Cifra: Enivaldo`,
    },
    {
      id: 'trk-4',
      albumId: 'alb-eu-nao-morri',
      number: 4,
      title: 'Servo Ungido',
      duration: '4:10',
      key: 'C',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
| Dm  F | C | Dm  F | C |

[Voz]
| Dm  F | C ||: Dm  F | C | Dm  F |
| C | Dm  F | C | Dm  F | C :||
| Am | E | C | G/B  G | Am | E |
| Am | E | C | G/B  G | C |
| G/B  G | Am | E | Am | E |
| F | C | F | C | F | C |

[Final (X)]
| F | C | F | C | F | C |
| F | C | (fade out)

Grade Harmônica / Cifra: Enivaldo`,
    },
    {
      id: 'trk-5',
      albumId: 'alb-eu-nao-morri',
      number: 5,
      title: 'O Senhor Está Aqui',
      duration: '4:40',
      key: 'Em',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
| Em | D/F# | G | C  B7 | Em |
| D/F# | G | C |

[Cifra Oficial]
||: Em | D/F# | G | C  B7 :||: Em |
| D/F#  G | C | G  D :|| Am | C |
| G | % | Am | C | B7 | % :|| 3X

[Final]
||: Em | D/F# | G | C  B7 | Em |
| D/F# | G | C  B7 :|| Em ||

Grade Harmônica / Cifra: Enivaldo`,
    },
    {
      id: 'trk-6',
      albumId: 'alb-eu-nao-morri',
      number: 6,
      title: 'Mãe da Igreja',
      duration: '4:25',
      key: 'E',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
| E | A9 | E | A9 |

[Cifra Oficial]
||: E | A9 | E | A9 | E | A9 :||
| G | D | Em | C | G | C |
| D | D4  D :|| 3X
| E | A9 | E | A9 | E | A9 |
| E | A9 | E | A9 | E | A9 |
| E | A9 | E | A | E | A |

[Vocal — só vocal até o final]
| E | A9 | E | A9 | E | A9 |
| E | A9 ||

Grade Harmônica / Cifra: Enivaldo`,
    },
    {
      id: 'trk-7',
      albumId: 'alb-eu-nao-morri',
      number: 7,
      title: 'Reencontro',
      duration: '3:58',
      key: 'A',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
| A  A/G | D/F#  Dm/F | A/E  E | A  E |

[Voz]
||: A | E | F#m  A/E | D  A/C# | G |
| E :|| A  C#7/G# | F#m  A/E | D  G | E |
| A | E | F#m  A/E | D | A | E |
| A | E ||: F#m  F#m/F | F#m/E  F#m/Eb :||
| G | E | A | E | F#m  A/E |
| D | A | E | A | E | A |
| E | F#m  A/E | D | A | E | A |
| E | A | D  Dm/F | A7M ||

Grade Harmônica / Cifra: Enivaldo`,
    },
    {
      id: 'trk-8',
      albumId: 'alb-eu-nao-morri',
      number: 8,
      title: 'De Que Valem as Lágrimas',
      duration: '4:15',
      key: 'D',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
||: D | % | G | A9 :||

[Voz]
||: D | G | Em | A9 | D | G |
| Em | A9 :|| Bm | G | Bm | G |
| Em | A9 | D | G | Em | A9 |
| D | G | Em | A9 :|| Bm | F#m |
| G | A9 | Bm | F#m | G | A9 |
| % ||: D | G | Em | A9 | D |
| G | Em | A9 :|| Bm | G | Bm |
| G | Bm | G | Em | A9 | D |
| G | Em | A9 | D | G | Em |
| A9 | D | G | Em | A9 | D ||

Grade Harmônica / Cifra: Enivaldo`,
    },
    {
      id: 'trk-9',
      albumId: 'alb-eu-nao-morri',
      number: 9,
      title: 'Face',
      duration: '4:02',
      key: 'C',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
| C | G | Bb | F | C | G |
| Bb | F |

[Voz]
||: C | G | Am | C/G | G# |
| Fm | G4 | G :||: % | C | G | Am |
| Em | F | Dm | Bb | G :|| % |

[Banda]
| C | G | Am | C/G | G# | Fm |
| G4 | G | C | G | Am | C/G |
| G# | Fm | G4 | G | % ||: C |
| G | Am | Em | F | Dm | Bb |
| G | % :|| Bb | F | C | % |
| Bb | F | C | % | Bb | F |
| C | % | Bb | F | G | % |
| C | G | Am | Em | F | Dm |
| Bb | G | % | C | G | Am |
| Em | F | Dm | Bb | G | % |
| C ||

Grade Harmônica / Cifra: Enivaldo`,
    },
    {
      id: 'trk-10',
      albumId: 'alb-eu-nao-morri',
      number: 10,
      title: 'Sem o Sol',
      duration: '3:50',
      key: 'E',
      bpm: '',
      listenUrl: '',
      lyricsChords: `[Intro]
| E | % | % | % |

[Voz]
||: C#m | A9 | B | E  E7M | C#m | A9 |
| B | E :|| F#m | B | C#m | % |
| F#m | B | C#m | % | G# | % |
| % | % | C#m | A9 | B | E  E7M |
| C#m | A9 | B | E | F#m | B |
| C#m | % | F#m | B | C#m | % |
| G# | % | % | % | F# | % |
| G# | % | F# | % | G# | % |
| C# | % | F# | F#  B | C# | % |
| F# | F#  B | E | % ||: F#m | B |
| C#m | % | F#m | B | C#m | % :||
| G# | % | % | % | C#m ||

Grade Harmônica / Cifra: Enivaldo`,
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
      title: 'Santa Missa com Ministério Razão de Viver',
      category: 'Missa',
      date: '2026-11-29',
      time: '19:00',
      location: 'Paróquia Nossa Senhora de Guadalupe',
      address: 'Paróquia Nossa Senhora de Guadalupe, Complexo do Alemão, Rio de Janeiro - RJ',
      description: 'Celebração dominical com animação litúrgica e canções dos nossos dois CDs. Traga sua família!',
      featured: true,
    },
    {
      id: 'evt-2',
      title: 'Noite de Louvor & Adoração — Festa de N. Sra. de Guadalupe',
      category: 'Adoração',
      date: '2026-12-12',
      time: '19:30',
      location: 'Matriz de Nossa Senhora de Guadalupe',
      address: 'Paróquia Nossa Senhora de Guadalupe, Complexo do Alemão, Rio de Janeiro - RJ',
      description: 'Momento especial em honra à nossa Padroeira com adoração ao Santíssimo e louvor ao vivo.',
      featured: true,
    },
    {
      id: 'evt-3',
      title: 'Tarde de Evangelização & Música Católica',
      category: 'Show',
      date: '2026-12-20',
      time: '16:00',
      location: 'Encontro Comunitário — Zona Norte RJ',
      address: 'Complexo do Alemão, Rio de Janeiro - RJ',
      description: 'Apresentação especial com repertório escolhido na enquete do app. Entrada gratuita.',
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
