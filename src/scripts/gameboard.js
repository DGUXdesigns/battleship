export class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = this.buildBoard(this.size);
  }

  buildBoard(size) {
    let board = [];

    for (let i = 0; i < size; i++) {
      board[i] = Array(size).fill(0);
    }

    return board;
  }

  placeShipHorizontal(ship, row, col) {
    for (let i = 0; i < ship.length; i++) {
      this.board[row][col + i] = 1;
    }
  }

  placeShipVertical(ship, row, col) {
    for (let i = 0; i < ship.length; i++) {
      this.board[row + i][col] = 1;
    }
  }
}
