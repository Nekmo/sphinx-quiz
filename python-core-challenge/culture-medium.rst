:orphan:

Culture Medium
**************

.. quiz-section::
   :data-category: culture
   :data-level: medium

What does "BDFL" stand for?
===========================

.. quiz-question::
   :data-seconds: 30

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * Base Development Framework Library.
   * Benevolent Dictator For Life.
   * Binary Data Format Language.
   * Brave Default Function Loader.

Answer
------

"BDFL" -- Benevolent Dictator For Life -- was Guido van Rossum's title for
having the final say on the language's direction, until he stepped down in
2018.

What is the subject of PEP 8?
=============================

.. quiz-question::
   :data-seconds: 30

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * Type hints.
   * The Zen of Python.
   * The style guide for Python code.
   * The walrus operator.

Answer
------

PEP 8 is the widely followed style guide for Python code, covering naming,
indentation, and layout conventions.

What is the subject of PEP 20?
==============================

.. quiz-question::
   :data-seconds: 30

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * The coding style guide.
   * The Zen of Python.
   * String formatting.
   * The import system.

Answer
------

PEP 20 is *The Zen of Python*, the collection of aphorisms you see when you
run ``import this``.

Who wrote the Zen of Python?
============================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * Guido van Rossum.
   * Barry Warsaw.
   * Tim Peters.
   * Raymond Hettinger.

Answer
------

Tim Peters wrote *The Zen of Python* (PEP 20). He also created Python's
sorting algorithm, Timsort.

What did PEP 484 introduce to Python?
=====================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * f-strings.
   * Type hints.
   * The walrus operator.
   * Async/await.

Answer
------

PEP 484 introduced type hints, a standard syntax for optionally annotating
the types of variables, arguments, and return values.

Which feature was introduced by PEP 572?
=========================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * Decorators.
   * Type hints.
   * The walrus operator (``:=``).
   * Context managers.

Answer
------

PEP 572 added assignment expressions using the ``:=`` operator, nicknamed
the "walrus operator" because ``:=`` resembles a walrus's eyes and tusks.

Which symbol is the "walrus operator"?
======================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``=>``
   * ``->``
   * ``<-``
   * ``:=``

Answer
------

``:=`` is the walrus operator; it assigns a value as part of a larger
expression.

On what date did Python 2 reach end of life?
============================================

.. quiz-question::
   :data-seconds: 30

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * December 31, 2015.
   * January 1, 2020.
   * June 1, 2018.
   * January 1, 2022.

Answer
------

Python 2 officially reached end of life on January 1, 2020; no further
security or bug fixes are released for it.

Who created Timsort, Python's built-in sorting algorithm?
=========================================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * Guido van Rossum.
   * Donald Knuth.
   * Tim Peters.
   * Alex Martelli.

Answer
------

Timsort, the hybrid sorting algorithm used by ``sorted()`` and
``list.sort()``, was created by Tim Peters -- the same author as the Zen of
Python.

What does "PEP" stand for?
==========================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * Python Extension Package.
   * Python Enhancement Proposal.
   * Public Execution Protocol.
   * Portable Encoding Policy.

Answer
------

A PEP is a Python Enhancement Proposal: a design document proposing new
features or conventions for the language and community.

In what year was Python 2.0 released?
=====================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * 1996.
   * 1998.
   * 2000.
   * 2004.

Answer
------

Python 2.0 was released in 2000, introducing features such as list
comprehensions and cycle-detecting garbage collection.

In what year was Python 3.0 released?
=====================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * 2005.
   * 2006.
   * 2008.
   * 2010.

Answer
------

Python 3.0 was released in 2008. It deliberately broke backward
compatibility to clean up long-standing design issues.

What does "GIL" stand for in CPython?
=====================================

.. quiz-question::
   :data-seconds: 30

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * General Import Loader.
   * Garbage Inspection Layer.
   * Global Interpreter Lock.
   * Generic Iteration Loop.

Answer
------

The GIL, or Global Interpreter Lock, ensures that only one thread executes
Python bytecode at a time in CPython.

What is CPython?
================

.. quiz-question::
   :data-seconds: 35

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * A dialect of C with Python syntax.
   * The reference implementation of Python, written in C.
   * A tool for converting C code to Python.
   * A Python web framework.

Answer
------

CPython is the reference implementation of Python, written mostly in C. It
is the version most people mean when they say "Python".

In what year did Guido van Rossum step down as BDFL?
====================================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * 2014.
   * 2016.
   * 2018.
   * 2020.

Answer
------

Guido stepped down as Benevolent Dictator For Life in 2018, after which
Python adopted a Steering Council governance model.

What is the purpose of the ``__future__`` module?
==================================================

.. quiz-question::
   :data-seconds: 40

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * To schedule code to run later.
   * To enable features from a newer Python version in current code.
   * To predict the runtime of a function.
   * To roll back to an older Python version.

Answer
------

``from __future__ import ...`` lets you opt into behaviors that will become
standard in a later Python version, easing migration.

In Python jargon, what does "dunder" mean?
==========================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * Dynamic underscore.
   * Double underscore.
   * Duplicated undefined name.
   * Deferred under-load.

Answer
------

"Dunder" is short for "double underscore", as in the ``__init__`` and
``__str__`` special methods written with two underscores on each side.

Which Python implementation runs on the Java Virtual Machine?
=============================================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * JavaPy.
   * Jython.
   * Serpent.
   * PyBridge.

Answer
------

Jython is the real Python implementation that runs on the Java Virtual
Machine and can interoperate with Java code. "JavaPy", "Serpent", and
"PyBridge" are made-up names.

Which alternative Python implementation is known for its just-in-time (JIT) compiler?
=====================================================================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * Jython.
   * IronPython.
   * PyPy.
   * MicroPython.

Answer
------

PyPy is an alternative implementation featuring a just-in-time compiler,
which can make many Python programs run significantly faster.

Which line about "one obvious way" appears in the Zen of Python?
================================================================

.. quiz-question::
   :data-seconds: 40

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * "There is always a better way to do it."
   * "There should be one-- and preferably only one --obvious way to do it."
   * "Any way that works is the right way."
   * "The fastest way is the only way."

Answer
------

This aphorism captures Python's preference for a single, clear approach --
often contrasted with Perl's "there's more than one way to do it".

What does ``import this`` display?
==================================

.. quiz-question::
   :data-seconds: 40

.. code-block:: python

   import this

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * A list of installed packages.
   * The current date and time.
   * The Zen of Python.
   * Nothing at all.

Answer
------

``import this`` prints *The Zen of Python*, a short collection of guiding
aphorisms for writing Python code.

Why do Python examples so often use the word "spam"?
====================================================

.. quiz-question::
   :data-seconds: 35

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * It is an acronym for "sample program".
   * It refers to unwanted email.
   * It is short for "spa memory".
   * It is a nod to a *Monty Python* sketch.

Answer
------

The classic placeholder names ``spam`` and ``eggs`` come from the *Monty
Python* "Spam" sketch, keeping with the language's namesake.

What does ``import antigravity`` do?
====================================

.. quiz-question::
   :data-seconds: 40

.. code-block:: python

   import antigravity

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * Raises an ImportError.
   * Disables Python's garbage collector.
   * Prints the Zen of Python.
   * Opens an *xkcd* webcomic in your browser.

Answer
------

``import antigravity`` is an Easter egg that opens the *xkcd* comic about
Python in your web browser.

Which line is genuinely part of the Zen of Python?
==================================================

.. quiz-question::
   :data-seconds: 35

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * "Move fast and break things."
   * "Write once, run anywhere."
   * "Readability counts."
   * "There is more than one way to do it."

Answer
------

"Readability counts." is one of the aphorisms in *The Zen of Python*. The
last one -- about many ways to do it -- is actually a Perl motto.

Besides ``spam``, which word is the other classic Python placeholder name?
==========================================================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``foo``
   * ``bar``
   * ``baz``
   * ``eggs``

Answer
------

``spam`` and ``eggs`` go together, both borrowed from *Monty Python*.

Complete the first line of the Zen of Python: "Beautiful is better than ___."
=============================================================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * "boring".
   * "complex".
   * "clever".
   * "ugly".

Answer
------

The Zen of Python opens with "Beautiful is better than ugly."

Which of these is a real Python Easter egg?
============================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``import pizza``
   * ``import this``
   * ``import rainbow``
   * ``import cake``

Answer
------

``import this`` prints *The Zen of Python*; the others are not real modules.

By what nickname was Guido van Rossum long known in the Python community?
=========================================================================

.. quiz-question::
   :data-seconds: 30

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * The Architect.
   * The Chief Snake.
   * The BDFL.
   * The Grand Wizard.

Answer
------

Guido was the "BDFL" -- Benevolent Dictator For Life -- until he stepped
down from that role in 2018.
