const GameBoard = (function() {

    let gameString = [];


    const row = 3;
    const column = 3;

    for (i=0; i<row ; i++) {
        gameString[i] = [];
        for (j=0; j<column ; j++) {
            gameString[i].push(Cell());
        }
    };


    const getBoard = function () {
        return gameString;
    };

    const dropToken = (row, column, player) => {
        if (gameString[row][column].getValue() === 0) {
            gameString[row][column].addToken(player)
        }
    };



    const printBoard = () => {
        const boardWithCellValues = gameString.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    const initBoard = () => {
        for (i=0; i<row ; i++) {
            gameString[i] = [];
            for (j=0; j<column ; j++) {
                gameString[i].push(Cell());
            }
        };
    };


    return {
        getBoard,
        dropToken,
        printBoard,
        initBoard
    }
})()



function Cell() {
    let value = 0;
  
    const addToken = (player) => {
      value = player;
    };
  
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
}


const GameController = (function() {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const board = GameBoard;
  
    const players = [
      {
        name: playerOneName,
        token: "X"
      },
      {
        name: playerTwoName,
        token: "O"
      }
    ];

    let activePlayer = players[0];
    let turn = 0;
    let gameEnd = false;
    
  
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    let textToShow = "";
  
    const printNewRound = () => {
        board.printBoard();
        textToShow = `${getActivePlayer().name}'s turn`;
    };

    const checkEmpty = (row,column) => {
        return board.getBoard()[row][column].getValue() === 0;
    }

    const checkWin = () => {
        const winComb = [
            [[0,0],[0,1],[0,2]],
            [[1,0],[1,1],[1,2]],
            [[2,0],[2,1],[2,2]],
            [[0,0],[1,0],[2,0]],
            [[0,1],[1,1],[2,1]],
            [[0,2],[1,2],[2,2]],
            [[0,0],[1,1],[2,2]],
            [[0,2],[1,1],[2,0]],
        ]

        for (i=0 ; i<winComb.length ; i++){
            let boxValues = [];
            for (j=0; j<3 ; j++){
                boxValues.push(board.getBoard()[winComb[i][j][0]][winComb[i][j][1]].getValue())
            }
            if (boxValues[0] === boxValues[1] && boxValues[0] === boxValues[2] && boxValues[0] !== 0) {
                gameEnd = "Win";
                return true;
            }
        }

    }


    const playRound = (row,column) => {
        if (checkEmpty(row,column)) {
            if (gameEnd == 0) {
                board.dropToken(row, column, getActivePlayer().token);
                turn ++
            }
            if (gameEnd != 0) {
                console.log("ici")
            }
            else if (checkWin()) {
                textToShow = `${getActivePlayer().name} wins !`
                board.printBoard()
            }
            else if (turn >=9 ){
                textToShow = "It's a draw!"
                board.printBoard()
                gameEnd = "Null";
            }
            else {
                switchPlayerTurn();
                printNewRound();
            }
        }
        else if (gameEnd == 0) {
            textToShow = "You can't play here!"
        }
    };

    const textToShowOnScreen = () => textToShow

    const resetButton =() => {
        board.initBoard()
        gameEnd = 0;
        activePlayer = players[0];
        turn = 0
        textToShow = `${getActivePlayer().name}'s turn`;
    }

    printNewRound();
  
    return {
      playRound,
      getActivePlayer,
      getBoard: board.getBoard,
      checkWin,
      textToShowOnScreen,
      resetButton
    };

})()




const ScreenController = (function() {
    const game = GameController;
    const resetButton = document.querySelector(".button");
    const textTurn = document.querySelector(".text");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        textTurn.textContent = game.textToShowOnScreen();

        board.forEach((row, indexRow) => {
            row.forEach((cell, index) => { 
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                // Create a data attribute to identify the column
                // This makes it easier to pass into our `playRound` function 
                cellButton.dataset.column = index;
                cellButton.dataset.row = indexRow;
                const valueCell = cell.getValue();
                if (valueCell == 0) {
                    cellButton.textContent = ""
                }
                else {
                    cellButton.textContent = valueCell
                }
                boardDiv.appendChild(cellButton);
            })
        })
    }

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        // Make sure I've clicked a column and not the gaps in between
        if (!selectedColumn) return;
        
        game.playRound(selectedRow,selectedColumn);
        updateScreen();
    }

    function initButton() {
        game.resetButton();
        updateScreen();
    }

    resetButton.addEventListener("click", initButton);
    boardDiv.addEventListener("click", clickHandlerBoard);
    

    // Initial render
    updateScreen();
})()

