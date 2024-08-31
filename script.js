const gameBoard = function() {
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
        if (isEmptyCell(cell))
            gameboardBox[cell] = mark;
        else 
            return false;
    }

    const resetBoard = () => {
        for (i = 0; i < gameboardBox.length ;i++)
            gameboardBox[i] = null;
    };

    return { getBoard, addMarkToCell, resetBoard };
}();

const boardController = function() {

    const PlayerX = {
        name: "Player X",
        mark: "X",
    };
    const PlayerO = {
        name: "Player O",
        mark: "O",
    };

    let activePlayer = PlayerX;

    const getActivePlayer = {
        mark: function() { return activePlayer.mark },
        name: function() { return activePlayer.name }
    };

    const setActivePlayer = () => {
        activePlayer = activePlayer === PlayerX ? PlayerO : PlayerX;
    };

    const playRound = (cell) => {
        if (gameBoard.addMarkToCell(cell, activePlayer.mark) !== false) {
            displayController.renderMarksOnDOM(cell);
            if (checkWin())
                return false;
            setActivePlayer();
            displayController.renderCurrentTurn(activePlayer.name);
            return true;
        }
    };

    const changeName = (newNameForX, newNameForO) => {
        PlayerO.name = newNameForO;
        PlayerX.name = newNameForX ;
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

        const isSameMark = (array) => {
            return (array.join("") === "XXX") || (array.join("") === "OOO")
        }

        let isWinner;

        for (let i = 0; i < victoryLines.length; i++) {
            isWinner = [];
            for (let j = 0; j < victoryLines[i].length; j++) {
                gameBoard.getBoard()[victoryLines[i][j]] === null ? isWinner.push(0): isWinner.push(gameBoard.getBoard()[victoryLines[i][j]]);
            }
            if (isSameMark(isWinner)) {
                const gameWinner = isWinner[0] === "X" ? PlayerX.name : PlayerO.name;
                return displayController.renderWinner(gameWinner, victoryLines[i]);
            }
        }

        if (!gameBoard.getBoard().includes(null) && !isSameMark(isWinner))
            alert(`IT'S A DRAW!!`)
    };

    return { playRound, getActivePlayer, changeName }
}();

const play = boardController.playRound;

const displayController = function() {
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

    const renderCurrentTurn = (name) => {
        // remove h3 if it's already in the DOM
        document.querySelector("h3").remove();

        if (!name)
            name = boardController.getActivePlayer.name();

        const currentTurnText = document.querySelector(".info-container");
        const h3 = document.createElement("h3");
        const span = document.createElement("span");

        h3.textContent = "CURRENT TURN"
        currentTurnText.prepend(h3)

        const getIcon = () => {
            const icon = boardController.getActivePlayer.mark() === "X" ? renderIcon(xIcon) : renderIcon(oIcon)
            boardController.getActivePlayer.mark() === "X" ? icon.classList.add("x-icon") : icon.classList.add("o-icon");
            return icon;
        }

        span.textContent = `${name}`;
        span.classList.add(boardController.getActivePlayer.mark() === "X" ? "x-turn" : "o-turn");
        h3.append(span, getIcon())
      };

    const renderResetBtn = function() {
        const button = document.querySelector(".reset-btn");
        function resetDOM() {
            let i = 0;
            while (i < 9) {
                if (cells[i].childElementCount > 0)
                    cells[i].removeChild(cells[i].firstElementChild);
                i++;
            }
        }
        button.addEventListener("click", () => gameBoard.resetBoard() | resetDOM());
    }();

    const renderChangeNamesBtn = function() {
        const button = document.querySelector(".change-names-btn");
        const modalInput = document.querySelector(".change-names-modal");
        const modalValidation = document.querySelector("#names-submit-btn");
        const xNewName = document.querySelector("#x-name");
        const oNewName = document.querySelector("#o-name");

        button.addEventListener("click", (e) => modalInput.showModal() | 
        modalValidation.addEventListener("click", (e) => e.preventDefault() | modalInput.close() | boardController().changeName(xNewName.value, oNewName.value) | renderCurrentTurn()));
    }();

    // RENDER IT ON PAGE LOAD
    renderCurrentTurn();

    const cells = document.querySelectorAll(".game-block");

    const renderMarksOnDOM = function(index) {
        const boardArray = gameBoard.getBoard();
        if (boardArray[index] !== null) {
            cells[index].appendChild(renderIcon(boardArray[index] === "X" ? xIcon : oIcon));
            boardArray[index] === "X" ? cells[index].firstChild.classList.add("x-icon") : cells[index].firstChild.classList.add("o-icon");
        }
    };

    cells.forEach(function (e) {
        e.addEventListener("click", function () {
            play(Array.from(e.parentNode.children).indexOf(e));
        });
    });

    const renderWinner = function(name, array) {
        const gameOverModal = document.querySelector(".game-over");
        if (gameOverModal.childElementCount > 0)
            gameOverModal.removeChild(gameOverModal.lastChild)
        gameOverModal.childElementCount > 0
        const div = document.createElement("div");

        gameOverModal.appendChild(div);
        div.textContent = name + " WIN!";
        div.classList.add(boardController.getActivePlayer.mark() === "X" ? "x-icon" : "o-icon")
        array.forEach((e) => {
            cells[e].style.backgroundColor = "rgb(255, 255, 255, 0.3)";
            setTimeout(() => {
                cells[e].style.backgroundColor = "";
            }, 3000);
        });
        gameOverModal.showModal();
        gameOverModal.inert = true;
        setTimeout(() => {
            gameOverModal.close();
        }, 3000);
    };
        
    return { renderMarksOnDOM, renderCurrentTurn, renderWinner };
}();