let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCount = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

// Start/Stop Button Functionality
startStopButton.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startStopButton.textContent = 'Pause';
  }
  isRunning = !isRunning;
});

// Lap Button Functionality
lapButton.addEventListener('click', () => {
  if (isRunning) {
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
});

// Reset Button Functionality
resetButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  lapCount = 0;
  display.textContent = '00:00:00';
  lapList.innerHTML = '';
  startStopButton.textContent = 'Start';
});

// Time Update Function
function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

// Format Time (HH:MM:SS)
function formatTime(ms) {
  let hours = Math.floor(ms / (1000 * 60 * 60));
  let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

// Pad Time with Zero if Needed
function padZero(num) {
  return num < 10 ? `0${num}` : num;
}