let startTime, elapsedTime = 0, intervalId, lapTimes = [];

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTimer, 10);
    updateControls(true, false, false);
}

function stopTimer() {
    clearInterval(intervalId);
    updateControls(false, true, true);
}

function resetTimer() {
    clearInterval(intervalId);
    elapsedTime = 0;
    updateTimer();
    lapTimes = [];
    lapList.innerHTML = '';
    updateControls(true, false, false);
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    millisecondsEl.textContent = pad(milliseconds, 2);
    secondsEl.textContent = pad(seconds, 2);
    minutesEl.textContent = pad(minutes, 2);
}

function recordLap() {
    const lapTime = elapsedTime;
    lapTimes.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapList.appendChild(lapItem);
}

function pad(number, length) {
    return String(number).padStart(length, '0');
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 2)}`;
}

function updateControls(startEnabled, stopEnabled, resetEnabled) {
    startBtn.disabled = !startEnabled;
    stopBtn.disabled = !stopEnabled;
    resetBtn.disabled = !resetEnabled;
    lapBtn.disabled = !stopEnabled;
}