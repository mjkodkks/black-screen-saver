const brightnessRange = document.getElementById('brightness');
const bg = document.getElementById('bg');
const container = document.getElementById('container');
const svg = document.getElementById('svg');
const body = document.documentElement;
const fullScreen = document.getElementById('fullScreen');
const wordEnter = document.getElementById('wordEnter');
const wordExit = document.getElementById('wordExit');
const expand = document.getElementById('expand');
const close = document.getElementById('close');

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
const inactivityTime = () => {
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
};

function toolLeave() {
    brightnessRange.classList.remove("fade-in");
    brightnessRange.classList.add("fade-out");
    fullScreen.classList.remove("fade-in");
    fullScreen.classList.add("fade-out");

    setTimeout(() => {
        brightnessRange.style.display = 'flex'
        fullScreen.style.display = 'flex'
    }, 300)
}

function resetTimer() {
    clearTimeout(time);
    brightnessRange.classList.remove("fade-out");
    fullScreen.classList.remove("fade-out");
    brightnessRange.classList.add("fade-in");
    fullScreen.classList.add("fade-in");
    brightnessRange.style.display = 'flex'
    fullScreen.style.display = 'flex'

    time = setTimeout(toolLeave, 3000)
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
