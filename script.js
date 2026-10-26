const button=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
const panels=[...document.querySelectorAll('[data-panel]')];
const internalLinks=[...document.querySelectorAll('a[href^="#"]')];

function showPanel(id,updateHash=true){
  const target=panels.find(panel=>panel.id===id)||document.querySelector('#accueil');
  panels.forEach(panel=>panel.classList.toggle('active',panel===target));
  nav?.querySelectorAll('a').forEach(link=>link.classList.toggle('current',link.getAttribute('href')===`#${target.id}`));
  nav?.classList.remove('open');
  button?.setAttribute('aria-expanded','false');
  if(updateHash&&location.hash!==`#${target.id}`) history.pushState(null,'',`#${target.id}`);
  window.scrollTo({top:0,behavior:'instant'});
}

button?.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
internalLinks.forEach(link=>link.addEventListener('click',event=>{const id=link.getAttribute('href')?.slice(1);if(id&&document.getElementById(id)){event.preventDefault();showPanel(id);}}));
window.addEventListener('popstate',()=>showPanel(location.hash.slice(1)||'accueil',false));
showPanel(location.hash.slice(1)||'accueil',false);
