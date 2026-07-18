:orphan:

Builtins Hard
*************

.. quiz-section::
   :data-category: builtins
   :data-level: hard

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    print(round(0.5), round(1.5), round(2.5))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``1 2 3``
   * ``0 2 2``
   * ``0 1 2``
   * ``1 2 2``

Answer
------

Banker's rounding (round half to even) applies to every ``.5`` case:
``0.5`` -> ``0``, ``1.5`` -> ``2``, ``2.5`` -> ``2``. Each result is the
nearest *even* integer.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(0.1 + 0.2)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``0.3``
   * ``0.30000000000000001``
   * ``0.29999999999999999``
   * ``0.30000000000000004``

Answer
------

Binary floating point cannot represent ``0.1`` or ``0.2`` exactly, so the
sum is slightly above ``0.3`` and ``repr`` shows the shortest string that
round-trips: ``0.30000000000000004``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(hash(True) == hash(1))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``TypeError``
   * ``1``

Answer
------

``True == 1`` and equal objects must hash equally, so ``hash(True)`` and
``hash(1)`` are both ``1``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print({True: 'a', 1: 'b'})

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``{True: 'a', 1: 'b'}``
   * ``{1: 'b'}``
   * ``{True: 'b'}``
   * ``{True: 'a'}``

Answer
------

Because ``True == 1`` and they hash the same, the dict treats them as one
key. The *first* key inserted (``True``) is kept, but the later
assignment overwrites its value with ``'b'``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(float('nan') == float('nan'))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``True``
   * ``False``
   * ``nan``
   * ``ValueError``

Answer
------

IEEE-754 defines NaN as unequal to everything, including itself, so the
comparison is ``False``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    n = float('nan')
    print(n in [n])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``ValueError``
   * ``nan``

Answer
------

Even though ``nan != nan``, membership tests short-circuit on *identity*
first (``x is element or x == element``). The list holds the same object,
so the identity check succeeds and ``in`` returns ``True``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    print(round(-0.5), round(-1.5), round(-2.5))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``-1 -2 -3``
   * ``0 -1 -2``
   * ``-1 -1 -2``
   * ``0 -2 -2``

Answer
------

Banker's rounding also works on negatives: ``-0.5`` -> ``0``,
``-1.5`` -> ``-2``, ``-2.5`` -> ``-2`` — each snapped to the nearest even
integer.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(round(2.675, 2))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``2.68``
   * ``2.7``
   * ``2.67``
   * ``2.675``

Answer
------

``2.675`` cannot be stored exactly; the nearest ``float`` is slightly
*below* ``2.675``, so rounding to two places gives ``2.67`` rather than the
"textbook" ``2.68``. Banker's rounding is irrelevant here — the stored
value simply is not a true half.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(hash(-1))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``-1``
   * ``-2``
   * ``1``
   * ``0``

Answer
------

In CPython, ``-1`` is reserved internally to signal an error from
``__hash__``, so the hash of the integer ``-1`` is remapped to ``-2``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    print(sorted([True, False, 0, 1]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[False, 0, True, 1]``
   * ``[False, 0, 1, True]``
   * ``[0, False, 1, True]``
   * ``[True, 1, False, 0]``

Answer
------

Since ``False == 0`` and ``True == 1``, sorting compares equal values and
Python's sort is *stable*: it preserves the input order within each equal
group. ``False`` precedes ``0`` and ``True`` precedes ``1`` exactly as
they appeared.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print({1, True, 1.0})

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``{1, True, 1.0}``
   * ``{True}``
   * ``{1.0}``
   * ``{1}``

Answer
------

``1``, ``True`` and ``1.0`` are all equal and hash the same, so the set
keeps only the first one inserted — the integer ``1``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(all([]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``None``
   * ``ValueError``

Answer
------

``all`` is *vacuously* true on an empty iterable: there is no element that
fails, so it returns ``True``. (``any([])`` is the mirror image and returns
``False``.)

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(bin(10))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``1010``
   * ``0b1010``
   * ``'0b1010'``
   * ``b'1010'``

Answer
------

``bin`` returns a *string* with a ``0b`` prefix. ``print`` shows the string
content without quotes, so the output is ``0b1010``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(len("café".encode("utf-8")))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``3``
   * ``6``
   * ``4``
   * ``5``

Answer
------

``len`` on the *string* is 4 code points, but once encoded to UTF-8 the
``é`` takes two bytes, so the ``bytes`` object has length ``5``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(int("0x1f", 0))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``ValueError``
   * ``31``
   * ``0``
   * ``0x1f``

Answer
------

Base ``0`` tells ``int`` to auto-detect the base from the literal prefix.
The ``0x`` marks hexadecimal, so ``1f`` parses to ``31``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(bytes([104, 105]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``[104, 105]``
   * ``'hi'``
   * ``b'hi'``
   * ``b'104105'``

Answer
------

``bytes`` from a list of integers treats each as a byte value; ``104`` and
``105`` are the ASCII codes for ``h`` and ``i``, giving ``b'hi'``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    a = 256
    b = 256
    print(a is b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``256``
   * ``None``

Answer
------

CPython caches small integers from ``-5`` to ``256``, so both names point
at the *same* cached object and ``is`` is ``True``. This is a CPython
implementation detail — never rely on ``is`` for value equality.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print([float('nan')].index(float('nan')))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * ``0``
   * ``-1``
   * ``None``
   * ``ValueError``

Answer
------

Unlike ``in`` on a stored object, ``list.index`` builds a *fresh* NaN to
search for. The two NaN objects are different, so the identity shortcut
fails, ``==`` is ``False``, and no match is found — ``index`` raises
``ValueError``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    print(max([(1, "a"), (1, "b")], key=lambda t: t[0]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``(1, 'b')``
   * ``(1, 'a')``
   * ``1``
   * ``(1, 'ab')``

Answer
------

Both items have the same key (``1``). On ties, ``max`` returns the *first*
maximal element encountered, so ``(1, 'a')`` wins. (``min`` follows the
same first-wins rule.)

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(ord("😀"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``TypeError``
   * ``2``
   * ``128512``
   * ``55357``

Answer
------

``ord`` accepts any single Unicode *code point*, including astral-plane
emoji. ``😀`` is U+1F600, whose decimal value is ``128512`` — Python strings
are not UTF-16, so there is no surrogate pair to trip over.
