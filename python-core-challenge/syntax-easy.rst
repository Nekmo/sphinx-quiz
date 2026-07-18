:orphan:

Syntax Easy
***********

.. quiz-section::
   :data-category: syntax
   :data-level: easy

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(7 // 2)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``3.5``
   * ``3``
   * ``4``
   * ``3.0``

Answer
------

``//`` is floor division on two ints, so it discards the remainder and
returns the integer ``3``. Only ``/`` (true division) would give a float.

What is the output?
===================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(3 / 2)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``1``
   * ``1.5``
   * ``2``
   * ``1.0``

Answer
------

In Python 3 the ``/`` operator always performs true division and returns a
``float``, so ``3 / 2`` is ``1.5`` even though both operands are ints.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(2 ** 3)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``6``
   * ``8``
   * ``9``
   * ``23``

Answer
------

``**`` is the exponentiation operator, so ``2 ** 3`` means two to the power
of three, which is ``8`` (not ``2 * 3``).

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print("ab" * 3)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``ababab``
   * ``abababab``
   * ``ab3``
   * ``TypeError``

Answer
------

Multiplying a string by an integer repeats it, so ``"ab" * 3`` produces the
string concatenated three times: ``ababab``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print([0] * 3)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[0, 3]``
   * ``[0, 0, 0]``
   * ``[[0], [0], [0]]``
   * ``[3]``

Answer
------

The ``*`` operator on a list repeats its elements, so ``[0] * 3`` builds a
new list containing the single element three times: ``[0, 0, 0]``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print("python"[-2:])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``on``
   * ``ho``
   * ``yth``
   * ``n``

Answer
------

Index ``-2`` is the second-to-last character (``o``), and the open-ended
slice ``[-2:]`` runs from there to the end, giving ``on``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print("python"[1:4])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``pyt``
   * ``yth``
   * ``ytho``
   * ``python``

Answer
------

Slicing is half-open: ``[1:4]`` includes indexes 1, 2 and 3 but stops
before index 4, so from ``"python"`` you get ``yth``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 20

.. code-block::

    print(type((1,)))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``<class 'int'>``
   * ``<class 'tuple'>``
   * ``<class 'list'>``
   * ``<class 'set'>``

Answer
------

It is the trailing comma, not the parentheses, that makes a tuple. ``(1,)``
is a one-element tuple, whereas ``(1)`` would just be the integer ``1``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(10 % 3)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``3``
   * ``0``
   * ``1``
   * ``3.33``

Answer
------

``%`` is the modulo (remainder) operator. ``10`` divided by ``3`` is ``3``
with a remainder of ``1``, so the result is ``1``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(1 + 2 * 3)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``9``
   * ``7``
   * ``6``
   * ``123``

Answer
------

Multiplication has higher precedence than addition, so ``2 * 3`` is
evaluated first, then ``1 +`` is added, giving ``7``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(True + True)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``TypeError``
   * ``True``
   * ``2``
   * ``1``

Answer
------

``bool`` is a subclass of ``int``, where ``True`` equals ``1``. Adding them
with ``+`` does integer arithmetic, so ``True + True`` is ``2``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print("a" + "b" * 2)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``abab``
   * ``abb``
   * ``aab``
   * ``ab2``

Answer
------

``*`` binds tighter than ``+``, so ``"b" * 2`` (``"bb"``) is computed first,
then concatenated after ``"a"``, giving ``abb``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 20

.. code-block::

    print("abcdef"[::2])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``abc``
   * ``ace``
   * ``bdf``
   * ``fedcba``

Answer
------

The third slice value is the step. ``[::2]`` starts at the beginning and
takes every second character, so from ``"abcdef"`` you get ``ace``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    a = b = 5
    print(a, b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``5 5``
   * ``5``
   * ``5 None``
   * ``NameError``

Answer
------

Chained assignment binds the same value to every target, so both ``a`` and
``b`` become ``5`` and the line prints ``5 5``.

What is the output?
===================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    a, b = 1, 2
    print(a + b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``12``
   * ``3``
   * ``(1, 2)``
   * ``TypeError``

Answer
------

Tuple unpacking assigns ``a = 1`` and ``b = 2``, so ``a + b`` is the integer
sum ``3``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print("yes" if 5 > 3 else "no")

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``yes``
   * ``no``
   * ``True``
   * ``SyntaxError``

Answer
------

This is a conditional expression: the value before ``if`` is used when the
condition is true. Since ``5 > 3`` is true, it evaluates to ``yes``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 20

.. code-block::

    print(0 or "hi")

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``0``
   * ``hi``
   * ``True``
   * ``False``

Answer
------

``or`` returns the first truthy operand (or the last one). ``0`` is falsy, so
it returns the second operand, the string ``hi`` itself, not a boolean.

What is the output?
===================

.. quiz-question::
   :data-seconds: 20

.. code-block::

    print([i * 2 for i in range(3)])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[0, 1, 2]``
   * ``[0, 2, 4]``
   * ``[2, 4, 6]``
   * ``[0, 2, 4, 6]``

Answer
------

``range(3)`` yields ``0, 1, 2`` and the comprehension doubles each, producing
``[0, 2, 4]``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(1_000_000)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``1_000_000``
   * ``1000000``
   * ``1000``
   * ``SyntaxError``

Answer
------

Underscores are legal digit-group separators in numeric literals; they are
purely cosmetic, so ``1_000_000`` is just the integer ``1000000``.

What does this print?
=====================

.. quiz-question::
   :data-seconds: 15

.. code-block::

    print(0xff)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``0xff``
   * ``255``
   * ``16``
   * ``15``

Answer
------

The ``0x`` prefix marks a hexadecimal literal. ``ff`` in base 16 is
``15 * 16 + 15``, which prints as the decimal integer ``255``.
