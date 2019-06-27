// Get elements
const player		= document.querySelector('.player');
const video			= document.querySelector('.viewer');
const progress		= document.querySelector('.progress');
const progressBar	= document.querySelector('.progress__filled');
const toggle		= document.querySelector('.toggle');
const skipButtons	= document.querySelectorAll('[data-skip]');
const ranges		= document.querySelectorAll('.player__slider');
const fullscreen	= document.querySelector('[data-fullscreen]');

// build out functions

function togglePlay () {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updateButton (e) {
	const icon = this.paused ? '►' : '❚❚';
	toggle.textContent = icon;
}

function skip () {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate () {
	video[this.name] = this.value;
}

function handleProgress () {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function goFullscreen () {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.mozRequestFullScreen) { /* Firefox */
		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		video.webkitRequestFullscreen();
	} else if (video.msRequestFullscreen) { /* IE/Edge */
		video.msRequestFullscreen();
	}
}

// Hook up the event listener
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', goFullscreen);
