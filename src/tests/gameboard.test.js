import { describe, expect, it, test, beforeEach } from '@jest/globals';
import { Gameboard } from '../scripts/gameboard';

describe('Gameboard', () => {
  let board;

  beforeEach(() => {
    board = new Gameboard(10);
  });

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

  test('placeShipHorizontal places a ship horizantally on the board', () => {
    const ship = { length: 3 };
    board.placeShipHorizontal(ship, 1, 1);

    const expectedBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
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
    const ship = { length: 5 };
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

  describe('Out-of-bounds ship placement', () => {
    const ship = { length: 5 };

    test('Horizontal placement should not allow out-of-bounds', () => {
      expect(() => {
        board.placeShipHorizontal(ship, 7, 8);
      }).toThrowError('Cannot place ship here');
    });

    test('Vertical placement should not allow out-of-bounds', () => {
      expect(() => {
        board.placeShipVertical(ship, 7, 8);
      }).toThrowError('Cannot place ship here');
    });
  });
});
