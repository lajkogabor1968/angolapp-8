'use strict';
const main=document.getElementById('exam'),message=document.getElementById('notice');
const cacheKey='angolapp8.teacher.v1';
let session=null,question=null,away=false,busy=false,changeInFlight=false;
function text(tag,value){const e=document.createElement(tag);e.textContent=value;return e;}
function remember(){sessionStorage.setItem(cacheKey,JSON.stringify(session));}
function call(method,...args){
  return new Promise((resolve,reject)=>{
    const api=google.script.run.withSuccessHandler(resolve).withFailureHandler(reject);
    api[method](...args);
  });
}
function warn(error){message.textContent=error.message||'Kapcsolati hiba. Próbáld újra.';}
async function request(action) {
  if(busy)return;
  busy=true;message.textContent='Mentés…';
  try{const state=await action();draw(state);message.textContent='';}catch(e){warn(e);}
  finally{busy=false;}
}
function draw(state) {
  main.replaceChildren();
  session.leaves=Math.max(session.leaves,state.leaves||0);
  if(state.done){
    question=null;session=null;sessionStorage.removeItem(cacheKey);
    main.append(text('h2','Dolgozat leadva'),text('p',state.score+' / '+state.total+' pont · '+Math.round(100*state.score/state.total)+'%'));
    return;
  }
  question=state;remember();
  const title=text('h2',(state.step+1)+' / '+state.total+' · '+state.prompt);title.tabIndex=-1;
  const form=document.createElement('form'),set=document.createElement('fieldset');
  set.append(text('legend','Válassz egy választ!'));
  state.options.forEach((v,i)=>{
    const lab=text('label',''),radio=document.createElement('input');
    radio.type='radio';radio.name='valasz';radio.value=String(i);radio.required=true;
    lab.append(radio,document.createTextNode(' '+v));set.append(lab);
  });
  const next=text('button',state.step+1===state.total?'Dolgozat leadása':'Válasz mentése');
  form.append(set,next);
  form.onsubmit=e=>{e.preventDefault();const answer=Number(new FormData(form).get('valasz'));
    request(()=>call('answer',session.code,session.key,state.step,answer,session.leaves));};
  main.append(title,form);title.focus();
}
function entry(){
  main.innerHTML='<h2>Tanári teszt</h2><p>12 kérdés. A mentett válasz végleges. A tanár látja, hányszor került háttérbe a tesztlap.</p><form><label>Név<input name="name" required maxlength="80" autocomplete="off"></label><label>Osztály<input name="group" required maxlength="24" autocomplete="off"></label><label>Egyszeri kód<input name="code" required maxlength="20" autocapitalize="characters" spellcheck="false" autocomplete="off"></label><button>Kezdés</button></form>';
  main.querySelector('form').onsubmit=e=>{
    e.preventDefault();const data=new FormData(e.target),code=data.get('code').trim().toUpperCase();
    if(!session||session.code!==code)session={code,key:crypto.randomUUID(),leaves:0};
    try{remember();}catch{warn(new Error('A munkamenet mentéséhez engedélyezd a böngésző tárhelyét.'));return;}
    request(()=>call('begin',code,session.key,data.get('name').trim(),data.get('group').trim()));
  };
}
async function sendLeaves(){
  if(!question||changeInFlight||!session)return;
  const saved=session,count=saved.leaves;
  changeInFlight=true;
  try{await call('recordLeave',saved.code,saved.key,count);}catch{}finally{
    changeInFlight=false;
    if(session===saved && session.leaves>count)sendLeaves();
  }
}
function markAway(){if(!question||!session||away)return;away=true;session.leaves++;remember();sendLeaves();}
document.addEventListener('visibilitychange',()=>{if(document.hidden)markAway();else{away=false;sendLeaves();}});
window.addEventListener('pagehide',markAway);
window.addEventListener('pageshow',()=>{if(!document.hidden)away=false;});
entry();
try{session=JSON.parse(sessionStorage.getItem(cacheKey));}catch{}
if(session)request(()=>call('resumeExam',session.code,session.key));
