'use strict'

function safeClick(){
    if (gSafeClickLeft > 0){
        var safePos = getSafeCell();
        markSafeCell(safePos);
        setTimeout(function(){unMarkSafeCell(safePos)},2000);
        gSafeClickLeft--
    }
}

function getSafePos(){
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked && !gBoard[i][j].isMine){
            emptyCells.push({ i: i, j: j });
            }
        }
    }
    return emptyCells;
}

function getSafeCell(){
    var emptyCells = getSafePos();
    var randIdx = getRandomInt(0, emptyCells.length - 1);
    var randPos = emptyCells[randIdx];
    return randPos;
}

function markSafeCell(cellPos){
    var className = '.cell'+cellPos.i+'-'+cellPos.j;
    var elCell = document.querySelector(className);
    elCell.classList.add('selected');
}

function unMarkSafeCell(cellPos){
    var className = '.cell'+cellPos.i+'-'+cellPos.j;
    var elCell = document.querySelector(className);
    elCell.classList.remove('selected');
}
