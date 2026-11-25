'use strict';
const el = id => document.getElementById(id);
const sections = ['Olvasmány','Szókincs','Nyelvtan','Reading','Listening','Writing','Gyakorlás','Lecketeszt','Saját teszt'];
let slow = load('slow', false);
let activeAudio = null;
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem('angolapp8.' + key)) ?? fallback; }
  catch { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem('angolapp8.' + key, JSON.stringify(value)); } catch {}
}
let unit = Math.max(0, lessons.findIndex(l => l.id === load('lesson','hello')));
let level = load('level','normal');
if (!['normal','btmn','sni'].includes(level)) level = 'normal';
let tab = 0, round, context, source, playback = 0;
const buffers = new Map();
const current = () => lessons[unit];
const content = el('content');
function node(tag, text, cls) {
  const n = document.createElement(tag);
  if (text !== undefined) n.textContent = text;
  if (cls) n.className = cls;
  return n;
}
function button(label, click, cls) {
  const b = node('button', label, cls);
  b.type = 'button'; b.addEventListener('click', click); return b;
}
function english(tag, text, cls) {
  const n = node(tag,text,cls); n.lang = 'en'; return n;
}
function detail(label, parent) {
  const d = node('details'); d.append(node('summary',label)); parent.append(d); return d;
}
function stopAudio() {
  playback++;
  if (activeAudio) {
    activeAudio.textContent = activeAudio.dataset.idle;
    activeAudio.setAttribute('aria-label',activeAudio.dataset.label);
    activeAudio = null;
  }
  if (source) { source.onended = null; try { source.stop(); } catch {} source = null; }
  el('soundStatus').textContent = '';
}
async function play(trigger, group, from, to, id) {
  const same = activeAudio === trigger;
  stopAudio();
  if (same) return;
  activeAudio = trigger;
  trigger.textContent = trigger.dataset.idle === '▶' ? '■' : '■ Leállítás';
  trigger.setAttribute('aria-label','Leállítás');
  const token = playback;
  const track = slow ? id + '-slow' : id;
  const index = (slow ? slowIndex : audioIndex)[id];
  try {
    context ||= new (window.AudioContext || window.webkitAudioContext)();
    await context.resume();
    if (!buffers.has(track)) {
      const pending = fetch('audio/'+track+'.mp3').then(r => {
        if (!r.ok) throw Error(); return r.arrayBuffer();
      }).then(b => context.decodeAudioData(b)).catch(e => {buffers.delete(track);throw e;});
      buffers.set(track,pending);
    }
    const buffer = await buffers.get(track);
    if (token !== playback) return;
    const [start] = index[group+from];
    const [end, tail] = index[group+to];
    source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.onended = () => { if (token === playback) stopAudio(); };
    source.start(0, start, end + tail - start);
  } catch {
    if (token !== playback) return;
    stopAudio();
    el('soundStatus').textContent='A hang nem indult el. Próbáld újra!';
  }
}
function listenButton(group, from, to, caption, label, id=current().id) {
  const b=button(caption,()=>play(b,group,from,to,id),'listen');
  b.dataset.idle=caption;
  b.dataset.label=label;
  b.setAttribute('aria-label',label);
  b.title=label;
  return b;
}
function speedSwitch() {
  const label=node('label',undefined,'speed');
  const input=node('input'); input.type='checkbox'; input.checked=slow;
  input.addEventListener('change',()=>{
    slow=input.checked; save('slow',slow); stopAudio();
  });
  label.append(input,document.createTextNode('Lassú hang'));
  return label;
}
function sectionNav() {
  const nav=el('tabs');
  nav.replaceChildren();
  const go=i=>{tab=i;activate();};
  const addTab=i=>{
    const b=button(sections[i],()=>go(i));
    b.setAttribute('aria-current',String(tab===i)); nav.append(b);
  };
  [0,1,2].forEach(addTab);
  const select=node('select'); select.setAttribute('aria-label','Gyakorlófeladatok');
  const placeholder=node('option','Feladatok'); placeholder.value='';placeholder.disabled=true;
  select.append(placeholder);
  ['Olvasásértés','Hallásértés','Írás','Vegyes gyakorlás'].forEach((name,i)=>{
    const option=node('option',name);option.value=String(i+3);select.append(option);
  });
  select.value=tab>=3 && tab<=6 ? String(tab) : '';
  select.classList.toggle('selected',select.value!=='');
  select.addEventListener('change',()=>go(Number(select.value)));
  nav.append(select); addTab(7); addTab(8);
}
function chooseNav(parent, names, selected, action) {
  parent.replaceChildren();
  names.forEach((name,i)=>{
    const b=button(name,()=>action(i));
    b.setAttribute('aria-current',String(i===selected));parent.append(b);
  });
}
function activate() {
  stopAudio();round=null;content.replaceChildren();
  document.body.classList.toggle('sni',level==='sni');el('level').value=level;
  chooseNav(el('chapters'),lessons.map((l,i)=>i?l.title:'Hello · Ismétlés'),unit,i=>{
    unit=i;tab=0;save('lesson',current().id);activate();
  });
  sectionNav();
  el('lesson').textContent=tab===8?'Egyéni gyakorlás':current().title;
  el('theme').textContent=tab===8?'':current().theme;
  if(tab===0) reading();
  else if(tab===1) vocabulary();
  else if(tab===2) grammar();
  else if(tab===8)customSetup();
  else introduction();
}
function readingRows(parent,group) {
  const rows=current()[group];
  const bar=node('div',undefined,'reader-tools');
  const main=listenButton(group,0,rows.length-1,'▶ Felolvasás','Teljes olvasmány felolvasása');
  const list=node('div',undefined,'sentences');
  const help=button('Fordítás és kiejtés',()=>{
    setHelp(help.getAttribute('aria-pressed')!=='true');
  });
  function setHelp(visible) {
    help.setAttribute('aria-pressed',String(visible));
    list.classList.toggle('with-help',visible);
  }
  setHelp(level!=='normal');
  bar.append(main,help);
  parent.append(bar,list);
  rows.forEach(([en,hu,phon],i)=>{
    const r=node('div',undefined,'row audio-row'),words=node('div');
    words.append(english('p',en,'en'),node('p',hu,'translation'),node('p',phon,'phon'));
    r.append(words,listenButton(group,i,i,'▶','Felolvasás: '+en));
    list.append(r);
  });
}
function audioHeading(title) {
  const h=node('div',undefined,'audio-heading');h.append(node('h3',title),speedSwitch());
  content.append(h);
}
function reading() {
  audioHeading('Olvasmány');
  if (level==='sni') {readingRows(content,'short');readingRows(detail('Hosszabb olvasmány',content),'reading');}
  else readingRows(content,'reading');
  if(current().poster) {
    const poster=detail('Recycling Day · Program',content);
    current().poster.forEach(line=>poster.append(node('p',line)));
    
  }
  const [title,prompt,examples]=current().talk;
  const d=detail('Beszédgyakorlat · '+title,content);
  d.append(node('p',prompt),english('p',examples,'en'));
}
function vocabulary() {
  audioHeading('Szókincs');
  const search=node('input'); search.type='search'; search.placeholder='Keresés angolul vagy magyarul'; search.setAttribute('aria-label','Szókincs keresése');
  const filter=button('Csak a még nem megtanult szavak',()=>{onlyNew=!onlyNew;filter.setAttribute('aria-pressed',String(onlyNew));refresh();});
  let onlyNew=false; const learned=load('learned',{}); const rows=[];
  const summary=node('p',undefined,'note'); content.append(search,filter,summary);
  function refresh(){const term=search.value.trim().toLocaleLowerCase('hu'); let visible=0; for(const x of rows){const show=(!onlyNew||!learned[x.key])&&x.text.includes(term);x.row.hidden=!show;x.row.style.display=show?'':'none';if(show)visible++;} summary.textContent=rows.filter(x=>learned[x.key]).length+' / '+rows.length+' megtanult szó · '+visible+' látható';}
  filter.setAttribute('aria-pressed','false'); search.addEventListener('input',refresh);
  current().vocab.forEach(([en,hu,phon],i)=>{
    const r=node('div',undefined,'row audio-row'),words=node('div');
    words.append(english('span',en,'en'),node('span',' – '+hu),node('p',phon,'phon'));
    const key=current().id+'|'+en+'|'+hu; const mark=button(learned[key]?'✓ Tudom':'Tanulom',()=>{learned[key]=!learned[key];save('learned',learned);mark.textContent=learned[key]?'✓ Tudom':'Tanulom';mark.setAttribute('aria-pressed',String(!!learned[key]));refresh();}); mark.setAttribute('aria-pressed',String(!!learned[key]));
    words.append(mark);r.append(words,listenButton('vocab',i,i,'▶','Felolvasás: '+en));content.append(r);rows.push({row:r,key,text:(en+' '+hu).toLocaleLowerCase('hu')});
  });refresh();
}
function grammar() {
  content.append(node('h3','Nyelvtan'));
  current().grammar.forEach(([title,en,hu,rule],i)=>{
    const d=detail(title,content);
    d.open=i===0;
    d.append(node('p',rule),english('p',en,'en'),node('p',hu));
  });
}
function shuffled(xs) {
  const arr=xs.slice();
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  return arr;
}
function choices(row, extra={}) {
  const [prompt,answer,...others]=row;
  return {prompt,answer,options:shuffled([answer,...shuffled(others).slice(0,level==='sni'?1:2)]),...extra};
}
function normalized(text) {
  return text.toLowerCase().replace(/[’‘]/g,"'").replace(/\bwon't\b/g,'will not')
    .replace(/\b(\w+)'ll\b/g,'$1 will').replace(/\bi'm\b/g,'i am')
    .replace(/\b(you|we|they)'re\b/g,'$1 are').replace(/\b(he|she|it)'s\b/g,'$1 is')
    .replace(/[-‐‑–]/g,' ').replace(/[^a-z0-9'\s]/g,'').trim().replace(/\s+/g,' ');
}
function writingItem(row) {
  const [prompt,answer,...alternatives]=row;
  if(level==='sni') {
    const parts=answer.replace(/[.?!]$/,'').split(' '),word=parts.pop();
    return {prompt,context:parts.join(' ')+' ____',answer:word,hint:'A hiányzó szó első betűje: '+word[0]+'.'};
  }
  return {prompt,answer,alternatives,hint:'Mondatkezdés: '+answer.split(' ').slice(0,2).join(' ')+' …'};
}
function vocabItem(i,lesson=current()) {
  const words=lesson.vocab,dir=level==='normal' && i%2===1?1:0;
  const [term,translation]=[words[i][dir],words[i][1-dir]];
  const others=shuffled(words.filter(w=>w[1-dir]!==translation)).slice(0,2).map(w=>w[1-dir]);
  return choices([(dir?'Hogyan mondod angolul? ':'Mit jelent? ')+term,translation,...others]);
}
const practiceKinds=['Szókincs','Mondatok és nyelvtan','Olvasásértés','Hallásértés','Írás'];
let selection;
function customPool(lesson,kind) {
  const limit=level==='sni'?2:level==='btmn'?3:Infinity;
  if(kind===0)return lesson.vocab.map((_,i)=>vocabItem(i,lesson));
  if(kind===1)return (level==='sni'?lesson.q.slice(0,4):lesson.q).map(q=>choices(q));
  if(kind===2)return lesson.readQs.slice(0,level==='sni'?2:4).map(q=>choices(q,{read:true,lessonId:lesson.id}));
  if(kind===3)return lesson.listen.slice(0,limit).map(([script,...q],i)=>choices(q,{audio:i,transcript:script,lessonId:lesson.id}));
  return lesson.writing.slice(0,limit).map(writingItem);
}
function customItems() {
  const groups=[];
  for(const u of selection.units)for(const k of selection.kinds)groups.push(shuffled(customPool(lessons[u],k)));
  const items=[];
  while(items.length<selection.count){
    const active=shuffled(groups.filter(group=>group.length));
    if(!active.length)break;
    for(const group of active){items.push(group.pop());if(items.length===selection.count)break;}
  }
  return shuffled(items);
}
function customSetup() {
  selection ||= {units:[unit],kinds:[0,1],count:10};
  content.append(node('h3','Saját teszt'));
  function checkboxes(title,names,key) {
    const field=node('fieldset');field.append(node('legend',title));
    names.forEach((name,i)=>{
      const label=node('label',undefined,'speed');
      const check=node('input');check.type='checkbox';check.checked=selection[key].includes(i);
      check.addEventListener('change',()=>{
        selection[key]=check.checked?[...selection[key],i]:selection[key].filter(j=>j!==i);update();
      });
      label.append(check,document.createTextNode(name));field.append(label,document.createTextNode(' '));
    });
    content.append(field);
  }
  checkboxes('Leckék',lessons.map(l=>l.title),'units');
  checkboxes('Feladattípusok',practiceKinds,'kinds');
  const label=node('label','Kérdések száma '),count=node('select');
  for(const n of [5,10,15,20]){const o=node('option',String(n));o.value=String(n);count.append(o);}
  count.value=String(selection.count);count.addEventListener('change',()=>{selection.count=Number(count.value);update();});
  label.append(count);content.append(label);
  const bar=node('div',undefined,'actions'),start=button('Kezdés',()=>startRound(customItems()),'primary');
  bar.append(start);content.append(bar);
  function update(){const n=customItems().length;start.disabled=!n;start.textContent=n?'Kezdés · '+n+' feladat':'Válassz leckét és feladattípust';}
  update();
}

function questions() {
  if(tab===8)return customItems();
  const l=current(), easy=level==='sni', mid=level==='btmn';
  const comprehension=l.readQs.slice(0,easy?2:4).map(row=>choices(row,{read:true}));
  const listening=l.listen.slice(0,easy?2:3).map(([script,...row],i)=>choices(row,{audio:i,transcript:script}));
  const writing=l.writing.slice(0,easy?2:mid?3:l.writing.length).map(writingItem);
  const vocab=l.vocab.map((_,i)=>vocabItem(i));
  const gram=l.q.map(row=>choices(row));
  if(tab===3) return comprehension;
  if(tab===4) return listening;
  if(tab===5) return writing;
  if(tab===6) return shuffled([...shuffled(vocab).slice(0,easy?3:mid?5:7),...shuffled(gram.slice(0,easy?4:gram.length)).slice(0,easy?2:mid?4:6)]);
  return shuffled([...shuffled(comprehension).slice(0,easy?1:2),...shuffled(listening).slice(0,easy?1:2),...shuffled(writing).slice(0,easy?1:2),...shuffled(vocab).slice(0,easy?1:mid?2:3),...shuffled(easy?gram.slice(0,4):gram).slice(0,easy?2:mid?3:4)]);
}
const infos=[
  'Olvasd el a szöveget, majd válaszolj!',
  'Hallgasd meg a részletet, majd válassz!',
  'Írd be a választ angolul!',
  'Gyakorold a szavakat és a nyelvtant!',
  'Az elsőre helyes válaszokért jár pont.'
];
function introduction() {
  const items=questions();
  content.append(node('h3',sections[tab]),node('p',infos[tab-3]));
  if(tab===7) {
    const best=load('best',{})[current().id+'-'+level];
    if(best!==undefined)content.append(node('p','Eddigi legjobb: '+best+'%','note'));
  }
  content.append(button('Kezdés · '+items.length+' feladat',()=>startRound(items),'primary'));
}
function startRound(items,review=false) {
  round={items,index:0,first:0,fixed:0,missed:[],attempts:0,review};
  show();
}
function show() {
  stopAudio();content.replaceChildren();
  if(round.index>=round.items.length){finish();return;}
  const q=round.items[round.index], total=round.items.length;
  const title=node('h3',sections[tab]+' · '+(round.index+1)+' / '+total);
  title.tabIndex=-1;content.append(title);title.focus({preventScroll:true});
  const meter=node('progress');meter.max=total;meter.value=round.index;meter.setAttribute('aria-label','Teljesített feladat');content.append(meter);
  if(q.read){
    const r=detail('Olvasmány megnyitása',content);r.open=tab===3||level==='sni';
    (lessons.find(l=>l.id===q.lessonId)||current())[level==='sni'?'short':'reading'].forEach(([en,hu])=>{
      r.append(english('p',en));if(level==='sni')r.append(node('p',hu,'note'));
      else if(level==='btmn')detail('Magyarul',r).append(node('p',hu));
    });
  }

  const label=node('p',q.prompt,'question');label.id='taskPrompt';content.append(label);
  if(q.audio!==undefined){
    const bar=node('div',undefined,'reader-tools');
    bar.append(listenButton('listen',q.audio,q.audio,'▶ Meghallgatás','Hangrészlet meghallgatása',q.lessonId),speedSwitch());
    content.append(bar);
  }
  if(q.context)content.append(english('p',q.context,'en'));
  const box=node('div',undefined,'options'), feedback=node('div',undefined,'status'),actions=node('div',undefined,'actions');
  feedback.setAttribute('role','status');content.append(box,feedback,actions);
  let completed=false, check, input;
  function done(correct, revealed=false) {
    if(completed)return;
    if(!correct&&!revealed) {
      if(round.attempts++===0)round.missed.push(q);
      feedback.className='retry';feedback.textContent='Még nem pontos. Próbáld újra!';
      if(!actions.childElementCount)actions.append(button('Megoldás mutatása',()=>done(false,true)));
      if(input)input.focus();
      return;
    }
    completed=true;
    if(correct && !round.attempts)round.first++;
    if(correct && round.attempts)round.fixed++;
    box.querySelectorAll('button,input').forEach(b=>b.disabled=true);
    feedback.className=correct?'success':'retry';
    feedback.textContent=(correct?(round.attempts?'Sikerült javítanod! ':'Helyes! '):'Megoldás: ')+q.answer;
    if(q.transcript)feedback.append(english('p',q.transcript));
    actions.replaceChildren(button(round.index+1===total?'Eredmény':'Tovább',()=>{round.index++;round.attempts=0;show();},'primary'));
    actions.firstChild.focus({preventScroll:true});
  }
  if(q.options) {
    q.options.forEach(s=>{const b=button(s,()=>{const correct=s===q.answer;if(!correct)b.disabled=true;done(correct);});box.append(b);});
  } else {
    input=node('input');input.setAttribute('aria-labelledby','taskPrompt');input.lang='en';input.autocomplete='off';input.spellcheck=false;
    check=()=>{if(!input.value.trim()){feedback.textContent='Először írj be egy választ.';input.focus();return;}
      done([q.answer,...(q.alternatives||[])].some(s=>normalized(s)===normalized(input.value)));};
    input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!completed){e.preventDefault();check();}});
    box.append(input);
    if(level==='sni')box.append(node('p',q.hint,'note'));
    if(level==='btmn')detail('Kérek segítséget',box).append(node('p',q.hint));
    box.append(button('Ellenőrzés',check,'primary'));
  }
}
function finish() {
  const total=round.items.length,pct=total?Math.round(round.first/total*100):0;
  content.append(node('h3',round.review?'Javítógyakorlás eredménye':'Eredmény'),
    node('p',pct+'% · '+round.first+' / '+total+' elsőre helyes válasz.','question'));
  if(pct===100)content.append(node('p','Gratulálok! Minden feladatot elsőre megoldottál.','success'));
  else if(pct>=70)content.append(node('p','Ügyes munka! A hibás feladatok ismétlésével még jobb lehetsz.','note'));
  else content.append(node('p','Minden gyakorlással fejlődsz. Próbáld meg újra a hibás feladatokat!','note'));
  if(round.fixed)content.append(node('p','Újabb próbálkozással megoldva: '+round.fixed+'.'));
  if(tab===7 && !round.review) {
    const best=load('best',{}),key=current().id+'-'+level;best[key]=Math.max(best[key]??0,pct);
    save('best',best);
    content.append(node('p','Ezen az eszközön a legjobbad: '+best[key]+'%','note'));
  }
  const bar=node('div',undefined,'actions');content.append(bar);
  if(round.missed.length)bar.append(button('Hibás feladatok újra ('+round.missed.length+')',()=>startRound(round.missed.slice(),true),'primary'));
  if(tab===8)bar.append(button('Összeállítás módosítása',activate));
  bar.append(button('Új kör',()=>startRound(questions())),button('Vissza a leckéhez',()=>{tab=0;activate();}));
}
el('level').addEventListener('change',e=>{level=e.target.value;save('level',level);activate();});
activate();

