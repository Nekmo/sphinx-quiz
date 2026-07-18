:orphan:

Library Easy
************

.. quiz-section::
   :data-category: library
   :data-level: easy

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    from collections import Counter
    print(Counter("mississippi").most_common(1))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[('i', 4)]``
   * ``[('s', 4)]``
   * ``[('i', 5)]``
   * ``[('m', 1)]``

Answer
------

``Counter.most_common(1)`` returns the single most frequent element as a
``(value, count)`` pair. Both "i" and "s" appear 4 times, and ties are broken
by first insertion order, so "i" wins.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    from collections import deque
    d = deque([1, 2, 3])
    d.appendleft(0)
    print(d)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``deque([0, 1, 2, 3])``
   * ``deque([1, 2, 3, 0])``
   * ``deque([0, 3, 2, 1])``
   * ``[0, 1, 2, 3]``

Answer
------

``deque.appendleft`` adds an item at the front in O(1), giving
``deque([0, 1, 2, 3])``. The ``repr`` of a deque includes the ``deque(...)``
wrapper.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    import json
    print(json.dumps({"a": 1, "b": 2}))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``{"a": 1, "b": 2}``
   * ``{'a': 1, 'b': 2}``
   * ``{"a":1,"b":2}``
   * ``{a: 1, b: 2}``

Answer
------

``json.dumps`` always uses double quotes (valid JSON) and, by default, a space
after each ``:`` and ``,``. Python's single-quoted ``repr`` is not JSON.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    import math
    print(math.floor(3.7))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``3``
   * ``4``
   * ``3.0``
   * ``3.7``

Answer
------

``math.floor`` rounds toward negative infinity and returns an ``int``, so
``math.floor(3.7)`` is ``3`` (not ``3.0``).

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    import os.path
    print(os.path.join("home", "user", "file.txt"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``home/user/file.txt``
   * ``home\user\file.txt``
   * ``home user file.txt``
   * ``['home', 'user', 'file.txt']``

Answer
------

``os.path.join`` inserts the platform separator between parts; on POSIX
systems that is ``/``, producing ``home/user/file.txt``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    from collections import namedtuple
    Point = namedtuple("Point", ["x", "y"])
    p = Point(1, 2)
    print(p.x + p.y)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``3``
   * ``12``
   * ``(1, 2)``
   * ``Point(x=1, y=2)``

Answer
------

A ``namedtuple`` gives fields named access. ``p.x`` is ``1`` and ``p.y`` is
``2``, so ``p.x + p.y`` is ``3``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from collections import defaultdict
    d = defaultdict(int)
    d["a"] += 1
    d["a"] += 1
    print(d["a"])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``2``
   * ``1``
   * ``0``
   * raises ``KeyError``

Answer
------

``defaultdict(int)`` supplies ``0`` for a missing key, so the first ``+= 1``
starts from ``0``. After two increments ``d["a"]`` is ``2`` and no ``KeyError``
is raised.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    from itertools import chain
    print(list(chain([1, 2], [3, 4])))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[1, 2, 3, 4]``
   * ``[[1, 2], [3, 4]]``
   * ``[1, 3, 2, 4]``
   * ``[(1, 3), (2, 4)]``

Answer
------

``itertools.chain`` flattens one level: it yields the items of each iterable in
turn, giving ``[1, 2, 3, 4]``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from functools import reduce
    print(reduce(lambda a, b: a + b, [1, 2, 3, 4]))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``10``
   * ``24``
   * ``[1, 2, 3, 4]``
   * ``1234``

Answer
------

``reduce`` folds the function across the list left to right:
``((1+2)+3)+4`` equals ``10``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    from datetime import date, timedelta
    print(date(2020, 1, 1) + timedelta(days=31))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``2020-02-01``
   * ``2020-01-32``
   * ``2020-02-31``
   * ``2020-01-31``

Answer
------

January has 31 days, so adding a 31-day ``timedelta`` to Jan 1 lands on Feb 1,
printed in ISO format as ``2020-02-01``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 35

.. code-block::

    import re
    print(re.findall(r"\d+", "a1b22c333"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``['1', '22', '333']``
   * ``['1', '2', '3']``
   * ``[1, 22, 333]``
   * ``['123']``

Answer
------

``\d+`` matches maximal runs of digits, and ``re.findall`` returns them as a
list of strings: ``['1', '22', '333']``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    import string
    print(string.ascii_lowercase[:5])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``abcde``
   * ``ABCDE``
   * ``['a', 'b', 'c', 'd', 'e']``
   * ``abcdef``

Answer
------

``string.ascii_lowercase`` is the string ``"abcdefghijklmnopqrstuvwxyz"``;
slicing ``[:5]`` returns its first five characters, ``"abcde"``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    import math
    print(math.factorial(5))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``120``
   * ``25``
   * ``15``
   * ``720``

Answer
------

``math.factorial(5)`` is ``5 * 4 * 3 * 2 * 1`` which equals ``120``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    from collections import Counter
    c = Counter(a=2, b=1)
    print(sorted(c.elements()))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``['a', 'a', 'b']``
   * ``['a', 'b']``
   * ``['a', 'b', 'b']``
   * ``[('a', 2), ('b', 1)]``

Answer
------

``Counter.elements()`` yields each element as many times as its count, so it
produces ``a``, ``a``, ``b``; sorted, that is ``['a', 'a', 'b']``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    from fractions import Fraction
    print(Fraction(1, 2) + Fraction(1, 3))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``5/6``
   * ``2/5``
   * ``1/6``
   * ``0.8333333333333334``

Answer
------

``Fraction`` does exact rational arithmetic: ``1/2 + 1/3 = 3/6 + 2/6 = 5/6``,
automatically reduced to lowest terms.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    from decimal import Decimal
    print(Decimal("0.1") + Decimal("0.2"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``0.3``
   * ``0.30000000000000004``
   * ``0.30``
   * ``0.6``

Answer
------

``Decimal`` built from strings avoids binary floating-point error, so
``Decimal("0.1") + Decimal("0.2")`` is exactly ``0.3`` (unlike ``0.1 + 0.2``
with floats).

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from enum import Enum
    class Color(Enum):
        RED = 1
        GREEN = 2
    print(Color.RED.value)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``1``
   * ``Color.RED``
   * ``RED``
   * ``0``

Answer
------

``.value`` returns the value assigned to an enum member, which is ``1`` for
``Color.RED``. The member's ``.name`` would be ``'RED'``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from dataclasses import dataclass
    @dataclass
    class P:
        x: int
        y: int
    print(P(1, 2))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``P(x=1, y=2)``
   * ``P(1, 2)``
   * ``<__main__.P object at 0x...>``
   * ``{'x': 1, 'y': 2}``

Answer
------

``@dataclass`` auto-generates a ``__repr__`` showing the class name and each
field as ``name=value``, producing ``P(x=1, y=2)``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 30

.. code-block::

    from pathlib import Path
    print(Path("archive.tar.gz").suffix)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``.gz``
   * ``.tar.gz``
   * ``.tar``
   * ``gz``

Answer
------

``.suffix`` returns only the last extension, including the dot: ``.gz``. Use
``.suffixes`` to get ``['.tar', '.gz']``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    a = [1, 2, 3]
    b = a.copy()
    b.append(4)
    print(a)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[1, 2, 3]``
   * ``[1, 2, 3, 4]``
   * ``[4, 1, 2, 3]``
   * ``[1, 2, 3, 4, 4]``

Answer
------

``list.copy()`` makes a new (shallow) list, so appending to ``b`` does not
affect ``a``. ``a`` stays ``[1, 2, 3]``.
