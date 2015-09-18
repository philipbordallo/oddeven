var body = document.body;
var currentDate = document.getElementById('current-date');
var parkingSide = document.getElementById('parking-side');

currentDate.textContent = Calender.monthName() + ' ' + Calender.dayName();

if (Calender.foolsDay) {
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