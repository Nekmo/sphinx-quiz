# Leveled question bank + Spanish i18n — design

## Problem

The example quiz's questions were AI-generated without regard to difficulty
level, and some carry incorrect answers (e.g. a walrus-at-statement-level
snippet whose module fails to *compile*, so nothing prints, yet a
"prints X and SyntaxError" choice is marked correct). Rebuild the bank as
level-calibrated files, one per (category, level) pair, with every
code-bearing answer verified by execution, plus a full Spanish (es-ES)
translation via Sphinx gettext.

## Scope

- **Full matrix**: 4 categories × 3 levels = 12 files, ≥20 questions each
  (~240 total).
- Categories: `syntax`, `builtins`, `library`, `culture` (existing display
  order in `index.rst`).
- Levels: `easy`, `medium`, `hard`.
- Replace the 4 existing per-category files; migrate their good questions
  into the new files, no duplicates.
- Spanish translation of every question (prose + choices; code verbatim).

## File structure

12 new files in `python-core-challenge/`:

```
syntax-easy.rst    builtins-easy.rst    library-easy.rst    culture-easy.rst
syntax-medium.rst  builtins-medium.rst  library-medium.rst  culture-medium.rst
syntax-hard.rst    builtins-hard.rst    library-hard.rst    culture-hard.rst
```

Each file:
- Starts with `:orphan:` (matches existing convention).
- One `quiz-section` with `data-category` + `data-level` for the whole file.
- 20 question sections, each: statement prose → optional `code-block` →
  `quiz-choices` (`data-correct`, `data-randomize: true`) → `Answer`
  subsection with explanation.
- 4 choices per question (mix of value results and error types).

`index.rst` toctree already globs `*`, so new files are auto-included and
the categories block stays as-is. Delete `syntax.rst`, `builtins.rst`,
`library.rst`, `culture.rst`.

## Level calibration

- **easy** — single fact, no trick. `data-seconds` 15–20. Examples:
  `3 / 2` is `1.5`; empty set is `set()`; what `len`/`sorted` return.
- **medium** — needs reasoning or a common gotcha. `data-seconds` 30–40.
  Examples: mutable default argument, class vs instance attribute
  shadowing, `dict.get` default, `is` vs `==` for small ints.
- **hard** — CPython implementation edge / wtfpython-tier. `data-seconds`
  40–60. Examples: string interning + constant-fold length limit (4096),
  `+=` mutating a shared list, walrus at statement level (compile-time
  SyntaxError → nothing prints), generator/`__del__` ordering. Explanation
  notes when behavior is CPython-specific and not language-guaranteed.

Sources for inspiration: wtfpython, CPython docs, `dis`/`sys` behavior.
Culture questions cover Python history, PEP trivia, stdlib naming, and
Monty Python references (consistent with existing `culture`/podium gags).

## Correctness gate

Before any file is committed, a throwaway script
(`scratchpad/verify_answers.py`, not shipped) parses each new `.rst`,
extracts every `code-block` and its `quiz-choices` + `data-correct`, runs
the snippet under `.venv/bin/python` (Python 3.14), and asserts the marked
choice matches the real output or exception type. Mismatches are fixed
before commit. Questions with no executable code (most `culture`, some
conceptual `syntax`) are fact-checked manually against cited sources.

## i18n (Sphinx gettext, es-ES)

- `conf.py`: add `locale_dirs = ['locale/']` and `gettext_compact = False`
  (one `.po` per source file).
- Add `sphinx-intl` to the project's dev dependencies (`pyproject.toml`
  optional/dev extra) and install into `.venv`.
- Extract + scaffold:
  ```bash
  cd python-core-challenge
  ../.venv/bin/sphinx-build -M gettext . _build/gettext
  ../.venv/bin/sphinx-intl update -p _build/gettext -l es
  ```
  → `python-core-challenge/locale/es/LC_MESSAGES/<doc>.po`.
- Fill every `msgstr` with an es-ES translation. Keep code, `literal`
  spans, error names, and identifiers verbatim; translate prose and answer
  choices. Peninsular Spanish register.
- Spanish site is a **separate build**:
  ```bash
  ../.venv/bin/sphinx-build -M html . _build/html-es -D language=es
  ```
  This regenerates `_static/quiz-data.js` with translated content;
  `quiz.js` already localizes UI strings off `data.language`, so an `es`
  build yields a fully Spanish site. Add a Makefile `html-es` target.

## Deliverables

1. 12 leveled `.rst` files (~240 verified questions); 4 old files deleted.
2. `conf.py` i18n config; `pyproject.toml` dev dep on `sphinx-intl`.
3. `locale/es/LC_MESSAGES/*.po` fully translated.
4. Makefile `html-es` target.
5. CLAUDE.md updated: new file layout, gettext workflow, es build command.

## Execution order

Per category (syntax → builtins → library → culture): author 3 level
files → run correctness gate → fix → move on. i18n extraction +
translation happens after all English files are final (so msgids are
stable). English site builds clean, then the es build.

## Out of scope

- Language switcher UI inside a single build (es stays a separate static
  site).
- Changes to `quiz.js` / directives / collector logic.
- New categories or levels beyond the 4×3 matrix.
```

## Testing

- Correctness gate script must pass (every marked answer reproduces).
- `sphinx-build -M html . _build` completes with no new warnings.
- `sphinx-build -M html . _build/html-es -D language=es` completes; spot
  check translated `quiz-data.js` renders Spanish questions.
- Playwright smoke against `localhost:8642`: each category/level pool
  loads and correct answers register (via `window.SPHINX_QUIZ_DATA`).
