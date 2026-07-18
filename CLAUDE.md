# python-quiz

Sphinx extension (`sphinx_quiz`) that builds a static, Kahoot-like quiz
website from reStructuredText, plus an example quiz project
(`know-your-python/`).

## Commands

```bash
python -m venv .venv && .venv/bin/pip install -e .   # once
cd know-your-python
../.venv/bin/sphinx-build -M html . _build           # build the quiz site
(cd _build/html && python -m http.server 8642)       # serve for testing
```

A full rebuild (`rm -rf _build`) kills any `http.server` serving that
directory — restart it after rebuilding. For CSS/JS-only tweaks it is
faster to `cp sphinx_quiz/static/quiz.{js,css} know-your-python/_build/html/_static/`
than to rebuild.

Always full-rebuild after editing questions: an incremental build only
re-reads the changed doc, so `quiz-data.js` ends up with just that doc's
questions. `rm -rf _build` first.

Combined bilingual site (English at `/`, Spanish nested under `/es/`):
```bash
../.venv/bin/pip install -e '.[i18n]'                # sphinx-intl, once
make -C know-your-python site SPHINXBUILD=../.venv/bin/sphinx-build
(cd know-your-python/_build/html && python -m http.server 8642)
```
`make site` builds en into `_build/html`, builds es, and copies it into
`_build/html/es`. Flags top-right (rendered by `quiz.js`, `renderLangSwitcher`)
switch languages: en's ES flag → `es/`, es's EN flag → `../`. `make html-es`
still produces a Spanish-only build in `_build/html-es` if needed.
After editing/adding questions, refresh the catalogs:
```bash
cd know-your-python
make gettext
../.venv/bin/sphinx-intl update -p _build/gettext/gettext -l es   # note the nested gettext/
# then translate the empty msgstr in locale/es/LC_MESSAGES/*.po
```

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
- Example project questions live one file per `(category, level)` pair:
  `know-your-python/<category>-<level>.rst` (e.g. `syntax-hard.rst`),
  each `:orphan:` with a single `quiz-section` and ~20 questions (some files
  carry a few more — extra questions per pool are fine). The `index.rst`
  toctree globs `*`, so new files are auto-included. Every code-bearing
  question's marked answer is verified by executing the snippet under the
  venv Python — keep it that way when adding questions. `data-seconds` is
  calibrated per question: base by level + reading length + code-comprehension
  cost (easy ~15-45, medium ~25-70, hard ~30-90).
- Two translation layers, kept separate:
  - **Question content** (gettext): `conf.py` sets `locale_dirs =
    ['locale/']` + `gettext_compact = False`; Spanish catalogs are
    `locale/es/LC_MESSAGES/*.po` (one per doc). Translate prose + choices,
    keep code/`literals`/identifiers verbatim. `data-correct` is positional
    in the `.rst`, so translations never change which answer is correct.
    `.mo` files are gitignored (built on demand).
  - **UI labels** (in `quiz.js` `STRINGS`, keyed by `data.language`):
    screen chrome plus the `levels` and `categories` maps. Helpers
    `levelName(t, v)` / `categoryName(t, v)` resolve a value to its label
    and fall back to the raw/capitalized key, so a project that declares no
    translations still renders. es: Mixto, Fácil/Medio/Difícil,
    Sintaxis/Builtins/Biblioteca/Cultura.

## Style guide (user decisions — keep)

- Source content in English (project `language = 'en'`; UI strings follow
  `data.language` via `quiz.js` `STRINGS`, incl. the `levels`/`categories`
  label maps). A full es-ES question translation lives in `locale/es/`
  (gettext); build the combined bilingual site with `make site` — see
  Commands. The top-right flag switcher (`.sq-lang` in quiz.js/css) is a
  deliberate exception to the monocolor-icon rule: real multicolor UK/Spain
  SVG flags, per user request.
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
- Mobile (`max-width: 640px`): cover cards drop the fan for a centered
  3-2 flex wrap with small alternating nth-child tilts (natural "cards
  on a table" look); corner selectors flow under the level chips; title
  scales with the viewport. `min-width: 0` on the explanation flex item
  keeps wide code blocks scrolling inside instead of inflating it.
- Example project categories (fixed display order, listed explicitly in
  `index.rst`): Mixed (all), syntax (unexpected syntax/little-known
  features), builtins (core functions/properties), library (stdlib +
  essential libraries), culture (history, trivia, Monty Python). es labels
  come from the `categories` map in `quiz.js` (Sintaxis/Builtins/Biblioteca/
  Cultura), not from gettext. Level calibration: easy = one fact, medium =
  reasoning/gotcha, hard = wtfpython-tier CPython edge (noted as
  implementation-specific in the answer where relevant).

## Verification

Use Playwright MCP against `http://localhost:8642/` (English) and
`http://localhost:8642/es/` (Spanish) — the `file://` protocol is blocked
in the MCP browser. `window.sphinxQuiz` + `window.SPHINX_QUIZ_DATA` let
tests pick correct/wrong answers deterministically. When checking overlap
bugs, sample `getBoundingClientRect` in a loop during the animation, not
just at the end. Answer correctness is also gated offline: parse each
`.rst`, execute every `code-block` under the venv Python, and assert the
`data-correct` choice matches the real output/exception before shipping.
