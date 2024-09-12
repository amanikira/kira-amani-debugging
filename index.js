// Get references to input and buttons from the DOM
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');

// Get references to message elements from the DOM
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;  // Variable to hold the target number to guess
let attempts = 0;  // Counter for the number of attempts
const maxNumberOfAttempts = 5;  // Maximum number of attempts allowed

// Function to generate a random number between min (inclusive) and max (exclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function to check the user's guess
function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;  // Increment the attempts counter

  hideAllMessages();  // Hide all feedback messages before displaying the relevant one

  // If the guess is correct
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guess${attempts === 1 ? '' : 'es'}`; // Singular/plural fix

    correctMessage.style.display = '';  // Show the correct guess message

    // Disable the submit button and input field since the game is over
    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    // Determine whether the guess is too high or too low and show the corresponding message
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';  // Show "too low" message
    } else {
      tooHighMessage.style.display = '';  // Show "too high" message
    }

    // Calculate remaining attempts
    const remainingAttempts = maxNumberOfAttempts - attempts;

    // Display remaining guesses with singular/plural correction
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess${remainingAttempts === 1 ? '' : 'es'} remaining`;  // Singular/plural fix
  }

  // If max number of attempts is reached, disable further guesses
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = '';  // Optionally display the "max guesses reached" message
  }

  // Clear the input field for the next guess
  guessInput.value = '';

  // Display the reset button to allow the player to play again
  resetButton.style.display = '';
}

// Function to hide all feedback messages
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';  // Hide each message
  }
}

// Function to set up the game (reset state)
function setup() {
  // Generate a new target number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);  // Log the target number for debugging

  // Reset the number of attempts
  attempts = 0;

  // Enable the input and submit button to allow a new game
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();  // Hide all messages at the start
  resetButton.style.display = 'none';  // Hide the reset button initially
}

// Add event listeners for the submit and reset buttons
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

// Initialize the game when the page loads
setup();
