const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#stop");
const pauseButton = document.querySelector("#pause");
const workTimeElement = document.querySelector("#work");
const breakTimeElement = document.querySelector("#break");
const timerElement = document.querySelector("#timer");

let running = false;
let currentMode = "work";
let workSessionTime = Number(workTimeElement.value) * 60;
let breakSessionTime = Number(breakTimeElement.value) * 60;
let initialTime = currentMode === "work" ? workSessionTime : breakSessionTime;
let currentTime = initialTime;
let t;

timerElement.textContent = `00:${workSessionTime / 60}:00`;

startButton.addEventListener("click", () => toggleClock());
pauseButton.addEventListener("click", () => toggleClock());
resetButton.addEventListener("click", () => resetClock());

const timer = _ => {
	showTime(currentTime);
	t = setInterval(_ => {
		if (currentTime === 0) {
			alert("Time is up!");
			clearInterval(t);
			running = false;
			initialTime =
				currentMode === "work" ? breakSessionTime : workSessionTime;
			currentMode = currentMode === "work" ? "break" : "work";
			currentTime = initialTime;
		} else currentTime--;
		showTime(currentTime);
	}, 1000);
};

const toggleClock = () => {
	if (running) {
		running = false;
		clearInterval(t);
	} else {
		running = true;
		timer();
	}
};

const resetClock = () => {
	running = false;
	clearInterval(t);
	currentTime = initialTime;
	showTime(currentTime);
};

const showTime = total => {
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor((total - hours * 3600) / 60);
	const seconds = total - (hours * 3600 + minutes * 60);
	const addDigit = time => (time < 10 ? `0${time}` : time);

	const time = `${addDigit(hours)}:${addDigit(minutes)}:${addDigit(seconds)}`;
	timerElement.textContent = time;
};
