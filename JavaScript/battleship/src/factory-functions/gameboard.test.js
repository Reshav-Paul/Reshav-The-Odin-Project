import Gameboard, { orientations, cellTypes } from './gameboard';
import Ship from './ship';

describe('gameboard tests', () => {
    
    describe('placement tests', () => {
        it('places ships on valid locations', () => {
            const gameboard = Gameboard();

            const firstShip = gameboard.placeShip(0, 0, 4);
            expect(gameboard.nShips()).toBe(1);
            expect(toString(firstShip)).toBeDefined();

            const secondShip = gameboard.placeShip(1, 0, 2);
            expect(toString(secondShip)).toBeDefined();
            expect(gameboard.nShips()).toBe(2);

            const thirdShip = gameboard.placeShip(3, 2, 3, orientations.vertical);
            expect(toString(thirdShip)).toBeDefined();
            expect(gameboard.nShips()).toBe(3);
        });
    
        it('placement is rejected on invalid locations for horizontal ships', () => {
            const gameboard = Gameboard();
            let firstShip = gameboard.placeShip(10, 0, 4);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(0, 10, 4);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(10, 10, 4);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(-1, 0, 4);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(0, -1, 4);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(0, 9, 4);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(0, 7, 4);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(0, 6, 4);
            expect(toString(firstShip)).toBe(toString(Ship(0, 4)));
            expect(gameboard.nShips()).toBe(1);
        });

        it('placement is rejected on invalid locations for vertical ships', () => {
            const gameboard = Gameboard();
            let firstShip = gameboard.placeShip(10, 0, 4, orientations.vertical);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(0, 10, 4, orientations.vertical);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(10, 10, 4, orientations.vertical);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(-1, 0, 4, orientations.vertical);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(0, -1, 4, orientations.vertical);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(9, 0, 4, orientations.vertical);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(7, 0, 4, orientations.vertical);
            expect(firstShip).toBeUndefined();
            expect(gameboard.nShips()).toBe(0);
    
            firstShip = gameboard.placeShip(6, 0, 4, orientations.vertical);
            expect(toString(firstShip)).toBe(toString(Ship(0, 4)));
            expect(gameboard.nShips()).toBe(1);
        });

        it('placement is rejected if the location is occupied', () => {
            const gameboard = Gameboard();
            const firstShip = gameboard.placeShip(0, 2, 4);
            expect(gameboard.nShips()).toBe(1);
            expect(firstShip).toBeDefined();
            
            for (let i = 0; i <= 5; ++i) {
                const secondShip = gameboard.placeShip(0, i, 3);
                expect(secondShip).toBeUndefined();
                expect(gameboard.nShips()).toBe(1);
            }
            const secondShip = gameboard.placeShip(0, 6, 3);
            expect(secondShip).toBeDefined();
            expect(gameboard.nShips()).toBe(2);

            for (let i = 2; i < 9; ++i) {
                const thirdShip = gameboard.placeShip(0, i, 2, orientations.vertical);
                expect(thirdShip).toBeUndefined();
            }
            const thirdShip = gameboard.placeShip(1, 3, 4, orientations.vertical);
            expect(thirdShip).toBeDefined();

            for (let i = 1; i < 5; ++i) {
                const fourthShip = gameboard.placeShip(i, 3, 3, orientations.vertical);
                expect(fourthShip).toBeUndefined();
            }
            const fourthShip = gameboard.placeShip(5, 3, 3, orientations.vertical);
            expect(fourthShip).toBeDefined();
        });

        it('places 5 ships randomly', () => {
            let gameboard = Gameboard();
            let ships = gameboard.placeShipsRandomly();
            ships.forEach(ship => expect(ship).toBeDefined());
            expect(gameboard.nShips()).toBe(5);

            gameboard = Gameboard();
            ships = gameboard.placeShipsRandomly();
            ships.forEach(ship => expect(ship).toBeDefined());
            expect(gameboard.nShips()).toBe(5);
        });

        it('doest not place ships randomly if the board has even 1 ship already present', () => {
            let gameboard = Gameboard();
            gameboard.placeShip(0, 0, 3);
            let ships = gameboard.placeShipsRandomly();
            expect(ships).toBeUndefined();
            expect(gameboard.nShips()).toBe(1);
        })
    })
    
    describe('hit and sinking tests', () => {
        it('gameboard recieves hit on water', () => {
            const gameboard = Gameboard();
            const firstShip = gameboard.placeShip(0, 0, 4);
    
            expect(gameboard.recieveAttack(0, 3)).toBe(cellTypes.ship);
            expect(gameboard.recieveAttack(0, 4)).toBe(cellTypes.water);
        });
    
        it('gameboard rejects hits on destroyed cells', () => {
            const gameboard = Gameboard();
            const firstShip = gameboard.placeShip(0, 0, 4);
    
            expect(gameboard.recieveAttack(0, 3)).toBe(cellTypes.ship);
            expect(gameboard.recieveAttack(0, 4)).toBe(cellTypes.water);
    
            expect(gameboard.recieveAttack(0, 3)).toBeUndefined();
            expect(gameboard.recieveAttack(0, 4)).toBeUndefined();
        });
    
        it('gameboard recieves hit on ships', () => {
            const gameboard = Gameboard();
    
            const firstShip = gameboard.placeShip(0, 0, 4);
            for (let i = 0; i < 4; ++i) {
                expect(gameboard.recieveAttack(0, i)).toBe(cellTypes.ship);
            }
            expect(firstShip.isSunk()).toBe(true);
    
            const secondShip = gameboard.placeShip(3, 4, 2);
            for (let i = 0; i < 2; ++i) {
                expect(gameboard.recieveAttack(3, 4 + i)).toBe(cellTypes.ship);
            }
            expect(secondShip.isSunk()).toBe(true);
        });
    
        it('gameboard rejects hit on invalid positions', () => {
            const gameboard = Gameboard();
            expect(gameboard.recieveAttack(10, 0)).toBeUndefined();
            expect(gameboard.recieveAttack(0, 10)).toBeUndefined();
            expect(gameboard.recieveAttack(10, 10)).toBeUndefined();
            expect(gameboard.recieveAttack(-1, 0)).toBeUndefined();
            expect(gameboard.recieveAttack(0, -1)).toBeUndefined();
        });
    
        it('gameboard detects when any and all ships have sunk', () => {
            const gameboard = Gameboard();
            expect(gameboard.allSunk()).toBe(false);
    
            const firstShip = gameboard.placeShip(0, 0, 4);
            const secondShip = gameboard.placeShip(3, 4, 2);
    
            for (let i = 0; i < 4; ++i) {
                expect(gameboard.recieveAttack(0, i)).toBe(cellTypes.ship);
                expect(gameboard.allSunk()).toBe(false);
                i < 3 && expect(gameboard.nSunk()).toBe(0);
            }
            expect(firstShip.isSunk()).toBe(true);
            expect(gameboard.nSunk()).toBe(1);
            expect(gameboard.allSunk()).toBe(false);
    
            for (let i = 0; i < 2; ++i) {
                expect(gameboard.recieveAttack(3, 4 + i)).toBe(cellTypes.ship);
                i < 1 && expect(gameboard.allSunk()).toBe(false);
                i < 1 && expect(gameboard.nSunk()).toBe(1);
            }
            expect(secondShip.isSunk()).toBe(true);
            expect(gameboard.allSunk()).toBe(true);
            expect(gameboard.nSunk()).toBe(2);
        })
    });    
})