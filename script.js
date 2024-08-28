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

    const resetBoard = () => {
        for (i = 0; i < gameboardBox.length ;i++)
            gameboardBox[i] = null;
    };

    return { getBoard, addMarkToCell, resetBoard };
};

function boardController() {

    const PlayerX = {
        name: "Player X",
        mark: "X",
    };
    const PlayerO = {
        name: "Player O",
        mark: "O",
    };

    let activePlayer = PlayerX;

    const getActivePlayerMark = () => activePlayer.mark;

    const sayTurn = () => console.log(`It's ${activePlayer.name}`);

    const setActivePlayer = () => {
        activePlayer = activePlayer === PlayerX ? PlayerO : PlayerX;
        // sayTurn(activePlayer);
        // console.log(getActivePlayerMark());
        // getActivePlayerMark()
    };

    const playRound = (cell) => {
        if (board.addMarkToCell(cell, activePlayer.mark) !== false) {
            checkWin();
            setActivePlayer();
            displayController.renderMarksOnDOM(cell);
            displayController.renderCurrentTurn();
            return true;
        }
        else {
            console.log("CHOOSE ANOTHER CELL!!")
            return false;
        }
    };

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

        const isSameMark = (array) => {
            return (array.join("") === "XXX") || (array.join("") === "OOO")
        }

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
    };

    return { playRound, getActivePlayerMark }
}

const board = gameBoard();
board.getBoard();
const controller = boardController()
const play = controller.playRound;

const displayController = function() {
// function displayController() {
    const xIcon = "M9,7L11,12L9,17H11L12,14.5L13,17H15L13,12L15,7H13L12,9.5L11,7H9Z";
    const oIcon = "M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9Z";

    // Render SVG icons
    // THANKS TO THIS POST
    // https://blog.q-bit.me/how-to-create-svg-elements-with-javascript/
    function renderIcon(attr) {
        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        
        iconSvg.setAttribute('viewBox', '0 0 24 24');
    
        iconPath.setAttribute("d", attr);
    
        iconSvg.append(iconPath);
    
        return iconSvg;
    };



    const renderCurrentTurn = () => {
        const span = document.querySelector("span");
        span.textContent = `Player ${controller.getActivePlayerMark()}`;
    };




    // RENDER IT ON PAGE LOAD
    renderCurrentTurn();

    const cells = document.querySelectorAll(".game-block");

    const renderMarksOnDOM = function(index) {
        const boardArray = board.getBoard();
        console.log(boardArray)
        if (boardArray[index] !== null) {
            cells[index].appendChild(renderIcon(boardArray[index] === "X" ? xIcon : oIcon));
            boardArray[index] === "X" ? cells[index].firstChild.classList.add("x-icon") : cells[index].firstChild.classList.add("o-icon");
        }
    };

    cells.forEach(function (e) {
        e.addEventListener("click", function () {
            play(Array.from(e.parentNode.children).indexOf(e))
        });
    });
        
    return { renderMarksOnDOM, renderCurrentTurn }
}();