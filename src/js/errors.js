function errorMessage() {
	var element = document.getElementById('main');
	var message = 'Hmm looks like there was an error.';

	element.textContent = message;
	throw new Error(message);
}
