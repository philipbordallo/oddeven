export class Parking {
  constructor() {
    this.currentSide = '';
    this.examples = [];
  }

  setOdd() {
    this.currentSide = 'odd';
    this.examples = ['1039', '215', '877'];
  }

  setEven() {
    this.currentSide = 'even';
    this.examples = ['1024', '312', '658'];
  }

  getSide() {
    return this.currentSide;
  }
}
