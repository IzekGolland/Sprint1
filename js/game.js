'use strict'

var gBoard = []; 

var gLevel = {
    SIZE: 8,
    MINES: 12
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gFlagesSelected = gLevel.MINES;

function initGame(){
    
    gBoard = buildBoard();
    updateFlagsSelected();
//    console.table(gBoard);
    renderBoard(gBoard,'.board-container');
}

function buildBoard(){
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;
       
        }
    }
    return board;
}

function checkGameOver(){

}

function cellClicked(elCell, i, j) {

    if (!gGame.isOn){
        gGame.isOn = true;
        //debugger;
        setMinesRandom(i,j);
        setMinesNegsCount(i,j);
        printBoard(gBoard);
    }
    
    if (!gBoard[i][j].isMarked){
        if (gBoard[i][j].isMine){
            checkGameOver();
        }else{
            var cell = gBoard[i][j].minesAroundCount;
            gBoard[i][j].isShown = true;
            if (cell===0){
                expandShown(elCell,i,j);
            }
        }
        renderCell(i,j,cell);
    }
}

function cellMarked(elCell,i,j){
    [...document.querySelectorAll(".board-container")].forEach( el => 
        el.addEventListener('contextmenu', e => e.preventDefault())
       );

    if (!gBoard[i][j].isShown){
        if (gBoard[i][j].isMarked){
            gBoard[i][j].isMarked = false;
            gFlagesSelected++;
            renderCell(i,j,'');
        }else{
            gBoard[i][j].isMarked = true;
            gFlagesSelected--;
            renderCell(i,j,'🚩');
        }
        updateFlagsSelected();
    }
}

function expandShown(elCell,rowIdx,colIdx){
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = gBoard[i][j].minesAroundCount;
            if (currCell===0){
                //expandShown(elCell,i,j);
            }
            renderCell(i,j,currCell);
        }
    }
}

function updateFlagsSelected(){
    var elFlagsSelected = document.querySelector('.score');
    elFlagsSelected.innerText = gFlagesSelected;
}