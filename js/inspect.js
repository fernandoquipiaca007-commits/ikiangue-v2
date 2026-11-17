/* V2 — inspeção interativa do extintor */
(function(){
  const C=[
    ['Manómetro','Ponteiro na zona verde: pressão correta para descarga imediata.'],
    ['Selo e cavilha','Selo intacto e cavilha no lugar — o extintor nunca foi acionado.'],
    ['Mangueira e difusor','Sem fissuras, obstruções ou ressequimento do material.'],
    ['Rótulo e validade','Instruções legíveis, classes A·B·C e data da próxima revisão.'],
    ['Fixação e sinalização','Suporte firme, altura acessível e sinal fotoluminescente visível.']
  ];
  const list=document.getElementById('checks'),hots=[...document.querySelectorAll('.hot')],note=document.getElementById('insNote'),run=document.getElementById('runIns');
  const needle=document.getElementById('needle'),stamp=document.getElementById('stamp'),date=document.getElementById('dateTxt'),seal=document.getElementById('seal');
  list.innerHTML=C.map((c,i)=>`<li data-k="${i}"><span class="bx">${i+1}</span><h3>${c[0]}</h3><p>${c[1]}</p></li>`).join('');
  const items=[...list.children],done=new Set();let busy=false;
  const fx=[
    ()=>{needle.style.transform='rotate(4deg)'},
    ()=>{seal.setAttribute('stroke','#0b8a4a');seal.animate([{opacity:0},{opacity:1},{opacity:.3},{opacity:1}],{duration:700})},
    ()=>{document.getElementById('hose').animate([{strokeDasharray:'0 600'},{strokeDasharray:'600 0'}],{duration:900,easing:'ease-out'})},
    ()=>{const d=new Date();d.setFullYear(d.getFullYear()+1);date.textContent='PRÓX. REVISÃO: '+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear()},
    ()=>{document.getElementById('extSvg').animate([{transform:'translateY(0)'},{transform:'translateY(-6px)'},{transform:'translateY(0)'}],{duration:500,easing:'ease-out'})}
  ];
  function check(k){
    items.forEach((li,i)=>li.classList.toggle('cur',i===k));hots.forEach((h,i)=>h.classList.toggle('cur',i===k));
    fx[k]();setTimeout(()=>{done.add(k);items[k].classList.add('ok');items[k].querySelector('.bx').textContent='✓';hots[k].classList.add('ok');hots[k].textContent='✓';finish()},650);
  }
  function finish(){
    note.textContent=`${done.size}/5 pontos verificados`;
    if(done.size===5){stamp.classList.add('on');note.textContent='✓ Extintor aprovado — operacional e conforme';note.classList.add('pass');run.textContent='↺ Repetir inspeção';items.forEach(li=>li.classList.remove('cur'))}
  }
  function reset(){done.clear();stamp.classList.remove('on');needle.style.transform='rotate(-70deg)';seal.setAttribute('stroke','#16a34a');date.textContent='PRÓX. REVISÃO: —';note.classList.remove('pass');
    items.forEach((li,i)=>{li.className='';li.querySelector('.bx').textContent=i+1});hots.forEach((h,i)=>{h.className='hot';h.textContent=i+1})}
  hots.forEach((h,i)=>h.addEventListener('click',()=>{if(!busy&&!done.has(i))check(i)}));
  items.forEach((li,i)=>li.addEventListener('click',()=>{if(!busy&&!done.has(i))check(i)}));
  run.addEventListener('click',async()=>{
    if(busy)return;if(done.size===5)reset();busy=true;run.disabled=true;
    for(let k=0;k<5;k++){if(!done.has(k)){check(k);await new Promise(r=>setTimeout(r,1150))}}
    busy=false;run.disabled=false;
  });
})();
