# Example SPARQL Queries

Some example SPARQL queries that can be run over the data to get an overview of what is there.

Can be run with any SPARQL engine, e.g. with the [`arq` tool that comes with Apache Jena](https://jena.apache.org/documentation/tools/#sparql-queries-on-local-files-and-endpoints):

```
% arq --query queries/individual_properties.rq --data data/temp/all.nt

------------------------------------------
| property                               |
==========================================
| <http://www.w3.org/2002/07/owl#sameAs> |
| vcard:family-name                      |
| vcard:fax                              |
| vcard:given-name                       |
| vcard:honorific-prefix                 |
| vcard:tel                              |
| vcard:title                            |
| <http://www.w3.org/ns/org#holds>       |
| <https://schema.org/gender>            |
------------------------------------------
```