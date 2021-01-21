'use strict'

function setMinesNegsCount(){
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].minesAroundCount = getCountMinesAround(gBoard,i,j);
        }
    }  
}

function setMinesRandom(idxRow,idxCol){
    //debugger;
    var emptyCells = getEmptyCells(gBoard,idxRow,idxCol);
    for (var i=0;i<gLevel.MINES;i++){
        var randIdx = getRandomInt(0, emptyCells.length - 1);
        var randPos = emptyCells[randIdx];
        emptyCells.splice(randIdx,1);
        gBoard[randPos.i][randPos.j].isMine = true;    
    }
}

function revelMines(){
    for (var i=0;i<gBoard.length;i++){
        for (var j=0;j<gBoard[0].length;j++)
        if (gBoard[i][j].isMine){
            renderCell(i,j,MINE);            
        }
    }    
}

function getCountMinesAround(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var currCell = board[i][j]
            if (currCell.isMine) count++
        }
    }
    return count;
}