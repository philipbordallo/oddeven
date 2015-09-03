var date = document.getElementById('date');
var info = document.getElementById('info');

// Show the data!
date.textContent = 'Today is ' + Calender.monthName() + ' ' + Calender.dayName();

if (Calender.foolsDay) {
	info.textContent += 'Two odd days in a row, Happy Fool’s day! ';
	info.textContent += 'You don’t need to move your car ';
}

if (Park.onOdd) {
	info.textContent += 'Odd Address Side';
}
else if (Park.onEven) {
	info.textContent += 'Even Address Side';
}
else {
	info.textContent = 'Error!'
}