import { describe, expect, it, test } from '@jest/globals';
import { Gameboard } from '../scripts/gameboard';

describe('Gameboard', () => {
  const board = new Gameboard(10);

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
