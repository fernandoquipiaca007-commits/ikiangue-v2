/* V2 — interface */
(function(){
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  $('#yr').textContent=new Date().getFullYear();
  addEventListener('scroll',()=>$('#nav').classList.toggle('sh',scrollY>10),{passive:true});

  /* painel de sinais */
  const keys=['ext','exit','aid','helmet','warn','meet'];
  const back=['Revisão de extintores','Planos de evacuação','Resposta imediata','EPI obrigatório','Identificação de riscos','Simulações'];
  $('#board').innerHTML=keys.map((k,i)=>`<div class="sign" style="animation-delay:${.15+i*.09}s" tabindex="0" role="button" aria-label="${back[i]}"><div class="face">${signSVG(k)}</div><div class="face back">${back[i]}</div></div>`).join('');
  const signs=$$('.sign');
  signs.forEach(s=>{s.addEventListener('animationend',()=>{s.style.animation='none';s.style.opacity=1},{once:true});const t=()=>s.classList.toggle('flip');s.addEventListener('click',t);s.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})});
  let si=0;setInterval(()=>{if(document.hidden)return;const s=signs[si%6];s.classList.add('flip');setTimeout(()=>s.classList.remove('flip'),1900);si+=1},2300);

  /* ticker */
  const tk=['Identificação de riscos','Avaliação de riscos','Prevenção','Formações práticas','Pictogramas','Revisão de extintores','Monitorização HSST','Relatórios técnicos'];
  const row='<span>'+tk.join('</span><span>')+'</span>';$('#tk').innerHTML=row+row;

  /* classes de fogo */
  const CL=[
    {k:'A',c:'#2e7d32',t:'Sólidos',d:'Madeira, papel, tecido, cartão e plásticos — materiais que deixam resíduos. O pó ABC abafa a chama e isola a superfície.',ok:['Pó ABC','Água','Espuma'],no:[],img:'instrutora-fogo'},
    {k:'B',c:'#c62828',t:'Líquidos',d:'Combustíveis, óleos, tintas e solventes. Nunca usar água: espalha o líquido em chamas. Pó ABC, espuma ou CO₂.',ok:['Pó ABC','Espuma','CO₂'],no:['Água'],img:'spray-fogo'},
    {k:'C',c:'#1565c0',t:'Gases',d:'Gás butano, propano e outros gases inflamáveis. Primeiro cortar a alimentação de gás, depois extinguir com pó.',ok:['Pó ABC','Cortar o gás'],no:['Água'],img:'spray-man'},
    {k:'⚡',c:'#111',t:'Elétrico',d:'Quadros e equipamentos sob tensão. Desligar a corrente sempre que possível; usar CO₂ ou pó, nunca água.',ok:['CO₂','Pó ABC'],no:['Água','Espuma'],img:'extintor-parede'}
  ];
  const tabs=$('#clsTabs'),body=$('#clsBody');
  tabs.innerHTML=CL.map((c,i)=>`<button role="tab" aria-selected="${i===0}" data-i="${i}"><i style="background:${c.c}">${c.k}</i>${c.t}</button>`).join('');
  function showCl(i){const c=CL[i];$$('#clsTabs button').forEach((b,j)=>b.setAttribute('aria-selected',j===i));
    body.innerHTML=`<div class="cb-txt cb-anim"><div class="big" style="color:${c.c}">${c.k}</div><h3>Classe ${c.k==='⚡'?'elétrica':c.k} · ${c.t}</h3><p>${c.d}</p><div class="agents">${c.ok.map(a=>`<span class="y">✓ ${a}</span>`).join('')}${c.no.map(a=>`<span class="n">${a}</span>`).join('')}</div></div><div class="cb-img"><img src="img/${c.img}-sm.webp" alt="Formações práticas IKIANGUE" loading="lazy"></div>`}
  tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(b)showCl(+b.dataset.i)});showCl(0);

  /* serviços */
  const SV=[
    ['warn','Identificação de Riscos','Mapeamos e classificamos os perigos existentes, desenvolvendo planos de mitigação eficazes.'],
    ['warn','Avaliação de Riscos','Analisamos probabilidades e impactos, fornecendo dados para decisões estratégicas e preventivas.'],
    ['helmet','Prevenção de Riscos','Implementamos medidas que reduzem a exposição a acidentes e incidentes operacionais.'],
    ['meet','Formações e Sensibilizações','Capacitamos equipas e líderes para fortalecer a cultura de segurança dentro da organização.'],
    ['exit','Procedimentos e Pictogramas','Criamos sistemas de comunicação visual e procedimentos padronizados que garantem clareza e conformidade.'],
    ['ext','Revisão de Extintores e Equipamentos de Emergência','Asseguramos a manutenção e funcionalidade dos meios de combate a incêndios e resposta imediata.'],
    ['aid','Estatísticas e Monitorização de HSST','Acompanhamos indicadores e relatórios de desempenho em segurança, apoiando melhorias contínuas.'],
    ['aid','Documentação e Relatórios Técnicos','Produzimos documentação técnica completa, transparente e alinhada às normas legais vigentes.']
  ];
  $('#svcList').innerHTML=SV.map((s,i)=>`<div class="row rv"><button aria-expanded="false"><span class="n">${String(i+1).padStart(2,'0')}</span><span class="ic">${signSVG(s[0])}</span><h3>${s[1]}</h3><span class="pl"></span></button><div class="ans"><div><p>${s[2]}</p></div></div></div>`).join('');
  $$('.row').forEach((r,i)=>{if(i===0)r.classList.add('open');r.querySelector('button').addEventListener('click',()=>{const o=r.classList.toggle('open');r.querySelector('button').setAttribute('aria-expanded',o)})});

  /* galeria + lightbox */
  const G=[['grupo-campo','Exercício prático de combate a incêndio'],['spray-woman','Técnica de extinção com pó ABC'],['inspecao','Instalação de extintor sinalizado'],['turma-ampla','Turma de formação profissional'],['instrutora-fogo','Instrução com foco real'],['spray-arbusto','Extinção em campo aberto'],['grupo-pneu','Equipa após a simulação'],['ferramentas-equipa','Preparação do equipamento'],['formandas-rua','Formandos em ação de campo'],['extintor-parede','Extintor de pó ABC conforme'],['grupo-amarelo','Turma no exercício prático'],['instalacao','Fixação de equipamentos de emergência'],['reuniao','Sensibilização em HSST'],['spray-man','Ataque à base das chamas']];
  $('#masonry').innerHTML=G.map((g,i)=>`<figure class="rv" data-i="${i}"><img src="img/${g[0]}-sm.webp" alt="${g[1]}" loading="lazy"><figcaption>${g[1]}</figcaption></figure>`).join('');
  const lb=$('#lb'),li=$('#lbImg'),lc=$('#lbCap');let cur=0;
  const open=i=>{cur=(i+G.length)%G.length;li.src=`img/${G[cur][0]}.webp`;li.alt=G[cur][1];lc.textContent=G[cur][1];lb.hidden=false;document.body.style.overflow='hidden'};
  const close=()=>{lb.hidden=true;document.body.style.overflow=''};
  $('#masonry').addEventListener('click',e=>{const f=e.target.closest('figure');if(f)open(+f.dataset.i)});
  $('#lbX').onclick=close;$('#lbP').onclick=()=>open(cur-1);$('#lbN').onclick=()=>open(cur+1);
  lb.addEventListener('click',e=>{if(e.target===lb)close()});
  addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')open(cur-1);if(e.key==='ArrowRight')open(cur+1)});
  let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)open(cur+(d<0?1:-1))});

  $('#exitIco').innerHTML=signSVG('exit');
  /* citação: acende palavra a palavra com o scroll */
  const qt=$('#quoteTxt');
  qt.innerHTML=qt.innerHTML.split(/(<mark>.*?<\/mark>)/).map(seg=>seg.startsWith('<mark>')?'<mark>'+seg.slice(6,-7).split(' ').map(w=>`<span class="w">${w}</span>`).join(' ')+'</mark>':seg.split(' ').map(w=>w?`<span class="w">${w}</span>`:'').join(' ')).join(' ');
  const qw=[...qt.querySelectorAll('.w')],qm=qt.querySelector('mark');
  const qLit=()=>{const r=qt.getBoundingClientRect(),p=(innerHeight*.85-r.top)/(r.height+innerHeight*.3),n=Math.round(Math.max(0,Math.min(1,p))*qw.length);qw.forEach((w,i)=>w.classList.toggle('l',i<n));qm.classList.toggle('on',n>=qw.indexOf(qm.lastElementChild)+1)};
  addEventListener('scroll',qLit,{passive:true});qLit();


  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  $$('.rv,.sec-top,.about .col-r,.exit-sign').forEach(el=>{el.classList.add('rv');io.observe(el)});
  const hp=$('.hero-photo img');addEventListener('scroll',()=>{const r=hp.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)hp.style.transform=`scale(1.08) translateY(${(r.top-innerHeight/2)*-.05}px)`},{passive:true});
})();
