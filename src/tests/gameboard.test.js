import { describe, expect, it, test, beforeEach } from '@jest/globals';
import { Gameboard } from '../scripts/gameboard';

let board;

beforeEach(() => {
  board = new Gameboard(10);
});

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

describe('ship placement', () => {
  const ship = { length: 5 };

  test('placeShipHorizontal places a ship horizantally on the board', () => {
    board.placeShipHorizontal(ship, 1, 1);

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
  });

  test('placeShipVertical places a ship vertically on the board', () => {
    board.placeShipVertical(ship, 1, 1);

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
  });

  test('Horizontal placement should not allow out-of-bounds', () => {
    expect(() => {
      board.placeShipHorizontal(ship, 9, 8);
    }).toThrowError('Cannot place ship here');
  });

  test('Vertical placement should not allow out-of-bounds', () => {
    expect(() => {
      board.placeShipVertical(ship, 9, 0);
    }).toThrowError('Cannot place ship here');
  });

  test('Ships should not overlap on the board', () => {
    const ship1 = { length: 3 };
    const ship2 = { length: 3 };

    board.placeShipHorizontal(ship1, 1, 1);
    expect(() => {
      board.placeShipHorizontal(ship2, 1, 2);
    }).toThrowError('Cannot place ship here');

    expect(() => {
      board.placeShipVertical(ship2, 1, 2);
    }).toThrowError('Cannot place ship here');
  });
});
