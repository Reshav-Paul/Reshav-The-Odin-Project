import Ship from './ship';

describe('Ship Tests', () => {
    it('ship has id', () => {
        const ship = Ship(1, 3);
        expect(ship.getID()).toBe(1);
    })
    it('hit() works', () => {
        const ship = Ship(1, 4);
        for (let i = 0; i < 4; i++) {
            expect(ship.hit(i)).toBe(true);
        }

        for (let i = 0; i < 4; i++) {
            expect(ship.hit(i)).toBe(false);
        }
    });

    it('isSunk() Works', () => {
        const ship = Ship(1, 4);
        
        for (let i = 0; i < 3; i++) {
            expect(ship.hit(i)).toBe(true);
            expect(ship.isSunk()).toBe(false)
        }
        expect(ship.hit(3)).toBe(true);
        expect(ship.isSunk()).toBe(true);

        for (let i = 0; i < 3; i++) {
            expect(ship.hit(i)).toBe(false);
            expect(ship.isSunk()).toBe(true)
        }
    })
})