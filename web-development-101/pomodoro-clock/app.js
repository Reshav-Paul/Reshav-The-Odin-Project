let timeSelectionIncrementer = element => 
    element.textContent = parseInt(element.textContent) + 1;
let timeSelectionDecrementer = element => 
    element.textContent = parseInt(element.textContent) - 1;

let startClock = function() {
    if(clockState === clockStates.running)
        return;
    if(clockState === clockStates.stopped){
        m = mSession = parseInt(sessionTime.textContent);
        s = sSession = 0;
        mBreak = parseInt(breakTime.textContent);
        sBreak = 0;
        currentActivityDisplay.textContent = 'Session';
    }
    clockState = clockStates.running;
    intervalId = window.setInterval(decrementTime, 1000);
}

let decrementTime = function() {
    console.log('clock running');
    if(m === 0 && s === 0) {
        if(currentAction === actions.session) {
            currentAction = actions.break;
            m = mBreak;
            currentActivityDisplay.textContent = 'Break';
        } else {
            currentAction = actions.session;
            m = mSession;
            currentActivityDisplay.textContent = 'Session';
        }
    }
    --s;
    if(s < 0) {
        --m;
        s += 60;
    }
    timeDisplay.textContent = getTimeString();
}

let getTimeString = function () {
    if(m < 10 && s < 10)
        return `0${m}:0${s}`;
    if(m < 10)
        return `0${m}:${s}`;
    if(s < 10)
        return `${m}:0${s}`;
    return `${m}:${s}`;
}

let pauseClock = function () {
    if(clockState === clockStates.paused)
        return;
    window.clearInterval(intervalId);
    clockState = clockStates.paused;
}

let stopClock = function () {
    if(clockState === clockStates.stopped)
        return;
    window.clearInterval(intervalId);
    clockState = clockStates.stopped;
    refreshValues();
}

let resetClock = function() {
    if(clockState === clockStates.running)
        window.clearInterval(intervalId);
    mSession = 25;
    mBreak = 5;
    refreshValues();
    clockState = clockStates.stopped;
}

let refreshValues = function() {
    m = mSession;
    s = 0;
    currentActivityDisplay.textContent = 'Session';
    currentAction = actions.session;
    timeDisplay.textContent = getTimeString();
    sessionTime.textContent = mSession;
    breakTime.textContent = mBreak;
}

let actions = Object.freeze({'session': 1, 'break': 2});
let clockStates = Object.freeze({'running': 0, 'paused': 1, 'stopped': -1});
let currentAction = actions.session;
let mSession = 25;
let mBreak = 5;
let m = 25;
let s = 0;
let intervalId;
let clockState = clockStates.stopped;

// Time Selection Handlers
const sessionTimeInc = document.querySelector('#session-time-setter > .fa-chevron-up');
const sessionTimeDec = document.querySelector('#session-time-setter > .fa-chevron-down');
const sessionTime = document.getElementById('session-time');

// Session Time Change Handlers
sessionTimeInc.addEventListener('click', e => {
    if(clockState !== clockStates.stopped)  return;
    timeSelectionIncrementer(sessionTime);
    timeDisplay.textContent = sessionTime.textContent + ':00'
});

sessionTimeDec.addEventListener('click', e => {
    if(clockState !== clockStates.stopped)  return;
    parseInt(sessionTime.textContent) > 1 && timeSelectionDecrementer(sessionTime);
    timeDisplay.textContent = sessionTime.textContent + ':00'
});

const breakTimeInc = document.querySelector('#break-time-setter > .fa-chevron-up');
const breakTimeDec = document.querySelector('#break-time-setter > .fa-chevron-down');
const breakTime = document.getElementById('break-time');

// Break Time Change Handlers
breakTimeInc.addEventListener('click', e => clockState === clockStates.stopped &&
    timeSelectionIncrementer(breakTime));

breakTimeDec.addEventListener('click', e => clockState === clockStates.stopped && 
    parseInt(breakTime.textContent) > 1 && timeSelectionDecrementer(breakTime));

const timeDisplay = document.getElementById('time-display');
const currentActivityDisplay = document.getElementById('current-activity');

// Clock control button handlers
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

startButton.addEventListener('click', startClock);
pauseButton.addEventListener('click', pauseClock);
stopButton.addEventListener('click', stopClock);
resetButton.addEventListener('click', resetClock);


//theme toggling
lightButton = document.getElementById('light')
darkButton = document.getElementById('dark');

lightButton.addEventListener('click', () => {
    document.querySelector('body').classList.replace('dark', 'light');
    localStorage.setItem('theme', 'light');
});

darkButton.addEventListener('click', () => {
    document.querySelector('body').classList.replace('light', 'dark')
    localStorage.setItem('theme', 'dark');
});

//theme local storage
const theme = localStorage.getItem('theme');
if(theme) {
    document.querySelector('body').classList.add(theme);
}