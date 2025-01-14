export class Gameboard {
  constructor(size) {
    this.size = size;
    this.board = this.buildBoard(this.size);
    this.ships = [];
    this.attackedLocations = [];
  }

  buildBoard(size) {
    let board = [];

    for (let i = 0; i < size; i++) {
      board[i] = Array(size).fill(0);
    }

    return board;
  }

  placeShip(ship, row, col, direction) {
    if (!this.isValidPlacement(ship, row, col, direction)) {
      throw new Error('Cannot place ship here');
    }

    if (this.isOverlapping(ship, row, col, direction)) {
      throw new Error('Ships cannot overlap');
    }

    ship.location = [];

    for (let i = 0; i < ship.length; i++) {
      const currentRow = direction === 'horizontal' ? row : row + i;
      const currentCol = direction === 'horizontal' ? col + i : col;

      this.board[currentRow][currentCol] = 1;
      ship.location.push({ row: currentRow, col: currentCol });
    }

    this.ships.push(ship);
  }

  isValidPlacement(ship, row, col, direction) {
    if (direction === 'horizontal' && col + ship.length > this.size) {
      return false;
    }
    if (direction === 'vertical' && row + ship.length > this.size) {
      return false;
    }
    return true;
  }

  isOverlapping(ship, row, col, direction) {
    for (let i = 0; i < ship.length; i++) {
      const currentRow = direction === 'horizontal' ? row : row + i;
      const currentCol = direction === 'horizontal' ? col + i : col;

      if (this.board[currentRow][currentCol] === 1) {
        return true;
      }
    }
    return false;
  }

  receiveAttack(row, col) {
    // Check if the location has already been attacked
    for (let attack of this.attackedLocations) {
      if (attack.row === row && attack.col === col) {
        return {
          hit: null,
          ship: null,
          sunk: null,
          message: 'Location already attacked!',
        };
      }
    }

    // Mark the location as attacked
    this.attackedLocations.push({ row, col });

    for (let ship of this.ships) {
      if (this.board[row][col] === 1) {
        for (let i = 0; i < ship.location.length; i++) {
          if (ship.location[i].row === row && ship.location[i].col === col) {
            ship.hit();
            return {
              hit: true,
              ship: ship,
              sunk: ship.sunk,
            };
          }
        }
      }
    }

    // If no ship was hit
    this.attackedLocations.push({ row: row, col: col });
    return {
      hit: false,
      ship: null,
      sunk: false,
    };
  }
}
