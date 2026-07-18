:orphan:

Syntax Medium
*************

.. quiz-section::
   :data-category: syntax
   :data-level: medium

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    def add(x, acc=[]):
        acc.append(x)
        return acc

    add(1)
    print(add(2))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[2]``
   * ``[1, 2]``
   * ``[1]``
   * ``[2, 1]``

Answer
------

A default argument is evaluated once, when the function is defined, and the
same list object is reused on every call. The first call appends ``1`` and
the second appends ``2`` to that same list, so it prints ``[1, 2]``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    funcs = [lambda: i for i in range(3)]
    print([f() for f in funcs])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[0, 1, 2]``
   * ``[2, 2, 2]``
   * ``[0, 0, 0]``
   * ``[3, 3, 3]``

Answer
------

Closures capture the variable ``i``, not its value at creation time (late
binding). All three lambdas share the same ``i``, which is ``2`` once the
comprehension finishes, so every call returns ``2``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    print(False == False in [False])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``[False]``
   * ``TypeError``

Answer
------

This is a chained comparison, so it expands to
``(False == False) and (False in [False])``. Both parts are true, so the
whole expression is ``True``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    a = [1, 2, 3]
    i = 0
    i, a[i] = 1, 5
    print(a)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[5, 2, 3]``
   * ``[1, 5, 3]``
   * ``[1, 2, 5]``
   * ``[5, 5, 3]``

Answer
------

The right-hand side ``(1, 5)`` is evaluated first, then targets are assigned
left to right. ``i`` becomes ``1``, and only then is ``a[i] = 5`` applied
using the new ``i``, so ``a[1]`` is set, giving ``[1, 5, 3]``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    a = [1, 2]
    b = a
    a += [3]
    print(b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[1, 2]``
   * ``[1, 2, 3]``
   * ``[3, 1, 2]``
   * ``[1, 2, [3]]``

Answer
------

For lists, ``+=`` calls ``list.extend`` and mutates the object in place
rather than creating a new one. ``b`` still refers to that same list, so it
also sees the appended ``3``: ``[1, 2, 3]``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    a = [1, 2]
    b = a
    a = a + [3]
    print(b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[1, 2, 3]``
   * ``[1, 2]``
   * ``[3]``
   * ``[1, 2, 3, 3]``

Answer
------

Unlike ``+=``, the expression ``a + [3]`` builds a brand-new list and rebinds
``a`` to it. ``b`` still points at the original, unmodified list, so it prints
``[1, 2]``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    i = 5

    def f(x=i):
        return x

    i = 10
    print(f())

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``5``
   * ``10``
   * ``None``
   * ``NameError``

Answer
------

The default value is captured when the ``def`` statement runs, at which
point ``i`` is ``5``. Reassigning ``i`` afterward does not change the stored
default, so ``f()`` returns ``5``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    a, *b, c = [1, 2, 3, 4, 5]
    print(b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[2, 3, 4]``
   * ``2``
   * ``[2, 3, 4, 5]``
   * ``(2, 3, 4)``

Answer
------

A starred target in unpacking soaks up all the leftover items as a ``list``.
``a`` takes ``1``, ``c`` takes ``5``, and ``b`` gets everything between them:
``[2, 3, 4]``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    print(0 and 1 or 2)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``0``
   * ``1``
   * ``2``
   * ``True``

Answer
------

``and`` binds tighter than ``or``. ``0 and 1`` short-circuits to ``0`` (falsy),
then ``0 or 2`` returns the second operand ``2``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    grid = [[0] * 2] * 2
    grid[0][0] = 1
    print(grid)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[[1, 0], [0, 0]]``
   * ``[[1, 0], [1, 0]]``
   * ``[[1, 1], [0, 0]]``
   * ``[[1], [0]]``

Answer
------

The outer ``* 2`` copies the *reference* to the inner list, not the list
itself, so both rows are the same object. Mutating one row is visible in the
other, giving ``[[1, 0], [1, 0]]``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    x = [1, 2]
    y = [1, 2]
    print(x == y, x is y)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``True True``
   * ``True False``
   * ``False False``
   * ``False True``

Answer
------

``==`` compares values, so equal contents make it ``True``. ``is`` compares
identity, and two separate list literals are distinct objects, so it is
``False``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(-7 // 2)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``-3``
   * ``-4``
   * ``-3.5``
   * ``3``

Answer
------

Floor division rounds toward negative infinity, not toward zero. ``-7 / 2``
is ``-3.5``, and the floor of that is ``-4``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print(-7 % 3)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``-1``
   * ``2``
   * ``-2``
   * ``1``

Answer
------

In Python the result of ``%`` takes the sign of the divisor. Since
``-7 // 3`` is ``-3``, the remainder is ``-7 - (-3 * 3) = 2``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    def f(lst):
        lst = lst + [4]

    def g(lst):
        lst.append(4)

    x = [1]
    f(x)
    g(x)
    print(x)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[1]``
   * ``[1, 4]``
   * ``[1, 4, 4]``
   * ``[1, 4, 4, 4]``

Answer
------

``f`` rebinds its local name ``lst`` to a new list, leaving the caller's list
untouched. ``g`` mutates the list in place via ``append``, so only ``g``'s
change is visible: ``[1, 4]``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    x = "outer"
    result = [x for x in range(3)]
    print(x)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``outer``
   * ``2``
   * ``[0, 1, 2]``
   * ``NameError``

Answer
------

In Python 3 a comprehension has its own scope, so its loop variable ``x``
does not leak out and overwrite the outer ``x``. The outer name still holds
``"outer"``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    x = 1 if True else 2 if False else 3
    print(x)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``1``
   * ``2``
   * ``3``
   * ``SyntaxError``

Answer
------

Conditional expressions group right to left, reading as
``1 if True else (2 if False else 3)``. The first condition is true, so the
whole thing is ``1`` and the nested part is never evaluated.

What is the output?
===================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    def f(a, b=10, *, c):
        return a + b + c

    print(f(1, c=2))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``13``
   * ``3``
   * ``TypeError``
   * ``11``

Answer
------

The bare ``*`` makes ``c`` keyword-only, so it must be passed by name. With
``a=1``, the default ``b=10`` and ``c=2``, the sum is ``13``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    data = [y := x + 1 for x in range(3)]
    print(y)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``NameError``
   * ``3``
   * ``2``
   * ``[1, 2, 3]``

Answer
------

Unlike the comprehension's own loop variable, a walrus (``:=``) target binds
in the *enclosing* scope. After the loop it holds the last assigned value,
``2 + 1``, so ``y`` is ``3``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    print("5" + 3 * "2")

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``522``
   * ``5222``
   * ``5 222``
   * ``TypeError``

Answer
------

``*`` runs before ``+``, so ``3 * "2"`` is ``"222"``, then string
concatenation prepends ``"5"``, producing ``5222``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    def f():
        return 1, 2, 3

    print(f()[1])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``1``
   * ``2``
   * ``(1, 2, 3)``
   * ``TypeError``

Answer
------

A comma-separated ``return`` builds a tuple, so ``f()`` returns
``(1, 2, 3)``. Indexing it with ``[1]`` gives the second element, ``2``.
