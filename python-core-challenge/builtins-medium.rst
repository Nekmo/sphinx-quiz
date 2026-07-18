:orphan:

Builtins Medium
***************

.. quiz-section::
   :data-category: builtins
   :data-level: medium

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(sorted(["bb", "a", "ccc"], key=len))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``['a', 'ccc', 'bb']``
   * ``['a', 'bb', 'ccc']``
   * ``['bb', 'a', 'ccc']``
   * ``['ccc', 'bb', 'a']``

Answer
------

With ``key=len`` the items are ordered by their length (1, 2, 3), not
alphabetically.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    print(round(2.5))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``2``
   * ``3``
   * ``2.5``
   * ``2.0``

Answer
------

Python uses *banker's rounding* (round half to even). ``2.5`` sits between
``2`` and ``3``; the even neighbour ``2`` wins.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(max("apple", "b"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``apple``
   * ``ab``
   * ``5``
   * ``b``

Answer
------

With two positional arguments ``max`` compares them directly. Strings
compare lexicographically, and ``'b' > 'a'``, so ``'b'`` is the larger —
length is irrelevant.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    print(sum([[1], [2]], []))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``[[1], [2]]``
   * ``3``
   * ``[1, 2]``
   * ``TypeError``

Answer
------

The start value ``[]`` makes ``sum`` use list ``+``, concatenating the
inner lists into ``[1, 2]``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(bool("False"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``'False'``
   * ``ValueError``

Answer
------

``bool`` on a string is about emptiness, not content. Any non-empty
string is truthy, so ``"False"`` becomes ``True``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(int("10", 2))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``10``
   * ``10.0``
   * ``5``
   * ``2``

Answer
------

The second argument is the base. ``"10"`` in base 2 equals decimal ``2``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    print(list(zip([1, 2, 3], ['a', 'b'])))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[(1, 'a'), (2, 'b'), (3, None)]``
   * ``[(1, 'a'), (2, 'b')]``
   * ``[(1, 2, 3), ('a', 'b')]``
   * ``ValueError``

Answer
------

``zip`` stops at the shortest iterable, so the trailing ``3`` is dropped.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    print(list(filter(None, [0, 1, 2, 0, 3])))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``[0, 0]``
   * ``[0, 1, 2, 0, 3]``
   * ``[1, 2, 3]``
   * ``[None, 1, 2, None, 3]``

Answer
------

Passing ``None`` as the function makes ``filter`` keep only truthy items,
dropping the two ``0`` values.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    print(sorted(["10", "9", "2"]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``['10', '2', '9']``
   * ``['2', '9', '10']``
   * ``['2', '10', '9']``
   * ``['9', '2', '10']``

Answer
------

These are *strings*, so they sort character by character: ``'1' < '2' < '9'``.
``"10"`` comes first because its first character ``'1'`` is smallest.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(sum([True, True, False]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``TypeError``
   * ``2``
   * ``3``
   * ``True``

Answer
------

``bool`` is a subclass of ``int``: ``True == 1`` and ``False == 0``, so the
sum is ``2``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(int(3.99))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``3``
   * ``4``
   * ``3.99``
   * ``3.0``

Answer
------

``int`` on a float truncates toward zero (it does not round), so ``3.99``
becomes ``3``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(list(range(10, 0, -2)))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``[10, 8, 6, 4, 2, 0]``
   * ``[8, 6, 4, 2, 0]``
   * ``[10, 8, 6, 4, 2, 1]``
   * ``[10, 8, 6, 4, 2]``

Answer
------

``range`` counts down by 2 from ``10`` and stops *before* the stop value
``0``, so ``0`` is not included.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(min([], default=99))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``ValueError``
   * ``99``
   * ``None``
   * ``0``

Answer
------

``min`` of an empty iterable normally raises ``ValueError``, but the
``default`` keyword supplies a fallback instead.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(list(map(str, [1, 2, 3])))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``[1, 2, 3]``
   * ``'123'``
   * ``['1', '2', '3']``
   * ``[str, str, str]``

Answer
------

``map`` applies ``str`` to each item, converting every number to its
string form.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(list(enumerate(['a', 'b'], start=1)))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``[(0, 'a'), (1, 'b')]``
   * ``[(1, 'a'), (1, 'b')]``
   * ``[(1, 'a'), (2, 'b')]``
   * ``[('a', 1), ('b', 2)]``

Answer
------

The ``start`` argument sets the first counter value, so numbering begins
at ``1``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print("".join(sorted("banana")))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``banana``
   * ``aaabnn``
   * ``abn``
   * ``nnbaaa``

Answer
------

``sorted("banana")`` orders the characters into
``['a', 'a', 'a', 'b', 'n', 'n']``, which ``"".join`` glues back into a
string.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(chr(ord('a') + 1))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``98``
   * ``a``
   * ``c``
   * ``b``

Answer
------

``ord('a')`` is ``97``; adding ``1`` gives ``98``; ``chr(98)`` is ``'b'``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(bool(" "))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``' '``
   * ``1``

Answer
------

A string containing a single space is *not empty*, so it is truthy —
whitespace still counts as content.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    print(divmod(-7, 2))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``(-3, -1)``
   * ``(-3, 1)``
   * ``(-4, 1)``
   * ``(-4, -1)``

Answer
------

Floor division rounds toward negative infinity: ``-7 // 2 == -4`` and
``-7 % 2 == 1`` (the remainder takes the sign of the divisor).

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    print(max([1, 2, 3], key=lambda x: -x))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``1``
   * ``3``
   * ``-1``
   * ``-3``

Answer
------

The ``key`` negates each value, so the item with the largest key
(``-1`` from ``1``) wins. ``max`` returns the original item ``1``, not the
key.
