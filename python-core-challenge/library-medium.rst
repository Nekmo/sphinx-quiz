:orphan:

Library Medium
**************

.. quiz-section::
   :data-category: library
   :data-level: medium

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    from collections import defaultdict
    d = defaultdict(list)
    for i in range(5):
        d[i % 2].append(i)
    print(dict(d))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``{0: [0, 2, 4], 1: [1, 3]}``
   * ``{0: [0, 1, 2, 3, 4], 1: []}``
   * ``{0: 3, 1: 2}``
   * raises ``KeyError``

Answer
------

``defaultdict(list)`` auto-creates an empty list the first time each key is
touched, so ``.append`` never raises. Even numbers group under key ``0`` and
odd numbers under key ``1``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    from itertools import chain
    print(list(chain.from_iterable([[1, 2], [3], [4, 5]])))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[1, 2, 3, 4, 5]``
   * ``[[1, 2], [3], [4, 5]]``
   * ``[1, 3, 4]``
   * ``[[1, 2, 3, 4, 5]]``

Answer
------

``chain.from_iterable`` takes a single iterable of iterables and concatenates
them, flattening one level to ``[1, 2, 3, 4, 5]``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    import json
    data = json.loads(json.dumps((1, 2, 3)))
    print(type(data).__name__, data)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``list [1, 2, 3]``
   * ``tuple (1, 2, 3)``
   * ``str (1, 2, 3)``
   * ``list [1, 2, 3, 3]``

Answer
------

JSON has no tuple type: ``json.dumps`` serializes a tuple as an array, and
``json.loads`` reads any array back as a ``list``. The round trip loses the
tuple type.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    import re
    print(re.findall(r"(\w)(\d)", "a1b2c3"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[('a', '1'), ('b', '2'), ('c', '3')]``
   * ``['a1', 'b2', 'c3']``
   * ``['a', '1', 'b', '2', 'c', '3']``
   * ``[('a1'), ('b2'), ('c3')]``

Answer
------

When a pattern has more than one capturing group, ``re.findall`` returns a list
of tuples, one per match, with each group's text. Here each match is a
``(letter, digit)`` pair.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    from functools import reduce
    print(reduce(lambda a, b: a + b, [], 10))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``10``
   * raises ``TypeError``
   * ``0``
   * ``None``

Answer
------

With an explicit initializer, ``reduce`` returns that initializer unchanged
when the iterable is empty; the function is never called. Without an
initializer, an empty iterable would raise ``TypeError``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    from collections import Counter
    c = Counter(a=3, b=1)
    c.subtract(Counter(a=1, b=2))
    print(dict(c))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``{'a': 2, 'b': -1}``
   * ``{'a': 2}``
   * ``{'a': 2, 'b': 0}``
   * ``{'a': 4, 'b': 3}``

Answer
------

The ``subtract`` method decrements counts in place and, unlike the ``-``
operator, keeps zero and negative results. ``b`` becomes ``1 - 2 = -1``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    from itertools import product
    print(list(product([0, 1], repeat=2)))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[(0, 0), (0, 1), (1, 0), (1, 1)]``
   * ``[(0, 1), (1, 0)]``
   * ``[(0, 0), (1, 1)]``
   * ``[0, 1, 0, 1]``

Answer
------

``product([0, 1], repeat=2)`` is the Cartesian product of the set with itself,
enumerating all four ordered pairs with the rightmost element varying fastest.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    from itertools import combinations
    print(list(combinations("ABC", 2)))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[('A', 'B'), ('A', 'C'), ('B', 'C')]``
   * ``[('A', 'B'), ('B', 'A'), ('A', 'C')]``
   * ``[('A', 'A'), ('B', 'B'), ('C', 'C')]``
   * ``[('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'B')]``

Answer
------

``combinations`` yields unordered selections without repetition, in input
order, so pairs like ``('B', 'A')`` never appear. There are three 2-element
combinations of ``ABC``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    from functools import partial
    f = partial(int, base=2)
    print(f("101"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``5``
   * ``101``
   * ``3``
   * raises ``ValueError``

Answer
------

``partial(int, base=2)`` pre-binds the ``base`` keyword. Calling ``f("101")``
parses ``"101"`` as binary, which equals ``5``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    from datetime import date
    print(date(2020, 1, 1).weekday())

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``2``
   * ``3``
   * ``0``
   * ``1``

Answer
------

``weekday()`` numbers days with Monday as ``0`` through Sunday as ``6``. Jan 1,
2020 was a Wednesday, so it returns ``2``. (``isoweekday()`` would give ``3``.)

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    from functools import lru_cache
    @lru_cache
    def sq(n):
        return n * n
    sq(3); sq(3); sq(4)
    print(sq.cache_info().hits, sq.cache_info().misses)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``1 2``
   * ``0 3``
   * ``2 1``
   * ``3 0``

Answer
------

The first ``sq(3)`` and ``sq(4)`` are cache misses; the repeated ``sq(3)`` is a
hit. So ``cache_info()`` reports 1 hit and 2 misses.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    from collections import OrderedDict
    d = OrderedDict([("a", 1), ("b", 2), ("c", 3)])
    d.move_to_end("a")
    print(list(d))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``['b', 'c', 'a']``
   * ``['a', 'b', 'c']``
   * ``['c', 'b', 'a']``
   * ``['a', 'c', 'b']``

Answer
------

``move_to_end("a")`` moves key ``"a"`` to the last position (the default end),
leaving ``b`` and ``c`` in their relative order, so iteration yields
``['b', 'c', 'a']``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    import re
    print(re.sub(r"\s+", "_", "hello   world  foo"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``hello_world_foo``
   * ``hello___world__foo``
   * ``hello world foo``
   * ``hello_ world_ foo``

Answer
------

``\s+`` matches each maximal run of whitespace as one match, and ``re.sub``
replaces each with a single ``_``, collapsing the gaps to ``hello_world_foo``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    import math
    print(math.isclose(0.1 + 0.2, 0.3))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``True``
   * ``False``
   * ``0.30000000000000004``
   * raises ``ValueError``

Answer
------

``0.1 + 0.2`` is ``0.30000000000000004`` due to binary floating point, but
``math.isclose`` compares within a relative tolerance and reports ``True``.
Plain ``==`` would give ``False``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    from collections import deque
    d = deque(maxlen=3)
    for i in range(5):
        d.append(i)
    print(d)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``deque([2, 3, 4], maxlen=3)``
   * ``deque([0, 1, 2], maxlen=3)``
   * ``deque([0, 1, 2, 3, 4], maxlen=3)``
   * raises ``IndexError``

Answer
------

A bounded ``deque`` silently drops items from the opposite end when it is full.
Appending on the right past ``maxlen=3`` evicts from the left, keeping the last
three values ``[2, 3, 4]``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    import copy
    a = [[1, 2], [3, 4]]
    b = copy.copy(a)
    b[0].append(99)
    print(a)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[[1, 2, 99], [3, 4]]``
   * ``[[1, 2], [3, 4]]``
   * ``[[1, 2, 99], [3, 4, 99]]``
   * ``[[1, 2], [3, 4, 99]]``

Answer
------

``copy.copy`` is shallow: ``b`` is a new outer list but its elements are the
*same* inner lists as ``a``. Mutating ``b[0]`` mutates the shared inner list,
so ``a`` changes too.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    from itertools import count, islice
    print(list(islice(count(10, 2), 4)))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[10, 12, 14, 16]``
   * ``[10, 11, 12, 13]``
   * ``[10, 12, 14, 16, 18]``
   * ``[2, 4, 6, 8]``

Answer
------

``count(10, 2)`` is an infinite counter starting at 10 with step 2, and
``islice(..., 4)`` takes its first four values: ``[10, 12, 14, 16]``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    from datetime import timedelta
    print(timedelta(hours=1, minutes=30).total_seconds())

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``5400.0``
   * ``90.0``
   * ``5400``
   * ``1.5``

Answer
------

``total_seconds`` returns the whole duration as a float number of seconds:
``1 h 30 min`` is ``5400.0`` seconds.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    import json
    print(json.dumps({"b": 1, "a": 2}, sort_keys=True))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``{"a": 2, "b": 1}``
   * ``{"b": 1, "a": 2}``
   * ``{"a": 1, "b": 2}``
   * ``{'a': 2, 'b': 1}``

Answer
------

``sort_keys=True`` orders keys alphabetically in the output regardless of
insertion order, but the values stay attached to their own keys: ``a`` keeps
``2`` and ``b`` keeps ``1``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    from enum import Enum, auto
    class Color(Enum):
        RED = auto()
        GREEN = auto()
        BLUE = auto()
    print(Color.BLUE.value)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``3``
   * ``0``
   * ``2``
   * ``BLUE``

Answer
------

``auto()`` assigns increasing integers starting at ``1`` by default, so
``RED=1``, ``GREEN=2``, ``BLUE=3``. ``Color.BLUE.value`` is ``3``.
