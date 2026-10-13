import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {parseRecipe,renderCode,renderCompact,renderHtml} from '../src/index.ts';
import {loadVocabulary} from '../src/vocabulary/node.ts';
import {recipeFiles} from '../scripts/corpus.ts';
const hash=(s:Buffer|string)=>createHash('sha256').update(s).digest('hex');
const v=await loadVocabulary('knowledge');
const provenance=JSON.parse(await readFile('source/cocktail-specs/provenance.json','utf8'));
test('all original 410 recipe bytes remain unchanged by cocktail additions',async()=>{
 const baseline=JSON.parse(await readFile('tests/fixtures/cocktail-foundation-baseline.json','utf8'));
 const files=await recipeFiles('examples/public-domain-recipes');assert.equal(files.length,410);assert.equal(baseline.length,410);
 for(const f of baseline)assert.equal(hash(await readFile(f.path)),f.sha256,f.path);
});
test('thirty source-specific specs retain factual provenance and source-preserving Recipe rendering',async()=>{
 const files=await recipeFiles('examples/cocktail-specs');assert.equal(files.length,80);assert.equal(provenance.specs.length,80);
 const ids=new Set<string>();
 for(const s of provenance.specs.filter((s:{tranche?:string})=>!s.tranche)){assert.ok(!ids.has(s.id));ids.add(s.id);const text=await readFile(s.repositoryPath,'utf8');assert.equal(hash(text),s.sha256);
  const r=parseRecipe(text,{vocabulary:v});assert.deepEqual(r.diagnostics,[],s.id);assert.equal(r.modelVersion,1);assert.equal(r.conversionStage,'reworked');assert.deepEqual(r.curation,{origin:'generated',review:'unchecked'});
  assert.ok(s.url.startsWith('https://'));assert.equal(s.retrieved,'2026-10-12');assert.ok(s.rights.sourceLicence.includes('Not established'));
  for(const row of s.formula)assert.ok(text.includes(row.quantity+' '+row.sourceLabel),s.id+row.sourceLabel);
  const code=renderCode(r);assert.equal(renderCode(parseRecipe(code,{vocabulary:v})),code);assert.ok(renderCompact(r).length);assert.ok(renderHtml(r,{view:'compact'}).includes('os-recipe'));
 }
 assert.equal(provenance.specs.filter((s:{title:string})=>s.title==='Sazerac').length,2);
 assert.equal(new Set(provenance.specs.filter((s:{title:string})=>s.title==='Sazerac').map((s:{id:string})=>s.id)).size,2);
});
test('source strength is not invented and explicit alternatives remain authored',async()=>{
 const all=(await Promise.all(provenance.specs.filter((s:{tranche?:string})=>!s.tranche).map((s:{repositoryPath:string})=>readFile(s.repositoryPath,'utf8')))).join('\n');
 assert.ok(all.includes('@ Lagavulin 16y'));assert.ok(all.includes('@ La Fée Parisienne'));assert.ok(all.includes("(bitters @ Peychaud's) 3 dashes -OR- (bitters; Creole-style) 3 dashes"));
 assert.ok(!/@\s*[!~]/.test(all));assert.ok(!all.includes('@ Fernet-Branca'));assert.ok(!all.includes('@ Goslings Black Seal'));
});
