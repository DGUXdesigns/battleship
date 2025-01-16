import { Ship } from './ship';

export class GameController {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;

    this.startGame();
  }

  // TODO: render player gameboard
  startGame() {
    //TODO: Iplement system for allowing players to place their ships
    const ships = [
      { name: 'Carrier', length: 5, row: 2, col: 2, direction: 'vertical' },
      {
        name: 'Battleship',
        length: 4,
        row: 0,
        col: 0,
        direction: 'horizontal',
      },
      { name: 'Cruiser', length: 3, row: 2, col: 7, direction: 'vertical' },
      { name: 'Submarine', length: 3, row: 8, col: 1, direction: 'horizontal' },
      { name: 'Destroyer', length: 2, row: 7, col: 5, direction: 'horizontal' },
    ];

    this.populateShips(this.playerOne, ships);
    this.populateShips(this.playerTwo, ships);
  }

  populateShips(player, ships) {
    ships.forEach(({ name, length, row, col, direction }) => {
      const ship = new Ship(name, length);
      player.gameboard.placeShip(ship, row, col, direction);
    });
  }
}
