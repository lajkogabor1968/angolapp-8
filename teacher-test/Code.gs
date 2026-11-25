// Angolapp 8 – a meglévő táblázathoz kötött Apps Script.
// A setup_ futtatását és a webalkalmazás telepítését a tulajdonos végzi.
function setup_() {
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  if(!ss || !ss.getSheetByName('Dolgozatok') || !ss.getSheetByName('Kérdésbank')) throw Error('Nem a megfelelő táblázat.');
  PropertiesService.getScriptProperties().setProperty('SHEET_ID',ss.getId());
}
function book_(){
  const id=PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if(!id)throw Error('A tanár még nem állította be a dolgozatot.');
  return SpreadsheetApp.openById(id);
}
function shuffle_(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function safe_(s){return /^[=+@\-\t\r]/.test(s)?"'"+s:s;}
function startTest(data){
  if(!data||typeof data.name!=='string'||typeof data.cls!=='string')throw Error('Hiányzó adatok.');
  const name=data.name.trim(),cls=data.cls.trim(),level=data.level;
  if(!name||name.length>100||!cls||cls.length>20||!['SNI','BTMN','Egyik sem'].includes(level))throw Error('Ellenőrizd az adatokat!');
  const ss=book_(),bank=ss.getSheetByName('Kérdésbank'),out=ss.getSheetByName('Dolgozatok');
  const rows=bank.getDataRange().getDisplayValues().slice(1).filter(r=>r.slice(0,5).every(Boolean)&&r.length>=5&&new Set(r.slice(2,5)).size===3);
  const n=level==='SNI'?8:level==='BTMN'?12:16;
  const questions=shuffle_(rows).slice(0,n).map(r=>{const options=shuffle_(level==='SNI'?[r[2],r[3]]:r.slice(2,5));return {prompt:r[1],options,correct:options.indexOf(r[2])};});
  if(!questions.length)throw Error('Üres kérdésbank.');
  const token=Utilities.getUuid();
  CacheService.getScriptCache().put('test:'+token,JSON.stringify({questions}),7200);
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try{out.appendRow([safe_(name),safe_(cls),level,new Date(),'Folyamatban','','','','',0,new Date(),'Elindult',token]);SpreadsheetApp.flush();}finally{lock.releaseLock();}
  return {token,questions:questions.map(q=>({prompt:q.prompt,options:q.options}))};
}
function submitTest(data){
  if(!data||typeof data.token!=='string'||!/^[-a-f0-9]{36}$/i.test(data.token)||!Array.isArray(data.answers))throw Error('Érvénytelen beküldés.');
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try{
    const sh=book_().getSheetByName('Dolgozatok');
    const last=sh.getLastRow();if(last<2)throw Error('Ismeretlen munkamenet.');
    const cell=sh.getRange(2,13,last-1,1).createTextFinder(data.token).matchEntireCell(true).findNext();
    if(!cell)throw Error('Ismeretlen munkamenet.');
    const row=cell.getRow(),old=sh.getRange(row,5,1,8).getValues()[0];
    if(old[0]==='Leadva')return {score:old[3],total:old[2],percent:Math.round(Number(old[4])*100)};
    const raw=CacheService.getScriptCache().get('test:'+data.token);
    if(!raw)throw Error('A munkamenet lejárt. Jelezd a tanárnak!');
    const qs=JSON.parse(raw).questions;
    if(data.answers.length!==qs.length||data.answers.some((a,i)=>!Number.isInteger(a)||a<0||a>=qs[i].options.length))throw Error('Minden kérdésre válaszolj!');
    const score=qs.reduce((s,q,i)=>s+Number(data.answers[i]===q.correct),0),pct=score/qs.length;
    const leaves=Number.isInteger(data.leaves)?Math.max(0,Math.min(999,data.leaves)):0;
    sh.getRange(row,5,1,8).setValues([['Leadva',new Date(),qs.length,score,pct,leaves,new Date(),'Mentve']]);
    sh.getRange(row,9).setNumberFormat('0%');
    SpreadsheetApp.flush();
    return {score,total:qs.length,percent:Math.round(pct*100)};
  }finally{lock.releaseLock();}
}
function doGet(){
  return HtmlService.createHtmlOutput(`<!DOCTYPE html><html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font:18px system-ui;max-width:720px;margin:auto;padding:20px;color:#112d38}label{display:block;margin:12px 0}input,select,button{font:inherit;padding:10px;max-width:100%}button{cursor:pointer}fieldset{margin:16px 0;border:1px solid #aaa;border-radius:10px}input[type=radio]{margin-right:10px}#status{white-space:pre-wrap}</style></head><body><h1>Angolapp 8. – Tanári dolgozat</h1><form id="intro"><label>Név: <input name="name" required maxlength="100" autocomplete="off"></label><label>Osztály: <input name="cls" required maxlength="20"></label><label>Melyik igaz rád? <select name="level" required><option value="">Válassz!</option><option>SNI</option><option>BTMN</option><option>Egyik sem</option></select></label><button>Kezdés</button></form><form id="test" hidden><div id="questions"></div><button>Dolgozat leadása</button></form><p id="status" role="status"></p><script>
const intro=document.getElementById('intro'),test=document.getElementById('test'),status=document.getElementById('status'),container=document.getElementById('questions');let session=null,leaves=0,done=false;
document.addEventListener('visibilitychange',()=>{if(session&&!done&&document.hidden)leaves++;});
function fail(err,form){status.textContent=err.message||'Kapcsolati hiba. Próbáld újra!';form.querySelector('button').disabled=false;}
intro.onsubmit=e=>{e.preventDefault();const b=intro.querySelector('button');b.disabled=true;status.textContent='Dolgozat betöltése…';google.script.run.withFailureHandler(err=>fail(err,intro)).withSuccessHandler(s=>{session=s;intro.reset();intro.hidden=true;test.hidden=false;status.textContent='';s.questions.forEach((q,i)=>{const field=document.createElement('fieldset'),legend=document.createElement('legend');legend.textContent=(i+1)+'. '+q.prompt;field.append(legend);q.options.forEach((o,j)=>{const label=document.createElement('label'),radio=document.createElement('input');radio.type='radio';radio.name='q'+i;radio.value=j;radio.required=true;label.append(radio,document.createTextNode(o));field.append(label);});container.append(field);});}).startTest(Object.fromEntries(new FormData(intro)));};
test.onsubmit=e=>{e.preventDefault();const b=test.querySelector('button');b.disabled=true;const f=new FormData(test),answers=session.questions.map((_,i)=>Number(f.get('q'+i)));status.textContent='Mentés…';google.script.run.withFailureHandler(err=>fail(err,test)).withSuccessHandler(r=>{done=true;test.hidden=true;container.replaceChildren();status.textContent='Sikeresen leadtad a dolgozatot. Eredmény: '+r.score+' / '+r.total+' pont ('+r.percent+'%).';}).submitTest({token:session.token,answers,leaves});};
</script></body></html>`).setTitle('Angolapp 8 – Tanári dolgozat');
}
