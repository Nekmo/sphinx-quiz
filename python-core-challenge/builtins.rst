:orphan:

Builtins Medium
***************

.. quiz-section::
   :data-category: builtins
   :data-level: medium

What does ``sorted("banana")`` return?
======================================

.. quiz-question::
   :data-seconds: 25

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``"aaabnn"``
   * ``("a", "a", "a", "b", "n", "n")``
   * ``["a", "a", "a", "b", "n", "n"]``
   * ``TypeError``: strings cannot be sorted.

Answer
------

``sorted`` accepts any iterable and **always returns a list**, no matter
the input type. To get a string back: ``"".join(sorted("banana"))``.

Which of these calls return a list?
===================================

.. quiz-question::
   :data-seconds: 45

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1, 2, 4

   * ``sorted("abc")``
   * ``list(range(3))``
   * ``reversed([1, 2])``
   * ``"a b".split()``

Answer
------

``sorted``, ``list`` and ``str.split`` return lists. ``reversed`` returns
a **lazy iterator** (``list_reverseiterator``), not a list.

Which method is called by ``len(obj)``?
=======================================

.. quiz-question::
   :data-seconds: 20

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``obj.length()``
   * ``obj.__len__()``
   * ``obj.__size__()``
   * ``obj.count()``

Answer
------

``len`` delegates to the ``__len__`` dunder method. It must return a
non-negative ``int``, or ``len`` raises ``TypeError``.

What does ``any([])`` return?
=============================

.. quiz-question::
   :data-seconds: 20

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``True``
   * ``False``
   * ``None``
   * ``ValueError``: empty iterable.

Answer
------

``any`` returns ``False`` for an empty iterable (there is no truthy
element), while ``all([])`` returns ``True`` (vacuous truth).


Builtins Hard
*************

.. quiz-section::
   :data-category: builtins
   :data-level: hard

What does this ``zip`` expression produce?
==========================================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    matrix = [(1, 2), (3, 4), (5, 6)]
    result = list(zip(*matrix))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[(1, 3, 5), (2, 4, 6)]``
   * ``[(1, 2), (3, 4), (5, 6)]``
   * ``[(1, 2, 3), (4, 5, 6)]``
   * ``TypeError``: ``zip`` takes exactly two arguments.

Answer
------

``zip(*matrix)`` unpacks the rows as arguments, so ``zip`` groups the
first elements together, then the second ones: it transposes the matrix.
