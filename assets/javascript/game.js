var winAudio = new Audio('assets/sounds/win.mp3');
var loseAudio = new Audio('assets/sounds/lose.mp3');

var playWords = ["BAD BUNNY", "DADDY YANKEE", "DON OMAR", "OZUNA", "PLAN B", "NICKY JAM"];
shuffle(playWords);

var playWord;
var numOfGuesses;
var guessedWrong;
var underscored;
var atStart = false;
var atEnd = false;
var wins = 0;
var losses = 0;


// This function to shuffle array was taken from https://www.kirupa.com/html5/shuffling_array_js.htm
function shuffle(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = itemAtIndex;
    }
    return array;
}

//function to help test if user is pressing a letter
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

//function to update a given div with a given string
function updateDiv(div, str) {
    document.getElementById(div).innerHTML = str;
}

function startRound() {
    numOfGuesses = 10;
    guessedWrong = [];
    underscored = [];
    atStart = true;
    //pop a word out of the array
    //then turn playWord into an array where each element is a letter/char from the word
    playWord = playWords.pop().split('');;

    for (var i = 0; i < playWord.length; i++) {
        if (playWord[i] === " ") {
            underscored.push(' ');
        }
        else {
            underscored.push('_');
        }
    }

    updateDiv("underscored", underscored.toString().replace(/\s/g, '&nbsp;').replace(/,/g, ' '));
    updateDiv("numOfGuesses", numOfGuesses);
}

function endGame() {
    atEnd = true;
    updateDiv("underscored", "Thanks for playing!");
    updateDiv("guessedWrong", "");
    updateDiv("numOfGuesses", "");
}


//THIS HAPPENS ON A PAGE REFRESH
updateDiv("underscored", "Press any key to get started!");
updateDiv("wins", wins.toString());
updateDiv("losses", losses.toString());

//KEYPRESS CODE
document.onkeyup = function (event) {
    var userKey = event.key.toUpperCase();

    if (atEnd) {
        return;
    }

    if (!atStart) {
        startRound();
    }

    if (!isLetter(userKey)) {
        return;
    }

    if (playWord.indexOf(userKey) === -1) {
        if (guessedWrong.indexOf(userKey) === -1) {
            numOfGuesses--;
            updateDiv("numOfGuesses", numOfGuesses)
            guessedWrong.push(userKey);
            updateDiv("guessedWrong", guessedWrong)
        }
    }
    else {
        for (var i = 0; i < playWord.length; i++) {
            if (playWord[i] === userKey) {
                underscored[i] = playWord[i];
            }
            updateDiv("underscored", underscored.toString().replace(/,/g, '  '));
        }
    }

    if (underscored.toString() === playWord.toString()) {
        wins++;
        updateDiv("wins", wins.toString());
        winAudio.play();
        if (playWords.length === 0) {
            endGame();
        }
        else {
            startRound();
        }
    }

    if (numOfGuesses === 0) {
        losses++;
        updateDiv("losses", losses.toString());
        loseAudio.play();
        if (playWords.length === 0) {
            endGame();
        }
        else {
            startRound();
        }
    }
}
