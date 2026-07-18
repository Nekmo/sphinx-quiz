"""Directives provided by sphinx_quiz."""

from __future__ import annotations

from pathlib import Path

from docutils import nodes
from docutils.parsers.rst import directives as rst_directives
from sphinx.application import Sphinx
from sphinx.util.docutils import SphinxDirective

from sphinx_quiz import addnodes


def _truthy(argument: str) -> bool:
    return argument.strip().lower() in ("true", "yes", "1")


def _status(argument: str) -> str:
    return rst_directives.choice(argument, ("success", "failure"))


def _int_list(argument: str) -> list[int]:
    """Parse ``2`` or ``1, 3, 4`` into a list of positive ints."""
    values = [int(part) for part in argument.replace(",", " ").split()]
    if not values or any(value < 1 for value in values):
        raise ValueError("expected one or more positive integers")
    return values


def _weights(argument: str) -> dict[str, float]:
    """Parse ``easy=1, medium=2, hard=3`` into a mapping."""
    weights: dict[str, float] = {}
    for part in argument.split(","):
        key, sep, value = part.partition("=")
        if not sep:
            raise ValueError(f"expected name=weight pairs, got {part!r}")
        weights[key.strip()] = float(value)
    return weights


class QuickSelectBase(SphinxDirective):
    """Base for the quick-* configuration directives.

    Content lines are the selectable options; ``*`` means "derive the
    options from the questions found in the project".
    """

    has_content = True
    option_spec = {
        "data-include-all": _truthy,
        "data-default": rst_directives.unchanged_required,
        "data-weights": _weights,
    }
    kind: str = ""

    def run(self) -> list[nodes.Node]:
        node = addnodes.quiz_setup()
        node["kind"] = self.kind
        node["include_all"] = self.options.get("data-include-all", False)
        node["default"] = self.options.get("data-default")
        node["weights"] = self.options.get("data-weights")
        node["choices"] = [line.strip() for line in self.content if line.strip()]
        self.set_source_info(node)
        return [node]


class QuickSelectLevel(QuickSelectBase):
    kind = "level"


class QuickSelectCategory(QuickSelectBase):
    kind = "category"


class QuickSelectNumQuestions(QuickSelectBase):
    kind = "num-questions"


class QuickTimer(QuickSelectBase):
    kind = "timer"


class QuizSection(SphinxDirective):
    """Attach category/level metadata to the enclosing section."""

    option_spec = {
        "data-category": rst_directives.unchanged_required,
        "data-level": rst_directives.unchanged_required,
    }

    def run(self) -> list[nodes.Node]:
        node = addnodes.quiz_section()
        node["category"] = self.options.get("data-category")
        node["level"] = self.options.get("data-level")
        self.set_source_info(node)
        return [node]


class QuizQuestion(SphinxDirective):
    """Mark the enclosing section as a question."""

    option_spec = {
        "data-seconds": rst_directives.positive_int,
    }

    def run(self) -> list[nodes.Node]:
        node = addnodes.quiz_question()
        node["seconds"] = self.options.get("data-seconds", 30)
        self.set_source_info(node)
        return [node]


class QuizChoices(SphinxDirective):
    """Answer choices for a question, as a bullet list.

    ``data-correct`` holds the 1-based indexes of the correct choices, in
    source order (before any client-side shuffling).  More than one index
    (``1, 3``) turns the question into a multiple-answer question.
    """

    has_content = True
    option_spec = {
        "data-randomize": _truthy,
        "data-correct": _int_list,
    }

    def run(self) -> list[nodes.Node]:
        node = addnodes.quiz_choices()
        node["randomize"] = self.options.get("data-randomize", False)
        node["correct"] = self.options.get("data-correct", [1])
        self.set_source_info(node)
        self.state.nested_parse(self.content, self.content_offset, node)
        return [node]


class QuizTransition(SphinxDirective):
    """Mark the enclosing section as a transition screen.

    ``data-time-remaining`` is a fraction (0..1) of the question time that
    was still left when answering; the transition is shown when the actual
    remaining fraction is at least this value.  ``0`` matches only a
    timeout.  Without the option, the transition is the default for its
    status (and the only kind used when the timer is disabled).
    """

    option_spec = {
        "data-status": _status,
        "data-time-remaining": float,
    }

    def run(self) -> list[nodes.Node]:
        node = addnodes.quiz_transition()
        node["status"] = self.options.get("data-status", "success")
        node["time_remaining"] = self.options.get("data-time-remaining")
        self.set_source_info(node)
        return [node]


class QuizPodium(SphinxDirective):
    """Results-screen gag: image and text shown from a score percentage on.

    The entry with the highest ``data-percentage`` at or below the final
    score is displayed next to the results.
    """

    has_content = True
    option_spec = {
        "data-percentage": rst_directives.nonnegative_int,
        "data-title": rst_directives.unchanged,
        "data-image": rst_directives.unchanged_required,
        "data-text": rst_directives.unchanged,
    }

    def run(self) -> list[nodes.Node]:
        node = addnodes.quiz_podium()
        node["percentage"] = self.options.get("data-percentage", 0)
        node["title"] = self.options.get("data-title", "")
        image = self.options.get("data-image")
        if image:
            relative, absolute = self.env.relfn2path(image)
            self.env.note_dependency(relative)
            node["image_abs"] = absolute
            node["image_name"] = Path(absolute).name
        else:
            node["image_abs"] = None
            node["image_name"] = None
        node["text"] = self.options.get("data-text") or "\n".join(self.content)
        self.set_source_info(node)
        return [node]


def register(app: Sphinx) -> None:
    app.add_directive("quick-select-level", QuickSelectLevel)
    app.add_directive("quick-select-category", QuickSelectCategory)
    app.add_directive("quick-select-num-questions", QuickSelectNumQuestions)
    app.add_directive("quick-timer", QuickTimer)
    app.add_directive("quiz-section", QuizSection)
    app.add_directive("quiz-question", QuizQuestion)
    app.add_directive("quiz-choices", QuizChoices)
    app.add_directive("quiz-transition", QuizTransition)
    app.add_directive("quiz-podium", QuizPodium)
