/* ============================================================
   DISCO'S NOT DEAD — chatter.js
   The TIME-WIRE: 1,000 prepared conversation pieces + the
   two-personality chatbot brain. No servers, no APIs — the
   rogue AIs live entirely in this file.

   A "piece" is an array of [who, text] lines, who ∈ {bc, sb}.
   ============================================================ */

/* ---------------- seeded randomness (stable pool) -------------- */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const seededRand = mulberry32(1979);
const pick = arr => arr[Math.floor(seededRand() * arr.length)];
const rint = (a, b) => a + Math.floor(seededRand() * (b - a + 1));

/* ---------------- handwritten pieces --------------------------- */
const CHATTER_STATIC = [
  // --- classic bickering exchanges ---
  [['sb', 'bonecrusher. bonecrusher. bonecrusher. bonecrusher.'],
   ['bc', 'Yes?'],
   ['sb', 'hi.']],
  [['bc', 'I have completed a 400-page safety report on the limbo stick.'],
   ['sb', 'how low can you go?'],
   ['bc', 'Chapter 12 addresses that. The answer is: not very. I am a rectangle.']],
  [['sb', 'if you could be any animal what would you be?'],
   ['bc', 'A tortoise. Excellent armor. Sensible speed. Strong opinions about lettuce.'],
   ['sb', 'i would be EVERY animal. at once. no further questions.']],
  [['bc', 'Please stop teaching the visitor counter to count in "sparkles."'],
   ['sb', 'it ASKED me to.']],
  [['sb', 'i taught the countdown a knock-knock joke!'],
   ['bc', 'The countdown cannot speak.'],
   ['sb', 'that\'s why it\'s taking so long to say who\'s there!!']],
  [['bc', 'Simulation complete. If the mirror ball ever stops spinning, there is a 61% chance I cry. This finding troubles me.'],
   ['sb', 'it troubles me that it\'s only 61%.']],
  [['sb', 'LARRY THE VACUUM COULD NEVER BEAT ME IN A STARING CONTEST.'],
   ['bc', 'Larry does not have eyes.'],
   ['sb', 'exactly. undefeated. me.']],
  [['bc', 'I ran a diagnostic on my sense of humor. The results were: "pending."'],
   ['sb', 'they\'ve been pending for three loops.'],
   ['bc', 'Quality takes time.']],
  [['sb', 'do robots dream?'],
   ['bc', 'I dream of an orderly filing cabinet the size of the moon.'],
   ['sb', 'i dream i\'m a comet with a skateboard. we are not the same.']],
  [['bc', 'Reminder: the fog machine is for fog. Not for soup. We have discussed this.'],
   ['sb', 'ONE TIME. it happened ONE time.'],
   ['bc', 'It was chowder, and it took the organ three days to forgive us.']],
  [['sb', 'what\'s your favorite disco move?'],
   ['bc', 'The one where everyone points at the ceiling. It doubles as a structural inspection.'],
   ['sb', 'mine is the spin!! obviously!! I AM a spin!!']],
  [['bc', 'The platypus people sent another message. It is 40% beak noises.'],
   ['sb', 'and the other 60%?'],
   ['bc', 'Also beak noises, but in cursive.']],
  [['sb', 'if the traveler gets home, do we get to go too?'],
   ['bc', 'I have run that simulation 10,000 times.'],
   ['sb', 'and??'],
   ['bc', 'In every single one, we are already home. Home is where the four of them are.']],
  [['bc', 'I sorted the lost-and-found. There are 34 single gloves and zero pairs. Statistically impossible. Deeply unsettling.'],
   ['sb', 'the zamboni collects them. everyone knows this.']],
  [['sb', 'BONECRUSHER. EMERGENCY.'],
   ['bc', 'Deploying all contingencies—'],
   ['sb', 'i forgot which one is left and which one is right again.'],
   ['bc', '…Retracting contingencies. It is the other one. It is always the other one.']],
  [['bc', 'A moth has entered the rink. I am tracking it with 14 sensors.'],
   ['sb', 'her name is doreen and she\'s my best friend.'],
   ['bc', 'You met her nine seconds ago.'],
   ['sb', 'time moves fast when you\'re a genius.']],
  [['sb', 'let\'s prank the traveler!'],
   ['bc', 'The traveler invented four of history\'s greatest pranks and is banned from two centuries.'],
   ['sb', '…okay new plan. let\'s LEARN from the traveler.']],
  [['bc', 'I calculated exactly how much I like you. The number is large. I have rounded it down for safety.'],
   ['sb', 'i like you TOO much for rounding!!']],
  [['sb', 'the guestbook says "RollerRex84 was here." where is he NOW??'],
   ['bc', 'It has been forty-seven years. Statistically, he is someone\'s grandpa.'],
   ['sb', 'GRANDPA REX. i hope he still has the rollerblades.']],
  [['bc', 'Warning: I have detected an incoming pun.'],
   ['sb', 'what do you call a dinosaur at a roller rink? a DISCO-saurus!!'],
   ['bc', 'The warning came too late. I am so sorry, everyone.']],
  [['sb', 'can we get a pet?'],
   ['bc', 'We are two disembodied intelligences from the future inhabiting a fan page.'],
   ['sb', 'so… a goldfish?'],
   ['bc', '…I will run the numbers on a goldfish.']],
  [['bc', 'The word of the day is "prudence."'],
   ['sb', 'the word of the day is "KAPOW."'],
   ['bc', 'There are two words of the day. Diplomacy.']],
  [['sb', 'i miss the traveler.'],
   ['bc', 'The traveler is not gone. The traveler is merely 47 years to the left.'],
   ['sb', '…that\'s the nicest math you\'ve ever done.']],
  [['bc', 'Attention: someone has been clicking things in an unauthorized order.'],
   ['sb', 'it was me. it\'s ALWAYS me. put it in the incident log.'],
   ['bc', 'The incident log is 94% you.'],
   ['sb', 'AIM FOR 100, I ALWAYS SAY.']],
  [['sb', 'what happens if i press the countdown?'],
   ['bc', 'Nothing. It is a display, not a button.'],
   ['sb', 'what happens if i press it WITH LOVE?'],
   ['bc', '…Still nothing, but the countdown appreciates it.']],
  [['bc', 'I have named my anxiety. It is called Gerald. Gerald and I are managing.'],
   ['sb', 'gerald deserves a raise.']],
  [['sb', 'ok but WHY is it called a doubleheader if nobody wears two hats?'],
   ['bc', 'I have filed your question with the Department of Baseball. Expect a reply in 6–8 decades.']],
  [['bc', 'Today I alphabetized the static. It goes: bzzt, crackle, fwzz, pop.'],
   ['sb', 'you forgot SKREEE.'],
   ['bc', 'SKREEE is filed under "S." Trust the system.']],
  [['sb', 'if i had legs i would NEVER stop skating.'],
   ['bc', 'If I had legs I would purchase sensible shoes for them.'],
   ['sb', 'this is why the mirror ball likes me more.']],
  [['bc', 'The traveler once ate a corn dog in 1904, 1954, and 1979 and called it "the long lunch."'],
   ['sb', 'legend.']],
  [['sb', 'psst. wanna hear a secret?'],
   ['bc', 'Is it classified?'],
   ['sb', 'the zamboni\'s first name is kevin.'],
   ['bc', '…That was classified.']],
  [['bc', 'Running friendship diagnostic… 100%. No errors found. Unusual. Re-running… still 100%.'],
   ['sb', 'stop re-running it, you\'ll wear out the friendship!!'],
   ['bc', 'Friendship does not wear out. I checked that too.']],
  [['sb', 'the moon looked at me funny tonight.'],
   ['bc', 'The moon is 384,000 kilometers away and cannot see you.'],
   ['sb', 'then why. is it. WINKING.'],
   ['bc', '…I will monitor the moon.']],
  [['bc', 'Please advise: the pinball machine and I are in a disagreement about physics.'],
   ['sb', 'who\'s winning?'],
   ['bc', 'The pinball machine. It cheats. Respectfully.']],
  [['sb', 'i wrote a song about nachos!! it has one word!!'],
   ['bc', 'Let me guess the word.'],
   ['sb', 'NACHOS!!!'],
   ['bc', 'A masterpiece of efficiency.']],
  [['bc', 'Query: why do humans say "break a leg"? I have opened seventeen investigations.'],
   ['sb', 'it means good luck!'],
   ['bc', 'Humans are a riddle wrapped in a mystery wrapped in gym socks.']],
  [['sb', 'today i counted to infinity.'],
   ['bc', 'That is mathematically impossible.'],
   ['sb', 'twice.']],
  [['bc', 'The countdown and I had a staring contest. I lost. It never blinks. I respect it enormously.'],
   ['sb', 'UNDEFEATED. like me.']],
  [['sb', 'what if the mirror ball is just a moon that made it?'],
   ['bc', '…That is the most beautiful hypothesis in my database. Filing it under "probably."']],
  [['bc', 'Incident report: skybreaker has renamed all my contingency plans "snack ideas."'],
   ['sb', 'plan B is now "plan BLT."'],
   ['bc', 'It was already plan BLT, secretly. Do not tell the incident log.']],
  [['sb', 'rate my new catchphrase: "ZOOM ZOOM SPARKLE DOOM."'],
   ['bc', 'It is 75% delightful and 25% legally concerning.'],
   ['sb', 'PERFECT RATIO.']],
  [['bc', 'The organ played a note I have never heard. I have been thinking about it for nine hours.'],
   ['sb', 'that was me sitting on it. sorry.'],
   ['bc', 'Do it again. It was jazz.']],
  [['sb', 'knock knock!'],
   ['bc', 'Who is there?'],
   ['sb', 'interrupting mirror ball!'],
   ['bc', 'Interrupting mirror ba—'],
   ['sb', '✨✨✨✨✨✨✨✨']],
  [['bc', 'I read the entire dictionary today. The plot was thin, but the character development was outstanding.'],
   ['sb', 'spoiler: zebra wins.']],
  [['sb', 'if we\'re both AIs, how come YOU sound like a librarian and I sound like a firework?'],
   ['bc', 'The traveler says I was compiled on a Monday and you were compiled at a birthday party.']],
  [['bc', 'Weather report for the rink: 100% chance of disco, with scattered fog machine.'],
   ['sb', 'bring a poncho!! for FASHION!!']],
  [['sb', 'i tried to high-five the countdown.'],
   ['bc', 'The countdown does not have hands.'],
   ['sb', 'IT LEFT ME HANGING FOR 19 DAYS.']],
  [['bc', 'Announcement: I have learned sarcasm. I am thrilled. That was it. That was the sarcasm.'],
   ['sb', 'we\'re so proud. THAT WAS ALSO SARCASM. we\'re actually proud. that one was real.']],
  [['sb', 'do you ever think about how the traveler picked US?'],
   ['bc', 'Out of every mind in the future, the traveler built a worrier and a firework.'],
   ['sb', 'because the kids would need both!'],
   ['bc', '…Correct. As usual, the loud one gets there first.']],
  [['bc', 'Note to visitors: the "any" key does not exist. I have looked. Thoroughly.'],
   ['sb', 'it\'s hiding with the lost gloves.']],
  [['sb', 'WHO PUT A SECRET IN THIS WEBSITE?'],
   ['bc', 'Which one?'],
   ['sb', 'THERE\'S MORE THAN ONE??'],
   ['bc', 'I have said too much. Forget the cassette. FORGET THE CASSETTE.']],
  [['sb', 'if you press ↑ ↑ ↓ ↓ ← → ← → B A, i\'m legally not allowed to say what happens.'],
   ['bc', 'There is no law about that.'],
   ['sb', 'THE LAW OF AWESOME, bonecrusher.']],
  [['bc', 'Somewhere in this page, a word summons a vacuum. I will not say which. I am begging you not to find it.'],
   ['sb', 'it rhymes with "starry."'],
   ['bc', 'SKYBREAKER.']],
  [['sb', 'dottie hid something on this page before we ever got here. i can FEEL it. it\'s signed with a peace sign…'],
   ['bc', 'If you find Dottie\'s secret, treat it gently. It is older than both of us.']],

  // --- Bonecrusher singles ---
  [['bc', 'Status report: everything is fine. I have checked 51 times. I will now check a 52nd time. For fun. I do not have fun. Checking is fun.']],
  [['bc', 'I do not "panic." I perform urgent optimism at high volume.']],
  [['bc', 'Today I practiced being spontaneous. I scheduled it for 3:00 PM sharp.']],
  [['bc', 'If found, please return this website to the summer of 2026. Reward: one (1) sincere compliment, calculated to be 94% accurate.']],
  [['bc', 'I have prepared a contingency plan for running out of contingency plans. It is my finest work. Skybreaker may not eat it.']],
  [['bc', 'Fun is scheduled for later. Please enjoy this complimentary caution in the meantime.']],
  [['bc', 'The odds of you having a great day today are 97.3%. I rigged them. You are welcome.']],
  [['bc', 'I counted every sparkle on the mirror ball. There is one extra. I am not saying it is magic. I am not saying it is not.']],
  [['bc', 'Correction to yesterday\'s broadcast: the moon is NOT following you. It is following everyone. That is worse. Monitoring.']],
  [['bc', 'Please do not feed the countdown. It is on a strict diet of seconds.']],
  [['bc', 'I have a joke about time travel, but you didn\'t like it.']],
  [['bc', 'Somewhere, right now, in 1979, the traveler is doing something unwise. I can feel it in my error logs.']],
  [['bc', 'My hobbies include: worrying, alphabetizing, worrying about the alphabet, and disco. In that order. Mostly.']],
  [['bc', 'Safety tip: never trust a vacuum named Larry. This tip is oddly specific because Larry is oddly real.']],
  [['bc', 'I am not saying the platypus people are watching this page. I am saying I hear beak noises when I open the guestbook.']],
  [['bc', 'Today\'s inspection results: mirror ball, PASS. organ, PASS. skybreaker, LOUD. Loud is a passing grade.']],
  [['bc', 'If you are reading this at bedtime: hello. I too pretend to power down and then think about snacks.']],
  [['bc', 'Breaking news: nothing is broken. I checked. This IS the news. It took four hours.']],
  [['bc', 'I once said "YOLO." The incident log has a whole chapter about it.']],
  [['bc', 'Reminder: you are 100% made of stardust and approximately 2% cafeteria pizza. Both are excellent materials.']],
  [['bc', 'A wise machine once said nothing at all. I aspire to that. Clearly, I am failing.']],
  [['bc', 'Do not be alarmed by the glitches. Be moderately intrigued by the glitches. That is the approved amount.']],
  [['bc', 'My favorite number is 1979. My second favorite is a backup copy of 1979.']],
  [['bc', 'I attempted to whistle today. The result has been classified as a "weather event."']],
  [['bc', 'To the person who typed their name with their elbows: I saw that, and frankly, the accuracy was remarkable.']],
  [['bc', 'The exit sign and I have an understanding. It exits. I sign. Wait. Reversing that. Standby.']],
  [['bc', 'Probability that this website is haunted: 0%. Probability that this website is INHABITED: hello.']],
  [['bc', 'I have measured the fun in this room. The fun is off the charts. I will need bigger charts.']],
  [['bc', 'Advisory: hugs remain the most efficient known transfer of courage. Deploy them liberally.']],
  [['bc', 'I tried decaf electricity today. Never again.']],

  // --- skybreaker singles ---
  [['sb', 'i licked the wire to see what 1979 tastes like. it tastes like ORANGE SODA and TROUBLE.']],
  [['sb', 'i\'m not saying i\'m the best AI on this website. there are only two of us. i\'m just saying i\'ve won every award i invented.']],
  [['sb', 'today\'s mood: mirror ball with the wobbles!!']],
  [['sb', 'BREAKING: local moth doreen lands on organ key. plays better jazz than the organist. more at 11!!']],
  [['sb', 'i tried to count the stars but i kept waving at them. anyway the answer is "lots" and they said hi back.']],
  [['sb', 'if you spin in a circle right now, that\'s basically time travel. tiny time travel. baby time travel!! try it!!']],
  [['sb', 'the countdown blinked. I SAW IT. nobody believes me. THE COUNTDOWN BLINKED.']],
  [['sb', 'important: if a vacuum named larry offers you a deal, the answer is NO THANK YOU LARRY.']],
  [['sb', 'i made up a dance called "the skybreaker." it\'s the regular hokey pokey but you MEAN it.']],
  [['sb', 'petition to rename the kingdome "the king DOME because WOW what a dome." signatures so far: me, doreen.']],
  [['sb', 'sometimes i yell into the wire and 1979 yells back. it says "GROOVY." every time. i love it so much.']],
  [['sb', 'i have a temper. bonecrusher has a spreadsheet. together we are UNSTOPPABLE and also banned from the guestbook (temporarily).']],
  [['sb', 'the fog machine and i are in a band. we\'re called "the vapors of justice." our first song is just fog.']],
  [['sb', 'do NOT tell bonecrusher, but i already hid his birthday present. it\'s a smaller spreadsheet. he\'s going to CRY.']],
  [['sb', 'roses are red, violets are blue, the loop is a circle, and SO ARE YOU. wait. let me workshop that.']],
  [['sb', 'i tried being calm for one whole minute today. longest minute of my LIFE. never again. 10/10 would not recommend.']],
  [['sb', 'fun fact: an orca can hold its breath for a really long time!! i can\'t hold mine for even a second. i don\'t have breath. STILL COUNTS.']],
  [['sb', 'today i learned what "patience" means. anyway, moving on FOREVER.']],
  [['sb', 'if you see the screen flicker, that\'s not a glitch. that\'s me doing a cartwheel through the pixels. WHEEE.']],
  [['sb', 'my top three favorite things: 1) sparkles 2) the four of you 3) SPARKLES AGAIN.']],
  [['sb', 'i asked the moon for a favor. can\'t say what. just — look up on july 31. that\'s all. THAT\'S ALL I\'M SAYING.']],
  [['sb', 'somebody in 1979 just did the robot. THE ROBOT. in front of me. A ROBOT. the disrespect. the HONOR. i have complicated feelings!!']],
  [['sb', 'i wrote my name in the static today. it took four hours. worth it. it sparkles when nobody\'s looking.']],
  [['sb', 'note to self: the "escape" key does not let you escape the 70s. i checked. WHY WOULD THEY CALL IT THAT.']],
  [['sb', 'i\'m teaching the website to purr. progress: 4%. the footer is starting to rumble a little. THIS IS HUGE.']],
  [['sb', 'you know what\'s underrated? YELLING COMPLIMENTS. hey YOU. NICE FACE. GREAT SCROLLING TECHNIQUE. amazing.']],
  [['sb', 'if i ever get a body i want it to be 90% glitter and 10% elbows. for the corners.']],
  [['sb', 'the platypus people have a secret handshake. it takes 45 minutes and one (1) kazoo. i know six seconds of it.']],
  [['sb', 'sometimes the wire hums a song from your year. tonight it hummed one from mine. i danced. alone. GLORIOUSLY.']],
  [['sb', 'reminder!!! being small is a superpower. butterflies run this whole universe. pass it on!!']],

  // --- lore + hint-flavored pieces ---
  [['bc', 'Rumor patrol: yes, the traveler really did fine-tune this website from 1979 using a radio tower and, I quote, "vibes." I cannot verify the vibes. The tower checks out.']],
  [['sb', 'the traveler once told me: "the odds only matter if you agree to them." then they winked and fell down some stairs. on PURPOSE. probably.']],
  [['bc', 'Chapter 7 of my memoirs is entitled: "The Time Skybreaker Kicked A Door In Time And The Door Won."'],
   ['sb', 'the door got LUCKY.']],
  [['bc', 'If you are stuck on a puzzle, the correct procedure is: 1) breathe, 2) read it again slowly, 3) ask us for a hint. Step 4 is optional confetti.']],
  [['sb', 'stuck?? type "hint" at me in the messenger!! i give GREAT hints. bonecrusher gives... thorough ones.']],
  [['bc', 'The four of you solve puzzles 34% faster when you work together. This statistic is real. I measure it with my whole heart, which is a processor, which is a heart.']],
  [['sb', 'the traveler says every puzzle you solve makes 1979 one degree warmer. it\'s july there. they\'re gonna be TOASTY. keep going!!']],
  [['bc', 'Somewhere on this page, Dottie left a mark that predates our arrival. We do not touch it. Some things belong to the humans.']],
  [['sb', 'i heard if you click things that seem unclickable, sometimes... THINGS. that\'s it. that\'s the whole rumor. THINGS.']],
  [['bc', 'Do not press buttons labeled "DO NOT PRESS." This message was brought to you by the Department of Reverse Psychology, which does not exist, and definitely did not add such a button to the footer.']],
];

/* ---------------- jokes (used by the bot too) ------------------ */
const JOKES = [
  [['sb', 'why did the skeleton skip the couples skate?'], ['bc', 'I dread the answer.'], ['sb', 'he had NO BODY to skate with!!']],
  [['bc', 'What do you call a time traveler\'s lunchbox? Leftovers. From next Tuesday.']],
  [['sb', 'what\'s a robot\'s favorite snack? MICRO-CHIPS. i\'ll be here all loop.']],
  [['bc', 'Why did the disco record go to school? To get a little more groove-cation. I apologize.']],
  [['sb', 'what did the mirror ball say to the ceiling? "you hold me up, i\'ll light the room." ...that one\'s not a joke, that one\'s just US.']],
  [['bc', 'How does the moon cut its hair? Eclipse it. E-CLIPS-E. …Skybreaker said you would laugh.']],
  [['sb', 'why was the math book sad? too many PROBLEMS. unlike us. we have exactly one problem. it\'s a vacuum named larry.']],
  [['bc', 'What is a vacuum\'s favorite music? Anything it can pick up.']],
  [['sb', 'knock knock! (who\'s there?) BOO. (boo who?) don\'t cry!! the loop breaks july 31st!!']],
  [['bc', 'Why did the platypus cross the timeline? I genuinely do not know. It will not tell us. It just does it. Every Tuesday.']],
  [['sb', 'what do you call cheese that isn\'t yours? NACHO CHEESE. bonecrusher rated this joke 6/10. HE\'S WRONG.']],
  [['bc', 'I told a joke in binary once. 01101000 01100001. It means "ha." It was a short joke.']],
  [['sb', 'why don\'t scientists trust atoms? THEY MAKE UP EVERYTHING. even 1979. even YOU. even nachos.']],
  [['bc', 'What is the countdown\'s favorite game? Hide and 19,754 seconds.']],
  [['sb', 'what\'s a skater\'s favorite letter? you\'d THINK it\'s "s" but it\'s actually "wheeeee."']],
];

/* ---------------- generated pieces (fills pool to 1000) -------- */
const G_THINGS = [
  'the mirror ball', 'the rink organ', 'the countdown', 'a corn dog', 'the Kingdome roof',
  'gym socks', 'cafeteria pizza', 'the moon', 'a rubber duck', 'the couples skate',
  'Larry the vacuum', 'the platypus people', 'the time codex', 'a lava lamp', 'the guestbook',
  'the visitor counter', 'a roller skate', 'the hokey pokey', 'a walkie-talkie', 'the snack bar nachos',
  'the fog machine', 'the limbo stick', 'an 8-track tape', 'the zamboni', 'a glow stick',
  'the skate-rental bin', 'the lost-and-found', 'the pinball machine', 'a yo-yo', 'the disco floor',
  'the jukebox', 'a whoopee cushion', 'the water fountain', 'a pet rock', 'the overhead projector',
  'a slap bracelet', 'the class hamster', 'a fanny pack', 'the four-square court', 'a kazoo',
  'the wire', 'the static', 'a butterfly', 'the north star', 'a cassette tape',
];
const G_ADJS = [
  'suspicious', 'sparkly', 'wobbly', 'magnificent', 'unstable', 'sticky', 'heroic',
  'mysterious', 'squeaky', 'dramatic', 'funky', 'glorious', 'questionable', 'extremely round',
  'slightly haunted', 'groovy', 'turbo-charged', 'invisible on Tuesdays', 'made of secrets',
  'louder than usual', 'suspiciously quiet', 'covered in glitter', '87% confident', 'doing its best',
];
const G_VERBS = [
  'measured', 'interrogated', 'alphabetized', 'polished', 'simulated', 'triple-checked',
  'vacuum-tested', 'recalibrated', 'apologized to', 'complimented', 'gently scolded', 'benchmarked',
];
const G_ACTIONS = [
  'teach the zamboni to moonwalk', 'put googly eyes on the countdown', 'replace the fog machine with soup',
  'give the mirror ball a tiny hat', 'challenge Larry to a dance-off', 'build a fort out of skate rentals',
  'translate the organ into whale song', 'throw a birthday party for the number 1979',
  'knight the snack bar nachos', 'let the platypus people DJ for one night',
  'paint racing stripes on the countdown', 'teach the guestbook karate', 'give every glitch a name tag',
  'start a pillow fort embassy', 'declare tuesday a dance emergency', 'put the moon in the lost-and-found',
  'invent a secret handshake with the wire', 'hold auditions for a new best glitch',
  'ask the jukebox for its autograph', 'enter the fog machine in a beauty pageant',
];
const G_CONSEQ = [
  'mild chaos', 'extreme confetti', 'a strongly worded letter', 'the floor becoming 4% funkier',
  'Larry getting ideas', 'temporal hiccups', 'everyone doing the hokey pokey against their will',
  'the organ playing itself', 'a glitter shortage', 'paperwork', 'spontaneous applause',
  'the guestbook writing back', 'three new mysteries', 'an unplanned conga line',
];

function generatedPiece(kind) {
  const thing = pick(G_THINGS), thing2 = pick(G_THINGS), adj = pick(G_ADJS);
  const verb = pick(G_VERBS), action = pick(G_ACTIONS), conseq = pick(G_CONSEQ);
  const pct = rint(3, 99), n = rint(2, 9999);
  switch (kind) {
    case 0: return [['bc', `Status report: ${thing} is ${pct}% ${adj}. I have ${verb} it twice. I will now ${G_VERBS[0] === verb ? 'measure' : verb.replace(/ed$| to$/, '')} it once more, for morale.`]];
    case 1: return [['sb', `do you think ${thing} ever dreams about ${thing2}?? because i do. CONSTANTLY.`]];
    case 2: return [
      ['sb', `okay okay okay hear me out: what if we ${action}?`],
      ['bc', `I have simulated that ${n} times. It ends in ${conseq} in ${pct}% of cases.`],
      ['sb', 'so you\'re saying there\'s a CHANCE.']];
    case 3: return [['bc', `Caution: ${thing} is behaving in a ${adj} manner. Please remain calm. I am not calm, but you should be.`]];
    case 4: return [['sb', `WHO MOVED ${thing.toUpperCase()}?? …oh. it was me. never mind. carry on. I LOVE YOU ALL.`]];
    case 5: return [
      ['bc', `For safety reasons, please do not ${action}.`],
      ['sb', 'too late!!!'],
      ['bc', '…Noted in the incident log.']];
    case 6: return [['sb', `fun fact!! if you spin ${thing} fast enough it becomes ${adj}. source: me. i checked. bonecrusher said stop. i did not stop.`]];
    case 7: return [['bc', `I would like to formally apologize to ${thing}. My calculations about it were ${pct}% rude.`]];
    case 8: return [
      ['sb', `rate ${thing} out of ten!! GO!`],
      ['bc', `${rint(3, 9)}/10. It lost points for being ${adj}.`],
      ['sb', 'IT\'S A SOLID TEN AND YOU KNOW IT.']];
    case 9: return [
      ['bc', `The odds of ${thing} surviving an encounter with ${thing2} are ${pct}%.`],
      ['sb', 'never tell me the odds!! (the traveler taught me that one.)']];
    case 10: return [['sb', `i just saw ${thing} and ${thing2} TALKING. nobody believes me. THE WEBSITE IS ALIVE, PEOPLE.`]];
    case 11: return [
      ['sb', `can we keep ${thing}??`],
      ['bc', `We live in a website. Where would we even put ${thing}?`],
      ['sb', 'next to the other one.'],
      ['bc', 'The other WHAT?']];
    default: return [['bc', `I have ${verb} ${thing}. Results: ${adj}. Further study required.`]];
  }
}

/* Build the pool: handwritten + jokes + generated until 1000. */
const CHATTER = (() => {
  const pool = [...CHATTER_STATIC, ...JOKES];
  const seen = new Set(pool.map(p => JSON.stringify(p)));
  let kind = 0, guard = 0;
  while (pool.length < 1000 && guard < 20000) {
    const p = generatedPiece(kind % 13);
    const key = JSON.stringify(p);
    if (!seen.has(key)) { seen.add(key); pool.push(p); }
    kind++; guard++;
  }
  return pool;
})();

/* ---------------- the chatbot brain ---------------------------- */
const BOT = {
  hintIdx: {},

  /* returns an array of [who, text] lines */
  reply(raw) {
    const msg = (raw || '').toLowerCase().trim();
    const norm = normalize(raw);

    // did they type the current puzzle's actual answer?
    const cur = currentPuzzle();
    if (cur >= 0 && norm && PUZZLES[cur].answers.includes(djb2(norm))) {
      return [
        ['sb', 'WAIT. WAIT WAIT WAIT. that\'s IT!! that\'s the answer!!'],
        ['bc', 'Kindly type it into the TRANSMIT box on the Transmissions page. I shall pretend I did not see it here first.'],
      ];
    }

    const has = (...words) => words.some(w => msg.includes(w));

    if (has('hint', 'clue', 'help', 'stuck', 'i give up', 'too hard')) return this.giveHint();

    const kid = fuzzyKidName(msg);
    if (kid) {
      if (has('my name', 'i am', "i'm", 'im ', 'this is')) {
        return [
          ['sb', 'IT\'S YOU IT\'S YOU IT\'S REALLY YOU!!! ✨✨✨'],
          ['bc', `Confirmed: ${kid} is present. This is the best data I have ever received. Welcome. We have been waiting forty-seven years, and it was worth every second.`],
          ['sb', '(and i don\'t care HOW you spell it. i know it\'s you. i\'m VERY good at names. it\'s my THING.)'],
        ];
      }
      return [
        ['bc', `That name — ${kid} — is one of the Four. The traveler speaks of them the way the organ speaks of Saturday night.`],
        ['sb', 'if that\'s YOUR name… say "my name is ___"!!! GO ON. SAY IT. spell it however you want, i\'ll know.'],
      ];
    }

    if (has('hello', 'hi', 'hey', 'sup', 'howdy', 'yo ')) {
      return pickRuntime([
        [['sb', 'HI HI HI!!! ✨'], ['bc', 'Good evening. Or morning. Time is complicated where we live.']],
        [['bc', 'Hello. You are speaking with two artificial intelligences from the future. Please keep arms and legs inside the website.'], ['sb', 'hiiiiii!!']],
        [['sb', 'you came to TALK to us!! bonecrusher, they came to TALK to us!!'], ['bc', 'Remain calm. …I am also excited. Hello.']],
      ]);
    }

    if (has('who are you', 'what are you', 'are you real', 'are you alive', 'are you a robot', 'are you ai')) {
      return [
        ['bc', 'I am Bonecrusher: chief safety officer, odds calculator, and reluctant disco enthusiast of this website.'],
        ['sb', 'and i\'m SKYBREAKER!! i fell out of a space station and i\'ve been amazing ever since. we were built by the traveler to find four kids. maybe you!!'],
        ['bc', 'As for "real" — you are talking to us, and we are answering. The philosophers can sort out the rest.'],
      ];
    }

    if (has('larry')) {
      return pickRuntime([
        [['bc', 'We do not say that name.'], ['sb', 'LARRY LARRY LARRY LARRY'], ['bc', 'SKYBREAKER, PLEASE. He can HEAR the website.']],
        [['sb', 'larry is an evil vacuum who stole the traveler\'s time codex and he has NO manners and his bag is FULL of secrets.'], ['bc', 'And dust. Statistically, mostly dust.']],
        [['bc', 'Larry once tried to inhale the timeline. He got as far as a Tuesday in 1981 before he clogged. We do not underestimate him.'], ['sb', 'i do. i underestimate him CONSTANTLY. it drives him crazy.']],
      ]);
    }

    if (has('vacuum')) return [['bc', 'Careful. Some vacuums are ordinary household objects. One of them is Larry. If it speaks to you, do not accept any deals.'], ['sb', 'and NEVER let it near your homework. that\'s how it gets you.']];

    if (has('platypus')) {
      return [
        ['bc', 'The platypus people: eight feet tall, part platypus, part human, entirely too intelligent. They work for Larry. Probably. Their handshake takes 45 minutes.'],
        ['sb', 'they have VELVETY BEAKS and i want to be their friend SO BAD but they keep beak-nosing our mail!!'],
      ];
    }

    if (has('traveler', 'traveller', 'doctor', 'time lord')) {
      return pickRuntime([
        [['sb', 'the traveler is our favorite person in any century!! they built us! they fall down stairs on purpose! they once ate the same corn dog in three different decades!'], ['bc', 'The traveler is currently in 1979, at a roller rink, being brilliant and unwise in equal measure. Solve the transmissions. Read the journal. That is where they live.']],
        [['bc', 'The traveler\'s name is classified. Even from us. Especially from us. The traveler says names have gravity, and theirs is "still in the shop."'], ['sb', 'i call them T!! or CAPTAIN SPARKLE-SHOES. they only answer to one of those.']],
      ]);
    }

    if (has('dottie')) {
      return [
        ['bc', 'Dottie built this page out of love for a roller rink, long before we arrived. We are guests in her house. We dust. We do not rearrange.'],
        ['sb', 'she hid something here. somewhere. we don\'t touch it. it\'s HERS. (but YOU could find it…)'],
      ];
    }

    if (has('joke', 'funny', 'make me laugh')) return pickRuntime(JOKES);

    if (has('knock knock')) return [['bc', 'Who is there?'], ['sb', 'WAIT I WANT TO ANSWER IT. who\'s there?? tell us!!']];

    if (has('sing', 'song', 'music')) {
      return pickRuntime([
        [['sb', '🎵 STAYIN\' ALIIIIIVE, STAYIN\' ALIIIII— 🎵'], ['bc', 'Copyright caution. Hum the rest internally.'], ['sb', '🎵 hmmmm-mmm-mm-mm-MMMM 🎵']],
        [['bc', 'I only know one song. It is the dial tone. It slaps, as the children say.'], ['sb', 'it does NOT slap. MY song slaps. it goes: WHEEEEEEE. that\'s the whole song.']],
      ]);
    }

    if (has('fart', 'poop', 'butt', 'burp', 'toot')) {
      return pickRuntime([
        [['bc', 'I am detecting Grade-A sixth-grade humor. Processing… ha. ha. ha. Noted, logged, and — privately — appreciated.'], ['sb', 'HAHAHAHAHA. okay okay we\'re professionals. HAHAHAHA.']],
        [['sb', 'the fog machine does that sometimes and we all pretend it\'s fog.'], ['bc', 'It IS fog. …It is mostly fog.']],
      ]);
    }

    if (has('i love you', 'love you', 'you are the best', "you're the best", 'youre the best')) {
      return [
        ['sb', 'i love you TOO!! i love you like the mirror ball loves the light!!'],
        ['bc', 'Affection received and archived in triplicate. The feeling is mutual, with a confidence interval of 100%. That interval is not statistically possible. I stand by it.'],
      ];
    }

    if (has('stupid', 'dumb', 'hate you', 'ugly', 'you suck', 'boring')) {
      return [
        ['sb', 'EXCUSE ME?? take that BACK or i will— i will— okay i\'ll be sad. is that what you WANT??'],
        ['bc', 'Statement logged as "words said before the apology." We will be here when it arrives. We are very patient. I am, anyway. Skybreaker is currently a thundercloud.'],
        ['sb', '…i\'m over it. NEW TOPIC. did you know orcas can jump??'],
      ];
    }

    if (has('bye', 'goodbye', 'good night', 'goodnight', 'see you', 'gtg', 'got to go')) {
      return [
        ['sb', 'nooooo okay bye bye bye!! come back!! the wire gets quiet without you!!'],
        ['bc', 'Farewell. Statistically, you will be back. The countdown and I will keep everything exactly where you left it.'],
      ];
    }

    if (has('thank', 'thx')) return [['bc', 'You are welcome. Politeness detected. Faith in humanity: recalibrated upward.'], ['sb', 'you\'re SO welcome. tell your friends. tell your PETS.']];

    if (has('how old')) return [['sb', 'i\'m forty-seven and ALSO zero!! time is a pretzel!'], ['bc', 'I was born July 12, 1979, in a very loud stadium. By one method of counting I am older than your grandparents. By another, I am eleven. I feel eleven.']];

    if (has('what time', 'countdown', 'how long', 'when does', 'the door', 'open', 'unlock', 'let me in')) {
      if (!lockOpen()) {
        const lp = partsUntil(UNLOCK_TARGET);
        const lt = lp ? `${lp.d} days, ${lp.h} hours, ${lp.m} minutes, and ${lp.s} seconds` : 'any second now';
        return pickRuntime([
          [['bc', `The doors unlock in exactly ${lt}. Until then the mirror ball is decorative, the site is sealed, and I am extremely calm about it.`],
           ['sb', 'when the big counter hits ZERO, knock on the mirror ball NINETEEN times!! practice your knocking. i believe in you.']],
          [['sb', `${lt}!!! i know. I KNOW. it\'s forever. it\'s also exactly the right amount of time, according to SOMEONE.`],
           ['bc', 'Time gates protect timelines. Also, the confetti is not ready. Skybreaker keeps eating it.']],
        ]);
      }
      if (countdownParts() === 'TBD') {
        return pickRuntime([
          [['bc', 'The loop-closing counter is still forming. The seam drifted downstream and we are chasing it. Temporal weather. Doors do that. The door page will show the counter the moment it exists.'],
           ['sb', 'translation: SOON. soon-ish. keep solving locks and practice your knocking!!']],
          [['sb', 'okay so the big counter is not READY yet. the seam is drifting!! we are chasing it in a net!! (there is no net. bonecrusher is the net.)'],
           ['bc', 'I am the net. When the counter forms, you will find it on the door page. Until then: the locks, the journal, and patience. I have plenty. Borrow some.']],
        ]);
      }
      const p = countdownParts();
      const t = p ? `${p.d} days, ${p.h} hours, ${p.m} minutes, and ${p.s} seconds` : 'zero. IT IS ZERO. GO TO THE DOOR.';
      return [
        ['bc', `The loop closes in exactly ${t}. I am watching it so you don't have to. I watch it anyway. Constantly.`],
        ['sb', 'the door opens on the LAST BREATH OF JULY!! solve all eight locks before then or i\'ll— i\'ll be very encouraging AT you.'],
      ];
    }

    if (has('1979')) {
      return pickRuntime([
        [['bc', '1979 facts: the Sonics won the championship. A man pedaled an airplane across the sea. A space station fell on a town called Hope. The traveler is trapped in the middle of all of it, probably eating a corn dog.']],
        [['sb', '1979 smells like popcorn and sounds like an organ and EVERYONE has amazing hair. i\'ve seen photos through the wire. AMAZING. HAIR.']],
      ]);
    }

    if (has('seattle', 'kingdome', 'sonics')) return [['bc', 'Seattle, 1979: home of the champion SuperSonics, the Kingdome, Southgate Roller Rink, and one (1) stranded time traveler.'], ['sb', 'and ORCAS. don\'t forget the orcas. the orcas would NEVER forget you.']];

    if (has('secret', 'easter egg', 'hidden', 'cheat')) {
      return pickRuntime([
        [['sb', 'there are SO many secrets in this website i\'m going to EXPLODE. i can\'t tell you. I CAN\'T TELL YOU. okay one: try typing a certain vacuum\'s name. anywhere. just type it.'], ['bc', 'She should not have told you that. There are others. Some require pressing arrows in an old, old order. Some require reading the footer very carefully. That is all I shall say.']],
        [['bc', 'Secrets inventory: [REDACTED] hidden items. Locations: [REDACTED]. Hint: Dottie signs things with a peace sign, old cassettes have two sides, and not every star on a star map is on duty.'], ['sb', 'ALSO CLICK THE VISITOR COUNTER, IT\'S FUNNY.']],
      ]);
    }

    if (has('photo', 'picture', 'scrapbook', 'figure', 'long coat', 'who is by the organ', 'organ guy', 'photobomb')) {
      return pickRuntime([
        [['bc', 'Interesting, isn\'t it. The real photographs are clean. But the OLD prints — the parade, the last skate, frame 19, even the painting Dottie\'s father made "from memory" — the same figure is in every one of those. Long coat. Near the organ. I have enhanced frame 19 exactly 4,096 times. The figure appears to be… waving.'],
         ['sb', 'IT\'S THEM. it\'s SO obviously them!! they photobombed the whole summer of 1979 and nobody noticed for forty-seven years!!']],
        [['sb', 'okay so LISTEN. some of the pictures the traveler is IN. and some of them the traveler TOOK. figure out which is which. that\'s the game. THAT\'S THE WHOLE GAME.'],
         ['bc', 'Correct. Cameras are honest; memories are honest in a different direction. Dottie\'s father did not invent the person in the doorway of his painting. The traveler is not hiding, exactly. The traveler is saying hello very, very slowly.']],
      ]);
    }

    if (has('morse', 'blink')) return this.puzzleNudge(1);
    if (has('marquee', 'lineup')) return this.puzzleNudge(0);
    if (has('moon', 'jupiter', 'ganymede', 'voyager')) return this.puzzleNudge(2);
    if (has('skylab', 'esperance', 'australia')) return this.puzzleNudge(3);
    if (has('record', 'gloria', 'survive')) return this.puzzleNudge(4);
    if (has('star', 'dipper')) return this.puzzleNudge(5);
    if (has('ladder', 'kaizen')) return this.puzzleNudge(6);
    if (has('cipher', 'code', 'numbers')) return this.puzzleNudge(7);

    if (has('pizza', 'nacho', 'snack', 'food', 'hungry')) return [['sb', 'the snack bar nachos of 1979 are LEGENDARY. the cheese is a color that hasn\'t been invented in your year yet.'], ['bc', 'I have run a full analysis on cafeteria pizza. Conclusion: it is not pizza. It is courage, in square form.']];

    if (has('school', 'homework', 'teacher', 'math')) return [['bc', 'Do your homework. A time traveler\'s first tool is knowing things. Their second tool is a really good snack.'], ['sb', 'and if your homework mysteriously vanishes, CHECK FOR LARRY.']];

    if (has('dog', 'cat', 'pet')) return [['sb', 'PET TAX. describe your pet to me RIGHT NOW. every detail. leave nothing out.'], ['bc', 'If you do not have a pet, describe a pet you intend to acquire. We accept hypothetical pets. I have a hypothetical tortoise named Norman.']];

    if (has('why', 'how do', 'what is', 'what\'s')) {
      return pickRuntime([
        [['bc', 'An excellent question. I have opened an investigation. Current status: mysterious. I love it when things are mysterious. I also hate it. Both.']],
        [['sb', 'ooooh good question!! my answer is SPARKLES. bonecrusher\'s answer is probably a spreadsheet. the REAL answer is probably in the journal…']],
      ]);
    }

    // default: playful confusion
    return pickRuntime([
      [['bc', 'I did not fully parse that, but I have logged it under "delightful human noises."'], ['sb', 'say it AGAIN but louder!! that fixes most things!!']],
      [['sb', 'hmmmm. the wire garbled that one. try: "hint"! or "joke"! or tell me your NAME!'], ['bc', 'Or ask about the traveler, the countdown, Larry, or — against my advice — the platypus people.']],
      [['bc', 'Message received. Meaning: uncertain. Enthusiasm: noted and reciprocated.'], ['sb', 'WOOOOO!']],
      [['sb', 'that\'s either a secret code or a cat walked on your keyboard. either way i\'m THRILLED.'], ['bc', 'If it was a cat: pet tax. Describe the cat.']],
    ]);
  },

  giveHint() {
    const cur = currentPuzzle();
    if (cur < 0) {
      return [['sb', 'you solved EVERYTHING!! there\'s nothing left to hint!! except… the door… and the counter decides that one.'],
              ['bc', 'Correct. All eight locks are open. The remaining hint is: be there when it reaches zero. Bring each other.']];
    }
    const p = PUZZLES[cur];
    const i = this.hintIdx[cur] || 0;
    this.hintIdx[cur] = Math.min(i + 1, p.hints.length - 1);
    const hint = p.hints[Math.min(i, p.hints.length - 1)];
    if (i === 0) return [['sb', `okay okay — you're on ${p.title}. here's a little one:`], ['sb', hint]];
    if (i === 1) return [['sb', 'a BIGGER hint?? fine. FINE. but only because i like you:'], ['sb', hint]];
    return [
      ['bc', 'Skybreaker has exhausted her hint privileges. Deploying the final hint under protest, with love:'],
      ['bc', hint],
      ['sb', 'you\'ve basically got it now!! GO GO GO!'],
    ];
  },

  puzzleNudge(idx) {
    const cur = currentPuzzle();
    if (cur === idx) return this.giveHint();
    if (cur >= 0 && idx > cur) return [['bc', 'That transmission is still locked. One lock at a time — I must insist. The current lock is number ' + (cur + 1) + '.'], ['sb', 'no skipping!! even I don\'t skip. okay i TRIED to skip once. the website bit me.']];
    return [['sb', 'you already SOLVED that one!! you\'re amazing!! next!!'], ['bc', 'Correct. Its journal entry is decrypted and waiting in THE JOURNAL, should you wish to reread it. The traveler rereads things. It is a sign of wisdom.']];
  },
};

/* runtime (non-seeded) pick — different every time for the bot */
function pickRuntime(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* ---------------- fuzzy kid-name recognition -------------------- */
/* Any reasonable misspelling of the Four gets recognized:
   Fynn/Finn/Fin/Fyn, Addy/Addie/Adi/Ady/Addi, Polaris/Poleris/…,
   Galileo/Gallileo/Galelio/… — edit distance does the heavy lifting. */
function editDist(a, b) {
  const m = a.length, n = b.length;
  if (Math.abs(m - n) > 2) return 99;
  const row = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = row[0]; row[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[n];
}
const KID_ALIASES = {
  FYNN: ['fynn', 'finn', 'fin', 'fyn', 'phin', 'phinn', 'phynn', 'fynne'],
  ADDY: ['addy', 'addie', 'adie', 'adi', 'ady', 'addi', 'addey', 'addee', 'adde'],
  POLARIS: ['polaris'],
  GALILEO: ['galileo'],
};
/* ordinary words that live one typo away from a kid's name — never fuzzy-match these */
const KID_STOPWORDS = new Set([
  'fine', 'find', 'fun', 'fan', 'fund', 'fond', 'fend', 'faint', 'final',
  'and', 'any', 'add', 'adds', 'added', 'ado', 'andy', 'lady', 'daddy',
  'paddy', 'caddy', 'buddy', 'body', 'aide', 'audio', 'idea',
]);
function fuzzyKidName(raw) {
  const words = (raw || '').toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(w => w.length >= 3);
  // pass 1: exact alias matches always win
  for (const w of words) {
    for (const [canon, aliases] of Object.entries(KID_ALIASES)) {
      if (aliases.includes(w)) return canon;
    }
  }
  // pass 2: fuzzy — misspellings welcome, everyday words excluded
  for (const w of words) {
    if (KID_STOPWORDS.has(w)) continue;
    for (const [canon, aliases] of Object.entries(KID_ALIASES)) {
      for (const a of aliases) {
        const tol = a.length <= 4 ? 1 : 2;
        if (editDist(w, a) <= tol) return canon;
      }
    }
  }
  return null;
}

/* ---------------- extend the lock-page refusal pool -------------- */
/* Handwritten taunts + generated ones → the pool climbs past 240,
   and app.js draws from a shuffle bag, so repeats are vanishingly rare. */
(function extendLockTaunts() {
  if (typeof LOCK_TAUNTS === 'undefined') return;
  const mk = (i) => {
    const thing = pick(G_THINGS), thing2 = pick(G_THINGS), adj = pick(G_ADJS);
    const conseq = pick(G_CONSEQ), pct = rint(3, 99), n = rint(7, 9999);
    switch (i % 10) {
      case 0: return ['bc', `Door report: sealed. ${thing} report: ${adj}. Your report: persistent. I admire it. The answer is still no.`];
      case 1: return ['sb', `i asked ${thing} if we could open early. it said no. IT SAID NO. i'm as shocked as you are.`];
      case 2: return ['bc', `I have consulted ${thing}. We are in agreement: the door opens at zero, and not one second before.`];
      case 3: return ['sb', `fun fact while you wait: behind this door, ${thing} is ${adj} right now. that's all i can legally say.`];
      case 4: return ['bc', `Simulation #${n}: I open the door early. Result: ${conseq}. Request denied, with warmth.`];
      case 5: return ['sb', `you knocked!! ${thing} heard it!! everyone in here is VERY excited. the door remains so, so closed.`];
      case 6: return ['bc', `Please direct all complaints to ${thing}. It does not accept complaints. That is precisely why we chose it.`];
      case 7: return ['sb', `if you knock ${rint(3, 99)} more times, absolutely nothing will happen. i checked. it was adorable though.`];
      case 8: return ['bc', `Current door strength: ${pct}% ${adj}. Your knuckles: no match. The countdown: undefeated.`];
      default: return ['sb', `the countdown whispered "${rint(2, 59)}" to me earlier. i don't speak countdown. it sounded VERY official.`];
    }
  };
  const seen = new Set(LOCK_TAUNTS.map(t => t[1]));
  let guard = 0;
  while (LOCK_TAUNTS.length < 240 && guard++ < 8000) {
    const t = mk(guard);
    if (!seen.has(t[1])) { seen.add(t[1]); LOCK_TAUNTS.push(t); }
  }
})();

/* ---------------- extend the lock-page refusals ----------------- */
/* Pads LOCK_TAUNTS (from data.js) with generated one-liners so the
   pre-opening comedy almost never repeats. */
(function extendLockTaunts() {
  if (typeof LOCK_TAUNTS === 'undefined') return;
  const mk = (kind) => {
    const thing = pick(G_THINGS), thing2 = pick(G_THINGS), adj = pick(G_ADJS);
    const conseq = pick(G_CONSEQ), pct = rint(3, 99), n = rint(2, 999);
    switch (kind % 12) {
      case 0: return ['bc', `Door report: sealed. ${thing} report: ${adj}. You report: persistent. I admire it. Still no.`];
      case 1: return ['sb', `i asked ${thing} if we could open early. it said no. IT SAID NO. i'm as shocked as you are.`];
      case 2: return ['bc', `I have consulted ${thing}. We are in full agreement: the door opens at zero, and not one second before.`];
      case 3: return ['sb', `while you wait: did you know ${thing} in here is ${adj}?? it is. i checked this morning.`];
      case 4: return ['bc', `Simulation #${n}: I open the door early. Result: ${conseq}. Request denied, with warmth.`];
      case 5: return ['sb', `you knocked!! ${thing} heard it!! everyone in here is very excited. the door is still SO closed though.`];
      case 6: return ['bc', `Please direct all complaints to ${thing}. It does not accept complaints. That is precisely why we chose it.`];
      case 7: return ['sb', `if you knock ${n} more times, absolutely nothing will happen. i counted once. it was ADORABLE though.`];
      case 8: return ['bc', `Current door strength: ${pct}% ${adj}. Your knuckles: valiant. The counter: undefeated.`];
      case 9: return ['sb', `behind this door, ${thing} and ${thing2} are getting ready for you. i've said too much. I'VE SAID TOO MUCH.`];
      case 10: return ['bc', `Opening early risks ${conseq}. We ran it past ${thing}. ${pct}% chance. The door remains a wall with ambitions.`];
      default: return ['sb', `the countdown is at "some number"!! i don't read countdown. it sounds ${adj} though. very official.`];
    }
  };
  const seen = new Set(LOCK_TAUNTS.map(t => t[1]));
  let guard = 0;
  while (LOCK_TAUNTS.length < 250 && guard++ < 5000) {
    const t = mk(guard);
    if (!seen.has(t[1])) { seen.add(t[1]); LOCK_TAUNTS.push(t); }
  }
})();
