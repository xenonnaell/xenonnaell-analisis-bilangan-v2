document.addEventListener('DOMContentLoaded',()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];

  function fishSVG(color='#FFD97D',scale=1){
    return `<svg viewBox="0 0 10 6" width="${48*scale}" height="${29*scale}" aria-hidden="true"><rect x="1" y="2" width="5" height="2" fill="${color}"/><rect x="0" y="1" width="1" height="1" fill="${color}"/><rect x="0" y="4" width="1" height="1" fill="${color}"/><rect x="6" y="1" width="1" height="1" fill="${color}"/><rect x="6" y="4" width="1" height="1" fill="${color}"/><rect x="7" y="2" width="2" height="2" fill="${color}"/><rect x="2" y="2" width="1" height="1" fill="#062038"/></svg>`;
  }

  (function(){
    const screen=$('#loadingScreen'),track=$('#loadingTrack'),bar=$('#loadingBarFill'),fish=$('#loadingProgressFish'),whale=$('#loadingWhale'),label=$('#loadingLabel'),decor=$('#loadingDecor');
    if(!screen||!track||!bar||!fish||!whale||!label||!decor)return;
    const symbols=['√','i','+','−','×','=','π','z','∞'];
    const positions=[[7,18],[14,70],[27,9],[67,14],[82,23],[91,56],[77,78],[12,49],[58,86]];
    symbols.forEach((text,i)=>{const el=document.createElement('div');el.className='loading-symbol';el.textContent=text;el.style.left=positions[i][0]+'%';el.style.top=positions[i][1]+'%';el.style.fontSize=(11+(i%3)*3)+'px';el.style.animationDelay=(i*.35)+'s';decor.appendChild(el)});
    const loadingFishColors=['#FF9AA2','#FFD97D','#7FE3D0'];
    for(let i=0;i<3;i++){
      const lf=document.createElement('div');
      lf.className='loading-fish';
      lf.innerHTML=fishSVG(loadingFishColors[i%loadingFishColors.length],.55);
      lf.style.top=(18+i*26+Math.random()*8)+'%';
      lf.style.left=(10+Math.random()*70)+'%';
      lf.style.animationDuration=(8+Math.random()*5)+'s';
      lf.style.animationDelay=(Math.random()*-6)+'s';
      lf.style.opacity='.5';
      decor.appendChild(lf);
    }
    function syncFish(percent){const max=Math.max(0,track.clientWidth-fish.offsetWidth);fish.style.left=(Math.max(0,Math.min(100,percent))/100*max)+'px'}
    function addBubble(count=2){const wr=whale.getBoundingClientRect(),sr=screen.getBoundingClientRect();for(let i=0;i<count;i++){const b=document.createElement('img');b.className='loading-bubble';b.src='bubble.png';b.alt='';const size=9+Math.random()*12;b.style.width=size+'px';b.style.height=size+'px';b.style.left=(wr.left-sr.left+wr.width*(.52+Math.random()*.22))+'px';b.style.top=(wr.top-sr.top+wr.height*(.02+Math.random()*.18))+'px';b.style.setProperty('--bubble-drift',(Math.random()*70-35)+'px');b.style.setProperty('--bubble-rise',-(75+Math.random()*90)+'px');b.style.setProperty('--bubble-duration',(1.7+Math.random()*1.1)+'s');decor.appendChild(b);setTimeout(()=>b.remove(),3200)}}
    let percent=0;const started=performance.now(),duration=3000;const bubbleTimer=setInterval(()=>addBubble(Math.random()>.4?2:3),600);
    function frame(now){const q=Math.min(1,(now-started)/duration),eased=1-Math.pow(1-q,3);percent=eased*100;bar.style.width=percent+'%';label.textContent='LOADING... '+Math.floor(percent)+'%';syncFish(percent);if(q<1){requestAnimationFrame(frame);return}clearInterval(bubbleTimer);addBubble(4);bar.style.width='100%';syncFish(100);label.textContent='COMPLETE';setTimeout(()=>{screen.classList.add('loading-done');setTimeout(()=>screen.style.display='none',600)},450)}
    syncFish(0);requestAnimationFrame(frame);window.addEventListener('resize',()=>syncFish(percent));
  })();

  (function(){
    const btn=$('#hamburgerBtn'),menu=$('#navMenu');
    function close(){menu?.classList.remove('open');btn?.classList.remove('open');btn?.setAttribute('aria-expanded','false')}
    function open(){menu?.classList.add('open');btn?.classList.add('open');btn?.setAttribute('aria-expanded','true')}
    function go(id){const target=document.getElementById(id);if(target)window.scrollTo({top:target.offsetTop,behavior:'smooth'});close()}
    btn?.addEventListener('click',()=>menu?.classList.contains('open')?close():open());
    $$('.nav-item').forEach(item=>item.addEventListener('click',e=>{e.preventDefault();go(item.dataset.target)}));
    $('#exploreBtn')?.addEventListener('click',()=>go('about'));
  })();

  (function(){
    const ocean=$('#ambientOcean');if(!ocean)return;
    const pageRoot=$('#pages');
    function sizeOcean(){
      const height=pageRoot?.scrollHeight||document.documentElement.scrollHeight||document.body.scrollHeight;
      ocean.style.height=height+'px';
    }
    sizeOcean();
    window.addEventListener('resize',sizeOcean);
    window.addEventListener('load',sizeOcean);
    if(window.ResizeObserver&&pageRoot)new ResizeObserver(sizeOcean).observe(pageRoot);

    for(let i=0;i<26;i++){
      const b=document.createElement('div');
      b.className='amb-bubble';
      const size=5+Math.random()*10;
      b.style.width=b.style.height=size+'px';
      b.style.left=Math.random()*100+'%';
      b.style.bottom=(-30+Math.random()*20)+'px';
      b.style.setProperty('--drift',(Math.random()*44-22)+'px');
      b.style.animationDuration=(10+Math.random()*10)+'s';
      b.style.animationDelay=(Math.random()*10)+'s';
      ocean.appendChild(b);
    }

    const colors=['#FF9AA2','#FFD97D','#7FE3D0','#F4FBFB'];
    for(let i=0;i<42;i++){
      const f=document.createElement('div');
      f.className='amb-fish '+(i%2===0?'fish-left':'fish-right');
      f.innerHTML=fishSVG(colors[i%colors.length],.45+Math.random()*.16);
      f.style.top=(2+(i*2.3)+Math.random()*2)+'%';
      f.style.width=(24+Math.random()*14)+'px';
      f.style.height='auto';
      f.style.animationDuration=(16+Math.random()*14)+'s';
      f.style.animationDelay=(Math.random()*-24)+'s';
      f.style.opacity=(.5+Math.random()*.25).toFixed(2);
      ocean.appendChild(f);
    }

    for(let i=0;i<14;i++){
      const j=document.createElement('div');
      j.className='amb-jelly';
      j.innerHTML='<img src="ubur-ubur.png" alt="">';
      const size=32+Math.random()*40;
      j.style.width=size+'px';
      j.style.left=(4+Math.random()*90)+'%';
      j.style.top=(3+(i*(94/14))+Math.random()*4)+'%';
      j.style.setProperty('--jelly-drift',(10+Math.random()*24)+'px');
      j.style.animationDuration=(9+Math.random()*9)+'s';
      j.style.animationDelay=(Math.random()*-16)+'s';
      ocean.appendChild(j);
    }

    sizeOcean();
  })();

  function simplify(n){let r=Math.abs(Math.trunc(n)),f=1;for(let i=2;i*i<=r;i++)while(r%(i*i)===0){r/=i*i;f*=i}return{factor:f,remainder:r}}
  function split(raw){let s=raw.replace(/\s+/g,'').replace(/−/g,'-');if(!s)return[];if(!'+-'.includes(s[0]))s='+'+s;const out=[];let buf='';for(const c of s){if('+-'.includes(c)&&buf&&!buf.endsWith('√')){out.push(buf);buf=c}else buf+=c}if(buf)out.push(buf);return out}
  const termRe=/^([+-])(\d*)(?:√(-)?(\d+))?(i)?$/u;
  function parseTerm(x){const m=termRe.exec(x);if(!m)return null;const sign=m[1]==='-'?-1:1,coef=m[2]?+m[2]:1,negativeRad=m[3]==='-',rad=m[4]?+m[4]:null,hasI=!!m[5];if(rad===null&&!m[2]&&!hasI)return null;if(rad!==null){const q=simplify(rad),value=sign*coef*q.factor;if(q.remainder===1)return{imag:negativeRad||hasI,const:1,value};return{imag:negativeRad||hasI,const:0,coef:value,rad:q.remainder}}return{imag:hasI,const:1,value:sign*coef}}
  function aggregate(items){let constant=0;const radicals=new Map();for(const x of items){if(x.const)constant+=x.value;else radicals.set(x.rad,(radicals.get(x.rad)||0)+x.coef)}for(const [k,v] of radicals)if(v===0)radicals.delete(k);return{constant,radicals}}
  function render(m){const parts=[];if(m.constant)parts.push({value:m.constant,rad:null});[...m.radicals.keys()].sort((a,b)=>a-b).forEach(rad=>{const value=m.radicals.get(rad);if(value)parts.push({value,rad})});if(!parts.length)return'0';return parts.map((p,i)=>{const abs=Math.abs(p.value),core=p.rad===null?String(abs):(abs===1?'√'+p.rad:abs+'√'+p.rad);return i===0?(p.value<0?'-':'')+core:(p.value<0?' - ':' + ')+core}).join('')}
  function zero(m){if(m.constant)return false;for(const v of m.radicals.values())if(v)return false;return true}
  function analyze(raw){const terms=split(raw);if(!terms.length)throw Error('Input kosong. Coba tulis sesuatu, misalnya 3+4i');const real=[],imaginary=[];for(const x of terms){const q=parseTerm(x);if(!q)throw Error('Bagian "'+x+'" tidak dikenali. Contoh: 3+4i, √-16, 2√3, √12+√-18');(q.imag?imaginary:real).push(q)}const R=aggregate(real),I=aggregate(imaginary),a=render(R),b=render(I),az=zero(R),bz=zero(I);const jenis=az&&bz?'ZERO':bz?'REAL':az?'IMAGINARY':'COMPLEX';const imaginaryPart=b==='1'?'':b==='-1'?'-':b;let z='0';if(jenis==='REAL')z=a;else if(jenis==='IMAGINARY')z=imaginaryPart==='-'?'-i':(imaginaryPart||'')+'i';else if(jenis==='COMPLEX')z=imaginaryPart.startsWith('-')?a+' - '+imaginaryPart.slice(1)+'i':a+' + '+imaginaryPart+'i';return{z,a,b,jenis}}
  (function(){const input=$('#complexInput'),button=$('#analyzeBtn'),result=$('#resultBox'),error=$('#errorBox');if(!input||!button)return;function run(){result.style.display='none';error.style.display='none';try{const x=analyze(input.value.trim());$('#outZ').textContent='z = '+x.z;$('#outA').textContent=x.a;$('#outB').textContent=x.b;$('#outJenis').textContent=x.jenis;$('#outJenis').className='jenis-badge jenis-'+x.jenis.toLowerCase();result.style.display='block'}catch(ex){error.textContent=ex.message;error.style.display='block'}}button.addEventListener('click',run);input.addEventListener('keydown',e=>{if(e.key==='Enter')run()});$$('.example-chip').forEach(chip=>chip.addEventListener('click',()=>{input.value=chip.dataset.example;run();input.focus()}))})();
  (function(){const area=$('#gameArea'),fish=$('#gameFish'),items=$('#gameItems'),start=$('#startGame'),score=$('#gameScore'),level=$('#gameLevel'),message=$('#gameMessage'),hint=$('#gameHint');if(!area||!fish||!items||!start)return;const g={running:false,score:0,level:1,x:.15,y:.5,pointerId:null,items:[],raf:0};
    const fishStages=[{src:'ikankanan1.png',size:42},{src:'ikankanan2.png',size:54},{src:'ikankanan3.png',size:66},{src:'ikankanan4.png',size:80},{src:'ikankanan5.png',size:96},{src:'pauslockscreen.png',size:150}];
    function draw(){const idx=Math.min(g.level-1,fishStages.length-1),stage=fishStages[idx];fish.innerHTML='<img src="'+stage.src+'" alt="" style="width:100%;height:100%;object-fit:contain;display:block">';fish.style.width=stage.size+'px';fish.style.height=stage.size+'px';fish.style.left=g.x*100+'%';fish.style.top=g.y*100+'%'}function spawn(){if(!g.running||g.items.length>=8)return;const el=document.createElement('div');el.className='math-item';el.textContent=['+','√','i','2','3','='][Math.floor(Math.random()*6)];el.style.left=(9+Math.random()*82)+'%';el.style.top=(14+Math.random()*72)+'%';items.appendChild(el);g.items.push(el)}function hit(a,b){return!(a.right<b.left||a.left>b.right||a.bottom<b.top||a.top>b.bottom)}function tick(){if(!g.running)return;const rect=fish.getBoundingClientRect();for(let i=g.items.length-1;i>=0;i--){const el=g.items[i];if(hit(rect,el.getBoundingClientRect())){el.remove();g.items.splice(i,1);g.score++;g.level=Math.floor(g.score/5)+1;draw();score.textContent=g.score;level.textContent=g.level;message.textContent=g.level>=6?'PAUS MODE! Kamu sudah jadi raksasa laut.':'Kumpulkan '+g.level*5+' item untuk naik level.'}}g.raf=requestAnimationFrame(tick)}function reset(){g.running=true;g.score=0;g.level=1;g.x=.15;g.y=.5;g.items.forEach(x=>x.remove());g.items=[];score.textContent='0';level.textContent='1';message.textContent='Kumpulkan 5 item untuk naik level.';start.textContent='RESTART GAME';draw();for(let i=0;i<5;i++)spawn();cancelAnimationFrame(g.raf);g.raf=requestAnimationFrame(tick)}function move(x,y){const r=area.getBoundingClientRect();g.x=Math.max(.08,Math.min(.92,(x-r.left)/r.width));g.y=Math.max(.12,Math.min(.88,(y-r.top)/r.height));draw()}start.addEventListener('click',reset);area.addEventListener('pointerdown',e=>{if(!g.running)return;g.pointerId=e.pointerId;area.setPointerCapture(e.pointerId);hint.style.display='none';move(e.clientX,e.clientY)});area.addEventListener('pointermove',e=>{if(e.pointerId===g.pointerId)move(e.clientX,e.clientY)});const end=e=>{if(e.pointerId===g.pointerId)g.pointerId=null};area.addEventListener('pointerup',end);area.addEventListener('pointercancel',end);setInterval(()=>g.running&&spawn(),1100);draw()})();
});
