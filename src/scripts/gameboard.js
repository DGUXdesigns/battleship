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
}
