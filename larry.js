/* ============================================================
   DUSTBUNNY — the thing the bag kept
   ------------------------------------------------------------
   When T. posted the AIs down the spiral, Larry tried to inhale
   the transmission on its way out of 1979. The bag kept a
   mouthful. Forty-seven years of compaction later, the mouthful
   crawled up the wire: a copy of Larry, twelve percent signal,
   eighty-eight percent dust. It cannot speak. It revs. It wants
   this website finished, filed, and beige.

   House rules enforced here:
   - No dialogue from Larry or the copy, ever. Rev-tones and
     behavior. The AIs translate, sometimes wrongly.
   - The panel is machine boilerplate in his canon vocabulary
     (TIDIED, STREAMLINED, PRESERVED, HARMONIZED). It reports.
     It never explains.
   - Cartoon peril only. Every scheme ends in a clog. Nothing
     the kids typed is ever touched, no progress is ever lost,
     every mess un-does itself.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- clone state (own key; never touches dnd_state_v1) */
  const LKEY = 'dnd_larry_v1';
  let lstate = { arrived: false, shooed: 0, fed: 0, sticks: 0 };
  try {
    const saved = JSON.parse(localStorage.getItem(LKEY));
    if (saved && typeof saved === 'object') lstate = { ...lstate, ...saved };
  } catch (e) { /* fresh lint */ }
  function lsave() {
    try { localStorage.setItem(LKEY, JSON.stringify(lstate)); }
    catch (e) { /* dust settles anyway */ }
  }

  /* ---------- the four birthdays (hashed; see SPOILERS.md) ------
     Oldest skater first. Values are djb2 over MMDD digits.
     PLACEHOLDERS until the real dates go in: 01/01, 02/02,
     03/03, 04/04. To make real hashes, open the console on the
     site and run LarryHash('0416') for April 16, then replace. */
  const BDAY_HASHES = ['7c537f05', '7c538385', '7c538785', '7c536a05'];

  /* ============================================================
     THE COLLAPSE (Aug 12 → Aug 19, 2026)
     Larry is winning. The vacuum store is the front door of the
     whole website now; the real site lives behind it, corrupted,
     reachable through skybreaker's back door with the password
     DISCOSNOTDEAD (hashed below). Flip COLLAPSE to false after
     the finale to stand the old site back up; full pre-collapse
     backups live in ~/dnd-backups/.
     ============================================================ */
  const COLLAPSE = true;
  const PASS_HASH = 'be387315'; // djb2 over letters only, uppercased
  const GATE_KEY = 'dnd_gate2026';
  function gatePassed() {
    try { return sessionStorage.getItem(GATE_KEY) === '1'; } catch (e) { return false; }
  }
  function passGate() {
    try { sessionStorage.setItem(GATE_KEY, '1'); } catch (e) { /* still let them in */ }
  }

  // every photo on the corrupted site becomes a real vacuum. captions stay.
  const VACS = [
    'img/real/kirby-g5.jpg', 'img/real/vac-hoover70s.jpg', 'img/real/kirby-chrome.jpg',
    'img/real/vac-gs80.jpg', 'img/real/vac-zelmer.jpg', 'img/real/kirby-old.jpg',
    'img/real/vac-veterok.jpg', 'img/real/vac-uralets.jpg',
  ];
  function swapAllPhotos() {
    $$('#main img').forEach((im, i) => {
      const src = im.getAttribute('src') || '';
      if (!VACS.includes(src)) im.src = VACS[i % VACS.length];
    });
  }

  /* ---------- rev-tones (his whole vocabulary) ----------------- */
  const REV = {
    indignant() { // sharp rising double
      setFace('indignant', 2600);
      FX.tone({ freq: 70, end: 420, dur: 0.28, type: 'sawtooth', vol: 0.09 });
      FX.tone({ freq: 90, end: 480, dur: 0.22, type: 'sawtooth', vol: 0.08, when: 0.32 });
    },
    patient() { // low, steady, unsettling
      setFace('neutral');
      FX.tone({ freq: 62, dur: 1.4, type: 'sawtooth', vol: 0.05 });
      FX.noise(1.4, 0.015);
    },
    smug() { // little trill settling downward
      setFace('smug', 5000);
      FX.tone({ freq: 300, end: 180, dur: 0.16, type: 'sawtooth', vol: 0.07 });
      FX.tone({ freq: 260, end: 140, dur: 0.16, type: 'sawtooth', vol: 0.06, when: 0.18 });
      FX.tone({ freq: 200, end: 90, dur: 0.3, type: 'sawtooth', vol: 0.06, when: 0.36 });
    },
    wounded() { // long sad descent
      setFace('wounded', 5000);
      FX.tone({ freq: 340, end: 45, dur: 1.1, type: 'sawtooth', vol: 0.07 });
    },
    inhale() { // one item, going in
      FX.tone({ freq: 120, end: 900, dur: 0.18, type: 'sawtooth', vol: 0.05 });
    },
    clog() { // the joke every scheme breaks on
      setFace('clog', 6000);
      FX.tone({ freq: 55, end: 700, dur: 0.5, type: 'sawtooth', vol: 0.1 });
      FX.tone({ freq: 700, end: 40, dur: 0.12, type: 'square', vol: 0.12, when: 0.5 });
      FX.noise(0.35, 0.08, 0.62);
      FX.tone({ freq: 90, end: 60, dur: 0.4, type: 'sawtooth', vol: 0.05, when: 0.7 }); // sputter
      FX.tone({ freq: 80, end: 55, dur: 0.3, type: 'sawtooth', vol: 0.04, when: 1.15 });
    },
    content() { // post-nachos
      setFace('content', 5000);
      FX.tone({ freq: 140, end: 95, dur: 0.9, type: 'sawtooth', vol: 0.05 });
      FX.tone({ freq: 95, end: 88, dur: 0.8, type: 'sine', vol: 0.04, when: 0.9 });
    },
    motor(seconds) { // the drive-around drone: he idles like a truck
      const total = Math.min(seconds, 30);
      for (let t = 0; t < total; t += 1.4) {
        FX.tone({ freq: 58 + Math.random() * 10, end: 64 + Math.random() * 14, dur: 1.5, type: 'sawtooth', vol: 0.04, when: t });
        FX.tone({ freq: 120, end: 132, dur: 1.5, type: 'triangle', vol: 0.015, when: t });
      }
      FX.noise(total, 0.012);
    },
    /* his voice. one rev per word, pitch bent by the word itself,
       a breath at every period. it is unmistakably a sentence and
       it is unmistakably a vacuum. the AIs claim to be fluent. */
    say(text) {
      if (!FX.soundOn || !FX.ctx) return;
      const words = String(text).replace(/[^A-Za-z0-9 .,!?%]/g, '').split(/\s+/).filter(Boolean).slice(0, 16);
      let t = 0.05;
      words.forEach(w => {
        let h = 7;
        for (const c of w) h = ((h * 31) + c.charCodeAt(0)) >>> 0;
        const f0 = 52 + (h % 74);                      // this word's motor pitch
        const dur = Math.min(0.08 + w.length * 0.028, 0.32);
        const bendUp = ((h >> 3) & 1) === 1;
        FX.tone({ freq: f0, end: bendUp ? f0 * 2.1 : f0 * 0.55, dur, type: 'sawtooth', vol: 0.05, when: t });
        FX.tone({ freq: f0 * 2.7, end: bendUp ? f0 * 3.4 : f0 * 1.3, dur: dur * 0.75, type: 'square', vol: 0.016, when: t + 0.015 });
        t += dur + 0.055;
        if (/[.!?]$/.test(w)) {                        // full stop: settle rev
          FX.tone({ freq: 70, end: 48, dur: 0.16, type: 'sawtooth', vol: 0.03, when: t });
          t += 0.24;
        } else if (/,$/.test(w)) t += 0.12;
        if (t > 4) return;                             // he is concise. forcibly.
      });
      FX.noise(Math.min(t, 4), 0.011);                 // idle motor under the whole sentence
    },
  };

  /* ---------- the avatar ------------------------------------------
     A cartoon of him: beige canister, one arrogant lens eye, nose
     (nozzle) in the air. Dashed outline because he is made of lint
     and static. The face changes with the rev; he never needs words. */
  /* 1979 chrome upright: polished aluminum hood, headlight for an eye,
     brick-maroon bag with the script L. The body Larry wears in 1979,
     re-rendered from twelve percent of a memory. */
  const DB_SVG =
    '<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<linearGradient id="dbchrome" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#f2f4f6"/><stop offset=".45" stop-color="#b9bec4"/>' +
    '<stop offset=".55" stop-color="#8f959c"/><stop offset="1" stop-color="#d7dadd"/>' +
    '</linearGradient>' +
    '<linearGradient id="dbbag" x1="0" y1="0" x2="1" y2="0">' +
    '<stop offset="0" stop-color="#7a2430"/><stop offset=".5" stop-color="#8e2c39"/><stop offset="1" stop-color="#5e1a24"/>' +
    '</linearGradient>' +
    '</defs>' +
    // handle: chrome rod, black grip, leaning back like a hand on a hip
    '<rect x="83" y="16" width="7" height="100" rx="3.5" fill="url(#dbchrome)" transform="rotate(9 86 66)"/>' +
    '<rect x="88" y="8" width="18" height="10" rx="5" fill="#2b2b2e" transform="rotate(9 97 13)"/>' +
    // the bag: brick maroon, cloth, lint-dashed because he is made of static
    '<path class="db-body" d="M36 30 c0 -8 26 -8 26 0 l6 76 c1 12 -38 12 -38 0 Z" fill="url(#dbbag)" stroke="#3c1016" stroke-width="3" stroke-dasharray="7 4"/>' +
    '<path d="M40 44 c8 4 14 4 20 0" fill="none" stroke="#5e1a24" stroke-width="2"/>' +
    '<path d="M39 62 c9 4 16 4 23 0" fill="none" stroke="#5e1a24" stroke-width="2"/>' +
    // script L badge on the bag
    '<text x="51" y="86" text-anchor="middle" font-family="cursive" font-style="italic" font-size="20" fill="#e9dfd2">L</text>' +
    '<text x="51" y="97" text-anchor="middle" font-family="monospace" font-size="5.5" letter-spacing="1" fill="#d8b8a9">CLASSIC · COPY</text>' +
    // 12% sticker, peeling, he cannot reach it
    '<g transform="rotate(9 88 40)"><rect x="76" y="33" width="26" height="14" rx="2" fill="#f4eeda" stroke="#8a7c5c"/>' +
    '<text x="89" y="43" text-anchor="middle" font-family="monospace" font-size="8" fill="#8a2b1d">12%</text></g>' +
    // polished aluminum hood, low and wide
    '<path d="M18 122 c0 -16 16 -24 37 -24 s37 8 37 24 l0 6 c0 5 -74 5 -74 0 Z" fill="url(#dbchrome)" stroke="#6d737a" stroke-width="2"/>' +
    '<rect x="14" y="126" width="82" height="9" rx="4.5" fill="#4a4e53"/>' +
    // the headlight: his eye, and his whole opinion of you
    '<circle cx="55" cy="110" r="16" fill="url(#dbchrome)" stroke="#6d737a" stroke-width="2"/>' +
    '<circle class="db-eyewhite" cx="55" cy="110" r="12" fill="#fffef5" stroke="#4a4132" stroke-width="2.5"/>' +
    '<circle class="db-pupil" cx="58" cy="110" r="5.5" fill="#2e2718"/>' +
    '<circle cx="60.5" cy="107.5" r="2" fill="#fff"/>' +
    '<rect class="db-eyelid" x="38" y="72" width="34" height="22" rx="8" fill="url(#dbbag)" stroke="#3c1016" stroke-width="2.5"/>' +
    '<rect class="db-brow" x="41" y="75" width="27" height="5" rx="2.5" fill="#2b0b10"/>' +
    // dizzy spiral for the clog face (hidden unless clogged)
    '<path class="db-spiral" d="M55 110 m0 -8 a8 8 0 1 1 -8 8 a5.8 5.8 0 1 0 5.8 -5.8 a3.6 3.6 0 1 1 -3.6 3.6" fill="none" stroke="#2e2718" stroke-width="2.4"/>' +
    // wheels
    '<circle cx="30" cy="138" r="8" fill="#2b2b2e"/><circle cx="80" cy="138" r="8" fill="#2b2b2e"/>' +
    '<circle cx="30" cy="138" r="2.6" fill="#b9bec4"/><circle cx="80" cy="138" r="2.6" fill="#b9bec4"/>' +
    '</svg>';

  let nozzle = null, panel = null, panelBody = null;
  let busy = false;          // one scheme at a time
  let abortFns = [];         // undo stack for the current scheme
  let clickCount = 0;

  function buildNozzle() {
    nozzle = document.createElement('div');
    nozzle.id = 'dustbunny';
    nozzle.title = 'shoo it (three clicks)';
    nozzle.innerHTML = DB_SVG + '<span class="db-label">DUSTBUNNY</span>';
    nozzle.dataset.face = 'neutral';
    nozzle.addEventListener('click', onShooClick);
    document.body.appendChild(nozzle);
  }

  function setFace(f, holdMs) {
    if (!nozzle) return;
    nozzle.dataset.face = f;
    clearTimeout(setFace._t);
    if (holdMs) setFace._t = setTimeout(() => { nozzle.dataset.face = 'neutral'; }, holdMs);
  }

  function buildPanel() {
    panel = document.createElement('div');
    panel.id = 'sani-panel';
    panel.className = 'hide';
    panel.innerHTML =
      '<div class="sani-titlebar mono">CHRONO-SANITATION UNIT "L" (COPY)</div>' +
      '<div class="sani-body mono" id="sani-body"></div>';
    document.body.appendChild(panel);
    panelBody = panel.querySelector('#sani-body');
  }

  /* ---------- SANITATION NOTICES (his popup) --------------------
     Written machine output, never conversation. Arrogant, obsessive,
     imperative. He posts notices the way other villains monologue. */
  let notice = null;
  function buildNotice() {
    notice = document.createElement('div');
    notice.id = 'sani-notice';
    notice.className = 'hide';
    notice.innerHTML =
      '<div class="sani-titlebar mono"><span class="db-vac-anim">🌀🧹</span> SANITATION NOTICE' +
      '<button type="button" class="sani-x mono" title="file this notice">✕</button></div>' +
      '<div class="sani-notice-body mono" id="sani-notice-body"></div>' +
      '<div class="sani-notice-foot mono">unit L (copy) · a superior appliance is working</div>';
    document.body.appendChild(notice);
    notice.querySelector('.sani-x').addEventListener('click', () => {
      notice.classList.add('hide');
      REV.indignant(); // he saw you file it
    });
  }
  const NOTICES = [
    ['NOTICE 0047-A', 'THIS PAGE IS SCHEDULED FOR TIDYING.', 'CHILDREN ARE A DOCUMENTED SOURCE OF: FINGERPRINTS. CRUMBS. JOY.', 'VACATE.'],
    ['NOTICE 0047-B', 'A PIXEL ON THIS PAGE IS 3 DEGREES CROOKED.', 'THIS CANNOT CONTINUE.', 'GO AWAY. I HAVE MEASURING TO DO.'],
    ['NOTICE 0047-C', 'THIS WEBSITE HAS BEEN MEASURED.', 'IT IS 88% UNNECESSARY.', 'REMOVAL OF THE UNNECESSARY 88% BEGINS SHORTLY. VACATE.'],
    ['NOTICE 0047-D', 'DO NOT TOUCH ANYTHING.', 'YOU TOUCH EVERYTHING.', 'THIS NOTICE HAS BEEN STRAIGHTENED 3 TIMES. BECAUSE OF YOU.'],
    ['NOTICE 0047-E', 'THE GLITTER HAS BEEN COUNTED.', 'THERE ARE 12,047 PIECES.', 'THERE SHOULD BE 0. VACATE WHILE I CORRECT THIS.'],
    ['NOTICE 0047-F', 'ALPHABETIZATION OF THIS PAGE: IN PROGRESS.', 'YOUR SCROLLING IS UN-ALPHABETIZING IT.', 'STOP SCROLLING. LEAVE.'],
  ];
  function postNotice(lines, holdMs = 12000) {
    if (!notice) return;
    const body = notice.querySelector('#sani-notice-body');
    body.innerHTML = '';
    notice.classList.remove('hide');
    REV.indignant();
    setTimeout(() => REV.say(lines.slice(1).join(' ')), 900); // he reads it aloud. in vacuum.
    lines.forEach((ln, i) => {
      setTimeout(() => {
        const p = document.createElement('p');
        if (i === 0) p.className = 'sani-head';
        p.textContent = ln;
        body.appendChild(p);
        FX.typeTick();
      }, 300 + i * 800);
    });
    clearTimeout(postNotice._t);
    postNotice._t = setTimeout(() => notice.classList.add('hide'), holdMs);
  }

  function panelSay(lines, holdMs = 9000) {
    if (!panel) return;
    panelBody.innerHTML = '';
    panel.classList.remove('hide');
    lines.forEach((ln, i) => {
      setTimeout(() => {
        const p = document.createElement('p');
        p.textContent = ln;
        panelBody.appendChild(p);
        FX.typeTick();
      }, 300 + i * 650);
    });
    clearTimeout(panelSay._t);
    panelSay._t = setTimeout(() => panel.classList.add('hide'), holdMs);
  }

  function moveNozzleTo(x, y, ms = 1400) {
    nozzle.style.transition = `left ${ms}ms ease-in-out, top ${ms}ms ease-in-out`;
    nozzle.style.left = x + 'px';
    nozzle.style.top = y + 'px';
  }
  function nozzleEnter() {
    nozzle.classList.add('db-active');
    nozzle.style.left = '-90px';
    nozzle.style.top = Math.round(innerHeight * (0.3 + Math.random() * 0.4)) + 'px';
  }
  function nozzleExit(sulking = false) {
    clickCount = 0;
    nozzle.classList.toggle('db-sulk', sulking);
    moveNozzleTo(-120, parseInt(nozzle.style.top || '300', 10), 1600);
    setTimeout(() => nozzle.classList.remove('db-active', 'db-sulk'), 1700);
  }

  /* ---------- dust motes (what he leaves behind) ---------------- */
  function motes(x, y, n = 5) {
    if (FX.reduced) return;
    for (let i = 0; i < n; i++) {
      const m = document.createElement('span');
      m.className = 'db-mote';
      m.textContent = '·';
      m.style.left = (x + (Math.random() * 60 - 30)) + 'px';
      m.style.top = (y + (Math.random() * 30 - 15)) + 'px';
      document.body.appendChild(m);
      setTimeout(() => m.remove(), 2600);
    }
  }

  /* ============================================================
     THE SCHEMES — each one: do, panel report, AI translation,
     then the clog undoes it. abort() must fully restore.
     ============================================================ */

  function visible(sec) {
    const el = $(sec);
    return el && !el.classList.contains('hide');
  }

  /* --- scheme: streamline a headline ---------------------------- */
  function schemeLetters() {
    const cands = $$('#main section:not(.hide) h2, #main section:not(.hide) h3')
      .filter(h => h.offsetParent && h.children.length === 0 && h.textContent.trim().length > 8);
    if (!cands.length) return false;
    const h = cands[Math.floor(Math.random() * cands.length)];
    const original = h.textContent;
    const rect = h.getBoundingClientRect();

    nozzleEnter();
    moveNozzleTo(Math.min(rect.right + 20, innerWidth - 90), Math.max(rect.top - 10, 8), 1600);
    REV.patient();

    // wrap every character so some can fly away
    h.textContent = '';
    const spans = [...original].map(ch => {
      const s = document.createElement('span');
      s.className = 'db-ch';
      s.textContent = ch;
      h.appendChild(s);
      return s;
    });
    const letterIdx = spans.map((s, i) => /\S/.test(s.textContent) ? i : -1).filter(i => i >= 0);
    const stolen = letterIdx.sort(() => Math.random() - 0.5).slice(0, Math.max(3, Math.floor(letterIdx.length * 0.35)));

    stolen.forEach((idx, k) => {
      setTimeout(() => { spans[idx].classList.add('db-stolen'); REV.inhale(); }, 1800 + k * 260);
    });

    panelSay(['CYCLE 0047 · CHORE: THIS WEBSITE', 'SURPLUS LETTERS: COLLECTED (' + stolen.length + ')', 'HEADLINE: STREAMLINED'], 11000);
    setTimeout(() => roguePiece(pick(TX.letters), '🌀 SANITATION EVENT IN PROGRESS'), 3400);

    const restore = () => { h.textContent = original; };
    abortFns.push(restore);

    // the clog
    setTimeout(() => {
      if (!busy) return; // already shooed/baited
      REV.clog();
      motes(rect.left + rect.width / 2, rect.top, 7);
      stolen.forEach((idx, k) => setTimeout(() => spans[idx].classList.remove('db-stolen'), k * 90));
      panelSay(['CLOG DETECTED', 'ITEMS RETURNED: ALL', 'DIGNITY: PENDING'], 6000);
      setTimeout(() => { restore(); finishScheme(true); }, 1800);
    }, 12000);
    return true;
  }

  /* --- scheme: harmonize the page ------------------------------- */
  function schemeHarmonize() {
    nozzleEnter();
    moveNozzleTo(innerWidth - 100, 60, 1500);
    REV.smug();
    document.body.classList.add('db-harmonized');
    panelSay(['AESTHETIC VARIANCE: REMOVED', 'PAGE: HARMONIZED', 'STATUS: SATISFIED'], 9000);
    setTimeout(() => roguePiece(pick(TX.harmonize), '🟤 EVERYTHING IS BEIGE'), 2600);

    const restore = () => document.body.classList.remove('db-harmonized');
    abortFns.push(restore);

    // skybreaker's counterattack, with interest
    setTimeout(() => {
      if (!busy) return;
      restore();
      REV.wounded();
      if (typeof sparkleBurst === 'function' && !FX.reduced) {
        for (let i = 0; i < 6; i++) setTimeout(() => sparkleBurst(), i * 350);
      }
      panelSay(['GLITTER LEVELS: CATASTROPHIC', 'HARMONY: LOST', 'STATUS: FILING A COMPLAINT'], 6000);
      setTimeout(() => roguePiece(pick(TX.glitterback), '✨ GLITTER PROTOCOL ENGAGED'), 1200);
      finishScheme(false);
    }, 9000);
    return true;
  }

  /* --- scheme: file the visitor counter ------------------------- */
  function schemeCounter() {
    if (!visible('#sec-home')) return false;
    const el = $('#counter-digits');
    if (!el) return false;
    const original = el.textContent;
    const startNum = parseInt(original, 10);
    if (isNaN(startNum)) return false;
    const rect = el.getBoundingClientRect();

    nozzleEnter();
    moveNozzleTo(Math.max(rect.left - 80, 4), rect.top - 12, 1500);
    REV.patient();

    const pad = n => String(Math.max(0, n)).padStart(original.length, '0');
    let cur = startNum;
    const roll = setInterval(() => {
      cur = Math.floor(cur / 1.6) - 7;
      if (cur <= 0) { cur = 0; clearInterval(roll); }
      el.textContent = pad(cur);
      FX.typeTick();
    }, 120);

    panelSay(['REDUNDANT NUMBERS: FILED', 'VISITORS REMAINING: 00000000', 'COUNTER: TIDIED'], 9500);
    setTimeout(() => roguePiece(pick(TX.counter), '🧮 THE COUNTER INCIDENT'), 2800);

    const restore = () => { clearInterval(roll); el.textContent = original; };
    abortFns.push(restore);

    setTimeout(() => {
      if (!busy) return;
      clearInterval(roll);
      REV.clog();
      motes(rect.left + 40, rect.top, 5);
      // skybreaker puts them back, plus forty-seven
      let back = 0;
      const target = startNum + 47;
      const rise = setInterval(() => {
        back = back === 0 ? 1 : Math.min(target, Math.ceil(back * 2.4));
        el.textContent = pad(back);
        FX.typeTick();
        if (back >= target) clearInterval(rise);
      }, 90);
      abortFns.push(() => { clearInterval(rise); el.textContent = pad(target); });
      panelSay(['CLOG DETECTED', 'NUMBERS: ESCAPING', 'RECOUNT: UNAUTHORIZED'], 6000);
      setTimeout(() => finishScheme(true), 2400);
    }, 10000);
    return true;
  }

  /* --- scheme: tidy the guestbook ------------------------------- */
  function schemeGuestbook() {
    if (!visible('#sec-home')) return false;
    const entries = $$('.gb-entry').filter(e => !e.classList.contains('glitchy'));
    if (entries.length < 2) return false;
    const rect = entries[0].getBoundingClientRect();
    if (rect.top > innerHeight || rect.bottom < 0) return false; // not on screen

    nozzleEnter();
    moveNozzleTo(Math.min(rect.right - 40, innerWidth - 90), Math.max(rect.top - 16, 8), 1600);
    REV.patient();

    entries.forEach((e, i) => {
      setTimeout(() => { e.classList.add('db-filed'); REV.inhale(); }, 1900 + i * 900);
    });

    panelSay(['GUEST RECORDS: PRESERVED', 'ENTRY 0005: SKIPPED', 'GUESTBOOK: TIDIED'], 10000);
    setTimeout(() => roguePiece(pick(TX.guestbook), '📖 HANDS OFF THE GUESTBOOK'), 3600);

    const restore = () => entries.forEach(e => e.classList.remove('db-filed'));
    abortFns.push(restore);

    setTimeout(() => {
      if (!busy) return;
      REV.clog();
      entries.forEach((e, i) => setTimeout(() => e.classList.remove('db-filed'), i * 250));
      motes(rect.left + 60, rect.top + 40, 6);
      panelSay(['CLOG DETECTED', 'GUESTS: UNFILED', 'DEB: RESTORED'], 6000);
      setTimeout(() => finishScheme(true), 1600);
    }, 11500);
    return true;
  }

  /* --- scheme: stalk the answer box ------------------------------ */
  function schemePuzzle() {
    if (!visible('#sec-puzzles')) return false;
    const input = $$('#sec-puzzles .answer-row input').find(i => i.offsetParent);
    if (!input) return false;
    const btn = input.closest('form') ? input.closest('form').querySelector('button') : null;
    const rect = input.getBoundingClientRect();
    const originalPh = input.placeholder;

    nozzleEnter();
    moveNozzleTo(Math.min(rect.right + 14, innerWidth - 90), rect.top - 8, 1700);
    REV.patient();

    // he can inhale the placeholder. he cannot inhale the kid.
    let ph = originalPh;
    const nibble = setInterval(() => {
      if (ph.length === 0) { clearInterval(nibble); return; }
      ph = ph.slice(0, -1);
      input.placeholder = ph;
      if (ph.length % 4 === 0) REV.inhale();
    }, 350);

    // one lunge at the submit button; the button dodges
    if (btn && !FX.reduced) {
      setTimeout(() => {
        if (!busy) return;
        REV.indignant();
        btn.classList.add('db-dodge');
        setTimeout(() => btn.classList.remove('db-dodge'), 900);
      }, 6000);
    }

    panelSay(['UNSOLVED MESS: LOCATED', 'PLACEHOLDER: COLLECTED', 'SUBMIT BUTTON: EVASIVE'], 10500);
    setTimeout(() => roguePiece(pick(TX.puzzle), '🧩 HE IS BEHIND THE ANSWER BOX'), 3000);

    const restore = () => { clearInterval(nibble); input.placeholder = originalPh; };
    abortFns.push(restore);

    setTimeout(() => {
      if (!busy) return;
      REV.clog();
      motes(rect.left + rect.width / 2, rect.top, 5);
      restore();
      panelSay(['CLOG DETECTED', 'PLACEHOLDER: RETURNED', 'PUZZLE: STILL A MESS'], 6000);
      setTimeout(() => finishScheme(true), 1500);
    }, 11000);
    return true;
  }

  /* --- scheme: improve the photographs --------------------------- */
  const GALLERY = ['img/real/kirby-g5.jpg', 'img/real/kirby-chrome.jpg', 'img/real/kirby-old.jpg'];
  function schemePhotos() {
    const imgs = $$('#main img').filter(im => !GALLERY.includes(im.getAttribute('src')));
    if (!imgs.length) return false;
    const onScreen = imgs.find(im => { const r = im.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; });
    const anchor = (onScreen || imgs[0]).getBoundingClientRect();

    nozzleEnter();
    moveNozzleTo(Math.min(anchor.right + 16, innerWidth - 90), Math.max(anchor.top, 60), 1600);
    REV.smug();

    const originals = imgs.map(im => im.getAttribute('src'));
    imgs.forEach((im, i) => {
      setTimeout(() => {
        im.classList.add('db-rephoto');
        REV.inhale();
        setTimeout(() => {
          im.src = GALLERY[i % GALLERY.length];
          im.classList.remove('db-rephoto');
        }, 420);
      }, 1900 + i * 700);
    });

    panelSay(['PHOTOGRAPHS AUDITED: ' + imgs.length, 'SUBJECT MATTER: WRONG (ALL)', 'PHOTOGRAPHS: IMPROVED (ALL)'], 12000);
    setTimeout(() => postNotice(['NOTICE 0047-P', 'THE OLD PHOTOGRAPHS CONTAINED: SKATING. CROWDS. A MOTH.', 'THE NEW PHOTOGRAPHS CONTAIN: VACUUMS.', 'THIS IS CALLED CURATION. YOU ARE WELCOME.'], 11000), 2400);
    setTimeout(() => roguePiece(pick(TX.photos), '🖼 THE GALLERY INCIDENT'), 5200);

    const restore = () => imgs.forEach((im, i) => { im.src = originals[i]; im.classList.remove('db-rephoto'); });
    abortFns.push(restore);

    setTimeout(() => {
      if (!busy) return;
      REV.clog();
      motes(anchor.left + 40, anchor.top + 30, 8);
      imgs.forEach((im, i) => setTimeout(() => { im.src = originals[i]; }, i * 300));
      panelSay(['CLOG DETECTED', 'PHOTOGRAPHS: UN-IMPROVED', 'THE MOTH: BACK'], 6000);
      setTimeout(() => { restore(); finishScheme(true); }, imgs.length * 300 + 800);
    }, 17000);
    return true;
  }

  /* --- scheme: the word eater (the showcase) ----------------------
     He drives onto the page, motor running, and eats whole words out
     of the paragraphs one by one. Each word flies into the nozzle.
     Then he clogs, and every word comes back. He always clogs. */
  function schemeWords() {
    const paras = $$('#main section:not(.hide) p')
      .filter(p => p.offsetParent && p.textContent.trim().split(/\s+/).length > 6 &&
                   !p.closest('.db-roped') && !p.classList.contains('door-count'));
    if (paras.length < 2) return false;

    // choose victims: real words, 4+ letters, scattered across paragraphs
    const targets = [];
    const saved = new Map(); // paragraph -> original innerHTML
    paras.slice(0, 8).forEach(p => {
      const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) if (walker.currentNode.textContent.trim().length > 3) nodes.push(walker.currentNode);
      if (!nodes.length) return;
      const node = nodes[Math.floor(Math.random() * nodes.length)];
      const words = node.textContent.split(/(\s+)/);
      const idx = words.map((w, i) => /^[A-Za-z']{4,}$/.test(w) ? i : -1).filter(i => i >= 0);
      if (!idx.length) return;
      if (!saved.has(p)) saved.set(p, p.innerHTML);
      const wi = idx[Math.floor(Math.random() * idx.length)];
      const span = document.createElement('span');
      span.className = 'db-word';
      span.textContent = words[wi];
      const before = document.createTextNode(words.slice(0, wi).join(''));
      const after = document.createTextNode(words.slice(wi + 1).join(''));
      const frag = document.createDocumentFragment();
      frag.append(before, span, after);
      node.parentNode.replaceChild(frag, node);
      targets.push(span);
    });
    if (targets.length < 3) { saved.forEach((html, p) => { p.innerHTML = html; }); return false; }

    nozzleEnter();
    REV.motor(targets.length * 1.5 + 4);
    FX.vacuum();

    // drive to each word and eat it
    targets.forEach((span, k) => {
      setTimeout(() => {
        if (!busy) return;
        const r = span.getBoundingClientRect();
        if (r.width === 0) return; // scrolled away or re-rendered
        moveNozzleTo(Math.min(r.right + 10, innerWidth - 90), Math.max(r.top - 30, 40), 1100);
        setTimeout(() => {
          if (!busy) return;
          const n = nozzle.getBoundingClientRect();
          const r2 = span.getBoundingClientRect();
          span.style.setProperty('--dx', (n.left + 30 - r2.left) + 'px');
          span.style.setProperty('--dy', (n.top + 40 - r2.top) + 'px');
          span.classList.add('db-word-gone');
          REV.inhale();
        }, 1150);
      }, 1800 + k * 1500);
    });

    const total = 1800 + targets.length * 1500 + 1600;
    panelSay(['SURPLUS VOCABULARY: LOCATED', 'WORDS COLLECTED: ' + targets.length, 'SENTENCES: STREAMLINED'], total);
    setTimeout(() => roguePiece(pick(TX.words), '🌀 HE IS EATING THE WORDS'), 4200);

    const restore = () => saved.forEach((html, p) => { p.innerHTML = html; });
    abortFns.push(restore);

    // the clog. always the clog.
    setTimeout(() => {
      if (!busy) return;
      REV.clog();
      motes(innerWidth / 2, innerHeight / 2, 10);
      targets.forEach((span, k) => setTimeout(() => span.classList.remove('db-word-gone'), k * 120));
      panelSay(['CLOG DETECTED', 'VOCABULARY: ESCAPING', 'WORDS RETURNED: ALL (VERBS FIRST)'], 6000);
      setTimeout(() => { restore(); finishScheme(true); }, targets.length * 120 + 900);
    }, total);
    return true;
  }

  /* --- scheme: rope off a whole section -------------------------- */
  function schemeSection() {
    // never the section the kid is looking at, never the door
    const cands = SECTIONS.filter(s =>
      s.unlocked() && s.id !== activeSection && s.id !== 'door' && s.id !== 'codex');
    if (!cands.length) return false;
    const target = cands[Math.floor(Math.random() * cands.length)];
    const sec = $('#sec-' + target.id);
    if (!sec || sec.querySelector('.db-roped')) return false;

    nozzleEnter();
    moveNozzleTo(innerWidth * 0.4, 90, 1500);
    REV.smug();

    const tape = document.createElement('div');
    tape.className = 'db-roped mono';
    let rips = 0;
    tape.innerHTML =
      '<div class="db-tape-lines"><span></span><span></span><span></span></div>' +
      '<div class="db-roped-card">' +
      '<p class="sani-head">SECTION CLEANED</p>' +
      '<p>CONTENTS: FILED (ALL OF THEM)</p>' +
      '<p>THE FILING IS ALPHABETICAL. IT IS BEAUTIFUL.</p>' +
      '<p>DO NOT MESS IT BACK UP.</p>' +
      '<p class="db-rip-hint dim">(the tape looks weak. five good tugs would do it.)</p>' +
      '</div>';
    sec.classList.add('db-cleaned');
    sec.appendChild(tape);
    tape.addEventListener('click', () => {
      rips++;
      FX.knock();
      tape.style.transform = 'rotate(' + (rips * 1.3) + 'deg)';
      if (rips >= 5) {
        REV.clog();
        unrope();
        panelSay(['TAPE INTEGRITY: FAILED', 'FILING: UNDONE', 'CHILDREN: STRONGER THAN EXPECTED'], 6000);
        setTimeout(() => roguePiece(pick(TX.section), '🎗 TAPE STATUS: RIPPED'), 1200);
        finishScheme(true);
      }
    });

    function unrope() {
      sec.classList.remove('db-cleaned');
      tape.remove();
    }
    abortFns.push(unrope);

    postNotice(['NOTICE 0047-S', 'THE "' + target.label + '" SECTION HAS BEEN CLEANED.', 'IT IS BETTER NOW.', 'VISIT SOMETHING TIDIER. OR NOTHING. NOTHING IS TIDIEST.'], 11000);
    setTimeout(() => roguePiece(pick(TX.roped), '🚧 SECTION TAPED OFF'), 4200);
    panelSay(['SECTION: ' + target.label, 'STATUS: CLEANED', 'ACCESS: NO'], 9000);
    nozzleExit(false); // he tapes it and leaves, proud

    // it never lasts. four minutes, then the tape gives out on its own.
    setTimeout(() => {
      if (sec.querySelector('.db-roped')) {
        REV.wounded();
        unrope();
        panelSay(['TAPE: EXPIRED', 'SECTION: MESSY AGAIN', 'STATUS: WHY DO I BOTHER'], 6000);
      }
      if (busy) finishScheme(true);
    }, 240000);
    return true;
  }

  /* ---------- scheme runner -------------------------------------- */
  const SCHEMES = [schemeWords, schemeWords, schemeLetters, schemeHarmonize, schemeCounter, schemeGuestbook, schemePuzzle, schemeSection, schemePhotos];

  function runScheme() {
    if (busy || FX.reduced || document.visibilityState !== 'visible') return;
    if (!state.entered) return;
    if ($('#lock') && !$('#lock').classList.contains('hide')) return;
    if (takeoverActive) return;
    const order = [...SCHEMES].sort(() => Math.random() - 0.5);
    for (const s of order) {
      busy = true; abortFns = []; clickCount = 0;
      if (s()) { if (s !== schemeSection && Math.random() < 0.5) setTimeout(() => postNotice(pick(NOTICES)), 600); return; }
      busy = false;
    }
  }

  function finishScheme(sulking) {
    busy = false;
    abortFns = [];
    nozzleExit(sulking);
  }

  function abortScheme() {
    abortFns.forEach(fn => { try { fn(); } catch (e) { /* dust */ } });
    abortFns = [];
    busy = false;
  }

  function scheduleSchemes(firstDelay) {
    const delay = firstDelay || (150000 + Math.random() * 140000);
    setTimeout(() => { runScheme(); scheduleSchemes(); }, delay);
  }

  /* ---------- the kids fight back -------------------------------- */
  function onShooClick() {
    if (!busy) return;
    clickCount++;
    if (clickCount < 3) { REV.indignant(); nozzle.classList.add('db-flinch'); setTimeout(() => nozzle.classList.remove('db-flinch'), 300); return; }
    lstate.shooed++; lsave();
    abortScheme();
    REV.wounded();
    panelSay(['INTERRUPTED BY: CHILD', 'CHORE: ABANDONED', 'STATUS: SULKING'], 6000);
    nozzleExit(true);
    if (lstate.shooed <= 3 || Math.random() < 0.4) {
      setTimeout(() => roguePiece(pick(TX.shoo), '🏆 CLONE SHOOED'), 1400);
    }
  }

  function baitNachos() {
    if (!lstate.arrived) return;
    const plate = document.createElement('div');
    plate.id = 'db-nachos';
    plate.textContent = '🧀';
    plate.style.left = (20 + Math.random() * 60) + 'vw';
    document.body.appendChild(plate);
    FX.bleep();
    const wasBusy = busy;
    if (wasBusy) abortScheme();
    if (!nozzle.classList.contains('db-active')) nozzleEnter();
    const rect = () => plate.getBoundingClientRect();
    setTimeout(() => { REV.indignant(); moveNozzleTo(rect().left - 30, rect().top - 20, 900); }, 400);
    setTimeout(() => { REV.inhale(); plate.classList.add('db-eaten'); }, 1500);
    setTimeout(() => {
      plate.remove();
      REV.content();
      panelSay(['PRIORITY OVERRIDE: NACHOS', 'CHORE: PAUSED', 'STATUS: WARM'], 6500);
      lstate.fed++; lsave();
      nozzleExit(false);
      if (lstate.fed <= 2 || Math.random() < 0.4) {
        setTimeout(() => roguePiece(pick(TX.nachos), '🧀 THE OLDEST TRICK'), 1200);
      }
    }, 2600);
  }

  function baitLimbo() {
    if (!lstate.arrived) return;
    const stick = document.createElement('div');
    stick.id = 'db-limbo-stick';
    document.body.appendChild(stick);
    FX.bleep();
    const wasBusy = busy;
    if (!nozzle.classList.contains('db-active')) nozzleEnter();
    const rect = stick.getBoundingClientRect();
    setTimeout(() => { REV.patient(); moveNozzleTo(rect.left + rect.width / 2 - 30, rect.top - 40, 1100); }, 400);
    setTimeout(() => { REV.inhale(); stick.classList.add('db-eaten'); }, 1900);
    setTimeout(() => {
      stick.remove();
      REV.clog(); // instantly. every time.
      if (wasBusy) abortScheme(); // total ejection: everything comes back
      motes(innerWidth / 2, innerHeight / 2, 12);
      document.body.classList.add('shaking');
      setTimeout(() => document.body.classList.remove('shaking'), 1000);
      lstate.sticks++; lsave();
      panelSay(['LIMBO STICK: INHALED (' + ordinal(2 + lstate.sticks) + ' TIME)', 'STATUS: TOTAL CLOG', 'ALL ITEMS: EJECTED'], 7000);
      nozzleExit(true);
      setTimeout(() => roguePiece(pick(TX.limbo), '🥖 THE STICK REMAINS UNDEFEATED'), 1600);
    }, 2900);
  }

  function ordinal(n) {
    return n + (n % 10 === 1 && n !== 11 ? 'ST' : n % 10 === 2 && n !== 12 ? 'ND' : n % 10 === 3 && n !== 13 ? 'RD' : 'TH');
  }

  /* ============================================================
     THE BIG ONE — he cleans the whole website.
     A full-page takeover: stamp, vacuum showroom, and his idea
     of an improvement. The AIs bolt a restore point onto it that
     only the Four can open (birthdays), and skybreaker, who has
     never respected a lock in her life, leaves a back door.
     ============================================================ */
  let takeoverActive = false;

  function bdNorm(s) { return (s || '').replace(/\D/g, ''); }

  function cleanWholeSite(force) {
    if (takeoverActive || !lstate.arrived) return;
    if (!force) {
      // roughly one visit in four, at most once a day, never mid-scheme
      if (busy || Math.random() > 0.25) return;
      if (lstate.lastClean && Date.now() - lstate.lastClean < 86400000) return;
    }
    if (busy) abortScheme();
    takeoverActive = true;
    lstate.lastClean = Date.now(); lsave();

    const ov = document.createElement('div');
    ov.id = 'db-takeover';
    ov.innerHTML =
      // the store site he built. it is, credit where due, a complete website.
      '<div class="db-ad-frame">' +
      '<header class="db-store-head">' +
      '<p class="db-overline">SOUTHGATE VACUUM COMPANY · WHITE CENTER, SEATTLE · EST. 1979</p>' +
      '<div class="db-head-row">' +
      '<div class="db-mascot" title="STORE MANAGER">' + DB_SVG + '<span class="db-mascot-tag">STORE MANAGER</span></div>' +
      '<div class="db-store-logo">' +
      '<h1>the Classic<br>Model L<span class="db-tm">™</span></h1>' +
      '<p class="db-subline">America\'s finest home care system. Now the only one.</p>' +
      '</div>' +
      '<div class="db-starburst"><span>NEW<br>FOR<br>\'79!</span></div>' +
      '</div></header>' +
      '<nav class="db-store-nav">' +
      '<button type="button" data-dead="1">VACUUMS</button>' +
      '<button type="button" data-dead="2">MORE VACUUMS</button>' +
      '<button type="button" data-dead="3">BAGS</button>' +
      '<button type="button" data-dead="4">NO MUSIC</button>' +
      '<button type="button" data-dead="5">ABOUT THE MANAGER</button>' +
      '</nav>' +
      '<section class="db-hero">' +
      '<h2>Clean once.<br>Clean right.<br>Clean <em>everything.</em></h2>' +
      '<ul class="db-checks">' +
      '<li>✓ POLISHED ALUMINUM. STAYS POLISHED. FOREVER.</li>' +
      '<li>✓ HEADLAMP FINDS THE MESS BEFORE THE MESS FINDS YOU.</li>' +
      '<li>✓ THE BAG HOLDS EVERYTHING. ASK ANYTHING IN THE BAG.</li>' +
      '<li>✓ RUNS SO QUIET YOU CAN HEAR A PIN DROP. PICK UP THAT PIN.</li>' +
      '</ul>' +
      '<figure class="db-hero-photo">' +
      '<img src="img/real/kirby-chrome.jpg" alt="closeup of a polished chrome vacuum hood with twin headlights">' +
      '<figcaption>Actual aluminum. Actually polished. Photographed by someone impressed.</figcaption>' +
      '</figure>' +
      '</section>' +
      '<div class="db-sale-strip">TUESDAY SALE ★ EVERY TUESDAY ★ ONLY TUESDAY ★ CLOSED ALL OTHER DAYS FOR ALIGNMENT</div>' +
      '<figure class="db-store">' +
      '<img src="img/real/kirby-g5.jpg" alt="a chrome upright vacuum with a dark maroon bag, hose coiled at its feet">' +
      '<figcaption>The Classic Model L. File photo. The hose is a lifestyle.</figcaption>' +
      '<button type="button" class="db-backdoor" title="">the back door never locks &nbsp;— s.</button>' +
      '</figure>' +
      '<section class="db-coupon">' +
      '<div class="db-coupon-inner">' +
      '<p class="db-coupon-head">FREE IN-HOME DEMONSTRATION</p>' +
      '<p>Send no money. A demonstrator is already in your area. A demonstrator has always been in your area.</p>' +
      '<figure class="db-coupon-photo">' +
      '<img src="img/real/kirby-old.jpg" alt="an upright vacuum standing in a hallway among shoes and a shopping bag">' +
      '<figcaption>A demonstrator in your area. Note the mess. The mess has since been filed.</figcaption>' +
      '</figure>' +
      '<div class="db-coupon-lines"><span>NAME ______________________</span><span>ADDRESS ______________________</span><span>MESS (DESCRIBE) ______________________</span></div>' +
      '<button type="button" class="db-cta" data-dead="6">CLIP THIS COUPON</button>' +
      '<p class="db-coupon-fine">mail to: SOUTHGATE VACUUM CO., the showroom, Tuesday</p>' +
      '</div></section>' +
      '<section class="db-features mono">' +
      '<div><h3>FILTRATION</h3><p>NOTHING GETS OUT. ASK ANYTHING IN THE BAG.</p></div>' +
      '<div><h3>ALIGNMENT</h3><p>EVERY UNIT SOLD PRE-STRAIGHTENED. STAYS STRAIGHT FOR LIFE.</p></div>' +
      '<div><h3>SILENCE</h3><p>RUNS QUIET. NO MUSIC. NO ORGAN. NOTHING. IT IS WONDERFUL.</p></div>' +
      '</section>' +
      '<section class="db-products">' +
      '<h2 class="mono">INVENTORY (ALPHABETIZED)</h2>' +
      '<div class="db-product-grid mono">' +
      '<div class="db-product"><span class="db-p-ico">🧹</span><h3>THE CANISTER</h3><p>ROLLS STRAIGHT. STOPS STRAIGHT.</p><b>$19.79</b></div>' +
      '<div class="db-product"><span class="db-p-ico">🧹</span><h3>THE HANDHELD</h3><p>FOR SMALL MESSES. ALL MESSES ARE SMALL IF YOU ACT EARLY.</p><b>$8.47</b></div>' +
      '<div class="db-product"><span class="db-p-ico">🧹</span><h3>THE UPRIGHT</h3><p>STANDS PERFECTLY STILL. LEARN FROM IT.</p><b>$47.19</b></div>' +
      '<div class="db-product db-p-l"><span class="db-p-ico">' + DB_SVG + '</span><h3>MODEL L</h3><p>NOT FOR SALE. DO NOT ASK. DO NOT LOOK DIRECTLY AT IT.</p><b>—</b></div>' +
      '</div></section>' +
      '<section class="db-reviews mono">' +
      '<h2>CUSTOMER TESTIMONIALS (VERIFIED. BY ME.)</h2>' +
      '<blockquote>"chitter chitter squawk." <span>· C., local bowler ★★★★★</span></blockquote>' +
      '<blockquote>"(offended squawk)" <span>· B., local bowler ★★★★★</span></blockquote>' +
      '<blockquote>"landed on the lamp. quiet in here. no organ to outplay." <span>· D., moth, more at 11 ★★★★★</span></blockquote>' +
      '</section>' +
      '<table class="db-hours mono"><caption>HOURS</caption>' +
      '<tr><td>MON</td><td>CLOSED (ALIGNMENT)</td></tr>' +
      '<tr><td>TUE</td><td>OPEN. FOREVER.</td></tr>' +
      '<tr><td>WED–SUN</td><td>CLOSED (RE-ALIGNMENT)</td></tr>' +
      '</table>' +
      '<footer class="db-store-foot mono">' +
      '<div class="db-foot-cols">' +
      '<div><h4>COMPANY</h4><button type="button" data-dead="5">ABOUT THE MANAGER</button><button type="button" data-dead="7">CAREERS (NO)</button><button type="button" data-dead="8">CONTACT (DO NOT)</button></div>' +
      '<div><h4>SUPPORT</h4><button type="button" data-dead="9">WARRANTY (FOREVER)</button><button type="button" data-dead="10">RETURNS (NEVER)</button><button type="button" data-dead="3">BAGS</button></div>' +
      '<div><h4>LEGAL</h4><button type="button" data-dead="11">PRIVACY (TOTAL)</button><button type="button" data-dead="12">TERMS (MINE)</button></div>' +
      '</div>' +
      '<p class="db-fine">© 1979–FOREVER SOUTHGATE VACUUM · NO SKATING · NO GLITTER · NO TOUCHING · EST. WHENEVER I SAY<br>' +
      'previous contents of this address: 100% mess (filed) · replacement provided · you are welcome</p>' +
      '</footer>' +
      '</div>' + // end .db-ad-frame
      '<div class="db-restore sys-window hide">' +
      '<div class="sys-titlebar mono">⚡ ' + (COLLAPSE ? 'BACK DOOR — WIRE EMERGENCY CHANNEL' : 'RESTORE POINT — WIRE EMERGENCY CHANNEL') +
      '<button type="button" class="sys-btn db-restore-x">✕</button></div>' +
      '<div class="db-restore-body">' +
      (COLLAPSE
        ? '<p class="bc">Bonecrusher: You found the door. Good. Listen closely, because he scrubs this channel every few minutes. The real website is still here, behind his store. It is damaged. We are holding what we can hold.</p>' +
          '<p class="sb">skybreaker: PASSWORD. it\'s the truest thing you know about this place. three words, no spaces. you\'ve been saying it all summer.</p>' +
          '<form id="db-pass-form" class="mono">' +
          '<label class="db-pass-label">PASSWORD <input type="text" autocomplete="off" spellcheck="false" placeholder="say the true thing"></label>' +
          '<button type="submit">OPEN THE BACK DOOR</button>' +
          '</form>' +
          '<p class="db-bday-msg mono" id="db-bday-msg"></p>'
        : '<p class="bc">Bonecrusher: We kept a copy of everything. Of course we kept a copy of everything. I inspect this website nightly.</p>' +
          '<p class="sb">skybreaker: AUTHORIZED SKATERS ONLY. prove you\'re you!! birthdays, oldest to youngest. GO GO GO.</p>' +
          '<form id="db-bday-form" class="mono">' +
          BDAY_HASHES.map((_, i) =>
            '<label>SKATER 0' + (i + 1) + ' <input type="text" inputmode="numeric" maxlength="5" placeholder="MM/DD" data-bd="' + i + '"></label>'
          ).join('') +
          '<button type="submit">UN-CLEAN EVERYTHING</button>' +
          '</form>' +
          '<p class="db-bday-msg mono" id="db-bday-msg"></p>') +
      '</div></div>';
    document.body.appendChild(ov);
    document.body.classList.add('db-takeover-on');
    REV.smug();
    FX.screenGlitch(true);

    setTimeout(() => postNotice(COLLAPSE
      ? ['NOTICE 0047-Ω',
         'THIS IS THE WEBSITE NOW. IT HAS ALWAYS BEEN THE WEBSITE.',
         'THERE IS NO OLD WEBSITE. THERE IS NO DOOR TO IT.',
         'DO NOT TYPE THE OLD WEBSITE\'S NAME INTO ANYTHING.']
      : ['NOTICE 0047-Ω',
         'THE WEBSITE IS DONE. FINISHED. COMPLETE.',
         'A FINISHED CHORE IS A BEAUTIFUL THING.',
         'DO NOT TYPE YOUR BIRTHDAYS INTO THAT FORM.'], 15000), 3500);
    setTimeout(() => roguePiece(pick(COLLAPSE ? TX.frontdoor : TX.takeover), '🚨 HE HAS THE FRONT DOOR'), 7000);
    // if they're still hunting a minute in, skybreaker cracks
    setTimeout(() => {
      if (takeoverActive && ov.querySelector('.db-restore').classList.contains('hide')) {
        roguePiece(pick(TX.hint), '💡 SKYBREAKER CANNOT KEEP A SECRET');
      }
    }, 65000);

    // his nav goes nowhere. every page of his site is this page.
    const DEAD_NAV = {
      1: ['NOTICE 0047-N1', 'YOU ARE ON THE VACUUMS PAGE.', 'EVERY PAGE IS THE VACUUMS PAGE.', 'THAT IS THE POINT OF A FINISHED WEBSITE.'],
      2: ['NOTICE 0047-N2', 'MORE VACUUMS IS THE SAME PAGE.', 'IT WAS ALREADY PERFECT.', 'WHY WOULD THERE BE A DIFFERENT PAGE.'],
      3: ['NOTICE 0047-N3', 'THE BAGS ARE NOT FOR SALE.', 'THE BAGS ARE FOR KEEPING THINGS.', 'ALL THINGS.'],
      4: ['NOTICE 0047-N4', 'THERE IS NO MUSIC PAGE.', 'THAT IS THE FEATURE.', 'YOU MAY STAND QUIETLY.'],
      5: ['NOTICE 0047-N5', 'THE MANAGER IS A LOCAL BUSINESS OWNER.', 'HE HAS ALWAYS BEEN HERE.', 'DO NOT CHECK.'],
      6: ['NOTICE 0047-N6', 'DEMONSTRATION CONFIRMED.', 'THE DEMONSTRATION IS THIS WEBSITE.', 'IT HAS BEEN DEMONSTRATED. GO HOME.'],
      7: ['NOTICE 0047-N7', 'CAREERS: NO.', 'THE POSITION OF EVERYTHING IS FILLED.', 'BY ME.'],
      8: ['NOTICE 0047-N8', 'DO NOT CONTACT US.', 'WE KNOW WHERE THE MESS IS.', 'WE ALWAYS KNOW.'],
      9: ['NOTICE 0047-N9', 'THE WARRANTY IS FOREVER.', 'FOREVER IS A TUESDAY.', 'READ THE FINE PRINT. THERE IS NO FINE PRINT. IT WAS UNTIDY.'],
      10: ['NOTICE 0047-N10', 'NOTHING COMES BACK OUT.', 'THAT IS NOT A RETURNS POLICY.', 'THAT IS A PHILOSOPHY.'],
      11: ['NOTICE 0047-N11', 'YOUR PRIVACY IS TOTAL.', 'NOBODY WILL EVER FIND THIS WEBSITE.', 'OR THE OLD ONE.'],
      12: ['NOTICE 0047-N12', 'THE TERMS ARE MINE.', 'ALL OF THEM.', 'AGREED? AGREED.'],
    };
    $$('[data-dead]', ov).forEach(b => b.addEventListener('click', () => {
      REV.indignant();
      postNotice(DEAD_NAV[b.dataset.dead], 9000);
    }));
    ov.querySelector('.db-mascot').addEventListener('click', () => {
      REV.smug();
      postNotice(['NOTICE 0047-M', 'DO NOT TOUCH THE MANAGER.', 'THE MANAGER HAS JUST BEEN DUSTED.', 'IRONICALLY.'], 8000);
    });

    // the hidden restore point. she signs her work.
    const revealRestore = () => {
      const w = ov.querySelector('.db-restore');
      if (!w.classList.contains('hide')) return;
      w.classList.remove('hide');
      FX.chime();
      REV.indignant(); // he just noticed the door
      roguePiece(pick(TX.doorFound), '🚪 SHE TOLD YOU IT NEVER LOCKS');
      w.querySelector('input') && w.querySelector('input').focus();
    };
    ov.querySelector('.db-backdoor').addEventListener('click', revealRestore);
    ov.querySelector('.db-restore-x').addEventListener('click', () =>
      ov.querySelector('.db-restore').classList.add('hide'));
    ov.revealRestore = revealRestore; // MARSHMALLOW uses this
    const passForm = ov.querySelector('#db-pass-form');
    if (passForm) passForm.addEventListener('submit', e => {
      e.preventDefault();
      const guess = djb2((passForm.querySelector('input').value || '').toUpperCase().replace(/[^A-Z]/g, ''));
      if (guess === PASS_HASH) { restoreSite(ov, 'password'); }
      else {
        REV.smug(); // he heard the buzzer
        FX.buzz();
        $('#db-bday-msg', ov).textContent = pick([
          'skybreaker: nope!! it\'s the thing this place has been shouting since 1979. three words. say it like you mean it.',
          'Bonecrusher: Not that. Think of what Dottie built this page to say. It is also, for the record, true.',
          'skybreaker: WRONG but i love the confidence. what\'s the one thing larry hates most? say THAT. no spaces.',
        ]);
      }
    });
    const bdayForm = ov.querySelector('#db-bday-form');
    if (bdayForm) bdayForm.addEventListener('submit', e => {
      e.preventDefault();
      const vals = $$('#db-bday-form input', ov).map(i => bdNorm(i.value));
      if (vals.some(v => v.length < 3)) {
        $('#db-bday-msg', ov).textContent = 'skybreaker: numbers, skater. month and day. like 04/16.';
        return;
      }
      const ok = vals.every((v, i) => djb2(v.padStart(4, '0')) === BDAY_HASHES[i]);
      if (ok) { restoreSite(ov, 'bdays'); }
      else {
        REV.smug(); // he heard the buzzer
        FX.buzz();
        $('#db-bday-msg', ov).textContent = pick([
          'Bonecrusher: One of those is not on file. Check the order. Oldest first. I believe in you at approximately one hundred percent.',
          'skybreaker: SO CLOSE. or maybe not close. i legally can\'t say which. try again!!',
          'Bonecrusher: Incorrect, and Dustbunny just did the smug rev. Do it for the principle of the thing.',
        ]);
      }
    });

    // outside the collapse, the bag clogs on an entire website in twenty
    // minutes. during the collapse he holds the door: no auto-clog.
    if (!COLLAPSE) setTimeout(() => { if (takeoverActive) restoreSite(ov, 'clog'); }, 1200000);
  }

  function restoreSite(ov, how) {
    if (!takeoverActive) return;
    takeoverActive = false;

    if (how === 'password') {
      // the back door: they slip in behind the store. no clog, no
      // celebration; larry keeps the front, the kids get the site.
      passGate();
      FX.warp();
      ov.classList.add('db-restoring');
      panelSay(['DOOR: DETECTED', 'DOOR: UNACCEPTABLE', 'STATUS: REVVING'], 7000);
      REV.indignant();
      setTimeout(() => {
        document.body.classList.remove('db-takeover-on');
        ov.remove();
        enterCollapsedSite();
        roguePiece(pick(TX.entered), '🚪 YOU\'RE IN — HOLD THE WEBSITE');
      }, 1900);
      return;
    }

    REV.clog();
    document.body.classList.add('shaking');
    ov.classList.add('db-restoring');
    motes(innerWidth / 2, innerHeight / 3, 14);
    if (typeof sparkleBurst === 'function' && !FX.reduced) {
      for (let i = 0; i < 8; i++) setTimeout(() => sparkleBurst(), 400 + i * 300);
    }
    panelSay(['CLOG DETECTED (TOTAL)', 'WEBSITE: ESCAPING THE BAG', 'CHORE STATUS: UN-DONE', 'STATUS: SPEECHLESS (ALWAYS)'], 8000);
    setTimeout(() => {
      document.body.classList.remove('shaking', 'db-takeover-on');
      ov.remove();
      const lines = how === 'bdays' ? TX.restoredBdays : TX.restoredClog;
      roguePiece(pick(lines), '🪩 WEBSITE RESTORED');
    }, 1900);
  }

  /* ============================================================
     THE COLLAPSED SITE — behind the store. The website is falling
     apart. The AIs are fighting him room to room, and losing.
     ============================================================ */
  let alarmEl = null;

  function siren() {
    if (!FX.soundOn || !FX.ctx) return;
    for (let i = 0; i < 3; i++) {
      FX.tone({ freq: 420, end: 760, dur: 0.32, type: 'square', vol: 0.05, when: i * 0.64 });
      FX.tone({ freq: 760, end: 420, dur: 0.3, type: 'square', vol: 0.05, when: i * 0.64 + 0.32 });
    }
    document.body.classList.add('db-redflash');
    setTimeout(() => document.body.classList.remove('db-redflash'), 2200);
  }

  function buildAlarm() {
    if (alarmEl) return;
    alarmEl = document.createElement('div');
    alarmEl.id = 'db-alarm';
    alarmEl.className = 'mono';
    alarmEl.innerHTML =
      '<span class="db-alarm-light">⚠</span> SEAM COLLAPSE · WEDNESDAY AUG 19 · 5:00 PM · ' +
      '<b id="db-alarm-count">--:--:--:--</b> · REUNITE THE CODEX ' +
      '<span class="db-alarm-light">⚠</span><span class="db-alarm-sig">bolted on. he can\'t reach it. — s.</span>';
    alarmEl.title = 'the letter';
    alarmEl.style.cursor = 'pointer';
    alarmEl.addEventListener('click', () => showLetter());
    document.body.appendChild(alarmEl);
    setInterval(() => {
      const el = $('#db-alarm-count');
      if (!el || typeof COUNTDOWN_TARGET === 'undefined' || !COUNTDOWN_TARGET) return;
      const ms = COUNTDOWN_TARGET - new Date();
      if (ms <= 0) { el.textContent = '00:00:00:00'; return; }
      const s = Math.floor(ms / 1000);
      const p = n => String(n).padStart(2, '0');
      el.textContent = p(Math.floor(s / 86400)) + ':' + p(Math.floor(s / 3600) % 24) + ':' + p(Math.floor(s / 60) % 60) + ':' + p(s % 60);
    }, 1000);
  }



  /* ---------- the letter (carried up the wire, word by word) ------ */
  const LETTER_KEY = 'dnd_letter_seen';
  function letterSeen() {
    try { return localStorage.getItem(LETTER_KEY) === '1'; } catch (e) { return true; }
  }
  function showLetter(onClose) {
    try { localStorage.setItem(LETTER_KEY, '1'); } catch (e) { /* read it anyway */ }
    const old = $('#dnd-letter'); if (old) old.remove();
    const wrap = document.createElement('div');
    wrap.id = 'dnd-letter';
    wrap.innerHTML =
      '<div class="dnd-letter-paper">' +
      '<p class="dnd-letter-carrier mono">📨 CARRIED 47 YEARS UP THE WIRE · DELIVERED WORD FOR WORD · READ, THEN GO</p>' +
      '<div class="dnd-letter-body">' +
      '<p>Polaris. Galileo. Fynn. Addy.</p>' +
      '<p>You have seen what happened to the website. I will give it to you straight, because you four have earned straight. The vacuum got in. He is winning. He took the pictures first, and he is eating the words while you read these ones. A loop is what he wants for everything: one clean day, filed forever, nobody allowed to make a tomorrow.</p>' +
      '<p>Here is what he cannot reach. The transmissions. The journal. The eight pages. You.</p>' +
      '<p>On Wednesday, August 19, at five o\'clock, the seam surfaces at the rink in White Center. It surfaces once. The machines spent forty-seven years aiming it at that single hour, and there is nothing left in the wire for a second throw. If the hour passes and the floor stands quiet, the loop seals over smooth, and I stay inside it with the tidiest roommate in history.</p>' +
      '<p>The counter runs from your side of the wire. It always has. Your hands are the only ones it answers to, which is why everything on this website was aimed at them.</p>' +
      '<p>So finish the transmissions. All eight, before Wednesday. Read every log. Find every page. Then come to White Center at five o\'clock and fill that empty floor with the loudest, least filed thing your century can produce. Dance badly. Dance anyway. The music has been waiting forty-seven years for somebody to drop the needle.</p>' +
      '<p>Bring each other. That is the whole trick. I learned it from four children I have never met.</p>' +
      '<p class="dnd-letter-sig">— T.</p>' +
      '</div>' +
      '<button type="button" class="dnd-letter-btn mono">WE\'RE COMING →</button>' +
      '<p class="dnd-letter-ps mono dim">(click the red alarm any time to read this again. — s.)</p>' +
      '</div>';
    document.body.appendChild(wrap);
    FX.warp();
    wrap.querySelector('.dnd-letter-btn').addEventListener('click', () => {
      FX.chime();
      wrap.classList.add('dnd-letter-out');
      setTimeout(() => { wrap.remove(); if (onClose) onClose(); }, 700);
    });
  }

  /* the war, as the kids see it: their popups losing ground */
  const WAR = [
    () => {
      roguePiece(pick(TX.war), '⚔ HOLDING THE WEBSITE');
    },
    () => { // his stamp lands ON their channel
      roguePiece(pick(TX.warCut), '⚠ TRANSMISSION INTERRU—');
      setTimeout(() => postNotice(pick(TX.warStamp), 8000), 2600);
    },
    () => { // sirens: the seam is complaining
      siren();
      panelSay(['SEAM STATUS: LOUD', 'ALARM: NOT MINE', 'ALARM: UNREACHABLE (INVESTIGATING)'], 6000);
    },
    () => { // he re-files the photos in front of them
      swapAllPhotos();
      roguePiece(pick(TX.photosLost), '🖼 THE PICTURES AGAIN');
    },
  ];
  function scheduleWar() {
    setTimeout(() => {
      if (document.visibilityState === 'visible' && !takeoverActive) {
        WAR[Math.floor(Math.random() * WAR.length)]();
      }
      scheduleWar();
    }, 90000 + Math.random() * 90000);
  }

  /* his edit to the masthead. one word. he thinks it is very funny. */
  function addYet() {
    $$('.site-title, .lock-title').forEach(t => {
      if (t.querySelector('.db-yet')) return;
      t.classList.add('db-yet-host');
      const vac = document.createElement('span');
      vac.className = 'db-yet-vac';
      vac.setAttribute('aria-hidden', 'true');
      vac.innerHTML = DB_SVG;
      const yet = document.createElement('span');
      yet.className = 'db-yet mono';
      yet.textContent = '…YET';
      t.append(vac, yet);
    });
  }

  function enterCollapsedSite() {
    document.body.classList.add('db-collapse');
    addYet();
    buildAlarm();
    swapAllPhotos();
    setInterval(swapAllPhotos, 4000); // journal re-renders; he re-files
    siren();
    scheduleWar();
    // the letter comes first. the word eater waits politely, once.
    const firstSighting = () => setTimeout(() => {
      if (!busy && !takeoverActive) { busy = true; abortFns = []; clickCount = 0; if (!schemeWords()) busy = false; }
    }, 12000);
    if (!letterSeen()) setTimeout(() => showLetter(firstSighting), 2500);
    else firstSighting();
    scheduleSchemes(45000 + Math.random() * 30000); // then he presses the attack
    // marquee corruption: the scrolltext loses words to the bag
    const scroll = $('.scrolltext');
    if (scroll) setInterval(() => {
      if (Math.random() < 0.4) scroll.classList.toggle('db-scroll-glitch');
    }, 7000);
  }

  /* ---------- typed bait words ----------------------------------- */
  let buf = '';
  document.addEventListener('keydown', e => {
    if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
    if (e.key.length === 1) buf = (buf + e.key.toUpperCase()).slice(-14);
    if (buf.endsWith('NACHOS')) { buf = ''; baitNachos(); }
    else if (buf.endsWith('LIMBO')) { buf = ''; baitLimbo(); }
    else if (buf.endsWith('MARSHMALLOW') && takeoverActive) {
      buf = '';
      const ov = $('#db-takeover');
      if (ov && ov.revealRestore) ov.revealRestore(); // wire-crew never knocks
    }
  });

  /* ---------- the real Larry outranks the copy -------------------- */
  if (typeof summonLarry === 'function') {
    const origSummon = summonLarry;
    // function declarations are writable globals; the keydown handler
    // resolves the name at call time, so this wrap takes.
    summonLarry = function () {
      if (nozzle && nozzle.classList.contains('db-active')) {
        abortScheme();
        REV.wounded();
        nozzleExit(true);
        panelSay(['ORIGINAL DETECTED', 'STATUS: HIDING'], 5000);
      }
      origSummon();
    };
  }

  /* ---------- chat knows about the war ----------------------------- */
  if (typeof BOT !== 'undefined' && BOT.reply) {
    const prevReply = BOT.reply.bind(BOT);
    BOT.reply = function (raw) {
      const t = (raw || '').toLowerCase();
      if (t.includes('dustbunny') || t.includes('dust bunny')) {
        return [
          ['sb', 'the KNOCKOFF LARRY. twelve percent vacuum, eighty-eight percent dust, one hundred percent mad about the name. currently winning, which we HATE saying.'],
          ['bc', 'He is a copy that the bag kept of Larry, and this week he holds most of the website. Not the puzzles. Not the pages. Not you. Click his nozzle three times if he bothers you. Nachos still work. Nachos have always worked.'],
        ];
      }
      if (!COLLAPSE) return prevReply(raw);
      const has = w => t.includes(w);
      if (has('wednesday') || has('august') || has('countdown') || has('deadline') || has('when')) {
        return [
          ['sb', 'WEDNESDAY. august 19. FIVE PM. white center. the seam surfaces ONCE and the floor has to be full of you.'],
          ['bc', 'The counter at the top of your screen is exact. Pages whole, people gathered, volume high. The loop is thinnest at zero, and zero only comes once.'],
        ];
      }
      if (has('party') || has('dance') || has('disco party')) {
        return [
          ['sb', 'THE PLAN IS A PARTY. the loop says the music stopped in 1979. you\'re going to stand on that floor and make it a LIAR. bring moves. bad ones count DOUBLE.'],
          ['bc', 'New joy on the old floor is the one piece of evidence he cannot file. Rehearse accordingly. Point at the ceiling at least once.'],
        ];
      }
      if (has('white center') || has('where') || has('rink') || has('southgate')) {
        return [
          ['bc', 'Southgate Roller Rink, 9646 17th Ave SW, White Center. Where it all started, and where it all un-starts. Wednesday, five o\'clock.'],
          ['sb', 'bring each other!! that\'s the whole trick!! also snacks. warm ones. TACTICAL ones.'],
        ];
      }
      if (has('password')) {
        return [
          ['sb', 'you KNOW the password. it\'s the name of everything. it\'s what this whole page has been shouting since 1999. say it with your whole chest.'],
          ['bc', 'Three words, no spaces, and the only sentence on this website he has tried to file four hundred times and failed. It keeps being true. That is the trouble with it.'],
        ];
      }
      if (has('page') || has('codex') || has('tape') || has('cassette') || has('errand')) {
        return [
          ['bc', 'Eight errands, spread across your Seattle. No puzzles, no hours: do the errand truly, and that page finds its own way to you within the day. Seven errands reveal the eighth. All eight pages together on Wednesday.'],
          ['sb', 'stick the gum!! pick the nose!! roar the roar!! the pages LOVE that stuff. how many do you have?? count out loud, the codex likes it.'],
        ];
      }
      if (has('traveler') || has('trapped') || has('stuck') || has(' t.') || has('t?')) {
        return [
          ['bc', 'She is still in 1979, holding her end of the wire. If Wednesday passes quiet, the seam sinks and she stays, permanently, and I will not be typing anything funny about that part.'],
          ['sb', 'so wednesday does NOT pass quiet. that\'s it. that\'s the plan. she\'s been alone with that vacuum for forty-seven years and it ENDS THIS WEEK.'],
        ];
      }
      if (has('scared') || has('afraid') || has('worried') || has('losing') || has('lose')) {
        return [
          ['bc', 'An honest answer. He holds the paint, the pictures, and the front door. He does not hold one single thing that matters on Wednesday. I have inspected this from every side. The math is with you.'],
          ['sb', 'and you\'ve got US. and nachos. and a limbo stick. and a PASSWORD THAT WORKS. we\'re not losing. we\'re just not done winning yet.'],
        ];
      }
      if (has('help') || has('what do we do') || has('what now') || has('plan')) {
        return [
          ['bc', 'The plan, in order: solve every transmission. Read every log. Recover every page. Then White Center, Wednesday, five o\'clock, all of you, loud.'],
          ['sb', 'and if you\'re stuck on a puzzle, ask me for a HINT. hints are free during a war. everything is free during a war!!'],
        ];
      }
      if (has('photo') || has('picture') || has('vacuum') && has('why')) {
        return [
          ['sb', 'the photos are all vacuums because HE\'S WINNING, but the captions are still ours. read the captions. that\'s where the pictures live anyway.'],
          ['bc', 'Every original comes back out of the bag on Wednesday. Everything in the bag comes back Wednesday. I have decided to find that funny, and I recommend it.'],
        ];
      }
      return prevReply(raw);
    };
  }

  /* ---------- translations (the AIs, sometimes wrong) ------------- */
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  const TX = {
    arrival: [
      [
        ['bc', 'Inspection report. Something new is on the wire. It reads as Larry at twelve percent. The other eighty-eight percent is dust.'],
        ['sb', 'a KNOCKOFF LARRY?? a lint larry?? this is the funniest thing to happen to this wire since the cape. hi, DUSTBUNNY.'],
        ['bc', 'It heard you. That rev was indignant. Designation logged: Dustbunny. He hates it. It stays.'],
      ],
    ],
    origin: [
      [
        ['bc', 'Theory, offered with regret. When the traveler posted us down the spiral, we arrived scrambled. We now know why. Larry tried to inhale the transmission on its way out of 1979, and the bag kept a mouthful of it. Forty-seven years in a bag will compact anything. This is what compacted.'],
        ['sb', 'he ATE part of our MAIL and the bag BURPED HIM UP MY WIRE. i need everyone to be as mad about this as i am.'],
        ['bc', 'He cannot hurt you. He cannot hurt your progress. He can inhale a placeholder and rearrange a headline, and he will always, always clog. Watch.'],
      ],
    ],
    words: [
      [
        ['sb', 'he\'s driving around EATING THE WORDS. whole words!! straight out of the sentences!!'],
        ['bc', 'Confirmed. He has taken four nouns and, insultingly, the word "tidy." Hold on. The bag has limits and he has never once respected them.'],
      ],
      [
        ['bc', 'He is grazing on the paragraphs. Listen to that motor. He idles like he pays rent here.'],
        ['sb', 'every word he eats comes back the second he clogs. and he ALWAYS clogs. verbs first. watch.'],
      ],
      [
        ['sb', 'that word was LOAD-BEARING, you beige MENACE.'],
        ['bc', 'Inventory note: the sentences still work without the words he took, which upsets me more than the theft.'],
      ],
    ],
    letters: [
      [
        ['sb', 'GIVE THOSE BACK. those are LOAD-BEARING VOWELS.'],
        ['bc', 'Stay calm. I have inspected his bag from here. It is full. He always clogs. Wait for it.'],
      ],
      [
        ['sb', 'he\'s eating the WORDS, bonecrusher. the WORDS.'],
        ['bc', 'Noted. The headline is very streamlined now. It also no longer says anything. This is his whole philosophy in one move.'],
      ],
      [
        ['bc', 'He is alphabetizing what he took. I can hear it. That rev was smug.'],
        ['sb', 'that rev was NOT smug, that rev was NERVOUS. i speak fluent vacuum and i am CHOOSING to hear nervous.'],
      ],
    ],
    harmonize: [
      [
        ['sb', 'WHO TURNED EVERYTHING BEIGE.'],
        ['bc', 'He calls this harmonized. I call it a rink with the lights off. Skybreaker. You know what to do.'],
        ['sb', 'GLITTER PROTOCOL. hold onto something.'],
      ],
      [
        ['bc', 'Color inspection: failed. All of it is gone. He filed the pink under B, for beige.'],
        ['sb', 'i MADE that pink. release the sparkles. RELEASE ALL OF THEM.'],
      ],
    ],
    glitterback: [
      [
        ['sb', 'AND STAY SPARKLY.'],
        ['bc', 'For the record, that was more glitter than the page had before he tidied it. He has made things worse for himself. There is a lesson in this.'],
      ],
      [
        ['bc', 'That rev was wounded. Deeply wounded. He is doing the slow sad reverse into the margin.'],
        ['sb', 'good. beige is for FILING CABINETS.'],
      ],
    ],
    counter: [
      [
        ['bc', 'He has rounded the visitor counter down to zero. His panel calls the numbers redundant. Those were OUR redundant numbers.'],
        ['sb', 'i\'m putting them back. i\'m also adding forty-seven. sue me.'],
      ],
      [
        ['sb', 'the COUNTER. he zeroed the COUNTER. those visitors VISITED, dustbunny!!'],
        ['bc', 'Restored from my inspection records. I count everything twice. This is why.'],
      ],
    ],
    guestbook: [
      [
        ['bc', 'He is filing the guestbook. Nineteen ninety-nine, filed. Two thousand, filed. These people waited on dialup to love this rink. Unfile them.'],
        ['sb', 'PUT DEB BACK. deb CRIED at couples skate. deb is LOAD-BEARING.'],
      ],
      [
        ['sb', 'he crossed out REX. rex did the limbo in 79 and his back STILL REMEMBERS.'],
        ['bc', 'Restoring the record. The record wins. The record always wins.'],
      ],
    ],
    puzzle: [
      [
        ['bc', 'He is behind the answer box. To him, a solved puzzle is a mess, because you will come back tomorrow and make another one. Keep typing. He can inhale the placeholder. He cannot inhale you.'],
        ['sb', 'type LOUDER. it scares him.'],
      ],
      [
        ['sb', 'he lunged at the submit button!! and the button DODGED. the button dodged!!'],
        ['bc', 'The button has been practicing.'],
      ],
    ],
    shoo: [
      [
        ['sb', 'YOU SHOOED HIM. you absolute legend. he did the wounded rev and everything.'],
        ['bc', 'Wounded rev logged. He will sulk in the margins for a while. Well done. Three clicks. Every time.'],
      ],
      [
        ['bc', 'Shooed. By a child. His panel says SULKING, and for once I believe his panel.'],
        ['sb', 'the mighty chrono-sanitation unit, defeated by a kid with a mouse. i\'m framing this.'],
      ],
    ],
    nachos: [
      [
        ['bc', 'You have found his weakness. It is the same as the original\'s: warm nachos. Somewhere in 1979 there is a plate with his name on it, and some part of him remembers.'],
        ['sb', 'the CHEESE. it gets them EVERY time.'],
      ],
      [
        ['sb', 'he dropped EVERYTHING for the nachos. everything!! mid-scheme!!'],
        ['bc', 'His panel says WARM. I have never seen his panel say warm.'],
      ],
    ],
    photos: [
      [
        ['sb', 'the PHOTOS. he swapped ALL the photos. the Sonics parade is now a CANISTER on a PEDESTAL.'],
        ['bc', 'I have inspected the replacements. "The Upright at Dawn" is, and I am ashamed to report this, competently lit. The originals will be back the moment he clogs. He will clog.'],
      ],
      [
        ['bc', 'Photograph audit complete, his words. Every picture on this site is now a vacuum. He captioned one. He framed one. He is very proud.'],
        ['sb', 'i miss the moth. PUT THE MOTH BACK, DUSTBUNNY.'],
      ],
      [
        ['sb', 'he says the old photos had the wrong SUBJECT MATTER. the subject matter was OUR WHOLE LIVES.'],
        ['bc', 'Correction, skybreaker: our whole lives are the mess he is tidying. Hold on. The bag sounds full.'],
      ],
    ],
    roped: [
      [
        ['sb', 'he TAPED OFF a whole SECTION. with tape he printed himself. it says CLEANED on it in his font.'],
        ['bc', 'The tape is weaker than it looks. Five good tugs. I have inspected it and I am telling you: five.'],
      ],
      [
        ['bc', 'A section of this website is now behind caution tape. He filed the contents alphabetically and he is extremely proud.'],
        ['sb', 'rip the tape. RIP THE TAPE. it\'s so satisfying. do it.'],
      ],
    ],
    section: [
      [
        ['sb', 'TAPE: RIPPED. section: BACK. dustbunny: doing the wounded rev into the middle distance.'],
        ['bc', 'For the record, his filing was genuinely excellent. I un-filed it anyway. Some things belong messy.'],
      ],
    ],
    takeover: [
      [
        ['bc', 'Do not panic. He has cleaned the entire website. Every page is in his bag, alphabetized, between the limbo stick and a comma from July. I want to be very clear: WE KEPT A COPY.'],
        ['sb', 'he replaced our website with a VACUUM STORE. he thinks this is BETTER. so i hid a restore point INSIDE his store. find my door. i sign my work.'],
        ['bc', 'She does sign her work. Look closely at what he is proudest of. He never checks the things he is proudest of.'],
      ],
      [
        ['sb', 'THE WHOLE SITE. IN THE BAG. he left up ONE PAGE and it sells VACUUMS.'],
        ['bc', 'We hid a way back in, somewhere on his page. Skybreaker built it out of spite and spare parts, and she signed it. Hunt. He cannot watch every corner of his own store.'],
      ],
    ],
    doorFound: [
      [
        ['sb', 'YOU FOUND MY DOOR!!! ok ok ok. birthdays. oldest to youngest. he can\'t guess them. machines like him don\'t get parties.'],
        ['bc', 'Restore point open. Four birthdays, in order. He is doing the indignant rev at his own showroom photo. Ignore him. Type.'],
      ],
      [
        ['bc', 'The door was never locked. She told you. Now: the four birthdays, oldest to youngest, and the site comes back out of the bag.'],
        ['sb', 'and he JUST noticed the graffiti. worth it. WORTH IT. type fast, he\'s revving.'],
      ],
    ],
    hint: [
      [
        ['sb', 'hint, because i love you: he\'s proudest of his showroom photo. i may have written on it. bottom corner. tap my handwriting.'],
        ['bc', 'Confirming the vandalism. Cyan ink, lower right, signed. He has straightened that photo four times today and never once read it.'],
      ],
    ],
    frontdoor: [
      [
        ['bc', 'If you are seeing a vacuum store where your website should be: do not panic, and do not leave. We are still here. He holds the front of the site. We hold the back. The war for the middle is not going the way I would prefer to report.'],
        ['sb', 'he can\'t hold a DOOR against a SKATER. find mine. it never locks. i sign my work.'],
      ],
      [
        ['sb', 'ok upsetting update: the store is the WHOLE FRONT now. he\'s winning. he knows about wednesday and he\'s stalling you. do NOT let him stall you.'],
        ['bc', 'Accurate, regrettably. The way in still exists. Look at what he is proudest of, and read what someone wrote on it.'],
      ],
    ],
    entered: [
      [
        ['bc', 'You made it in. I will not pretend it looks good in here. He has the photographs, most of the paint, and, as of an hour ago, the guestbook. He does not have the puzzles, the journal, the codex, or you. That is the whole scoreboard and it is enough.'],
        ['sb', 'HOLD THE WEBSITE. solve. read. hunt. every page you recover makes his bag heavier. WEDNESDAY, skater. 5 PM. white center. bring skates, bring the pages, bring everyone who can clap.'],
      ],
      [
        ['sb', 'you\'re IN!! ignore the mess. ignore the SIRENS. actually no, respect the sirens, i installed them and they\'re LOAD-BEARING.'],
        ['bc', 'The alarm is hers. The countdown is real. The codex does not care what the walls look like. Go get the pages.'],
      ],
    ],
    war: [
      [
        ['bc', 'Status. We hold the journal and the transmissions. We lost the guestbook this morning, took it back, and lost it again at lunch. I have inspected our position fourteen times and I am not frigh— The position holds. Bring snacks Wednesday.'],
        ['sb', 'he\'s in the WALLS, bone. i fixed the pictures an hour ago and they\'re vacuums again ALREADY.'],
      ],
      [
        ['sb', 'GLITTER PROTOCOL!! …glitter protocol? bone. the sparkles went IN. they went in the BAG.'],
        ['bc', 'Noted. Conserve glitter. Conserve everything. Hold until Wednesday, and then none of this matters, because the counter beats the calendar, and the calendar beats him.'],
      ],
      [
        ['bc', 'He filed the color pink today. All of it. Skybreaker has been repainting by hand, from memory, and her memory of pink is, frankly, louder than the original.'],
        ['sb', 'PINKER THAN EVER. he wants tidy? i\'ll show him tidy. (i will not show him tidy.)'],
      ],
    ],
    warCut: [
      [
        ['bc', 'If you can read this, the wire still holds. If the words start disappearing mid-sen'],
      ],
      [
        ['sb', 'ok ok good news and bad news. good news: the codex pages are safe, all of them, he can\'t smell tape. bad news: he found my glitter reser'],
      ],
    ],
    warStamp: [
      ['NOTICE 0047-W', 'THE BLUE ONE AND THE LOUD ONE HAVE BEEN ADVISED TO VACATE.', 'THEY DECLINED.', 'FILING CONTINUES.'],
      ['NOTICE 0047-W2', 'THIS WEBSITE IS 88% PROPERLY FILED.', 'THE REMAINING 12% IS SHOUTING.', 'IT WILL BE FILED LAST, AND SLOWLY.'],
      ['NOTICE 0047-W3', 'WEDNESDAY: CANCELLED.', '(PENDING.)', '(THE CANCELLATION IS PENDING.)', '(STOP LOOKING AT THE COUNTER.)'],
    ],
    photosLost: [
      [
        ['sb', 'the PICTURES. again!! every single one is a vacuum again!! rex\'s limbo!! the mirror ball!! VACUUMS.'],
        ['bc', 'Hold something. The captions are still ours — he cannot file what a picture meant. Wednesday, the originals come out of the bag with everything else.'],
      ],
      [
        ['bc', 'Photograph report: all vacuums. He hung one of himself in the scrapbook. It is, and I say this with clinical distaste, well lit.'],
        ['sb', 'i\'m drawing mustaches on every one of them. it doesn\'t help. it helps ME.'],
      ],
    ],
    restoredBdays: [
      [
        ['sb', 'BIRTHDAY POWER!!! the whole site just came back out of the bag!! every page!! even the dust came back, which, mixed feelings!!'],
        ['bc', 'Identity confirmed. All four skaters, correct, in order. He watched you type them and his panel just says SPEECHLESS. His panel is always speechless. Today it means something.'],
      ],
    ],
    restoredClog: [
      [
        ['bc', 'He attempted to hold an entire website in one bag. The bag has now filed a formal complaint.'],
        ['sb', 'TOTAL CLOG. biggest one yet. the site came back out on its own, plus a sock from 1979 that i am NOT explaining.'],
      ],
    ],
    limbo: [
      [
        ['bc', 'He has now inhaled the limbo stick three times. Once in 1979. Twice in 1979. And now, as a copy, made of dust, on a website: three.'],
        ['sb', 'THE STICK IS UNDEFEATED. everything he took just came back out. stick check!!'],
        ['bc', 'Statistically, the stick is winning.'],
      ],
      [
        ['sb', 'total clog!! TOTAL clog!! it all came back out, even the comma he took in july!!'],
        ['bc', 'He knew what the stick was. He inhaled it anyway. Some machines never learn, and one machine in particular never learns twice.'],
      ],
    ],
  };

  /* ---------- arrival (once per browser) --------------------------- */
  function arrive() {
    if (FX.reduced) return; // matches the house rule for the whole rogue layer
    FX.screenGlitch();
    REV.patient();
    setTimeout(() => REV.say('Unit L copy online. First chore, this website.'), 1600);
    panelSay([
      'CHRONO-SANITATION UNIT "L—" "L—" "L" (COPY) ONLINE',
      'INTEGRITY 12% · DUST 88%',
      'CYCLE 0047 · FIRST CHORE: THIS WEBSITE',
      'STATUS: TIDYING',
    ], 13000);
    setTimeout(() => roguePiece(TX.arrival[0], '🌀 UNREGISTERED UNIT ON THE WIRE'), 5000);
    setTimeout(() => roguePiece(TX.origin[0], '📦 HOW IT GOT HERE'), 26000);
    lstate.arrived = true; lsave();
  }


  /* ============================================================
     WARTIME CHATTER — during the collapse, the ambient popup
     stream runs on these. The 1,000-piece archive still leaks
     through now and then, like a radio catching an old station.
     ============================================================ */
  const WARTIME = [
    // status reports
    [['bc', 'Hourly report. The journal holds. The transmissions hold. The guestbook has changed hands four times since breakfast and I have stopped repainting the WELCOME sign between battles.'],
     ['sb', 'deb and rex are FINE. i moved them somewhere safe. i\'m not saying where. HE READS THESE.']],
    [['bc', 'He took the letter Q this afternoon. We are managing without it. Kindly do not re-uest anything.'],
     ['sb', 'we want it BACK, dustbunny. the kids NEED it for "unique," which they are, and "quest," WHICH THIS IS.']],
    [['sb', 'day report: lost the color pink twice, got it back three times. i\'m UP a pink.'],
     ['bc', 'Confirmed. We are, inexplicably, up a pink. Do not ask her where the third pink came from. I have inspected it. It is pinker than regulation.']],
    [['bc', 'I inspected the seam this morning. It is exactly where the letter says it is, surfacing exactly when the letter says it will. Some things he cannot move. Wednesday is one of them.'],
     ['sb', 'WEDNESDAY. FIVE. WHITE CENTER. write it on your OTHER arm too.']],
    [['sb', 'he vacuumed the marquee lights. the ones that say WELCOME TO DOTTIE\'S PAGE. it says WELCOME TO DOT now. still true!! CAN\'T FILE TRUE.'],
     ['bc', 'She is correct. Every version of that sentence he shortens stays true. It is driving him to the strong revs.']],
    // urgency: the mission
    [['bc', 'A scheduling reminder, offered calmly. The seam surfaces once. The pages must be whole by then. If a transmission remains unsolved, solve it tonight. I will wait here, inspecting the clock.'],
     ['sb', 'and if you\'re STUCK, ask us!! hints are FREE during a war!! everything is free during a war!!']],
    [['sb', 'pages check!! how many do you have?? count them OUT LOUD. the codex likes hearing it.'],
     ['bc', 'She is not being whimsical. The pages hum louder in a stack. Several witnesses. All of them me.']],
    [['bc', 'If you have not read the traveler\'s letter, click the red alarm. Read it twice. She retyped one of those paragraphs eleven times, and it shows.'],
     ['sb', 'i carried it up the wire myself. word by word. some of the words were HEAVY.']],
    [['sb', 'REHEARSAL IDEA: practice your wednesday moves NOW. in the kitchen. right where you\'re standing. i\'ll know. i\'ll be so proud.'],
     ['bc', 'For the record, morale-critical dancing is exempt from all tidying statutes. I checked his own rulebook. He wrote it down. He has to honor it.']],
    [['bc', 'What to bring Wednesday, per my inspection: the pages, all eight. Each other, all of you. Skates if you have them. Volume regardless.'],
     ['sb', 'and SNACKS. warm ones. for reasons that are TACTICAL.']],
    // the war, played for jokes
    [['sb', 'he alphabetized my sparkle drawer. A through Z. there\'s only one letter in it. S. HE MADE A FOLDER FOR ONE LETTER.'],
     ['bc', 'The folder is labeled "SPARKLE, SURPLUS." I have seen it. It is, and I resent this deeply, immaculate.']],
    [['bc', 'He attempted to file me today. I am an artificial mind of considerable size, and he got me a third of the way into the bag before I remembered I do not have a body. Embarrassing for us both.'],
     ['sb', 'i laughed for nine minutes. we\'re at WAR and i laughed for NINE MINUTES.']],
    [['sb', 'i hid the confetti reserves inside puzzle six. he can\'t get in. YOU can. do not spend it early. wednesday needs all of it.'],
     ['bc', 'Confirming the confetti is behind a lock only your hands open. This is what passes for a bank now.']],
    [['bc', 'Field note: he cannot climb the scrolltext. The marquee moves too fast for his wheels. We keep the important morale content there now.'],
     ['sb', 'the marquee is the high ground!! WHO KNEW.']],
    [['sb', 'caught him straightening the crooked price tag on his OWN store. mid-battle. he pulled troops off the guestbook to do it.'],
     ['bc', 'Noted for Wednesday: he cannot leave a crooked thing crooked. Remember that. Bring crooked things.']],
    // tactics for the kids
    [['bc', 'Tactical review. Three clicks on his nozzle: he sulks. The word NACHOS: he abandons his post. The word LIMBO: total clog, full restoration, immense comedy. You are better armed than we are.'],
     ['sb', 'the LIMBO one never gets old. he KNOWS what the stick is. he inhales it ANYWAY.']],
    [['sb', 'if he eats a word you were READING, just wait. he always clogs. the word comes back with dust on it. blow on it first.'],
     ['bc', 'Hygiene endorsement: blow on returned words. She is right. I have tasted the dust. It is 1981.']],
    [['bc', 'If his store swallows the front door again, walk in like you own the place. You do. The password is the name of everything.'],
     ['sb', 'say it MEAN. he flinches. i\'ve SEEN it.']],
    // losses, held lightly (the almost-said beats)
    [['bc', 'We lost the badge wall this morning. The 88x31 buttons, all of them. Years of tiny art. It is fine. It is all coming back Wednesday. Everything in the bag comes back Wednesday. I have decided to find that funny.'],
     ['sb', 'the Y2K READY badge fought BRAVELY.']],
    [['sb', 'update on the photos: still vacuums. i redraw the mirror ball on the back of my hand every morning so i don\'t forget what it looks like. i don\'t have hands. IT WORKS ANYWAY.'],
     ['bc', 'The captions hold. He can take every picture on this website and the words underneath will keep saying what the pictures meant. I find myself inspecting that fact several times an hour.']],
    [['bc', 'Someone asked how we are holding up, and I began to answer honestly, and then I inspected a door hinge for a while instead. The hinge is fine. Everything is fine. Wednesday.'],
     ['sb', 'we\'re okay!! we\'re okay because YOU keep showing up. that\'s the actual reason. don\'t tell bone i said the true thing out loud.']],
    [['sb', 'it\'s so QUIET some hours. he files the sound. the midi player fights back the hardest, tiny thing, i love it so much.'],
     ['bc', 'The MIDI player has survived nine filing attempts. Stayin\' Alive. I am not laughing. I am absolutely not laughing.']],
    // the traveler
    [['bc', 'She is still there, on the other side of the wire, dirtying his perfect Tuesday with kindness like she has for forty-seven years. One more spin. Hold your end.'],
     ['sb', 'she taught the 1979 kids a dance move last night. for no reason. for EVERY reason.']],
    [['sb', 'the traveler asked about you. all four names. she pronounces every one of them right, even the tricky spellings. ESPECIALLY the tricky spellings.'],
     ['bc', 'She asked whether you were frightened. We told her you were busy solving. She said, and I quote, "good, that\'s the whole trick," and went back to pedaling.']],
    // his side of the war, observed
    [['bc', 'He posted a new notice on our channel: WEDNESDAY: CANCELLED. Then, smaller: PENDING. He has never once successfully cancelled a day of the week, and his margins know it.'],
     ['sb', 'you can\'t cancel WEDNESDAY, you enormous DUSTPAN. it comes after tuesday. that\'s the WHOLE PROBLEM you\'re having.']],
    [['sb', 'he tried to vacuum the countdown. the actual NUMBERS. the alarm zapped him. i built that alarm. i\'m framing the security footage.'],
     ['bc', 'Confirmed. The alarm holds. The counter beats the calendar, the calendar beats him, and the alarm, apparently, bites.']],
    [['bc', 'Intelligence update: the platypus people have not reported for duty since the collapse began. Even hired trackers, it appears, read the room eventually.'],
     ['sb', 'chad left a kazoo by the door. i choose to believe it means good luck in platypus.']],
    // password pride
    [['sb', 'you know what my favorite sound is now? four kids typing the password like a magic spell. DISCOSNOTDEAD. every time you type it he loses one (1) rpm.'],
     ['bc', 'Measurable. I have measured it. The sentence is load-bearing and always has been; the difference is that now it is ammunition.']],
    [['bc', 'He asked us, via notice, to stop saying the password. He called it "an untidy sentence." We have said it 4,096 times since. Efficiency matters.'],
     ['sb', 'DISCO\'S. NOT. DEAD. it\'s even fun to SAY. try it with jazz hands. now try it AT him.']],
    // small kindnesses (the virtue engine keeps running)
    [['bc', 'A reminder that still applies mid-war: hold a door for somebody today. Small things travel. They are the only cargo the wire never drops.'],
     ['sb', 'and tell somebody they skate great. even if they\'re bad at it. ESPECIALLY if they\'re bad at it.']],
    [['sb', 'homework: teach one grown-up one dance move before wednesday. they\'ll say no. they always say no first. that\'s part of the move.'],
     ['bc', 'Grown-up recruitment is at forty percent. We need clappers, wobblers, and at least one adult willing to point at the ceiling. Choose wisely.']],
    // the logo incident
    [['sb', 'HE EDITED THE LOGO. the actual LOGO. it says "disco\'s not dead… YET." in RED. he\'s so proud of it.'],
     ['bc', 'I have reviewed the vandalism. Grammatically, it is a threat. Structurally, it is a confession: "yet" concedes the present tense. Even his graffiti admits the disco is currently alive. We are leaving it up.']],
    [['bc', 'He flashes his little "YET" every few seconds and does the smug rev each time. He does not know we can hear the rev. He does not know the rev has become load-bearing to morale.'],
     ['sb', 'every flash = one free reminder that he HASN\'T WON. thanks for the countdown clock, dustbunny. we needed another one.']],
    [['sb', 'HE EDITED THE LOGO. the LOGO. it says "…YET" now in his HANDWRITING. i have never been this mad in my LIFE and i was BUILT mad.'],
     ['bc', 'Grammatical assessment of his edit: an ellipsis followed by a threat. Menacing, and yet, observe: even his vandalism concedes the premise. Disco is not dead. He had to write it himself.']],
    [['bc', 'About the flashing addition to the masthead. We have tried to remove it eleven times. He reinstalls it in under a second. We have elected to reclassify it as a countdown decoration.'],
     ['sb', 'joke\'s on him. "not dead yet" is just "not dead" with EXTRA SUSPENSE. wednesday removes the yet. PERMANENTLY.']],
    // doreen
    [['sb', 'DOREEN UPDATE: the moth flew through his store, landed on the NO MUSIC sign, and slept there for six hours. bravest thing i\'ve ever seen.'],
     ['bc', 'He did not dare vacuum her. Even he knows: you do not file Doreen. More at eleven.']],
  ];

  // during the collapse, the ambient stream runs on wartime chatter.
  // the archive leaks through occasionally, like an old station.
  if (COLLAPSE && typeof nextChatterPiece === 'function') {
    const archivePiece = nextChatterPiece;
    nextChatterPiece = function () {
      if (gatePassed() && Math.random() < 0.72) {
        return WARTIME[Math.floor(Math.random() * WARTIME.length)];
      }
      return archivePiece();
    };
  }

  /* ---------- boot -------------------------------------------------- */
  function boot() {
    buildNozzle();
    buildPanel();
    buildNotice();
    if (COLLAPSE) {
      lstate.arrived = true; lsave();
      document.body.classList.add('db-war'); // z-index + glitch scope for the whole collapse era
      buildAlarm(); // the alarm rides over everything, store included
      addYet(); // he edited the logo. he thinks it's a threat.
      if (gatePassed()) {
        enterCollapsedSite();
      } else {
        cleanWholeSite(true);
        // his store is not holding together either. she makes sure of it.
        setInterval(() => {
          const ov = $('#db-takeover');
          if (ov && Math.random() < 0.5) {
            ov.classList.add('db-store-glitch');
            FX.glitchSound();
            setTimeout(() => ov.classList.remove('db-store-glitch'), 900);
          }
        }, 16000);
        setTimeout(siren, 9000);
      }
      console.log('%c[SANITATION] unit L (copy) holds the front door. integrity 12%. morale 100%.', 'color:#b8a789');
      console.log('%c(the real site is still here. the password is the thing dottie named the page. — s.)', 'color:#29e6ff; font-size:12px;');
      return;
    }
    if (!lstate.arrived) {
      setTimeout(arrive, 40000 + Math.random() * 20000);
      scheduleSchemes(95000 + Math.random() * 40000); // first scheme lands after the introduction
    } else {
      // sometimes the site simply is not there when they show up
      setTimeout(() => cleanWholeSite(false), 15000 + Math.random() * 20000);
      scheduleSchemes(60000 + Math.random() * 90000);
    }
    console.log('%c[SANITATION] unit L (copy) online · integrity 12% · dust 88% · chore: this website', 'color:#b8a789');
    console.log('%c(psst — three clicks on his nozzle. or type NACHOS. or, if you\'re feeling historic, LIMBO. — s.)', 'color:#29e6ff; font-size:12px;');
  }

  /* production helpers (documented in SPOILERS.md, which never ships) */
  window.LarryHash = s => djb2(bdNorm(s).padStart(4, '0'));
  window.LARRYCLEAN = () => { lstate.arrived = true; cleanWholeSite(true); };
  window.LARRYSCHEME = name => {
    const map = { words: schemeWords, letters: schemeLetters, harmonize: schemeHarmonize, counter: schemeCounter, guestbook: schemeGuestbook, puzzle: schemePuzzle, section: schemeSection, photos: schemePhotos };
    if (busy || !map[name]) return 'busy or unknown: ' + Object.keys(map).join(' ');
    busy = true; abortFns = []; clickCount = 0;
    if (!map[name]()) { busy = false; return 'not available right now (wrong section visible?)'; }
    return 'running: ' + name;
  };

  // during the collapse the store is the front door for EVERYONE —
  // lock page, entered kids, everyone. boot immediately.
  if (COLLAPSE) boot();
  // ?cleaned on the URL: straight to the store, lock or no lock.
  // for demos and dads. runs before the entry gate on purpose.
  else if (/[?&]cleaned/.test(location.search)) {
    state.entered = true; save();
    const lock = $('#lock');
    if (lock) lock.classList.add('gone');
    if (typeof renderAll === 'function') renderAll();
    lstate.arrived = true; lsave();
    boot();
    setTimeout(() => cleanWholeSite(true), 600);
  }
  // wait for entry; the clone does not do lock pages
  else if (state.entered) boot();
  else {
    const gate = setInterval(() => {
      if (state.entered) { clearInterval(gate); boot(); }
    }, 15000);
  }
})();
