/**
 * Motor de cifras e transposição musical para ministérios de música.
 * Suporta:
 *  - Formato ChordPro inline: "[G]Texto da [D/F#]canção"
 *  - Linhas de cifras tradicionais acima da letra: "G      D/F#    Em7"
 *  - Grades harmônicas de estúdio/ensaio com compassos: "||: A9 | F#m7 | D9 Bm7 | E :|| % | 3X"
 *  - Transposição por semitons (-6 a +6) com opção de sustenidos (#) ou bemóis (b)
 */

const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES_FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const NOTE_TO_INDEX = {
  'C': 0, 'B#': 0,
  'C#': 1, 'Db': 1,
  'D': 2,
  'D#': 3, 'Eb': 3,
  'E': 4, 'Fb': 4,
  'F': 5, 'E#': 5,
  'F#': 6, 'Gb': 6,
  'G': 7,
  'G#': 8, 'Ab': 8,
  'A': 9,
  'A#': 10, 'Bb': 10,
  'B': 11, 'Cb': 11,
};

// Regex que valida um acorde musical padrão (incluindo notação brasileira como 7M, 4, 9, Fº, C#7/G#, F#m/Eb)
const CHORD_TOKEN_RE = /^([A-G](?:#|b)?)(m|maj|min|dim|aug|sus|add|º|°|\+|-)?([0-9M()+#b°ºsusadddimaug-]*)(?:\/([A-G](?:#|b)?))?$/;

// Marcadores comuns em grades harmônicas / cifras com compassos
const CHART_MARKER_RE = /^(\|\|:|:\|\|:|:\|\||\|\||\||%|\(?[0-9]+x\)?|intr:?|intro:?|\(fade|out\)|\(x\))$/i;

export function transposeNote(note, semitones, preferFlats = false) {
  const idx = NOTE_TO_INDEX[note];
  if (idx === undefined) return note;
  const nextIdx = ((idx + semitones) % 12 + 12) % 12;
  return (preferFlats ? NOTES_FLAT : NOTES_SHARP)[nextIdx];
}

export function transposeChord(chord, semitones, preferFlats = false) {
  if (!chord || semitones === 0) return chord;
  const trimmed = chord.trim();
  const match = trimmed.match(CHORD_TOKEN_RE);
  if (!match) return chord;

  const [, root, quality = '', ext = '', bass] = match;
  const newRoot = transposeNote(root, semitones, preferFlats);
  const newBass = bass ? '/' + transposeNote(bass, semitones, preferFlats) : '';
  return `${newRoot}${quality}${ext}${newBass}`;
}

export function transposeKey(keyStr, semitones, preferFlats = false) {
  if (!keyStr) return '';
  return transposeChord(keyStr.trim(), semitones, preferFlats);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isChordLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^\[.+\]$/.test(trimmed)) return false;

  const hasBars = trimmed.includes('|');
  const tokens = trimmed.split(/\s+/);
  let chordCount = 0;
  let otherCount = 0;

  for (const tok of tokens) {
    if (CHART_MARKER_RE.test(tok)) continue;
    const clean = tok.replace(/^[|:(]+|[|:)]+$/g, '');
    if (!clean) continue;
    if (CHORD_TOKEN_RE.test(clean)) {
      chordCount++;
    } else {
      otherCount++;
    }
  }

  if (hasBars) {
    return chordCount > 0 || trimmed.includes('%');
  }
  return chordCount > 0 && otherCount === 0;
}

/**
 * Converte texto de letra + cifras (ou grade harmônica) em HTML formatado.
 */
export function renderChordSheet(rawText, { showChords = true, semitones = 0, preferFlats = false } = {}) {
  if (!rawText || !rawText.trim()) {
    return '<p class="empty-lyrics">Letra e cifra ainda não cadastradas. Você pode adicionar esta música no Painel Administrativo.</p>';
  }

  const lines = rawText.replace(/\r\n/g, '\n').split('\n');
  const htmlLines = [];

  function isSectionHeader(str) {
    const m = str.match(/^(?:\[|\{)([^\]\}]{2,48})(?:\]|\})$/);
    return m && !CHORD_TOKEN_RE.test(m[1].trim()) ? m[1] : null;
  }

  function hasLyricContentInSection(startIdx) {
    for (let j = startIdx + 1; j < lines.length; j++) {
      const next = lines[j].trim();
      if (!next) continue;
      if (isSectionHeader(next)) return false;
      if (/\[[A-G][^\]]*\]/.test(next)) {
        if (next.replace(/\[[^\]]+\]/g, '').trim()) return true;
        continue;
      }
      if (!isChordLine(next)) return true;
    }
    return false;
  }

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const trimmed = line.trim();

    if (!trimmed) {
      if (htmlLines.length && htmlLines[htmlLines.length - 1] !== '<div class="lyric-spacer"></div>') {
        htmlLines.push('<div class="lyric-spacer"></div>');
      }
      continue;
    }

    // Cabeçalho de seção: [Intro], [Voz], [Banda], [Solo], [Refrão], [Final (Intro)], etc.
    const sectionTitle = isSectionHeader(trimmed);
    if (sectionTitle) {
      if (!showChords && !hasLyricContentInSection(idx)) continue;
      htmlLines.push(`<div class="lyric-section-tag">${escapeHtml(sectionTitle)}</div>`);
      continue;
    }

    // Linha no formato ChordPro: "[G]Eu não morri em [D/F#]vão"
    if (/\[[A-G][^\]]*\]/.test(line)) {
      if (!showChords) {
        const plain = line.replace(/\[[^\]]+\]/g, '');
        if (!plain.trim()) continue;
        htmlLines.push(`<div class="lyric-line-plain">${escapeHtml(plain)}</div>`);
      } else {
        const parts = line.split(/(\[[^\]]+\])/g);
        let rowHtml = '<div class="chordpro-line">';
        let i = 0;
        while (i < parts.length) {
          const part = parts[i];
          if (/^\[[^\]]+\]$/.test(part)) {
            const rawChord = part.slice(1, -1);
            const transposed = transposeChord(rawChord, semitones, preferFlats);
            const nextText = (i + 1 < parts.length && !/^\[[^\]]+\]$/.test(parts[i + 1])) ? parts[i + 1] : '';
            if (nextText) i++;
            rowHtml += `<span class="chord-pair"><span class="chord-chip">${escapeHtml(transposed)}</span><span class="lyric-seg">${escapeHtml(nextText || ' ')}</span></span>`;
          } else if (part) {
            rowHtml += `<span class="chord-pair"><span class="chord-chip chord-empty">&nbsp;</span><span class="lyric-seg">${escapeHtml(part)}</span></span>`;
          }
          i++;
        }
        rowHtml += '</div>';
        htmlLines.push(rowHtml);
      }
      continue;
    }

    // Linha de acordes / grade harmônica com compassos
    if (isChordLine(line)) {
      if (!showChords) continue;
      const transposedLine = line.replace(/(\S+)/g, (token) => {
        if (CHART_MARKER_RE.test(token)) {
          return `<span class="chart-bar">${escapeHtml(token)}</span>`;
        }
        const prefix = token.match(/^[|:(]+/)?.[0] || '';
        const suffix = token.match(/[|:)]+$/)?.[0] || '';
        const core = token.slice(prefix.length, token.length - suffix.length);
        if (core && CHORD_TOKEN_RE.test(core)) {
          const preHtml = prefix ? `<span class="chart-bar">${escapeHtml(prefix)}</span>` : '';
          const sufHtml = suffix ? `<span class="chart-bar">${escapeHtml(suffix)}</span>` : '';
          return `${preHtml}<span class="chord-inline">${escapeHtml(transposeChord(core, semitones, preferFlats))}</span>${sufHtml}`;
        }
        return `<span class="chart-bar">${escapeHtml(token)}</span>`;
      });
      htmlLines.push(`<div class="chord-only-line">${transposedLine}</div>`);
      continue;
    }

    // Linha comum de letra ou crédito
    htmlLines.push(`<div class="lyric-line-plain">${escapeHtml(line)}</div>`);
  }

  return htmlLines.join('');
}
