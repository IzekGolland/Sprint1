'use strict'

function setHighScore(){
    var currHighScore = 0;
    var elTime = document.querySelector('.timer');
    var newHighScore = +elTime.innerText
    var currHighUser = localStorage.getItem(gLevel.SIZE);
    if (currHighUser){
        var strCurrHighScore = currHighUser.split('-');
        currHighScore = +strCurrHighScore[1];
    }
    
    if (newHighScore < currHighScore || !currHighScore){
        var userName = prompt('You are the Camp!! what is your name?')
        var strChamp = userName + '-' + newHighScore;
        localStorage.setItem(gLevel.SIZE , strChamp);
        initHighScore();
    }
}

function initHighScore(){
    var currHighUser = localStorage.getItem(gLevel.SIZE);
    if (currHighUser){
        var strCurrHighScore = currHighUser.split('-');
        var currHighScore = strCurrHighScore[1];
        var currHighName = strCurrHighScore[0];
        var elHighScore = document.querySelector(".score");
        var elHighName = document.querySelector(".name");
        elHighName.innerText = currHighName;
        elHighScore.innerText = currHighScore;
    }else{
        var elHighScore = document.querySelector(".score");
        var elHighName = document.querySelector(".name");
        elHighName.innerText = '';
        elHighScore.innerText = '';
    }
}

function clearSorage(){
    localStorage.clear();
    initHighScore();
}