var today = new Date();
var yesterday = new Date(today.getTime());

yesterday.setDate(today.getDate() - 1);

// Set whether it is a `foolsDay` (two odd days in a row) or not
Date.prototype.foolsDay = false;

// Determine if its before, after or currently 6pm
Date.prototype.relationToSix = function() {
	if (today.getHours() < 18) {
		return 'before';
	}
	else if (today.getHours() > 18 || today.getHours() === 18 && today.getMinutes() > 0) {
		return 'after';
	}
	else if (today.getHours() === 18 && today.getMinutes() === 0) {
		return 'and currently';
	}
};

// Month names
Date.prototype.monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Get the Month name
Date.prototype.getMonthName = function() {
	return this.monthArray[this.getMonth()];
};

// Get the day with its ordinal ending
Date.prototype.getName = function() {
	var day = this.getDate();
		var ending;

		if (day === 1 || day === 21 || day === 31) {
			ending = 'st';
		}
		else if (day === 2 || day === 22) {
			ending = 'nd';
		}
		else if (day === 3 || day === 23) {
			ending = 'rd';
		}
		else {
			ending = 'th';
		}

		return day + ending;
};

// Returns `true` if day is odd
Date.prototype.oddDay = function() {
	return this.getDate() % 2 === 1;
};

// Returns `true` if day is even
Date.prototype.evenDay = function() {
	return this.getDate() % 2 === 0;
};

var parking = {};

// Determine if `today` is a Fool's Day (odd day preceded by a odd day)
if (today.oddDay() && yesterday.oddDay()) {
	today.foolsDay = true;
}

// Find out which side of the street to park on
if (today.oddDay() && today.getHours() >= 18) {
	parking.onOdd = true;
}
else if (today.oddDay() && today.getHours() < 18) {
	if (today.foolsDay) {
		parking.onOdd = true;
	}
	else {
		parking.onEven = true;
	}
}
else if (today.evenDay() && today.getHours() >= 18) {
	parking.onEven = true;
}
else if (today.evenDay() && today.getHours() < 18) {
	parking.onOdd = true;
}
else {
	errorMessage();
}
