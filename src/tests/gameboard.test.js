import { describe, expect, it, test, beforeEach } from '@jest/globals';
import { Gameboard } from '../scripts/gameboard';

let board;

beforeEach(() => {
  board = new Gameboard(10);
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
});

// Ship Placement
describe('ship placement', () => {
  const ship = { length: 5 };

  test('Should place a ship horizontally store in the ships array', () => {
    board.placeShip(ship, 1, 1, 'horizontal');

    const expectedBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    expect(board.board).toEqual(expectedBoard);
    expect(board.ships).toContainEqual(ship);

    const expectedLocation = [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
      { row: 1, col: 4 },
      { row: 1, col: 5 },
    ];

    expect(ship.location).toEqual(expectedLocation);
  });

  test('Should place a ship vertically store in the ships array', () => {
    board.placeShip(ship, 1, 1, 'vertical');

    const expectedBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    expect(board.board).toEqual(expectedBoard);
    expect(board.ships).toContain(ship);

    const expectedLocation = [
      { row: 1, col: 1 },
      { row: 2, col: 1 },
      { row: 3, col: 1 },
      { row: 4, col: 1 },
      { row: 5, col: 1 },
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
    const ship1 = { length: 3 };
    const ship2 = { length: 3 };

    board.placeShip(ship1, 1, 1, 'horizontal');
    expect(() => {
      board.placeShip(ship2, 1, 2, 'horizontal');
    }).toThrowError('Ships cannot overlap');

    expect(() => {
      board.placeShip(ship2, 1, 2, 'vertical');
    }).toThrowError('Ships cannot overlap');
  });
});
