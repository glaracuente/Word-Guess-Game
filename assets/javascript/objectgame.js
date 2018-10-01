




var game = {
    winAudio: new Audio('assets/sounds/win.mp3'),
    loseAudio: new Audio('assets/sounds/lose.mp3'),
    playWords: ["BAD BUNNY", "DADDY YANKEE", "DON OMAR", "OZUNA", "PLAN B", "NICKY JAM"],
    playWord: "",
    numOfGuesses: 10,
    guessedWrong: [],
    underscored: [],
    atStart: false,
    atEnd: false,
    wins: 0,
    losses: 0,

    shuffle(playWords);
    // This line is important!
    //var thisObject = this,
    // this.wins = 0,



    //changeName("Blue Shell");
    //console.log(thisObject);
};
//myObj.yell();

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

game.playWord = game.playWords.pop().split('');
console.log(game.playWord);