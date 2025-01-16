export class GameUI {
  constructor(container, playerOne, playerTwo) {
    this.container = document.querySelector(container);
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  renderUI() {
    this.container.innerHTML = '';

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('game-container');
    const playerboard = this.createBoard(this.playerOne.gameboard);
    const computerBoard = this.createBoard(this.playerTwo.gameboard);

    boardContainer.append(playerboard, computerBoard);
    this.container.appendChild(boardContainer);
  }

  createBoard(gameboard) {
    const board = document.createElement('div');
    board.classList.add('gameboard');

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;

        board.append(cell);

        if (gameboard.board[row][col] === 1) {
          cell.classList.add('ship');
        }
      }
    }

    return board;
  }
}
