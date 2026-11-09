
// ========================================
// Donttap v3 — ForexPatriot77
// Modes: Frenzy, Endurance, and Cheat
// ========================================

// ---------- Game settings ----------

let gameMode = "frenzy";
let patternMode = false;

let freRec = [];
let endRec = [];
let cheatRec = [];

let savedRecords = read_cookie("records");
if (Array.isArray(savedRecords)) {
  freRec = savedRecords;
}

try {
  endRec = JSON.parse(localStorage.getItem("recordsEndurance")) || [];
} catch (e) {
  endRec = [];
}

try {
  cheatRec = JSON.parse(localStorage.getItem("recordsCheat")) || [];
} catch (e) {
  cheatRec = [];
}

let key;
let timerGO = null;
let bonus = 0;
let timeL = 30;
let sc = 0;
let B5;

let err = 0;
let timerWent = true;
let runEnded = true;

let cx, cy, CoX, CoY;
let horT, verT;
let OtherTiles = [];
let good = 1;
let cXX, cYY;
let horiAr = [];
let vertAr = [];

// Create both canvases before the game tries to position or draw on them.
let canvas = document.createElement("canvas");
let canvasB = document.createElement("canvas");
let contextB = canvasB.getContext("2d");

let context;
let zoomI, wOLD, cXXo, cYYo;

let slider = document.createElement("input");
let div = document.createElement("div");
let zom = document.createElement("div");

let zoomN = parseInt(localStorage.getItem("zoom"), 10);

if (!Number.isFinite(zoomN)) {
  zoomN = 156;
}

slider.id = "slider";
slider.type = "range";
slider.min = 50;
slider.max = 200;
slider.step = 1;
slider.value = Math.min(200, Math.max(50, zoomN));

zoomI = Number(slider.value);

let sqsizeD = Math.round(window.innerHeight * 0.108);
let sqsize = Math.round(sqsizeD * zoomI / 100);
let w = Math.round(sqsize * 4);
let x0 = Math.round(window.innerWidth / 2 - w / 2);
let x1 = w;
let y1 = w;

let time = document.createElement("div");
let pressKey = document.createElement("div");
let score = document.createElement("div");

let button = document.createElement("BUTTON");


// ---------- Initial game elements ----------

canvasB.style.position = "absolute";
canvasB.style.zIndex = 9;
canvasB.style.pointerEvents = "none";
document.body.appendChild(canvasB);

canvasB.width = w;
canvasB.height = w;
canvasB.style.left = x0 + "px";
canvasB.style.top = w / 4 + "px";

div.id = "basis";
div.style.display = "block";
div.style.position = "absolute";
div.style.cursor = "pointer";
div.style.width = w + "px";
div.style.height = Math.round(w * 1.5) + "px";
div.style.left = x0 + "px";
div.style.top = "0px";
div.style.backgroundColor = "white";
div.style.pointerEvents = "none";
document.body.appendChild(div);

zom.id = "zom";
zom.style.display = "block";
zom.style.cursor = "pointer";
zom.style.color = "white";
zom.style.width = "200px";
zom.style.pointerEvents = "none";
zom.style.textAlign = "center";
document.body.appendChild(zom);

document.body.appendChild(slider);

button.innerHTML = "Frenzy";
document.body.appendChild(button);
button.id = "switch";
button.style.display = "block";
button.style.position = "absolute";


// ---------- Repository credit ----------

let patr = document.createElement("a");
patr.id = "patr";
patr.title = "ForexPatriot77";
patr.href = "https://github.com/ForexPatriot77/Donttap-v3";
patr.target = "_blank";
patr.rel = "noopener noreferrer";
patr.innerHTML = 'GitHub Repo <sub>(ForexPatriot77)</sub>';
patr.style.display = "block";
patr.style.position = "absolute";
patr.style.top = "95%";
patr.style.left = "20px";
document.body.appendChild(patr);


// ---------- Records button ----------

let recordsB = document.createElement("BUTTON");
recordsB.innerHTML = "Records";
document.body.appendChild(recordsB);
recordsB.id = "records";
recordsB.style.display = "block";
recordsB.style.position = "absolute";

let rec = document.createElement("div");

let recSh = getCookie("rec") === ""
  ? 1
  : Number(getCookie("rec"));

rec.id = "listR";
rec.style.position = "absolute";
rec.style.top = "35px";
rec.style.left = "0px";
rec.style.zIndex = 11;
rec.style.width = "200px";
rec.style.pointerEvents = "none";
rec.style.color = "white";
rec.style.textAlign = "center";
rec.style.fontSize = "20px";

recordsB.appendChild(rec);


// ---------- Score and display ----------

let Best = document.createElement("div");
Best.id = "best";
Best.innerHTML = "HI-SCORE<br>";
Best.style.position = "absolute";
Best.style.left = "75%";
Best.style.top = sqsize / 3.6 + "px";
Best.style.zIndex = 11;
Best.style.marginTop = "0px";
Best.style.pointerEvents = "none";
Best.style.color = "#800020";
Best.style.textAlign = "center";
Best.style.fontSize = Math.round(sqsize / 5) + "px";
div.appendChild(Best);

score.id = "score";
score.innerHTML = "0";
score.style.position = "center";
score.style.top = sqsize / 4 + "px";
score.style.zIndex = 11;
score.style.pointerEvents = "none";
score.style.color = "#800020";
score.style.textAlign = "center";
score.style.fontSize = Math.round(sqsize / 1.4) + "px";
div.appendChild(score);

pressKey.id = "pressKey";
pressKey.innerHTML = "SPACE TO START";
pressKey.style.position = "relative";
pressKey.style.top = w * 1.07 + "px";
pressKey.style.zIndex = 11;
pressKey.style.pointerEvents = "none";
pressKey.style.textAlign = "center";
pressKey.style.fontSize = Math.round(sqsize / 3) + "px";
div.appendChild(pressKey);

time.id = "time";
time.innerHTML = "30";
time.style.position = "absolute";
time.style.padding = sqsize / 8 + "px";
time.style.top = "0px";
time.style.zIndex = 11;
time.style.pointerEvents = "none";
time.style.color = "#0000FF";
time.style.textAlign = "left";
time.style.fontSize = Math.round(sqsize / 1.8) + "px";
div.appendChild(time);


// ---------- Page and canvas setup ----------

document.documentElement.style.overflow = "hidden";

canvas.style.position = "absolute";
canvas.style.zIndex = 10;
document.body.appendChild(canvas);

context = canvas.getContext("2d");

recordsBf();


// ---------- Cookies and storage ----------

function setCookie(cname, cvalue) {
  let exdays = 1000;
  let d = new Date();

  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

  let expires = "expires=" + d.toUTCString();

  document.cookie =
    cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }

  return "";
}

function bake_cookie(name, value) {
  let cookie = [
    name,
    "=",
    JSON.stringify(value),
    "; domain=.",
    window.location.host.toString(),
    "; path=/;"
  ].join("");

  document.cookie = cookie;
}

function read_cookie(name) {
  // Match the complete cookie name and ignore stale or malformed saved data.
  const prefix = name + "=";
  const cookie = document.cookie
    .split(";")
    .map(part => part.trim())
    .find(part => part.startsWith(prefix));

  if (!cookie) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(cookie.slice(prefix.length)));
  } catch (error) {
    console.warn("Ignoring invalid saved cookie:", name, error);
    return null;
  }
}


// ---------- Drawing functions ----------

function canvasLines() {
  w = Math.round(sqsize * 4);
  x0 = Math.round(window.innerWidth / 2 - w / 2);
  x1 = w;
  y1 = w;

  canvas.width = w;
  canvas.height = w;

  canvas.style.left = x0 + "px";
  canvas.style.top = w / 4 + "px";

  context.lineWidth = 1;
  context.strokeStyle = "#000000";

  context.beginPath();

  context.moveTo(0, 0);
  context.lineTo(w, 0);

  context.moveTo(0, w / 4 - 0.5);
  context.lineTo(w, w / 4 - 0.5);

  context.moveTo(0, w / 2 - 0.5);
  context.lineTo(w, w / 2 - 0.5);

  context.moveTo(0, w / 4 * 3 - 0.5);
  context.lineTo(w, w / 4 * 3 - 0.5);

  context.moveTo(0, w - 0.5);
  context.lineTo(w, w - 0.5);

  context.moveTo(0.5, 0);
  context.lineTo(0.5, w);

  context.moveTo(w / 4 - 0.5, 0);
  context.lineTo(w / 4 - 0.5, w);

  context.moveTo(w / 2 + 0.5, 0);
  context.lineTo(w / 2 + 0.5, w);

  context.moveTo(w / 4 * 3 - 0.5, 0);
  context.lineTo(w / 4 * 3 - 0.5, w);

  context.moveTo(w - 0.5, 0);
  context.lineTo(w - 0.5, w);

  context.stroke();
  context.closePath();
}

function canvasBlack() {
  canvasB.width = w;
  canvasB.height = w;
  canvasB.style.left = x0 + "px";
  canvasB.style.top = w / 4 + "px";

  contextB.clearRect(0, 0, canvasB.width, canvasB.height);

  drawBlack();
}

function drawBlack() {
  contextB.clearRect(0, 0, canvasB.width, canvasB.height);

  // Cheat mode intentionally has no black tiles.
  if (gameMode === "cheat") return;

  if (horiAr.length < 3 || vertAr.length < 3) {
    return;
  }

  contextB.beginPath();

  for (let i = 0; i < 3; i++) {
    contextB.rect(
      horiAr[i] * sqsize,
      vertAr[i] * sqsize,
      sqsize,
      sqsize
    );
  }

  contextB.fillStyle = "#000000";
  contextB.closePath();
  contextB.fill();
}

function drawSquares() {
  CoX = Math.floor((cx - x0) / sqsize);
  CoY = Math.floor((cy - w / 4) / sqsize);

  // Cheat is Frenzy with the black tiles removed: every white tile is valid.
  // Successful taps build the same escalating bonus as Frenzy.
  if (gameMode === "cheat") {
    if (CoX >= 0 && CoX < 4 && CoY >= 0 && CoY < 4) {
      if (bonus < 92) {
        bonus += 8;
      } else {
        bonus = 100;
      }
      Calculatescore();
    }
    return;
  }

  good = 0;

  for (let i = 0; i < horiAr.length; i++) {
    if (horiAr[i] === CoX && vertAr[i] === CoY) {
      horT = horiAr[i];
      verT = vertAr[i];

      let newX;
      let newY;

      do {
        newX = Math.floor(Math.random() * 4);
        newY = Math.floor(Math.random() * 4);
      } while (
        (newX === horiAr[0] && newY === vertAr[0] && i !== 0) ||
        (newX === horiAr[1] && newY === vertAr[1] && i !== 1) ||
        (newX === horiAr[2] && newY === vertAr[2] && i !== 2) ||
        (newX === horT && newY === verT)
      );

      horiAr[i] = newX;
      vertAr[i] = newY;

      drawBlack();

      if (gameMode === "frenzy") {
        if (bonus < 92) {
          bonus += 8;
        } else {
          bonus = 100;
        }
      }

      Calculatescore();
      good = 1;
      break;
    }
  }

  if (good === 0) {
    err = 1;

    cXX = cx - x0;
    cYY = cy - w / 4;

    drawError();

    wOLD = w;
    cXXo = cXX;
    cYYo = cYY;
  }
}

function drawError() {
  contextB.beginPath();

  contextB.rect(
    CoX * sqsize,
    CoY * sqsize,
    sqsize,
    sqsize
  );

  contextB.fillStyle = "#ff2c2c";
  contextB.closePath();
  contextB.fill();

  contextB.lineWidth = 2;
  contextB.strokeStyle = "#0000FF";

  contextB.beginPath();

  contextB.moveTo(cXX - 7, cYY);
  contextB.lineTo(cXX + 7, cYY);

  contextB.moveTo(cXX, cYY - 7);
  contextB.lineTo(cXX, cYY + 7);

  contextB.stroke();
  contextB.closePath();
}


// ---------- Scoring ----------

function Calculatescore() {
  if (gameMode === "endurance") {
    sc++;

    score.innerHTML = sc;

    if (sc % 40 === 0) {
      timeL += 10;
      time.innerHTML = timeL.toFixed(1);
      pressKey.innerHTML = "+10 seconds!";
    } else {
      pressKey.innerHTML = "1";
    }

    return;
  }

  B5 = Math.ceil(bonus / 20);
  sc += B5;

  score.innerHTML = sc;
  pressKey.innerHTML = B5;
}


// ---------- Leaderboards ----------

function freList() {
  rec.innerHTML = "Frenzy:<br>";

  for (let z = 0; z < freRec.length; z++) {
    rec.innerHTML += freRec[z].record;
    rec.innerHTML += freRec[z].date || "";
    rec.innerHTML += "<br>";
  }
}

function endList() {
  rec.innerHTML = "Endurance:<br>";

  for (let z = 0; z < endRec.length; z++) {
    rec.innerHTML += endRec[z].record;
    rec.innerHTML += "<br>";
  }
}

function cheatList() {
  rec.innerHTML = "Cheat:<br>";

  for (let z = 0; z < cheatRec.length; z++) {
    rec.innerHTML += cheatRec[z].record;
    rec.innerHTML += "<br>";
  }
}


// ---------- Game reset and initialization ----------

function refresh(p) {
  clearInterval(timerGO);

  bonus = 0;
  sc = 0;
  good = 1;
  err = 0;

  runEnded = true;
  timerWent = true;

  score.innerHTML = "0";

  timeL = gameMode === "endurance" ? 10 : 30;
  time.innerHTML = timeL;

  contextB.clearRect(0, 0, canvasB.width, canvasB.height);

  if (gameMode === "endurance") {
    endList();
    Best.innerHTML = "HI-SCORE<br>" +
      (endRec.length > 0 ? endRec[0].record : "");
  } else if (gameMode === "cheat") {
    cheatList();
    Best.innerHTML = "HI-SCORE<br>" +
      (cheatRec.length > 0 ? cheatRec[0].record : "");
  } else {
    freList();
    Best.innerHTML = "HI-SCORE<br>" +
      (freRec.length > 0 ? freRec[0].record : "");
  }

  if (p === 0) {
    horiAr = [];
    vertAr = [];

    if (gameMode !== "cheat") for (let i = 0; i < 3; i++) {
      let newX;
      let newY;

      do {
        newX = Math.floor(Math.random() * 4);
        newY = Math.floor(Math.random() * 4);
      } while (
        horiAr.some((x, j) => x === newX && vertAr[j] === newY)
      );

      horiAr.push(newX);
      vertAr.push(newY);
    }

    drawBlack();

    runEnded = false;
    timerWent = false;

    pressKey.innerHTML = "1";

    timer();
  } else {
    pressKey.innerHTML = "SPACE TO START";
  }
}


// ---------- Record saving ----------

function FreR() {
  if (runEnded) {
    return;
  }

  runEnded = true;

  if (sc > 0) {
    const record = {
      record: sc,
      date: ""
    };

    if (gameMode === "cheat") {
      cheatRec.push(record);
      cheatRec.sort((a, b) => b.record - a.record);
      cheatRec = cheatRec.slice(0, 10);
      localStorage.setItem("recordsCheat", JSON.stringify(cheatRec));
      cheatList();
      Best.innerHTML = "HI-SCORE<br>" + cheatRec[0].record;
    } else if (gameMode === "endurance") {
      endRec.push(record);

      endRec.sort((a, b) => b.record - a.record);
      endRec = endRec.slice(0, 10);

      localStorage.setItem(
        "recordsEndurance",
        JSON.stringify(endRec)
      );

      endList();

      Best.innerHTML = "HI-SCORE<br>" + endRec[0].record;
    } else {
      freRec.push(record);

      freRec.sort((a, b) => b.record - a.record);
      freRec = freRec.slice(0, 10);

      bake_cookie("records", freRec);

      freList();

      Best.innerHTML = "HI-SCORE<br>" + freRec[0].record;
    }
  }

  pressKey.innerHTML = "SPACE TO START";
}

function subscriber() {
  return {
    record: sc,
    date: ""
  };
}


// ---------- Timer ----------

function timer() {
  clearInterval(timerGO);

  timerWent = true;
  timerGO = setInterval(timerTick, 100);
}

function timerTick() {
  if (runEnded) {
    clearInterval(timerGO);
    return;
  }

  if (err === 1) {
    clearInterval(timerGO);
    FreR();
    return;
  }

  timeL = Math.max(
    0,
    Math.round((timeL - 0.1) * 10) / 10
  );

  if (gameMode === "frenzy") {
    if (bonus > 3) {
      bonus = Math.round((bonus - 3) * 10) / 10;
    } else {
      bonus = 0.1;
    }

    pressKey.innerHTML = Math.ceil(bonus / 20);
  }

  time.innerHTML = timeL.toFixed(1);

  if (timeL <= 0) {
    clearInterval(timerGO);
    time.innerHTML = "0";
    FreR();
  }
}


// ---------- Zoom ----------

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

  div.style.width = w + "px";
  div.style.height = Math.round(w * 1.5) + "px";
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

  // Save zoom for the next visit.
  localStorage.setItem("zoom", slider.value);

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


// ---------- Input handling ----------

function clickTile(e) {
  if (
    !runEnded &&
    timeL > 0 &&
    err === 0 &&
    patternMode === false
  ) {
    cx = e.clientX;
    cy = e.clientY;

    drawSquares();
  }
}

function keyPress(e) {
  key = e.key;

  if (key === " " && runEnded) {
    e.preventDefault();
    refresh(0);
  }
}


// ---------- Records display ----------

function recordsBf() {
  if (recSh === 1) {
    rec.style.display = "none";
    recSh = 0;
    setCookie("rec", "0");
  } else {
    rec.style.display = "block";
    recSh = 1;
    setCookie("rec", "1");
  }
}


// ---------- Mode switching ----------

function frenzy() {
  clearInterval(timerGO);
  runEnded = true;
  timerWent = true;

  // The button displays the currently selected mode.
  if (gameMode === "frenzy") {
    gameMode = "endurance";
  } else if (gameMode === "endurance") {
    gameMode = "cheat";
  } else {
    gameMode = "frenzy";
  }

  button.innerText =
    gameMode.charAt(0).toUpperCase() + gameMode.slice(1);

  patternMode = false;
  refresh(1);
  button.blur();
}


// ---------- Event listeners ----------

window.addEventListener("resize", zoom);

slider.addEventListener("input", zoom);

canvas.addEventListener("mousedown", clickTile);

document.addEventListener("keydown", keyPress);

recordsB.addEventListener("click", recordsBf);

button.addEventListener("click", frenzy);


// ---------- Start ----------

zoom();

if (gameMode === "frenzy") {
  freList();
  Best.innerHTML = "HI-SCORE<br>" +
    (freRec.length > 0 ? freRec[0].record : "");
}
