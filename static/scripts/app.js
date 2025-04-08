import { Parking } from './parking.js';
import { OddEvenDate } from './odd-even-date.js';

function setupData() {
  const parking = new Parking();

  const today = new OddEvenDate();
  const yesterday = new OddEvenDate(today.getTime());

  yesterday.setDate(today.getDate() - 1);

  // Determine if `today` is a Fool's Day (odd day preceded by a odd day)
  if (today.isOddDay() && yesterday.isOddDay()) {
    today.setFoolsDay();
  }

  const isOrAfterSwitch = today.getHours() >= OddEvenDate.SWITCH_TIME;
  const isBeforeSwitch = today.getHours() < OddEvenDate.SWITCH_TIME;

  // Find out which side of the street to park on
  if (
    (today.isOddDay() && isOrAfterSwitch)
    || (today.isFoolsDay() && isBeforeSwitch)
    || (today.isEvenDay() && isBeforeSwitch)
  ) {
    parking.setOdd();
  }
  else {
    parking.setEven();
  }

  return {
    parking,
    today,
  };
}

function render(data) {
  const { parking, today } = data;
  const currentSide = parking.getSide();

  const timeFrameElement = document.getElementById('time-frame');
  const currentDateElement = document.getElementById('current-date');
  const parkingSideElement = document.getElementById('parking-side');

  const parkingInfoSideElement = document.getElementById('parking-info-side');
  const parkingInfoAddressElement = document.getElementById('parking-info-address');

  document.body.classList.add(`${currentSide}-side`);

  if (timeFrameElement) {
    timeFrameElement.textContent = today.relationToSix();
  }

  if (currentDateElement) {
    currentDateElement.textContent = `${today.getMonthName()} ${today.getName()}`;
  }

  if (parkingSideElement) {
    parkingSideElement.textContent = currentSide;
  }

  if (parkingInfoSideElement) {
    parkingInfoSideElement.textContent = currentSide;
  }

  if (parkingInfoAddressElement) {
    const address = parking.examples.reduce((acc, item, index, array) => {
      if (index === array.length - 1) {
        return acc.concat(`or ${item}`);
      }

      return acc.concat(`${item}, `);
    }, '');
    parkingInfoAddressElement.textContent = address;
  }

  if (today.isFoolsDay()) {
    document.body.classList.add('fools-day');
  }
}

function handleDOMContentLoaded() {
  const data = setupData();

  render(data);
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
