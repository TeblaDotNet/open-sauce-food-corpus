# Open Sauce Food Corpus

The recipe collection for [Open Sauce Food](https://tebla.net/opensaucefood/). It currently contains 410 recipes converted from PublicDomainRecipes and 80 cocktail specifications, all written in [Sauce Code](https://github.com/TeblaDotNet/sauce-code).

Alongside the `.opensauce` files, this repository keeps the original sources, credits, conversion history and tests. A recipe that parses successfully still needs to be checked against its source before anyone treats the conversion as reviewed.

## Work with the recipes

Use Node.js 24+ and pnpm. Install dependencies in this repository and in a sibling Sauce Code Core checkout, then run:

```sh
pnpm check
pnpm test
pnpm corpus
```

`OSF_CORE` and `OSF_CORPUS` can override the default sibling paths. The usual checks run against Core without needing Open Sauce Food Knowledge. Tests that combine the two use `OSF_KNOWLEDGE`, an exact `OSF_CORE_REVISION`, and `pnpm test:knowledge`; see the [developer setup map](https://github.com/TeblaDotNet/sauce-code/blob/main/docs/ecosystem.md).

Some tests still use generated `.integration/run-*` directories to reproduce an older Core layout. These are test files, not places to edit recipes.

## Contribute a recipe or correction

Compare converted instructions with the retained original. Keep quantities, order, alternatives and attribution. If information is missing, flag it rather than inventing it. Human review and publication status are tracked separately from parse results.

See [data sources](archive/docs/DATA-SOURCES.md), [excluded items](release-exclusions.json), [licensing](LICENSING.md) and [contributing](https://github.com/TeblaDotNet/sauce-code/blob/main/CONTRIBUTING.md). Recipes and source material have their own rights; this repository doesn't grant a blanket licence to reuse third-party writing or images.
