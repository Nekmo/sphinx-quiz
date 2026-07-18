:orphan:

Library Hard
************

.. quiz-section::
   :data-category: library
   :data-level: hard

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    import json
    print(json.dumps({1: "a", 2: "b"}))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``{"1": "a", "2": "b"}``
   * ``{1: "a", 2: "b"}``
   * raises ``TypeError``
   * ``[[1, "a"], [2, "b"]]``

Answer
------

JSON object keys must be strings, so ``json.dumps`` coerces integer keys to
their string form. A later ``json.loads`` will not turn them back into ints,
so the round trip changes the key type.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    import copy
    inner = [1, 2]
    a = [inner, inner]
    b = copy.deepcopy(a)
    b[0].append(3)
    print(b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[[1, 2, 3], [1, 2, 3]]``
   * ``[[1, 2, 3], [1, 2]]``
   * ``[[1, 2], [1, 2]]``
   * ``[[1, 2, 3, 3], [1, 2]]``

Answer
------

Both elements of ``a`` are the *same* list object. ``deepcopy`` uses a memo so
that shared identity is preserved in the copy: ``b[0]`` and ``b[1]`` are still
the same object, so appending to one shows up in both.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    from itertools import groupby
    data = [1, 1, 2, 1, 1]
    print([k for k, g in groupby(data)])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[1, 2, 1]``
   * ``[1, 2]``
   * ``[1, 1, 2, 1, 1]``
   * ``[1, 2, 1, 1]``

Answer
------

``groupby`` only collapses *consecutive* equal items; it does not sort first.
The two runs of ``1`` are separated by a ``2``, so they form distinct groups
and the keys are ``[1, 2, 1]``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    from collections import Counter
    c = Counter(a=3, b=1) - Counter(a=1, b=2)
    print(dict(c))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``{'a': 2}``
   * ``{'a': 2, 'b': -1}``
   * ``{'a': 2, 'b': 0}``
   * ``{'a': 4, 'b': 3}``

Answer
------

The ``-`` operator on ``Counter`` keeps only results with a *positive* count.
``a`` becomes ``2`` and stays; ``b`` would be ``-1`` and is dropped entirely.
Use ``.subtract`` if you need to keep zero/negative counts.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from datetime import datetime, timedelta
    print(datetime(2020, 3, 8, 12) + timedelta(days=1))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``2020-03-09 12:00:00``
   * ``2020-03-09 13:00:00``
   * ``2020-03-09 11:00:00``
   * ``2020-03-08 12:00:00``

Answer
------

A naive ``datetime`` has no time zone, so ``timedelta`` arithmetic is pure
wall-clock math with no DST adjustment. Adding exactly one day keeps the time
at ``12:00:00`` even though March 8, 2020 was a US DST transition.

What happens when this runs?
============================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from functools import lru_cache
    @lru_cache
    def f(x):
        return len(x)
    f([1, 2, 3])

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * raises ``TypeError``
   * prints ``3``
   * raises ``KeyError``
   * returns ``3`` with no error

Answer
------

``lru_cache`` stores arguments as dictionary keys, so every argument must be
hashable. A ``list`` is unhashable, so the wrapper raises
``TypeError: unhashable type: 'list'`` before the body runs.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    import re
    print(re.findall(r"a.*?b", "axbxxab"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``['axb', 'ab']``
   * ``['axbxxab']``
   * ``['axbxxab', 'ab']``
   * ``['ab']``

Answer
------

``.*?`` is non-greedy, matching as few characters as possible before the next
``b``. The first match stops at the first ``b`` (``axb``); matching resumes
after it and finds ``ab``. A greedy ``.*`` would swallow the whole string.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    from functools import cmp_to_key
    def cmp(a, b):
        return b - a
    print(sorted([3, 1, 2], key=cmp_to_key(cmp)))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[3, 2, 1]``
   * ``[1, 2, 3]``
   * ``[2, 1, 3]``
   * raises ``TypeError``

Answer
------

``cmp_to_key`` adapts an old-style comparison function to a key. Returning
``b - a`` is positive when ``a < b``, which orders larger values first,
producing a descending sort ``[3, 2, 1]``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 40

.. code-block::

    import math
    print(math.nan == math.nan)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``False``
   * ``True``
   * raises ``ValueError``
   * ``nan``

Answer
------

By the IEEE-754 rule, NaN is not equal to anything, including itself, so
``math.nan == math.nan`` is ``False``. Use ``math.isnan`` to test for NaN.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    from decimal import Decimal, ROUND_HALF_UP
    print(Decimal("2.675").quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``2.68``
   * ``2.67``
   * ``2.675``
   * ``2.7``

Answer
------

``Decimal("2.675")`` is exactly 2.675, so rounding half up to two places gives
``2.68``. The float ``round(2.675, 2)`` returns ``2.67`` because ``2.675``
cannot be represented exactly in binary.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from collections import namedtuple
    P = namedtuple("P", "x y")
    p = P(1, 2)
    q = p._replace(y=99)
    print(p, q)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``P(x=1, y=2) P(x=1, y=99)``
   * ``P(x=1, y=99) P(x=1, y=99)``
   * ``P(x=1, y=2) P(x=99, y=2)``
   * raises ``AttributeError``

Answer
------

Named tuples are immutable, so ``_replace`` returns a *new* instance with the
given fields changed and leaves the original untouched. ``p`` still has
``y=2`` while ``q`` has ``y=99``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from itertools import cycle, islice
    print(list(islice(cycle("AB"), 5)))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``['A', 'B', 'A', 'B', 'A']``
   * ``['A', 'B', 'A', 'B', 'A', 'B']``
   * ``['A', 'B']``
   * ``['A', 'B', 'A', 'B']``

Answer
------

``cycle("AB")`` repeats ``A``, ``B`` endlessly; ``islice(..., 5)`` takes the
first five items, giving ``['A', 'B', 'A', 'B', 'A']``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from collections import defaultdict
    d = defaultdict(int)
    _ = d["missing"]
    print(dict(d))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``{'missing': 0}``
   * ``{}``
   * raises ``KeyError``
   * ``{'missing': None}``

Answer
------

Merely *reading* a missing key on a ``defaultdict`` triggers the factory and
inserts it. So ``d["missing"]`` creates the key with value ``0`` as a side
effect, and the dict is no longer empty.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    import json
    print(json.dumps(float("nan")))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``NaN``
   * raises ``ValueError``
   * ``null``
   * ``nan``

Answer
------

By default Python's ``json`` emits the non-standard token ``NaN`` (also
``Infinity``/``-Infinity``), which strict JSON parsers reject. Passing
``allow_nan=False`` would instead raise ``ValueError``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    import re
    print(re.split(r"(\d)", "a1b2"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``['a', '1', 'b', '2', '']``
   * ``['a', 'b', '']``
   * ``['a', 'b']``
   * ``['a', '1', 'b', '2']``

Answer
------

When the split pattern contains a capturing group, the captured delimiters are
kept in the result. The trailing empty string comes from the split right after
the final ``2``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    from dataclasses import dataclass, field
    @dataclass
    class C:
        items: list = field(default_factory=list)
    a = C()
    a.items.append(1)
    print(C().items)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``[]``
   * ``[1]``
   * ``[1, 1]``
   * raises ``ValueError``

Answer
------

``default_factory=list`` calls ``list()`` fresh for each new instance, so ``a``
and the new ``C()`` do not share a list. Mutating ``a.items`` leaves the new
instance's ``items`` empty. A bare mutable default would be rejected at class
creation.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from fractions import Fraction
    print(Fraction(0.1).limit_denominator(10))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``1/10``
   * ``1/8``
   * ``3602879701896397/36028797018963968``
   * ``0.1``

Answer
------

``Fraction(0.1)`` captures the exact binary value of the float, a huge ratio.
``limit_denominator(10)`` finds the closest fraction with denominator at most
10, which is ``1/10``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 50

.. code-block::

    from itertools import groupby
    words = ["apple", "avocado", "banana", "cherry", "citrus"]
    print({k: len(list(g)) for k, g in groupby(words, key=lambda w: w[0])})

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``{'a': 2, 'b': 1, 'c': 2}``
   * ``{'a': 2, 'b': 1, 'c': 1}``
   * ``{'a': 1, 'b': 1, 'c': 1}``
   * ``{'apple': 1, 'banana': 1}``

Answer
------

The list is already ordered by first letter, so ``groupby`` cleanly groups the
two ``a`` words, one ``b`` word, and two ``c`` words. The dict comprehension
counts each group, giving ``{'a': 2, 'b': 1, 'c': 2}``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from datetime import datetime
    d = datetime.strptime("2020-12-25", "%Y-%m-%d")
    print(d.strftime("%A"))

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``Friday``
   * ``Saturday``
   * ``Thursday``
   * ``December``

Answer
------

``strptime`` parses the string into a ``datetime``, and ``%A`` formats the full
weekday name (locale default English). December 25, 2020 fell on a
``Friday``.

What does this code print?
==========================

.. quiz-question::
   :data-seconds: 45

.. code-block::

    from collections import OrderedDict
    a = OrderedDict([("x", 1), ("y", 2)])
    b = OrderedDict([("y", 2), ("x", 1)])
    print(a == b)

.. quiz-choices::
   :data-randomize: true
   :data-correct: 1

   * ``False``
   * ``True``
   * raises ``TypeError``
   * ``None``

Answer
------

Comparing two ``OrderedDict`` objects is order-sensitive, so ``a`` and ``b``
differ despite having the same items. (Comparing an ``OrderedDict`` to a plain
``dict`` would ignore order and be ``True``.)
