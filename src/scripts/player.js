import { Gameboard } from './gameboard';

export class Player {
  constructor(player) {
    this.playerName = player;
    this.playerType = this.isComputer(player);
    this.gameboard = new Gameboard(10);
  }

  isComputer(player) {
    return player === 'computer' ? 'computer' : 'human';
  }

  attack(gameboard, row, col) {
    if (this.playerType === 'computer') {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      return gameboard.receiveAttack(row, col);
    }

    return gameboard.receiveAttack(row, col);
  }
}
