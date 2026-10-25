# Open Sauce Food corpus

Extracted from core commit `04c3d1c44f05686bb16729fb926acdde86f43047`. Public corpus project, prepared locally without a remote. Recipes and provenance retain their original bytes and maturity.

Run `pnpm install`, then `pnpm test`. Other commands are listed in package.json. Requires Node 24+. The default local layout is a parent folder containing `core/`, `corpus/` and `site/`. Commands use `../core` and `../corpus`; set `OSF_CORE` and `OSF_CORPUS` to override those paths. Core never depends on this project.

Integration commands assemble fresh ignored .integration/run-* workspaces from current core src/knowledge/tools, corpus data and this project. These generated compatibility copies are not authoritative sources. Original historical paths and assertions remain intact. Each workspace records input hashes in integration-sources.json. Knowledge root callers can consume knowledge/ directly; root-level mirrors exist only for unchanged historical tests. No source/recipe transformations occur during assembly.

The current core package remains private and does not publish knowledge data. This explicit local source integration contract is transitional; no npm/GitHub publication is implied. Run core validation separately. The application source links still use the historical public core paths; before public publication, supply a source-base pointing at the selected corpus host/revision. Until a corpus remote is approved, inspect local corpus files using their unchanged relative paths. Do not deploy this local restructure.

Licensing: see LICENSING.md and LICENSES. Retained historical docs may describe pre-extraction paths; archive/docs preserves that context.

## Canonical and provider validation

Ordinary check/test/corpus commands use canonical Core vocabulary without Knowledge. For the retained article/reference assertions, explicitly set OSF_KNOWLEDGE and the expected OSF_CORE_REVISION, then run pnpm test:knowledge. This composes the validated provider in a disposable workspace; no recipe source is rewritten. Historical article assertions remain in tests/provider rather than being dropped from coverage.
