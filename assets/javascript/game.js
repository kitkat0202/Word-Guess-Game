$(function() {

//ARRAYS AND OBJECTS
var hangWords = [
    {name: "naruto", image: "assets/images/mini/naruto.png"},
    {name: "one piece", image: "assets/images/mini/one-piece.png"},
    {name: "fullmetal alchemist", image: "assets/images/mini/fullmetal-alchemist.png"},
    {name: "pokemon", image: "assets/images/mini/pokemon.png"},
    {name: "digimon", image: "assets/images/mini/digimon.png"},
    {name: "dragonball z", image: "assets/images/mini/dragonball-z.png"},
    {name: "bleach", image: "assets/images/mini/bleach.png"},
    {name: "cardcaptor sakura", image: "assets/images/mini/card-captor.png"},
    {name: "fairy tail", image: "assets/images/mini/fairy-tail.png"},
    {name: "fate/zero", image: "assets/images/mini/fate-stay-night.png"},
    {name: "hitman reborn!", image: "assets/images/mini/hitman-reborn.png"},
    {name: "howl's moving castle", image: "assets/images/mini/howls-moving-castle.png"},
    {name: "hunter x hunter", image: "assets/images/mini/hunter-x-hunter.png"},
    {name: "inuyasha", image: "assets/images/mini/inyuasha.png"},
    {name: "your name", image: "assets/images/mini/kimi-no-nawa.png"},
    {name: "shaman king", image: "assets/images/mini/kororo.png"},
    {name: "princess mononoke", image: "assets/images/mini/mononoke-hime.png"},
    {name: "my neighbor totoro", image: "assets/images/mini/my-neighbor-totoro.png"},
    {name: "negima", image: "assets/images/mini/negima.png"},
    {name: "no game no life", image: "assets/images/mini/no-game-no-life.png"},
    {name: "one punch man", image: "assets/images/mini/one-punch-man.png"},
    {name: "ouran highschool host club", image: "assets/images/mini/ouran-highschool-host-club.png"},
    {name: "rurouni kenshin", image: "assets/images/mini/rurouni-kenshin.png"},
    {name: "sailor moon", image: "assets/images/mini/sailor-moon.png"},
    {name: "spirited away", image: "assets/images/mini/spirited-away.png"},
    {name: "summer wars", image: "assets/images/mini/summer-wars.png"},
    {name: "sword art online", image: "assets/images/mini/sword-art-online.png"},
    {name: "tsubasa reservoir chronicle", image: "assets/images/mini/tsubasa-reservoir-chronicle.png"},
    {name: "wolf children", image: "assets/images/mini/wolf-children.png"},
    {name: "yu-gi-oh!", image: "assets/images/mini/yu-gi-oh.png"},
    {name: "guilty crown", image: "assets/images/mini/guilty_crown.png"},
    {name: "akatsuki no yona", image: "assets/images/mini/akatsuki_no_yona.png"},
    {name: "cowboy bebop", image: "assets/images/mini/cowboy-bebop.png"},
    {name: "magi: the labyrinth of magic", image: "assets/images/mini/magi2.png"},
    {name: "neon genesis evangelion", image: "assets/images/mini/neon-genesis-evangelion.png"},
    {name: "ranma 1/2", image: "assets/images/mini/ranma.png"},
    {name: "samurai champloo", image: "assets/images/mini/samurai-champloo.png"},
    {name: "skip beat", image: "assets/images/mini/skip_beat.png"},
    {name: "food wars", image: "assets/images/mini/food_wars.png"},
    {name: "seven deadly sins", image: "assets/images/mini/seven-deadly-sins.png"}
  ];

  var usedWords = [];

//VARIABLES
var gameStart = false;
var randomNum
var chosenWord
var chosenImg
var userGuess
var correctLetters = [];
var incorrectLetters = [];
var toggler = true;

var turnCount
var lives = 10 // chagne to any number will not affect game
var winScore = 0
var loseScore = 0




//default display at window start
$(function() {
  $("#wins").html(winScore); //add win score
  $("#loses").html(loseScore); // add lose score
  $("#key-press").empty(); // clear key pressed
  $("#key-wrong").empty();
  $("#hint-img").attr("src", "#").hide(); // clear hint image
  $("#lives").html(lives);
  $("#word-display2").html("Press Any Key To Start Hangman").css("color", "#464646");
});



//FUNCTIONS
/////////////////////////  FUN DOM MANIPULATION   /////////////////////
function playAudio() { 
  document.getElementById("bg-audio").play()
  $(".audio-btn").addClass("audio-active").html("Stop Music")
} 

function stopAudio() {
  document.getElementById("bg-audio").pause()
  document.getElementById("bg-audio").currentTime = 0.0
  $(".audio-btn").removeClass("audio-active").html("Play Music")
}

function clearOut() {
  removeSpan();
  correctLetters = [];
  incorrectLetters = [];
  turnCount = 0;
  toggler = true;
  
  $("#wins").html(winScore); //add win score
  $("#loses").html(loseScore); // add lose score
  $("#key-press").empty(); // clear key pressed
  $("#key-wrong").empty();
  $("#hint-img").attr("src", "#").hide(); // clear hint image
  $("#lives").html(lives);
  $("#word-display2").html("Press Any Key To Start Hangman").css("color", "#464646");
  $("#grow").css({"width": "100%"});
}

function wisdom() {
  switch (incorrectLetters.length) {
    case 5:
    $("#word-display2").html("Getting kind of close here!!").css("font-weight", "bold");
      break;
    case 7:
      $("#word-display2").html("What are you doing to me MAN !!");
      $("#hint-img").attr("src", "assets/images/mini/sw-2.png");
      setTimeout(function() {
        $("#hint-img").attr("src", chosenImg);
      }, 1000);
      break;
    case 9:
      $("#word-display2").html("It's OVER!! It's OVER!! My Life is over").css("color", "red");
      $("#hint-img").attr("src", "assets/images/mini/sw-3.png");
      setTimeout(function() {
        $("#hint-img").attr("src", chosenImg);
      }, 1000);
      break;

    default:
      break;
  }
}


/////////////////////////   GET WORD && TURN #   //////////////////////
// generates a randome number, choses the word and img, remove the word from array
function ransomdomize() {
  if (hangWords.length === 1) {
    addBack();
  }
  randomNum = Math.floor(Math.random() * hangWords.length);
  chosenWord = hangWords[randomNum].name.toLocaleUpperCase();
  chosenImg = hangWords[randomNum].image;
  flatArr();
  removeWord(randomNum);
}


// counts how many correct turns it will take to win
function flatArr() {
  var toArr = [];
  for (var i = 0; i < chosenWord.length; i++) {
      if(/[a-zA-Z0-9]/.test(chosenWord[i])) {
        toArr.push(chosenWord[i]);
      }
  }
  turnCount = toArr.length;
}


function removeWord(x) {
  usedWords.push(hangWords.splice(x, 1));
}

function addBack() {
  usedWords.forEach(obj => {
    hangWords.push(obj[0])
  })

  usedWords = []
}

/////////////////////////   CREATING SPANS   //////////////////////
// create chosenWord.length of span boxed (not including special characters), also add the hint img
function createSpan() {
  for (var i = 0; i < chosenWord.length; i++) {
      if (!/[a-zA-Z0-9]/.test(chosenWord[i])) {
          var whiteSpace = $("<span>").addClass("letter").html(chosenWord[i]);
          if (/\s+/.test(chosenWord[i])) {
            $("#hang-word").append(whiteSpace);
            $("#hang-word").append($("<br>"));
          } else {
            $("#hang-word").append(whiteSpace);
          }
      } else {
          var letter = document.createElement("span");
          letter.innerHTML = `_`;
          letter.className = "letter";
          letter.id = `letter${i}`;
          
          $("#hang-word").append(letter);
      }
  }
  $("#hint-img").attr("src", chosenImg).show();
}


//remove all span and hint img
function removeSpan() {
  $("#hang-word").empty();
  $("#hint-img").attr("src", "#").hide();
}

//create a span and add letter x to Incorrect Guess
function addToIncorrect(x) {
  var letter = $("<span>").html(`${x}`).addClass("letter");
  $("#key-wrong").append(letter);
}

// Show the last key pressed
function showKeyPress(x) {
  $("#key-press").empty();
  $("#key-press").html(x);
}




/////////////////// GAME STATUS CHECK///////////////
function checkGuess(x) {
  //////// Check if the letter is correct ////////////
  // If letter is CORRECT -- need loop to check if there are multiple same letters
  for (var i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i] === x) {
      $(`#letter${i}`).html(x);
      correctLetters.push(x);
    }
  }

  // If letter is WRONG -- cant be in loop or else will push to incorrectArray multi-times
  if (!chosenWord.includes(x)) {
      incorrectLetters.push(x);
      addToIncorrect(x);
      // make red div grow
      $("#lives").html(lives - incorrectLetters.length);
      $("#grow").animate({width: `${100-(incorrectLetters.length / lives * 100)}%`});
      wisdom();
  }
}



function checkWin() {
  if (turnCount === correctLetters.length) {
      gameStart = false;
      winScore++
      $("#wins").html(winScore);
      setTimeout(function() {
        $("#hint-img").attr("src", "#").hide();
        $(".game-time").addClass("disappear");
        $("#win").removeClass("disappear");
      }, 1000);

      setTimeout(function() {
        $("#intro, #win, #lose").addClass("disappear");
        $(".game-time").removeClass("disappear");
        newGame();
      }, 3000);
  }
}

function checkLose() {
  if(lives === incorrectLetters.length) {
      gameStart = false;
      loseScore++
      $("#loses").html(loseScore);
      setTimeout(function() {
          $("#hint-img").attr("src", "#").hide();
          $(".game-time").addClass("disappear");
          $("#lose").removeClass("disappear");
      }, 1000);

      setTimeout(function() {
        $("#intro, #win, #lose").addClass("disappear");
        $(".game-time").removeClass("disappear");
        newGame();
      }, 3000);
  }
}





/////////////////////////   NEW GAME && RESTART   //////////////////
// Runs when button is pushed (clear the arrays, get new word) GAME TIME
function newGame() {
  gameStart = true
  clearOut();
  ransomdomize();
  createSpan();
  
  //console.log(chosenWord); //CHEAT -- GET THE ANSWERS IN CONCOLE
  
};

// RESET/ START Runs when button is pushes (resets the win loose as well) GAME TIME
function reset() {
  if (confirm("Do you really want to reset your score?")){
    winScore = 0;
    loseScore = 0;
    clearOut();
    addBack();
    stopAudio();
  }
};



/////////////////   BUTTONS    //////////////////1
  $("#start-game").click(function(){
    $("#intro").addClass("disappear");
    $(".game-time").removeClass("disappear");
    newGame();
    playAudio();
  });

  $("#newGame-btn").click(function(){
    $("#intro, #win, #lose").addClass("disappear");
    $(".game-time").removeClass("disappear");
    newGame();
  });

  $("#resetGame-btn").click(function(){
    $(".game-time, #win, #lose").addClass("disappear");
    $("#intro").removeClass("disappear");
    reset();
  });

  $(".audio-btn").click(function(){
    if (toggler) {
      stopAudio();
      toggler = false;
    } else {
      playAudio();
      toggler = true;
    }
  });


//////////////// The WHOLE GAME BELOW ////////////////////
document.onkeyup = function(event) {
  if (gameStart) {
      userGuess = event.key.toLocaleUpperCase();

      ////// Check if the event has already been chosen and if key is is a letter or number only (blank space and all oter keys will not work)////////////
      // Another way to exclude other key word is to use reg expression (/[a-zA-Z0-9]/.test(chosenWord[i])) == only return true if it is a letter or #
      // if you dont want # keys change to range "90" to "65"
      if (!correctLetters.includes(userGuess) && !incorrectLetters.includes(userGuess) && event.which <= 90 && event.which >= 48){
        showKeyPress(userGuess);
        checkGuess(userGuess);
        checkWin();
        checkLose();
      }
  }
}

});