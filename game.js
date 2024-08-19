const ticTacToe = (function() {

    let gameString = [[0,0,0],[0,0,0],[0,0,0]];

    function render() {
        console.log(gameString);
    }

    function addInput(i,j) {
        gameString[i][j] = "X";
        render();
    }

    return {
        addInput: addInput
    }
})()