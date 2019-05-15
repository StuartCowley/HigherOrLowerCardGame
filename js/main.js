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

let turn = 1;
let newCard;
let newCardVal;
let lastCard;
let lost = false;
messageBar.innerHTML = messages.Welcome;

const badGuess = () => {
  if (lost == true) {
    messageBar.innerHTML = messages.lose;
  }
};

const won = () => {
  if (turn == 7 && lost == false) {
    messageBar.innerHTML = messages.win;
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
  lost = false;
  turn = 1;
  lastCard = null;
  let initial = pickRandomCard();
  document.getElementById("slot1").src = `${initial.pic}`;
  turn++;
  lastCard = initial;
  messageBar.innerHTML = messages.start;
});

GuessLowerButton.addEventListener("click", function() {
  if (lost == false) {
    newCard = pickRandomCard();
    document.getElementById(`slot${turn}`).src = `${newCard.pic}`;
    turn++;
    if (newCard.value < lastCard.value) {
      messageBar.innerHTML = messages.correct;
      console.log("you got it right!");
    } else {
      messageBar.innerHTML = messages.lose;
      lost = true;
    }
    lastCard = newCard;
    badGuess();
    won();
  }
});

GuessHigherButton.addEventListener("click", function() {
  if (lost == false) {
    newCard = pickRandomCard();
    document.getElementById(`slot${turn}`).src = `${newCard.pic}`;
    turn++;
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
});

const restartFunction = () => {
  deck = [];
  createDeck();
  turn = 1;
  lastCard = null;
  messageBar.innerHTML = "";
  for (i = 1; i < 7; i++) {
    document.getElementById(`slot${i}`).src = " ";
  }
  console.log(deck);
};
