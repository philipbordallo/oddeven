var today = new Date('2/1/2016 18:02:00');
// var today = new Date();
var yesterday = new Date(today.getTime());

yesterday.setDate(today.getDate() - 1);

Date.prototype.foolsDay = false;
Date.prototype.monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

Date.prototype.getMonthName = function() {
	return this.monthArray[this.getMonth()];
};

Date.prototype.getName = function() {
	var day = this.getDate();
	var ending;

	if (day === 1 || day === 21 || day === 31) {
		ending = 'st'
	}
	else if (day === 2 || day === 22) {
		ending = 'nd'
	}
	else if (day === 3 || day === 23) {
		ending = 'rd'
	}
	else {
		ending = 'th'
	}

	return day + ending;
};

Date.prototype.oddDay = function() {
	return this.getDate() % 2 === 1;
}

Date.prototype.evenDay = function() {
	return this.getDate() % 2 === 0;
}

var Park = {};

// Determine if `today` is a Fool's Day (odd day preceded by a odd day)
if (today.oddDay() && yesterday.oddDay()) {
	today.foolsDay = true;
}

// Find out which side of the street to park on
if (today.oddDay() && today.getHours() >= 18) {
	Park.onOdd = true;
}
else if (today.oddDay() && today.getHours() < 18) {
	if (today.foolsDay) {
		Park.onOdd = true;
	}
	else {
		Park.onEven = true;
	}
}
else if (today.evenDay() && today.getHours() >= 18) {
	Park.onEven = true;
}
else if (today.evenDay() && today.getHours() < 18) {
	Park.onOdd = true;
}
else {
	info.textContent = 'Error!'
}