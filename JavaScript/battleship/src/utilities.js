import DOMActions from "./dom-interface";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function makeRandomMove(gameboard) {
    let rowIndices = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let colIndices = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (const i of rowIndices) {
        for (const j of colIndices) {
            const isHit = gameboard.recieveAttack(i, j);
            if (isHit !== undefined) {
                DOMActions.markCellDestroyed(
                    document.querySelector(`#computer-board > .cell[data-xy='${i} ${j}']`));
                return isHit;
            }
        }
    }
}

export { makeRandomMove, shuffleArray };