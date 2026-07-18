:orphan:

Builtins Easy
*************

.. quiz-section::
   :data-category: builtins
   :data-level: easy

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(len([1, 2, 3, 4]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``0``
   * ``3``
   * ``4``
   * ``TypeError``

Answer
------

``len`` returns the number of items in a container; the list has 4 elements.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(sorted([3, 1, 2]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[1, 2, 3]``
   * ``[3, 2, 1]``
   * ``None``
   * ``[3, 1, 2]``

Answer
------

``sorted`` returns a new list in ascending order; it never mutates its
argument and never returns ``None``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(sum([1, 2, 3]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``[1, 2, 3]``
   * ``123``
   * ``0``
   * ``6``

Answer
------

``sum`` adds the items of an iterable starting from ``0``: ``1 + 2 + 3 == 6``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(bool([]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``True``
   * ``False``
   * ``[]``
   * ``None``

Answer
------

An empty list is falsy, so ``bool([])`` is ``False``. Empty containers are
always falsy.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(list("ab"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``['ab']``
   * ``['a', 'b']``
   * ``'ab'``
   * ``[97, 98]``

Answer
------

``list`` on a string iterates its characters, producing a one-character
string per element.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(max([4, 2, 9, 1]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``1``
   * ``4``
   * ``9``
   * ``16``

Answer
------

``max`` returns the largest item of the iterable, which is ``9``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(min([4, 2, 9, 1]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``1``
   * ``2``
   * ``4``
   * ``9``

Answer
------

``min`` returns the smallest item of the iterable, which is ``1``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(list(range(3)))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[1, 2, 3]``
   * ``[0, 1, 2]``
   * ``[0, 1, 2, 3]``
   * ``[3]``

Answer
------

``range(3)`` yields ``0, 1, 2`` — it starts at ``0`` and stops *before*
the given stop value.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(int("100"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``4``
   * ``"100"``
   * ``1.0``
   * ``100``

Answer
------

``int`` parses a decimal string into an integer, giving ``100``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(len({"a": 1, "b": 2}))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``4``
   * ``2``
   * ``1``
   * ``3``

Answer
------

``len`` of a ``dict`` counts its keys; there are 2.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 20

.. code-block::

    print(list(enumerate(["x", "y"])))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``[('x', 0), ('y', 1)]``
   * ``[(1, 'x'), (2, 'y')]``
   * ``[(0, 'x'), (1, 'y')]``
   * ``['x', 'y']``

Answer
------

``enumerate`` pairs each item with a counter starting at ``0``, yielding
``(index, value)`` tuples.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(bool(0))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``True``
   * ``False``
   * ``0``
   * ``None``

Answer
------

The number ``0`` is falsy, so ``bool(0)`` is ``False``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 20

.. code-block::

    print(sorted("dbca"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``['a', 'b', 'c', 'd']``
   * ``'abcd'``
   * ``['d', 'c', 'b', 'a']``
   * ``['dbca']``

Answer
------

``sorted`` always returns a *list*, even when given a string: it iterates
the characters and sorts them.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(tuple([1, 2]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[1, 2]``
   * ``(1, 2)``
   * ``{1, 2}``
   * ``(1, 2,)``

Answer
------

``tuple`` builds an immutable sequence from the iterable, printed as
``(1, 2)``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(set([1, 1, 2, 2]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``[1, 1, 2, 2]``
   * ``{1, 1, 2, 2}``
   * ``(1, 2)``
   * ``{1, 2}``

Answer
------

A ``set`` holds only unique elements, so the duplicates collapse to
``{1, 2}``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(float("3.5"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``3``
   * ``"3.5"``
   * ``3.5``
   * ``ValueError``

Answer
------

``float`` parses a numeric string, including a decimal point, into a
floating-point number.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(any([False, True, False]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``1``
   * ``None``

Answer
------

``any`` is ``True`` if at least one element is truthy; here one ``True``
is enough.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(all([True, True, False]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``True``
   * ``False``
   * ``0``
   * ``None``

Answer
------

``all`` is ``True`` only if *every* element is truthy; the single
``False`` makes it ``False``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(sum([]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``None``
   * ``[]``
   * ``TypeError``
   * ``0``

Answer
------

``sum`` of an empty iterable returns its start value, which defaults to
``0``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 20

.. code-block::

    print(divmod(17, 5))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``(2, 3)``
   * ``3.4``
   * ``(3, 2)``
   * ``(3.4, 0)``

Answer
------

``divmod(a, b)`` returns ``(a // b, a % b)`` — the quotient ``3`` and the
remainder ``2``.
