function gameBoard() {
    const gameboardBox = [];
    for (let cells = 0; cells < 9; cells++)
        gameboardBox.push(null);

    const getBoard = () => gameboardBox;

    const isEmptyCell = (cell) => {
        if (gameboardBox[cell] !== null)
            return false;
        else return true;
    }

    const addMarkToCell = (cell, mark) => {
        if (isEmptyCell(cell)) {
            gameboardBox[cell] = mark;
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
        if (board.addMarkToCell(cell, activePlayer.mark) !== false) {
            checkWin();
            setActivePlayer();
        }
        else {
            console.log("CHOOSE ANOTHER CELL!!")
        }
    }

    const checkWin = () => {
        const victoryLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        const isSameMark = (arr) => arr.every(mark => mark === mark[0]);

        let isWinner;
        for (let i = 0; i < victoryLines.length; i++) {
            isWinner = [];
                for (let j = 0; j < victoryLines[i].length; j++) {
                    board.getBoard()[victoryLines[i][j]] === null ? isWinner.push(0): isWinner.push(board.getBoard()[victoryLines[i][j]]);
            }
            if (isSameMark(isWinner)) {
                alert(`Player${isWinner[0]} is the winner`);
                break;
            }
        }
    }

    return { playRound }
}

const board = gameBoard();
board.getBoard();
const play = boardController().playRound;
// FOR TESTING PURPOSE
play(1)
play(6)
play(0)
play(7)
play(2)