import Parking from './Parking';
import OddEvenDate from './OddEvenDate';

function App() {
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

export default App;
