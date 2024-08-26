function gameBoard() {
    const gameboardBox = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];

    const getBoard = () => gameboardBox;

    const isEmptyCell = (cell) => {
        if (gameboardBox[cell].length > 2)
            return false;
        else return true;
    }

    const addMarkToCell = (cell, mark) => {
        if (isEmptyCell(cell)) {
            gameboardBox[cell].push(mark);
            console.log("SUCCESS!");
            }
        else {
            console.log(`The cell ${cell} is not empty!`);
            return false;
        }
    }

    return { getBoard, addMarkToCell };
};

function boardController() {

    const PlayerX = {
        name: "Player X",
        mark: "X",
    }
    const PlayerO = {
        name: "Player O",
        mark: "O",
    }

    let activePlayer = PlayerX;

    const sayTurn = () => console.log(`It's ${activePlayer.name} turn`);

    const setActivePlayer = () => {
        activePlayer = activePlayer === PlayerX ? PlayerO : PlayerX;
        sayTurn(activePlayer);
    };

    const playRound = (cell) => {
        if (board.addMarkToCell(cell, activePlayer.mark) !== false)
            setActivePlayer();
        else {
            console.log("CHOOSE ANOTHER CELL!!")
        }
    }

    return { playRound }
}

const board = gameBoard();
const play = boardController().playRound;