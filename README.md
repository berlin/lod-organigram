# LOD Site Generator (LOD-SG)

The Linked Open Data Site Generator (LOD-SG) is a tool to create a static website from and for an RDF dataset.
It uses the [Jekyll](https://jekyllrb.com) static site generator with the [Jekyll RDF](https://github.com/AKSW/jekyll-rdf) plugin to create one HTML page per RDF resource in the input graph.
The project contains a number of basic page templates to produce a generic website.
By adding additional templates for specific kinds of RDF resources, LOD-SG can be the starting point for developing tailor-made sites for individual datasets.

## Features

### Skeleton Structure 

… for generating and publishing a LOD dataset with Jekyll

- [ ] folder structure
- [ ] basic configuration
- [ ] basic dataset description using the [VoID](https://www.w3.org/TR/void/ "Specification for the VoID vocabulary for describing Linked Datasets") vocabulary
- [ ] a Makefile for orchestrating common tasks such as merging and converting RDF input files, generating the static website

### Page Templates

… for generating HTML pages out of RDF resources (using the [Liquid](https://shopify.github.io/liquid/ "Documentation for the Liquid template language") template language).

- [ ] a default page template 
- [ ] a default page header
- [ ] a default page footer
- [ ] a dataset template (for instances of `void:Dataset`)
- [ ] some more templates for common resource types such as organizations, people, geographic features etc.
- [ ] page includes such as:
  - [ ] statement tables (resource as subject and resource as object)
  - [ ] a [Mermaid](https://mermaid.js.org "Documentation for the Mermaid JavaScript diagramming library") graph showing the same statements
  - [ ] a [Leaflet](https://leafletjs.com "Documentation for the Leaflet JavaScript map library ") map display for geographic features

## Requirements

- The [Jekyll](https://jekyllrb.com) static site generator with the [jekyll-rdf](https://github.com/AKSW/jekyll-rdf) plugin. Jekyll is based on the Ruby language, so you first need to make sure that you have Ruby available on your command line. Once that is ensured, you can install Jekyll like this (this command installs the dependencies that are defined in the [Gemfile](/Gemfile)):

```
$ bundle install
```

- Python 3 with the [rdflib](https://rdflib.readthedocs.io/) library. If you have that, create a virtual environment, activate it and install rdflib via the [requirements.txt](/requirements.txt) file:

```
$ python -m venv venv
$ . venv/bin/activate
(venv) $ pip install -r requirements.txt
```

## Using the Site Generator

To generate a new static site for your dataset, you need to perform the following steps:

- Create a new repository that will be the home for your LOD-site.
  - Create this repository using the LOD-Browser repository as the template.
- Put a `.ttl` (Turtle) file with your RDF data in `/data`.
  - This is the bare minimum. Of course, you could also add code or other assets that will be used to generate the Turtle-file in `/data`. I usually put some scripts in `/bin` that convert the source (non-RDF) data into RDF, maybe some static boilerplate RDF in `/data/static`, and some plumbing in a `/Makefile` to orchestrate and automate the process of building the output data.
- Adjust the [void.ttl](/void.ttl) file that describes your dataset.
- Adjust [_config.yml](/_config.yml) to configure the creation of the static site.

---


