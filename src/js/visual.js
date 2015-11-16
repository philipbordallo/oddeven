var body = document.body;
var timeFrame = document.getElementById('time-frame');
var currentDate = document.getElementById('current-date');
var parkingSide = document.getElementById('parking-side');

timeFrame.textContent = today.relationToSix();
currentDate.textContent = today.getMonthName() + ' ' + today.getName();

if (today.foolsDay) {
	body.classList.add('fools-day');
}

if (parking.onOdd) {
	body.classList.add('odd-side');
	parkingSide.textContent = 'odd';
}
else if (parking.onEven) {
	body.classList.add('even-side');
	parkingSide.textContent = 'even';
}
else {
	errorMessage();
}

function errorMessage() {
	var element = document.getElementById('main');

	element.textContent = 'Hmm looks like there was an error.';
}
