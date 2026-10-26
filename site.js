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

// Le schéma sert de sommaire visuel : aperçu court, puis accès au détail complet.
const ecosystemTools={
  hub:{title:'Hub de campagne',kind:'Outil central · un seul lien',icon:'https://latelierdeguiltanas.github.io/atelier-guiltanas-apps/guiltanas-install/hub-192.png',summary:'Le tableau de bord commun de la campagne. Il réunit deux espaces internes — MJ et PJ — qui partagent les informations utiles à la partie.',points:['Le MJ prépare, révèle et distribue.','Les joueurs consultent leur fiche et répondent.','Messages, objets, monnaie, cartes et PNJ circulent dans le Hub.']},
  combat:{title:'Gestionnaire de combat',kind:'Application autonome · synchronisée',icon:'https://latelierdeguiltanas.github.io/atelier-guiltanas-apps/guiltanas-install/combat-192.png',summary:'Le poste tactique du MJ. Il peut fonctionner seul ou partager les données essentielles du combat avec les fiches du Hub.',points:['Frise d’initiative partagée.','Buffs et debuffs visibles par chaque joueur.','PV et PM maintenus cohérents entre combat et fiches.']},
  sound:{title:'Soundboard',kind:'Application autonome · accès simple',icon:'https://latelierdeguiltanas.github.io/atelier-guiltanas-apps/guiltanas-install/sound-192.png',summary:'La régie sonore de la séance. Le Hub permet de l’ouvrir rapidement, mais aucune donnée de campagne ne lui est transmise.',points:['Scènes et couches sonores personnalisables.','Fonctionne entièrement de manière autonome.','Le lien avec le Hub est un raccourci, pas une synchronisation.']}
};
const toolModal=document.querySelector('#tool-modal');
const modalCard=toolModal?.querySelector('.tool-modal-card');
const modalClose=toolModal?.querySelector('.tool-modal-close');
const modalBackdrop=toolModal?.querySelector('.tool-modal-backdrop');
const modalDetail=toolModal?.querySelector('.tool-modal-detail');
let activeTool='';let previousFocus=null;
const closeToolModal=()=>{if(!toolModal||toolModal.hidden)return;toolModal.hidden=true;document.body.classList.remove('modal-open');previousFocus?.focus();};
const openToolModal=(key,trigger)=>{const data=ecosystemTools[key];if(!toolModal||!data)return;activeTool=key;previousFocus=trigger;toolModal.querySelector('#tool-modal-icon').src=data.icon;toolModal.querySelector('#tool-modal-icon').alt=`Icône ${data.title}`;toolModal.querySelector('#tool-modal-kind').textContent=data.kind;toolModal.querySelector('#tool-modal-title').textContent=data.title;toolModal.querySelector('#tool-modal-summary').textContent=data.summary;toolModal.querySelector('#tool-modal-points').innerHTML=data.points.map(point=>`<li>${point}</li>`).join('');toolModal.hidden=false;document.body.classList.add('modal-open');modalCard?.focus();};
document.querySelectorAll('.ecosystem-trigger').forEach(trigger=>trigger.addEventListener('click',()=>openToolModal(trigger.dataset.tool,trigger)));
modalClose?.addEventListener('click',closeToolModal);modalBackdrop?.addEventListener('click',closeToolModal);
addEventListener('keydown',event=>{if(event.key==='Escape')closeToolModal();});
modalDetail?.addEventListener('click',()=>{const panel=document.querySelector(`[data-tool-details="${activeTool}"]`);closeToolModal();if(!panel)return;panel.open=true;panel.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});});

