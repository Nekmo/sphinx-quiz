"""Custom doctree nodes used by sphinx_quiz.

Marker nodes carry metadata for the collector and produce no HTML output
themselves (except ``quiz_app``, the SPA mount point, and ``quiz_choices``,
which wraps the parsed bullet list of answers).
"""

from __future__ import annotations

from docutils import nodes
from sphinx.application import Sphinx


class quiz_setup(nodes.Element):
    """Marker for the quick-select-*/quick-timer configuration directives."""


class quiz_section(nodes.Element):
    """Marker giving category/level metadata to the enclosing section."""


class quiz_question(nodes.Element):
    """Marker that turns the enclosing section into a question."""


class quiz_transition(nodes.Element):
    """Marker that turns the enclosing section into a transition screen."""


class quiz_podium(nodes.Element):
    """Marker for a results-screen image/text shown from a score on."""


class quiz_choices(nodes.General, nodes.Element):
    """Wraps the bullet list of answer choices."""


class quiz_app(nodes.General, nodes.Element):
    """Mount point for the client-side quiz application."""


def _skip(self, node):
    raise nodes.SkipNode


def _visit_choices(self, node):
    self.body.append('<div class="quiz-choices">')


def _depart_choices(self, node):
    self.body.append("</div>")


def _visit_app(self, node):
    self.body.append(
        '<div id="sphinx-quiz-app">'
        "<noscript>This quiz requires JavaScript.</noscript>"
        "</div>"
    )
    raise nodes.SkipNode


def register(app: Sphinx) -> None:
    for cls in (quiz_setup, quiz_section, quiz_question, quiz_transition, quiz_podium):
        app.add_node(cls, html=(_skip, None))
    app.add_node(quiz_choices, html=(_visit_choices, _depart_choices))
    app.add_node(quiz_app, html=(_visit_app, None))
