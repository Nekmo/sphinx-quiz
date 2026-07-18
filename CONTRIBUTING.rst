.. highlight:: shell

============
Contributing
============

Contributions are welcome, and they are greatly appreciated! Every
little bit helps, and credit will always be given.

You can contribute in many ways:

Types of Contributions
----------------------

Report Bugs
~~~~~~~~~~~

Report bugs at https://github.com/Nekmo/sphinx-quiz/issues.

If you are reporting a bug, please include:

* Your operating system name and version.
* Your Python and Sphinx versions.
* Any details about your local setup that might be helpful in troubleshooting.
* Detailed steps to reproduce the bug.

Fix Bugs
~~~~~~~~

Look through the GitHub issues for bugs. Anything tagged with "bug"
and "help wanted" is open to whoever wants to implement it.

Implement Features
~~~~~~~~~~~~~~~~~~

Look through the GitHub issues for features. Anything tagged with "enhancement"
and "help wanted" is open to whoever wants to implement it.

Write Documentation
~~~~~~~~~~~~~~~~~~~

sphinx-quiz could always use more documentation, whether as part of the
official docs, in docstrings, or even on the web in blog posts, articles,
and such.

Submit Feedback
~~~~~~~~~~~~~~~

The best way to send feedback is to file an issue at
https://github.com/Nekmo/sphinx-quiz/issues.

If you are proposing a feature:

* Explain in detail how it would work.
* Keep the scope as narrow as possible, to make it easier to implement.
* Remember that this is a volunteer-driven project, and that contributions
  are welcome :)

Get Started!
------------

Ready to contribute? Here's how to set up ``sphinx-quiz`` for local
development.

1. Fork the ``sphinx-quiz`` repo on GitHub and clone your fork.
2. Create a virtualenv and install the package with its dev extras::

    $ python -m venv .venv
    $ .venv/bin/pip install -e '.[dev]'

3. Create a branch for local development::

    $ git checkout -b name-of-your-bugfix-or-feature

4. Make your changes. Build the example project (``know-your-python``,
   the sibling repo) to see the extension in action, and run the checks::

    $ flake8 sphinx_quiz
    $ python -m build && twine check dist/*

5. Commit your changes and push your branch, then open a pull request.
