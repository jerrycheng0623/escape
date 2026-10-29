import {isTouchDevice} from './controls.js';
import {settings} from './state.js';
export const PROLOGUE=[
 {tag:'序幕｜1998年・永安旅館',title:'一間房，兩次來電。',image:'guestroom',motif:'phone',detail:'404',text:'林澄獨自入住404號房。隔天清晨，她打電話到櫃檯。',quote:'「房間裡……還有一個人。」',duration:8500},
 {tag:'失蹤事件｜清晨',title:'門打開後，房間空了。',image:'bathroom',motif:'mirror',detail:'我還在這裡',text:'人員查看時，床鋪整齊，行李已不見。浴室鏡子內側留下了一行字。',quote:'「我還在這裡。」',duration:8500},
 {tag:'監視紀錄｜同一天夜裡',title:'離開的人，真的是她嗎？',image:'surveillance',motif:'record',detail:'404 → 櫃檯',text:'錄影裡，一個像林澄的人早已走出旅館。當晚，404號房卻再次來電，傳來她的聲音。',quote:'「你們剛剛把誰帶走了？」',duration:10000},
 {tag:'封閉之後｜每到凌晨03:17',title:'四樓被封了，電話還會響。',image:'corridor',motif:'clock',detail:'03:17',text:'四樓從一般停靠樓層中消失。往後幾年的住宿紀錄裡，新的名字一次次出現在同一間房。',quote:'「今天退房的人，是誰？」',duration:9500},
 {tag:'現在｜一封沒有署名的郵件',title:'你原本只是來調查失蹤案。',image:'archive',motif:'letter',detail:'收件人：調查者',text:'你獨自追查這個都市傳說。出發前，一封郵件把你引向永安旅館。寄件者的身分無從確認。',quote:'「凌晨三點前抵達。不要相信自稱員工的人。無論發生什麼，不要讓房間裡的人數增加。」',duration:11500},
 {tag:'02:58｜永安旅館・櫃檯',title:'故事從你走進大門開始。',image:'lobby',motif:'arrival',detail:'調查者・1人',text:'旅館沒有接待聲。你只有一個人，帶著那封郵件，走向櫃檯上的住宿登記簿。',quote:'先確認自己的紀錄，再往四樓尋找線索。',duration:9000}
];
export const ENDINGS={
 normal:{title:'尚未結案',image:'guestroom',line:'你走出了旅館，404卻沒有結束。',sections:[
 ['天快亮時','你獨自走過大門。櫃檯接受了「一位」的退房人數，沒有替另一份候補紀錄核定離館資格。監視器裡，離開的確實只有你。'],
 ['留在房間裡的東西','你回頭時，倒影慢了半拍。404號房仍有一個背影：房間建立的異常紀錄沒有被撤銷，鏡中的擬態也仍有繼續等待的場所。你離開了這一輪程序，卻沒有讓程序失效。'],
 ['這次選擇的意義','只讓本人退房，使異常沒有以第二位房客的身分跟出去；但「一人離館」不等於「事件結案」。下一次邀請仍可能開始。']
 ],status:'本人：已離館　／　候補：未核定　／　原始登記：仍有效'},
 bad:{title:'第二位房客',image:'photo-today',line:'門打開時，腳步聲有兩組。',sections:[
 ['退房之後','你確認了「兩位」。櫃檯收下答案，將原本待核定的候補轉為正式房客。另一個輪廓靠近你，跟著走出大門。'],
 ['被你帶出去的是誰','鏡面、照片與監視器中的擬態，一直在等待可被承認的身分。門外的回答只會建立候補；最後這次退房確認，才讓它取得離館資格。它模仿人的樣子，來源卻是404號房。'],
 ['這次選擇的後果','錄影拍到兩個人離開，調查者帶出的不再只是失蹤案的證據。異常已有一份有效的房客身分，可以越過旅館的大門。原始登記仍在，事件也向外延續。']
 ],status:'本人：已離館　／　候補：已核定　／　異常：已擴散'},
 true:{title:'404 NOT FOUND',image:'ending-dawn',line:'天亮後，你才看見旅館原本的樣子。',sections:[
 ['印章落下的那一刻','你沒有替房間補上另一個人的名字。依照內部條款，你把「查無此房」蓋在原始住宿頁，撤銷無效房號及其候補紀錄。櫃檯終於無法再要求你完成退房。'],
 ['房間失去留下你的理由','燈光、房門和接待者的輪廓逐一褪去，眼前只剩廢棄已久的建築。ROOM-404不是另一位住客，而是一直借影像與登記模仿房客的空間。當它失去有效紀錄，這一輪異常便無法繼續。'],
 ['案件留下的空白','你帶著報告與紀錄走入清晨。這次沒有第二個身影跟出來；但過去失蹤者去了哪裡，現有證據仍不足以確認，也不能因此宣稱他們已回來。匿名郵件的寄件者，同樣沒有答案。']
 ],status:'房號：無效　／　原始與候補登記：已撤銷　／　本輪異常：終止'}
};
export function endingFrames(kind){const e=ENDINGS[kind];return e.sections.map(([title,text],i)=>({tag:`事件尾聲｜${i+1} / 3`,title,image:e.image,motif:kind==='true'?'arrival':'record',detail:kind==='true'?'查無此房':'退房已確認',text,quote:i===2?e.line:'',duration:14000}));}
// A separate 2D layer: never changes puzzle flags, save data, or the 3D camera.
export class StoryFilm{
 constructor(app){this.app=app;this.root=document.querySelector('#story-film');this.active=false;}
 play(frames,onFinish,{replay=false}={}){
  this.stop();this.app.pauseWorld();this.active=true;this.frames=frames;this.index=0;this.elapsed=0;this.paused=settings.reduced||matchMedia('(prefers-reduced-motion: reduce)').matches;this.reduced=this.paused;this.onFinish=onFinish;this.replay=replay;
  this.surfaces=['#menu','#game','#overlay'].map(s=>{const el=document.querySelector(s);const was=el.inert;el.inert=true;return [el,was];});
  this.root.hidden=false;this.previousFocus=document.activeElement;this.draw();this.last=performance.now();
  const tick=now=>{if(!this.active)return;const dt=Math.min(100,Math.max(0,now-this.last));this.last=now;if(!this.paused&&!document.hidden){this.elapsed+=dt;if(this.elapsed>=this.frames[this.index].duration){this.advance(1);if(!this.active)return;}}const progress=this.root.querySelector('#film-progress');if(progress)progress.style.width=`${Math.min(100,100*this.elapsed/this.frames[this.index].duration)}%`;this.raf=requestAnimationFrame(tick);};this.raf=requestAnimationFrame(tick);
 }
 draw(){const f=this.frames[this.index];this.root.classList.toggle('reduced',this.reduced);this.root.classList.toggle('film-paused',this.paused);this.root.innerHTML=`<div class="film-art" style="background-image:url('assets/images/${f.image}.jpg')" aria-hidden="true"></div><div class="film-grain" aria-hidden="true"></div><div class="film-top"><span>404號房・${this.replay?'劇情重看':'序幕'}</span><button id="skip-prologue">${this.replay?'結束重看':'略過動畫，開始調查'}</button></div><div class="film-layout"><div class="film-motif motif-${f.motif}" aria-hidden="true"><span>${f.detail}</span><i></i><i></i><i></i></div><article class="film-copy" aria-live="polite"><small>${f.tag}</small><h2>${f.title}</h2><p>${f.text}</p>${f.quote?`<blockquote>${f.quote}</blockquote>`:''}</article></div><footer class="film-controls"><span id="film-position">${String(this.index+1).padStart(2,'0')} / ${String(this.frames.length).padStart(2,'0')}<small>${this.reduced?'減少動態・手動閱讀':isTouchDevice()?'輕點按鈕翻頁／暫停':'空白鍵暫停・方向鍵翻頁'}</small></span><nav aria-label="劇情播放控制"><button id="film-prev" ${this.index===0?'disabled':''}>上一幕</button><button id="film-pause">${this.paused?'自動播放':'暫停閱讀'}</button><button id="film-next" class="solid">${this.index===this.frames.length-1?(this.replay?'閱讀完畢':'走進旅館'):'下一幕 →'}</button></nav></footer><div class="film-track" aria-hidden="true"><i id="film-progress"></i></div>`;
  this.root.querySelector('#skip-prologue').onclick=()=>this.finish();this.root.querySelector('#film-prev').onclick=()=>this.advance(-1);this.root.querySelector('#film-next').onclick=()=>this.advance(1);this.root.querySelector('#film-pause').onclick=()=>this.toggle();this.root.querySelector('#film-next').focus({preventScroll:true});
 }
 toggle(){this.paused=!this.paused;this.root.classList.toggle('film-paused',this.paused);this.root.querySelector('#film-pause').textContent=this.paused?'自動播放':'暫停閱讀';}
 advance(delta){if(this.index+delta>=this.frames.length){this.finish();return;}this.index=Math.max(0,this.index+delta);this.elapsed=0;this.draw();}
 handleKey(e){if(!this.active)return false;if(['Space','Escape','ArrowRight','ArrowLeft'].includes(e.code)){e.preventDefault();if(e.repeat)return true;if(e.code==='Space'||e.code==='Escape')this.toggle();else this.advance(e.code==='ArrowRight'?1:-1);}if(e.code==='Tab'){const nodes=[...this.root.querySelectorAll('button:not(:disabled)')],first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}return true;}
 finish(){const cb=this.onFinish;this.stop();cb?.();}
 stop(){cancelAnimationFrame(this.raf);this.active=false;this.root.hidden=true;this.root.innerHTML='';this.surfaces?.forEach(([el,was])=>el.inert=was);this.surfaces=null;this.previousFocus?.isConnected&&this.previousFocus.focus({preventScroll:true});}
}
