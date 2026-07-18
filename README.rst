sphinx-quiz
===========

Sphinx extension that builds a static quiz website from reStructuredText.

A quiz project is a regular Sphinx project using the ``sphinx_quiz``
extension. The index page declares the quiz setup (level, category,
number of questions and timer), and every question, with its choices,
explanation and transition screens, is written as plain rst.

Quick start
-----------

.. code-block:: bash

    pip install -e .
    cd python-core-challenge
    make html
    xdg-open _build/html/index.html

Directives
----------

``quick-select-level`` / ``quick-select-category``
    Options for the setup form. Content lines are the choices; ``*``
    derives them from the questions found in the project.
    ``:data-include-all:`` adds an ``all`` option; ``:data-default:``
    preselects one. ``:data-weights:`` (e.g. ``easy=1, medium=2, hard=3``
    on ``quick-select-level``) biases the random sampling when playing
    with ``all`` levels; unlisted values weigh ``1``.

``quick-select-num-questions``
    How many questions per game. Content lines are the choices.

``quick-timer``
    Timer multipliers. ``0`` disables the timer; ``1`` is 1x the
    recommended time (``data-seconds``) of each question.

``quiz-section``
    Attaches ``:data-category:`` and ``:data-level:`` to the enclosing
    section; all question sections inside inherit them.

``quiz-question``
    Marks the enclosing section as a question. ``:data-seconds:`` is the
    recommended time. Everything before ``quiz-choices`` is the question
    body; a nested section (e.g. *Answer*) is the explanation shown after
    answering.

``quiz-choices``
    Bullet list of answers. ``:data-correct:`` holds the 1-based indexes
    of the right answers in source order (``4`` or ``1, 2, 4``; more
    than one turns it into a multiple-answer question with a submit
    button); ``:data-randomize:`` shuffles them on screen.

``quiz-transition``
    Screen shown after a question. ``:data-status:`` is ``success`` or
    ``failure``. ``:data-time-remaining:`` is a fraction of the question
    time still left: the transition with the highest threshold below the
    actual remaining time is picked; ``0`` matches only a timeout; with
    no value it is the default (and the only kind used without timer).

``quiz-podium``
    Results-screen gag. ``:data-percentage:`` is the score threshold:
    the entry with the highest threshold at or below the final score is
    shown, with its ``:data-title:`` headline, ``:data-image:``
    (source-relative path, copied to ``_static/quiz-podium/``) and
    ``:data-text:``.

Internationalization
--------------------

Question content is translated with Sphinx's standard gettext workflow.
Set ``locale_dirs = ['locale/']`` and ``gettext_compact = False`` in
``conf.py``, then::

    pip install -e '.[i18n]'                 # sphinx-intl
    make gettext
    sphinx-intl update -p _build/gettext/gettext -l es
    # translate the msgstr in locale/es/LC_MESSAGES/*.po

Because ``:data-correct:`` lives in the ``.rst`` (positional), translating
choices never changes which answer is right. UI chrome (button labels,
level and category names) is translated inside ``quiz.js`` ``STRINGS``,
keyed by the build's ``language``.

Build one combined site with English at the root and another language
nested under a sub-path (``make site`` in the example project builds
``_build/html`` with Spanish under ``_build/html/es``). A flag switcher in
the top-right corner links between them.

Theme
-----

The extension registers a dark, sidebar-free HTML theme; enable it with
``html_theme = 'sphinx_quiz'`` in ``conf.py``. It provides a dark
``pygments_style`` (monokai) so code blocks match the quiz panel.

The results screen shows a per-category and per-level breakdown, a
review of missed questions with their explanations, and keeps the best
score per game configuration in the browser's ``localStorage``.
