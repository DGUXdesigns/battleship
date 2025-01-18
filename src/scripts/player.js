import { Gameboard } from './gameboard';

export class Player {
  constructor(player) {
    this.playerName = this.capitalize(player);
    this.playerType = this.isComputer(player);
    this.gameboard = new Gameboard(10);
  }

  isComputer(player) {
    return player === 'computer' ? 'computer' : 'human';
  }

  attack(gameboard, row, col) {
    if (this.playerType === 'computer') {
      console.log('computer is attacking');
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);

      const attackResult = gameboard.receiveAttack(row, col);

      if (attackResult.hit === null) {
        console.log('attacking again');
        this.attack(gameboard, row, col);
        return;
      }
    }

    return gameboard.receiveAttack(row, col);
  }

  capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
