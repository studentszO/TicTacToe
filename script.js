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
        if (board.addMarkToCell(cell, activePlayer.mark) !== false)
            setActivePlayer();
        else {
            console.log("CHOOSE ANOTHER CELL!!")
        }
    }

    const victoryLines = {
        lineOne: [0, 1, 2],
        lineTwo: [3, 4, 5],
        lineThree: [6, 7, 8],
        // lineFour:
        // lineFive:
        // lineSix:
        // lineSeven:
    }



    const isThereAWinner = (player) => {
        // lines = [1, 2, 3] [4, 5, 6] [7, 8, 9] [1, 4, 7] [2, 5, 8] [3, 6, 9] [1, 5, 9] [3, 5, 7]
        if ((gameboardBox[1][2] === gameboardBox[2][2] === gameboardBox[3][2])
         || (gameboardBox[4][2] === gameboardBox[5][2] === gameboardBox[6][2])
         || (gameboardBox[7][2] === gameboardBox[8][2] === gameboardBox[9][2])
         || (gameboardBox[1][2] === gameboardBox[4][2] === gameboardBox[7][2])
         || (gameboardBox[2][2] === gameboardBox[5][2] === gameboardBox[8][2])
         || (gameboardBox[3][2] === gameboardBox[6][2] === gameboardBox[9][2])
         || (gameboardBox[1][2] === gameboardBox[5][2] === gameboardBox[9][2])
         || (gameboardBox[3][2] === gameboardBox[5][2] === gameboardBox[7][2]))
         console.log()
    }

    return { playRound }
}

const board = gameBoard();
const play = boardController().playRound;
// FOR TESTING PURPOSE
board.getBoard()
play(1)
play(6)
play(0)
play(7)
play(2)