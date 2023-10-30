const brightnessRange = document.getElementById('brightness');
const bg = document.getElementById('bg');
const container = document.getElementById('container');
const svg = document.getElementById('svg');
const body = document.documentElement;
const fullScreen = document.getElementById('fullScreen');
const delayDisplay = document.getElementById('delayDisplay');
const wordEnter = document.getElementById('wordEnter');
const wordExit = document.getElementById('wordExit');
const expand = document.getElementById('expand');
const close = document.getElementById('close');
const DELAY_TIME = 3000

window.onload = function () {
    resetTimer()
    inactivityTime();
    wordEnter.style.display = 'flex';
    wordExit.style.display = 'none';
    expand.style.display = 'flex';
    close.style.display = 'none';

}

function setFullBright() {
    bg.style.opacity = 0;
    svg.style.filter = `invert(0)`;
    brightness.value = 100;
    fullScreen.style.filter = `invert(0)`;
}

function requestFullScreen(element) {
    console.log('in requestFullScreen')
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) {
        requestMethod.call(element);
        wordEnter.style.display = 'none';
        wordExit.style.display = 'flex';
        expand.style.display = 'none';
        close.style.display = 'flex';
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function closeFullscreen(element) {
    console.log('in closeFullscreen')
    var requestMethod = element.exitFullscreen || element.webkitExitFullscreen || element.mozExitFullscreen || element.msExitFullscreen;
    console.log(requestMethod);
    if (requestMethod) {
        requestMethod.call(element);
        wordEnter.style.display = 'flex';
        wordExit.style.display = 'none';
        expand.style.display = 'flex';
        close.style.display = 'none';
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

brightness.oninput = (e) => {
    const rangeInput = e.target.value;
    bg.style.opacity = 1 - (+rangeInput / 100);
    svg.style.filter = `invert(${1 - (+rangeInput / 100)}`;
    fullScreen.style.filter = `invert(${1 - (+rangeInput / 100)}`;
}


let time;
let delayNumberInterval;
let delayNumber = DELAY_TIME / 1000
const inactivityTime = () => {
    // DOM Events
    document.onmousemove = throttle(resetTimer);
    document.onkeypress =  throttle(resetTimer);
};

function toolLeave() {
    brightnessRange.classList.remove("fade-in");
    brightnessRange.classList.add("fade-out");
    fullScreen.classList.remove("fade-in");
    fullScreen.classList.add("fade-out");

    delayDisplay.classList.remove("fade-in");
    delayDisplay.classList.add("fade-out");

    setTimeout(() => {
        brightnessRange.style.display = 'flex'
        fullScreen.style.display = 'flex'
        delayDisplay.style.display = 'flex'
    }, 300)
}

function resetTimer() {
    console.log('reset timer')
    clearTimeout(time);
    clearInterval(delayNumberInterval)

    delayDisplay.classList.remove("fade-out");
    delayDisplay.classList.add("fade-in");
    delayNumber = DELAY_TIME / 1000
    delayDisplay.innerHTML = templateDelay(delayNumber)

    brightnessRange.classList.remove("fade-out");
    fullScreen.classList.remove("fade-out");
    brightnessRange.classList.add("fade-in");
    fullScreen.classList.add("fade-in");


    brightnessRange.style.display = 'flex'
    fullScreen.style.display = 'flex'
    delayDisplay.style.display = 'flex'
    delayNumberInterval = setInterval(()=> {
        delayDisplay.innerHTML = delayNumber > 0 ?  templateDelay(delayNumber -= 1) : '1'
    }, 1000)
    time = setTimeout(toolLeave, DELAY_TIME)
}

const templateDelay = (txt) => `Screen will sleep in ${txt}`


function throttle(mainFunction, delay = 2000) {
    let timerFlag = null; // Variable to keep track of the timer
  
    // Returning a throttled version 
    return (...args) => {
      if (timerFlag === null) { // If there is no timer currently running
        mainFunction(...args); // Execute the main function 
        timerFlag = setTimeout(() => { // Set a timer to clear the timerFlag after the specified delay
          timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
        }, delay);
      }
    };
  }


svg.onclick = () => {
    setFullBright();
}

wordEnter.onclick = () => {
    requestFullScreen(body);
}

wordExit.onclick = () => {
    closeFullscreen(document);
}
expand.onclick = () => {
    requestFullScreen(body);
}

close.onclick = () => {
    closeFullscreen(document);
}
