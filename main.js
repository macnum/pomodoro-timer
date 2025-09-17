const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const output = document.querySelector('.output');

let intervalId;
let duration = 0; // countdown seconds
let isIntervalRunning = false;
let initialDuration = 0; // store original input

function Pomodoro() {
	const setDuration = () => {
		const minutes = parseInt(prompt('Enter amount of minutes:'), 10);
		return minutes * 60;
	};

	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		const h = hours > 0 ? String(hours).padStart(2, '0') : '00';
		const m = String(minutes).padStart(2, '0');
		const s = String(remainingSeconds).padStart(2, '0');

		return `${h}:${m}:${s}`;
	};

	const startInterval = () => {
		if (!isIntervalRunning) {
			if (duration <= 0) {
				duration = setDuration();
				initialDuration = duration;
			}
			isIntervalRunning = true;

			intervalId = setInterval(() => {
				if (duration > 0) {
					duration -= 1;
					output.textContent = formatTime(duration);
				} else {
					clearInterval(intervalId);
					isIntervalRunning = false;
					alert("⏰ Time's up!");
				}
			}, 1000);
		}
	};

	function startTimer() {
		startInterval();
	}

	function stopTimer() {
		isIntervalRunning = false;
		clearInterval(intervalId);
	}

	function resetTimer() {
		isIntervalRunning = false;
		clearInterval(intervalId);
		duration = initialDuration;
		output.textContent = formatTime(duration);
	}

	stopBtn.addEventListener('click', stopTimer);
	startBtn.addEventListener('click', startTimer);
	resetBtn.addEventListener('click', resetTimer);
}

window.addEventListener('DOMContentLoaded', Pomodoro);
