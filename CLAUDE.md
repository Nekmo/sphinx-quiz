# python-quiz

Sphinx extension (`sphinx_quiz`) that builds a static, Kahoot-like quiz
website from reStructuredText, plus an example quiz project
(`python-core-challenge/`).

## Commands

```bash
python -m venv .venv && .venv/bin/pip install -e .   # once
cd python-core-challenge
../.venv/bin/sphinx-build -M html . _build           # build the quiz site
(cd _build/html && python -m http.server 8642)       # serve for testing
```

A full rebuild (`rm -rf _build`) kills any `http.server` serving that
directory — restart it after rebuilding. For CSS/JS-only tweaks it is
faster to `cp sphinx_quiz/static/quiz.{js,css} python-core-challenge/_build/html/_static/`
than to rebuild.

## Architecture

Data flows in one direction: rst → doctree markers → JSON payload → SPA.

- `sphinx_quiz/directives.py` — rst directives. They only drop marker
  nodes (`sphinx_quiz/addnodes.py`) into the doctree; no rendering logic.
  - `quick-select-level` / `quick-select-category` / `quick-select-num-questions` /
    `quick-timer`: setup options. Content lines are choices; `*` derives
    them from the questions. `data-include-all` adds `all`; `data-weights`
    (level only, `easy=1, medium=2, hard=3`) biases sampling when playing
    level `all`.
  - `quiz-section`: `data-category` / `data-level` for the enclosing
    section; question sections inside inherit them.
  - `quiz-question`: marks the enclosing section as a question
    (`data-seconds` = recommended time). Body before `quiz-choices` is the
    statement; a nested section (e.g. *Answer*) is the explanation.
  - `quiz-choices`: bullet list of answers. `data-correct` is 1-based,
    source order; several indexes (`1, 3`) make it multi-answer.
    `data-randomize` shuffles client-side.
  - `quiz-transition`: post-answer screen. `data-status` success/failure;
    `data-time-remaining` is a fraction threshold — highest threshold ≤
    actual remaining fraction wins, `0` matches only timeout, absent =
    default (only kind used when the timer is off).
  - `quiz-podium`: results gag. Highest `data-percentage` ≤ score is
    shown (`data-title` headline, `data-image` copied to
    `_static/quiz-podium/`, `data-text`).
- `sphinx_quiz/collector.py` — at `doctree-resolved` walks sections,
  renders HTML fragments with `builder.render_partial` (Pygments included)
  and stores per-doc data in the env (purge/merge safe). At
  `build-finished` aggregates and writes `_static/quiz-data.js`
  (`window.SPHINX_QUIZ_DATA = {...}`) — a JS file, not fetched JSON, so
  `file://` works. The first quick-* directive is replaced by the
  `#sphinx-quiz-app` mount div.
- `sphinx_quiz/static/quiz.js` — vanilla-JS SPA (no dependencies).
  Screens: setup (typed title, category card fan — click starts, level
  chips, corner cycle selectors), question (intro "Question N of M" docks
  to top, A/B/C/D colored option cards, footer time bar that grows taller
  as time runs out), verdict (transition title + icon), results (score
  ring, settings, breakdowns, podium, share, review modal).
  `window.sphinxQuiz` is exposed for debugging/tests.
  - Share URL: `?r=` + 4 base36 chars per question (2 = question index,
    2 = selected-choices bitmask); reconstructs results + review.
  - Share image: hand-drawn 1200×630 canvas (no html2canvas).
  - Best score per settings combo in `localStorage`
    (`sphinx-quiz-best:<level>:<category>:<n>:<timer>`).
- `sphinx_quiz/theme/` — dark sidebar-free HTML theme registered as
  `html_theme = 'sphinx_quiz'`; sets `pygments_style = monokai`.

## Style guide (user decisions — keep)

- Everything in English (project `language = 'en'`; UI strings follow
  `data.language`, `es` translations exist in `quiz.js`).
- Kahoot palette (`PALETTE` in quiz.js); solid-color borderless cards;
  mono pill buttons (yellow outline = primary); single blue for
  breakdown bars; monocolor SVG icons/images only.
- Brand `>>> <project>` with block cursor = home link; cursor static,
  blinks on hover; cover title types itself with blinking cursor.
- Levels always ordered Mix → easy → medium → hard.
- `prefers-reduced-motion` is deliberately ignored: animations are part
  of the game (user request — do not re-add the media query).
- Answer reveal: correct = green border blinking 1s; wrong selected =
  red; forgotten correct (multi only) = yellow; rest gray, then removed
  from layout (`display: none` after shrink) so cards reflow. Verdict
  position is computed upfront (no mid-flight overlap); only the
  explanation scrolls (styled scrollbar), answers and next button stay
  visible.

## Verification

Use Playwright MCP against `http://localhost:8642/` (the `file://`
protocol is blocked in the MCP browser). `window.sphinxQuiz` +
`window.SPHINX_QUIZ_DATA` let tests pick correct/wrong answers
deterministically. When checking overlap bugs, sample
`getBoundingClientRect` in a loop during the animation, not just at the
end.
