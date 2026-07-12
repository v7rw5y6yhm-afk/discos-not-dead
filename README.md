# DISCO'S NOT DEAD 🪩

An *ilovebees*-style ARG website: a fan page for Southgate Roller Rink (White Center,
Seattle) that has been "corrupted" by two AIs — **BONECRUSHER** and **skybreaker** — sent
back down the time spiral by an unnamed traveler trapped in a loop of the summer of 1979.
The traveler is trying to reach four children: **Polaris, Galileo, Fin, and Addy.**

Every journal entry is anchored to a **real event on a real day at a real place** in the
summer of 1979 (Sonics parade, Gossamer Albatross, Voyager 2 at Jupiter, Skylab over
Esperance, Disco Demolition Night, the All-Star Game at the Kingdome, Apollo 11 + 10 years,
and Southgate Roller Rink itself).

## How it plays

- The site is **blocked by a countdown** to midnight, July 31 — the moment the loop is
  thinnest. The back door: knock (click) the mirror ball **19 times**.
- **8 puzzles ("transmissions")**, solvable strictly one at a time. Each one teaches a
  virtue: Persistence, Determination, Wisdom, Forgiveness & Grace, Love, Family, Kaizen —
  and the finale braids all seven into Hope.
- Each solve **decrypts a journal log** and some solves **unlock whole new sections**:
  THE WIRE (after 2), RULES OF TIME (after 4), THE FOUR (after 6), THE DOOR (after 8).
- THE DOOR stays sealed until the countdown hits zero, then reveals the finale.
- Progress is saved in the browser (localStorage). "⟲ reset the loop" in the footer wipes it.

## Files

Pure static site — no build step, no dependencies, no server code.

- `index.html` — page shell + retro fan-page furniture (guestbook, badges, counter)
- `style.css` — 1979-neon-over-corrupted-wire theme + old-web layer + Win95 windows
- `data.js` — journal entries, puzzles, AI dialogue (answers stored as djb2 hashes)
- `fx.js` — synthesized glitch sounds + AI speech voices (WebAudio + speechSynthesis, no audio files)
- `chatter.js` — 1,000 prepared conversation pieces + the TIME-WIRE chatbot brain
- `app.js` — game engine, rogue popup scheduler, easter eggs

The AIs talk out loud (Bonecrusher: slow and deep; skybreaker: fast and high) and the
site plays synthesized glitch/unlock sounds. Toggles live at the bottom-left of the
page and persist per browser. Voices use each device's built-in speech engine, so
they'll sound a bit different on iPhone vs Mac — both stay in character.

## Publish it

Any static host works. Easiest options:

**Netlify Drop** (fastest): go to <https://app.netlify.com/drop> and drag this whole
folder onto the page. Done — you get a live URL immediately.

**GitHub Pages:**
```sh
cd ~/discos-not-dead
git init && git add -A && git commit -m "disco's not dead"
# create a repo on github, push, then enable Pages (Settings → Pages → main branch, root)
```

**Local test:**
```sh
cd ~/discos-not-dead && python3 -m http.server 8788
# open http://localhost:8788
```

## Tuning

- Countdown target: `COUNTDOWN_TARGET` at the top of `data.js`.
- Knocks to enter: `KNOCKS_REQUIRED` in the same place.
- Answers: see `SPOILERS.md` (keep it out of the published folder if the kids are savvy —
  or just delete it before deploying).
