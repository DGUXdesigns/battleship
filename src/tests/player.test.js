import { describe, jest, expect, it, beforeEach } from '@jest/globals';
import { Player } from '../scripts/player';
import { Gameboard } from '../scripts/gameboard';

let realPlayer;
let computerPlayer;

beforeEach(() => {
  realPlayer = new Player('real');
  computerPlayer = new Player('computer');
});

describe('Player', () => {
  it('should create a player with a gameboard', () => {
    expect(realPlayer.gameboard).toBeInstanceOf(Gameboard);
    expect(computerPlayer.gameboard).toBeInstanceOf(Gameboard);
  });

  it('should differentiate between real and computer players', () => {
    expect(realPlayer.type).toBe('real');
    expect(computerPlayer.type).toBe('computer');
  });

  it('real player should be able to attack a location', () => {
    const mockEnemyBoard = new Gameboard(10);
    mockEnemyBoard.placeShip(
      { length: 3, hit: jest.fn(), sunk: false },
      1,
      1,
      'horizontal',
    );

    const result = realPlayer.attack(mockEnemyBoard, 1, 1);
    expect(result.hit).toBe(true);
    expect(mockEnemyBoard.attackedLocations).toContainEqual({ row: 1, col: 1 });
  });

  it('computer player should make a random valid attack', () => {
    const mockEnemyBoard = new Gameboard(10);

    // Spy on the attack method to ensure it gets called
    const attackSpy = jest.spyOn(mockEnemyBoard, 'receiveAttack');
    computerPlayer.attack(mockEnemyBoard);

    // Check that a valid attack was made
    expect(attackSpy).toHaveBeenCalledTimes(1);
    const attackLocation = mockEnemyBoard.attackedLocations[0];
    expect(attackLocation.row).toBeGreaterThanOrEqual(0);
    expect(attackLocation.row).toBeLessThan(10);
    expect(attackLocation.col).toBeGreaterThanOrEqual(0);
    expect(attackLocation.col).toBeLessThan(10);
  });

  it('should not allow the same location to be attacked twice', () => {
    const mockEnemyBoard = new Gameboard(10);

    realPlayer.attack(mockEnemyBoard, 1, 1);
    const result = realPlayer.attack(mockEnemyBoard, 1, 1);

    expect(result.message).toBe('Location already attacked!');
  });
});
