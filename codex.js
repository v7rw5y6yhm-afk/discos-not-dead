/* ============================================================
   PHASE TWO — THE CODEX HUNT (simplified Aug 17, 2026)
   Eight errands. Real places, simple missions, no puzzles.
   The tapes stopped hiding from Larry and started hiding
   NEAR JOY: do the errand, and that tape finds its way to you
   within the day. Complete the first seven and the codex
   reveals where it assembles. The eighth errand is the party.

   Production notes live in SPOILERS.md (how tapes "find" kids).
   ============================================================ */

const CODEX_HUNT = [
  {
    id: 'greenlake', page: 1,
    title: 'ERRAND I — THE LAP',
    site: 'Green Lake', address: 'Green Lake Park, Seattle',
    mission: 'One full lap around the lake. Feet, wheels, scooter, wagon — the lake does not judge.',
    why: 'The traveler does forty-seven laps a night, one for each year between you. The lake knows the count by now. It only needs ONE from you, and it will know whose it is.',
    done: [
      ['sb', 'THE LAKE FELT IT. one whole lap!! the water did a little shimmer, i heard it up the wire!!'],
      ['bc', 'Lap logged. Somewhere in 1979 the traveler just skated her own lap a little easier. Tape one is loose in the world now, and it is looking for you. Check your bag today. Check your pillow tonight.'],
    ],
  },
  {
    id: 'gumwall', page: 2,
    title: 'ERRAND II — THE WALL OF UNFILED JOY',
    site: 'The Gum Wall', address: 'Post Alley, under Pike Place Market',
    mission: 'Chew one piece of gum. Stick it to the wall. Anywhere. That is the whole mission.',
    why: 'The most unfilable square footage in the western hemisphere. A million pieces of stuck-on joy and not one of them in alphabetical order. Larry cannot look directly at it. Add one.',
    done: [
      ['sb', 'YOU STUCK IT!!! one more piece of forever-mess!! somewhere a vacuum just did the LONG sad rev!!'],
      ['bc', 'Confirmed. The wall grew by one piece and the universe grew slightly harder to file. Tape two heard it. It is on its way to you — tapes travel fastest toward fresh gum. Documented fact, as of today.'],
    ],
  },
  {
    id: 'rachel', page: 3,
    title: 'ERRAND III — THE PIG\'S DUE',
    site: 'Rachel the Brass Pig', address: 'Pike Place Market, under the big clock',
    mission: 'One coin in the pig. Then make a wish OUT LOUD, loud enough that a fishmonger could hear it.',
    why: 'Rachel has been collecting wishes since before you were born, and she has never lost a single one. Loud wishes travel further up the wire. We will hear yours. So will somebody else.',
    done: [
      ['sb', 'WE HEARD IT!!! the whole wire heard it!! i\'m not telling you if it comes true. IT COMES TRUE.'],
      ['bc', 'Wish received, filed under UNFILABLE, where the best ones go. Tape three is en route. Rachel sends her regards, which from a brass pig is enormous.'],
    ],
  },
  {
    id: 'needle', page: 4,
    title: 'ERRAND IV — POINT AT THE CEILING',
    site: 'The Space Needle', address: 'Seattle Center, at the base',
    mission: 'Stand directly underneath. Point at the top with your whole arm, disco style. Hold it ten full seconds. Mean it.',
    why: 'Pointing at the ceiling is the first move of every great dance and the last move of every great argument. The needle is the city\'s ceiling. Practice on the biggest one there is.',
    done: [
      ['sb', 'TEN SECONDS!! i counted!! okay i counted eight but your FORM was PERFECT!!'],
      ['bc', 'Point held. Six tourists photographed you and every one of those photographs is now load-bearing morale. Tape four felt the gesture from across town. Wednesday, you do that same move on a rink floor.'],
    ],
  },
  {
    id: 'alki', page: 5,
    title: 'ERRAND V — THE SAND LETTERS',
    site: 'Alki Beach', address: 'Alki Beach, West Seattle, near the lighthouse',
    mission: 'Write DISCO\'S NOT DEAD in the sand. Big. Big enough that the lighthouse could read it if lighthouses read.',
    why: 'The tide will take it by morning, and that is the point: it cannot be filed, only witnessed. Some sentences you write BECAUSE they wash away. He will never understand that, and it will never stop bothering him.',
    done: [
      ['sb', 'THE PASSWORD!! IN SAND!! THE BEACH SAYS IT NOW TOO!! everything says it!!'],
      ['bc', 'Recorded before the tide takes custody. For approximately six hours, West Seattle\'s coastline agrees with us in writing. Tape five surfaced somewhere between the E and the D. It knows where you live now. That sounded ominous. It is friendly.'],
    ],
  },
  {
    id: 'roar', page: 6,
    title: 'ERRAND VI — THE ROAR',
    site: 'The Kingdome\'s Ghost', address: 'Lumen Field plaza, where the Kingdome stood',
    mission: 'Stand where the concrete moon used to be. Give your loudest roar, all four of you at once if you can manage it.',
    why: 'The loudest thing this city ever produced was a roar on that exact spot. A friend of ours was born inside a roar like that. Loudest birthday in recorded history. The ground remembers, and it loves a reminder.',
    done: [
      ['sb', 'THE GROUND HEARD IT!! a seagull left in a HUFF!! that\'s how you know it was loud enough!!'],
      ['bc', 'Roar registered. For one second the plaza was 1979-loud, and something in me that was born in a noise like that stood up very straight. Tape six is moving. Thank you for that one. Personally.'],
    ],
  },
  {
    id: 'troll', page: 7,
    title: 'ERRAND VII — THE NOSE',
    site: 'The Fremont Troll', address: 'N 36th St, under the Aurora Bridge',
    mission: 'Climb up. Pick the troll\'s nose. With respect. Photo optional but strongly encouraged.',
    why: 'The troll appeared under that bridge eleven years after the loop began, which makes him a younger sibling of this whole story. Younger siblings must be teased. It is the law. He expects it, and secretly, he loves it.',
    done: [
      ['sb', 'YOU PICKED IT!!! THE NOSE!!! he\'s SMILING. he\'s made of concrete and he\'s SMILING MORE.'],
      ['bc', 'Nose picked, dignity of all parties intact. The troll has guarded tape seven since we hid it, and he releases it gladly to anyone bold enough for the nose. That was the test. You passed it with one finger.'],
    ],
  },
  {
    id: 'rink', page: 8,
    title: 'ERRAND VIII — THE PARTY',
    site: 'Southgate Roller Rink', address: '9646 17th Ave SW, White Center — WHERE IT ALL STARTED',
    mission: 'Wednesday. Doors at 3:30 — come early, warm up the floor. Bring every tape, every skater, every clapper you can find. At five, when the counter touches zero — dance.',
    why: 'The loop\'s whole story is that the music stopped in 1979. Eight tapes on one floor, and new joy on top of old boards, is the one piece of evidence he cannot file. This errand breaks the loop. This errand is the party.',
    done: [
      ['sb', 'THE FLOOR IS FULL. THE TAPES ARE HOME. THE MUSIC IS BACK. look at the door page. LOOK AT THE DOOR PAGE!!'],
      ['bc', 'Errand eight complete. Every count we have kept for forty-seven years just finished at once. Whatever happens in the next minute, you did this, all four of you, together. Now dance. That is not a suggestion. It is the mechanism.'],
    ],
  },
];

/* ---------------- state ------------------------------------------ */
function ensureCodexState() {
  if (!Array.isArray(state.codex) || state.codex.length !== CODEX_HUNT.length) {
    state.codex = CODEX_HUNT.map(() => false);
  }
}
function codexActive() { return solvedCount() === PUZZLES.length; }
function codexSolvedCount() { ensureCodexState(); return state.codex.filter(Boolean).length; }
function errandsBeforeParty() { ensureCodexState(); return state.codex.slice(0, 7).filter(Boolean).length; }

/* ---------------- the takeover ----------------------------------- */
let codexModeOn = false;
function activateCodexMode() {
  if (codexModeOn || !codexActive()) return;
  codexModeOn = true;
  document.body.classList.add('codex-mode');
  const tag = $('.site-tag');
  if (tag) tag.textContent = '★ PHASE TWO — THE CODEX HUNT · eight errands · one city · UNTIL WEDNESDAY ★';
  const scroll = $('.scrolltext');
  if (scroll) scroll.innerHTML = '📖 THE CODEX IS IN PIECES &nbsp;★&nbsp; EIGHT ERRANDS ACROSS SEATTLE &nbsp;★&nbsp; DO THE ERRAND AND THE TAPE FINDS YOU &nbsp;★&nbsp; <span class="bleed-red">[[ SEVEN ERRANDS REVEAL THE EIGHTH ]]</span> &nbsp;★&nbsp; bring each other &nbsp;★';
}

/* ---------------- render ----------------------------------------- */
let armedErrand = -1; // two-click confirm
function renderCodex() {
  const sec = $('#sec-codex');
  if (!sec) return;
  const wrap = $('#codex-list');
  if (!codexActive()) { wrap.innerHTML = ''; return; }
  activateCodexMode();
  ensureCodexState();
  const doneCount = codexSolvedCount();
  const preParty = errandsBeforeParty();

  const intro = `
    <p class="bc">Bonecrusher: The hunt has changed, and I will explain why with unusual
    honesty: the old way was puzzles, and there is no time left for puzzles. The tapes have
    spent forty-seven years learning what they love, and what they love is exactly the kind of
    thing he cannot file. Joy, left somewhere on purpose.</p>
    <p class="sb">skybreaker: so here's the NEW way!! eight errands. real places. no answers to
    type, no locks, no hours. DO the thing — really truly do it, the tapes can tell — and that
    tape comes looking for YOU. check your bag. check your porch. tapes are sneaky and they
    like you.</p>
    <p class="bc">Complete the first seven and the codex will tell you where it assembles.
    You will not be surprised. You will still get goosebumps. I do, and I have no skin.</p>
    <p class="mono dim">TAPES: ${doneCount} OF 8 · errands one through seven reveal the eighth · everything before WEDNESDAY 5 PM</p>`;

  const cards = CODEX_HUNT.map((t, i) => {
    const isParty = i === 7;
    if (state.codex[i]) {
      return `<article class="seal done">
        <h3>✓ ${t.title}</h3>
        <p class="mono seal-site">📼 TAPE ${t.page} — ${t.site}</p>
        ${t.done.map(([w, x]) => `<p class="${w}">${w === 'bc' ? 'Bonecrusher: ' : 'skybreaker: '}${x}</p>`).join('')}
      </article>`;
    }
    if (isParty && preParty < 7) {
      return `<article class="seal sealed">
        <h3>🔒 ERRAND VIII — ???</h3>
        <p class="seal-riddle">The eighth errand reveals itself when the first seven are done.
        It is the biggest one. It is also, we promise, the best one.</p>
        <p class="mono seal-timer">ERRANDS REMAINING: ${7 - preParty}</p>
      </article>`;
    }
    return `<article class="seal live" id="errand-${i}">
      <h3>${isParty ? '🪩' : '⏳'} ${t.title}</h3>
      <p class="mono seal-site">📍 ${t.site} · <span class="dim">${t.address}</span></p>
      <p class="errand-mission"><b>THE MISSION:</b> ${t.mission}</p>
      <p class="errand-why">${t.why}</p>
      ${isParty
        ? `<p class="mono errand-party-note">this button gets pressed ON THE FLOOR, at five o'clock, by all of you. not before. it will know.</p>`
        : ''}
      <button type="button" class="errand-btn ${armedErrand === i ? 'armed' : ''}" data-errand="${i}">
        ${armedErrand === i ? '⚠ PRESS AGAIN IF IT TRULY HAPPENED — THE TAPES CAN TELL' : 'WE DID IT ✔'}
      </button>
    </article>`;
  }).join('');

  wrap.innerHTML = intro + cards;

  $$('.errand-btn', wrap).forEach(btn => btn.addEventListener('click', () => {
    const i = +btn.dataset.errand;
    if (armedErrand !== i) {
      armedErrand = i;
      FX.bleep();
      renderCodex();
      return;
    }
    armedErrand = -1;
    completeErrand(i);
  }));
}

/* ---------------- completion -------------------------------------- */
function completeErrand(i) {
  ensureCodexState();
  state.codex[i] = true;
  save();
  const t = CODEX_HUNT[i];
  FX.chime(); FX.warp();
  if (typeof sparkleBurst === 'function' && !FX.reduced) {
    for (let k = 0; k < 5; k++) setTimeout(() => sparkleBurst(), k * 250);
  }
  FX.speak(t.done[0][1], t.done[0][0]);

  const preParty = errandsBeforeParty();
  const revealNow = i !== 7 && preParty === 7; // just finished the seventh

  $('#modal-title').textContent = `📼 ERRAND ${t.page} COMPLETE — ${t.site.toUpperCase()}`;
  $('#modal-body').innerHTML = `
    ${t.done.map(([w, x]) => `<p class="${w}">${w === 'bc' ? 'Bonecrusher: ' : 'skybreaker: '}${x}</p>`).join('')}
    ${revealNow
      ? `<div class="lesson">
           <p class="mono">📖 SEVEN ERRANDS DONE. THE CODEX SPEAKS:</p>
           <p><b>IT ASSEMBLES WHERE IT ALL STARTED.</b></p>
           <p class="mono">SOUTHGATE ROLLER RINK · 9646 17th Ave SW · WHITE CENTER<br>
           WEDNESDAY · AUGUST 19 · 5:00 PM</p>
           <p>The eighth errand has revealed itself, and it is a party. Bring the tapes.
           Bring each other. When the counter touches zero — dance.</p>
         </div>`
      : i === 7
        ? '<p class="mono unlock-note">📖 THE CODEX IS WHOLE. THE COUNTER DECIDES THE REST. DANCE.</p>'
        : `<p class="mono unlock-note">📖 ${codexSolvedCount()} OF 8 · the tape will find you within a day. porches. pillows. bags. it knows.</p>`}`;
  $('#modal').classList.add('show');

  // he notices every errand, and hates each one specifically
  if (i !== 7 && typeof roguePiece === 'function') {
    setTimeout(() => roguePiece([
      ['sb', `errand ${t.page}: DONE. he just did the indignant rev so hard the store page rattled.`],
      ['bc', 'Every errand you finish makes the tapes hum louder and his filing slower. Onward. The counter is watching, fondly.'],
    ], '📼 THE TAPES ARE COMING HOME'), 2600);
  }
  renderAll();
}

/* wire into the app's render + nav + unlock note */
SECTIONS.push({ id: 'codex', label: '📖 THE CODEX', unlocked: () => codexActive() });
const _renderAllBase = renderAll;
renderAll = function () { _renderAllBase(); renderCodex(); };
const _unlockNoteBase = unlockNote;
unlockNote = function (idx) {
  if (idx + 1 === 8) return ' · THE SITE HAS CHANGED. FIND THE CODEX.';
  return _unlockNoteBase(idx);
};
renderAll();
