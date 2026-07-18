:orphan:

Culture Hard
************

.. quiz-section::
   :data-category: culture
   :data-level: hard

What happens when you run this code?
====================================

.. quiz-question::
   :data-seconds: 40

.. code-block:: python

   from __future__ import braces

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * Python starts allowing ``{ }`` blocks instead of indentation.
   * It silently does nothing.
   * It raises ``SyntaxError: not a chance``.
   * It raises ``ImportError: no module named braces``.

Answer
------

This Easter egg answers the perennial request to replace indentation with
curly braces. Attempting it raises ``SyntaxError: not a chance``.

``import antigravity`` opens which *xkcd* comic?
================================================

.. quiz-question::
   :data-seconds: 40

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * xkcd #303.
   * xkcd #353.
   * xkcd #149.
   * xkcd #927.

Answer
------

``import antigravity`` opens *xkcd* comic #353, titled "Python", in which a
character flies after discovering the language.

How is the Zen of Python text stored inside the ``this`` module?
================================================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * As plain text.
   * Base64 encoded.
   * ROT13 encoded.
   * Compressed with gzip.

Answer
------

Fittingly obfuscated, the Zen text in ``this.py`` is stored ROT13 encoded
and decoded at import time using a small character-translation dictionary.

Which earlier language, which Guido helped develop at CWI, strongly influenced Python?
======================================================================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * Pascal.
   * Modula-3.
   * ABC.
   * Smalltalk.

Answer
------

Python was heavily influenced by ABC, a teaching language Guido had worked
on at CWI. He kept ABC's readability while fixing what he saw as its
shortcomings.

In which country did Guido van Rossum begin developing Python at CWI?
=====================================================================

.. quiz-question::
   :data-seconds: 40

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * The United States.
   * Germany.
   * Belgium.
   * The Netherlands.

Answer
------

Guido started Python at CWI, the national research institute for
mathematics and computer science in the Netherlands. The Zen even winks at
this with "unless you're Dutch".

What is the final aphorism of the Zen of Python?
================================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * "Readability counts."
   * "Namespaces are one honking great idea -- let's do more of those!"
   * "Now is better than never."
   * "Simple is better than complex."

Answer
------

The Zen closes on an upbeat note: "Namespaces are one honking great idea --
let's do more of those!"

How many aphorisms does the Zen of Python contain?
==================================================

.. quiz-question::
   :data-seconds: 40

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * 10.
   * 15.
   * 19.
   * 42.

Answer
------

The Zen lists 19 aphorisms -- a running joke being that Tim Peters left the
"20th" for the reader (or the BDFL) to fill in.

Which special ("dunder") method implements the ``<`` operator?
==============================================================

.. quiz-question::
   :data-seconds: 40

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``__less__``
   * ``__lt__``
   * ``__cmp__``
   * ``__min__``

Answer
------

Python calls ``__lt__`` (short for "less than") to evaluate the ``<``
operator between two objects.

Which statement about CPython's GIL is true?
============================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * It lets any number of threads run Python bytecode simultaneously.
   * It is a feature of every Python implementation, including Jython.
   * It allows only one thread to execute Python bytecode at a time.
   * It only affects programs that use ``asyncio``.

Answer
------

The Global Interpreter Lock permits just one thread to run Python bytecode
at a time in CPython. Implementations like Jython have no GIL.

Which Python release first introduced f-strings?
================================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * Python 3.4.
   * Python 3.5.
   * Python 3.6.
   * Python 3.8.

Answer
------

Formatted string literals (f-strings), specified in PEP 498, arrived in
Python 3.6.

Which Python release introduced the walrus operator (``:=``)?
=============================================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * Python 3.5.
   * Python 3.6.
   * Python 3.7.
   * Python 3.8.

Answer
------

The walrus operator from PEP 572 shipped in Python 3.8.

In which Python release did PEP 484 type hints first become available?
======================================================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * Python 3.4.
   * Python 3.5.
   * Python 3.6.
   * Python 3.7.

Answer
------

PEP 484 and the ``typing`` module landed in Python 3.5, giving Python a
standard syntax for type annotations.

What was the standard tool for migrating Python 2 code to Python 3?
===================================================================

.. quiz-question::
   :data-seconds: 40

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``pyupgrade``
   * ``py23``
   * ``2to3``
   * ``modernize``

Answer
------

``2to3`` was the tool shipped with Python that automatically rewrote many
Python 2 constructs into their Python 3 equivalents.

Which of these is a real feature you can enable with ``from __future__ import``?
================================================================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``goto``
   * ``switch``
   * ``annotations``
   * ``macros``

Answer
------

``from __future__ import annotations`` (PEP 563) makes annotations be
stored as strings rather than evaluated at definition time. The others are
not ``__future__`` features.

The debate over which feature is often cited as a factor in Guido stepping down as BDFL?
========================================================================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * f-strings.
   * Type hints.
   * The walrus operator (PEP 572).
   * Async/await.

Answer
------

The contentious debate around PEP 572's walrus operator is widely cited as
part of what led Guido to step down as BDFL in 2018.

After Guido stepped down, how is Python's language governance now organized?
============================================================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * A single successor BDFL was appointed.
   * An elected Steering Council.
   * A public shareholder vote.
   * The decision was handed to the PyPI maintainers.

Answer
------

Since 2019 the language has been governed by an elected Steering Council
(PEP 13) rather than a single benevolent dictator.

The Easter egg ``from __future__ import barry_as_FLUFL`` re-enables which old operator?
=======================================================================================

.. quiz-question::
   :data-seconds: 50

.. code-block:: python

   from __future__ import barry_as_FLUFL
   print(1 <> 2)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * The backtick ``repr`` operator.
   * The ``print`` statement.
   * The ``<>`` "not equal" operator.
   * Integer division with ``/``.

Answer
------

This joke (PEP 401) honors Barry Warsaw as the "Friendly Language Uncle For
Life" by temporarily bringing back Python 2's ``<>`` not-equal operator, so
``1 <> 2`` evaluates to ``True``.

Which pair of names, alongside Guido van Rossum, are listed as authors of PEP 8?
================================================================================

.. quiz-question::
   :data-seconds: 50

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * Tim Peters and Raymond Hettinger.
   * Barry Warsaw and Nick Coghlan.
   * Brett Cannon and Alex Martelli.
   * Kenneth Reitz and David Beazley.

Answer
------

PEP 8, the style guide, is credited to Guido van Rossum, Barry Warsaw, and
Nick Coghlan.

In the *Monty Python* "Spam" sketch that inspired Python's placeholder names, where is it set?
==============================================================================================

.. quiz-question::
   :data-seconds: 40

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * A pet shop.
   * A café where nearly every menu item contains spam.
   * A courtroom.
   * A cheese shop.

Answer
------

The sketch takes place in a café whose menu is overrun with spam, which is
why ``spam`` (and ``eggs``) became Python's go-to example names.

Which value does the Zen of Python associate specifically with "you're Dutch"?
==============================================================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * "Errors should never pass silently."
   * "Readability counts."
   * "There should be one obvious way to do it."
   * "Now is better than never."

Answer
------

The Zen follows "There should be one-- and preferably only one --obvious
way to do it." with the wink "Although that way may not be obvious at first
unless you're Dutch." -- a nod to Guido's nationality.
