:orphan:

Syntax Hard
***********

.. quiz-section::
   :data-category: syntax
   :data-level: hard

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(0.1 + 0.2)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``0.3``
   * ``0.30000000000000004``
   * ``0.30000000000000001``
   * ``0.6``

Answer
------

Floats are IEEE-754 binary approximations, so neither ``0.1`` nor ``0.2`` is
exact. Their sum rounds to a value slightly above ``0.3``, which ``repr``
shows as ``0.30000000000000004``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(0.1 + 0.2 == 0.3)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``True``
   * ``False``
   * ``0.3``
   * ``ValueError``

Answer
------

Because ``0.1 + 0.2`` produces ``0.30000000000000004`` rather than exactly
``0.3``, the equality is ``False``. This is why floats should be compared
with a tolerance, e.g. ``math.isclose``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    a = 100
    b = 100
    print(a is b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``100``
   * ``TypeError``

Answer
------

CPython pre-caches the small integers from ``-5`` to ``256``, so both names
point at the same cached object and ``is`` is ``True``. This is a CPython
implementation detail, not a language guarantee — never rely on ``is`` for
value comparison.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    x = 300
    print(x is x + 0)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``True``
   * ``False``
   * ``300``
   * ``0``

Answer
------

``300`` is outside CPython's small-integer cache (``-5`` to ``256``), so
``x + 0`` computes a brand-new int object with the same value. Identity is
``False`` even though the values are equal. This boundary is CPython-specific.

What is the output?
===================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    a = "hello"
    b = "hello"
    print(a is b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``hello``
   * ``TypeError``

Answer
------

CPython interns short string literals that look like identifiers, so both
names refer to the same interned object and ``is`` is ``True``. This is an
implementation detail, not guaranteed by the language.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    a = "hello"
    b = "".join(["h", "e", "l", "l", "o"])
    print(a is b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``True``
   * ``False``
   * ``hello``
   * ``TypeError``

Answer
------

A string built at runtime by ``join`` is not automatically interned, so it is
a different object from the interned literal ``a``, even though the contents
are equal. ``is`` is ``False`` (``==`` would be ``True``).

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 55

.. code-block::

    t = ([1, 2],)
    try:
        t[0] += [3]
    except TypeError:
        pass
    print(t)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``([1, 2],)``
   * ``([1, 2, 3],)``
   * ``TypeError``
   * ``([1, 2], [3])``

Answer
------

``+=`` on the list first extends it in place (mutating ``t[0]``), then tries
to store the result back into the tuple, which raises ``TypeError``. The
mutation already happened, so after swallowing the error the tuple holds
``([1, 2, 3],)``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 55

.. code-block::

    class C:
        x = 10
        y = [x + i for i in range(3)]

    print(C.y)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[10, 11, 12]``
   * ``NameError``
   * ``[0, 1, 2]``
   * ``[10, 10, 10]``

Answer
------

A comprehension runs in its own function scope, which cannot see names in the
enclosing *class* body. The iterable ``range(3)`` is evaluated in class scope,
but looking up ``x`` inside the comprehension fails with ``NameError``.

What happens when you run this?
===============================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    x := 5
    print(x)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``5``
   * ``SyntaxError``
   * ``NameError``
   * ``None``

Answer
------

The walrus operator ``:=`` is not allowed as a bare, top-level statement; it
must appear inside a larger expression (often parenthesized). The module fails
to compile, so it raises ``SyntaxError`` and nothing prints.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    d = {True: 'a', 1: 'b', 1.0: 'c'}
    print(d)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``{True: 'a', 1: 'b', 1.0: 'c'}``
   * ``{True: 'c'}``
   * ``{True: 'a'}``
   * ``{1: 'c'}``

Answer
------

``True``, ``1`` and ``1.0`` are equal and hash the same, so they are the same
dict key. Each assignment overwrites the value but keeps the *first* key
object, leaving ``{True: 'c'}``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    print(-2 ** 2)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``4``
   * ``-4``
   * ``2``
   * ``-2``

Answer
------

``**`` has higher precedence than the unary minus, so this parses as
``-(2 ** 2)``, which is ``-4``. To square a negative you must write
``(-2) ** 2``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    gen = (x for x in range(3))
    data = list(gen)
    print(list(gen))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[0, 1, 2]``
   * ``[]``
   * ``[0, 1, 2, 0, 1, 2]``
   * ``ValueError``

Answer
------

A generator can only be iterated once. The first ``list(gen)`` consumes it
fully, so by the second call it is exhausted and yields nothing, producing an
empty list ``[]``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    a = [1, 2, 3, 4, 5]
    a[::2] = [0, 0, 0]
    print(a)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[0, 0, 0, 4, 5]``
   * ``[0, 2, 0, 4, 0]``
   * ``[0, 0, 0, 2, 4]``
   * ``ValueError``

Answer
------

Extended slice assignment replaces the elements at indexes 0, 2 and 4 with the
three new values, leaving the odd indexes untouched, giving
``[0, 2, 0, 4, 0]``. The replacement length must match the slice length.

What is the output?
===================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    x = 10

    def f():
        print(x)
        x = 5

    f()

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``10``
   * ``5``
   * ``UnboundLocalError``
   * ``NameError``

Answer
------

Because ``x`` is assigned somewhere in ``f``, it is treated as a local for the
whole function. The ``print(x)`` runs before that local is assigned, so it
raises ``UnboundLocalError`` rather than reading the global ``x``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    print(0.1 + 0.2 + 0.3 == 0.3 + 0.2 + 0.1)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``True``
   * ``False``
   * ``0.6``
   * ``ValueError``

Answer
------

Floating-point addition is not associative: rounding happens at each step, and
different groupings accumulate different tiny errors. The two sums differ in
the last bit, so the comparison is ``False``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    print(2 ** 3 ** 2)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``64``
   * ``512``
   * ``256``
   * ``18``

Answer
------

Unlike most operators, ``**`` is right-associative, so this is
``2 ** (3 ** 2)`` = ``2 ** 9`` = ``512``. Left-associative evaluation would
have given ``(2 ** 3) ** 2`` = ``64``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    lst = [10, 20]
    print(lst[False], lst[True])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``10 20``
   * ``20 10``
   * ``TypeError``
   * ``IndexError``

Answer
------

Booleans are integers, so ``False`` and ``True`` act as the indexes ``0`` and
``1``. ``lst[False]`` is ``10`` and ``lst[True]`` is ``20``, printing
``10 20``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    s = "a" "b"
    print(s)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``ab``
   * ``a b``
   * ``('a', 'b')``
   * ``SyntaxError``

Answer
------

Adjacent string literals are concatenated at compile time, with no operator
needed. ``"a" "b"`` becomes the single string ``"ab"``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    print(... is Ellipsis)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``SyntaxError``
   * ``NameError``

Answer
------

``...`` is literal syntax for the built-in singleton ``Ellipsis``, so they are
the same object and ``is`` is ``True``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 55

.. code-block::

    x = [0, 0]
    i = 0
    x[i] = i = 1
    print(x, i)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[0, 1] 1``
   * ``[1, 0] 1``
   * ``[1, 1] 1``
   * ``[1, 0] 0``

Answer
------

The right-hand side ``1`` is evaluated once, then targets are assigned left to
right. First ``x[i]`` with the current ``i = 0`` sets ``x[0] = 1``; only then
does ``i`` become ``1``. So ``x`` is ``[1, 0]`` and ``i`` is ``1``.
