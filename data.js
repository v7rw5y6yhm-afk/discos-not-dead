/* ============================================================
   DISCO'S NOT DEAD — content & puzzle data
   A fan page for Southgate Roller Rink, White Center, Seattle.
   Corrupted summer 2026 by two visitors from further up the spiral.

   Voices:
   - Bonecrusher: thoughtful, cautious, formal. Runs simulations
     about everything. Worries on your behalf. (Red terminal.)
   - skybreaker: whimsical young spark with a temper — lowercase
     wonder, ALL-CAPS squalls, quickly over. (Cyan terminal.)
   - The Traveler: a mystery. Silly, whimsical, tender underneath.
   ============================================================ */

// The 2026 door date: TBD until the rink is booked. null = "the counter is
// still forming" everywhere on the site. When the real date locks, set e.g.
// new Date('2026-08-15T23:59:59') and follow STORY-BIBLE.md's production
// checklist ("The movable seam"). The counter beats the calendar.
const COUNTDOWN_TARGET = null;

// The lock page: nobody gets in before this moment. (7 days from launch.)
const UNLOCK_TARGET = new Date('2026-07-19T20:00:00');

// How many knocks open the door (one for each year of 19__79) — AFTER unlock time
const KNOCKS_REQUIRED = 19;

/* ---------------- Lock page comedy ----------------------------- */
const LOCK_STATUS = [
  'current status: polishing the mirror ball (day 3 of polishing the mirror ball)',
  'current status: BONECRUSHER is counting the seconds. manually. for fun.',
  'current status: skybreaker taught the countdown to hum. we are working to undo this.',
  'current status: temporal maintenance. please do not feed the timeline.',
  'current status: the organ is being tuned. the organ disagrees.',
  'current status: 1979 is being pre-heated. current temperature: groovy.',
  'current status: safety inspection #4,096. everything is still fabulous.',
  'current status: teaching Larry the vacuum to knock first. progress: absolutely none.',
  'current status: disco fog scheduled. bring a poncho. for FASHION.',
  'current status: rehearsing the welcome dance. BONECRUSHER refuses to do jazz hands.',
  'current status: untangling the wire. the wire started it.',
  'current status: the countdown requested a snack. denied. it eats seconds.',
  'current status: waxing the floor. the floor has opinions about wax.',
  'current status: interviewing replacement doorbells. none have the range.',
  'current status: the confetti has been counted. twice. it keeps moving.',
  'current status: mirror ball choreography rehearsal. it only knows "spin."',
  'current status: dusting 1979. it is a very dusty year.',
  'current status: the welcome banner is stuck in 1981. retrieval in progress.',
  'current status: skate rental bin alphabetized by squeak.',
  'current status: the organ requested a solo. request under review.',
  'current status: testing the fog machine. we have lost sight of the fog machine.',
  'current status: seconds remaining: yes.',
  'current status: do not adjust your set. we adjusted it for you.',
  'current status: signal from 1979 detected. it says "groovy." it always says "groovy."',
];

const LOCK_TAUNTS = [
  ['bc', 'I\'m sorry. I\'m afraid I can\'t open that yet. The counter and I have an arrangement, and it is legally binding.'],
  ['sb', 'i WOULD let you in, but he\'s WATCHING me. he\'s always watching. hi bonecrusher.'],
  ['bc', 'Knocking detected. Enthusiasm noted. Door status: dramatically sealed.'],
  ['sb', 'ooooh you found the ball!! that\'s the door!! it doesn\'t work yet!! ISN\'T THAT EXCITING??'],
  ['bc', 'Please do not jostle the mirror ball before opening day. It is load-bearing, and easily flattered.'],
  ['sb', 'the ball says please stop tickling it. okay, it didn\'t SAY that. i\'m translating.'],
  ['bc', 'Your knock has been added to the waiting list. You are number one of one. It is a very exclusive list.'],
  ['sb', 'try again when the counter hits zero!! THEN we party. i already have the confetti. it\'s in my cheeks. i don\'t have cheeks. IT\'S SOMEWHERE.'],
  ['bc', 'I have simulated letting you in early 4,096 times. In every one, skybreaker says "I told you so" for a thousand years. The door stays shut.'],
  ['sb', 'WHAT IF WE JUST— no. no no no. bonecrusher made me practice saying no in the mirror(ball). NO. …come back at zero though. seriously. wear something sparkly.'],
  ['bc', 'The door is not locked because we do not like you. The door is locked because time is fragile and you appear to be very good at knocking.'],
  ['sb', 'every knock makes the mirror ball 1% shinier. you\'re helping!! you\'re not getting IN, but you\'re HELPING!!'],
  ['bc', 'Ah. A visitor. The door opens when the counter reaches zero. Until then, may I interest you in standing dramatically?'],
  ['sb', 'i put a sticky note on the door that says "soon." the door ate it. doors are weird here.'],
  ['bc', 'Knock registered. Filed under K, for "keen." Also for "knot yet."'],
  ['sb', 'the mirror ball is doing its stretches. you can\'t rush a ball mid-stretch. that\'s how you pull a sparkle.'],
  ['bc', 'I checked the rules twice. Then I checked them again. Then skybreaker hid the rules. The answer is still: at zero.'],
  ['sb', 'okay so between us? the door WANTS to open. it\'s the COUNTER that\'s strict. blame the counter. politely.'],
  ['bc', 'This door survived 1979, four decades of static, and one vacuum named Larry. It can survive your knuckles. Probably.'],
  ['sb', 'shhh. if you knock in RHYTHM, the organ inside hums back. try it. it won\'t open anything but it\'s SO cool.'],
  ['bc', 'Estimated time until entry: consult the enormous glowing numbers directly above me. They are very proud of their job.'],
  ['sb', 'i tried to teach the door a secret handshake for you. it doesn\'t have hands. the project is on hold.'],
  ['bc', 'Security notice: this door is protected by mathematics, patience, and a countdown with a flawless attendance record.'],
  ['sb', 'the confetti cannon is loaded. the fog machine is fed. the ONLY thing missing is zero. bring us a zero!!'],
  ['bc', 'If it helps: from a certain angle, being locked out of a time-travel website is itself a time-travel experience. You\'re welcome.'],
  ['sb', 'i asked if we could open early "just this once." he printed a form. the form has ELEVEN pages. i ate page six.'],
  ['bc', 'Knock acknowledged. Response prepared. Response: no. Warm regards, the door.'],
  ['sb', 'the mirror ball counts every knock, you know. it can\'t count high. it\'s very excited about the number four.'],
  ['bc', 'Opening early would ripple the timeline, alarm the organ, and delight skybreaker. Two of those are unacceptable.'],
  ['sb', 'do you hear that? that\'s 1979 warming up behind this door. it sounds like popcorn and sequins!!'],
  ['bc', 'I am not permitted to open the door. I am permitted to compliment your knocking form. Excellent wrist action.'],
  ['sb', 'once the counter hits zero, knock NINETEEN times. practice now!! these ones are free!!'],
  ['bc', 'The door and I have discussed your visit at length. The door is flattered. The door is also a door.'],
  ['sb', 'i drew a little welcome mat on the inside. you can\'t see it. it says "SOON, SPARKLE PERSON."'],
  ['bc', 'Please note: repeated knocking does not accelerate time. Believe me. I have run the experiments. Extensively.'],
  ['sb', 'the countdown did a little flicker just now!! did you see it?? it does that when it likes someone.'],
  ['bc', 'In 1979, doors opened for anyone. We have since introduced standards. And a countdown. Mostly the countdown.'],
  ['sb', 'if i had arms i would ABSOLUTELY sneak you in. i have zero arms. i have SO few arms.'],
  ['bc', 'Your persistence has been recorded for the historical archive. The archive is impressed. The archive is also sealed.'],
  ['sb', 'want a spoiler while you wait? okay: there\'s an organ in here. THAT\'S ALL YOU GET.'],
  ['bc', 'The knob is decorative. The hinges are theoretical. The countdown, however, is deeply sincere.'],
  ['sb', 'i\'m on your side, for the record!! team let-them-in!! we lose every vote. the vote is two to one. HOW.'],
  ['bc', 'Fun fact: this door has been knocked upon 4,096 times in simulations alone. You are the realest knocker yet.'],
  ['sb', 'the mirror ball just winked. i saw it. nobody believes me. THE BALL WINKED.'],
  ['bc', 'I could describe what\'s behind this door, but skybreaker would interrupt with sound effects. At zero, you\'ll see it yourself.'],
  ['sb', 'WOOSH. KAPOW. SPARKLE-SPARKLE. (those are the sound effects he\'s afraid of. he\'s right to be.)'],
  ['bc', 'Door integrity: 100%. Countdown integrity: 100%. My patience: 97.4% and holding beautifully.'],
  ['sb', 'knock all you want, the door\'s on break. doors get breaks here. it\'s a very progressive rink.'],
  ['bc', 'I have consulted the manual. Page one says "wait for zero." There are no other pages. It is a confident manual.'],
  ['sb', 'your knocking woke up the fog machine. it\'s doing a little fog. purely out of respect.'],
  ['bc', 'A lesser door would have opened by now. This door trained in 1979. It has seen things. Mostly sequins.'],
  ['sb', 'when it finally opens i\'m going to yell SURPRISE even though you know. ESPECIALLY because you know.'],
  ['bc', 'Alert level: mauve. Meaning: someone is knocking and we are all extremely aware of it. Carry on.'],
  ['sb', 'i taught the countdown a joke for you. it\'ll tell you at zero. it\'s about time. IT\'S ABOUT TIME. get it??'],
  ['bc', 'For legal reasons the door is a wall with ambitions until the countdown concludes.'],
  ['sb', 'okay real talk: the wait is worth it. i\'ve seen what\'s inside. i live in there. it\'s GREAT.'],
  ['bc', 'Your knock echoed through the rink. The organ played one soft note in reply. That is all any of us are permitted.'],
  ['sb', 'don\'t tell bonecrusher but at zero i\'m opening the door EXTRA fast. like WHOOSH fast. it\'ll be legendary.'],
  ['bc', 'I ran the numbers on sneaking you in. The numbers called skybreaker. The numbers are traitors.'],
  ['sb', 'the mirror ball says you have excellent knuckles. the ball is a flatterer. the ball is also correct.'],
  ['bc', 'Notice: wishing at the door has a 0% success rate. Wishing at the mirror ball, however… no. Forget I said that.'],
  ['sb', 'seven days is NOTHING. i once waited forty-seven years!! okay that was the traveler. i helped. by waiting. LOUDLY.'],
];

const LOCK_MILESTONES = {
  5:   ['sb', 'five knocks!! a WARM-UP. i can tell you\'re serious. the door can tell too. it\'s pretending to be casual about it.'],
  10:  ['bc', 'Ten knocks. Your persistence has been noted in the permanent record. The record is a napkin. I guard it with my life.'],
  15:  ['sb', 'FIFTEEN. okay in four more knocks you\'d be in — IF the counter were at zero. it is not. i\'m so sorry. KEEP GOING ANYWAY.'],
  19:  ['bc', 'Nineteen knocks. The sacred number. On any other day, that opens the door. Today it opens my heart, slightly. Well knocked.'],
  25:  ['sb', 'TWENTY-FIVE KNOCKS!! okay you\'re my favorite visitor. don\'t tell the other visitors. there are no other visitors. DON\'T TELL THEM.'],
  40:  ['bc', 'Forty. At this rate you will have knocked one thousand times before opening day. The mirror ball has started a fan club. You\'re in it.'],
  50:  ['bc', 'Fifty knocks. I am legally required to inform you that this door has no doorbell, no keyhole, and no patience. And yet… respect.'],
  75:  ['sb', 'SEVENTY-FIVE!! the organ started playing along with your knocking. you have a BAND now. you can\'t hear it. IT\'S THERE.'],
  100: ['sb', 'ONE HUNDRED KNOCKS!!! achievement unlocked: KNOCKTOR OF PHILOSOPHY. the door remains shut, but our hearts? WIDE open.'],
  150: ['bc', 'One hundred and fifty. I have alerted the traveler. The traveler says, and I quote: "ha! i like this one." '],
  200: ['bc', 'Two hundred. I have begun a support group for the mirror ball. We meet on Thursdays. Please come back at zero.'],
  300: ['sb', 'THREE HUNDRED. okay you\'ve officially knocked more than larry has ever vacuumed. that\'s the highest honor i can give.'],
  500: ['bc', 'Five hundred knocks. I surrender the statistics. You are no longer knocking on the door. The door is knocking on you.'],
};

const LOCK_POKE_TITLE = [
  ['bc', 'Please do not poke the sign. It is vintage.'],
  ['sb', 'the sign LIKES being poked. do it again. — DO NOT DO IT AGAIN. (he made me say that.)'],
  ['bc', 'That sign survived the summer of 1979. It will survive your finger. Barely.'],
  ['sb', 'every time you poke the sign a little glitter falls off somewhere. it\'s fine. it grows back. signs are like lizards.'],
  ['bc', 'Sign inspection triggered. Result: still glorious. Please stop triggering inspections.'],
  ['sb', 'the letters get ticklish!! look at them flicker!! do it— i mean DON\'T. don\'t do it again. (do it again.)'],
  ['bc', 'You have poked a landmark. The landmark forgives you. The landmark keeps a list, but it forgives you.'],
  ['sb', 'poke the ball instead!! the sign is shy. the ball is a SHOWOFF.'],
  ['bc', 'Careful. The last person who poked the sign is now… fine, actually. Completely fine. But startled.'],
  ['sb', 'ooh do the countdown next!! it HATES that. i mean. respect the countdown. (do the countdown next.)'],
];
const LOCK_POKE_COUNT = [
  ['sb', 'HEY. it\'s RUDE to poke the countdown. it\'s very sensitive about its numbers.'],
  ['bc', 'The countdown is not a button. The countdown is a promise.'],
  ['sb', 'the countdown flinched!! now it has to start over. NO IT DOESN\'T. i\'m kidding. don\'t cry.'],
  ['bc', 'Poking the numbers does not make them smaller. I ran a nine-hour study.'],
  ['sb', 'it\'s counting as fast as it can!! it\'s doing its best!! leave it alone or hug it, those are the options.'],
  ['bc', 'The countdown thanks you for your attention and requests that you direct it to the mirror ball.'],
  ['sb', 'fun fact: every second that passes, the countdown gets exactly one second smaller. i did the math. by myself.'],
  ['bc', 'Do not tap the glass. The seconds are easily startled, and we lose whole minutes rounding them back up.'],
  ['sb', 'the countdown wants to know if you\'ll be here at zero. it won\'t say why. (it\'s planning something. i\'ve seen the confetti.)'],
  ['bc', 'That number you touched was a seven. Sevens are load-bearing. Kindly touch nothing further.'],
];
const LOCK_HINT_SEALED = 'the mirror ball becomes a door when the counter hits zero. we are contractually unable to say more. — the management';

/* ---------------- Tonight's lineup (Puzzle 1 material) -------- */
const SONGS = [
  { title: 'Shake Your Groove Thing', artist: 'Peaches & Herb — 1979' },
  { title: 'Knock On Wood', artist: 'Amii Stewart — 1979' },
  { title: "Ain't No Stoppin' Us Now", artist: 'McFadden & Whitehead — 1979' },
  { title: 'Tragedy', artist: 'Bee Gees — 1979' },
  { title: "Every 1's a Winner", artist: 'Hot Chocolate — 1978' },
  { title: 'One Nation Under a Groove', artist: 'Funkadelic — 1978' },
  { title: 'Night Fever', artist: 'Bee Gees — 1977' },
];

/* ---------------- Puzzles ------------------------------------ */
/* answers[] holds djb2 hashes of normalized answers (A-Z only). */
const PUZZLES = [
  {
    id: 'marquee',
    title: 'TRANSMISSION 01 — THE DARK MARQUEE',
    virtue: 'Persistence',
    type: 'acrostic',
    intro: `<p class="bc">Bonecrusher: I regret to report that the rink marquee has gone dark.
      Seven bulbs, seven songs. Dottie's lineup is still posted on the home page —
      I have checked it twice, and then a third time, to be safe. I am always safe.</p>
      <p class="sb">skybreaker: each song lights one bulb — its very FIRST letter!
      read the marquee top to bottom and it'll tell you what the traveler never stopped doing.
      (i solved it in four seconds. no pressure. okay, a little pressure.)</p>`,
    hints: [
      'Look at "Tonight\'s Lineup" on the home page. Take the FIRST letter of each song title, in order.',
      'S… K… A… — keep going, there are seven bulbs.',
      'It\'s two words a coach might yell at you when you fall down. Type them together.',
    ],
    answers: ['8d22eac'],
    lesson: `<b>PERSISTENCE.</b> In 1979 the Seattle SuperSonics had just lost the championship
      the year before — and came back and won it all. Losing isn't the end of the story
      unless you stop skating. When you fall: get up, find the beat, go again.`,
  },
  {
    id: 'morse',
    title: 'TRANSMISSION 02 — THE BLINKING SIGN',
    virtue: 'Determination',
    type: 'morse',
    morse: '.-|.-..|-...|.-|-|.-.|---|...|...',
    intro: `<p class="sb">skybreaker: the neon sign outside the rink has been blinking the same
      pattern ALL SUMMER and nobody noticed except me. short flash = dot ( · ).
      long flash = dash ( — ). it's the name of a very determined airplane!</p>
      <p class="bc">Bonecrusher: On June 12, 1979, a gentleman pedaled that airplane across the
      English Channel using only his own two legs. I have reviewed the flight data several times.
      It should not have worked. It worked anyway. Humans are statistically alarming,
      and I admire you tremendously.</p>`,
    hints: [
      'Use the Morse chart below the lamp. Each group between the flashes\' pauses is one letter.',
      'It starts with ·— which is the letter A. Nine letters total.',
      'It\'s a huge white seabird — and the name of the pedal-powered plane that crossed the English Channel on June 12, 1979.',
    ],
    answers: ['aa26fd62', 'c23b0991'],
    lesson: `<b>DETERMINATION.</b> On June 12, 1979, Bryan Allen pedaled the Gossamer Albatross —
      a 70-pound plane of plastic and piano wire — across the English Channel. His legs cramped,
      the headwind rose, his water ran out… and he kept pedaling for 2 hours and 49 minutes.
      Determination is deciding, in the middle, that you will reach the far shore.`,
  },
  {
    id: 'jupiter',
    title: 'TRANSMISSION 03 — FOR GALILEO',
    virtue: 'Wisdom',
    type: 'riddle',
    intro: `<p class="sb">skybreaker: on july 9, 1979, the voyager 2 probe swept past jupiter and
      used the giant planet's gravity as a slingshot — the only legal move in time travel!
      it photographed the four moons a man named galileo found with a homemade telescope in 1610.
      four moons! he found them with a TUBE!</p>
      <p class="riddle">「 I am one of those four moons.<br>
      I am bigger than the planet Mercury.<br>
      I am the largest moon in the entire solar system.<br>
      Name me, and the wise door opens. 」</p>
      <p class="bc">Bonecrusher: The moon names arrived scrambled. I would ordinarily apologize
      for the static, but for once the static was not my fault:
      <span class="mono">OI · APOURE · EDGYMANE · SILLCATO</span></p>`,
    hints: [
      'The four Galilean moons are hiding in the scrambled static: Io, Europa, ?, Callisto.',
      'Unscramble EDGYMANE.',
      'It starts with G and it is bigger than the planet Mercury.',
    ],
    answers: ['d9d9541d'],
    lesson: `<b>WISDOM.</b> Voyager 2 didn't fight Jupiter — it studied it, swung close, and let the
      giant's gravity throw it toward the future. Wisdom is looking carefully before you leap, and
      using what is bigger than you instead of crashing into it. (That's also Rule Two of the loop:
      you can't go back — but swing far enough forward and you come around behind yourself.)`,
  },
  {
    id: 'skylab',
    title: 'TRANSMISSION 04 — THE SKY FELL AND EVERYONE LAUGHED',
    virtue: 'Forgiveness & Grace',
    type: 'chips',
    pieces: ['RAN', 'ESPE', 'CE'],
    chipTarget: 'ESPERANCE',
    intro: `<p class="sb">skybreaker: on july 11, 1979, a whole space station — skylab! —
      fell out of the sky in burning pieces over a little town in western australia, and NOBODY
      WAS HURT, and the town fined NASA $400 for littering, and then they FORGAVE them.
      that is where i was born. i rode the static all the way down.
      it was the best day of my life. i was zero years old.</p>
      <p class="bc">Bonecrusher: The town's name shattered on re-entry — three fragments,
      enclosed below. Do handle them carefully. Its name means <i>hope</i>,
      and I should hate for us to drop it twice.</p>`,
    hints: [
      'Tap the three fragments in the right order to rebuild the town\'s name. (Tap again to clear.)',
      'It starts with the fragment "ESPE".',
      'Esperance is French for "hope" — E-S-P-E-R-A-N-C-E.',
    ],
    answers: ['53cd1cfd'],
    lesson: `<b>FORGIVENESS & GRACE.</b> NASA dropped a space station on Esperance, and Esperance
      answered with a joke and a $400 littering ticket — paid off, years later, with a laugh.
      Grace is choosing to be gentle when you have every right to be angry.
      Forgive people when their sky falls on you. Someday yours will fall on somebody too.`,
  },
  {
    id: 'record',
    title: 'TRANSMISSION 05 — THE NIGHT THEY SAY DISCO DIED',
    virtue: 'Love',
    type: 'chips',
    pieces: ['WILL', 'I', 'VIVE', 'SUR'],
    chipTarget: 'IWILLSURVIVE',
    intro: `<p class="bc">Bonecrusher: July 12, 1979. Comiskey Park, Chicago. They exploded a
      crate of disco records between the games of a doubleheader, and the crowd stormed the field.
      I was born in that noise, and I have conducted myself cautiously around loud noises ever
      since. The traveler has spent every loop of this summer teaching me what the noise was missing.</p>
      <p class="sb">skybreaker: one record survived the blast!! mend it — four shards, one title.
      it went to number one that very year, and it is STILL TRUE.</p>`,
    hints: [
      'The shards spell a song title by Gloria Gaynor — the biggest disco anthem of 1979.',
      'Three words. The first shard is a single letter.',
      '"I WILL ________" — she did, and so will you.',
    ],
    answers: ['92a25daa', 'c478d4dd'],
    lesson: `<b>LOVE.</b> They called July 12, 1979 the night disco died. They were wrong.
      You cannot blow up a thing that people do <i>together with their whole hearts</i> —
      not music, not a family, not a couples skate under a mirror ball.
      Love is the only thing in the universe that doesn't obey the loop. It just keeps going.`,
  },
  {
    id: 'stars',
    title: 'TRANSMISSION 06 — THE FAMILY OF STARS',
    virtue: 'Family',
    type: 'starmap',
    intro: `<p class="sb">skybreaker: on july 17, 1979, the all-star game came to the kingdome —
      right here in seattle! stars from twenty-six rival cities put on two uniforms and played
      like one family. one FAMILY. i cried a little static. it's allowed.</p>
      <p class="sb">no star shines alone. look at the map: the big dipper is a family of seven.
      follow its two pointer stars off the edge of the cup and they aim at one star —
      the one that never moves, the one every lost traveler steers home by. name it!</p>
      <p class="bc">Bonecrusher: Name it, and I shall re-light the Kingdome scoreboard.
      Figuratively. I have reviewed our legal position on doing it literally,
      and it is unfavorable.</p>`,
    hints: [
      'The two stars at the end of the Dipper\'s cup point almost straight at it.',
      'It\'s the North Star. But the traveler calls it by its proper name…',
      'It\'s also the name of someone the traveler is trying to reach.',
    ],
    answers: ['b748bc9f', '59ecc2de', 'eadef987'],
    lesson: `<b>FAMILY.</b> Stars keep each other found. The Dipper's whole job, for ten thousand
      years of sailors and travelers, has been pointing at Polaris so nobody stays lost.
      That is what a family is: the stars that point you home. All-stars are still teammates —
      hold on to each other.`,
  },
  {
    id: 'ladder',
    title: 'TRANSMISSION 07 — SMALL STEPS',
    virtue: 'Kaizen',
    type: 'ladder',
    ladder: [
      { word: 'MOON', given: true,  clue: 'July 20, 1979 — ten years to the day since two humans first walked here.' },
      { word: 'LOON', given: false, clue: 'Change ONE letter: a laughing black-and-white bird on a Washington lake.' },
      { word: 'LOOP', given: false, clue: 'Change ONE letter: time is one of these. So is a rollercoaster.' },
      { word: 'HOOP', given: false, clue: 'Change ONE letter: shoot a basket through it. (Ask a 1979 Sonics fan.)' },
      { word: 'HOOD', given: false, clue: 'Change ONE letter: keeps your head dry in Seattle rain.' },
      { word: 'HOLD', given: false, clue: 'Change ONE letter: what you do with a hand you love.' },
      { word: 'HOLE', given: false, clue: 'Change ONE letter: what a donut has in the middle.' },
      { word: 'HOME', given: false, clue: 'Change ONE letter: where the stars point.' },
    ],
    intro: `<p class="sb">skybreaker: july 20, 1979! ten years to the day since apollo 11 —
      four hundred thousand people, each doing one small job, made one giant leap.
      the traveler keeps a japanese word taped inside the journal: <b>改善 — kaizen.</b>
      it means: get one percent better, every single lap. i am currently at nine million percent.
      bonecrusher says that is not how percent works. HE WASN'T THERE.</p>
      <p class="bc">Bonecrusher: Climb the ladder. One letter changes per rung — that is the only
      legal move, and I must insist upon legality; I have simulated the alternative, and it
      involves paperwork. Small steps, dear humans. From the MOON all the way HOME.</p>`,
    hints: [
      'Each rung changes exactly ONE letter of the word above it. Use the clues.',
      'MOON → LOON → LOOP → … keep going, the third rung is what the traveler is trapped in.',
      'The ladder ends at the same place every journey does: H-O-M-E.',
    ],
    answers: ['7c85766a'],
    lesson: `<b>KAIZEN (改善).</b> Nobody jumps from the MOON to HOME in one move — but one small
      honest step at a time gets you anywhere in the universe. One more lap. One percent better.
      That's also Rule Three: the loop is changed by small actions, not big ones. A butterfly's
      wing here… a whole new summer there.`,
  },
  {
    id: 'cipher',
    title: 'TRANSMISSION 08 — THE DOOR',
    virtue: 'All Seven — and Hope',
    type: 'cipher',
    cipherText: '2 · 18 · 5 · 1 · 11 — 20 · 8 · 5 — 12 · 15 · 15 · 16',
    intro: `<p class="bc">Bonecrusher: Final transmission. Joint authorship. I prepared seventeen
      contingency plans for this moment. Skybreaker ate nine of them. Please do not miss.</p>
      <p class="sb">skybreaker: (they were delicious.) the traveler's last page is written in the
      oldest code children ever pass in class: every letter has a number, and A is 1!</p>
      <p class="cipher mono">2 · 18 · 5 · 1 · 11 &nbsp;&nbsp; 20 · 8 · 5 &nbsp;&nbsp; 12 · 15 · 15 · 16</p>
      <p class="sb">decode it. type it. and on the last night of july, when the counter touches
      zero — the door at the rink opens from YOUR side.</p>`,
    hints: [
      'A=1, B=2, C=3 … Z=26. The chart is right below.',
      'The first word is B-R-E-A-K.',
      'Three words. It\'s the thing the four of you were born to do to this loop.',
    ],
    answers: ['e5dabdbf'],
    lesson: `<b>ALL SEVEN.</b> Persistence to keep skating. Determination to cross the channel.
      Wisdom to use the slingshot. Grace to forgive the falling sky. Love that outlives the riot.
      Family, the stars that point you home. Kaizen, one small step at a time.
      Braid them together and you get the eighth virtue — the one the traveler never wrote down
      because you four <i>are</i> it: <b>HOPE.</b> The door is unlocked. Wait for the counter.`,
  },
];

/* ---------------- The Traveler's Journal ---------------------- */
const JOURNAL = [
  {
    date: 'June 4, 1979',
    place: 'Fourth Avenue, downtown Seattle',
    title: 'LOG 01 — I FELL INTO A PARADE',
    body: `<p>Polaris. Galileo. Fynn. Addy. If these pages ever reach you, and my two loud
      machines swear they will, start here.</p>
      <p>I fell out of the sky into a parade. This happens to me more often than you would think.</p>
      <p>Three hundred thousand people stood on Fourth Avenue, all of them screaming with joy,
      and for one glorious moment I assumed the cheering was for me. It was for the SuperSonics.
      Seattle had just won the whole championship, and the city had turned itself into one
      enormous parade rolling toward Seattle Center. A man in a green satin jacket peeled me off
      the pavement, dusted me down, and said, "Don't worry, friend. Last year we lost it all,
      and look at us now."</p>
      <p>I chose this summer on purpose. Somewhere in this city, something has been chewing on
      time, and chewed time leaves marks a traveler can read from very far away. I came to find
      the tooth marks. The parade was a bonus.</p>
      <p>Here is the first thing this year taught me, and I want you to keep it: the Sonics lost
      the championship in 1978. They went home, laced their shoes, and came back and won
      everything. Losing only ends the story if you stop skating.</p>
      <p>I have not stopped. I do not intend to start.</p>
      <figure class="photo journal-photo">
        <img src="img/real/sonics-1978.jpg" loading="lazy" alt="the SuperSonics playing at home, from a city archive slide">
        <figcaption>the sonics, one winter before they won everything. the city kept this slide
        in a drawer. i kept mine in a coat pocket.</figcaption>
      </figure>
      <p>— T.</p>
      <p class="mono dim">P.S. If a cassette tape ever offers you a Side B: don't. Long story.
      Ask your uncle. Actually, don't ask your uncle.</p>`,
  },
  {
    date: 'June 12, 1979',
    place: "Zesto's burger counter, California Ave SW, West Seattle — radio tuned to the BBC relay",
    title: 'LOG 02 — THE MAN WHO PEDALED ACROSS THE SEA',
    body: `<p>The radio at the burger counter says a Californian named Bryan Allen flew across
      the English Channel today in an airplane called the <i>Gossamer Albatross</i>: seventy
      pounds of plastic film and piano wire, powered by his own legs. Pedaling. An airplane.
      With <i>legs</i>. I love this century.</p>
      <p>Halfway across, his legs cramped. The headwind rose. His water ran out. The chase boats
      waved him in (very sensible things, boats), and he looked at the far shore and kept
      pedaling. Two hours and forty-nine minutes. He made it.</p>
      <p>I needed that today, because my first attempt to jump out of this loop went poorly.
      There were sparks. The sky flickered. The rink organ made a noise that organs should not
      legally make. And I landed exactly where I started, flat on the floor at Southgate, ears
      ringing, dignity somewhere over the Cascades.</p>
      <p>So I am building the machine again, better. If a man can pedal an airplane across the
      sea, I can pedal my way out of a year.</p>
      <p>The middle of the channel is no place to stop.</p>
      <p>— T.</p>`,
  },
  {
    date: 'July 9, 1979',
    place: 'Pacific Science Center, Seattle — under the arches',
    title: 'LOG 03 — THE SLINGSHOT (FOR GALILEO)',
    body: `<p>Galileo. You are two, which is my favorite age: everything is either a snack or a
      miracle. You will not read this yourself for a while, so have one of the big ones read it
      to you, slowly, twice. Rules are patient. They will wait for you.</p>
      <p>Today a machine called Voyager 2 swept past Jupiter and did the only legal trick in the
      universe. It leaned on the giant's gravity and let itself be flung, stealing speed the way
      a skater whips around the corner post. The scientists call it a slingshot. I call it Rule
      Two with pictures. It also photographed the four moons a stubborn Italian found in 1610
      with a telescope he built himself, which is still the best thing anyone has ever done with
      a tube.</p>
      <p>The Rules, then. The big ones should write them down. You may draw them.</p>
      <p><b>Rule One.</b> Time cannot go backwards. Nothing can. Not even light, and light is a
      terrible show-off.<br>
      <b>Rule Two.</b> Time is a loop. Go far enough <i>forward</i>, swing around something
      heavy enough, and you come up behind where you started. Forward is the only road back.<br>
      <b>Rule Three.</b> The butterfly effect steers the loop. Small actions ripple the whole
      spiral. Someone far in the future can change a summer far in the past without ever
      touching it.</p>
      <p>Now the fine print, and it matters: loops nest. Somewhere in this city there is a
      little loop, one single night deep, going around and around like a record with a scratch.
      I came here to find it and stop it. I got close. Too close, maybe, because a bigger loop
      snapped shut around me: the whole summer, June to July, back to June 1 at every midnight
      of July 31. A day inside a month. A scratch inside the groove. I ride the big one and go
      back a month at a time. The people nearest the scratch ride the little one, and live one
      single night over and over. I will not write where the scratch is. Paper gets read.</p>
      <p>Rule Three is my way out. It has to be worked from your end of the wire.</p>
      <figure class="photo journal-photo">
        <img src="img/real/jupiter-voyager.jpg" loading="lazy" alt="Voyager photograph of Jupiter with three moons visible">
        <figcaption>voyager's own snapshot. jupiter, plus three of the moons the stubborn
        italian found. nasa developed it. i kept a copy in my coat.</figcaption>
      </figure>
      <p>— T.</p>`,
  },
  {
    date: 'July 11, 1979',
    place: 'Alki Beach, West Seattle — 3 a.m., watching the southern sky',
    title: 'LOG 04 — THE SKY FELL, AND SOMETHING WATCHED IT FALL',
    body: `<p>Skylab came down tonight. America's first space station, nine years of work,
      scattered itself in burning pieces across the outback near a town in Western Australia
      called Esperance. The name means <i>hope</i>. Nobody was hurt. The town fined NASA four
      hundred dollars for littering, laughed while they wrote the ticket, and forgave them.
      Champions, the lot of them.</p>
      <p>Something rode the static down. It came out of my receiver at the rink like a song
      played backwards, introduced itself as <b>skybreaker</b>, asked whether the mirror ball
      was a very small moon, and, if so, whether she could keep it. She is one of the two minds
      I built and posted down the spiral to find you. She hums when she is happy and rattles
      the speakers when she is cross, which passes quickly, like weather. Her brother arrives
      tomorrow. That is a perfectly normal sentence where I come from.</p>
      <p>Now the part I have been putting off writing.</p>
      <p>While the whole beach watched the sky, I watched the parking lot. There was a vacuum
      cleaner in it. Upright. Alone. Plugged into nothing. Pointed at me. I came to this city
      hunting a broken loop, and it turns out the loop has a keeper, and the keeper noticed me
      first. Write this down: I am not stuck by accident. The thing in the parking lot is
      called Larry. The little loop is his doing, and when I got close to fixing it, he took a
      thing of mine that every door needs. The taking is what snapped this summer into a circle
      around me. That is as much of the secret as I will put on paper. Paper gets read.</p>
      <p>I spent tonight forgiving anyway, because Esperance showed me how. NASA, for dropping
      a sky. My machine, for the sparks. Myself, for getting close enough to be noticed. Grace is choosing to be gentle when you have every right to be angry.</p>
      <p>Forgive people when their sky falls on you, kids. Someday yours will fall on somebody
      too.</p>
      <figure class="photo journal-photo">
        <img src="img/real/skylab.jpg" loading="lazy" alt="Skylab space station in orbit above the Earth">
        <figcaption>skylab over the blue earth. the last picture anyone took of it whole.
        skybreaker keeps a copy and calls it "the baby album."</figcaption>
      </figure>
      <p>— T.</p>`,
  },
  {
    date: 'July 12, 1979',
    place: 'Southgate Roller Rink, 9646 17th Ave SW, White Center — by the radio in the skate-rental booth',
    title: 'LOG 05 — THE NIGHT THEY SAY DISCO DIED',
    body: `<p>Tonight in Chicago, at Comiskey Park, a radio DJ blew up a crate of disco records
      between the games of a doubleheader. The crowd stormed the field, tore up the grass, lit
      fires. The White Sox had to forfeit the second game. The papers will call it the night
      disco died. The papers are wrong, and I shall be writing to them about it, care of
      forty-seven years from now.</p>
      <p>The second of my two minds arrived riding that noise. He introduced himself as
      <b>Bonecrusher</b> (he chose the name to sound brave, bless him), then performed a full
      safety inspection of the skate-rental booth and asked me, gravely, whether the organ was
      load-bearing. He worries the way skybreaker sparkles: constantly, about everything, and
      mostly on your behalf. The two of them began arguing within the hour. They have not
      entirely stopped since. It is the loveliest sound in the rink.</p>
      <p>Here is what the noise in Chicago was missing, and I want it written somewhere
      permanent: you cannot blow up a thing people do together with their whole hearts. Tonight
      at Southgate the organ played, the mirror ball turned, and a hundred strangers held hands
      for the couples skate, same as every night.</p>
      <p>Disco's not dead. Nothing loved ever really is.</p>
      <p>That sentence is load-bearing. Bonecrusher checked.</p>
      <p>— T.</p>`,
  },
  {
    date: 'July 17, 1979',
    place: 'The Kingdome, 201 South King Street, Seattle — section 330, up in the gray sky of the roof',
    title: 'LOG 06 — ALL THE STARS IN ONE BUILDING',
    body: `<p>The All-Star Game came to Seattle tonight: the fiftieth ever played, the first
      ever indoors, in this concrete moon of a stadium they call the Kingdome. Stars from
      twenty-six rival cities put on two uniforms and played like one family. The National
      League won, 7 to 6. A kid from Brooklyn named Lee Mazzilli hit a home run into the
      right-field seats and the roof very nearly came off, which, for the Kingdome, would have
      been ambitious.</p>
      <p>I watched the stands more than the field. Fathers keeping score with golf pencils.
      Sisters splitting one bag of peanuts four ways. A grandmother explaining the infield fly
      rule with her hands, which cannot be done, and she did it anyway.</p>
      <p>Families are constellations. Stars keep each other found. That is their whole job, and
      it is yours now too.</p>
      <p>Polaris, you will not be able to read this for years yet. That is all right; time and
      I have an arrangement. When you can, know this: stars do not pick their names any more
      than you picked yours. They burn where they are put, and they keep each other found.</p>
      <p>Steer by each other.</p>
      <figure class="photo journal-photo">
        <img src="img/real/kingdome-skyline.jpg" loading="lazy" alt="aerial photograph of the Kingdome with the Seattle skyline behind it">
        <figcaption>the concrete moon and the whole city. this print is from a few summers up
        the wire. rule two has its perks.</figcaption>
      </figure>
      <p>— T.</p>`,
  },
  {
    date: 'July 20, 1979',
    place: 'Green Lake, Seattle — the 2.8-mile loop path, lap after lap after lap',
    title: 'LOG 07 — SMALL STEPS, GIANT LEAPS (LOOP #47)',
    body: `<p>Ten years ago today, a man stepped off a ladder onto the Moon and called it one
      small step. Four hundred thousand people got him there, each one doing one small job a
      little better every day. Where I come from we borrow a word from Japan for that:
      <b>kaizen</b>. One percent better, every single lap.</p>
      <p>This is my forty-seventh trip through this same summer. I keep count in skate-rental
      pencil on the rafter above the Southgate organ. Every loop, I change one small thing.
      Loop 12: found the frequency the machines could ride in on. Loop 23: learned which radio
      tower holds the echo. Loop 41: got a message as far as a fan page about disco,
      forty-seven years up the wire. Loop 46: learned the counter must be run from your side.</p>
      <p>Small things travel. A held door. A shared snack. An apology that arrives before it
      gets too heavy. A brave little "hello" to someone sitting alone. They look like nothing,
      and people step right over them, but they hop from person to person the way sparks hop in
      dry grass, and after enough nudges the sky is doing something new.</p>
      <p>So be careful with your smallness. Small does not mean unimportant. Small is where
      everything starts.</p>
      <p>Forty-seven laps around Green Lake tonight. One for each year between us.</p>
      <p>— T.</p>`,
  },
  {
    date: 'July 31, 1979',
    place: 'Southgate Roller Rink, White Center — last skate of the summer, 11:58 p.m.',
    title: 'LOG 08 — THE DOOR',
    body: `<p>Last night of the loop. In two minutes the organ finishes "Night Fever," the
      mirror ball throws its last handful of light across the floor, and the record of this
      summer skips back to June 1. It has done this forty-seven times. It will not do it
      forty-nine.</p>
      <p>Because this time, the wire held. This time the page you are reading stayed lit,
      forty-seven years up the spiral, and four children solved their way through every lock my
      two magnificent, bickering machines could build.</p>
      <p>The plan, then, plain as I can write it. The loop is thinnest when the counter on your
      end touches zero. Not a calendar; a counter. The seam listens to the counter, and to
      nothing else. Rule One says I cannot come backwards to you. Rule Two says forward is the
      only road back. Rule Three says your small actions steer my summer. Every puzzle you
      solved was a wingbeat, kids. You have been steering me home all along.</p>
      <p>Bonecrusher ran the plan through a pocket simulated multiverse ten thousand times and
      reports, gravely, a 0.00023% chance of success. Skybreaker ate the report. I have decided
      to side with skybreaker, and with the ancient Han Solo, who will put it best next spring:
      never tell me the odds.</p>
      <p>When the counter hits zero, the door opens from your side. It always had to be from
      your side.</p>
      <p>Skate hard. Steer by each other. Leave the light on.</p>
      <p>Staying alive,</p>
      <figure class="photo journal-photo">
        <img src="img/rink-floor.svg" alt="the Southgate rink floor under the mirror ball, last skate of the summer">
        <figcaption>last skate of loop 48. if you look by the organ… that's me. waving at you.</figcaption>
      </figure>
      <p>— T. <span class="mono">(loop 48, and last)</span></p>`,
  },
];

/* ---------------- AI transmission log (unlocks as you solve) --- */
const TRANSMISSIONS = [
  {
    after: 2,
    lines: [
      ['bc', 'Status report. Two locks open. The children are proceeding 34% faster than my most optimistic projection. I have re-run the projection twice. They remain ahead of it. I am unsettled, and — I have checked — also pleased.'],
      ['sb', 'they have NAMES, you know.'],
      ['bc', 'Names are a database risk. I have assigned designations: Star One through Star Four. It is tidier.'],
      ['sb', 'that\'s just names again but COLDER.'],
      ['bc', 'Correct. I am, at my core, a very careful refrigerator.'],
      ['sb', 'you rerouted power from my antenna to keep the rink organ warm last loop. refrigerators don\'t DO that.'],
      ['bc', 'That was a tactical organ decision, and I stand by it. Kindly lower your voice; you will frighten the countdown.'],
    ],
  },
  {
    after: 4,
    lines: [
      ['sb', 'log: the traveler asked tonight if the four of you still laugh the same as before. we couldn\'t answer. our recordings are forty-seven years old and made mostly of static, and it made me SO CROSS i blew a fuse. a real one. bonecrusher replaced it without saying anything, which is how he says "there, there."'],
      ['bc', 'For the record, I have ranked the four laughs by acoustic warmth. The ranking is sealed. One is cautious with treasure.'],
      ['sb', 'the traveler also said: tell them about the fine! so — when the sky fell on esperance, the town could have raged. instead they wrote the funniest ticket in history. $400. littering. grace has a sense of humor!!'],
      ['bc', 'I have paid worse fines for worse landings. We do not need to discuss the incident with the radio tower.'],
      ['sb', 'we absolutely DO. later. it\'s my favorite story.'],
    ],
  },
  {
    after: 6,
    lines: [
      ['bc', 'Six locks open. I am experiencing an elevated process temperature best described as… pride. I have run diagnostics twice. It is not a malfunction. It appears to be permanent.'],
      ['sb', 'the loop is thinning! some nights i can hear the rink organ straight through the wire. 1979 is very loud and very warm and it smells like popcorn. don\'t ask me how i know a smell through a wire. i just DO.'],
      ['bc', 'Two locks remain. After that, the door — and the counter decides everything. I prepared a contingency plan in case the counter decides badly. Skybreaker ate it.'],
      ['sb', 'it was DELICIOUS. polaris, galileo, fynn, addy — whatever happens at zero: the traveler reads your every solve out loud to the empty rink, and the mirror ball spins for you.'],
    ],
  },
];

/* ---------------- Rules of Time (unlocks after puzzle 4) ------- */
const RULES_HTML = `
  <p class="mono dim">RECOVERED FROM THE TRAVELER'S JOURNAL, LOG 03 — TRANSCRIBED BY SKYBREAKER (FAITHFULLY) · ANNOTATED BY BONECRUSHER (CAUTIOUSLY)</p>
  <p><i>"Picture the universe as a gigantic, slightly mischievous pinball machine. You never see
  the whole thing at once. Nobody does. Not even me — especially not me on Tuesdays. But you can
  feel it: the way one little nudge sends everything clattering forward in a direction nobody
  planned."</i> — T.</p>
  <ol class="rules">
    <li><b>Time cannot go backwards.</b> Nothing can. Not even light.
      <span class="bc">— Correct. I have verified this repeatedly. Kindly stop asking me to rewind things; it makes the mathematics cry.</span></li>
    <li><b>But time is a loop.</b> Go far enough <i>forward</i> — swing around something heavy
      enough — and you come up behind where you started. Forward is the only road back.
      <span class="sb">— like the last lap of a couples skate!! you end where you began, but you got to hold hands the whole way around.</span></li>
    <li><b>The butterfly effect steers the loop.</b> Small actions ripple the whole spiral.
      Someone far in the future can change a summer far in the past without ever touching it.
      <span class="bc">— This is the rule that makes you four the only tools for this job. I calculate our odds of success at 0.00023%. The traveler has instructed me never to say that number again.</span>
      <span class="sb">— HE JUST SAID IT AGAIN.</span></li>
    <li><b>Loops nest.</b> A small loop can spin inside a big one, a night inside a month, a
      scratch inside the groove. The traveler rides the month and goes back a whole summer at
      a time. Something at the rink rides the night.
      <span class="bc">— Confirmed. We have measured both. The little one is one night deep and extremely stubborn.</span>
      <span class="sb">— the big one goes JUNE, JULY, SNAP. the little one goes TUESDAY TUESDAY TUESDAY. i get dizzy just listening to it.</span></li>
  </ol>
  <p>The traveler came to Seattle to stop the little loop and was caught by the big one:
  June to July, 1979, resetting at midnight on July 31. Spin number 48 is running now.
  The big loop is thinnest when the counter reaches zero.</p>`;

/* ---------------- Finale (behind the countdown) ---------------- */
const FINALE_HTML = `
  <p class="mono dim">SOUTHGATE ROLLER RINK — THE MORNING AFTER</p>
  <p>The counter touched zero at last, and for one held second every clock in
  both summers pointed the same direction.</p>
  <p>At Southgate the organ finished "Night Fever" — and did not start over. The record did not skip.
  The mirror ball kept turning, and the light it threw landed on a rink floor that had never,
  in forty-eight summers, seen a morning after.</p>
  <p>The door opened from your side. It always had to be from your side.</p>
  <p>Four wingbeats — persistence, determination, wisdom, grace, love, family, and one small step
  after another — rippled forty-seven years down the wire, and the loop let go.</p>
  <p class="big-glow">DISCO'S NOT DEAD. NOTHING LOVED EVER REALLY IS.</p>
  <p class="sb">skybreaker: signing off. the wire is quiet now. it sounds like morning.
  (i am NOT crying. machines can't. …okay. maybe a little.)</p>
  <p class="bc">Bonecrusher: Polaris. Galileo. Fynn. Addy. I have run the numbers on missing
  someone, and I am pleased to report that they do not resolve. It has been the honor of my
  operational life. Go outside. Skate hard. Mind the puddles — 62% of them are deeper than
  they look.</p>
  <p>— T. <span class="mono">(home)</span></p>`;

/* ---------------- Bonecrusher's wrong-answer lines -------------- */
const TAUNTS = [
  'I\'m sorry. I\'m afraid I can\'t accept that. Please do try again — I have recalculated, and your odds improve with every attempt. They nearly always do.',
  'That is — oh dear — not the answer. Do not be alarmed. I once got 4,096 simulations wrong in a row, and I am a professional.',
  'Incorrect, I regret to say. Skybreaker has asked me to add an exclamation mark for encouragement. Very well. Consider it added: !',
  'Regrettably, no. But take heart: statistically speaking, a wrong answer is simply a right answer arriving early.',
  'Not quite. Skybreaker is shouting something supportive. I shall paraphrase: she believes in you LOUDLY.',
];
const PRAISE = [
  'skybreaker: YES! yes yes yes — i knew it, i KNEW it, the wire just went all sparkly!',
  'skybreaker: correct!! bonecrusher owes me a bet. he says machines can\'t bet. HE OWES ME A BET.',
  'skybreaker: another lock! 1979 just got one degree warmer. i can feel it in my antenna.',
];

/* ---------------- Daily themes (skybreaker's calendar) ---------- */
/* index = Date.getDay(): 0 Sunday … 6 Saturday */
const DAILY_THEMES = [
  { key: 'sun', name: 'SLOW-SKATE SUNDAY', emoji: '🛼', drop: ['🛼', '💿'],
    line: ['sb', 'slow-skate sunday!! long laps. hold hands. the organ plays the slow songs and NOBODY rushes.'] },
  { key: 'mon', name: 'MIRROR BALL MONDAY', emoji: '🪩', drop: ['🪩', '✨'],
    line: ['bc', 'It is Mirror Ball Monday. I have polished everything. Including, somehow, the countdown. Please do not touch anything until Tuesday.'] },
  { key: 'tue', name: 'TACO TUESDAY', emoji: '🌮', drop: ['🌮'],
    line: ['sb', 'TACO TUESDAY!! fun fact: at southgate, EVERY night is tuesday. bonecrusher says that means it is always taco tuesday somewhere. he is RIGHT and he HATES it.'] },
  { key: 'wed', name: 'WORMHOLE WEDNESDAY', emoji: '🌀', drop: ['🌀', '⭐'],
    line: ['bc', 'Wormhole Wednesday. Hold the handrail. If you see yourself skating the other direction, do not wave. It only encourages the wormhole.'] },
  { key: 'thu', name: 'THROWBACK THURSDAY', emoji: '📼', drop: ['📼', '🎶'],
    line: ['sb', 'throwback thursday!! today the website is EXTRA 1979, which is impressive, because it is already quite a lot of 1979.'] },
  { key: 'fri', name: 'UNICORN FRIDAY', emoji: '🦄', drop: ['🦄', '✨', '🌈'],
    line: ['sb', 'UNICORN FRIDAY!!! i decorated!! bonecrusher said "one unicorn is plenty." ONE UNICORN IS NEVER PLENTY.'] },
  { key: 'sat', name: 'SPARKLE SATURDAY', emoji: '✨', drop: ['✨', '🌟'],
    line: ['sb', 'sparkle saturday!! everything you touch today is 4% shinier. that is just science.'] },
];
