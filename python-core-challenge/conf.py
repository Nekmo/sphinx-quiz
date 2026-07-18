# Configuration file for the Sphinx documentation builder.

project = 'Python Core Challenge'
copyright = '2026, Nekmo'
author = 'Nekmo'
master_doc = 'index'

extensions = [
    'sphinx_quiz',
]

language = 'en'
smartquotes = False

exclude_patterns = ['_build', 'README.rst', 'Thumbs.db', '.DS_Store']

highlight_language = 'python'

html_theme = 'sphinx_quiz'
