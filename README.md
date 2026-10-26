# Open Sauce Food Corpus

This is Open Sauce Food's recipe collection: 410 recipes encoded from PublicDomainRecipes and 80 cocktail specifications. It also keeps the original sources, provenance, conversion status and tests for the collection. Recipes are plain-text `.opensauce` files.

Sauce Code defines the language and shared vocabulary. Open Sauce Food Knowledge supplies optional reference information. A recipe labelled “reworked” has not necessarily been reviewed by a person.

## Running the checks

Use Node 24+ and pnpm. Install Core and Corpus dependencies with `pnpm install --frozen-lockfile`, then run from Corpus:

```sh
pnpm check
pnpm test
pnpm corpus
```

OSF_CORE and OSF_CORPUS override the sibling defaults. Ordinary commands use canonical Core without Knowledge. For retained provider assertions, explicitly set OSF_KNOWLEDGE and the exact OSF_CORE_REVISION and run `pnpm test:knowledge`. This also needs Knowledge's documented build/test prerequisites.

The commands create ignored `.integration/run-*` workspaces and record their input hashes. Some older tests still expect a Core-shaped directory layout; the workspace provides that layout without moving ownership of recipes or vocabulary. Assembly does not rewrite recipes, and Core does not need Corpus at runtime.

## Contributing recipes

Check converted recipes against their retained sources. Keep quantities, alternatives, instructions and credits intact; do not fill gaps by guessing. Mark human review only when it has actually happened. A recipe passing the parser is not automatically ready for publication.

See [contribution/AI policy](../core/CONTRIBUTING.md), [setup matrix](../core/docs/ecosystem.md), [licensing](LICENSING.md), [data sources](archive/docs/DATA-SOURCES.md) and [exclusions](release-exclusions.json). Underlying recipes retain source-specific terms. Cocktail factual formulas and independently authored methods are not a licence to reproduce source articles or photographs.

Historical extraction began at Core 04c3d1c44f05686bb16729fb926acdde86f43047; archived paths and old publication plans are historical evidence. Current local names are in the ecosystem guide; no future GitHub destination is asserted as live.
