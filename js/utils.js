function renderBoard(board, selector) {
    var strHTML = '<table border="0"><tbody>';
    var cell = '';
    for (var i = 0; i < board.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < board[0].length; j++) {
//        if (board[i][j].isMine){
//            cell = '*';
//       }else{
//            cell = board[i][j].minesAroundCount;
//        }
        strHTML += `<td class="cell cell${i}-${j}" 
        onclick="cellClicked(this,${i},${j})" 
        oncontextmenu="cellMarked(this,${i},${j})">${cell}</td>`
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
  }

function renderCell(i,j,value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${i}-${j}`);
    elCell.innerHTML = value;
}

function getEmptyCells(board,idxRow,idxCol) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
                if (i===idxRow && j===idxCol){
                    continue;
                }else{
                    emptyCells.push({ i: i, j: j })
                }
        }
    }
    console.log(emptyCells);
    return emptyCells;
}
  
  
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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

/*function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}*/