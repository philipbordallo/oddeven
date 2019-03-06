class OddEvenDate extends Date {
  constructor(...args) {
    super(...args);

    this.foolsDay = false;
  }

  relationToSix() {
    const beforeSix = this.getHours() < OddEvenDate.SWITCH_TIME;
    const afterSix = this.getHours() > OddEvenDate.SWITCH_TIME;
    const isSix = this.getHours() === OddEvenDate.SWITCH_TIME;

    if (beforeSix) {
      return 'before';
    }

    if (afterSix || (isSix && this.getMinutes() > 0)) {
      return 'after';
    }

    return 'and currently';
  }

  getMonthName() {
    return OddEvenDate.MONTH_NAMES[this.getMonth()];
  }

  getName() {
    const day = this.getDate();
    let ending = '';

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
  }

  isOddDay() {
    return this.getDate() % 2 === 1;
  }

  isEvenDay() {
    return this.getDate() % 2 === 0;
  }

  setFoolsDay() {
    this.foolsDay = true;
  }

  isFoolsDay() {
    return this.foolsDay;
  }
}
OddEvenDate.SWITCH_TIME = 18; // 6pm
OddEvenDate.MONTH_NAMES = [
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
  'December',
];

export default OddEvenDate;
