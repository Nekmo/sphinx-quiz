:orphan:

Library Easy
************

.. quiz-section::
   :data-category: library
   :data-level: easy

Which module turns a dict into a JSON string?
=============================================

.. quiz-question::
   :data-seconds: 20

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``json`` (``json.dumps``)
   * ``pickle`` (``pickle.dumps``)
   * ``csv`` (``csv.writer``)
   * ``marshal`` (``marshal.dumps``)

Answer
------

``json.dumps`` serializes to a JSON string (``json.dump`` writes to a
file). ``pickle`` and ``marshal`` produce Python-specific binary
formats, not JSON.


Library Medium
**************

.. quiz-section::
   :data-category: library
   :data-level: medium

What does ``Counter("banana").most_common(1)`` return?
======================================================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    from collections import Counter
    Counter("banana").most_common(1)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 2

   * ``("a", 3)``
   * ``[("a", 3)]``
   * ``{"a": 3}``
   * ``"a"``

Answer
------

``most_common(n)`` always returns a **list** of ``(element, count)``
tuples, even for ``n=1``.

What does the ``/`` operator do with ``pathlib.Path``?
======================================================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    from pathlib import Path
    Path("/etc") / "nginx" / "nginx.conf"

.. quiz-choices::
   :data-randomize: true
   :data-correct: 3

   * ``TypeError``: paths don't support division.
   * Splits the path into its components.
   * Joins path segments: ``Path("/etc/nginx/nginx.conf")``.
   * Computes the relative path between both.

Answer
------

``Path`` overloads ``/`` (``__truediv__``) as the path-join operator, a
readable replacement for ``os.path.join``.


Library Hard
************

.. quiz-section::
   :data-category: library
   :data-level: hard

What does ``itertools.islice(count(10), 3)`` produce?
=====================================================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    from itertools import count, islice
    list(islice(count(10), 3))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[10, 11, 12]``
   * ``[0, 1, 2, ..., 9]``
   * ``[10, 13, 16]``
   * It never returns: ``count`` is infinite.

Answer
------

``count(10)`` yields ``10, 11, 12, ...`` forever, and ``islice(..., 3)``
lazily takes the first three items — the safe way to slice an infinite
iterator.
