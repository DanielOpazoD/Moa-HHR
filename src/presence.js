import { frameAt, validateScene } from './player.js';
import { choosePresence, quietDelay } from './presence-schedule.js';
const $ = id => document.getElementById(id);
const canvas = $('canvas'), ctx = canvas.getContext('2d'), stage = $('stage');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const cache = new Map();
let scenes = [], selected = 0, current = null, currentImage = null;
let auto = false, paused = false, raf = 0, timer = 0, ticket = 0, elapsed = 0, previousTime = null, running = false;
let phase = 'rest', previous = 1;
function canMove() { return !paused && !document.hidden && !reduced.matches; }
function cancel() { ticket++; cancelAnimationFrame(raf); clearTimeout(timer); raf=0;timer=0;running=false;previousTime=null; }
function paint(frame=0) {
  if (!currentImage || !current) return;
  ctx.clearRect(0,0,576,336);ctx.drawImage(currentImage,frame*576,0,576,336,0,0,576,336);
  stage.dataset.frame=String(frame);stage.dataset.scene=current.id;
  $('frame').value=String(frame);$('frame-number').textContent=`${frame+1} / ${current.frames}`;
  stage.setAttribute('aria-label',`Moa: ${current.title}`);
}
async function imageFor(scene) {
  if (cache.has(scene.id)) { const image=cache.get(scene.id);cache.delete(scene.id);cache.set(scene.id,image);return image; }
  const image=new Image();image.src=scene.src;await image.decode();
  if (image.naturalWidth!==576*scene.frames || image.naturalHeight!==336) throw Error('Invalid atlas geometry');
  cache.set(scene.id,image);while(cache.size>3)cache.delete(cache.keys().next().value);return image;
}
function updateButtons() {
  $('companion').setAttribute('aria-pressed',String(auto));
  $('companion').textContent=auto?'Detener compañía':'Activar compañía';
  $('pause').textContent=paused?'Continuar':'Pausar';
}
function schedule() {
  phase='waiting';clearTimeout(timer);
  if(auto && canMove())timer=setTimeout(()=>{
    const number=choosePresence(previous);previous=number;void play(scenes[number-1]);
  },quietDelay());
}
function tick(now) {
  raf=0;if(!running || !canMove())return;
  if(previousTime!==null)elapsed+=now-previousTime;previousTime=now;
  const total=validateScene(current);
  if(elapsed>=total){running=false;paint(0);$('status').textContent=auto?'Acompañando en silencio':'Gesto terminado';schedule();return;}
  paint(frameAt(current.durations,elapsed));raf=requestAnimationFrame(tick);
}
async function play(scene,still=false) {
  cancel();const token=ticket;phase='loading';$('status').textContent='Cargando gesto…';
  try {
    const image=await imageFor(scene);if(token!==ticket)return;
    current=scene;currentImage=image;elapsed=0;paint(0);
    if(still || reduced.matches){if(reduced.matches){auto=false;updateButtons();}phase='rest';$('status').textContent=reduced.matches?'Movimiento reducido: pose quieta':scene.title;return;}
    phase='playing';running=true;$('status').textContent=scene.title;
    if(canMove())raf=requestAnimationFrame(tick);
  } catch {
    if(token!==ticket)return;
    auto=false;phase='error';updateButtons();$('status').textContent='No se pudo cargar. Se conserva la última imagen; puedes reintentar.';
  }
}
function stopAuto(){auto=false;updateButtons();}
function syncMotion() {
  cancelAnimationFrame(raf);raf=0;clearTimeout(timer);timer=0;previousTime=null;
  if(reduced.matches){cancel();auto=false;paint(0);phase='rest';$('status').textContent='Movimiento reducido: pose quieta';updateButtons();return;}
  if(!canMove())return;
  if(running)raf=requestAnimationFrame(tick);else if(auto && phase==='waiting')schedule();
}
$('play').onclick=()=>{stopAuto();paused=false;updateButtons();void play(scenes[selected]);};
$('companion').onclick=()=>{if(auto){stopAuto();cancel();paint(0);$('status').textContent='Compañía detenida';}else{auto=true;paused=false;previous=10;updateButtons();void play(scenes[9]);}};
$('pause').onclick=()=>{paused=!paused;updateButtons();syncMotion();};
$('background').onchange=e=>stage.dataset.background=e.target.value;
$('size').onchange=e=>stage.dataset.size=e.target.value;
$('frame').oninput=e=>{stopAuto();cancel();phase='inspection';paint(Number(e.target.value));$('status').textContent='Inspección cuadro a cuadro';};
document.addEventListener('visibilitychange',syncMotion);reduced.addEventListener('change',syncMotion);
window.addEventListener('pagehide',()=>{stopAuto();cancel();cache.clear();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){stopAuto();cancel();paint(0);$('status').textContent='Reproducción detenida';$('play').focus();}});
async function init(){
  try{
    if(window.MOA_PRESENCE)scenes=window.MOA_PRESENCE;
    else {const response=await fetch('presence.json');if(!response.ok)throw Error();scenes=await response.json();}
    if(scenes.length!==10)throw Error('Expected ten scenes');scenes.forEach(validateScene);
    for(const [i,scene] of scenes.entries()){
      const button=document.createElement('button');button.type='button';button.setAttribute('aria-pressed',String(i===0));
      const number=document.createElement('span');number.className='number';number.textContent=String(i+1).padStart(2,'0');
      const title=document.createElement('span');title.textContent=scene.title;button.append(number,title);
      button.onclick=()=>{selected=i;stopAuto();cancel();for(const b of $('list').children)b.setAttribute('aria-pressed',String(b===button));void play(scene,true);};
      $('list').append(button);
    }
    for(const id of ['play','companion','pause'])$(id).disabled=false;
    await play(scenes[0],true);
  }catch{$('status').textContent='No se pudo abrir la colección. Vuelve a cargar la página.';}
}
void init();
