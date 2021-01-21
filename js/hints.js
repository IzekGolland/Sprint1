'use strict'

function showHint(rowIdx,colIdx){
    var currCell;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked){
                if (gBoard[i][j].isMine){
                    currCell = MINE;
                }else{
                    currCell = gBoard[i][j].minesAroundCount;
                }
                var loc = {
                    i: i,
                    j: j
                };
                gHintsGiven.push(loc);
                renderCell(i,j,currCell);
            }
        }
    }
}

function hideHint(){
    for (var i=0;i<gHintsGiven.length;i++){
        renderCell(gHintsGiven[i].i,gHintsGiven[i].j,HIDE);
    }
    gHintsGiven = [];
}

function hintClick(elPic){
    if (gGame.isOn && gHintsLeft > 0){
        if (elPic.src === 'http://127.0.0.1:5500/img/hint.png')
        {
            elPic.src = 'img/usedhint.png'
            gHintMode = true;   
        }else{
            if (gHintMode){
                elPic.src = 'img/hint.png'
                gHintMode = false;
            }
        }
    }
}

function renderHints(){
    var strHtml = '';
    for (var i=1;i<=3;i++){
        strHtml += `<img onclick=hintClick(this) src="img/hint.png"/>`
    }
    var elpicture = document.querySelector('.picturs');
    elpicture.innerHTML = strHtml;
}
