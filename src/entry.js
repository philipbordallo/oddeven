import App from './scripts/App';

import 'stylesheets/base';
import 'stylesheets/app';


function handleDOMContentLoaded() {
  const { parking, today } = App();

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
    const capitalSide = `${currentSide.charAt(0).toUpperCase()}${currentSide.slice(1)}`;
    parkingInfoSideElement.textContent = capitalSide;
  }

  if (parkingInfoAddressElement) {
    // eslint-disable-next-line max-params
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

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
