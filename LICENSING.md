# Licensing and attribution

Copyright © 2026 Tebla and Open Sauce Food contributors, for their respective
contributions. These grants apply only to rights the contributors hold. The root
[LICENSE](LICENSE) is a scope pointer, not a blanket grant over third-party material.

## Current repository scope

Current Corpus paths: original integration.mjs, scripts/ and tests/ tooling is MIT; authored documentation and original recipe encoding/annotations retain CC BY 4.0 within rights held. Imported recipes, source evidence and images retain their source-specific terms. Project-owned structured reports retain the existing CC0 scope. Canonical vocabulary belongs to Core; article/photo enrichment to Knowledge; presentation/fonts to Site.

This clarification changes no historical grant, copyright credit or third-party notice. [Knowledge rights findings](../knowledge/docs/rights.md) remain an unresolved publication gate for article prose; photographs have individual licences.

## Retained original scope table (historical paths)

The table below preserves the pre-split grants. Paths belonging to another repository are historical ownership references, not files supplied here.

| Material / paths | Terms |
|---|---|
| Original parser, model, renderers, vocabulary/reference tooling in `src/`; TypeScript/JavaScript tooling in `scripts/`; test code in `tests/`; `demo/app.js`; build/package configuration and GitHub workflow configuration | [MIT](LICENSES/MIT.txt) |
| Demo presentation: `demo/index.html`, `demo/style.css`, `demo/theme-init.js`, `demo/dark-mode.js` | [GPL-2.0-or-later](LICENSES/GPL-2.0-or-later.txt): version 2 or, at your option, any later version |
| Project-owned canonical YAML in `ingredients/`, `equipment/`, `processes/`; project-owned structured report/observation data and selection/arrangement | [CC0 1.0](LICENSES/CC0-1.0.txt), to the extent rights apply; copied evidence is excepted |
| Authored specification, guides, root/docs Markdown, explanatory material, issue/PR templates and original screenshot contributions | [CC BY 4.0](LICENSES/CC-BY-4.0.txt), except separately identified source material and notices |
| Open Sauce Food-authored structural encoding and annotations in `.opensauce`, including test fixtures | [CC BY 4.0](LICENSES/CC-BY-4.0.txt), to the extent copyright or related rights apply |
| Imported source text, images, author records and source expression reproduced in recipes, fixtures, reports, screenshots or metadata | Upstream Public Domain Recipes public-domain / [Unlicense declaration](source/public-domain-recipes/UPSTREAM-LICENSE.md); provenance retained, not relicensed by this project |
| Manrope and Fira Code font binaries | SIL OFL 1.1; existing [font credits and notices](../site/demo/fonts/README.md) |

For CC BY material, credit **Tebla and Open Sauce Food contributors**, identify Open
Sauce Food and the source/version you used, link the licence and indicate your changes.
Preserve supplied source-author credits independently. Identify the actual source revision used; planned repository renaming does not change these credits.

## Presentation provenance and GPL scope

The presentation layer is adapted from the Tebla theme, a custom child theme
developed on WordPress Twenty Twenty-Five. Some predecessor presentation code
predates the current Tebla Git history. No audited Open Sauce Food presentation
code was positively identified as copied from WordPress core or Twenty Twenty-Five;
GPL-2.0-or-later is used conservatively for this presentation layer. This does not
automatically apply GPL to the independently scoped MIT parser/tooling. Source for
the presentation is retained in the Site sibling under demo/; font terms remain separate. See
[design provenance](../site/DEMO-DESIGN.md).

## Layered recipe and data terms

Underlying imported material retains its upstream declaration and source provenance.
The CC BY offer covers our structural encoding/annotations only to the extent rights
apply; it does not manufacture copyright in purely factual or mechanical material.
The upstream site-wide dedication does not itself establish a complete rights chain
for every third-party-derived item. Five cases are excluded: see
[the compact record](release-exclusions.json) and [data sources](archive/docs/DATA-SOURCES.md).

CC0 covers project-owned selection, arrangement and contributions only. It does not
relicense embedded/copied third-party evidence. Future FoodOn, USDA, Wikidata or other
external data must retain its own applicable terms and attribution. No such numerical
dataset is integrated today.

Dependencies keep their own licences: `yaml` is ISC, TypeScript is Apache-2.0 and
`@types/node` is MIT. They are not bundled in this source export. Do not replace
their notices when distributing dependencies.

Licence texts: [GNU GPL 2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html),
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode),
[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/legalcode).
The unmodified texts are retained locally; the GPL “or later” option is granted above.

## Extraction scope

This project was extracted from core commit 04c3d1c44f05686bb16729fb926acdde86f43047. The table preserves the original grants, not a new licensing determination. Original src/ and canonical knowledge now belong to the core sibling; presentation and fonts belong to the site sibling; full recipes and source evidence belong to the corpus sibling. Generated integration copies retain those terms. Historical archived documents use historical paths.

## Cocktail Foundation v1

`examples/cocktail-specs/` is separate from the public-domain import. Its source-specific formulas retain factual quantities and ingredient labels, not source articles or photographs. Methods and structural encodings are independently authored OSF text under the existing CC BY 4.0 scope. No licence to third-party prose or images is asserted. Per-spec provenance, retrieval dates and original factual formulas are in `source/cocktail-specs/provenance.json`. Reworked conversion status is distinct from human review: these encodings remain generated and unchecked.

## Cocktail Foundation v2

The next 50 specs use Punch, Difford’s Guide, IBA, bartender-authored and producer sources. The source-specific formula and retrieval record are retained in the same provenance file; no source article, image or long method passage is copied. Jeffrey Morgenthaler’s site declares CC BY-NC-ND 3.0 US: this tranche does not claim permission to adapt or republish that prose. Its methods are independently written from the factual formula and technique. OSF editorial product-strength decisions are recorded separately from source recommendations. The existing layered terms apply; these recipes are not classified as public-domain imports.
