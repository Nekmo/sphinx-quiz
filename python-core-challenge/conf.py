# Configuration file for the Sphinx documentation builder.

project = 'Know Your Python'
copyright = '2026, Nekmo'
author = 'Nekmo'
master_doc = 'index'

extensions = [
    'sphinx_quiz',
]

language = 'en'
smartquotes = False

# Internationalization. Translations live in locale/<lang>/LC_MESSAGES/*.po
# (one catalog per source file). Build a translated site with, e.g.:
#   sphinx-build -M html . _build/html-es -D language=es
locale_dirs = ['locale/']
gettext_compact = False

exclude_patterns = ['_build', 'README.rst', 'Thumbs.db', '.DS_Store']

highlight_language = 'python'

html_theme = 'sphinx_quiz'
