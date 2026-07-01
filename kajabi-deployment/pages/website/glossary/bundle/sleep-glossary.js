(function(){function init(){var root=document.getElementById('snooze-glossary');if(!root)return;
var search=root.querySelector('#gl-search-input');var terms=[].slice.call(root.querySelectorAll('.gl-term'));
var lgs=[].slice.call(root.querySelectorAll('.gl-lg'));var noRes=root.querySelector('#gl-noresults');var activeCat='all';
function apply(){var q=(search&&search.value.trim().toLowerCase())||'';var any=false;
terms.forEach(function(t){var okC=activeCat==='all'||t.getAttribute('data-cat')===activeCat;
var hay=(t.textContent+' '+(t.getAttribute('data-aliases')||'')).toLowerCase();var okS=q===''||hay.indexOf(q)!==-1;
var show=okC&&okS;t.hidden=!show;if(show)any=true;});
var present={};lgs.forEach(function(g){var v=g.querySelectorAll('.gl-term:not([hidden])').length;g.hidden=v===0;if(v)present[g.getAttribute('data-letter')]=1;});
root.querySelectorAll('.gl-az [data-letter]').forEach(function(el){el.classList.toggle('is-off',!present[el.getAttribute('data-letter')]);});
if(noRes)noRes.hidden=any;}
root.querySelectorAll('.gl-cat-pill').forEach(function(p){p.addEventListener('click',function(){activeCat=p.getAttribute('data-cat');
root.querySelectorAll('.gl-cat-pill').forEach(function(x){x.classList.toggle('is-active',x===p);});apply();});});
root.querySelectorAll('.gl-tag').forEach(function(tag){function go(e){e.stopPropagation();var c=tag.getAttribute('data-cat');
var pill=root.querySelector('.gl-cat-pill[data-cat="'+c+'"]');if(pill)pill.click();var h=root.querySelector('.gl-hero');if(h)h.scrollIntoView({behavior:'smooth'});}
tag.addEventListener('click',go);tag.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){go(e);}});});
if(search)search.addEventListener('input',apply);
terms.forEach(function(t){var b=t.querySelector('.gl-toggle');if(b)b.addEventListener('click',function(){var o=t.classList.toggle('is-open');b.textContent=o?'less...':'more...';b.setAttribute('aria-expanded',o?'true':'false');});});
function openHash(){var id=(location.hash||'').replace(/[^#\w-]/g,'');if(id.length>1){var el=root.querySelector(id);if(el&&el.classList&&el.classList.contains('gl-term')){el.classList.add('is-open');var b=el.querySelector('.gl-toggle');if(b){b.textContent='less...';b.setAttribute('aria-expanded','true');}}}}
root.querySelectorAll('.gl-chip').forEach(function(c){c.addEventListener('click',function(){setTimeout(openHash,0);});});
window.addEventListener('hashchange',openHash);openHash();
try{if(typeof window.SnoozeUserDetection!=='undefined'){var s=window.SnoozeUserDetection.getUserStatus();var slot=root.querySelector('#gl-cta-slot');
if(slot&&s==='snooze-member'){slot.innerHTML='<a href="'+(window.SNOOZE_LIBRARY_URL||'/snooze-library')+'" class="gl-btn">Go to your Library</a>';}}}catch(e){}}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}})();
