'use strict'

const MINE = '*';

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

