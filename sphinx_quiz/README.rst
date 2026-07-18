sphinx_quiz
===========

Sphinx extension that turns a regular Sphinx project into a static,
Kahoot-like quiz website: full-screen animated SPA, category cards,
level chips, per-question timer, transition screens, results with score
ring, share (compact URL or PNG) and review modal. No JavaScript
dependencies; the built site also works over ``file://``.

Usage
-----

.. code-block:: python

    # conf.py
    extensions = ['sphinx_quiz']
    html_theme = 'sphinx_quiz'   # bundled dark theme (recommended)
    language = 'en'              # UI language of the quiz ('en' or 'es')

Write questions as plain rst using the directives below, build with
``sphinx-build -M html``, and open ``_build/html/index.html``.

How it works
------------

- ``directives.py`` registers the rst directives; each one only drops a
  marker node (``addnodes.py``) into the doctree.
- ``collector.py`` walks resolved doctrees, renders question bodies,
  choices and explanations to HTML fragments with
  ``builder.render_partial`` (Pygments highlighting included), and on
  ``build-finished`` writes ``_static/quiz-data.js``
  (``window.SPHINX_QUIZ_DATA``). The first ``quick-*`` directive becomes
  the ``#sphinx-quiz-app`` mount point.
- ``static/quiz.js`` + ``static/quiz.css`` are the client application.
- ``theme/`` is a dark, sidebar-free theme registered as
  ``sphinx_quiz``.

Directives
----------

``quick-select-level`` / ``quick-select-category``
    Setup options. Content lines are the choices; ``*`` derives them
    from the questions found in the project. ``:data-include-all:``
    adds an ``all`` option; ``:data-default:`` preselects one;
    ``:data-weights:`` (e.g. ``easy=1, medium=2, hard=3`` on the level
    selector) biases random sampling when playing with all levels.

``quick-select-num-questions``
    Questions per game. Content lines are the choices.

``quick-timer``
    Timer multipliers. ``0`` disables the timer; ``1`` is 1x the
    recommended time of each question.

``quiz-section``
    Attaches ``:data-category:`` and ``:data-level:`` to the enclosing
    section; question sections inside inherit them.

``quiz-question``
    Marks the enclosing section as a question. ``:data-seconds:`` is
    the recommended time. Everything before ``quiz-choices`` is the
    statement; a nested section (e.g. *Answer*) is the explanation
    shown after answering.

``quiz-choices``
    Bullet list of answers. ``:data-correct:`` holds the 1-based
    indexes of the right answers in source order (``4`` or ``1, 2, 4``;
    more than one makes it a multiple-answer question with a submit
    button); ``:data-randomize:`` shuffles them on screen.

``quiz-transition``
    Screen shown after a question. ``:data-status:`` is ``success`` or
    ``failure``. ``:data-time-remaining:`` is a fraction of the
    question time still left: the transition with the highest threshold
    below the actual remaining time is picked; ``0`` matches only a
    timeout; with no value it is the default (and the only kind used
    without timer).

``quiz-podium``
    Results-screen gag. The entry with the highest
    ``:data-percentage:`` at or below the final score is shown, with
    its ``:data-title:`` headline, ``:data-image:`` (source-relative
    path, copied to ``_static/quiz-podium/``) and ``:data-text:``.

Client features
---------------

- Share as URL: ``?r=`` encodes each played question in 4 base36
  characters (index + selected-choices bitmask); opening the link
  rebuilds the results and the review.
- Share as image: a 1200×630 PNG drawn on a canvas.
- Best score per game configuration kept in ``localStorage``.
- ``window.sphinxQuiz`` is exposed for debugging.
