import {settings} from './state.js';
export const isTouchDevice=()=>navigator.maxTouchPoints>0&&(matchMedia('(any-pointer: coarse)').matches||innerWidth<=1100);
export function controlText(text){return isTouchDevice()?text.replace(/出現 E 提示後按 E/g,'出現互動提示後輕點畫面').replace(/按\s?E/g,'輕點互動').replace(/E 提示/g,'互動提示').replace(/按 J/g,'點「筆記」').replace(/按 H/g,'點「下一步」'):text;}
// Each finger owns one gesture. Movement goes through World.move and its existing colliders.
export class TouchControls{
 constructor(app){
  this.app=app;this.stick=document.querySelector('#touch-stick');this.look=document.querySelector('#touch-look');this.thumb=document.querySelector('#stick-thumb');this.layer=document.querySelector('#touch-controls');this.rotate=document.querySelector('#rotate-device');this.button=document.querySelector('#touch-interact');this.stickId=null;this.lookId=null;this.target=null;
  this.stick.addEventListener('pointerdown',e=>{if(!this.active()||this.stickId!==null)return;e.preventDefault();this.stickId=e.pointerId;this.stick.setPointerCapture(e.pointerId);this.moveStick(e);});
  this.stick.addEventListener('pointermove',e=>{if(e.pointerId===this.stickId){e.preventDefault();this.moveStick(e);}});
  const endStick=e=>{if(e.pointerId===this.stickId){e.preventDefault();this.clearStick();}};for(const type of ['pointerup','pointercancel','lostpointercapture'])this.stick.addEventListener(type,endStick);
  this.look.addEventListener('pointerdown',e=>{if(!this.active()||this.lookId!==null)return;e.preventDefault();this.lookId=e.pointerId;this.lastX=e.clientX;this.lastY=e.clientY;this.travel=0;this.started=performance.now();this.look.setPointerCapture(e.pointerId);});
  this.look.addEventListener('pointermove',e=>{if(e.pointerId!==this.lookId)return;e.preventDefault();const dx=e.clientX-this.lastX,dy=e.clientY-this.lastY;this.lastX=e.clientX;this.lastY=e.clientY;this.travel+=Math.hypot(dx,dy);if(!this.active())return;const w=this.app.world;w.yaw-=dx*.0035*settings.sensitivity;w.pitch=Math.max(-1.396,Math.min(1.396,w.pitch-dy*.0035*settings.sensitivity));});
  this.look.addEventListener('pointerup',e=>{if(e.pointerId!==this.lookId)return;e.preventDefault();const tap=this.travel+Math.hypot(e.clientX-this.lastX,e.clientY-this.lastY)<10&&performance.now()-this.started<400;this.clearLook();if(tap&&this.active())this.app.world.interact();});
  for(const type of ['pointercancel','lostpointercapture'])this.look.addEventListener(type,e=>{if(e.pointerId===this.lookId)this.clearLook();});
  this.button.onclick=()=>{if(this.active())this.app.world.interact();};
  this.refresh=this.refresh.bind(this);window.addEventListener('resize',this.refresh);window.addEventListener('orientationchange',this.refresh);window.addEventListener('blur',()=>this.reset());document.addEventListener('visibilitychange',()=>{if(document.hidden)this.reset();});this.refresh();
 }
 active(){return this.enabled&&!this.portrait&&this.app.playing&&this.app.world?.mode==='explore'&&!this.app.story.active;}
 moveStick(e){if(!this.active()){this.clearStick();return;}const r=this.stick.getBoundingClientRect(),radius=r.width*.31;let x=(e.clientX-r.left-r.width/2)/radius,z=(e.clientY-r.top-r.height/2)/radius;const n=Math.hypot(x,z);if(n>1){x/=n;z/=n;}this.thumb.style.transform=`translate(${x*radius}px,${z*radius}px)`;const length=Math.hypot(x,z);if(length<.12){x=0;z=0;}else{const strength=Math.min(1,(length-.12)/.88);x=x/length*strength;z=z/length*strength;}this.app.world.touchMove={x,z};}
 clearStick(){const id=this.stickId;this.stickId=null;if(id!==null&&this.stick.hasPointerCapture(id))this.stick.releasePointerCapture(id);this.thumb.style.transform='translate(0px,0px)';if(this.app.world)this.app.world.touchMove={x:0,z:0};}
 clearLook(){const id=this.lookId;this.lookId=null;if(id!==null&&this.look.hasPointerCapture(id))this.look.releasePointerCapture(id);}
 reset(){this.clearStick();this.clearLook();}
 modeChanged(){this.reset();this.update();}
 setTarget(target){this.target=target;this.button.disabled=!target||!this.active();}
 update(){this.layer.hidden=!this.active();this.button.disabled=!this.target||!this.active();document.body.classList.toggle('touch-explore',this.active());}
 refresh(){
  this.enabled=isTouchDevice();const portrait=this.enabled&&innerHeight>innerWidth,entering=portrait&&!this.portrait;this.portrait=portrait;document.documentElement.classList.toggle('touch-ui',this.enabled);this.rotate.hidden=!portrait;
  if(entering){this.reset();this.app.world?.pause();if(this.app.playing&&this.app.panels.kind===null)this.app.panels.pause();if(this.app.story.active&&!this.app.story.paused)this.app.story.toggle();this.portraitSurfaces=['#menu','#game','#overlay','#story-film'].map(s=>{const el=document.querySelector(s),was=el.inert;el.inert=true;return [el,was];});this.previousFocus=document.activeElement;this.rotate.focus({preventScroll:true});}
  if(!portrait&&this.portraitSurfaces){this.portraitSurfaces.forEach(([el,was])=>el.inert=was);this.portraitSurfaces=null;this.previousFocus?.isConnected&&this.previousFocus.focus({preventScroll:true});}
  for(const b of document.querySelectorAll('[data-global]')){b.dataset.desktopText??=b.textContent;b.textContent=this.enabled?({help:'下一步',inventory:'物品',journal:'筆記',pause:'暫停'}[b.dataset.global]):b.dataset.desktopText;}
  document.querySelector('#device-controls').textContent=this.enabled?'左側搖桿移動・右側滑動轉頭・輕點畫面互動':'WASD 移動　｜　滑鼠 轉頭　｜　E 互動';this.update();
 }
}
