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
    playerOneName = "Player One";
    playerTwoName = "Player Two";

    const board = GameBoard;
  
    const players = [
      {
        name: playerOneName,
        token: 1
      },
      {
        name: playerTwoName,
        token: 2
      }
    ];

    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
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
                return true;
            }
        }

    }


    const playRound = (row,column) => {
        if (checkEmpty(row,column)) {
            console.log(
            `Dropping ${getActivePlayer().name}'s token`
            );
            board.dropToken(row, column, getActivePlayer().token);

            if (checkWin()) {
                console.log (`${getActivePlayer().name} wins !`)
                board.printBoard()
                board.initBoard()
                activePlayer = players[0];
            }
            else {
                switchPlayerTurn();
                printNewRound();
            }

        }
        else {
            console.log("You can't play here!")
        }
    };

    printNewRound();
  
    return {
      playRound,
      getActivePlayer
    };

})()

const game = GameController;
