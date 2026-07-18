"""Sphinx extension to build static quiz websites from reStructuredText."""

from __future__ import annotations

from pathlib import Path

from sphinx.application import Sphinx

__version__ = "0.1.0"

STATIC_DIR = Path(__file__).parent / "static"
THEME_DIR = Path(__file__).parent / "theme"


def _add_static_path(app: Sphinx, config) -> None:
    config.html_static_path.append(str(STATIC_DIR))


def setup(app: Sphinx) -> dict:
    from sphinx_quiz import addnodes, collector, directives

    addnodes.register(app)
    directives.register(app)
    collector.register(app)

    app.connect("config-inited", _add_static_path)
    app.add_html_theme("sphinx_quiz", str(THEME_DIR))
    app.add_js_file("quiz-data.js")
    app.add_js_file("quiz.js")
    app.add_css_file("quiz.css")

    return {
        "version": __version__,
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
