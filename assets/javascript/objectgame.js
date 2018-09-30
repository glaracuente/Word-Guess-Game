//Library of possible words for the game
var playWords = ["TESTER", "GERRY"];

function updateDiv(div, str) {
    document.getElementById(div).textContent = str;
}

var game = {
    //pick random word from possible list of words
    playWord: playWords[Math.floor(Math.random() * playWords.length)].split(''), //NEED TO REMOVE WORDS AFTER THEY ARE ALREADY USED 
    //turn playWord into an array where each element is a letter/char from the word
    //set total nuber of possible guesses an reset array of guessed letters 
    numOfGuesses: 20,
    guessedLetters: [],
    //create array full of underscore chars...with lenght equal to playWord
    underscored: [],
   
   
    begin: function () {
        updateDiv("numOfGuesses", numOfGuesses);
        updateDiv("underscored", underscored.toString().replace(/,/g, '  '));
        updateDiv("display", "Press any letter to begin!");
    }
}
game.begin();

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function indexOfGuess(str) {
    return playWord.indexOf(str);
}

for (var i = 0; i < playWord.length; i++) {
    underscored.push('_');
}

//$(document).ready(function() {
document.onkeyup = function (event) {
    updateDiv("display", "");
    var userKey = event.key.toUpperCase();
    if (!isLetter(userKey)) {
        return;
    }
    //if //userKey is in the underscored array {
    //alert that they already picked this letter
    //}
    var indexKeeper = indexOfGuess(userKey);
    if (indexKeeper === -1) {
        if (guessedLetters.indexOf(userKey) === -1) {
            numOfGuesses--;
            updateDiv("numOfGuesses", numOfGuesses)
            guessedLetters.push(userKey);
            updateDiv("guessedLetters", guessedLetters)
        }
        else {
            updateDiv("display", "You've already guessed that letter");
        }
    }
    else {
        for (var i = 0; i < underscored.length; i++) {
            if (playWord[i] === userKey) {
                underscored[i] = playWord[i];
                // ALSO PLAY SOUND OR CHANGE SONG HERE
            }
            updateDiv("underscored", underscored.toString().replace(/,/g, '  '));
        }
    }
    console.log(playWord)
    console.log(underscored)
    if (underscored.equals(playWord) || numOfGuesses === 0) {
        updateDiv("display", "game over");
    }
    //NEED TO MOVE THIS ALL TO JS FILE
    //ALSO NEED TO TREAT THE GAME AS AN OBJECT 
    // BONUS
    //***ALLOW USER TO USE DROP DOWN TO PICK A THEME….WHICH WILL CHANGE STYLING AND WORD DATABASE
}