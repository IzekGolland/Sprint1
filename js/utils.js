function buildBoard(){
    var board = [];
    //debugger;
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

function renderBoard(board, selector) {
    var strHTML = '<table border="0"><tbody>';
    var cell = '';
    for (var i = 0; i < board.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < board[0].length; j++) {
        strHTML += `<td class="cell gray cell${i}-${j}" 
        onclick="cellClicked(${i},${j})" 
        oncontextmenu="cellMarked(${i},${j})">${cell}</td>`
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
  }

function renderCell(i,j,value) {
    var elCell = document.querySelector(`.cell${i}-${j}`);
    if (value >= 0 && value !== ''){
        elCell.classList.remove('gray');
        elCell.classList.add('shown');
        if (!value) value='';
    }else{
        elCell.classList.remove('shown');
        elCell.classList.add('gray');
    }
    elCell.innerHTML = value;
}

function getEmptyCells(board,idxRow,idxCol) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (i===idxRow && j===idxCol) continue;
            else emptyCells.push({ i: i, j: j });
       }
    }
    return emptyCells;
}

function printBoard(board){
    var strBoard = '';
    for (var i=0; i<board.length; i++){
        for (var j=0; j<board[0].length; j++){
            var cell = '';
            if (board[i][j].isMine){
                cell = MINE;
            }else{
                cell = board[i][j].minesAroundCount;
            } 
            strBoard += cell + '\t';
        }
        strBoard += '\n';
    }
    console.log(strBoard);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function startTimer(){
    var startDate = Date.now();
    gElapsedTimeIntervalRef = setInterval(function(){
        mathTime(startDate);}, 1000);
}

function stopTimer(){
    clearInterval(gElapsedTimeIntervalRef);
}

function mathTime(startDate){
    var elTime = document.querySelector('.timer');
    elTime.innerText = (Math.floor((Date.now() - startDate)/1000));
}

function clearTimer(){
    var elTime = document.querySelector('.timer');
    elTime.innerText = '0';
}
