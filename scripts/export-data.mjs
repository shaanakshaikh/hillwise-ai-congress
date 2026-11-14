// Deterministic public download generated from the editable question files.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname,resolve,relative,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {quizConfig} from '../dist/quiz-config.js';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'../dist');
function localPath(path){
  if(typeof path!=='string'||!path)throw new Error('Expected a local data path in quiz-config.js');
  const full=resolve(root,path);
  const rel=relative(root,full);
  if(rel==='..'||rel.startsWith('..'+sep)||rel=== '')throw new Error('Data paths must stay inside dist/');
  return full;
}
const files=quizConfig.dataFiles;
if(!Array.isArray(files)||!files.length)throw new Error('Configure at least one question file');
const output=localPath(quizConfig.links.dataDownload);
const inputPaths=files.map(localPath);
if(inputPaths.includes(output))throw new Error('The generated download must not overwrite a source question file');
const bank=(await Promise.all(inputPaths.map(async path=>{
  const questions=JSON.parse(await readFile(path,'utf8'));
  if(!Array.isArray(questions))throw new Error('Each question file must contain an array');
  return questions;
}))).flat();
const serialized=JSON.stringify(bank,null,2)+'\n';
if(process.argv.includes('--check')){
  let current;try{current=await readFile(output,'utf8');}catch{current='';}
  if(current!==serialized)throw new Error('Question download is stale. Run node scripts/export-data.mjs and commit the generated file.');
  console.log(`PASS public download matches all ${bank.length} questions.`);
}else{
  await mkdir(dirname(output),{recursive:true});
  await writeFile(output,serialized);
  console.log(`Exported ${bank.length} questions to ${relative(root,output)}.`);
}
