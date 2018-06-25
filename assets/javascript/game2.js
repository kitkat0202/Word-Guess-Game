//VARIABLES
var gameStart = false;
var hangWords = [
    {name: "naruto", image: "assets/images/placeholder-1366x768.jpg", sound: "assets/sound/sailor-moon.mp3"},
    {name: "one piece", image: "assets/images/placeholder-1366x768.jpg", sound: "assets/sound/sailor-moon.mp3"},
    {name: "death note", image: "assets/images/placeholder-1366x768.jpg", sound: "assets/sound/sailor-moon.mp3"},
    {name: "fullmetal alchemist", image: "assets/images/placeholder-1366x768.jpg", sound: "assets/sound/sailor-moon.mp3"},
    {name: "pokemon", image: "assets/images/placeholder-1366x768.jpg", sound: "assets/sound/sailor-moon.mp3"},
    {name: "digimon", image: "assets/images/placeholder-1366x768.jpg", sound: "assets/sound/sailor-moon.mp3"},
    {name: "dragonball z", image: "assets/images/placeholder-1366x768.jpg", sound: "assets/sound/sailor-moon.mp3"},
    {name: "sword art online", image: "assets/images/placeholder-1366x768.jpg", sound: "assets/sound/sailor-moon.mp3"},
    {name: "bleach", image: "assets/images/placeholder-1366x768.jpg", sound: "assets/sound/sailor-moon.mp3"},
    {name: "guilty crown", image: "assets/images/placeholder-1366x768.jpg", sound: "assets/sound/sailor-moon.mp3"}
  ];
 
var randomNum
var chosenWord
var userGuess
var correctLetters = [];
var incorrectLetters = [];

var turnCount
var lives = 10
var winScore = 0
var loseScore = 0

//Shortcuts
var hangSpan = document.getElementById("hang-word");
var wrongSpan = document.getElementById("key-wrong");
var hangImg = document.getElementById("hanged-man-img");
var livesSpan = document.getElementById("life-counter");
var pressSpan = document.getElementById("key-press");
var winSpan = document.getElementById("wins");
var loseSpan = document.getElementById("loses");

winSpan.innerHTML = winScore;
loseSpan.innerHTML = loseScore;






//FUNCTIONS

/////////////////////////   GET WORD && TURN #   //////////////////////
// generates a randome number and choses the word
function ransomdomize() {
    randomNum = Math.floor(Math.random() * hangWords.length);
    chosenWord = hangWords[randomNum].name.toLocaleUpperCase();
    flatArr();
}

// counts # of letters and # in chosenWord
function flatArr() {
    var toArr = [];
    for (var i = 0; i < chosenWord.length; i++) {
        if(/[a-zA-Z0-9]/.test(chosenWord[i])) {
          toArr.push(chosenWord[i]);
        }
    }
    turnCount = toArr.length;
}





/////////////////////////   CREATING SPANS   //////////////////////
// create chosenWord.length of span boxed (not including special characters)
function createSpan() {
    for (var i = 0; i < chosenWord.length; i++) {
        if (!/[a-zA-Z0-9]/.test(chosenWord[i])) {
            var whiteSpace = document.createElement("span");
            whiteSpace.innerHTML = chosenWord[i];
            whiteSpace.className = "space";
            
            var br = document.createElement("br");
            
            hangSpan.appendChild(whiteSpace);
            hangSpan.appendChild(br);
        } else {
            var letter = document.createElement("span");
            letter.innerHTML = `_`;
            letter.className = "letter";
            letter.id = `letter${i}`;
            
            hangSpan.appendChild(letter);
        }
    }

}

//remove all span
function removeSpan() {
    hangSpan.innerHTML = "";
}

//create a span and add letter x to Incorrect Guess
function addToIncorrect(x) {
    var letter = document.createElement("span");
    letter.innerHTML = `${x}`;
    letter.className = "letter";
    
    wrongSpan.appendChild(letter);
}

// Show the last key pressed
function showKeyPress(x) {
    pressSpan.innerHTML = "";
    pressSpan.innerHTML = x;
}







/////////////////////////   NEW GAME && RESTART   //////////////////////
// Runs when button is pushed (clear the arrays, get new word) GAME TIME
function newGame() {
    gameStart = true
    removeSpan();
    gameStart = true;
    correctLetters = [];
    incorrectLetters = [];
    lives = 10;
    turnCount = 0;
    hangImg.src = "assets/images/0.png";
    livesSpan.innerHTML = lives;
    ransomdomize();
    createSpan();
    console.log(chosenWord); //remove when Done
    
}

// RESET/ START Runs when button is pushes (resets the win loose as well) GAME TIME
function reset() {
    winScore = 0;
    loseScore = 0;
    stopAudio();
    newGame();
}







//////////////// Make All Buttons Work /////////////////
// Start game button
$(document).ready(function(){
    $("#start-game").click(function(){
        $(".pre-game, .post-win, .post-lose").addClass("disappear");
        $(".game-time").removeClass("disappear");
        reset();
        playAudio() 
    });
});

//New Game Buttons
$(document).ready(function(){
    $("#newGame-btn2, #newGame-btn3").click(function(){
        $(".pre-game, .post-win, .post-lose").addClass("disappear");
        $(".game-time").removeClass("disappear");
        newGame();
    });
});

$(document).ready(function(){
    $("#newGame-btn1").click(function(){
        newGame();
    });
});


//Reset Game Button
$(document).ready(function(){
    $("#resetGame-btn1, #resetGame-btn2, #resetGame-btn3").click(function(){
        $(".game-time, .post-win, .post-lose").addClass("disappear");
        $(".pre-game").removeClass("disappear");
        reset();
    });
});


/////////////////////////   MUSIC CONTROLS   //////////////////////
function playAudio() { 
    document.getElementById("bg-audio").play();
} 

function pauseAudio() {
    document.getElementById("bg-audio").pause();
}

function stopAudio() {
    document.getElementById("bg-audio").pause();
    document.getElementById("bg-audio").currentTime = 0.0;
}






/////////////////// GAME STATUS CHECK///////////////
var checkWin = function() {
    if (turnCount === correctLetters.length) {
        winScore++
        winSpan.innerHTML = winScore;
        setTimeout(function() {
            $(".pre-game, .game-time, .post-lose").addClass("disappear");
            $(".post-win").removeClass("disappear");
        }, 800);
        return true;
    }
}

var checkLose = function() {
    if(lives === incorrectLetters.length) {
        loseScore++
        loseSpan.innerHTML = loseScore;
        
        setTimeout(function() {
            $(".pre-game, .game-time, .post-win").addClass("disappear");
            $(".post-lose").removeClass("disappear");
        }, 800);
        return true;
    }
}

function stopGame() {
    if (checkWin() || checkLose()) {
        gameStart = false;
    }
}







//////////////// The WHOLE GAME BELOW ////////////////////
document.onkeyup = function(event) {
    if (gameStart) {
        userGuess = event.key.toLocaleUpperCase();

        ////// Check if the event has already been chosen and if key is is a letter or number only (blank space and all oter keys will not work)////////////
        // Another way to exclude other key word is to use reg expression (/[a-zA-Z0-9]/.test(chosenWord[i])) == only return true if it is a letter or #

        // if you dont want # keys change "48" to "65"
        if (!correctLetters.includes(userGuess) && !incorrectLetters.includes(userGuess) && event.which <= 90 && event.which >= 48){
            showKeyPress(userGuess);

            //////// Check if the letter is correct ////////////
            // If letter is CORRECT -- need loop to check if there are multiple same letters
            for (var i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === userGuess) {
                    document.getElementById(`letter${i}`).innerHTML = userGuess;
                    correctLetters.push(userGuess);
                }
            }

            // If letter is WRONG -- cant be in loop or else will push to incorrectArray multi-times
            if (!chosenWord.includes(userGuess)) {
                incorrectLetters.push(userGuess);
                addToIncorrect(userGuess);
                hangImg.src = `assets/images/${incorrectLetters.length}.png`;
                livesSpan.innerHTML = lives - incorrectLetters.length;
            }

            if (incorrectLetters.length === 7) {
                document.getElementById("hanged-pic").style.color = "red";
            }

        //Remove the 2 else below later not needed:
        } else if (correctLetters.includes(userGuess) || incorrectLetters.includes(userGuess)) {
            /////// make alert message that the letter already chosen
            console.log(`letter ${userGuess} already chosen`);
        } else {
            console.log(`can not use ${userGuess} key`);
        }

        stopGame();
    }
}




// How many turns to win -- IDEA SCRAPED too hard to do with duplicate letters
//NOT NEEDED -.-
// var countWinTurns = function() {
//     console.log("COUNT TURN FUNCTION"); // REMOVE

//     // make string to an array and reomve all specia characters
//     var toArr = [];
//     for (var i = 0; i < chosenWord.length; i++) {
//         if(/[a-zA-Z0-9]/.test(chosenWord[i])) {
//           toArr.push(chosenWord[i]);
//         }
//     }
//     //remove duplicates
//     function onlyUnique(value, index, self) { 
//         return self.indexOf(value) === index;
//     }
//     var toUnique = toArr.filter( onlyUnique );
//     //return the legnth of array
//     return toUnique.length;
// }



//REMOVE BUTTONS LATER
// Buttons created to check style the dissapearing divs
// $(document).ready(function(){
//     $("#preGame").click(function(){
//     $(".game-time, .post-win, .post-lose").addClass("disappear");
//     $(".pre-game").removeClass("disappear");
//     });
// });

// $(document).ready(function(){
//     $("#gameTime").click(function(){
//     $(".pre-game, .post-win, .post-lose").addClass("disappear");
//     $(".game-time").removeClass("disappear");
//     reset();
//     });
// });

// $(document).ready(function(){
//     $("#win").click(function(){
//     $(".pre-game, .game-time, .post-lose").addClass("disappear");
//     $(".post-win").removeClass("disappear");
//     });
// });

// $(document).ready(function(){
//     $("#lose").click(function(){
//     $(".pre-game, .post-win, .game-time").addClass("disappear");
//     $(".post-lose").removeClass("disappear");
//     });
// });