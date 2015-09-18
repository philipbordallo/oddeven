var body = document.body;
var currentDate = document.getElementById('current-date');
var parkingSide = document.getElementById('parking-side');

currentDate.textContent = today.monthName() + ' ' + today.dayName();

if (today.foolsDay) {
	body.classList.add('fools-day');
}

if (Park.onOdd) {
	body.classList.add('odd-side');
	parkingSide.textContent = 'odd';
}
else if (Park.onEven) {
	body.classList.add('even-side');
	parkingSide.textContent = 'even';
}
else {
	errorMessage();
}