import { describe, expect, it, test } from '@jest/globals';
import { Ship } from '../scripts/ship';

describe('Ship Class', () => {
  const ship = new Ship(3);

  it('Should be an object', () => {
    expect(ship).toBeInstanceOf(Object);
  });

  it('Should contain ship length', () => {
    expect(ship).toHaveProperty('length');
  });

  it("Should show the number of times they've been hit", () => {
    expect(ship).toHaveProperty('hits');
  });

  it('Should show if ship has sunk', () => {
    expect(ship).toHaveProperty('sunk');
  });

  test('Hits should increment by hits count', () => {
    expect(ship.hits).toBe(0);

    ship.hit(); // Use renamed method
    expect(ship.hits).toBe(1);

    ship.hit(); // Use renamed method
    expect(ship.hits).toBe(2);
  });
});
