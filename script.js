function gameBoard() {
    const gameboardBox = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];

    const getBoard = () => gameboardBox;

    const isEmptyCell = (cell) => {
        if (gameboardBox[cell].length > 2)
            return false;
        else return true;
    }

    const addMarkToCell = (cell, mark) => {
        isEmptyCell(cell) ? gameboardBox[cell].push(mark) : console.log(`The cell ${cell} is not empty!`);
    }

    return { getBoard, addMarkToCell };
};
const board = gameBoard();


// gameboardBox = [[13, [1, 2, 3]], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];
// gameboardBox[1].push("X")

function boardController() {
    const sayTurn = () => console.log("It's ${setActivePlayer} turn");

    const PlayerX = {
        name: "Player X",
        mark: "X",
        activePlayer: true
    }
    const PlayerO = {
        name: "Player O",
        mark: "O",
        activePlayer: false
    }

    const setActivePlayer = (player) => {
        // player.activePlayer === true ? false
    };
    // const checkEmptyCell(cell) = {
    //     if (gameboardBox[cell][3] !== undefined)
    //         return 0;
    //     else return 1;
    // };
    // const setMarkToCell(cell, player) = {
    //     checkEmptyCell(cell);
    //     if (!checkEmptyCell(cell))
    //         gameboardBox[cell].push(player.mark);
    //     endTurn();
    // };

}