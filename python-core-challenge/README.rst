Python Core Challenge
=====================

Example quiz project for the ``sphinx_quiz`` extension: a static,
Kahoot-like quiz about core Python with three levels, per-question
timer, Monty Python results screen and shareable results.

Categories
----------

``Mixed``
    All categories, randomly sampled.
``syntax``
    Unexpected uses of the syntax and little-known or rarely used
    features.
``builtins``
    Functions and properties of the Python core.
``library``
    Python core libraries plus the best-known, essential ones.
``culture``
    History of the language, trivia, and Monty Python content.

Build and play
--------------

.. code-block:: bash

    # from the repository root, once:
    python -m venv .venv && .venv/bin/pip install -e .

    cd python-core-challenge
    ../.venv/bin/sphinx-build -M html . _build
    xdg-open _build/html/index.html      # works over file:// too

Project layout
--------------

``conf.py``
    Regular Sphinx configuration: ``extensions = ['sphinx_quiz']``,
    ``html_theme = 'sphinx_quiz'``, ``language = 'en'``.

``index.rst``
    Cover page: the ``quick-select-*`` and ``quick-timer`` directives
    that define the setup screen. Categories are listed explicitly (in
    display order); levels are derived from the questions with ``*``
    and harder levels are sampled more often via ``data-weights``.

``syntax.rst`` / ``builtins.rst`` / ``library.rst`` / ``culture.rst``
    Question banks, one per category. Each file holds sections marked
    with ``quiz-section`` (category + level) containing question
    sections: ``quiz-question`` + optional code block +
    ``quiz-choices`` + an *Answer* subsection with the explanation.
    ``builtins.rst`` includes a multiple-answer question
    (``:data-correct: 1, 2, 4``).

``transitions.rst``
    Post-answer screens for success/failure, including time-based ones
    (``data-time-remaining``) and the timeout screen.

``podium.rst`` + ``images/*.svg``
    Results gags per score bracket (0/40/70/90 %), with monocolor
    Monty Python SVGs.

Adding a question
-----------------

.. code-block:: rst

    My new question title?
    ======================

    .. quiz-question::
       :data-seconds: 30

    .. code-block::

        # optional statement/code shown under the title

    .. quiz-choices::
       :data-randomize: true
       :data-correct: 2

       * Wrong answer.
       * Right answer.
       * Another wrong answer.

    Answer
    ------

    Explanation shown after answering.

Put it inside a section holding a ``quiz-section`` directive (or add a
new file — the glob toctree in ``index.rst`` picks up every ``*.rst``)
and rebuild.
