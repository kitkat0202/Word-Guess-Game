// make all lettters capital



//Necessary Golbal variables
var hangWords = ["naruto", "one piece", "death note", "fullmetal alchemist", "pokemon", "digimon", "dragonball z", "sword art online", "bleach", "guilty crown"];
var chosenWord = hangWords[Math.floor(Math.random() * hangWords.length)].toLocaleUpperCase();
var correctLetters = [];
var incorrectLetters = [];


//Shortcuts
var handSpan = document.getElementById("hang-word");


//Not used
var blankCounter = new Array(chosenWord.match(/\S/g).length);



//////Test:
console.log(chosenWord);
console.log(chosenWord.length);
// console.log(blankCounter -1);







//////////// Creates the blank spaces for hangman///////////////////
for (var i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i] === " ") {
        var whiteSpace = document.createElement("span");
        whiteSpace.innerHTML = " ";
        whiteSpace.className = "space";

        var br = document.createElement("br");

        handSpan.appendChild(whiteSpace);
        handSpan.appendChild(br);
    } else {
        var letter = document.createElement("span");
        letter.innerHTML = `_`;
        letter.className = "letter";
        letter.id = `letter${i}`;

        handSpan.appendChild(letter);
    }
}






//////////////// Gets the letter that is pushed ////////////////////
document.onkeyup = function(event) {
    var userGuess = event.key.toLocaleUpperCase();

    ////// Check if the event has already been chosen and if key is is a letter or number only (blank space and all oter keys will not work)////////////
    // if you dont want # keys change "48" to "65"
    if (!correctLetters.includes(userGuess) && !incorrectLetters.includes(userGuess) && event.which <= 90 && event.which >= 48){
        //Test:
        console.log("inside first if");

        //////// Check if the letter is correct ////////////
        if (chosenWord.includes(userGuess)) {
            var i = chosenWord.indexOf(userGuess)
            document.getElementById(`letter${i}`).innerHTML = userGuess.toLocaleUpperCase();
            correctLetters.push(userGuess);
            //Test:
            console.log("The user guessed correct: " + userGuess);
            console.log(correctLetters);
            
        } else {
            incorrectLetters.push(userGuess);
            //Test:
            console.log("bad guess: " + userGuess);
            console.log(incorrectLetters);
        }


    } else if (correctLetters.includes(userGuess) || incorrectLetters.includes(userGuess)) {
        /////// make alert message that the letter already chosen
        console.log(`letter ${userGuess} already chosen`);
    } else {
        console.log(`can not use ${userGuess} key`);
    }
}


////////// Need counter to count turns///////////////
    //incorrect length to count turns


////////// end game message //////////

////// auto refresh page to restar game ////////////







// document.getElementById("hang-word").appendChild(letter);
// document.getElementById("hang-word").appendChild(whiteSpace);
// document.getElementById(`letter0`).innerHTML = "New text!";


var array = ["a", "b", "c"]
var stringa = "a"
var stringb = "d"

var checka = array.includes(stringa)
var checkb = array.includes(stringb)

// console.log("a is " + checka);
// console.log(checka == false);
// console.log("b is " + checkb);
// console.log(checkb == false);

// if (!checka) {
//     console.log("hello");
    
// }

