export class GameUI {
  constructor(container, playerOne, playerTwo) {
    this.container = document.querySelector(container);
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  initGame() {
    this.container.innerHTML = '';

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('game-container');

    const playerboard = this.createBoard(this.playerOne);
    playerboard.id = 'player1-board';

    const computerBoard = this.createBoard(this.playerTwo);
    computerBoard.id = 'player2-board';

    boardContainer.append(playerboard, computerBoard);
    this.container.appendChild(boardContainer);

    this.addBoardListeners(this.playerTwo.gameboard);
  }

  createBoard(player) {
    const board = document.createElement('div');
    board.classList.add('gameboard');

    for (let row = 0; row < player.gameboard.size; row++) {
      for (let col = 0; col < player.gameboard.size; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;

        board.append(cell);

        if (
          player.gameboard.board[row][col] === 1 &&
          player.playerType === 'human'
        ) {
          cell.classList.add('ship');
        }
      }
    }

    return board;
  }

  addBoardListeners(enemyGameboard) {
    const board = document.getElementById('player2-board');
    board.addEventListener('click', (event) => {
      const cell = event.target;
      if (cell.classList.contains('cell')) {
        const row = parseInt(cell.dataset.row, 10);
        const col = parseInt(cell.dataset.col, 10);
        const result = enemyGameboard.receiveAttack(row, col);
        this.updateCell(cell, result);
      }
    });
  }

  updateCell(cell, result) {
    if (result.hit) {
      cell.classList.add('hit');
    } else if (result.hit === false) {
      cell.classList.add('miss');
    } else {
      alert(result.message); // Already attacked
    }
  }
}
