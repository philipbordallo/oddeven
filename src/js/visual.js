var timeFrame = document.getElementById('time-frame');
var currentDate = document.getElementById('current-date');
var parkingSide = document.getElementById('parking-side');

timeFrame.textContent = today.relationToSix();
currentDate.textContent = today.getMonthName() + ' ' + today.getName();

if (today.foolsDay) {
	document.body.classList.add('fools-day');
}

if (parking.onOdd) {
	document.body.classList.add('odd-side');
	parkingSide.textContent = 'odd';
}
else if (parking.onEven) {
	document.body.classList.add('even-side');
	parkingSide.textContent = 'even';
}
else {
	errorMessage();
}
