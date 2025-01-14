import { describe, expect, it, test, beforeEach, jest } from '@jest/globals';
import { Gameboard } from '../scripts/gameboard';

let board;
let ship;

beforeEach(() => {
  board = new Gameboard(10);
  ship = { length: 3, hit: jest.fn(), sunk: false }; // Mock ship with hit method
  board.placeShip(ship, 1, 1, 'horizontal');
});

// Gameboard
describe('Gameboard', () => {
  it('should be an Object', () => {
    expect(board).toBeInstanceOf(Object);
  });

  it('should have a gameboard of 10x10', () => {
    expect(board.board).toBeInstanceOf(Array);
    expect(board.board.length).toBe(10);
    board.board.forEach((row) => {
      expect(row).toBeInstanceOf(Array);
      expect(row.length).toBe(10);
    });
  });

  describe('gameOver', () => {
    it('should return "Game over, all your ships have sunk" when all ships are sunk', () => {
      ship.sunk = true;

      const result = board.gameOver();
      expect(result).toBe('Game over, all your ships have sunk');
    });

    it('should return undefined when not all ships are sunk', () => {
      ship.sunk = false;

      const result = board.gameOver();
      expect(result).toBeUndefined();
    });

    it('should return undefined if no ships are placed', () => {
      board = new Gameboard(10);

      const result = board.gameOver();
      expect(result).toBeUndefined();
    });
  });
});

// Ship Placement
describe('ship placement', () => {
  test('Should place a ship horizontally store in the ships array', () => {
    expect(board.board[1][1]).toBe(1);
    expect(board.board[1][2]).toBe(1);
    expect(board.board[1][3]).toBe(1);
    expect(board.ships).toContainEqual(ship);

    const expectedLocation = [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
    ];

    expect(ship.location).toEqual(expectedLocation);
  });

  test('Should place a ship vertically store in the ships array', () => {
    board.placeShip(ship, 2, 1, 'vertical');

    expect(board.board[2][1]).toBe(1);
    expect(board.board[3][1]).toBe(1);
    expect(board.board[4][1]).toBe(1);
    expect(board.ships).toContain(ship);

    const expectedLocation = [
      { row: 2, col: 1 },
      { row: 3, col: 1 },
      { row: 4, col: 1 },
    ];

    expect(ship.location).toEqual(expectedLocation);
  });

  test('Horizontal placement should not allow out-of-bounds', () => {
    expect(() => {
      board.placeShip(ship, 9, 8, 'horizontal');
    }).toThrowError('Cannot place ship here');
  });

  test('Vertical placement should not allow out-of-bounds', () => {
    expect(() => {
      board.placeShip(ship, 9, 0, 'vertical');
    }).toThrowError('Cannot place ship here');
  });

  test('Ships should not overlap on the board', () => {
    const ship2 = { length: 3 };

    expect(() => {
      board.placeShip(ship2, 1, 2, 'horizontal');
    }).toThrowError('Ships cannot overlap');

    expect(() => {
      board.placeShip(ship2, 0, 2, 'vertical');
    }).toThrowError('Ships cannot overlap');
  });
});

// Receive attack
describe('receiveAttack', () => {
  it('should return hit when attacking a ship', () => {
    const result = board.receiveAttack(1, 1);

    expect(result.hit).toBe(true);
    expect(result.ship).toBe(ship);
    expect(result.sunk).toBe(false);
  });

  it('should return miss when attacking an empty spot', () => {
    const result = board.receiveAttack(0, 0);

    expect(result.hit).toBe(false);
    expect(result.ship).toBeNull();
  });

  it('should mark the ship as hit', () => {
    board.receiveAttack(1, 1);

    expect(ship.hit).toHaveBeenCalled();
  });

  it('should mark the ship as sunk when all parts of the ship are hit', () => {
    ship.hit.mockImplementationOnce(() => {
      ship.sunk = true;
    });

    board.receiveAttack(1, 1);
    board.receiveAttack(1, 2);
    board.receiveAttack(1, 3);

    expect(ship.sunk).toBe(true);
  });

  it('should return the correct hit result when the ship is sunk', () => {
    ship.hit.mockImplementationOnce(() => {
      ship.sunk = true;
    });
    board.receiveAttack(1, 1);
    board.receiveAttack(1, 2);
    const result = board.receiveAttack(1, 3);

    expect(result.hit).toBe(true);
    expect(result.sunk).toBe(true);
  });

  test("Can't attack the same location twice", () => {
    board.receiveAttack(1, 1);
    const result = board.receiveAttack(1, 1);

    expect(result.hit).toBe(null);
  });

  test('attack locations should be saved', () => {
    board.receiveAttack(7, 7);

    expect(board.attackedLocations).toContainEqual({ row: 7, col: 7 });
  });
});
