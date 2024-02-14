base_uri = https://berlin.github.io/lod-organigram
log_sg_repo = https://github.com/berlinonline/lod-sg

# This target creates the RDF file that serves as the input to the static site generator.
# All data should be merged in this file. This should include at least the VOID dataset
# description and the actual data.
# The target works by merging all prerequisites.
data/temp/all.nt: data/temp void.ttl data/static/senfin.ttl
	@echo "combining $(filter-out $<,$^) to $@ ..."
	@rdfpipe -o ntriples $(filter-out $<,$^) > $@

cbds: _includes/cbds data/temp/all.nt
	@echo "computing concise bounded descriptions for all subjects in input data"
	@python bin/compute_cbds.py --base="$(base_uri)"

update-core-templates: data/temp _includes/core _layouts/core
	@echo "cloning $(log_sg_repo) into data/temp ..."
	@git clone -b develop --single-branch $(log_sg_repo) data/temp/lod-sg
	@cp data/temp/lod-sg/_includes/core/* _includes/core
	@cp data/temp/lod-sg/_layouts/core/* _layouts/core

.PHONY: serve-local
serve-local: data/temp/all.nt cbds
	@echo "serving local version of static LOD site ..."
	@bundle exec jekyll serve

clean: clean-temp clean-cbds clean-jekyll

clean-temp:
	@echo "deleting temp folder ..."
	@rm -rf data/temp

data/temp:
	@echo "creating temp directory ..."
	@mkdir -p data/temp

_includes/cbds:
	@echo "creating $@ directory ..."
	@mkdir -p $@

clean-cbds:
	@echo "deleting cbd folder ..."
	@rm -rf _includes/cbds

clean-jekyll:
	@echo "deleting jekyll artifacts ..."
	@rm -rf _site
	@rm -rf .jekyll-cache