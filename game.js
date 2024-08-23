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
        gameString
    };

    const dropToken = (row, column, player) => {
        if (gameString[row][column] === 0) {
            gameString.addToken(player);
        }
    };

    const printBoard = () => {
        const boardWithCellValues = gameString.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    return {
        getBoard,
        dropToken,
        printBoard
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

/*let turn = 0;

function render() {
    console.log(gameString);
}

function init() {
    gameString = [[".",".","."],[".",".","."],[".",".","."]];
    turn = 0;
}

function checkWin() {
    let winner = 0;
    for (let i = 0; i < 3 ; i++) {
        if (gameString[i][0] != "." && gameString[i][0]==gameString[i][1] && gameString[i][0]==gameString[i][2]){
            winner = gameString[i][0];
            init();
            return console.log("winner is " + winner)
        }
        if (gameString[0][i] != "." && gameString[0][i]==gameString[1][i] && gameString[0][i]==gameString[2][i]){
            winner = gameString[0][i];
            init();
            return console.log("winner is " + winner)
        }
    }

    if (gameString[0][0] != "." && gameString[0][0]==gameString[1][1] && gameString[0][0]==gameString[2][2]){
        winner = gameString[0][0];
        init();
        return console.log("winner is " + winner)
    }
    if (gameString[0][2] != "." && gameString[0][2]==gameString[1][1] && gameString[0][2]==gameString[2][0]){
        winner = gameString[0][2];
        init();
        return console.log("winner is " + winner)
    }
    if (turn == 9) {
        init();
        return console.log("It's a tie!")
    }

}

function addInput(i,j) {
    if ( turn % 2 == 0 && gameString[i][j] == "."){
        gameString[i][j] = "X";
        turn ++;
        render();
        checkWin();
    }
    else if (gameString[i][j] == "."){
        gameString[i][j] = "O";
        turn ++;
        render();
        checkWin();
    }
}


const players = (function () {
    function player () {
    }
})()*/