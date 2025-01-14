export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hits() {
        this.hits++;
    }

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true;
        }
    }
}
