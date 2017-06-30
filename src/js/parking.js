var Parking = {
	onOdd: false,
	onEven: false
};

var today = new Date();
var yesterday = new Date(today.getTime());

yesterday.setDate(today.getDate() - 1);

// Determine if `today` is a Fool's Day (odd day preceded by a odd day)
if (today.oddDay() && yesterday.oddDay()) {
	today.foolsDay = true;
}

// Find out which side of the street to park on
if (today.oddDay() && today.getHours() >= 18) {
	Parking.onOdd = true;
}
else if (today.oddDay() && today.getHours() < 18) {
	if (today.foolsDay) {
		Parking.onOdd = true;
	}
	else {
		Parking.onEven = true;
	}
}
else if (today.evenDay() && today.getHours() >= 18) {
	Parking.onEven = true;
}
else if (today.evenDay() && today.getHours() < 18) {
	Parking.onOdd = true;
}
else {
	errorMessage();
}
