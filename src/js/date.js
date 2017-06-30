// Set whether it is a `foolsDay` (two odd days in a row) or not
Date.prototype.foolsDay = false;

// Determine if its before, after or currently 6pm
Date.prototype.relationToSix = function() {
	if (this.getHours() < 18) {
		return 'before';
	}
	else if (this.getHours() > 18 || this.getHours() === 18 && this.getMinutes() > 0) {
		return 'after';
	}
	else if (this.getHours() === 18 && this.getMinutes() === 0) {
		return 'and currently';
	}
};

// Month names
Date.prototype.monthArray = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

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
