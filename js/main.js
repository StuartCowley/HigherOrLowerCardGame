let cardDisplay = document.getElementById("card");
const StartGameButton = document.getElementById("startGame");
const GuessLowerButton = document.getElementById("buttonGuessLower");
const GuessHigherButton = document.getElementById("buttonGuessHigher");
let messageBar = document.getElementById("textDisplay");
const messages = {
  Welcome: "Welcome! Press Start To Play",
  start: "First Card Selected, Let The Game Begin...",
  correct: "Correct! Onto the next card...",
  lose: "You lost the game! Press Start button to play again",
  win: "You won the game!"
};
const suits = ["S", "H", "C", "D"];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let deck = [];
let turn = 1;
let newCard;
let newCardVal;
let lastCard;
let lost = false;
messageBar.innerHTML = messages.Welcome;

function createDeck() {
  for (i = 0; i < suits.length; i++) {
    for (j = 0; j < values.length; j++) {
      let card = {
        suit: suits[i],
        value: values[j],
        pic: `../img/${values[j]}${suits[i]}.png`
      };
      deck.push(card);
    }
  }
}
createDeck();

const resetClassName = () => {
  setTimeout(function() {
    slot1.className = " ";
  }, 1900);
};

const badGuess = () => {
  if (lost == true) {
    messageBar.innerHTML = messages.lose;
    turn = 7;
  }
};

const won = () => {
  if (turn == 7 && lost == false) {
    messageBar.innerHTML = messages.win;
  } else if (turn < 7 && lost == false) {
    messageBar.innerHTML = messages.correct;
  }
};

const popRandomCard = rand => {
  deck.splice(rand, 1);
};

const pickRandomCard = () => {
  let output;
  while (!output) {
    output = Math.floor(Math.random() * deck.length);
  }
  let cardLocation = output;
  newCard = deck[cardLocation];
  newCardVal = deck[cardLocation].value;
  popRandomCard(output);
  return newCard;
};

StartGameButton.addEventListener("click", function() {
  resetGame();
  messageBar.innerHTML = messages.start;
  lost = false;
  turn = 1;
  lastCard = null;
  slot1.className = "zoom";
  setTimeout(function() {
    let initial = pickRandomCard();
    document.getElementById("slot1").src = `${initial.pic}`;
    turn++;
    lastCard = initial;
  }, 1000);
  resetClassName();
});

GuessLowerButton.addEventListener("click", function() {
  let element = document.getElementById(`slot${turn}`);
  element.className = "zoom";
  setTimeout(function() {
    newCard = pickRandomCard();
    document.getElementById(`slot${turn}`).src = `${newCard.pic}`;
    turn++;
    if (lost == false) {
      if (newCard.value < lastCard.value) {
        messageBar.innerHTML = messages.correct;
      } else {
        messageBar.innerHTML = messages.lose;
        lost = true;
      }
      lastCard = newCard;
      badGuess();
      won();
    }
  }, 1000);
});

GuessHigherButton.addEventListener("click", function() {
  let element = document.getElementById(`slot${turn}`);
  element.className = "zoom";
  setTimeout(function() {
    newCard = pickRandomCard();
    document.getElementById(`slot${turn}`).src = `${newCard.pic}`;
    turn++;
    if (lost == false) {
      if (newCard.value > lastCard.value) {
        messageBar.innerHTML = messages.correct;
      } else {
        messageBar.innerHTML = messages.lose;
        lost = true;
      }
      lastCard = newCard;
      badGuess();
      won();
    }
  }, 1000);
});

const resetGame = () => {
  deck = [];
  createDeck();
  turn = 1;
  lastCard = null;
  for (i = 1; i < 7; i++) {
    document.getElementById(`slot${i}`).src = "../img/purple_back.png";
    document.getElementById(`slot${i}`).className = " ";
  }
  console.log(deck);
};

resetGame();
