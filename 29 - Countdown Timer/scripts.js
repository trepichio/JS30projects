const buttons = document.querySelectorAll('.timer__controls button');
const customForm = document.querySelector('#custom');
const display = document.querySelector('.display');
const displayEndTime = display.querySelector('.display__end-time');
const displayTimeLeft = display.querySelector('.display__time-left');
customForm.autocomplete = "off";

let timer;

buttons.forEach(button => {
	button.addEventListener('click', () => setTimer(button.dataset.time));
});

customForm.addEventListener('submit',(e) => {
	e.preventDefault();
	const seconds = Math.round(e.target.minutes.value * 60);
	setTimer(seconds);
	e.target.reset();
});

function setTimer (seconds) {
	clearInterval(timer);
	displayTimeLeft.classList.remove('display-red');
	let time = seconds;
	displayEndTime.textContent = displayTime(time);
	timer = setInterval(() => {
		displayTimeLeft.textContent = displayTime(time);
		time <= 10 && (displayTimeLeft.classList.add('display-red'));
		(time -= 1) <= -1 && clearInterval(timer);
	},1000);
}

function displayTime(time) {
	let hours	= Math.floor(time / 3600).toString().padStart(2,'0');
	let minutes	= Math.floor(time % 3600 / 60).toString().padStart(2,'0');
	let seconds	= Math.round(time % 3600 % 60).toString().padStart(2,'0');
	return `${hours}:${minutes}:${seconds}`;
}