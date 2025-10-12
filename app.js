// ! variables
const input = document.querySelector(".game__input");
const btnSubmit = document.querySelector("#btn-submit");
const btnReset = document.querySelector("#btn-reset");
const previousGuesses = document.querySelector("#previous-guesses");
const remainingGuesses = document.querySelector("#remaining-guesses");
const errorMsg = document.querySelector("#error-message");
const hintMsg = document.querySelector("#hint-message");
const gameContainer = document.querySelector(".game");
const resultArea = document.querySelector("#result-area");

// ! game state
let correctNumber;
let maxGuesses = 10;
let guesses = [];

// ! starting game
function initGame() {
  correctNumber = getRandomNumber(1, 100);
  maxGuesses = 10;
  guesses = [];
  updateRemainingGuesses();
  previousGuesses.innerHTML = "";
  errorMsg.textContent = "";
  hintMsg.textContent = "";
  input.value = "";
  input.disabled = false;
  btnSubmit.disabled = false;
  input.focus();
  console.log("Correct Number:", correctNumber);
}

// ! functions
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateRemainingGuesses() {
  remainingGuesses.textContent = maxGuesses;
}

function showError(message) {
  errorMsg.textContent = message;
  setTimeout(() => (errorMsg.textContent = ""), 2000);
}

function disableGame() {
  btnSubmit.disabled = true;
  input.disabled = true;
}

// ! game logic
function handleGuess() {
  const value = parseInt(input.value, 10);

  // validation
  if (isNaN(value) || value < 1 || value > 100) {
    showError("❌ Enter a number between 1 and 100!");
    return;
  }

  // update state
  guesses.push(value);
  maxGuesses--;
  updateRemainingGuesses();
  renderPreviousGuesses();

  //   check result
  if (value === correctNumber) {
    showResult(true);
  } else if (maxGuesses === 0) {
    showResult(false);
  } else {
    giveHint(value);
  }

  input.value = "";
  input.focus();
}

function renderPreviousGuesses() {
  previousGuesses.innerHTML = "";
  guesses.forEach((guess) => {
    const circle = document.createElement("div");
    circle.textContent = guess;
    previousGuesses.appendChild(circle);
  });
}

function giveHint(value) {
  const diff = Math.abs(value - correctNumber);
  const direction = value > correctNumber ? "lower" : "higher";

  if (diff <= 10) {
    hintMsg.textContent = `🎯 You're close! Try a ${direction} number.`;
  } else {
    hintMsg.textContent = `📉 You're far! Try a ${direction} number.`;
  }
}

function showResult(isWin) {
  disableGame();

  // clear hints
  hintMsg.textContent = "";

  // creat result message
  const msg = document.createElement("p");
  msg.classList.add("game__result");
  msg.textContent = isWin
    ? `🏆 You guessed it! The number was ${correctNumber}.`
    : `💀 You lost! The number was ${correctNumber}.`;

  // add animation / class for styling
  msg.style.marginTop = "0";
  msg.classList.add(isWin ? "game__result--win" : "game__result--lose");
  // append to fixed result area so the main box won't resize
  resultArea.appendChild(msg);
  // ensure newest message is visible
  resultArea.scrollTop = resultArea.scrollHeight;

  //   todo - add win/lose image later
}

// ! eventListeners
btnSubmit.addEventListener("click", handleGuess);
btnReset.addEventListener("click", initGame);

initGame();
