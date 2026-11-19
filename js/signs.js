/* Pictogramas originais em estilo de sinalização de segurança */
window.SIGNS={
  ext:{bg:'#d7261e',label:'Extintor',svg:'<path fill="#fff" d="M40 22h14v8h-14z"/><path fill="#fff" d="M34 34c0-3 3-5 6-5h14c3 0 6 2 6 5v40c0 3-2 5-5 5H39c-3 0-5-2-5-5z"/><path stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" d="M54 25h12l6 6M40 25c-8 0-14 6-14 16v10"/><circle cx="26" cy="54" r="3" fill="#fff"/>'},
  exit:{bg:'#0b8a4a',label:'Saída',svg:'<path fill="none" stroke="#fff" stroke-width="4" d="M58 16h22v68H58"/><circle cx="38" cy="22" r="7" fill="#fff"/><path fill="#fff" d="M30 32l14 2 10 12-5 4-8-8-4 12 10 8 2 20h-7l-3-16-10-6-6 22h-8l8-28 2-12-7 5v10h-6V43z"/>'},
  aid:{bg:'#0b8a4a',label:'Primeiros socorros',svg:'<path fill="#fff" d="M38 16h24v22h22v24H62v22H38V62H16V38h22z"/>'},
  helmet:{bg:'#1659a8',round:1,label:'Uso de capacete',svg:'<path fill="#fff" d="M20 62c0-18 13-32 30-32s30 14 30 32z"/><path fill="#1659a8" d="M46 30h8v18h-8z"/><rect x="14" y="62" width="72" height="8" rx="3" fill="#fff"/>'},
  warn:{bg:'#ffc427',tri:1,label:'Perigo',svg:'<path fill="#111" d="M45 36h10l-2 26h-6z"/><circle cx="50" cy="70" r="5" fill="#111"/>'},
  meet:{bg:'#0b8a4a',label:'Ponto de encontro',svg:'<g fill="#fff"><circle cx="34" cy="40" r="5"/><circle cx="50" cy="36" r="5"/><circle cx="66" cy="40" r="5"/><path d="M28 48h12v16h-12zM44 44h12v20H44zM60 48h12v16H60z"/><path d="M14 18l12 3-3 3 8 8-3 3-8-8-3 3zM86 18l-3 12-3-3-8 8-3-3 8-8-3-3zM14 82l3-12 3 3 8-8 3 3-8 8 3 3zM86 82l-12-3 3-3-8-8 3-3 8 8 3-3z"/></g>'}
};
window.signSVG=function(k){
  const s=SIGNS[k];
  if(s.tri)return `<svg viewBox="0 0 100 100" role="img" aria-label="${s.label}"><path d="M50 8L94 88H6z" fill="${s.bg}" stroke="#111" stroke-width="6" stroke-linejoin="round"/>${s.svg}</svg>`;
  if(s.round)return `<svg viewBox="0 0 100 100" role="img" aria-label="${s.label}"><circle cx="50" cy="50" r="46" fill="${s.bg}"/>${s.svg}</svg>`;
  return `<svg viewBox="0 0 100 100" role="img" aria-label="${s.label}"><rect x="2" y="2" width="96" height="96" rx="6" fill="${s.bg}"/>${s.svg}</svg>`;
};
