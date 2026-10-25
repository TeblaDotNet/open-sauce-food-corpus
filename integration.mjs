import {pathToFileURL} from 'node:url';
import {parse} from 'yaml';
import { cp, mkdir, mkdtemp, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const project=resolve('.'), core=resolve(process.env.OSF_CORE ?? '../core'), corpus=resolve(process.env.OSF_CORPUS ?? '../corpus');
const role=JSON.parse(await readFile(join(project,'package.json'),'utf8')).name.endsWith('/site')?'site':'corpus';
const requested=process.argv[2]??'test',providerMode=requested==='test:knowledge';
const command=providerMode?'test':requested;
if(providerMode&&!process.env.OSF_KNOWLEDGE)throw Error('test:knowledge requires explicit OSF_KNOWLEDGE');
const allowed=['test','check','build','corpus','site:build','site:validate','browser','preview'];
if(!allowed.includes(command))throw Error('Unsupported local validation command');
await mkdir(join(project,'.integration'),{recursive:true});
const workspace=await mkdtemp(join(project,'.integration','run-'));
const inventory=[];
async function copy(from,to,label){
 const walk=async(src,dest)=>{await mkdir(dest,{recursive:true});for(const e of await readdir(src,{withFileTypes:true})){
  if(e.isSymbolicLink())throw Error('Unexpected source symlink');
  if(src===from&&label==='corpus/tests'&&e.name==='provider')continue;
  if(src===from&&label==='core/knowledge'&&['enrichment.yaml','resources.yaml'].includes(e.name))continue;
  if(src===from&&label==='core/assets'&&e.name==='references')continue;
  const a=join(src,e.name),b=join(dest,e.name);if(e.isDirectory())await walk(a,b);else{const bytes=await readFile(a);await writeFile(b,bytes);inventory.push({source:label+'/'+a.slice(from.length+1).replaceAll('\\','/'),path:b.slice(workspace.length+1).replaceAll('\\','/'),sha256:createHash('sha256').update(bytes).digest('hex')});}
 }};await walk(from,to);
}
// Compatibility layout is generated, never authoritative. Active loaders use knowledge/.
// Root domain copies preserve historical evidence/legacy report path contracts only.
await copy(join(core,'src'),join(workspace,'src'),'core/src');
await copy(join(core,'tools'),join(workspace,'scripts'),'core/tools');
await copy(join(core,'knowledge'),join(workspace,'knowledge'),'core/knowledge');
for(const kind of ['ingredients','equipment','processes'])await copy(join(core,'knowledge',kind),join(workspace,kind),'core/knowledge/'+kind);
await copy(join(core,'assets'),join(workspace,'assets'),'core/assets');
const canonicalApi=await import(pathToFileURL(join(core,'src/vocabulary/canonical.ts')).href);
for(const domain of ['ingredients','processes','equipment']){
 const index=parse(await readFile(join(core,'knowledge',domain,'index.yaml'),'utf8'));
 for(const {file}of index.entries){const raw=parse(await readFile(join(core,'knowledge',domain,file),'utf8'));await writeFile(join(workspace,'knowledge',domain,file),JSON.stringify(canonicalApi.canonicalEntry(raw),null,2));}
}
if(providerMode){
 const knowledge=resolve(process.env.OSF_KNOWLEDGE);
 const build=await import(pathToFileURL(join(knowledge,'tools/build.mjs')).href),bundle=await build.build(knowledge);
 const api=await import(pathToFileURL(join(core,'src/index.ts')).href),node=await import(pathToFileURL(join(core,'src/vocabulary/node.ts')).href);
 const pin=JSON.parse(await readFile(join(knowledge,'validation/canonical-manifest.json'),'utf8'));
 const v=await api.composeKnowledge(await node.loadCanonicalVocabulary(join(core,'knowledge')),{snapshot:bundle.snapshot,canonicalManifest:pin,compatibility:bundle.compatibility,taxonomy:bundle.taxonomy});
 for(const e of v.entries){const domain=e.kind==='ingredient'?'ingredients':e.kind==='process'?'processes':'equipment';await writeFile(join(workspace,'knowledge',domain,e.id+'.yaml'),JSON.stringify(e));}
 for(const [file,data]of [['enrichment.yaml',v.enrichments],['resources.yaml',v.resources],['taxonomy.json',v.taxonomy]])await writeFile(join(workspace,'knowledge',file),JSON.stringify(data));
 await writeFile(join(workspace,'DERIVED-KNOWLEDGE.json'),JSON.stringify({editable:false,source:'Explicit Knowledge provider',revision:bundle.snapshot.provider.sourceRevision}));
}
await copy(join(corpus,'examples'),join(workspace,'examples'),'corpus/examples');
await copy(join(corpus,'source'),join(workspace,'source'),'corpus/source');
await copy(join(corpus,'vocabulary-raw'),join(workspace,'vocabulary-raw'),'corpus/vocabulary-raw');
await copy(join(corpus,'archive/docs'),workspace,'corpus/archive/docs');
for(const e of await readdir(corpus,{withFileTypes:true}))if(e.isFile()&&e.name.endsWith('.json')&&!['package.json','tsconfig.json','provenance.json'].includes(e.name))await cp(join(corpus,e.name),join(workspace,e.name));
await copy(join(corpus,'tests/helpers'),join(workspace,'tests/helpers'),'corpus/tests/helpers');
await copy(join(corpus,'tests/fixtures'),join(workspace,'tests/fixtures'),'corpus/tests/fixtures');
await copy(join(project,'tests'),join(workspace,'tests'),role+'/tests');
if(providerMode)await copy(join(project,'tests/provider'),join(workspace,'tests'),'corpus/tests/provider');
await copy(join(project,'scripts'),join(workspace,'scripts'),role+'/scripts');
await copy(join(project,'LICENSES'),join(workspace,'LICENSES'),role+'/LICENSES');
for(const n of ['package.json','tsconfig.json','tsconfig.build.json','README.md','SPEC.md','LICENSING.md','LICENSE'])await cp(join(core,n),join(workspace,n));
const tsconfig=JSON.parse(await readFile(join(workspace,'tsconfig.json'),'utf8'));tsconfig.include=['src/**/*.ts','tests/**/*.ts','scripts/**/*.ts'];await writeFile(join(workspace,'tsconfig.json'),JSON.stringify(tsconfig,null,2));
if(role==='site')for(const n of ['site','demo','hosting'])await copy(join(project,n),join(workspace,n),'site/'+n);
await writeFile(join(workspace,'integration-sources.json'),JSON.stringify({core,corpus,project,inventory},null,2));
function run(args){const p=spawnSync(process.execPath,args,{cwd:workspace,stdio:'inherit',env:process.env,windowsHide:true});if(p.status!==0)process.exit(p.status??1);}
const tsc=join(project,'node_modules/typescript/bin/tsc');
if(command==='check')run([tsc,'--noEmit']);
else if(command==='build')run([tsc,'-p','tsconfig.build.json']);
else if(command==='corpus')run(['scripts/corpus.ts']);
else if(command==='test') {run([tsc,'-p','tsconfig.build.json']);const files=(await readdir(join(workspace,'tests'))).filter(f=>f.endsWith('.test.ts'));run(['--test',...files.map(f=>'tests/'+f)]);}
else {if(role!=='site')throw Error('Site-only command');run(['scripts/site-build.ts']);run(['scripts/site-validate.ts']);if(command==='browser'){if(process.env.SITE_TEST_ORIGIN)throw Error('Local browser validation requires SITE_TEST_ORIGIN unset');run(['tests/site-browser-navigation.cjs']);run(['tests/site-browser.cjs']);}if(command==='preview')run(['scripts/site-preview.ts']);}
await writeFile(join(project,'.integration','latest.json'),JSON.stringify({workspace,command,role},null,2));
console.log('Integration workspace:',workspace);
