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
        padding: 20px;
        transition: background 0.05s linear;
    }
    #time { font-size:72px; margin:30px 0; color:navy; }
    #info { font-size:22px; height:30px; }
    button, input { font-size:18px; padding:10px; margin:5px; }
    input { width: 90px; text-align:center; }
    #hiddenTest { font-size:10px; opacity:0.1; border:none; cursor:pointer; }
</style>
</head>
<body>

<h1 id="title">Sailing Race Timer</h1>

<div>
    Start time (minutes):
    <input type="number" id="startTimeInput" value="10" min="1">
</div>

<div>
    Pre-start minutes (comma-separated):
    <input type="text" id="prestartInput" value="10,5,4,1">
</div>

<div>
    Post-start interval (minutes):
    <input type="number" id="postStartInterval" value="1" min="1">
</div>

<div>
    10-second warning duration (seconds):
    <input type="number" id="warningSeconds" value="10" min="1" max="30">
</div>

<div id="time">10:00</div>
<div id="info"></div>

<button onclick="startTimer()">Start</button>
<button onclick="stopTimer()">Stop</button>
<button onclick="resetTimer()">Reset</button>
<button id="flashToggleBtn" onclick="toggleFlash()">Flash: ON</button>

<button id="hiddenTest" onclick="toggleTestMode()">Test Mode</button>

<script>
// ================= STATE =================
let running=false, prestart=true;
let remaining=600, elapsed=0;
let timerId=null, tickInterval=1000;
let flashEnabled=true, testMode=false;
let signals={0:"START"};

let audioCtx=null;
let vibrationUnlocked=false;

// ================= AUDIO =================
function initAudio(){
    if(!audioCtx){
        audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    }
    if(audioCtx.state==="suspended") audioCtx.resume();
}

// ANDROID vibration must be unlocked by user gesture
function unlockVibration(){
    if(navigator.vibrate){
        navigator.vibrate(1);
        vibrationUnlocked = true;
    }
}

function playSiren(duration=1){
    if(!audioCtx) return;

    const now = audioCtx.currentTime;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = "square";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(600, now);
    osc1.frequency.linearRampToValueAtTime(1200, now + duration/2);
    osc1.frequency.linearRampToValueAtTime(600, now + duration);

    osc2.frequency.value = 1000;

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);

    flashScreen(duration*1000);

    // Android vibration (pattern is stronger)
    if(vibrationUnlocked && navigator.vibrate){
        navigator.vibrate([200,100,200,100,200]);
    }
}

function shortBeep(){ playSiren(0.3); }
function longBeep(){ playSiren(1.0); }

// ================= FLASH =================
function flashScreen(ms){
    if(!flashEnabled) return;
    const original = document.body.style.background;
    const colors = ["#ff0","#f00","#fff"];
    let step = 0;
    const interval = 80;
    const flashes = Math.floor(ms/interval);

    const f = setInterval(()=>{
        document.body.style.background = colors[step % colors.length];
        step++;
        if(step >= flashes){
            clearInterval(f);
            document.body.style.background = original;
        }
    }, interval);
}

function toggleFlash(){
    flashEnabled = !flashEnabled;
    document.getElementById("flashToggleBtn").textContent =
        flashEnabled ? "Flash: ON" : "Flash: OFF";
}

// ================= TIMER =================
function updateSignals(){
    const mins = document.getElementById("prestartInput").value
        .split(",").map(x=>parseInt(x.trim())).filter(x=>x>0);
    signals = {};
    mins.forEach(m=>signals[m*60]=`${m} min`);
    signals[0]="START";
}

function tick(){
    if(!running) return;

    const info = document.getElementById("info");
    const warn = parseInt(document.getElementById("warningSeconds").value)||10;
    const post = parseInt(document.getElementById("postStartInterval").value)||1;

    if(prestart){
        if(signals[remaining-warn]){
            info.textContent = `${warn} second warning`;
            shortBeep();
        }
        if(signals[remaining]){
            info.textContent = signals[remaining];
            longBeep();
            if(remaining===0){
                prestart=false;
                document.getElementById("time").style.color="darkgreen";
                return;
            }
        }
        remaining--;
        document.getElementById("time").textContent = formatTime(remaining);
    } else {
        elapsed++;
        if(elapsed%(post*60)===(post*60-warn)){
            info.textContent=`${warn} seconds`;
            shortBeep();
        }
        if(elapsed%(post*60)===0){
            info.textContent=`${elapsed/post} min`;
            longBeep();
        }
        document.getElementById("time").textContent = formatTime(elapsed);
    }
}

function formatTime(s){
    return String(Math.floor(s/60)).padStart(2,"0")+":"+
           String(s%60).padStart(2,"0");
}

// ================= CONTROLS =================
function startTimer(){
    initAudio();
    unlockVibration();      // 🔑 THIS FIXES ANDROID
    updateSignals();
    if(!running){
        running=true;
        timerId=setInterval(tick,tickInterval);
    }
}

function stopTimer(){
    running=false;
    clearInterval(timerId);
}

function resetTimer(){
    stopTimer();
    prestart=true;
    elapsed=0;
    const startMin=parseInt(document.getElementById("startTimeInput").value)||10;
    remaining=startMin*60;
    document.getElementById("time").textContent=formatTime(remaining);
    document.getElementById("time").style.color="navy";
    document.getElementById("info").textContent="";
}

// ================= TEST MODE =================
function toggleTestMode(){
    testMode=!testMode;
    tickInterval = testMode ? 100 : 1000;
    alert(testMode ? "Test mode ON (10× speed)" : "Test mode OFF");
    if(running){
        clearInterval(timerId);
        timerId=setInterval(tick,tickInterval);
    }
}

// reveal test button
let clicks=0;
document.getElementById("title").onclick=()=>{
    if(++clicks>=5){
        document.getElementById("hiddenTest").style.opacity=0.6;
        document.getElementById("hiddenTest").style.fontSize="14px";
        clicks=0;
    }
};
</script>
</body>
</html>
