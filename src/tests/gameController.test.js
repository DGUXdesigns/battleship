import { expect, it, describe, beforeEach } from '@jest/globals';
import { GameController } from '../scripts/gameController';
import { Player } from '../scripts/player';

let realPlayer;
let computerPlayer;
let gameController;

beforeEach(() => {
  // Create players with empty gameboards
  realPlayer = new Player('real');
  computerPlayer = new Player('computer');

  // Initialize the GameController with the players
  gameController = new GameController(realPlayer, computerPlayer);
});

describe('GameController', () => {
  it('should create a game controller with two players', () => {
    expect(gameController.playerOne).toBe(realPlayer);
    expect(gameController.playerTwo).toBe(computerPlayer);
  });

  it('should start the game and populate both players’ gameboards with ships', () => {
    // After calling startGame, check if ships have been placed on both players’ boards
    const playerOneShips = realPlayer.gameboard.ships;
    const playerTwoShips = computerPlayer.gameboard.ships;

    // Ensure ships have been placed for both players
    expect(playerOneShips.length).toBe(5);
    expect(playerTwoShips.length).toBe(5);

    // Check specific ship placements for player one
    const carrierShip = playerOneShips.find((ship) => ship.name === 'Carrier');
    expect(carrierShip).toBeTruthy();
    expect(carrierShip.location).toEqual([
      { row: 2, col: 2 },
      { row: 3, col: 2 },
      { row: 4, col: 2 },
      { row: 5, col: 2 },
      { row: 6, col: 2 },
    ]);

    // Check specific ship placements for player two (same locations as player one for now)
    const battleshipShip = playerTwoShips.find(
      (ship) => ship.name === 'Battleship',
    );
    expect(battleshipShip).toBeTruthy();
    expect(battleshipShip.location).toEqual([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
    ]);
  });

  it('should populate ships correctly for both players', () => {
    // Check if all players' ships are correctly populated
    realPlayer.gameboard.ships.forEach((ship) => {
      expect(ship.location).toBeDefined();
      expect(ship.location.length).toBeGreaterThan(0);
    });

    computerPlayer.gameboard.ships.forEach((ship) => {
      expect(ship.location).toBeDefined();
      expect(ship.location.length).toBeGreaterThan(0);
    });
  });
});
