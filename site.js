const button=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
button?.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');button?.setAttribute('aria-expanded','false');}));

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets=[...document.querySelectorAll('main > section:not(:first-child),.door,.project-tile,.path-card,.project-entry,.ledger-row,.chapter-grid article')];
if(!reduceMotion&&'IntersectionObserver' in window){
  revealTargets.forEach(element=>element.classList.add('reveal'));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.12});
  revealTargets.forEach(element=>observer.observe(element));
}

const progress=document.createElement('div');
progress.className='reading-progress';
progress.setAttribute('aria-hidden','true');
document.body.append(progress);
const updateProgress=()=>{const total=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${total>0?Math.min(100,scrollY/total*100):0}%`;};
addEventListener('scroll',updateProgress,{passive:true});
updateProgress();

// Un seul outil développé à la fois : plus lisible, surtout sur téléphone.
document.querySelectorAll('.tool-panel').forEach(panel=>panel.addEventListener('toggle',()=>{
  if(!panel.open)return;
  document.querySelectorAll('.tool-panel[open]').forEach(other=>{if(other!==panel)other.open=false;});
}));

