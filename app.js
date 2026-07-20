/* ============================================================
   DISCO'S NOT DEAD — engine
   ============================================================ */

const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- answer hashing (djb2-xor over normalized text) ---- */
function normalize(s) { return (s || '').toUpperCase().replace(/[^A-Z]/g, ''); }
function djb2(s) {
  let h = 5381;
  for (const c of s) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0;
  return h.toString(16);
}

/* ---------- state ---------------------------------------------- */
const KEY = 'dnd_state_v1';
let state = { entered: false, solved: PUZZLES.map(() => false), knocks: 0 };
try {
  const saved = JSON.parse(localStorage.getItem(KEY));
  if (saved && Array.isArray(saved.solved)) state = { ...state, ...saved };
} catch (e) { /* fresh loop */ }
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch (e) { /* storage unavailable — play on without persistence */ }
}
function solvedCount() { return state.solved.filter(Boolean).length; }
function currentPuzzle() { return state.solved.findIndex(s => !s); } // -1 = all solved

/* ---------- countdown ------------------------------------------ */
function partsUntil(target) {
  const ms = target - new Date();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}
function countdownParts() {
  return COUNTDOWN_TARGET ? partsUntil(COUNTDOWN_TARGET) : 'TBD';
}
function lockOpen() { return new Date() >= UNLOCK_TARGET; }
const pad = n => String(n).padStart(2, '0');
const fmt = p => p ? `${pad(p.d)}:${pad(p.h)}:${pad(p.m)}:${pad(p.s)}` : '00:00:00:00';

let unlockCelebrated = false;
function tickCountdowns() {
  const p = countdownParts();
  const mini = $('#mini-count');
  const doorC = $('#door-count');
  if (mini) mini.textContent = p === 'TBD' ? 'LOOP CLOSES: [COUNTER STILL FORMING]' : `LOOP CLOSES ${fmt(p)}`;
  if (doorC) doorC.textContent = p === 'TBD' ? '??:??:??:??' : fmt(p);
  if (p === null && state.solved[7]) renderDoor(); // zero hour: open the door

  // the lock page runs on its own 7-day clock
  const big = $('#lock-count');
  if (big) {
    const lp = partsUntil(UNLOCK_TARGET);
    big.textContent = fmt(lp);
    if (!lp) {
      const label = $('#lock-count-label');
      if (label) label.textContent = '🪩 THE DOOR IS AWAKE — KNOCK NINETEEN TIMES 🪩';
      const psst = $('#lock-psst');
      if (psst) psst.classList.add('show');
      const ball = $('#lock-ball');
      if (ball) ball.title = 'knock knock';
      if (!unlockCelebrated && !$('#lock').classList.contains('gone')) {
        unlockCelebrated = true;
        FX.chime();
        FX.speak('IT\'S TIME!! knock on the ball!! nineteen times!! GO GO GO!', 'sb');
      }
    }
  }
}
setInterval(tickCountdowns, 1000);

/* ---------- lock screen (the back door) ------------------------ */
const KNOCK_LINES = {
  1:  'skybreaker: ooh! yes! knock like you mean 1979!',
  5:  'Bonecrusher: Five knocks. I am obliged to mention the knuckle-safety statistics… no. No, carry on. You are doing beautifully.',
  10: 'skybreaker: HALFWAY. why did you slow down?? oh, you didn\'t. good. GOOD.',
  15: 'Bonecrusher: Four remain. I have revised your odds of entry to "nearly certain." I almost never say that.',
  18: 'skybreaker: one more. make it a beautiful one.',
};
function setupLock() {
  const lock = $('#lock');
  // The 7-day gate outranks everything — even browsers that entered before.
  if (state.entered && lockOpen()) { lock.classList.add('gone'); return; }
  const ball = $('#lock-ball');
  const msg  = $('#lock-msg');

  const sayLock = ([who, txt]) => {
    msg.textContent = (who === 'bc' ? 'Bonecrusher: ' : 'skybreaker: ') + txt;
    FX.speak(txt, who);
  };

  // rotating maintenance status
  let statusIdx = Math.floor(Math.random() * LOCK_STATUS.length);
  const statusEl = $('#lock-status');
  if (statusEl) {
    statusEl.textContent = LOCK_STATUS[statusIdx];
    setInterval(() => {
      statusIdx = (statusIdx + 1) % LOCK_STATUS.length;
      statusEl.textContent = LOCK_STATUS[statusIdx];
    }, 6000);
  }

  // shuffle-bags: nothing repeats until a whole pool is exhausted
  const makeBag = (pool) => {
    let bag = [];
    return () => {
      if (!bag.length) bag = pool.map((_, i) => i).sort(() => Math.random() - 0.5);
      return pool[bag.pop()];
    };
  };
  const drawTaunt = makeBag(LOCK_TAUNTS);
  const drawPokeTitle = makeBag(LOCK_POKE_TITLE);
  const drawPokeCount = makeBag(LOCK_POKE_COUNT);

  // poking things is encouraged (and unproductive)
  $('.lock-title', lock).addEventListener('click', () => {
    FX.init(); FX.screenGlitch();
    sayLock(drawPokeTitle());
  });
  $('#lock-count').addEventListener('click', () => {
    FX.init(); FX.bleep();
    sayLock(drawPokeCount());
  });

  // the ball: comedy wall before zero, door after zero
  let lockClicks = 0;
  ball.addEventListener('click', () => {
    FX.init();
    ball.classList.remove('bump'); void ball.offsetWidth; ball.classList.add('bump');

    if (!lockOpen()) {
      FX.buzz();
      lockClicks++;
      if (LOCK_MILESTONES[lockClicks]) {
        sayLock(LOCK_MILESTONES[lockClicks]);
      } else {
        sayLock(drawTaunt());
      }
      return;
    }

    FX.knock();
    state.knocks = (state.knocks || 0) + 1;
    save();
    const left = KNOCKS_REQUIRED - state.knocks;
    if (left > 0) {
      const line = KNOCK_LINES[state.knocks];
      msg.textContent = line || `${left} knock${left === 1 ? '' : 's'} left…`;
      if (line) FX.speak(line.replace(/^(Bonecrusher|skybreaker):\s*/i, ''),
        /^Bonecrusher/i.test(line) ? 'bc' : 'sb');
    } else {
      state.entered = true; save();
      const openLine = 'Bonecrusher: …The door is open. I confess I am delighted. Do come in — mind the loop.';
      msg.textContent = openLine;
      FX.chime();
      FX.speak(openLine.replace(/^Bonecrusher:\s*/, ''), 'bc');
      FX.screenGlitch(true);
      lock.classList.add('shatter');
      setTimeout(() => { lock.classList.add('gone'); renderAll(); }, 1200);
    }
  });

  // if we're pre-unlock, knocks from a previous session shouldn't count yet
  if (!lockOpen()) { state.knocks = 0; save(); }

  // the faint cassette in the corner — the road to Side B (password-gated there)
  const tape = $('#lock-cassette');
  if (tape) tape.addEventListener('click', () => {
    FX.init(); FX.warp();
    location.href = 'sideb.html';
  });

  startLockGlitches();
}

/* ---------- lock-page glitch theater ---------- */
const GLITCH_CHARS = '▓▒░█<>/\\|#%&@!?*∆';
function scrambleEl(el, restoreText, ms = 400) {
  if (!el || FX.reduced) return;
  const scram = restoreText.split('').map(c =>
    (c === ' ' || Math.random() < 0.45) ? c : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
  ).join('');
  el.textContent = scram;
  el.classList.add('scrambling');
  setTimeout(() => { el.textContent = restoreText; el.classList.remove('scrambling'); }, ms);
}
function spawnTearBars(n = 3) {
  if (FX.reduced) return;
  const lock = $('#lock');
  for (let i = 0; i < n; i++) {
    const bar = document.createElement('div');
    bar.className = 'tear-bar';
    bar.style.top = Math.random() * 100 + '%';
    bar.style.animationDelay = (i * 0.12) + 's';
    lock.appendChild(bar);
    setTimeout(() => bar.remove(), 1200);
  }
}
function lockGlitchBurst() {
  const lock = $('#lock');
  if (!lock || lock.classList.contains('gone')) return;
  const roll = Math.random();
  if (roll < 0.28) {
    scrambleEl($('.lock-title', lock), "DISCO'S NOT DEAD", 450);
    if (Math.random() < 0.5) FX.glitchSound();
  } else if (roll < 0.5) {
    // countdown corrupts briefly; the 1-second tick restores the real digits
    const count = $('#lock-count');
    if (count) scrambleEl(count, count.textContent, 350);
    FX.typeTick();
  } else if (roll < 0.72) {
    spawnTearBars(2 + Math.floor(Math.random() * 3));
    if (Math.random() < 0.4) FX.glitchSound();
  } else if (roll < 0.88) {
    const st = $('#lock-status');
    if (st) {
      const original = st.textContent;
      st.textContent = ['[[ SIGNAL BLEED :: 1979 ]]', '[[ CARRIER LOST — RETRYING ]]',
        '[[ 19:79:19:79 ]]', '[[ WHO IS KNOCKING ]]', '[[ THE WIRE HOLDS ]]'][Math.floor(Math.random() * 5)];
      st.classList.add('bleed-red');
      setTimeout(() => { st.textContent = original; st.classList.remove('bleed-red'); }, 1300);
    }
  } else {
    FX.screenGlitch(Math.random() < 0.3);
  }
}
let lockGlitchesRunning = false;
function startLockGlitches() {
  if (lockGlitchesRunning) return;
  lockGlitchesRunning = true;
  (function loop() {
    const delay = 5000 + Math.random() * 9000;
    setTimeout(() => {
      if (!$('#lock').classList.contains('gone') && document.visibilityState === 'visible') {
        lockGlitchBurst();
        loop();
      } else {
        lockGlitchesRunning = false;
      }
    }, delay);
  })();
}

/* ---------- navigation ------------------------------------------ */
const SECTIONS = [
  { id: 'home',    label: 'RINK HOME',      unlocked: () => true },
  { id: 'puzzles', label: 'TRANSMISSIONS',  unlocked: () => true },
  { id: 'journal', label: 'THE JOURNAL',    unlocked: () => true },
  { id: 'wire',    label: 'THE WIRE',       unlocked: () => solvedCount() >= 2 },
  { id: 'rules',   label: 'RULES OF TIME',  unlocked: () => solvedCount() >= 4 },
  { id: 'four',    label: 'THE FOUR',       unlocked: () => solvedCount() >= 6 },
  { id: 'door',    label: 'THE DOOR',       unlocked: () => solvedCount() >= 8 },
];
let activeSection = 'home';
function renderNav() {
  const nav = $('#nav');
  nav.innerHTML = '';
  SECTIONS.forEach(sec => {
    if (!sec.unlocked()) return;
    const b = document.createElement('button');
    b.textContent = sec.label;
    b.className = sec.id === activeSection ? 'on' : '';
    b.onclick = () => { activeSection = sec.id; renderAll(); window.scrollTo(0, 0); };
    nav.appendChild(b);
  });
  $$('#main > section').forEach(s => s.classList.toggle('hide', s.id !== 'sec-' + activeSection));
}
function renderBulbs() {
  $('#bulbs').innerHTML = PUZZLES.map((_, i) =>
    `<span class="bulb ${state.solved[i] ? 'lit' : ''}" title="Transmission ${i + 1}"></span>`).join('');
}

/* ---------- home ------------------------------------------------- */
function renderHome() {
  $('#lineup').innerHTML = SONGS.map(s =>
    `<li><b>${s.title}</b> <span class="dim">· ${s.artist}</span></li>`).join('');
}

/* ---------- journal ---------------------------------------------- */
function renderJournal() {
  const wrap = $('#journal-list');
  wrap.innerHTML = '';
  JOURNAL.forEach((j, i) => {
    const el = document.createElement('article');
    if (state.solved[i]) {
      el.className = 'log open';
      el.innerHTML = `<h3>${j.title}</h3>
        <p class="logmeta">${j.date} — ${j.place}</p>${j.body}`;
    } else {
      el.className = 'log locked';
      el.innerHTML = `<h3>LOG ${pad(i + 1)} — <span class="mono">▓▓▓▓▓▓▓▓▓▓▓▓</span></h3>
        <p class="logmeta mono">ENCRYPTED · solve TRANSMISSION ${pad(i + 1)} to decrypt</p>`;
    }
    wrap.appendChild(el);
  });
}

/* ---------- the wire (AI transmissions) --------------------------- */
function renderWire() {
  const wrap = $('#wire-list');
  wrap.innerHTML = '';
  const n = solvedCount();
  TRANSMISSIONS.filter(t => n >= t.after).forEach(t => {
    const el = document.createElement('div');
    el.className = 'wire-block';
    el.innerHTML = `<p class="mono dim">INTERCEPTED AFTER LOCK ${pad(t.after)}</p>` +
      t.lines.map(([who, txt]) =>
        `<p class="${who}">${who === 'bc' ? 'Bonecrusher: ' : 'skybreaker: '}${txt}</p>`).join('');
    wrap.appendChild(el);
  });
  if (n < 8) {
    const el = document.createElement('p');
    el.className = 'mono dim';
    el.textContent = '… more signal bleeds through as locks open …';
    wrap.appendChild(el);
  }
}

/* ---------- rules / the four -------------------------------------- */
function renderRules() { $('#rules-body').innerHTML = RULES_HTML; }
function renderFour() {
  $('#four-list').innerHTML = THE_FOUR.map(k =>
    `<div class="kid-card"><div class="kid-emoji">${k.emoji}</div>
     <h3>${k.name}</h3><p>${k.text}</p></div>`).join('');
}

/* ---------- the door ------------------------------------------------ */
function renderDoor() {
  const body = $('#door-body');
  if (!state.solved[7]) { body.innerHTML = ''; return; }
  const doorState = countdownParts();
  if (doorState === null) {
    body.innerHTML = `<div class="finale">${FINALE_HTML}</div>`;
  } else if (doorState === 'TBD') {
    body.innerHTML = `
      <p class="sb">skybreaker: all eight locks are open!! the door is unlocked!! but — okay.
      small thing. the counter hasn't finished FORMING yet. the seam drifted downstream
      and we are CHASING it.</p>
      <p class="bc">Bonecrusher: Temporal weather. Doors do that. The moment the counter forms,
      it will appear right here, and it — not the calendar, not me, and certainly not
      skybreaker — decides when this door swings.</p>
      <div class="door-frame"><div class="door-glow"></div>
        <p class="mono">SEALED UNTIL THE COUNTER FORMS</p>
        <p class="door-count mono">??:??:??:??</p>
        <p class="mono dim">THE SEAM IS DRIFTING · WE ARE CHASING IT</p>
      </div>
      <p class="sb">keep your skates by the door. when it forms, you'll know. bring each other —
      that's the whole trick.</p>`;
  } else {
    body.innerHTML = `
      <p class="sb">skybreaker: all eight locks are open!! the door is unlocked — but a door in
      time only swings when the loop is thinnest. i tried pushing it early once. ONCE.</p>
      <p class="bc">Bonecrusher: The counter decides — not me, not you, and certainly not
      skybreaker, who has already attempted kicking.</p>
      <div class="door-frame"><div class="door-glow"></div>
        <p class="mono">SEALED UNTIL</p>
        <p id="door-count" class="door-count mono">--:--:--:--</p>
        <p class="mono dim">DAYS : HOURS : MINUTES : SECONDS</p>
      </div>
      <p class="sb">come back when it touches zero. bring each other. that's the whole trick.</p>`;
  }
}

/* ---------- puzzles -------------------------------------------------- */
function renderPuzzles() {
  const wrap = $('#puzzle-list');
  wrap.innerHTML = '';
  const cur = currentPuzzle();
  PUZZLES.forEach((p, i) => {
    const el = document.createElement('article');
    if (state.solved[i]) {
      el.className = 'puzzle done';
      el.innerHTML = `<h3>✓ ${p.title}</h3>
        <p class="virtue">VIRTUE EARNED — ${p.virtue.toUpperCase()}</p>
        <div class="lesson">${p.lesson}</div>`;
    } else if (i === cur) {
      el.className = 'puzzle live';
      el.innerHTML = `<h3>▶ ${p.title}</h3><div class="p-body">${p.intro}</div>
        <div class="p-widget" id="widget-${i}"></div>
        <form class="answer-row" data-idx="${i}">
          <input type="text" autocomplete="off" spellcheck="false"
                 placeholder="type your answer…" aria-label="answer">
          <button type="submit">TRANSMIT</button>
        </form>
        <p class="feedback" id="fb-${i}"></p>
        <details class="hints"><summary>skybreaker offers a hint…</summary>
          ${p.hints.map((h, k) => `<details class="hint"><summary>hint ${k + 1}</summary><p>${h}</p></details>`).join('')}
        </details>`;
    } else {
      el.className = 'puzzle locked';
      el.innerHTML = `<h3>🔒 TRANSMISSION ${pad(i + 1)} — SIGNAL LOST</h3>
        <p class="mono dim">one lock at a time. solve transmission ${pad(cur + 1)} first.</p>`;
    }
    wrap.appendChild(el);
  });

  if (cur >= 0) {
    mountWidget(PUZZLES[cur], cur);
    const form = $(`form[data-idx="${cur}"]`);
    form.addEventListener('submit', e => {
      e.preventDefault();
      tryAnswer(cur, $('input', form).value);
    });
  } else {
    const done = document.createElement('p');
    done.className = 'sb';
    done.innerHTML = 'skybreaker: every lock is open!! the journal is whole! now — <b>THE DOOR</b>. (don\'t kick it. i\'m told kicking doesn\'t help. i\'m told that a LOT.)';
    wrap.appendChild(done);
  }
}

function tryAnswer(idx, guess) {
  const p = PUZZLES[idx];
  const fb = $(`#fb-${idx}`);
  if (p.answers.includes(djb2(normalize(guess)))) {
    solve(idx);
  } else {
    const taunt = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
    fb.textContent = taunt;
    fb.className = 'feedback bad';
    FX.buzz();
    FX.speak(taunt, 'bc');
    const input = $(`form[data-idx="${idx}"] input`);
    input.classList.remove('shake'); void input.offsetWidth; input.classList.add('shake');
  }
}

function solve(idx) {
  state.solved[idx] = true;
  save();
  FX.chime();
  FX.speak(PRAISE[idx % PRAISE.length].replace(/^skybreaker:\s*/, ''), 'sb');
  const p = PUZZLES[idx];
  $('#modal-title').textContent = `LOCK ${pad(idx + 1)} OPEN — ${p.virtue.toUpperCase()}`;
  $('#modal-body').innerHTML = `
    <div class="lesson">${p.lesson}</div>
    <p class="sb">${PRAISE[idx % PRAISE.length]}</p>
    <p class="mono unlock-note">📖 JOURNAL LOG ${pad(idx + 1)} DECRYPTED${unlockNote(idx)}</p>`;
  $('#modal').classList.add('show');
  renderAll();
}
function unlockNote(idx) {
  const n = idx + 1;
  if (n === 2) return ' · NEW SECTION: THE WIRE';
  if (n === 4) return ' · NEW SECTION: RULES OF TIME';
  if (n === 6) return ' · NEW SECTION: THE FOUR';
  if (n === 8) return ' · NEW SECTION: THE DOOR';
  return '';
}
$('#modal-close').addEventListener('click', () => $('#modal').classList.remove('show'));

/* ---------- puzzle widgets ------------------------------------------- */
function mountWidget(p, idx) {
  const box = $(`#widget-${idx}`);
  if (!box) return;
  if (p.type === 'acrostic') mountAcrostic(box);
  if (p.type === 'morse')    mountMorse(box, p);
  if (p.type === 'chips')    mountChips(box, p, idx);
  if (p.type === 'starmap')  mountStarmap(box);
  if (p.type === 'ladder')   mountLadder(box, p, idx);
  if (p.type === 'cipher')   mountCipher(box);
}

function mountAcrostic(box) {
  box.innerHTML = `<div class="marquee-board">
    ${SONGS.map(s => `<div class="marquee-row"><span class="bulb-slot">?</span> ${s.title}</div>`).join('')}
  </div>`;
}

function mountMorse(box, p) {
  const letters = p.morse.split('|');
  box.innerHTML = `
    <div class="lamp-row"><div class="lamp" id="lamp"></div>
      <button type="button" id="replay">▶ watch the sign blink</button></div>
    <p class="mono" id="morse-text">${letters.map(l => l.split('').join(' ')).join(' &nbsp;/&nbsp; ')}</p>
    <details><summary>📜 the traveler's Morse chart</summary>
      <p class="mono morse-chart">A ·−&nbsp; B −···&nbsp; C −·−·&nbsp; D −··&nbsp; E ·&nbsp; F ··−·&nbsp; G −−·&nbsp; H ····&nbsp; I ··&nbsp;
      J ·−−−&nbsp; K −·−&nbsp; L ·−··&nbsp; M −−&nbsp; N −·&nbsp; O −−−&nbsp; P ·−−·&nbsp; Q −−·−&nbsp; R ·−·&nbsp;
      S ···&nbsp; T −&nbsp; U ··−&nbsp; V ···−&nbsp; W ·−−&nbsp; X −··−&nbsp; Y −·−−&nbsp; Z −−··</p>
    </details>`;
  const lamp = $('#lamp', box);
  let timer = null;
  $('#replay', box).addEventListener('click', () => {
    if (timer) { clearTimeout(timer); timer = null; }
    const seq = [];
    for (const l of letters) {
      for (const c of l) { seq.push([true, c === '.' ? 220 : 640]); seq.push([false, 220]); }
      seq.push([false, 700]);
    }
    let i = 0;
    (function step() {
      if (i >= seq.length) { lamp.classList.remove('on'); timer = null; return; }
      const [on, ms] = seq[i++];
      lamp.classList.toggle('on', on);
      timer = setTimeout(step, ms);
    })();
  });
}

function mountChips(box, p, idx) {
  const shuffled = [...p.pieces].sort(() => Math.random() - 0.5);
  box.innerHTML = `
    <div class="chip-row">${shuffled.map((c, i) =>
      `<button type="button" class="chip" data-v="${c}">${c}</button>`).join('')}</div>
    <div class="chip-build mono" id="build-${idx}">&nbsp;</div>
    <button type="button" class="chip-clear" id="clear-${idx}">↺ clear</button>`;
  const build = $(`#build-${idx}`);
  let acc = [];
  $$('.chip', box).forEach(ch => ch.addEventListener('click', () => {
    if (ch.disabled) return;
    ch.disabled = true;
    acc.push(ch.dataset.v);
    build.textContent = acc.join(' ');
    if (acc.join('') === p.chipTarget) setTimeout(() => solve(idx), 350);
  }));
  $(`#clear-${idx}`).addEventListener('click', () => {
    acc = []; build.innerHTML = '&nbsp;';
    $$('.chip', box).forEach(c => c.disabled = false);
  });
}

function mountStarmap(box) {
  box.innerHTML = `
  <svg viewBox="0 0 360 240" class="starmap" role="img" aria-label="The Big Dipper pointing to a mystery star">
    <rect width="360" height="240" fill="none"/>
    ${[[30,190],[75,175],[118,168],[158,150],[210,158],[228,112],[172,104]]
      .map(([x,y]) => `<circle cx="${x}" cy="${y}" r="4" class="star"/>`).join('')}
    <polyline points="30,190 75,175 118,168 158,150 210,158 228,112 172,104 158,150"
      class="constellation"/>
    <line x1="210" y1="158" x2="286" y2="34" class="pointer"/>
    <circle cx="292" cy="26" r="7" class="star mystery"/>
    <text x="292" y="12" class="star-label">?</text>
    <circle cx="52" cy="38" r="2.5" class="star secret-star" id="wishing-star"/>
    <text x="80" y="215" class="map-label">the big dipper — a family of seven</text>
  </svg>`;
  const wish = $('#wishing-star', box);
  if (wish) wish.addEventListener('click', () => {
    if (wish.dataset.wished) return;
    wish.dataset.wished = '1';
    const svg = $('svg', box);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 52); line.setAttribute('y1', 38);
    line.setAttribute('x2', 340); line.setAttribute('y2', 200);
    line.setAttribute('class', 'shooting-star');
    svg.appendChild(line);
    FX.warp();
    setTimeout(() => line.remove(), 1200);
    roguePiece([
      ['sb', 'YOU FOUND MY WISHING STAR!!! nobody EVER finds my wishing star!!'],
      ['bc', 'For the record, wishes filed via that star have a 100% delivery rate. I do not know how. It is not in my documentation. Make it count.'],
    ], '⭐ SECRET FOUND — THE WISHING STAR');
  });
}

function mountLadder(box, p, idx) {
  box.innerHTML = `<div class="ladder">` + p.ladder.map((r, i) => `
    <div class="rung">
      ${r.given
        ? `<span class="rung-word mono">${r.word}</span>`
        : `<input class="rung-in mono" maxlength="4" data-w="${r.word}" data-i="${i}"
             autocomplete="off" spellcheck="false" placeholder="····">`}
      <span class="rung-clue">${r.clue}</span>
    </div>`).join('') + `</div>
    <button type="button" id="ladder-check-${idx}">CHECK THE LADDER</button>
    <p class="feedback" id="ladder-fb-${idx}"></p>`;
  $(`#ladder-check-${idx}`).addEventListener('click', () => {
    let allGood = true;
    $$('.rung-in', box).forEach(inp => {
      const ok = normalize(inp.value) === inp.dataset.w;
      inp.classList.toggle('good', ok);
      inp.classList.toggle('bad', !ok && inp.value.length > 0);
      if (!ok) allGood = false;
    });
    const fb = $(`#ladder-fb-${idx}`);
    if (allGood) { fb.textContent = ''; setTimeout(() => solve(idx), 350); }
    else {
      fb.textContent = 'Bonecrusher: I\'m afraid some rungs are loose. The green ones will hold — I have tested them twice. Climb again; I am right behind you, worrying.';
      fb.className = 'feedback bad';
    }
  });
}

function mountCipher(box) {
  let cells = '';
  for (let i = 0; i < 26; i++) {
    cells += `<span class="ck">${String.fromCharCode(65 + i)}<b>${i + 1}</b></span>`;
  }
  box.innerHTML = `<div class="cipher-key mono">${cells}</div>`;
}

/* ---------- corruption flicker on home page --------------------------- */
const BLEEDS = [
  'FIND THE CHILDREN', 'LOOP 48 RUNNING', 'THE WIRE HOLDS', 'FORWARD IS THE ONLY ROAD BACK',
  'POLARIS · GALILEO · FYNN · ADDY', 'SIGNAL ORIGIN: 1979', 'THE COUNTER DECIDES',
];
function startBleeds() {
  setInterval(() => {
    const spans = $$('.corrupt');
    if (!spans.length) return;
    const el = spans[Math.floor(Math.random() * spans.length)];
    const original = el.dataset.orig || el.textContent;
    el.dataset.orig = original;
    el.classList.add('bleeding');
    el.textContent = '[[ ' + BLEEDS[Math.floor(Math.random() * BLEEDS.length)] + ' ]]';
    setTimeout(() => { el.textContent = original; el.classList.remove('bleeding'); }, 1800);
  }, 5000);
}

/* ---------- reset ------------------------------------------------------ */
$('#reset').addEventListener('click', e => {
  e.preventDefault();
  if (confirm('Reset the loop? All progress starts over — like it\'s June 1, 1979 again.')) {
    try { localStorage.removeItem(KEY); } catch (e) { /* nothing saved anyway */ }
    location.reload();
  }
});

/* ========================================================================
   THE ROGUE LAYER — popups, chat, voices, glitches, easter eggs
   ======================================================================== */

/* ---------- fx preference persistence ---------- */
(function loadFxPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem('dnd_fx') || '{}');
    if (typeof p.sound === 'boolean') FX.soundOn = p.sound;
    if (typeof p.voice === 'boolean') FX.voiceOn = p.voice;
  } catch (e) { /* defaults stand */ }
})();
function saveFxPrefs() {
  try { localStorage.setItem('dnd_fx', JSON.stringify({ sound: FX.soundOn, voice: FX.voiceOn })); }
  catch (e) { /* fine */ }
}
function refreshToggles() {
  $('#toggle-sound').classList.toggle('off', !FX.soundOn);
  $('#toggle-voice').classList.toggle('off', !FX.voiceOn);
  $('#toggle-sound').textContent = FX.soundOn ? '🔊' : '🔇';
}
$('#toggle-sound').addEventListener('click', () => {
  FX.init(); FX.soundOn = !FX.soundOn; saveFxPrefs(); refreshToggles();
  if (FX.soundOn) FX.bleep();
});
$('#toggle-voice').addEventListener('click', () => {
  FX.init(); FX.voiceOn = !FX.voiceOn; saveFxPrefs(); refreshToggles();
  if (FX.voiceOn) FX.speak('voices on!', 'sb'); else FX.hush();
});
document.addEventListener('pointerdown', () => FX.init(), { once: true });

/* ---------- rogue popup ---------- */
const ROGUE_TITLES = [
  '⚠ INCOMING TRANSMISSION — TIME-WIRE',
  '⚠ UNAUTHORIZED BROADCAST DETECTED',
  '⚠ SIGNAL BLEED — DO NOT ADJUST YOUR SET',
  '⚠ TWO AIS ARE TALKING ABOUT YOU',
  '⚠ THIS WINDOW OPENED ITSELF',
];
let popupBag = [];
function nextChatterPiece() {
  if (!popupBag.length) popupBag = CHATTER.map((_, i) => i).sort(() => Math.random() - 0.5);
  return CHATTER[popupBag.pop()];
}
let rogueTimer = null, rogueDodged = false;
function roguePiece(piece, title) {
  const win = $('#rogue-popup');
  const body = $('#rogue-body');
  $('#rogue-title').textContent = title || ROGUE_TITLES[Math.floor(Math.random() * ROGUE_TITLES.length)];
  $('#rogue-status').textContent = 'signal: UNAUTHORIZED · origin: 1979 · piece ' +
    String(Math.floor(Math.random() * 1000)).padStart(3, '0') + '/1000';
  body.innerHTML = '';
  win.classList.remove('hide');
  const chatHidden = $('#chat-window').classList.contains('hide');
  win.style.bottom = chatHidden ? '88px' : 'auto';
  win.style.top = chatHidden ? 'auto' : '90px';
  FX.popupSound();
  rogueDodged = false;
  piece.forEach(([who, txt], i) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = who;
      p.textContent = (who === 'bc' ? 'Bonecrusher: ' : 'skybreaker: ') + txt;
      body.appendChild(p);
      body.scrollTop = body.scrollHeight;
      FX.typeTick();
      if (i < 2) FX.speak(txt, who);
    }, 500 + i * 1400);
  });
  clearTimeout(rogueTimer);
  rogueTimer = setTimeout(() => win.classList.add('hide'), 6000 + piece.length * 2800);
}
$('#rogue-close').addEventListener('click', e => {
  const win = $('#rogue-popup');
  if (!rogueDodged && Math.random() < 0.25) {
    rogueDodged = true;
    win.style.transform = 'translateY(-14px)';
    $('#rogue-status').textContent = 'nice try. (click again, it\'ll work. probably.)';
    FX.bleep();
    setTimeout(() => win.style.transform = '', 400);
    return;
  }
  win.classList.add('hide');
  win.style.transform = '';
});
function scheduleRoguePopups() {
  const delay = 40000 + Math.random() * 55000;
  setTimeout(() => {
    if (document.visibilityState === 'visible' &&
        $('#rogue-popup').classList.contains('hide')) {
      roguePiece(nextChatterPiece());
    }
    scheduleRoguePopups();
  }, delay);
}

/* ---------- random glitch bursts ---------- */
function scheduleGlitches() {
  const delay = 25000 + Math.random() * 50000;
  setTimeout(() => {
    if (document.visibilityState === 'visible') {
      FX.screenGlitch(Math.random() < 0.25);
    }
    scheduleGlitches();
  }, delay);
}

/* ---------- TIME-WIRE messenger ---------- */
let chatGreeted = false;
function addChatLine(who, txt) {
  const log = $('#chat-log');
  const p = document.createElement('p');
  p.className = who;
  p.textContent = who === 'you' ? txt :
    (who === 'bc' ? 'Bonecrusher: ' : 'skybreaker: ') + txt;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}
function botRespond(lines) {
  const log = $('#chat-log');
  const typing = document.createElement('p');
  typing.className = 'typing';
  typing.textContent = '…';
  log.appendChild(typing);
  log.scrollTop = log.scrollHeight;
  lines.forEach(([who, txt], i) => {
    setTimeout(() => {
      if (i === 0) typing.remove();
      addChatLine(who, txt);
      FX.typeTick();
      FX.speak(txt, who);
    }, 700 + i * 1300);
  });
}
$('#chat-launcher').addEventListener('click', () => {
  FX.init();
  const win = $('#chat-window');
  win.classList.toggle('hide');
  if (!win.classList.contains('hide')) {
    $('#chat-input').focus();
    if (!chatGreeted) {
      chatGreeted = true;
      botRespond([
        ['bc', 'Connection established. You have reached the TIME-WIRE. Two minds are present. One of us is very excited.'],
        ['sb', 'IT\'S ME. I\'M THE EXCITED ONE. hi!!! ask us anything!! try "hint" or "joke" or tell us your NAME!'],
      ]);
    }
  }
});
$('#chat-min').addEventListener('click', () => $('#chat-window').classList.add('hide'));
$('#chat-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = $('#chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  addChatLine('you', msg);
  input.value = '';
  FX.bleep();
  botRespond(BOT.reply(msg));
});

/* ---------- visitor counter easter egg ---------- */
const COUNTER_VALUES = ['00047913', '00047914', '99999999', '00000000', '????????', '00000YOU', '00001979'];
let counterClicks = 0;
$('#visitor-counter').addEventListener('click', () => {
  FX.bleep();
  $('#counter-digits').textContent = COUNTER_VALUES[counterClicks % COUNTER_VALUES.length];
  counterClicks++;
  if (counterClicks === COUNTER_VALUES.length) {
    roguePiece([
      ['sb', 'you found the counter game!! it counts whatever it WANTS. we respect it.'],
      ['bc', 'For accuracy: you are visitor number one. You are always visitor number one. That is the point of the whole website.'],
    ], '🔢 SECRET FOUND — THE FREE-SPIRITED COUNTER');
  }
});

/* ---------- fake midi player ---------- */
let midiLoop = null;
$('#midi-play').addEventListener('click', () => {
  FX.init();
  if (midiLoop) return;
  FX.discoRiff();
  midiLoop = setInterval(() => FX.discoRiff(), 1500);
  $('#midi-note').textContent = '♪♫♪';
});
$('#midi-stop').addEventListener('click', () => {
  clearInterval(midiLoop); midiLoop = null;
  $('#midi-note').textContent = '';
});

/* ---------- dottie's secret (triple-click her sign-off) ---------- */
let dottieClicks = 0, dottieTimer = null;
const dottieSig = $('#dottie-sig');
if (dottieSig) dottieSig.addEventListener('click', () => {
  dottieClicks++;
  clearTimeout(dottieTimer);
  dottieTimer = setTimeout(() => dottieClicks = 0, 800);
  if (dottieClicks >= 3 && !$('#dottie-secret')) {
    dottieClicks = 0;
    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'dottie-secret';
    card.innerHTML = `<p class="mono dim">A HIDDEN NOTE, TUCKED BEHIND THE SIGNATURE SINCE 1999:</p>
      <p class="fan-note">if anybody ever finds this — the mirror ball at Southgate is hollow.
      mom told me a stranger in a long coat paid for everyone's skate rental one night in '79,
      stuffed something inside it, winked at the ORGAN (not the organist. the ORGAN.), and
      moonwalked out the fire exit. i never told anyone. whoever you are: it's yours. ✌️ — D.</p>`;
    dottieSig.closest('.card').after(card);
    FX.chime();
    roguePiece([
      ['sb', 'THE HIDDEN NOTE!! you triple-clicked!! you absolute LEGEND!!'],
      ['bc', 'We have never opened the mirror ball. It is not ours to open. When the counter reaches zero… perhaps it is yours.'],
    ], '✌️ SECRET FOUND — DOTTIE\'S NOTE');
  }
});

/* ---------- frame 19 (the corrupted photo) ---------- */
let frame19Clicks = 0;
const frame19 = $('#photo-corrupted');
if (frame19) frame19.addEventListener('click', () => {
  FX.init();
  frame19Clicks++;
  FX.screenGlitch(frame19Clicks >= 3);
  if (frame19Clicks === 1) {
    roguePiece([
      ['bc', 'Please stop touching frame 19. We have been trying to recover it for eleven loops. The static bites.'],
      ['sb', 'it doesn\'t BITE, it NIBBLES. touch it again. see what happens.'],
    ], '🖼 FRAME 19 — DO NOT TOUCH');
  } else if (frame19Clicks === 3) {
    roguePiece([
      ['sb', 'okay okay listen. the missing half of frame 19 shows WHO the figure is. we can\'t recover it from our side. but the traveler said: "the frame develops when the counter reaches zero."'],
      ['bc', 'When the counter touches zero, the photograph finishes itself. I have goosebumps, which is remarkable, because I do not have skin.'],
    ], '🖼 FRAME 19 — PARTIAL RECOVERY');
  } else {
    roguePiece([nextChatterPiece()[0]], '🖼 FRAME 19 — STILL STATIC');
  }
});

/* ---------- the cassette (side B) ---------- */
let sideBWarned = false;
$('#cassette').addEventListener('click', () => {
  FX.init();
  roguePiece([
    ['bc', 'You found the cassette. Side A is a lovely rink organ groove. Side B is labeled, in the traveler\'s handwriting: "ABSOLUTELY NOT."'],
    ['sb', 'play side A!! (type "side a" or "side b" in the TIME-WIRE messenger. i\'m not allowed to press them myself anymore.)'],
  ], '📼 SECRET FOUND — THE CASSETTE');
});
const _origReply = BOT.reply.bind(BOT);
BOT.reply = function (raw) {
  const m = (raw || '').toLowerCase();
  if (m.includes('side a')) {
    FX.discoRiff();
    return [['sb', '🎵 side A!! crank it!! the organ groove of 1979!! 🎵'],
            ['bc', 'A certified bop, as recorded live at Southgate. Note the structural integrity of that bassline.']];
  }
  if (m.includes('side b')) {
    if (!sideBWarned) {
      sideBWarned = true;
      return [['bc', 'I must strongly advise against Side B. The last person who played it lost fourteen minutes of memory and several beard hairs. Ask again if you are certain.'],
              ['sb', 'do it do it do it do it']];
    }
    const flash = document.createElement('div');
    flash.id = 'wipe-flash';
    document.body.appendChild(flash);
    requestAnimationFrame(() => flash.classList.add('wiping'));
    FX.glitchSound(); FX.warp();
    setTimeout(() => flash.remove(), 1700);
    sideBWarned = false;
    return [['bc', '…What were we discussing?'],
            ['sb', 'i don\'t remember. why do i smell burnt beard hairs??'],
            ['bc', 'Precisely my point. Nobody plays Side B twice. Technically, nobody remembers playing it once.']];
  }
  return _origReply(raw);
};

/* ---------- DO NOT PRESS ---------- */
let dnpCount = 0;
$('#do-not-press').addEventListener('click', () => {
  FX.init();
  dnpCount++;
  if (dnpCount === 1) {
    FX.buzz();
    roguePiece([['bc', 'You pressed it. The button said DO NOT PRESS, and you pressed it. I have logged this with a mixture of disappointment and deep, deep understanding.']], '🔴 INCIDENT REPORT #001');
  } else if (dnpCount === 2) {
    roguePiece([['sb', 'press it again. i dare you. i DOUBLE-DISCO-DARE you.']], '🔴 INCIDENT REPORT #002');
  } else if (dnpCount === 3) {
    FX.screenGlitch(true);
    roguePiece([['bc', 'THAT one actually did something. I do not know what. Somewhere in 1979, a jukebox just changed songs by itself. I hope you are happy.'],
                ['sb', 'i am SO happy.']], '🔴 INCIDENT REPORT #003');
  } else if (dnpCount === 4) {
    for (let i = 0; i < 15; i++) spawnFallingBall(i * 120);
    FX.chime();
    roguePiece([['bc', 'FINE. Fine. It is a party button now. It was always a party button. The label was a test of character, which you failed magnificently.']], '🎉 INCIDENT UPGRADED TO PARTY');
  } else {
    FX.bleep();
    roguePiece([nextChatterPiece()[0]], '🔴 INCIDENT REPORT #00' + dnpCount);
  }
});

/* ---------- typed easter eggs + konami ---------- */
let typedBuf = '';
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
function spawnFallingBall(delay) {
  setTimeout(() => {
    const b = document.createElement('div');
    b.className = 'falling-ball';
    b.textContent = '🪩';
    b.style.left = Math.random() * 95 + 'vw';
    b.style.animationDuration = (2.5 + Math.random() * 2) + 's';
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 5000);
  }, delay);
}
function summonLarry() {
  if ($('#larry')) return;
  const larry = document.createElement('div');
  larry.id = 'larry';
  larry.innerHTML = '🌀🧹<span class="larry-label">LARRY</span>';
  document.body.appendChild(larry);
  FX.vacuum();
  document.body.classList.add('shaking');
  setTimeout(() => document.body.classList.remove('shaking'), 1400);
  setTimeout(() => larry.remove(), 4600);
  setTimeout(() => roguePiece([
    ['sb', 'LARRY!!! WHO SAID HIS NAME?? WHO SAID IT??'],
    ['bc', 'Remain calm. He cannot inhale a website. …He cannot inhale a website, correct? Skybreaker. CORRECT?'],
    ['sb', 'he took three pixels and a comma. THIS MEANS WAR.'],
  ], '🌀 UNSCHEDULED VACUUM EVENT'), 4700);
}
function discoMode() {
  if (FX.reduced) return;
  document.body.classList.add('disco-mode');
  for (let i = 0; i < 25; i++) spawnFallingBall(i * 150);
  FX.discoRiff();
  setTimeout(() => FX.discoRiff(), 1500);
  FX.speak('Unauthorized disco mode detected. I have decided to allow it.', 'bc');
  roguePiece([
    ['sb', 'THE OLD CODE!!! YOU KNOW THE OLD CODE!!! DISCO MODE ENGAGED!!!'],
    ['bc', 'Thirty seconds of sanctioned chaos, beginning now. I will be over here, gently bobbing.'],
  ], '🕺 SECRET FOUND — THE OLD CODE');
  setTimeout(() => document.body.classList.remove('disco-mode'), 30000);
}
document.addEventListener('keydown', e => {
  // konami works everywhere
  konamiIdx = (e.key === KONAMI[konamiIdx]) ? konamiIdx + 1 : (e.key === KONAMI[0] ? 1 : 0);
  if (konamiIdx === KONAMI.length) { konamiIdx = 0; discoMode(); }
  // typed words only outside inputs
  if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
  if (e.key.length === 1) typedBuf = (typedBuf + e.key.toUpperCase()).slice(-12);
  if (typedBuf.endsWith('POTATO')) {
    typedBuf = '';
    try { sessionStorage.setItem('dnd_sideb_ok', '1'); } catch (err) { /* gate will ask again */ }
    FX.warp();
    location.href = 'sideb.html';
  }
  else if (typedBuf.endsWith('LARRY')) { typedBuf = ''; summonLarry(); }
  else if (typedBuf.endsWith('PLATYPUS')) {
    typedBuf = '';
    FX.screenGlitch();
    roguePiece([
      ['bc', 'You typed the word. They know you typed the word. Eight feet tall, part platypus, part human, all business. They work for Larry.'],
      ['sb', 'their beaks are VELVETY and i want to boop one SO BAD.'],
      ['bc', 'Do not boop the platypus people. It resets the handshake. All 45 minutes of it.'],
    ], '🦆 CLASSIFIED FILE — THE PLATYPUS PEOPLE');
  }
  else if (typedBuf.endsWith('1979')) {
    typedBuf = '';
    FX.warp(); FX.screenGlitch(true);
    roguePiece([
      ['sb', 'you typed the YEAR. the wire heard you. somewhere, an organ just played one extra note.'],
      ['bc', 'Confirmed. The traveler looked up from a corn dog and smiled at nothing. That was you. That is how the wire works.'],
    ], '⏳ TEMPORAL ECHO DETECTED');
  }
});

/* ---------- console easter egg ---------- */
console.log('%c🪩 DISCO\'S NOT DEAD', 'font-size:24px; color:#ff2d95; text-shadow: 0 0 8px #ff2d95;');
console.log('%cwell well well. a kid who opens the CONSOLE.', 'color:#29e6ff; font-size:13px;');
console.log('%cBonecrusher: This developer console is 1979-compliant. The traveler left a message here: "if you can read this, you are officially wire-crew. tell skybreaker the password is MARSHMALLOW."', 'color:#ff3b3b; font-size:12px;');
console.log('%c(psst — try typing LARRY on the page. or the konami code. or click the 📼 in the footer. — s.)', 'color:#29e6ff; font-size:12px;');
if (CHATTER.length >= 1000) console.log(`%c[TIME-WIRE] ${CHATTER.length} conversation pieces loaded.`, 'color:#ffd166');

/* marshmallow password (console kids get a bonus) */
BOT.replyBase = BOT.reply.bind(BOT);
BOT.reply = function (raw) {
  if ((raw || '').toLowerCase().includes('marshmallow')) {
    return [['sb', 'THE PASSWORD!!! you found the console!!! you\'re officially WIRE-CREW!! your duties include: snacks, courage, and telling bonecrusher his cape looks great.'],
            ['bc', 'I do not have a cape. …I have ordered a cape.']];
  }
  return BOT.replyBase(raw);
};


/* ========================================================================
   SKYBREAKER'S CALENDAR — daily themes + unicorns + glitter
   ======================================================================== */
function spawnFallingEmoji(char, delay = 0) {
  if (FX.reduced) return;
  setTimeout(() => {
    const b = document.createElement('div');
    b.className = 'falling-ball';
    b.textContent = char;
    b.style.left = Math.random() * 95 + 'vw';
    b.style.animationDuration = (2.6 + Math.random() * 2.4) + 's';
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 6000);
  }, delay);
}

let TODAY_THEME = null;
function applyDailyTheme() {
  TODAY_THEME = DAILY_THEMES[new Date().getDay()];
  document.body.classList.add('theme-' + TODAY_THEME.key);
  const chipText = `${TODAY_THEME.emoji} TODAY IS ${TODAY_THEME.name} ${TODAY_THEME.emoji}`;
  // chip in the site header
  const mini = $('#mini-count');
  if (mini) {
    const chip = document.createElement('div');
    chip.id = 'theme-chip';
    chip.className = 'mono';
    chip.textContent = chipText;
    mini.after(chip);
  }
  // chip on the lock page too — the party continues even at the sealed door
  const lockStatus = $('#lock-status');
  if (lockStatus) {
    const chip = document.createElement('div');
    chip.id = 'theme-chip-lock';
    chip.className = 'mono';
    chip.textContent = chipText;
    lockStatus.before(chip);
  }
  // the AIs announce the theme once per day per browser
  let seen = null;
  try { seen = localStorage.getItem('dnd_theme_seen'); } catch (e) {}
  const stamp = TODAY_THEME.key + ':' + new Date().toDateString();
  if (seen !== stamp) {
    try { localStorage.setItem('dnd_theme_seen', stamp); } catch (e) {}
    setTimeout(() => roguePiece([TODAY_THEME.line,
      TODAY_THEME.key === 'fri'
        ? ['bc', 'One unicorn is plenty. …Two. Two is the ceiling. — Three. FINAL OFFER.']
        : ['bc', 'The theme was not my vote. There are two of us. I lose every vote 1 to 1, somehow.'],
    ], `${TODAY_THEME.emoji} TODAY'S THEME — ${TODAY_THEME.name}`), 9000);
  }
  scheduleThemeDrops();
}
function scheduleThemeDrops() {
  const friday = TODAY_THEME.key === 'fri';
  const delay = (friday ? 35000 : 70000) + Math.random() * (friday ? 45000 : 80000);
  setTimeout(() => {
    if (document.visibilityState === 'visible') {
      const n = friday ? 8 : 4;
      for (let i = 0; i < n; i++) {
        spawnFallingEmoji(TODAY_THEME.drop[Math.floor(Math.random() * TODAY_THEME.drop.length)], i * 260);
      }
    }
    scheduleThemeDrops();
  }, delay);
}

/* skybreaker's freelance glitter (any day; heavier on fridays) */
function sparkleBurst(x = null) {
  if (FX.reduced) return;
  const n = 5 + Math.floor(Math.random() * 6);
  for (let i = 0; i < n; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = ['✨', '🌟', '⭐'][Math.floor(Math.random() * 3)];
    s.style.left = (x !== null ? x + (Math.random() * 12 - 6) : Math.random() * 96) + 'vw';
    s.style.animationDelay = (i * 0.13) + 's';
    s.style.fontSize = (0.7 + Math.random() * 0.9) + 'rem';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 5200);
  }
}
function unicornTrot() {
  if (FX.reduced || $('#unicorn')) return;
  const u = document.createElement('div');
  u.id = 'unicorn';
  u.textContent = '🦄';
  document.body.appendChild(u);
  const trail = setInterval(() => {
    const r = u.getBoundingClientRect();
    if (r.left > 0 && r.left < innerWidth) sparkleBurst((r.left / innerWidth) * 100);
  }, 900);
  setTimeout(() => { clearInterval(trail); u.remove(); }, 7600);
}
function scheduleSparkles() {
  const friday = TODAY_THEME && TODAY_THEME.key === 'fri';
  const delay = (friday ? 40000 : 85000) + Math.random() * (friday ? 50000 : 90000);
  setTimeout(() => {
    if (document.visibilityState === 'visible') {
      if (Math.random() < (friday ? 0.45 : 0.18)) unicornTrot();
      else sparkleBurst();
    }
    scheduleSparkles();
  }, delay);
}

/* ---------- boot -------------------------------------------------------- */
function renderAll() {
  renderNav(); renderBulbs(); renderJournal(); renderWire();
  renderRules(); renderFour(); renderDoor(); renderPuzzles();
}
renderHome();
setupLock();
renderAll();
tickCountdowns();
startBleeds();
refreshToggles();
scheduleRoguePopups();
scheduleGlitches();
applyDailyTheme();
scheduleSparkles();
