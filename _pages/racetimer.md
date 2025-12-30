---
layout: page
title: "Race Timer"
permalink: /racetimer/
---


<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sailing Race Timer</title>

<style>
body {
    font-family: Arial, sans-serif;
    background: #eef4ff;
    text-align: center;
    margin: 0;
    padding: 20px 20px 150px;
}
#time { font-size: 72px; margin: 30px 0; color: navy; }
#info { font-size: 24px; height: 36px; font-weight: bold; }
button, input { font-size: 20px; padding: 12px; margin: 6px; }
input[type="number"] { width: 130px; }
input[type="text"] { width: 260px; }
#hiddenTest { font-size: 10px; opacity: 0.1; border: none; }
</style>
</head>

<body>

<h1>Sailing Race Timer V1.1.6</h1>

<div>Start time (minutes): <input type="number" id="startTimeInput" value="10"></div>
<div>Pre-start minutes: <input type="text" id="prestartInput" value="10,5,4,1"></div>
<div>Long beep minutes: <input type="text" id="longBeepInput" value="4"></div>
<div>Post-start interval (minutes): <input type="number" id="postStartInterval" value="1"></div>
<div>Post-race duration (minutes, 0 = none): <input type="number" id="postRaceDuration" value="0"></div>
<div>Countdown duration (seconds): <input type="number" id="warningSeconds" value="10"></div>

<div id="time">10:00</div>
<div id="info"></div>

<button onclick="startTimer()">Start</button>
<button onclick="stopTimer()">Stop</button>
<button onclick="resetTimer()">Reset</button>
<button id="hiddenTest" onclick="toggleTestMode()">Test Mode</button>

<script>
// =====================
// STATE
// =====================
let running=false, prestart=true, raceFinished=false;
let remaining=600, elapsed=0;
let timerId=null, tickInterval=1000;
let testMode=false;

let signals={}, longBeepMinutes=[];

// =====================
// AUDIO
// =====================
let audioCtx=null;
function initAudio(){
    if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==="suspended") audioCtx.resume();
}

function playKlaxon(d, base, sweep, vol){
    if(!audioCtx) return;
    const now=audioCtx.currentTime;
    const o1=audioCtx.createOscillator();
    const o2=audioCtx.createOscillator();
    const g=audioCtx.createGain();

    o1.type="square";
    o2.type="sawtooth";

    o1.frequency.setValueAtTime(base,now);
    o1.frequency.linearRampToValueAtTime(sweep,now+d);
    o2.frequency.setValueAtTime(base/2,now);

    g.gain.setValueAtTime(0.001,now);
    g.gain.exponentialRampToValueAtTime(vol,now+0.02);
    g.gain.exponentialRampToValueAtTime(0.001,now+d);

    o1.connect(g); o2.connect(g); g.connect(audioCtx.destination);
    o1.start(now); o2.start(now);
    o1.stop(now+d); o2.stop(now+d);
}

const shortBeep = ()=>playKlaxon(0.25,380,520,0.6);
const longBeep  = ()=>playKlaxon(1.1,360,520,0.75);
const countdownEndKlaxon = ()=>playKlaxon(2.0,260,480,0.95);
const finishKlaxon = ()=>playKlaxon(2.6,200,420,1.0);

// =====================
// SIGNAL SETUP
// =====================
function updateSignals(){
    signals={};

    const pre=document.getElementById("prestartInput").value
        .split(",").map(x=>parseInt(x)).filter(x=>x>0);

    longBeepMinutes=document.getElementById("longBeepInput").value
        .split(",").map(x=>parseInt(x)).filter(x=>x>0);

    new Set([...pre,...longBeepMinutes]).forEach(
        m=>signals[m*60]=`${m} min`
    );

    signals[0]="START";
}

// =====================
// TICK
// =====================
function tick(){
    if(!running||raceFinished) return;

    const warn=parseInt(warningSeconds.value)||10;
    const postInterval=parseInt(postStartInterval.value)||1;
    const postRace=parseInt(postRaceDuration.value)||0;
if (prestart) {

    for (const t in signals) {
        const sigTime = parseInt(t);

        // Countdown window
        if (remaining > sigTime && remaining <= sigTime + warn) {
            const cd = remaining - sigTime;
            info.textContent = cd.toString();
            shortBeep();

            // 🔔 LAST countdown second → LONG KLAXON
            if (remaining === sigTime) {
                countdownEndKlaxon();
            }
            break;
        }
    }

    // Signal moment (flag / gun)
    if (signals[remaining]) {
        info.textContent = signals[remaining];
        const mins = remaining / 60;

        if (remaining === 0 || longBeepMinutes.includes(mins)) {
            longBeep();
        }
    }

    time.textContent = formatTime(remaining);
    remaining--;

    if (remaining < 0) {
        prestart = false;
        time.style.color = "darkgreen";
    }
}
 else {
        elapsed++;

        if(postRace>0 && elapsed>=postRace*60){
            document.getElementById("info").textContent="RACE FINISHED";
            document.getElementById("time").textContent=formatTime(elapsed);
            finishKlaxon();
            stopTimer();
            raceFinished=true;
            return;
        }

        if(elapsed%(postInterval*60)===0){
            document.getElementById("info").textContent=`${elapsed/60} min`;
            longBeep();
        } else document.getElementById("info").textContent="";

        document.getElementById("time").textContent=formatTime(elapsed);
    }
}

function formatTime(s){
    return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
}

// =====================
// CONTROLS
// =====================
function startTimer(){
    initAudio();
    updateSignals();
    if(!running){
        running=true;
        timerId=setInterval(tick,tickInterval);
    }
}
function stopTimer(){ running=false; clearInterval(timerId); }
function resetTimer(){
    stopTimer();
    prestart=true; raceFinished=false;
    remaining=(parseInt(startTimeInput.value)||10)*60;
    elapsed=0;
    document.getElementById("time").style.color="navy";
    document.getElementById("time").textContent=formatTime(remaining);
    document.getElementById("info").textContent="";
}

// =====================
// TEST MODE
// =====================
function toggleTestMode(){
    testMode=!testMode;
    tickInterval=testMode?100:1000;
    alert(testMode?"Test mode ON":"Test mode OFF");
    if(running){
        clearInterval(timerId);
        timerId=setInterval(tick,tickInterval);
    }
}
</script>
</body>
</html>
