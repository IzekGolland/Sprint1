'use strict'

const MINE = '🔥';
const SMILEY = '😀';
const WIN_SMILEY = '😍';
const LOSE_SMILEY = '🤯';
const FLAG = '🚩';
const HIDE = '';

var gBoard = []; 
var gGame = {};
var gLevel = {
    SIZE: 8,
    MINES: 12
};
var gLivesLeft;
var gFirstClick;
var gElapsedTimeIntervalRef;
var gHintMode;
var gHintsLeft;
var gSafeClickLeft;
var gHintsGiven = [];

function initGame(){
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };

    gFirstClick = true;
    gLivesLeft = 3;
    gHintsLeft = 3;
    gSafeClickLeft = 3;
    gHintMode = false;
    gBoard = buildBoard();
    initHighScore();
    updateLives();
    updateFlagsSelected();
    stopTimer();
    clearTimer();
    renderBoard(gBoard,'.board-container');
    renderHints();
    var elRestartButton = document.querySelector(".restart");
    elRestartButton.innerText = SMILEY;
}

function restart(){
    initGame();
}

function cellClicked(i, j) {
    var cell;
    
    if (gFirstClick) beginGame(i,j);
    if (gHintMode){
        showHint(i,j);
        setTimeout(function(){hideHint(i,j)},2000);
        gHintsLeft--;
        gHintMode = false;
        return;
    }

    if (gGame.isOn && !gBoard[i][j].isMarked){
        if (gBoard[i][j].isMine){
            cell = MINE;
            gLivesLeft--;
            updateLives();
            if (!gLivesLeft) gameOver(); 
            else return;
        }else{
            cell = gBoard[i][j].minesAroundCount;
            if (!gBoard[i][j].isShown){
                gBoard[i][j].isShown = true;
                gGame.shownCount++
            }
            if (!cell) expandShown(i,j);
            checkGameOver();
        }
        renderCell(i,j,cell);
    }
}

function cellMarked(i,j){

    [...document.querySelectorAll(".board-container")].forEach( el => 
        el.addEventListener('contextmenu', e => e.preventDefault())
    );
    if (gGame.isOn && gLevel.MINES && !gBoard[i][j].isShown){
        if (gBoard[i][j].isMarked && gGame.markedCount > 0){
                gBoard[i][j].isMarked = false;
                gGame.markedCount--;
                renderCell(i,j,HIDE);
        } else if (gGame.markedCount - gLevel.MINES < 0){
                gBoard[i][j].isMarked = true;
                gGame.markedCount++;
                renderCell(i,j,FLAG);
                checkGameOver();
        }
        updateFlagsSelected();
    }
}

function expandShown(rowIdx,colIdx){
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked){
                var currCell = gBoard[i][j].minesAroundCount;
                gGame.shownCount++
                gBoard[i][j].isShown = true;
                if (!currCell) expandShown(i,j);
                renderCell(i,j,currCell);
            }
        }
    }
}

function updateFlagsSelected(){
    var elFlagsSelected = document.querySelector('.flags');
    elFlagsSelected.innerText = gLevel.MINES - gGame.markedCount;
}

function beginGame(i,j){
    gFirstClick = false;
    gGame.isOn = true;
    startTimer();
    setMinesRandom(i,j);
    setMinesNegsCount(i,j);
    printBoard(gBoard);
}

function checkGameOver(){
    if (gGame.shownCount === (gLevel.SIZE*gLevel.SIZE - gLevel.MINES) && gGame.markedCount === gLevel.MINES){
        var elRestartButton = document.querySelector(".restart");
        elRestartButton.innerText = WIN_SMILEY;
        setHighScore();
        gGame.isOn = false;
        stopTimer();
    }
}

function gameOver(){
    var elRestartButton = document.querySelector(".restart");
    elRestartButton.innerText = LOSE_SMILEY;
    gGame.isOn = false;
    stopTimer();
    revelMines();
}

function difChange(elRadio){
    var parts = elRadio.value.split('-')
    if (+parts[0] !== gLevel.SIZE){
        gLevel.SIZE = +parts[0];
        gLevel.MINES = +parts[1];  
        restart();
    }
}

function updateLives(){
    var elLives = document.querySelector('.lives');
    elLives.innerText = gLivesLeft;
}