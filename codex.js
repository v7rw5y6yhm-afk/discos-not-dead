/* ============================================================
   DISCO'S NOT DEAD — codex.js — PHASE TWO: THE CODEX HUNT
   Loads after app.js. When all eight locks are solved, the site
   turns gold and becomes a hunt board: eight seals, each open for
   one hour of the day, each revealing a real Seattle site where a
   codex page (a cassette tape) is hidden.
   `hideHint` strings are production-editable: change them to match
   where the tapes are actually stashed.
   ============================================================ */

const CODEX_HUNT = [
  {
    id: 'greenlake', hour: 7, page: 1,
    title: 'SEAL I — THE LAP COUNTER',
    hourRiddle: 'this seal listens at the hour the lake wakes: joggers first, ducks furious about it.',
    siteName: 'Green Lake loop path',
    address: 'Green Lake Park, Seattle — the 2.8-mile path',
    canonNote: 'The traveler ran her laps here, one for each year between you. Log 07 is this place.',
    hideHint: 'Field note: start at the wading pool and walk the path clockwise. The page rests near the first bench that faces the water.',
    coach: [
      ['bc', 'Seal one. I have prepared a warm-up schedule, a cool-down schedule, and a schedule for scheduling. The traveler ran this lake every loop. Match her count and the seal opens.'],
      ['sb', 'the lake is 2.8 miles around!! she ran 131.6 miles of laps in one night!! math is a door. KICK IT.'],
    ],
    widget: 'laps',
    hints: [
      'Divide the traveler\'s total miles by the length of one lap.',
      '131.6 divided by 2.8. Bonecrusher checked it four times.',
      'One lap for every year between 1979 and 2026. Type the number as a word.',
    ],
    answers: ['beef0cb8'],
    reveal: [
      ['sb', 'FORTY-SEVEN!! the lake remembers every single one!!'],
      ['bc', 'Page one resonates at Green Lake. Walk her laps. Bring water. Hydration outlives time itself.'],
    ],
  },
  {
    id: 'parade', hour: 9, page: 2,
    title: 'SEAL II — THE CONFETTI CATCH',
    hourRiddle: 'this seal listens at the hour the parade stepped off, while the confetti was still deciding where to land.',
    siteName: 'Fourth Avenue at Westlake Park',
    address: '401 Pine St, downtown Seattle',
    canonNote: 'Three hundred thousand people stood here on June 4, 1979, and one confused time traveler. Log 01 is this street.',
    hideHint: 'Field note: Westlake Park, by the big stone arch. The page rests low, where a parade-watcher would plant a folding chair.',
    coach: [
      ['sb', 'CONFETTI!! some of it has LETTERS on it!! catch the lettered ones — they fall in ORDER, so grab them as they come!!'],
      ['bc', 'I calculated where every piece of 1979 confetti landed. Twelve pieces never came down. They are coming down now, forty-seven years late. Catch them.'],
    ],
    widget: 'confetti',
    hints: [
      'Click only the confetti pieces that carry letters. Plain pieces are decoration.',
      'The letters arrive in order. If you miss one, the storm repeats.',
      'It spells the street the parade marched down. Two words, typed together.',
    ],
    answers: ['4b42bdb', 'dd7ab1c5'],
    reveal: [
      ['bc', 'FOURTH AVENUE. Where the city learned that losing is only the end if you stop skating.'],
      ['sb', 'page two is at westlake park!! stand where the crowd stood!! wave at 1979, it WAVES BACK.'],
    ],
  },
  {
    id: 'needle', hour: 12, page: 3,
    title: 'SEAL III — THE NOON SHADOW',
    hourRiddle: 'this seal listens when the city\'s tallest needle casts its shortest shadow.',
    siteName: 'Space Needle grounds',
    address: 'Seattle Center, 400 Broad St',
    canonNote: 'The parade rolled here in 1979. The needle was already seventeen years old and showing no signs of slowing down.',
    hideHint: 'Field note: the grassy rise on the north side of the needle, where the picnickers watch it lean over them. The page rests at the base of the third lamppost.',
    coach: [
      ['bc', 'The needle is 605 feet of civic optimism, and at noon it becomes the city\'s sundial. Drag the shadow to where noon puts it.'],
      ['sb', 'shadows point AWAY from the sun!! at noon the sun is as south as it gets, so the shadow points... you tell ME!!'],
    ],
    widget: 'shadow',
    hints: [
      'At noon in Seattle the sun sits due south. Shadows fall the opposite way.',
      'Drag the shadow until it points straight up the dial. North.',
      'When the dial glows, the word it reveals is the answer.',
    ],
    answers: ['dc84538b', '7c824d65'],
    reveal: [
      ['sb', 'HIGH NOON!! the needle says so!!'],
      ['bc', 'Page three rests at Seattle Center. Look up once for the needle, then look down for the page. Most people only do the first part.'],
    ],
  },
  {
    id: 'alki', hour: 15, page: 4,
    title: 'SEAL IV — THE LIGHTHOUSE COUNT',
    hourRiddle: 'this seal listens at three o\'clock. the afternoon one. the 3 AM slot also works and we are BEGGING you not to.',
    siteName: 'Alki Beach, near the lighthouse',
    address: 'Alki Point, West Seattle',
    canonNote: 'The traveler stood on this sand at 3 a.m. and watched Skylab come down. Log 04 is this beach. So is the parking lot she wrote about.',
    hideHint: 'Field note: the driftwood logs across from the lighthouse fence. The page rests inside the hollow log a kid can see straight through.',
    coach: [
      ['bc', 'The Alki light blinks in groups. Count the flashes in each group: one flash is A, two is B, onward through the alphabet. I will keep the fog away. I have asked it nicely.'],
      ['sb', 'count with your FINGERS!! out loud!! the lighthouse loves an audience!!'],
    ],
    widget: 'flashes',
    hints: [
      'Count the flashes in each burst. Each burst is one letter, A=1 through Z=26.',
      'The first burst has twelve flashes. Twelve means L.',
      'Ten letters. It is the thing doing the blinking.',
    ],
    answers: ['92f2ff3f', '727b1fa6'],
    reveal: [
      ['sb', 'LIGHTHOUSE!! it was talking about ITSELF the whole time!! iconic. no notes.'],
      ['bc', 'Page four rests at Alki, where the sky fell and everyone laughed. Daylight visit strongly preferred. Overwhelmingly preferred.'],
    ],
  },
  {
    id: 'market', hour: 17, page: 5,
    title: 'SEAL V — THE BRASS COLLECTOR',
    hourRiddle: 'this seal listens at the hour the fishmongers throw the last fish and the flowers go two-for-one.',
    siteName: 'Pike Place Market, by Rachel',
    address: '1st Ave & Pike St, under the big red clock',
    canonNote: 'The traveler bought corn dogs here with exact change, which the vendors found deeply unsettling.',
    hideHint: 'Field note: the information booth across from the big brass pig. The page rests where the free maps live.',
    coach: [
      ['bc', 'Riddle protocol. The answer weighs 550 pounds, is made of brass, has stood under the market clock since 1986, and eats coins for charity. I have fed her twice. For research.'],
      ['sb', 'she has a NAME and it\'s on her BACK and children SIT on her and she LETS THEM.'],
    ],
    widget: 'piggy',
    hints: [
      'She is a pig. A very large, very generous pig.',
      'Tourists photograph her. The market feeds people with her coins.',
      'Her name is six letters and it is not Wilbur.',
    ],
    answers: ['c26b6494', 'be1d4882'],
    reveal: [
      ['sb', 'RACHEL!!! the queen!! the icon!! the pig!!'],
      ['bc', 'Page five rests near the market. Pay your respects to Rachel. A coin is customary. She has done nothing but good with her life.'],
    ],
  },
  {
    id: 'kingdome', hour: 18, page: 6,
    title: 'SEAL VI — THE VANISHED MOON',
    hourRiddle: 'this seal listens at the hour the turnstiles used to start spinning for a night game.',
    siteName: 'Lumen Field north plaza (where the Kingdome stood)',
    address: '800 Occidental Ave S, SoDo',
    canonNote: 'The concrete moon rose in 1976 and came down in 2000. The traveler watched the All-Star Game inside it. Log 06 is this ground.',
    hideHint: 'Field note: the north plaza, by the bronze sculpture. The page rests at the planter closest to the spot the Kingdome\'s center held.',
    coach: [
      ['bc', 'The building where I watched the traveler watch the stars is gone. Twenty-six years, and I am still updating that file. Select the moon phase that means gone, and coming back.'],
      ['sb', 'he gets QUIET about this one. pick the phase where the moon looks empty but isn\'t over!! the moon is NEVER over!!'],
    ],
    widget: 'moons',
    hints: [
      'Eight phases. You want the one that shows nothing at all.',
      'It looks like an ending. Astronomers name it like a beginning.',
      'Two words. The first one is NEW.',
    ],
    answers: ['7e41e81a'],
    reveal: [
      ['bc', 'New moon. Gone, and coming back. Page six rests where the concrete moon stood. Stand on the plaza and you stand in section 330\'s sky.'],
      ['sb', 'bring him back a pebble. he won\'t ask. bring one anyway.'],
    ],
  },
  {
    id: 'southgate', hour: 19, page: 7,
    title: 'SEAL VII — THE CURTAIN CALL',
    hourRiddle: 'this seal listens at the truant\'s hour. if you know, you know. if you don\'t: seven. it\'s seven.',
    siteName: 'Southgate Roller Rink',
    address: '9646 17th Ave SW, White Center',
    canonNote: 'Log 03 said the traveler would not write where the scratch is. We are not writing it either. We are letting the jukebox say it.',
    hideHint: 'Field note: the sidewalk out front, where the marquee light lands after dark. The page rests behind the rink\'s own flyer board.',
    coach: [
      ['bc', 'The rink\'s rotation holds eleven songs. Seven of them light the marquee. Select the four that the marquee never shows, and attend to the third one you pick. This seal opens at 7. At 7:19 exactly, it opens a little wider. I will say no more.'],
      ['sb', 'ELEVEN songs!! SEVEN on the sign!! find the FOUR hiding in the dark!! one of them is the answer and it\'s the one that sounds like US. all six of us. you\'ll know.'],
    ],
    widget: 'jukebox',
    hints: [
      'The marquee songs spell SKATEON with their first letters. Those seven are not the answer.',
      'Four songs play at the rink that never touch the marquee. Pick all four.',
      'The answer is the one about family. Typed as one word.',
    ],
    answers: ['b366a077'],
    reveal: [
      ['sb', 'WE ARE FAMILY!!! and now you know where the scratch is. it\'s the rink. it was ALWAYS the rink. the fan page you\'ve been reading is a map of it.'],
      ['bc', 'Page seven rests at Southgate itself, 9646 17th Ave SW. The little loop spins behind that door every night at 7:19. Walk past and you may hear the organ. Do not be alarmed. Be moderately intrigued.'],
    ],
  },
  {
    id: 'troll', hour: 20, page: 8,
    title: 'SEAL VIII — THE THING THAT WASN\'T THERE',
    hourRiddle: 'this seal listens at the hour the streetlights blink on and the bridge starts pretending it\'s asleep.',
    siteName: 'The Fremont Troll',
    address: 'N 36th St under the Aurora Bridge, Fremont',
    canonNote: 'Bonecrusher\'s 1979 maps show an empty bridge. Something eighteen feet tall now lives under it, holding a real Volkswagen. He has filed a report. The report was not accepted.',
    hideHint: 'Field note: the troll\'s left hand grips the car. The page rests in the crook of the OTHER arm, tucked where the concrete makes a pocket.',
    coach: [
      ['bc', 'I must recuse myself from this seal. My maps say there is no troll. My sensors say there is an enormous troll. One of us is wrong and I have been an instrument my whole life. Skybreaker will coach you.'],
      ['sb', 'GLADLY. three of these seattle things did NOT exist in 1979!! tap the time-travelers!! the newcomers!! the things that would make a 1979 map file a complaint!!'],
    ],
    widget: 'anachronism',
    hints: [
      'Three of the eight arrived after 1979. Tap exactly those three.',
      'The troll moved in under the bridge in 1990. The gum got gross in the 90s. The big wheel rolled up in 2012.',
      'When the right three glow, the seal spells its answer. It is where the troll lives, typed as one word.',
    ],
    answers: ['57fae2ab', 'ba56b475', '59742285'],
    reveal: [
      ['sb', 'UNDER THE BRIDGE!! page eight is IN THE TROLL\'S ARMS. he\'s friendly. probably. bring a flashlight and a grown-up!!'],
      ['bc', 'Final page. N 36th Street, Fremont. My official position remains that the troll is impossible. My personal position is that I would like a photograph with it.'],
    ],
  },
];

/* ---------------- state & gating ------------------------------- */
let hourBypass = false;
function ensureCodexState() {
  if (!Array.isArray(state.codex) || state.codex.length !== CODEX_HUNT.length) {
    state.codex = CODEX_HUNT.map(() => false);
  }
}
function codexActive() { return solvedCount() === PUZZLES.length; }
function codexSolvedCount() { ensureCodexState(); return state.codex.filter(Boolean).length; }
function sealOpen(seal) {
  if (hourBypass) return true;
  const h = new Date().getHours();
  if (seal.id === 'alki') return h === 15 || h === 3; // we warned them
  return h === seal.hour;
}
function nextWindow(seal) {
  const now = new Date();
  const t = new Date(now);
  t.setMinutes(0, 0, 0);
  t.setHours(seal.hour);
  if (t <= now) t.setDate(t.getDate() + 1);
  return t - now;
}
function fmtMs(ms) {
  const s = Math.floor(ms / 1000);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

/* ---------------- the takeover --------------------------------- */
let codexModeOn = false;
function activateCodexMode() {
  if (codexModeOn || !codexActive()) return;
  codexModeOn = true;
  document.body.classList.add('codex-mode');
  const tag = $('.site-tag');
  if (tag) tag.textContent = '★ PHASE TWO — THE CODEX HUNT · eight pages · eight hours · one city ★';
  const scroll = $('.scrolltext');
  if (scroll) scroll.innerHTML = '📖 THE CODEX IS IN PIECES &nbsp;★&nbsp; EIGHT PAGES HIDE IN SEATTLE &nbsp;★&nbsp; EACH SEAL LISTENS FOR ONE HOUR A DAY &nbsp;★&nbsp; <span class="bleed-red">[[ THE WIRE LISTENS ON THE HOUR ]]</span> &nbsp;★&nbsp; bring each other &nbsp;★';
}

/* ---------------- hunt board render ---------------------------- */
function renderCodex() {
  const sec = $('#sec-codex');
  if (!sec) return;
  const wrap = $('#codex-list');
  if (!codexActive()) { wrap.innerHTML = ''; return; }
  activateCodexMode();
  ensureCodexState();

  const intro = `
    <p class="bc">Bonecrusher: The locks are open, so we can finally say it plainly. The codex
    burst at the Fracture. Its eight pages blew up the wire and landed in your Seattle, each one
    disguised as a cassette tape. We can hear them. Each page hums for one hour a day.</p>
    <p class="sb">skybreaker: eight seals!! each one wakes at its own hour!! solve a seal while
    it's awake and it tells you WHERE ITS PAGE IS HIDING. real places!! shoes required!!
    grown-up required!! SNACKS REQUIRED!!</p>
    <p class="mono dim">PAGES RECOVERED: ${codexSolvedCount()} OF 8 · seals open on the hour, for the hour</p>`;

  const cards = CODEX_HUNT.map((seal, i) => {
    if (state.codex[i]) {
      return `<article class="seal done">
        <h3>✓ ${seal.title}</h3>
        <div class="seal-reveal">
          <p class="mono seal-site">📼 PAGE ${seal.page} — ${seal.siteName}</p>
          <p class="mono dim">${seal.address}</p>
          <p>${seal.canonNote}</p>
          <p class="seal-hide">${seal.hideHint}</p>
          ${seal.reveal.map(([w, t]) => `<p class="${w}">${w === 'bc' ? 'Bonecrusher: ' : 'skybreaker: '}${t}</p>`).join('')}
        </div>
      </article>`;
    }
    if (!sealOpen(seal)) {
      return `<article class="seal sealed">
        <h3>🔒 ${seal.title}</h3>
        <p class="seal-riddle">${seal.hourRiddle}</p>
        <p class="mono seal-timer" data-seal="${i}">SEAL WAKES IN ${fmtMs(nextWindow(seal))}</p>
      </article>`;
    }
    return `<article class="seal live" id="seal-${i}">
      <h3>⏳ ${seal.title} <span class="seal-open-tag">AWAKE THIS HOUR</span></h3>
      ${seal.coach.map(([w, t]) => `<p class="${w}">${w === 'bc' ? 'Bonecrusher: ' : 'skybreaker: '}${t}</p>`).join('')}
      <div class="p-widget" id="codex-widget-${i}"></div>
      <form class="answer-row" data-seal="${i}">
        <input type="text" autocomplete="off" spellcheck="false" placeholder="speak to the seal…" aria-label="seal answer">
        <button type="submit">UNSEAL</button>
      </form>
      <p class="feedback" id="seal-fb-${i}"></p>
      <details class="hints"><summary>the coaches lean in…</summary>
        ${seal.hints.map((h, k) => `<details class="hint"><summary>hint ${k + 1}</summary><p>${h}</p></details>`).join('')}
      </details>
    </article>`;
  }).join('');

  wrap.innerHTML = intro + cards;

  CODEX_HUNT.forEach((seal, i) => {
    if (!state.codex[i] && sealOpen(seal)) {
      mountCodexWidget(seal, i);
      const form = $(`form[data-seal="${i}"]`);
      if (form) form.addEventListener('submit', e => {
        e.preventDefault();
        tryCodexAnswer(i, $('input', form).value);
      });
    }
  });
}

function tryCodexAnswer(i, guess) {
  const seal = CODEX_HUNT[i];
  const fb = $(`#seal-fb-${i}`);
  if (seal.answers.includes(djb2(normalize(guess)))) {
    solveCodexSeal(i);
  } else if (fb) {
    fb.textContent = 'Bonecrusher: The seal considered that carefully and said no. It is a polite seal. Try again.';
    fb.className = 'feedback bad';
    FX.buzz();
  }
}

function solveCodexSeal(i) {
  ensureCodexState();
  state.codex[i] = true;
  save();
  const seal = CODEX_HUNT[i];
  FX.chime(); FX.warp();
  FX.speak(seal.reveal[0][1], seal.reveal[0][0]);
  $('#modal-title').textContent = `📼 PAGE ${seal.page} LOCATED — ${seal.siteName.toUpperCase()}`;
  $('#modal-body').innerHTML = `
    <p class="mono dim">${seal.address}</p>
    <p>${seal.canonNote}</p>
    <div class="lesson">${seal.hideHint}</div>
    ${seal.reveal.map(([w, t]) => `<p class="${w}">${w === 'bc' ? 'Bonecrusher: ' : 'skybreaker: '}${t}</p>`).join('')}
    ${codexSolvedCount() === 8
      ? '<p class="mono unlock-note">📖 ALL EIGHT PAGES LOCATED. THE CODEX CAN BE REBUILT. THE DOOR IS WATCHING THE COUNTER.</p>'
      : `<p class="mono unlock-note">📖 ${codexSolvedCount()} OF 8 PAGES LOCATED</p>`}`;
  $('#modal').classList.add('show');
  renderAll();
}

/* ---------------- eight unique widgets -------------------------- */
function mountCodexWidget(seal, i) {
  const box = $(`#codex-widget-${i}`);
  if (!box) return;
  ({ laps: wLaps, confetti: wConfetti, shadow: wShadow, flashes: wFlashes,
     piggy: wPiggy, moons: wMoons, jukebox: wJukebox, anachronism: wAnachronism })[seal.widget](box, seal, i);
}

/* 1 — lap counter */
function wLaps(box) {
  box.innerHTML = `
    <div class="lap-card mono">ONE LAP = 2.8 MILES<br>THE TRAVELER'S NIGHT = 131.6 MILES</div>
    <button type="button" id="lap-btn">🛼 SKATE A LAP</button>
    <span class="mono" id="lap-count">laps: 0</span>
    <p class="mono dim">(you can skate them all if you want. or you can do the math. she did both.)</p>`;
  let laps = 0;
  $('#lap-btn', box).addEventListener('click', () => {
    laps++; FX.typeTick();
    $('#lap-count', box).textContent = 'laps: ' + laps;
    if (laps === 47) {
      $('#lap-count', box).textContent = 'laps: 47 — THE LAKE APPROVES. type the number, as a word.';
      FX.chime();
    }
  });
}

/* 2 — confetti catch */
function wConfetti(box, seal, i) {
  const LETTERS = 'FOURTHAVENUE'.split('');
  box.innerHTML = `
    <div class="confetti-stage" id="conf-stage"></div>
    <div class="chip-build mono" id="conf-build">&nbsp;</div>
    <button type="button" id="conf-start">🎉 START THE STORM</button>`;
  const stage = $('#conf-stage', box);
  const build = $('#conf-build', box);
  let caught = 0, running = false;
  function drop(letter, idx, delay) {
    setTimeout(() => {
      if (!stage.isConnected) return;
      const bit = document.createElement('div');
      bit.className = 'conf-bit' + (letter ? ' lettered' : '');
      bit.textContent = letter || ['◆', '●', '▮'][Math.floor(Math.random() * 3)];
      bit.style.left = (5 + Math.random() * 88) + '%';
      bit.style.animationDuration = (3.4 + Math.random() * 2) + 's';
      if (letter) {
        bit.addEventListener('click', () => {
          if (idx === caught) {
            caught++;
            build.textContent = LETTERS.slice(0, caught).join(' ');
            FX.typeTick();
            bit.remove();
            if (caught === LETTERS.length) FX.chime();
          } else { FX.buzz(); }
        });
      }
      stage.appendChild(bit);
      setTimeout(() => bit.remove(), 6000);
    }, delay);
  }
  $('#conf-start', box).addEventListener('click', () => {
    if (running) return;
    running = true;
    caught = 0; build.innerHTML = '&nbsp;';
    let t = 0;
    LETTERS.forEach((L, idx) => {
      drop(null, null, t); drop(null, null, t + 350);
      drop(L, idx, t + 700);
      t += 1500;
    });
    setTimeout(() => running = false, t + 5000);
  });
}

/* 3 — noon shadow dial */
function wShadow(box) {
  box.innerHTML = `
    <svg viewBox="0 0 240 240" class="shadow-dial">
      <circle cx="120" cy="120" r="110" fill="none" stroke="#3a2560" stroke-width="2"/>
      <text x="120" y="26" text-anchor="middle" class="dial-label">N</text>
      <text x="120" y="226" text-anchor="middle" class="dial-label">S</text>
      <text x="18" y="125" text-anchor="middle" class="dial-label">W</text>
      <text x="222" y="125" text-anchor="middle" class="dial-label">E</text>
      <circle cx="120" cy="120" r="7" fill="#ffd166"/>
      <line id="shadow-line" x1="120" y1="120" x2="120" y2="210" stroke="#9b8bb4" stroke-width="5" stroke-linecap="round"/>
      <text id="dial-word" x="120" y="126" text-anchor="middle" class="dial-word" opacity="0">HIGHNOON</text>
    </svg>
    <input type="range" id="shadow-slider" min="0" max="359" value="180" step="1">
    <p class="mono dim">drag the sun across the sky. the needle's shadow follows.</p>`;
  const line = $('#shadow-line', box);
  const word = $('#dial-word', box);
  $('#shadow-slider', box).addEventListener('input', e => {
    const sunDeg = +e.target.value;
    const shadowDeg = (sunDeg + 180) % 360;
    const rad = (shadowDeg - 90) * Math.PI / 180;
    line.setAttribute('x2', 120 + Math.cos(rad) * 90);
    line.setAttribute('y2', 120 + Math.sin(rad) * 90);
    const atNoon = shadowDeg > 262 && shadowDeg < 278; // shadow due north
    word.setAttribute('opacity', atNoon ? 1 : 0);
    line.setAttribute('stroke', atNoon ? '#ffd166' : '#9b8bb4');
    if (atNoon) FX.typeTick();
  });
}

/* 4 — lighthouse flash counter */
function wFlashes(box) {
  const WORD = 'LIGHTHOUSE';
  box.innerHTML = `
    <div class="lamp-row"><div class="lamp" id="alki-lamp"></div>
      <button type="button" id="alki-replay">▶ watch the light</button></div>
    <p class="mono dim">count the flashes in each burst. one flash = A, two = B, onward. bursts pause between letters.</p>
    <div class="cipher-key mono">${Array.from({length: 26}, (_, k) =>
      `<span class="ck">${String.fromCharCode(65 + k)}<b>${k + 1}</b></span>`).join('')}</div>`;
  const lamp = $('#alki-lamp', box);
  let timer = null;
  $('#alki-replay', box).addEventListener('click', () => {
    if (timer) { clearTimeout(timer); lamp.classList.remove('on'); }
    const seq = [];
    for (const ch of WORD) {
      const n = ch.charCodeAt(0) - 64;
      for (let f = 0; f < n; f++) { seq.push([true, 170]); seq.push([false, 200]); }
      seq.push([false, 1200]);
    }
    let k = 0;
    (function step() {
      if (k >= seq.length) { lamp.classList.remove('on'); timer = null; return; }
      const [on, ms] = seq[k++];
      lamp.classList.toggle('on', on);
      timer = setTimeout(step, ms);
    })();
  });
}

/* 5 — rachel the piggy bank */
function wPiggy(box) {
  box.innerHTML = `
    <div class="piggy-stage">
      <div class="piggy" id="piggy">🐷</div>
      <button type="button" id="coin-btn">🪙 offer a coin</button>
      <span class="mono" id="coin-count"></span>
    </div>
    <p class="riddle">「 Brass, not pink. 550 pounds, not fat — foundation. Since 1986 I have stood
    under the red clock and turned pocket change into groceries for the whole market's neighbors.
    Children sit on me. I allow it. My name is on my back. 」</p>`;
  let coins = 0;
  const LINES = ['*clink* she approves.', '*clink clink* the market thanks you.',
    '*clink* skybreaker: she LIKES you!!', '*clink* Bonecrusher: charitable. logged.'];
  $('#coin-btn', box).addEventListener('click', () => {
    coins++;
    FX.knock();
    const pig = $('#piggy', box);
    pig.classList.remove('bump'); void pig.offsetWidth; pig.classList.add('bump');
    $('#coin-count', box).textContent = LINES[(coins - 1) % LINES.length];
  });
}

/* 6 — moon phase dial */
function wMoons(box, seal, i) {
  const phases = [
    ['🌑', 'NEW MOON', true], ['🌒', 'WAXING CRESCENT', false], ['🌓', 'FIRST QUARTER', false],
    ['🌔', 'WAXING GIBBOUS', false], ['🌕', 'FULL MOON', false], ['🌖', 'WANING GIBBOUS', false],
    ['🌗', 'LAST QUARTER', false], ['🌘', 'WANING CRESCENT', false],
  ].sort(() => Math.random() - 0.5);
  box.innerHTML = `<div class="moon-row">${phases.map(([e, name, right]) =>
    `<button type="button" class="moon-btn" data-right="${right}" title="${name.toLowerCase()}">${e}</button>`).join('')}</div>
    <p class="mono" id="moon-fb">choose the phase that means gone, and coming back.</p>`;
  $$('.moon-btn', box).forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.right === 'true') {
      $('#moon-fb', box).textContent = 'the empty one. the one that comes back. type its name.';
      btn.classList.add('moon-glow');
      FX.chime();
    } else {
      $('#moon-fb', box).textContent = 'Bonecrusher: A fine moon, but not the one. The one we want looks like nothing and promises everything.';
      FX.buzz();
    }
  }));
}

/* 7 — the jukebox */
function wJukebox(box) {
  const ROTATION = [
    ['Shake Your Groove Thing', true], ['Ring My Bell', false], ['Knock On Wood', true],
    ['I Will Survive', false], ["Ain't No Stoppin' Us Now", true], ['Tragedy', true],
    ['We Are Family', false], ["Every 1's a Winner", true], ['One Nation Under a Groove', true],
    ['Boogie Wonderland', false], ['Night Fever', true],
  ];
  box.innerHTML = `<div class="juke">${ROTATION.map(([song, marquee], k) =>
    `<button type="button" class="juke-btn" data-m="${marquee}">${song}</button>`).join('')}</div>
    <p class="mono" id="juke-fb">the rotation, all eleven. light up the four the marquee never shows.</p>`;
  const picked = new Set();
  $$('.juke-btn', box).forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.m === 'true') {
      FX.buzz();
      $('#juke-fb', box).textContent = 'Bonecrusher: That one lights the marquee. S, K, A, T, E, O, N. Look darker.';
      return;
    }
    btn.classList.toggle('juke-lit');
    FX.typeTick();
    btn.classList.contains('juke-lit') ? picked.add(btn.textContent) : picked.delete(btn.textContent);
    if (picked.size === 4) {
      $('#juke-fb', box).textContent = 'skybreaker: FOUR!! now type the one that sounds like all six of us. one word.';
      FX.chime();
    }
  }));
}

/* 8 — the anachronism grid */
function wAnachronism(box) {
  const THINGS = [
    ['Space Needle', 1962, false], ['Pike Place Market', 1907, false], ['the Kingdome', 1976, false],
    ['Smith Tower', 1914, false], ['the Fremont Troll', 1990, true], ['the Gum Wall', 1993, true],
    ['the Great Wheel', 2012, true], ['the Monorail', 1962, false],
  ].sort(() => Math.random() - 0.5);
  box.innerHTML = `<div class="ana-grid">${THINGS.map(([name, yr, isNew]) =>
    `<button type="button" class="ana-btn" data-new="${isNew}"><span>${name}</span></button>`).join('')}</div>
    <p class="mono" id="ana-fb">a 1979 map drew all of these. it was wrong about three. tap the three.</p>`;
  const hits = new Set();
  $$('.ana-btn', box).forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.new !== 'true') {
      FX.buzz();
      $('#ana-fb', box).textContent = 'skybreaker: nope, that one was already standing in 1979!! older than the loop!!';
      return;
    }
    btn.classList.add('ana-glow');
    hits.add(btn.textContent);
    FX.typeTick();
    if (hits.size === 3) {
      $('#ana-fb', box).textContent = 'skybreaker: THE THREE TIME-TRAVELERS!! now type where the troll lives. one word, no spaces.';
      FX.chime();
    }
  }));
}

/* ---------------- ticker & wiring ------------------------------- */
let lastCodexHour = new Date().getHours();
setInterval(() => {
  if (!codexActive()) return;
  $$('.seal-timer').forEach(el => {
    const seal = CODEX_HUNT[+el.dataset.seal];
    el.textContent = 'SEAL WAKES IN ' + fmtMs(nextWindow(seal));
  });
  const h = new Date().getHours();
  if (h !== lastCodexHour) {
    lastCodexHour = h;
    renderCodex(); // seals wake and sleep on the hour
    const nowLive = CODEX_HUNT.findIndex((s, i) => !state.codex[i] && sealOpen(s));
    if (nowLive >= 0) {
      FX.popupSound();
      roguePiece([
        ['sb', `a seal just WOKE UP!! ${CODEX_HUNT[nowLive].title.toLowerCase()}!! one hour!! GO GO GO!!`],
        ['bc', 'One hour, as she says. The wire listens on the hour, for the hour. I have started the stopwatch. I am the stopwatch.'],
      ], '⏳ A SEAL IS AWAKE');
    }
  }
}, 1000);

/* TIMELORD: production bypass for hour gates (not documented for kids) */
let codexBuf = '';
document.addEventListener('keydown', e => {
  if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
  if (e.key.length === 1) codexBuf = (codexBuf + e.key.toUpperCase()).slice(-8);
  if (codexBuf.endsWith('TIMELORD')) {
    codexBuf = '';
    hourBypass = !hourBypass;
    FX.warp();
    roguePiece([['bc', hourBypass
      ? 'Hour gates disengaged. I saw nothing. I logged nothing. The incident log is on a break.'
      : 'Hour gates re-engaged. The seals resume keeping respectable hours.']], '⌛ MAINTENANCE MODE');
    renderCodex();
  }
});

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
