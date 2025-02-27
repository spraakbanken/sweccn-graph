
BASE = https://spraakbanken4.it.gu.se/karp/v7/query/

TMP = _tmp
Cxns = $(TMP)/konstruktikon.json
Types = $(TMP)/konstruktikon_typer.json

.DELETE_ON_ERROR:

.PHONY: download

sweccn-graph-data.js: $(Cxns) $(Types)
	python convert_sweccn.py $+ > $@


download:
	mkdir -p $(TMP)
	curl $(BASE)/konstruktikon?size=5000 > $(Cxns)
	curl $(BASE)/konstruktikon_typer?size=5000 > $(Types)

# Not used (yet):
# curl $base/konstruktikon_roller?size=5000 > $(Roles)

