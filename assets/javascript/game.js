//Library of possible words for the game, which is shuffled at the beginning of every game
var playWords = ["BAD BUNNY", "DADDY YANKEE", "DON OMAR", "OZUNA", "PLAN B", "NICKY JAM"];
shuffle(playWords);

var playWord;
var numOfGuesses;
var guessedLetters;
var underscored;
var atStart = false;
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
    guessedLetters = [];
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

    console.log(underscored.toString().replace(/,/g, '  '))

    updateDiv("numOfGuesses", numOfGuesses);
    updateDiv("underscored", underscored.toString().replace(/\s/g, '&nbsp;').replace(/,/g, ' '));
}


updateDiv("underscored", "Press any key to get started!");
updateDiv("wins", wins.toString());
updateDiv("losses", losses.toString());

document.onkeyup = function (event) {

    if (!atStart) {
        startRound();
    }

    var userKey = event.key.toUpperCase();
    var indexKeeper = playWord.indexOf(userKey);

    if (!isLetter(userKey)) {
        return;
    }

    if (indexKeeper === -1) {
        if (guessedLetters.indexOf(userKey) === -1) {
            numOfGuesses--;
            updateDiv("numOfGuesses", numOfGuesses)
            guessedLetters.push(userKey);
            updateDiv("guessedLetters", guessedLetters)
        }
        else {
            updateDiv("playword", "You've already guessed that letter");
        }
    }
    else {
        for (var i = 0; i < playWord.length; i++) {
            if (playWord[i] === userKey) {
                underscored[i] = playWord[i];
                // ALSO PLAY SOUND OR CHANGE SONG HERE
            }
            updateDiv("underscored", underscored.toString().replace(/,/g, '  '));
        }
    }

    if (underscored.toString() === playWord.toString()) {
        wins++;
        updateDiv("wins", wins.toString());
        startRound();
    }

    if (numOfGuesses === 0) {
        losses++;
        updateDiv("losses", losses.toString());
        startRound();
    }


}
