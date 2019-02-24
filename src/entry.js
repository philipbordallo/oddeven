import App from './App';

function handleDOMContentLoaded() {
  const { parking, today } = App();

  const timeFrameElement = document.getElementById('time-frame');
  const currentDateElement = document.getElementById('current-date');
  const parkingSideElement = document.getElementById('parking-side');

  if (timeFrameElement) {
    timeFrameElement.textContent = today.relationToSix();
  }

  if (currentDateElement) {
    currentDateElement.textContent = `${today.getMonthName()} ${today.getName()}`;
  }

  if (parkingSideElement) {
    const currentSide = parking.getSide();
    document.body.classList.add(`${currentSide}-side`);
    parkingSideElement.textContent = currentSide;
  }

  if (today.isFoolsDay()) {
    document.body.classList.add('fools-day');
  }
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
