# Minimal makefile for Sphinx documentation

SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = .
BUILDDIR      = _build

help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

# Spanish site (separate static build). Needs the es catalogs in locale/.
html-es:
	@$(SPHINXBUILD) -M html "$(SOURCEDIR)" "$(BUILDDIR)/html-es" -D language=es $(SPHINXOPTS) $(O)

# Regenerate/refresh translation catalogs after editing the .rst questions:
#   make gettext && sphinx-intl update -p _build/gettext/gettext -l es
gettext:
	@$(SPHINXBUILD) -M gettext "$(SOURCEDIR)" "$(BUILDDIR)/gettext" $(SPHINXOPTS) $(O)

.PHONY: help html-es gettext Makefile

%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
