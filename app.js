'use strict';
const el = id => document.getElementById(id);
const sections = ['Olvasmány','Szókincs','Nyelvtan','Reading','Listening','Writing','Gyakorlás','Lecketeszt'];
const subtitles = ['Ismétlés','Újrahasznosítás','A jövő technológiája','Élet a jövőben'];
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
  if (source) { source.onended = null; try { source.stop(); } catch {} source = null; }
  el('soundStatus').textContent = '';
}
async function play(group, from, to, rate) {
  stopAudio();
  const token = playback, id = current().id;
  const track = rate < 1 ? id + '-slow' : id;
  const index = (rate < 1 ? slowIndex : audioIndex)[id];
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
    source.start(0, start, end + tail - start);
  } catch { if(token===playback) el('soundStatus').textContent='A hang nem indult el. Ellenőrizd a kapcsolatot, majd nyomd meg újra a lejátszást.'; }
}
function controls(parent, group, from, to=from) {
  const bar=node('div',undefined,'sound');
  bar.append(button('▶ Normál hang',()=>play(group,from,to,1)),
    button('▷ Lassú hang',()=>play(group,from,to,.78)),
    button('Leállítás',stopAudio));parent.append(bar);
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
  chooseNav(el('tabs'),sections,tab,i=>{tab=i;activate();});
  el('theme').textContent=subtitles[unit];el('lesson').textContent=current().title;
  const best=load('best',{})[current().id+'-'+level];
  el('best').textContent=best===undefined?current().theme:'Legjobb lecketeszt ezen a szinten: '+best+'%';
  if(tab===0) reading();
  else if(tab===1) vocabulary();
  else if(tab===2) grammar();
  else introduction();
}
function readingRows(parent,group) {
  const rows=current()[group];
  controls(parent,group,0,rows.length-1);
  rows.forEach(([en,hu,phon],i)=>{
    const r=node('div',undefined,'row');r.append(english('p',en,'en'));
    if(level==='sni') r.append(node('p',hu),node('p',phon,'phon'));
    else {
      const d=detail('Fordítás és kiejtés',r);d.open=level==='btmn';
      d.append(node('p',hu),node('p',phon,'phon'));
    }
    controls(r,group,i);parent.append(r);
  });
}
function reading() {
  content.append(node('h3','Olvasmány'),node('p','Hallgasd meg egyben, majd mondd utána mondatonként. A magyar betűs kiejtés közelítés. A th hanghoz tedd a nyelved hegyét a fogsorok közé.','note'));
  if (level==='sni') {readingRows(content,'short');readingRows(detail('Hosszabb olvasmány',content),'reading');}
  else readingRows(content,'reading');
  if(current().poster) {
    const poster=detail('Recycling Day · Mit tudunk meg a tankönyvi plakátról?',content);
    current().poster.forEach(line=>poster.append(node('p',line)));
    poster.append(node('p','A könyv eredeti hangfelvétele nem áll rendelkezésre. A Listening részben egy másik iskolai program saját hanganyagával gyakorolhatsz.','note'));
  }
  const [title,prompt,examples]=current().talk;
  const d=detail('Beszédgyakorlat · '+title,content);
  d.append(node('p',prompt),english('p',examples,'en'));
}
function vocabulary() {
  content.append(node('h3','Szókincs'),node('p','Olvasd fel a szót, majd hasonlítsd össze a hangmintával.','note'));
  current().vocab.forEach(([en,hu,phon],i)=>{
    const r=node('div',undefined,'row');r.append(english('p',en,'en'),node('p',hu+' · '+phon));controls(r,'vocab',i);content.append(r);
  });
}
function grammar() {
  content.append(node('h3','Nyelvtan'));
  current().grammar.forEach(([title,en,hu,rule])=>{
    const r=node('div',undefined,'row');r.append(node('h4',title),node('p',rule),english('p',en,'en'),node('p',hu));content.append(r);
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
function vocabItem(i) {
  const words=current().vocab,dir=level==='normal' && i%2===1?1:0;
  const [term,translation]=[words[i][dir],words[i][1-dir]];
  const others=shuffled(words.filter(w=>w[1-dir]!==translation)).slice(0,2).map(w=>w[1-dir]);
  return choices([(dir?'Hogyan mondod angolul? ':'Mit jelent? ')+term,translation,...others]);
}
function questions() {
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
 'Olvasd el a szöveget, és válaszolj a tartalmára vonatkozó kérdésekre.',
 'Hallgasd meg az új angol hangrészletet, és válaszd ki a jelentésének megfelelő választ. A hangot többször is lejátszhatod.',
 'Írj angolul. A kis- és nagybetűket, a mondatvégi írásjeleket és az ismert rövidítéseket rugalmasan javítjuk.',
 'Szavak jelentését és mondatokba illő nyelvtani alakokat gyakorolhatsz.',
 'A lecketesztben szókincs, nyelvtan, olvasás, hallásértés és írás is szerepel. A százalék az elsőre helyes válaszok aránya.'
];
function introduction() {
  content.append(node('h3',sections[tab]),node('p',infos[tab-3]));
  const count=questions().length;
  const hint=level==='sni'?'Rövidebb feladatok, két válaszlehetőség és írásnál szókezdő segítség.':level==='btmn'?'Íráskor kérhetsz mondatkezdést, olvasáskor megnyithatod a fordítást.':'Önálló feladatmegoldás.';
  content.append(node('p',count+' feladat · '+hint,'note'),button('Kezdés',()=>startRound(questions()),'primary'));
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
    current()[level==='sni'?'short':'reading'].forEach(([en,hu])=>{
      r.append(english('p',en));if(level==='sni')r.append(node('p',hu,'note'));
      else if(level==='btmn')detail('Magyarul',r).append(node('p',hu));
    });
  }
  if(q.audio!==undefined)controls(content,'listen',q.audio);
  const label=node('p',q.prompt,'question');label.id='taskPrompt';content.append(label);
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
  const total=round.items.length,pct=Math.round(round.first/total*100);
  content.append(node('h3',round.review?'Javítógyakorlás eredménye':'Eredmény'),
    node('p',pct+'% · '+round.first+' / '+total+' elsőre helyes válasz.','question'));
  if(round.fixed)content.append(node('p','Újabb próbálkozással megoldva: '+round.fixed+'.'));
  if(tab===7 && !round.review) {
    const best=load('best',{}),key=current().id+'-'+level;best[key]=Math.max(best[key]??0,pct);
    save('best',best);el('best').textContent='Legjobb lecketeszt ezen a szinten: '+best[key]+'%';
  }
  const bar=node('div',undefined,'actions');content.append(bar);
  if(round.missed.length)bar.append(button('Hibás feladatok újra ('+round.missed.length+')',()=>startRound(round.missed.slice(),true),'primary'));
  bar.append(button('Új kör',()=>startRound(questions())),button('Vissza a leckéhez',()=>{tab=0;activate();}));
}
el('level').addEventListener('change',e=>{level=e.target.value;save('level',level);activate();});
activate();
