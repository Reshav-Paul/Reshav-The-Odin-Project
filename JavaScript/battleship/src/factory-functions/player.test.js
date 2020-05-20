import Player from "./player"
import Gameboard, { cellTypes } from "./gameboard";

describe('player tests', () => {
    it('player has name', () => {
        const player = Player('foo');
        expect(player.getName()).toBe('foo')
    });

    it ('player has score', () => {
        const player = Player('foo');
        const gameboard = Gameboard();
        gameboard.placeShip(0, 0, 2);
        gameboard.placeShip(3, 4, 3);

        gameboard.recieveAttack(0, 0);
        gameboard.recieveAttack(1, 0);
        player.updateScore(gameboard);
        expect(player.getScore()).toBe(0);

        gameboard.recieveAttack(1, 1);
        gameboard.recieveAttack(1, 2);
        player.updateScore(gameboard);
        expect(player.getScore()).toBe(0);

        gameboard.recieveAttack(0, 1);
        gameboard.recieveAttack(3, 4);
        player.updateScore(gameboard);
        expect(player.getScore()).toBeCloseTo(0.5);

        gameboard.recieveAttack(3, 5);
        gameboard.recieveAttack(3, 6);
        player.updateScore(gameboard);
        expect(player.getScore()).toBeCloseTo(1);
    })
})