# Minimal makefile for Sphinx documentation

SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = .
BUILDDIR      = _build

help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

# Single combined site: English at the root, Spanish nested under /es/.
# Serve $(BUILDDIR)/html — the in-page flags switch between / and /es/.
site:
	@$(SPHINXBUILD) -M html "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
	@$(SPHINXBUILD) -M html "$(SOURCEDIR)" "$(BUILDDIR)/es-tmp" -D language=es $(SPHINXOPTS) $(O)
	@rm -rf "$(BUILDDIR)/html/es"
	@cp -r "$(BUILDDIR)/es-tmp/html" "$(BUILDDIR)/html/es"
	@rm -rf "$(BUILDDIR)/es-tmp"
	@echo "Combined site ready in $(BUILDDIR)/html  (English /, Spanish /es/)"

# Spanish-only static build (separate output). Needs the es catalogs.
html-es:
	@$(SPHINXBUILD) -M html "$(SOURCEDIR)" "$(BUILDDIR)/html-es" -D language=es $(SPHINXOPTS) $(O)

# Regenerate/refresh translation catalogs after editing the .rst questions:
#   make gettext && sphinx-intl update -p _build/gettext/gettext -l es
gettext:
	@$(SPHINXBUILD) -M gettext "$(SOURCEDIR)" "$(BUILDDIR)/gettext" $(SPHINXOPTS) $(O)

.PHONY: help site html-es gettext Makefile

%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
