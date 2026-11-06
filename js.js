let canvas=document.createElement('canvas');
let canvasB=document.createElement('canvas');
let contextB=canvasB.getContext('2d');

let patternMode=true;
let patt=1;
let patRec=[];
let freRec=[];
if (read_cookie("records") != null && read_cookie("records") != "") freRec=read_cookie("records");
if (read_cookie("recordsP") != null && read_cookie("recordsP") != "") patRec=read_cookie("recordsP");
let key;
let timerGO=null;
let bonus=0;
let timeL=0;
let sc=0,B5;
let time=document.createElement("div");
let pressKey=document.createElement("div");
let score=document.createElement("div");
let err=0;
let timerWent=true;
let cx,cy,CoX,CoY;
let horT,verT,doit=0,n=0;
let OtherTiles=[];
let good=1;
let cXX,cYY;
let horiAr=[];
let vertAr=[];
let context;
let zoomI,wOLD,cXXo,cYYo;
let slider=document.createElement('input');
let div=document.createElement('div');
let zom=document.createElement('div');
let zoomC=getCookie("zoom");
let zoomN=parseInt(zoomC, 10);
let button=document.createElement("BUTTON");
let PaC=getCookie("patt");

canvasB.style.position='absolute';
canvasB.style.zIndex=9;
canvasB.style.pointerEvents='none'; //Make sure you can click 'through' the canvas
document.body.appendChild(canvasB); //Append canvas to body element
let sqsizeD=Math.round(window.innerHeight*0.108);
let sqsize=Math.round(sqsizeD*zoomI/100);
let w=Math.round(sqsize*4);
let x0=Math.round(window.innerWidth/2-w/2);
let x1=w;
let y1=w;
canvasB.width=w;
canvasB.height=w;
canvasB.style.left=x0+"px";
canvasB.style.top=w/4+"px";

div.id="basis";
div.style.display="block";
div.style.position='absolute';
div.style.cursor="hand";
div.style.width=w;
div.style.height=Math.round(w*1.5);
div.style.left=x0+"px";
div.style.top=0+"px";
div.style.backgroundColor='white';
div.style.pointerEvents='none';
document.body.appendChild(div);

zom.id="zom";
zom.style.display="block";
zom.style.cursor="hand";
zom.style.color="white";
zom.style.width="200px";
zom.style.pointerEvents='none';
zom.style.textAlign ="center";
document.body.appendChild(zom);

slider.id="slider";
slider.type='range';
slider.min=50;
slider.max=200;
slider.value=Math.min(200, Math.max(50, Number(zoomN) || 156));
slider.step=1;
document.body.appendChild(slider);

button.innerHTML="Frenzy";
document.body.appendChild(button);
button.id="switch";
button.style.display="block";
button.style.position='absolute';

let patr=document.createElement("a");
document.body.appendChild(patr);
patr.innerHTML='<a id="patr" title="SpiffyCheese" target="_blank" rel="noopener noreferrer" href="https://youtube.com/playlist?list=PL5SlP-XQzZTJHhsorC8pu_gpwg4yXDF4d" style="display: block; position: absolute; top: 95%; left: 20px;">SpiffyCheese</a>'

let recordsB=document.createElement("BUTTON");
recordsB.innerHTML="Records";
document.body.appendChild(recordsB);
recordsB.id="records";
recordsB.style.display="block";
recordsB.style.position='absolute';

let rec=document.createElement("div");
let recSh=1;
if (getCookie("rec")!="") recSh=getCookie("rec");
if (recSh===1) rec.style.display="block";
else rec.style.display="none";

recordsBf();

rec.id="listR";
rec.style.position='absolute';
rec.style.top=35+"px";
rec.style.left=0+"px";
rec.style.zIndex=11;
rec.style.width='200px';
rec.style.pointerEvents='none';
rec.style.color='white';
score.style.color='white';
rec.style.textAlign ="center";
rec.style.fontSize='20px';
recordsB.appendChild(rec);

let Best=document.createElement("div");
Best.id="best";
Best.innerHTML="HI-SCORE<br>";
Best.style.position='absolute';
Best.style.left= "75%";
Best.style.top=sqsize/3.6+"px";
Best.style.zIndex=11;
Best.style.marginTop="0px";
Best.style.pointerEvents='none';
Best.style.color='#0000FF';
Best.style.textAlign ="center";
Best.style.fontSize=Math.round(sqsize/5)+'px';
div.appendChild(Best);

score.id="score";
score.innerHTML="0";
score.style.position='center';
score.style.top=sqsize/4+"px";
score.style.zIndex=11;
score.style.pointerEvents='none';
score.style.color='#00FFFF';
score.style.textAlign ="center";
score.style.fontSize=Math.round(sqsize/1.4)+'px';
div.appendChild(score);

pressKey.id="pressKey";
pressKey.innerHTML="Space to Start";
pressKey.style.position='relative';
pressKey.style.top=w*1.07+"px";
pressKey.style.zIndex=11;
pressKey.style.pointerEvents='none';
pressKey.style.textAlign ="center";
pressKey.style.fontSize=Math.round(sqsize/3)+'px';
div.appendChild(pressKey);

time.id="time";
time.innerHTML="30";
time.style.position='absolute';
time.style.padding=sqsize/8+'px';
time.style.top=0+"px";
time.style.zIndex=11;
time.style.pointerEvents='none';
time.style.color='purple';
time.style.textAlign ="left";
time.style.fontSize=Math.round(sqsize/1.8)+'px';
div.appendChild(time);

document.documentElement.style.overflow='hidden';

canvas.style.position='absolute';
canvas.style.zIndex=10;
document.body.appendChild(canvas);
context=canvas.getContext('2d');

function canvasLines() {
  w=Math.round(sqsize*4);
  x0=Math.round(window.innerWidth/2-w/2);
  x1=w;
  y1=w;
  canvas.width=w;
  canvas.height=w;
  canvas.style.left=x0+"px";
  canvas.style.top=w/4+"px";
  context.lineWidth=1;
  context.strokeStyle='#000000';
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(w, 0);
  context.moveTo(0, w/4-0.5);
  context.lineTo(w, w/4-0.5);
  context.stroke();
  context.moveTo(0, w/2-0.5);
  context.lineTo(w, w/2-0.5);
  context.stroke();
  context.moveTo(0, w/4*3-0.5);
  context.lineTo(w, w/4*3-0.5);
  context.stroke();
  context.moveTo(0, w-0.5);
  context.lineTo(w, w-0.5);
  context.stroke();
  context.moveTo(0+0.5, 0);
  context.lineTo(0+0.5, w);
  context.stroke();
  context.moveTo(w/4-0.5,0);
  context.lineTo(w/4-0.5,w);
  context.stroke();
  context.moveTo(w/2+0.5,0);
  context.lineTo(w/2+0.5,w);
  context.stroke();
  context.moveTo(w/4*3-0.5,0);
  context.lineTo(w/4*3-0.5,w);
  context.stroke();
  context.moveTo(w-0.5, 0);
  context.lineTo(w-0.5,w);
  context.stroke();
  context.closePath();
}

function setCookie(cname, cvalue) {
  let exdays=1000;
  let d=new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires="expires="+ d.toUTCString();
  document.cookie=cname + "=" + cvalue + ";" + expires + ";path=/donttap";
}

function getCookie(cname) {
  let name=cname + "=";
  let decodedCookie=decodeURIComponent(document.cookie);
  let ca=decodedCookie.split(';');
  for(let i=0; i <ca.length; i++) {
    let c=ca[i];
    while (c.charAt(0) === ' ') {
      c=c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return "";
}

function bake_cookie(name, value) {
  let cookie=[name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie=cookie;
}

function read_cookie(name) {
 let result=document.cookie.match(new RegExp(name + '=([^;]+)'));
 result && (result=JSON.parse(result[1]));
 return result;
}

function canvasBlack() {
  canvasB.width=w;
  canvasB.height=w;
  canvasB.style.left=x0+"px";
  canvasB.style.top=w/4+"px";
  contextB.clearRect(0, 0, canvasB.width, canvasB.height);
  if (patt===0) drawBlack();
  else drawBlackPat();
}

function drawBlack() {
  contextB.clearRect(0, 0, canvasB.width, canvasB.height);
  contextB.beginPath();
  contextB.rect(horiAr[0]*sqsize,vertAr[0]*sqsize,sqsize,sqsize);
  contextB.rect(horiAr[1]*sqsize,vertAr[1]*sqsize,sqsize,sqsize);
  contextB.rect(horiAr[2]*sqsize,vertAr[2]*sqsize,sqsize,sqsize);
  contextB.fillStyle='#000000';
  contextB.closePath();
  contextB.fill();
}

function drawBlackPat() {
  contextB.clearRect(0, 0, canvasB.width, canvasB.height);
  contextB.beginPath();
  for (let i=0; i < hopX.length; i++) {
    contextB.rect(hopX[i]*sqsize,hopY[i]*sqsize,sqsize,sqsize);
  }
  contextB.fillStyle='#000000';
  contextB.closePath();
  contextB.fill();
}

function drawSquares() {
  CoX=Math.floor((cx-x0)/sqsize);
  CoY=Math.floor((cy-w/4)/sqsize);

  for (let i=0; i < horiAr.length; i++) {
    if (horiAr[i] === CoX && vertAr[i] === CoY) {
      for (let y=0; y < horiAr.length; y++) if (i != y) {OtherTiles[n]=y; n++;}
      n=0;
      horT=horiAr[i];
      verT=vertAr[i];
      horiAr[i]=Math.floor(Math.random() * (4 - 1 +1));
      vertAr[i]=Math.floor(Math.random() * (4 - 1 +1));
      while ((horiAr[i] === horiAr[OtherTiles[0]] && vertAr[i] === vertAr[OtherTiles[0]]) ||
             (horiAr[i] === horiAr[OtherTiles[1]] && vertAr[i] === vertAr[OtherTiles[1]]) ||
             (horiAr[i] === horT && vertAr[i] === verT)) {
              horiAr[i]=Math.floor(Math.random() * (4 - 1 +1));
              vertAr[i]=Math.floor(Math.random() * (4 - 1 +1));
      }
      contextB.clearRect(0, 0, canvasB.width, canvasB.height);
      contextB.beginPath();
      contextB.rect(horiAr[0]*sqsize,vertAr[0]*sqsize,sqsize,sqsize);
      contextB.rect(horiAr[1]*sqsize,vertAr[1]*sqsize,sqsize,sqsize);
      contextB.rect(horiAr[2]*sqsize,vertAr[2]*sqsize,sqsize,sqsize);
      contextB.fillStyle='#000000';
      contextB.closePath();
      contextB.fill();
      if (bonus<92) bonus+=8;
      else bonus=100;
      Calculatescore();
      good=1;
      break;
    }
  }
  if (good===0) {
      err=1;
      cXX=cx-x0;
      cYY=cy-w/4;
      drawError();
      wOLD=w;
      cXXo =cXX;
      cYYo =cYY;
  }
  good=0;
}

function drawError() {
  contextB.beginPath();
  contextB.rect(CoX*sqsize,CoY*sqsize,sqsize,sqsize);
  contextB.fillStyle='#ff2c2c';
  contextB.closePath();
  contextB.fill();
  contextB.lineWidth=2;
  contextB.strokeStyle='#0000FF';
  contextB.beginPath();
  contextB.moveTo(cXX-7, cYY);
  contextB.lineTo(cXX+7, cYY);
  contextB.moveTo(cXX, cYY-7);
  contextB.lineTo(cXX, cYY+7);
  contextB.stroke();
  contextB.closePath();
}

function Calculatescore() {
  B5=Math.ceil(bonus/20);
  sc=sc+B5;
  score.innerHTML=sc;
  pressKey.innerHTML=B5;
}

if (zoomC != "") {setCzoom();zom.innerHTML="-"+zoomN+"+";} else {
  sqsize=sqsizeD;
  let w=Math.round(sqsize*4);
  let x0=Math.round(window.innerWidth/2-w/2);
  let x1=w;
  let y1=w;
  zom.innerHTML="-zoom+";
}

function setCzoom() {
  sqsize=Math.round(sqsizeD*zoomN/100);
  w=Math.round(sqsize*4);
  x0=Math.round(window.innerWidth/2-w/2);
  x1=w;
  y1=w;
}

function patList() {
  rec.innerHTML="Pattern:<br>";
  for (let i=0;i<patRec.length;i++) {
    rec.innerHTML+=patRec[i].record;
    rec.innerHTML+=patRec[i].date;
    rec.innerHTML+="<br>";
    }
  }
  function freList() {
  rec.innerHTML="Frenzy:<br>";
  for (let z=0;z<freRec.length;z++) {
    rec.innerHTML+=freRec[z].record;
    rec.innerHTML+=freRec[z].date;
    rec.innerHTML+="<br>";
  }
}

let patAmt;
let hopX=[],hopY=[];
let pround=0;
let CPX,CPY;
let noErr=0;

function calculatePat() {
  CPX=Math.floor((cx-x0)/sqsize);
  CPY=Math.floor((cy-w/4)/sqsize);
  noErr=1;
  for (let i=0; i < pround; i++) {
    if (CPX===hopX[i] && CPY===hopY[i]) {
        pround--;
        hopX.splice(i, 1);
        hopY.splice(i, 1);
        drawBlackPat();
        noErr=0;
        break;
    }
  }
  if (noErr===1) {
    err=1;
    cXX=cx-x0;
    cYY=cy-w/4;
    CoX=CPX;
    CoY=CPY;
    drawError();
    wOLD=w;
    cXXo =cXX;
    cYYo =cYY;
  }
  if (pround===0) {
    patAmt--;
    if (patAmt===0) {
      clearInterval(timerGP);
      pressKey.innerHTML="Space to Start";
      exactPat=performance.now()-exactPat;
      time.innerHTML=Math.round(exactPat)/1000;
      FreP();
      } else {
      pround=4;
      drawPAT();
      pressKey.innerHTML=patAmt;
    }
  }
}

let freTeP;
function FreP() {
  today=new Date();
  freTeP=subscriberP();
  patRec.push(freTeP);
  patRec.sort((a, b) => (a.record > b.record) ? 1 : -1);
  patRec.length=40;
  bake_cookie("recordsP", patRec);
  patList();
}

function subscriberP() {
  return {
    'record':   Math.round(exactPat)/1000,
    'date':    ""//today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()
  }
}

function refrePP(p) {
  err=0;
  score.innerHTML="&nbsp;";

  if (patRec.length>0) Best.innerHTML="HI-SCORE<br>"+patRec[0].record; 
  else Best.innerHTML="HI-SCORE";

  time.innerHTML="0";
  clearInterval(timerGO);
  timerWent=true;
  let timeL=0;
  contextB.clearRect(0, 0, canvasB.width, canvasB.height);
  pressKey.innerHTML="Space to Start";
  if (p===0) {
    clearInterval(timerGP);
    timerWenP=false;
    timeP=0;
    timerPAT();
    drawPAT();
    patAmt=15;
    pressKey.innerHTML=patAmt;
    pround=4;
  }
}
let timeP,timerWenP;
let timerGP=null;
let exactPat;
function timerPAT() {
  exactPat=performance.now();
  timerWenP=true;
  timerGP=setInterval(function() {
    timeP=Math.round((timeP+0.1)*10)/10;
    time.innerHTML=timeP;
    if (err === 1) {
      clearInterval(timerGP);
      pressKey.innerHTML="Space to Start";time.innerHTML+='('+patAmt+'L)';
    }
  }, 100)
}

function drawPAT() {
  hopX[0]=Math.floor(Math.random() * 4);
  hopY[0]=Math.floor(Math.random() * 4);
  hopX[1]=hopX[0];
  hopY[1]=hopY[0];
  while (hopX[1] === hopX[0] && hopY[1] === hopY[0]) {
    hopX[1]=Math.floor(Math.random() * 4);
    hopY[1]=Math.floor(Math.random() * 4);
  }
  hopX[2]=hopX[0];
  hopY[2]=hopY[0];
  while ((hopX[2] === hopX[0] && hopY[2] === hopY[0]) || (hopX[2] === hopX[1] && hopY[2] === hopY[1])) {
    hopX[2]=Math.floor(Math.random() * 4);
    hopY[2]=Math.floor(Math.random() * 4);
  }
  hopX[3]=Math.floor(Math.random() * 4);
  hopY[3]=Math.floor(Math.random() * 4);
  while ((hopX[3] === hopX[0] && hopY[3] === hopY[0]) || (hopX[3] === hopX[1] && hopY[3] === hopY[1]) || 
         (hopX[3] === hopX[2] && hopY[3] === hopY[2])) {
    hopX[3]=Math.floor(Math.random() * 4);
    hopY[3]=Math.floor(Math.random() * 4);
  }
  drawBlackPat();
}

canvasLines()

let p=0;
function refresh(p) {
  bonus=0;
  contextB.clearRect(0, 0, canvasB.width, canvasB.height);
  sc=0;
  good=0;
  err=0;
  score.innerHTML="0";
  time.innerHTML="30";
  if (freRec.length>0) Best.innerHTML="HI-SCORE<br>"+freRec[0].record;
  else {
    Best.innerHTML="HI-SCORE<br>";
    clearInterval(timerGP);
    if (p===0) {
    clearInterval(timerGO);
    timerWent=false;
    timeL=30;
    timer();
    horiAr[0]=Math.floor(Math.random() * 4);
    vertAr[0]=Math.floor(Math.random() * 4);
    horiAr[1]=horiAr[0];
    vertAr[1]=vertAr[0];
    while (horiAr[1] === horiAr[0] && vertAr[1] === vertAr[0]) {
      horiAr[1]=Math.floor(Math.random() * 4);
      vertAr[1]=Math.floor(Math.random() * 4);
    }
    horiAr[2]=horiAr[0];
    vertAr[2]=vertAr[0];
      while ((horiAr[2] === horiAr[0] && vertAr[2] === vertAr[0]) || (horiAr[2] === horiAr[1] && vertAr[2] === vertAr[1])) {
        horiAr[2]=Math.floor(Math.random() * 4);
        vertAr[2]=Math.floor(Math.random() * 4);
      }
    drawBlack();
    pressKey.innerHTML="1";
    }
  }
  if (PaC != "") {
    patt=Math.abs(Number(PaC)-1);
    button.click();
  } else patt=0;
}

function FreR() {
  today=new Date();

  freTem=subscriber();
  freRec.push(freTem);
  freRec.sort((a, b) => (a.record < b.record) ? 1 : -1);
  if (freRec.length>10) freRec.length=40;
  bake_cookie("records", freRec);
  freList();
}

function subscriber() {
  return {
    'record': sc,
    'date': ""//+today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()
  }
}

function timer() {
  timerWent=true;
  timerGO=setInterval(timerTick, 100);
}

function timerTick() {
  timeL=(timeL-0.1).toFixed(1);
  if (bonus>3) bonus=Math.round((bonus-3)*10)/10;
  else bonus=0.1;
  pressKey.innerHTML=Math.ceil(bonus/20);
  time.innerHTML=timeL;
  if (timeL <= 0) {
    clearInterval(timerGO);
    time.innerHTML="0";pressKey.innerHTML="Space to Start";
    FreR();
  }
  if (err === 1) {
    clearInterval(timerGO);
    pressKey.innerHTML="Space to Start";
  }
}

zoom();

//Event Listener Functions
function zoom() {
  zoomI = Number(slider.value);
  sqsizeD = Math.round(window.innerHeight * 0.108);
  sqsize = Math.round(sqsizeD * zoomI / 100);
  w = Math.round(sqsize * 4);
  x0 = Math.round(window.innerWidth / 2 - w / 2);
  x1 = w;
  y1 = w;

  context.clearRect(0, 0, canvas.width, canvas.height);
  canvasLines();
  canvasBlack();

  div.style.width = w;
  div.style.height = Math.round(w * 1.5);
  div.style.left = x0 + "px";
  div.style.top = "0px";

  score.style.top = sqsize / 4 + "px";
  score.style.fontSize = Math.round(sqsize / 1.4) + "px";

  time.style.padding = sqsize / 8 + "px";
  time.style.top = "0px";
  time.style.fontSize = Math.round(sqsize / 1.8) + "px";

  if (err === 1) {
    cXX = cXXo / wOLD * w;
    cYY = cYYo / wOLD * w;
    drawError();
  }

  pressKey.style.top = w * 1.07 + "px";
  pressKey.style.fontSize = Math.round(sqsize / 3) + "px";

  setCookie("zoom", slider.value);

  if (x0 < 200) {
    slider.style.transform = "rotate(90deg)";
    slider.style.marginTop = "100px";
    slider.style.marginLeft = "-80px";
    button.style.transform = "rotate(90deg)";
    button.style.marginTop = "200px";
    button.style.marginLeft = "-80px";
    zom.style.marginLeft = "-75px";
    button.style.paddingRight = "20px";
  } else {
    slider.style.transform = "";
    slider.style.marginTop = "";
    slider.style.marginLeft = "";
    button.style.transform = "";
    button.style.marginTop = "";
    button.style.marginLeft = "";
    zom.style.marginLeft = "";
    button.style.paddingRight = "";
  }

  zom.innerHTML = "-" + slider.value + "+";
  Best.style.left = "75%";
  Best.style.top = sqsize / 3.6 + "px";
  Best.style.fontSize = Math.round(sqsize / 5) + "px";

  }

}

function clickTile(e) {
  if (patternMode===false) {
    cx=e.clientX;
    cy=e.clientY;
    if (timeL > 0 && err === 0) drawSquares();
    if (!timerWent) timer();
  }
}

function keyPress(e) {
  key=e.key;
  if (key===" ") {
    if (patt===0) refresh(0);
    else refrePP(0);
  }
}

function recordsBf() {
  if (recSh===1) {
    rec.style.display="none"; 
    recSh=0; setCookie("rec","0");
  }
  else {
    rec.style.display="block"; 
    recSh=1;setCookie("rec","1");
  }
}

function frenzy() {
  horiAr=[];
  vertAr=[];
  hopX=[];
  hopY=[];
  if (patt===0) {
    patternMode=true;
    button.innerText="Frenzy";
    patt=1;
    setCookie("patt", "1");
    refrePP(1);
    patList();
  } else {
    patternMode=false;
    button.innerText="Pattern";
    setCookie("patt", "0");
    refresh(1);
    pressKey.innerHTML="Space to Start";
    freList();
  }
  button.blur();
}

function clickpattern(e) {
  if (patternMode===true) {
    cx=e.clientX;
    cy=e.clientY;
    if (patAmt>0 && err===0 && timerWenP===true) calculatePat();
  }
}

//Event LIsteners
window.addEventListener('resize', zoom);
slider.addEventListener("input", zoom);
canvas.addEventListener("mousedown", clickTile);
document.addEventListener("keydown", keyPress);
recordsB.addEventListener("click", recordsBf);
button.addEventListener ("click", frenzy);
canvas.addEventListener("mousedown", clickpattern);
