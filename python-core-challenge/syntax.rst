:orphan:

Syntax Hard
***********

.. quiz-section::
   :data-category: syntax
   :data-level: hard

What does ``else`` do in this code?
===================================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    try:
        1 / 0
    except ZeroDivisionError:
        logger.warning("...")
    else:
        ...

.. quiz-choices::
   :data-randomize: true
   :data-correct: 4

   * The code executes if none of the above exceptions are matched.
   * The code always executes, unless there has been a handled exception.
   * ``SyntaxError``: The code is incorrect (``else`` is not valid here).
   * The code only executes if the ``try`` block was executed successfully.

Answer
------

``else`` allows us to execute code only if the code in the ``try`` block
executed successfully. This is very useful for logging on success, but we
don't want to capture the exception if logging fails.

.. code-block::

    try:
        ...
    except Exception:
        logger.exception("...")
    else:
        logger.info("code executed successfully")
    # More code
    ...

What does this expression print?
================================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    x = [1, 2, 3]
    y = x
    y += [4]
    print(x)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``[1, 2, 3]``
   * ``[1, 2, 3, 4]``
   * ``TypeError``: lists don't support ``+=``.
   * ``[4, 1, 2, 3]``

Answer
------

``y`` is not a copy: both names point to the same list, and ``+=`` on a
list mutates it in place (it calls ``__iadd__``, like ``extend``).


Syntax Medium
*************

.. quiz-section::
   :data-category: syntax
   :data-level: medium

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    class Greeter:
        greeting = "hello"

        def greet(self):
            return self.greeting

    a = Greeter()
    a.greeting = "hi"
    print(Greeter().greet(), a.greet())

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``hi hi``
   * ``hello hello``
   * ``hello hi``
   * ``AttributeError``

Answer
------

``a.greeting = "hi"`` creates an **instance** attribute that shadows the
class attribute only for ``a``. New instances keep reading the class
attribute ``"hello"``.


Syntax Easy
***********

.. quiz-section::
   :data-category: syntax
   :data-level: easy

Which literal creates an empty set?
===================================

.. quiz-question::
   :data-seconds: 20

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``{}``
   * ``[]``
   * ``set()``
   * ``()``

Answer
------

``{}`` creates an empty **dict**. The only way to create an empty set is
calling ``set()``.

What is the result of ``3 / 2`` in Python 3?
============================================

.. quiz-question::
   :data-seconds: 15

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``1``
   * ``1.5``
   * ``2``
   * ``TypeError``

Answer
------

In Python 3, ``/`` is always true division and returns a ``float``.
Integer (floor) division is ``//``.
