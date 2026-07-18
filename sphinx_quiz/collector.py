"""Collect quiz data from resolved doctrees and emit ``quiz-data.js``."""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

from docutils import nodes
from sphinx.application import Sphinx
from sphinx.util import logging

from sphinx_quiz import addnodes

logger = logging.getLogger(__name__)

ENV_ATTR = "sphinx_quiz_data"


def _get_store(env) -> dict[str, dict]:
    if not hasattr(env, ENV_ATTR):
        setattr(env, ENV_ATTR, {})
    return getattr(env, ENV_ATTR)


def _purge_doc(app: Sphinx, env, docname: str) -> None:
    _get_store(env).pop(docname, None)


def _merge_info(app: Sphinx, env, docnames, other) -> None:
    store = _get_store(env)
    store.update(_get_store(other))


def _first_child(node: nodes.Element, cls) -> nodes.Element | None:
    for child in node.children:
        if isinstance(child, cls):
            return child
    return None


class _DocCollector:
    def __init__(self, app: Sphinx, docname: str):
        self.app = app
        self.docname = docname
        self.render = app.builder.render_partial
        self.data: dict[str, list] = {
            "setup": [],
            "questions": [],
            "transitions": [],
            "podiums": [],
        }

    def _fragment(self, node: nodes.Node) -> str:
        return self.render(node)["fragment"]

    def _fragments(self, children: list[nodes.Node]) -> str:
        return "".join(self._fragment(child) for child in children)

    def _title_html(self, section: nodes.section) -> str:
        title = _first_child(section, nodes.title)
        if title is None:
            return ""
        paragraph = nodes.paragraph("", "", *[c.deepcopy() for c in title.children])
        return self._fragment(paragraph)

    def collect(self, doctree: nodes.document) -> dict[str, list]:
        setups = list(doctree.findall(addnodes.quiz_setup))
        for setup in setups:
            self.data["setup"].append(
                {
                    "kind": setup["kind"],
                    "include_all": setup["include_all"],
                    "default": setup["default"],
                    "weights": setup["weights"],
                    "choices": setup["choices"],
                }
            )
        if setups:
            # Mount the client app where the first config directive was.
            setups[0].replace_self(addnodes.quiz_app())

        for podium in doctree.findall(addnodes.quiz_podium):
            image = podium["image_name"]
            self.data["podiums"].append(
                {
                    "percentage": podium["percentage"],
                    "title": podium["title"],
                    "image": f"_static/quiz-podium/{image}" if image else None,
                    "image_abs": podium["image_abs"],
                    "text": podium["text"],
                }
            )

        for child in doctree.children:
            if isinstance(child, nodes.section):
                self._section(child, {"category": None, "level": None})
        return self.data

    def _section(self, section: nodes.section, ctx: dict[str, Any]) -> None:
        meta = _first_child(section, addnodes.quiz_section)
        if meta is not None:
            ctx = dict(ctx)
            for key in ("category", "level"):
                if meta[key]:
                    ctx[key] = meta[key]

        question = _first_child(section, addnodes.quiz_question)
        if question is not None:
            self._question(section, question, ctx)
            return

        transition = _first_child(section, addnodes.quiz_transition)
        if transition is not None:
            self._transition(section, transition)
            return

        for child in section.children:
            if isinstance(child, nodes.section):
                self._section(child, ctx)

    def _question(
        self, section: nodes.section, marker: nodes.Element, ctx: dict[str, Any]
    ) -> None:
        body: list[nodes.Node] = []
        choices_node = None
        answer_section = None
        for child in section.children:
            if isinstance(
                child,
                (nodes.title, addnodes.quiz_question, addnodes.quiz_section),
            ):
                continue
            if isinstance(child, addnodes.quiz_choices):
                choices_node = child
            elif isinstance(child, nodes.section):
                answer_section = child
            else:
                body.append(child)

        if choices_node is None:
            logger.warning(
                "quiz question without quiz-choices, skipped",
                location=section,
            )
            return

        bullet_list = _first_child(choices_node, nodes.bullet_list)
        if bullet_list is None:
            logger.warning(
                "quiz-choices content must be a bullet list, question skipped",
                location=choices_node,
            )
            return
        choices = [
            self._fragments(item.children)
            for item in bullet_list.children
            if isinstance(item, nodes.list_item)
        ]

        explanation = ""
        if answer_section is not None:
            explanation = self._fragments(
                [
                    child
                    for child in answer_section.children
                    if not isinstance(child, nodes.title)
                ]
            )

        ids = section.get("ids") or [f"question-{len(self.data['questions'])}"]
        self.data["questions"].append(
            {
                "id": f"{self.docname}#{ids[0]}",
                "title": self._title_html(section),
                "category": ctx.get("category"),
                "level": ctx.get("level"),
                "seconds": marker["seconds"],
                "body": self._fragments(body),
                "choices": choices,
                "correct": marker_correct(choices_node, len(choices), section),
                "randomize": choices_node["randomize"],
                "explanation": explanation,
            }
        )

    def _transition(self, section: nodes.section, marker: nodes.Element) -> None:
        body = [
            child
            for child in section.children
            if not isinstance(child, (nodes.title, addnodes.quiz_transition))
        ]
        self.data["transitions"].append(
            {
                "status": marker["status"],
                "time_remaining": marker["time_remaining"],
                "title": self._title_html(section),
                "body": self._fragments(body),
            }
        )


def marker_correct(
    choices_node: nodes.Element, num_choices: int, section: nodes.section
) -> list[int]:
    correct = sorted({index - 1 for index in choices_node["correct"]})
    valid = [index for index in correct if 0 <= index < num_choices]
    if valid != correct:
        logger.warning(
            "data-correct (%s) out of range for %d choices",
            ", ".join(str(index + 1) for index in correct),
            num_choices,
            location=section,
        )
    return valid or [0]


def _doctree_resolved(app: Sphinx, doctree: nodes.document, docname: str) -> None:
    if app.builder.format != "html":
        return
    _get_store(app.env)[docname] = _DocCollector(app, docname).collect(doctree)


def _resolve_config(setups: list[dict], questions: list[dict]) -> dict:
    def discovered(key: str) -> list[str]:
        values: list[str] = []
        for question in questions:
            value = question.get(key)
            if value and value not in values:
                values.append(value)
        return values

    config: dict[str, dict] = {}
    for setup in setups:
        kind = setup["kind"]
        choices = setup["choices"]
        if kind in ("level", "category") and choices == ["*"]:
            choices = discovered(kind)
        entry = {
            "options": choices,
            "include_all": setup["include_all"],
            "default": setup["default"],
            "weights": setup["weights"],
        }
        if setup["include_all"] and kind in ("level", "category"):
            entry["options"] = ["all", *entry["options"]]
            if entry["default"] is None:
                entry["default"] = "all"
        config[kind] = entry
    return config


def _build_finished(app: Sphinx, exception: Exception | None) -> None:
    if exception is not None or app.builder.format != "html":
        return
    store = _get_store(app.env)
    setups: list[dict] = []
    questions: list[dict] = []
    transitions: list[dict] = []
    podiums: list[dict] = []
    for docname in sorted(store):
        data = store[docname]
        setups.extend(data["setup"])
        questions.extend(data["questions"])
        transitions.extend(data["transitions"])
        podiums.extend(data.get("podiums", []))

    podium_dir = Path(app.outdir) / "_static" / "quiz-podium"
    for podium in podiums:
        image_abs = podium.pop("image_abs", None)
        if image_abs and Path(image_abs).is_file():
            podium_dir.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(image_abs, podium_dir / Path(image_abs).name)
        elif image_abs:
            logger.warning("quiz-podium image not found: %s", image_abs)
            podium["image"] = None
    podiums.sort(key=lambda podium: podium["percentage"])

    quiz_data = {
        "project": app.config.project,
        "language": app.config.language or "en",
        "config": _resolve_config(setups, questions),
        "questions": questions,
        "transitions": transitions,
        "podiums": podiums,
    }
    static_dir = Path(app.outdir) / "_static"
    static_dir.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(quiz_data, ensure_ascii=False)
    (static_dir / "quiz-data.js").write_text(
        f"window.SPHINX_QUIZ_DATA = {payload};\n", encoding="utf-8"
    )
    logger.info(
        "sphinx_quiz: %d questions, %d transitions",
        len(questions),
        len(transitions),
    )


def register(app: Sphinx) -> None:
    app.connect("env-purge-doc", _purge_doc)
    app.connect("env-merge-info", _merge_info)
    app.connect("doctree-resolved", _doctree_resolved)
    app.connect("build-finished", _build_finished)
