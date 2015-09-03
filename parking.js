// var today = new Date('2/1/2016 18:02:00');
var today = new Date();
var yesterday = new Date(today.getTime());

yesterday.setDate(today.getDate() - 1);

var Calender = {
	foolsDay: false,
	monthArray: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

	monthName: function() {
		return this.monthArray[today.getMonth()];
	},

	dayName: function() {
		var day = today.getDate();
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
	},

	oddDay: function(day) {
		return day.getDate() % 2 === 1;
	},

	evenDay: function(day) {
		return day.getDate() % 2 === 0;
	}
};
var Park = {};

// Determine if `today` is a Fool's Day (odd day preceded by a odd day)
if (Calender.oddDay(today) && Calender.oddDay(yesterday)) {
	Calender.foolsDay = true;
}

// Find out which side of the street to park on
if (Calender.oddDay(today) && today.getHours() >= 18) {
	Park.onOdd = true;
}
else if (Calender.oddDay(today) && today.getHours() < 18) {
	if (Calender.foolsDay) {
		Park.onOdd = true;
	}
	else {
		Park.onEven = true;
	}
}
else if (Calender.evenDay(today) && today.getHours() >= 18) {
	Park.onEven = true;
}
else if (Calender.evenDay(today) && today.getHours() < 18) {
	Park.onOdd = true;
}
else {
	info.textContent = 'Error!'
}