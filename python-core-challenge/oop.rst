:orphan:

OOP Medium
**********

.. quiz-section::
   :data-category: oop
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
