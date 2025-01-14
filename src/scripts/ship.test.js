import { describe, expect, it, test } from '@jest/globals';
import { Ship } from './ship';

describe('Ship Class', () => {
    const result = new Ship();

    it('Should be an object', () => {
        expect(result).toBeInstanceOf(Object);
    });

    it('Should contain ship length', () => {
        expect(result).toHaveProperty('length');
    });

    it("Should show the number of times they've been hit", () => {
        expect(result).toHaveProperty('hits');
    });

    it('Should show if ship has sunk', () => {
        expect(result).toHaveProperty('sunk');
    });
});
