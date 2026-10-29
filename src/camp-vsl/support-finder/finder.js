(function (global) {
  'use strict';
  const C = __CAMP_FINDER_CONFIG__;
  const label = (key, value) => C.questions.find(q => q.key === key)?.options.find(o => o[0] === value)?.[1];
  function recommend(a) {
    if (!C.questions.every(q => q.options.some(o => o[0] === a[q.key]))) throw new Error('Complete all five questions.');
    const young = ['newborn', 'threefour', 'five'].includes(a.age);
    let route = young ? 'young' : 'camp';
    if (a.support === 'private') route = 'private';
    else if (a.support === 'unsure') route = 'talk';
    else if (!young && (a.support === 'flexible' || a.barrier === 'time')) route = 'snooze';
    else if (!young && (a.barrier === 'approach' || a.barrier === 'calls' || a.barrier === 'tried')) route = 'talk';
    let resource = young ? a.age : a.age === 'toddler' ? 'toddler' : a.concern;
    const timing = a.timing === 'now' ? 'You would like support soon. Check current availability before making plans.' : a.timing === 'soon' ? 'You are planning ahead. Compare the next available dates with your own commitments.' : 'You are exploring for later. Keep this summary and resource, then come back when the timing suits you.';
    const notes = [C.coachQuestions[a.barrier]];
    if (a.support === 'group' && route !== 'camp') notes.push(young ? 'When could Camp become an option for my baby?' : 'Could Camp still suit us, and how would it fit around the question I have raised?');
    if (a.support === 'private') notes.push('What is included in an individual consultation and follow-up?');
    notes.push('What information would help you understand our current sleep pattern?');
    const result = {route, resource, recommendation:C.routes[route], reading:C.resources[resource], timing, questions:notes, answers:{...a}};
    result.summary = ["YOUR SLEEP SUPPORT SUMMARY", ...C.questions.map(q => q.title + ' ' + label(q.key,a[q.key])), '', result.recommendation.title, result.recommendation.why, timing, '', 'A RESOURCE TO START WITH', result.reading.title, result.reading.url, '', 'QUESTIONS TO BRING TO YOUR COACH', ...notes.map(x => '- ' + x), '', 'NEXT STEP', result.recommendation.cta + ': ' + result.recommendation.url, '', 'This suggests a support format. It does not assess your baby or prescribe a sleep or feeding plan.'].join('\n');
    return result;
  }
  const api = {config:C, recommend, label};
  global.CampSupportFinder = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof document === 'undefined') return;
  const root=document.getElementById('camp-vsl-page');
  if (!root || root.dataset.finderReady) return;
  root.dataset.finderReady='true';
  const form=root.querySelector('#fit-form'), panels=[...form.querySelectorAll('fieldset')], back=root.querySelector('#fit-back'), next=root.querySelector('#fit-next'), error=root.querySelector('#fit-error'), resultBox=root.querySelector('#fit-result'), stage=root.querySelector('#finder-questions'), capture=root.querySelector('#finder-email'), embed=root.querySelector('#finder-embed');
  let step=0, result=null, exportUrl=null;
  const el=(tag,text,cls) => {const node=document.createElement(tag);if(text)node.textContent=text;if(cls)node.className=cls;return node;};
  function showStep(index,focus=true) {
    step=index;panels.forEach((p,i)=>p.hidden=i!==index);back.hidden=index===0;error.hidden=true;
    root.querySelector('#step-label').textContent='Question '+(index+1)+' of 5';
    root.querySelector('#finder-progress').value=index+1;
    next.textContent=index===4?'Show my support summary':'Continue';
    if(focus)panels[index].querySelector('input').focus();
  }
  function fillCapture() {
    const native=embed.querySelector('form');if(!native)return false;
    let ready=true;
    const values={custom_17:label('age',result?.answers.age),custom_18:label('concern',result?.answers.concern),custom_19:label('support',result?.answers.support),custom_20:label('barrier',result?.answers.barrier),custom_21:label('timing',result?.answers.timing),custom_22:result?.summary,custom_23:result?.route,custom_24:result?.resource};
    Object.entries(values).forEach(([key,value])=>{const input=native.querySelector('[name="form_submission['+key+']"]');if(!input){ready=false;return;}input.value=value||'';input.readOnly=true;input.closest('.kajabi-form__form-item').hidden=true;});
    native.querySelector('[name="form_submission[name]"]')?.setAttribute('aria-label','Your first name');
    native.querySelector('[name="form_submission[email]"]')?.setAttribute('aria-label','Your email address');
    const submit=native.querySelector('button[type="submit"]');if(submit&&!C.emailDeliveryActive){submit.disabled=true;submit.textContent='Email delivery awaiting review';submit.setAttribute('aria-describedby','finder-email-status');}
    const checkbox=native.querySelector('input[type="checkbox"][name="form_submission[custom_25]"]');if(checkbox)checkbox.required=false;
    if(!native.dataset.finderBound){
      native.dataset.finderBound='true';
      native.addEventListener('submit',event=>{
        if(!result||!fillCapture()||!C.emailDeliveryActive){event.preventDefault();root.querySelector('#finder-email-status').textContent=C.emailDeliveryActive?'Please complete the support finder before requesting your summary.':'Draft review: the Kajabi form is connected, but email delivery is not active yet. You can still save or print your result.';}
      });
    }
    return ready;
  }
  function render(a,focus=true) {
    result=recommend(a);resultBox.replaceChildren();stage.hidden=true;resultBox.hidden=false;capture.hidden=true;
    root.querySelector('#step-label').textContent='Your sleep support summary';root.querySelector('#finder-progress').value=5;
    resultBox.append(el('p','A next step based on what matters to you','finder-eyebrow'),el('h3',result.recommendation.title),el('p',result.recommendation.why));
    const list=el('dl',null,'finder-summary');C.questions.forEach(q=>{list.append(el('dt',q.title),el('dd',label(q.key,a[q.key])));});resultBox.append(list,el('p',result.timing));
    const reading=el('div',null,'finder-resource');reading.append(el('h4','A resource to start with'),el('p',result.reading.why));const resourceLink=el('a',result.reading.title);resourceLink.href=result.reading.url;resourceLink.target='_blank';resourceLink.rel='noopener';reading.append(resourceLink);resultBox.append(reading);
    resultBox.append(el('h4','Questions to bring to your coach'));const qs=el('ul');result.questions.forEach(q=>qs.append(el('li',q)));resultBox.append(qs);
    const actions=el('div',null,'finder-actions');const primary=el('a',result.recommendation.cta,'btn');primary.href=result.recommendation.url;actions.append(primary);
    const download=el('a','Save my summary and blank sleep log','btn btn-outline');
    const log='\n\nBLANK SLEEP LOG\nUse this to note what happens so you can discuss it with your coach. There is no target schedule to follow.\n\nDate | Nap / night | Put down | Fell asleep | Woke | How settling went / notes\n'+Array.from({length:12},()=> '____ | ___________ | ________ | ___________ | ____ | __________________________').join('\n');
    if(exportUrl)URL.revokeObjectURL(exportUrl);exportUrl=URL.createObjectURL(new Blob([result.summary+log],{type:'text/plain;charset=utf-8'}));download.href=exportUrl;download.download='my-sleep-support-summary-and-log.txt';actions.append(download);
    const print=el('button','Print my summary and sleep log','text-button');print.type='button';print.onclick=()=>window.print();actions.append(print);resultBox.append(actions);
    const email=el('button','Email me my summary and resource links','text-button');email.type='button';email.onclick=()=>{capture.hidden=false;fillCapture();capture.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});embed.querySelector('input[name="form_submission[name]"]')?.focus();};resultBox.append(email);
    const restart=el('button','Change my answers','text-button');restart.type='button';restart.onclick=()=>{stage.hidden=false;resultBox.hidden=true;capture.hidden=true;showStep(0);};resultBox.append(restart);
    const printLog=el('div',null,'finder-print-log');printLog.append(el('h4','A blank sleep log'),el('p','Note what happens and bring this to your coach. There is no target schedule to follow.'));
    const table=el('table');const header=el('tr');['Date','Nap / night','Put down','Fell asleep','Woke','Settling / notes'].forEach(x=>header.append(el('th',x)));table.append(header);for(let i=0;i<10;i++){const row=el('tr');for(let j=0;j<6;j++)row.append(el('td',' '));table.append(row);}printLog.append(table);resultBox.append(printLog);
    fillCapture();if(focus)resultBox.focus();
  }
  form.addEventListener('change',()=>error.hidden=true);
  back.addEventListener('click',()=>showStep(step-1));
  form.addEventListener('submit',event=>{event.preventDefault();const values=Object.fromEntries(new FormData(form));if(!values[C.questions[step].key]){error.hidden=false;panels[step].querySelector('input').focus();return;}if(step<4){showStep(step+1);return;}render(values);});
  const observer=new MutationObserver(()=>{if(embed.querySelector('form')){fillCapture();observer.disconnect();}});observer.observe(embed,{childList:true,subtree:true});
  root.querySelectorAll('.snooze-footer-clean a[href^="/"]').forEach(a=>a.href=new URL(a.getAttribute('href'),'https://www.joinsnooze.com').href);
  root.querySelector('.sf-logo a')?.setAttribute('aria-label','Snooze home');root.querySelectorAll('.sf-heading').forEach(h=>h.setAttribute('aria-level','3'));
  const track=root.querySelector('[data-camp-captions]');if(track)track.src=URL.createObjectURL(new Blob([__CAMP_CAPTIONS__],{type:'text/vtt'}));
  showStep(0,false);
})(typeof window!=='undefined'?window:globalThis);
