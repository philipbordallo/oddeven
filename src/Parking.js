class Parking {
  constructor() {
    this.currentSide = '';
  }

  setOdd() {
    this.currentSide = 'odd';
  }

  setEven() {
    this.currentSide = 'even';
  }

  getSide() {
    return this.currentSide;
  }
}

export default Parking;
