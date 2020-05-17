import Player from "./player"
import Gameboard, { cellTypes } from "./gameboard";

describe('player tests', () => {
    it('player has name', () => {
        const player = Player('foo');
        expect(player.getName()).toBe('foo')
    });

    it('player makes random moves', () => {
        const player = Player('foo');
        const gameboard = Gameboard();
        expect(player.makeRandomMove(gameboard)).toBe(0);
    });

    it('player makes moves', () => {
        const player = Player('foo');
        const gameboard = Gameboard();
        gameboard.placeShip(0, 0, 4);

        for (let i = 0; i < 4; i++) {
            expect(player.makeMove(gameboard, 0, i)).toBe(cellTypes.ship);
        }
        for (let i = 0; i < 4; i++) {
            expect(player.makeMove(gameboard, 0, i)).toBeUndefined();
        }

        expect(player.makeMove(gameboard, 0, 5)).toBe(cellTypes.water);
        expect(player.makeMove(gameboard, 0, 5)).toBeUndefined();
        expect(gameboard.allSunk()).toBe(true);
    });

    it('player gets undefined return for invalid moves', () => {
        const player = Player('foo');
        const gameboard = Gameboard();
        gameboard.placeShip(0, 0, 4);

        player.makeMove(gameboard, 0, 0);
        player.makeMove(gameboard, 1, 0);

        expect(player.makeMove(gameboard, 0, 0)).toBeUndefined();
        expect(player.makeMove(gameboard, 1, 0)).toBeUndefined();

        expect(player.makeMove(gameboard, 0, 10)).toBeUndefined();
        expect(player.makeMove(gameboard, 10, 0)).toBeUndefined();
        expect(player.makeMove(gameboard, 10, 10)).toBeUndefined();
        expect(player.makeMove(gameboard, -1, 0)).toBeUndefined();
        expect(player.makeMove(gameboard, 0, -1)).toBeUndefined();
        expect(player.makeMove(gameboard, -1, -1)).toBeUndefined();
    });

    it ('player has score', () => {
        const player = Player('foo');
        const gameboard = Gameboard();
        gameboard.placeShip(0, 0, 2);
        gameboard.placeShip(3, 4, 3);

        player.makeMove(gameboard, 0, 0);
        player.makeMove(gameboard, 1, 0);
        expect(player.getScore(gameboard)).toBe(0);

        player.makeMove(gameboard, 1, 1);
        player.makeMove(gameboard, 1, 2);
        expect(player.getScore(gameboard)).toBe(0);

        player.makeMove(gameboard, 0, 1);
        player.makeMove(gameboard, 3, 4);
        expect(player.getScore(gameboard)).toBeCloseTo(0.5);

        player.makeMove(gameboard, 3, 5);
        player.makeMove(gameboard, 3, 6);
        expect(player.getScore(gameboard)).toBeCloseTo(1);
    })
})