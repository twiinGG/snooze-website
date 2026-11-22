const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const dir=__dirname;
const config=JSON.parse(fs.readFileSync(path.join(dir,'config.json'),'utf8'));
const source=fs.readFileSync(path.join(dir,'finder.js'),'utf8').replace('__CAMP_FINDER_CONFIG__',JSON.stringify(config)).replace('__CAMP_CAPTIONS__','""');
const sandbox={module:{exports:{}},globalThis:{}};vm.runInNewContext(source,sandbox);
const {recommend}=sandbox.module.exports;
const sample={age:'sixtoeight',concern:'naps',support:'group',barrier:'none',timing:'now'};
assert.equal(recommend(sample).route,'camp');
assert.equal(recommend({...sample,age:'newborn'}).route,'young');
assert.equal(recommend({...sample,support:'private'}).route,'private');
assert.equal(recommend({...sample,support:'flexible'}).route,'snooze');
assert.equal(recommend({...sample,barrier:'calls'}).route,'talk');
assert.throws(()=>recommend({}),/Complete all five/);
let count=0;const routes=new Set();
function walk(a,i){
 if(i===config.questions.length){
  const r=recommend(a);count++;routes.add(r.route);
  if(['newborn','threefour'].includes(a.age))assert.notEqual(r.route,'camp');
  if(a.support==='private')assert.equal(r.route,'private');
  for(const q of config.questions)assert.ok(r.summary.includes(q.options.find(x=>x[0]===a[q.key])[1]));
  assert.ok(r.summary.includes(r.reading.url));assert.ok(r.summary.includes(config.coachQuestions[a.barrier]));
  if(a.timing==='exploring')assert.ok(r.timing.includes('exploring for later'));
  assert.ok(r.reading.url.startsWith('https://'));
  return;
 }
 const q=config.questions[i];for(const [value]of q.options)walk({...a,[q.key]:value},i+1);
}
walk({},0);assert.equal(routes.size,5);assert.equal(config.emailDeliveryActive,false);
console.log(`PASS: ${count} combinations, age exclusion, support preferences, result completeness and draft no-send configuration.`);
