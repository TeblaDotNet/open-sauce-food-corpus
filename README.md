# Open Sauce Food Corpus

**Open Sauce Food — an open culinary encyclopaedia and recipe collection built using Sauce Code.**

Corpus owns the 490-recipe collection, cocktail specifications, source/provenance records, conversion and publication metadata, and corpus-wide regression tests. Recipes remain plain-text .opensauce files. Sauce Code Core owns their language and canonical identities; Knowledge owns optional encyclopaedia content. Generated/reworked conversion status is distinct from human review.

## Local validation

Use Node 24+ and pnpm. Install Core and Corpus dependencies with `pnpm install --frozen-lockfile`, then run from Corpus:

```sh
pnpm check
pnpm test
pnpm corpus
```

OSF_CORE and OSF_CORPUS override the sibling defaults. Ordinary commands use canonical Core without Knowledge. For retained provider assertions, explicitly set OSF_KNOWLEDGE and the exact OSF_CORE_REVISION and run `pnpm test:knowledge`. This also needs Knowledge's documented build/test prerequisites.

Commands create ignored .integration/run-* compatibility workspaces with input hashes. Historical Core-shaped imports run there; those copies are not recipe or vocabulary authorities. No recipe transformation happens during assembly. Core itself has no runtime Corpus dependency.

## Contribution and provenance

Compare conversions with retained sources; preserve amounts, alternatives, instructions and source credits. Do not silently infer missing cooking information or promote review status. Publication visibility is independent of parser validity.

See [contribution/AI policy](../core/CONTRIBUTING.md), [setup matrix](../core/docs/ecosystem.md), [licensing](LICENSING.md), [data sources](archive/docs/DATA-SOURCES.md) and [exclusions](release-exclusions.json). Underlying recipes retain source-specific terms. Cocktail factual formulas and independently authored methods are not a licence to reproduce source articles or photographs.

Historical extraction began at Core 04c3d1c44f05686bb16729fb926acdde86f43047; archived paths and old publication plans are historical evidence. Current local names are in the ecosystem guide; no future GitHub destination is asserted as live.
