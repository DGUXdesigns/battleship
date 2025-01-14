export class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = this.buildBoard(this.size);
    this.ships = [];
  }

  buildBoard(size) {
    let board = [];

    for (let i = 0; i < size; i++) {
      board[i] = Array(size).fill(0);
    }

    return board;
  }

  placeShip(ship, row, col, direction) {
    if (direction === 'horizontal') {
      if (col + ship.length > this.size) {
        throw new Error('Cannot place ship here');
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col + i] === 1) {
          throw new Error('Ships cannot overlap');
        }

        this.board[row][col + i] = 1;
      }
    } else {
      if (row + ship.length > this.size) {
        throw new Error('Cannot place ship here');
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][col] === 1) {
          throw new Error('Ships cannot overlap');
        }

        this.board[row + i][col] = 1;
      }
    }

    this.ships.push(ship);
  }
}
