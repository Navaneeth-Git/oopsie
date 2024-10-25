const sentences = [
  "The quick brown fox jumps over the lazy dog",
  "Pack my box with five dozen liquor jugs",
  "A wizard's job is to vex chumps quickly in fog",
  "How razorback-jumping frogs can level six piqued gymnasts",
  "Sphinx of black quartz, judge my vow"
];
let currentSentence = sentences[0];
let errorAttempts = 0;
let lastBackspaceTime = 0;
const errorThreshold = 8;  // Increased threshold to make it feel longer
const backspaceCooldown = 1000; // Cooldown in milliseconds (1 second)

const inputField = document.getElementById("inputField");
const message = document.getElementById("message");
const sentenceDisplay = document.getElementById("sentence");
const refreshButton = document.getElementById("refreshButton");

sentenceDisplay.textContent = `Type this: "${currentSentence}"`;

// Function to introduce a subtle typo
function introduceSubtleTypo(text) {
  const randomIndex = Math.floor(Math.random() * text.length);
  let typoChar = text[randomIndex];

  if (Math.random() < 0.5) {
    typoChar = typoChar.toLowerCase() === typoChar ? typoChar.toUpperCase() : typoChar.toLowerCase();
  } else {
    const adjacentKeys = { e: "r", r: "e", u: "i", i: "u", o: "p", p: "o" };
    typoChar = adjacentKeys[typoChar] || typoChar;
  }

  return text.substring(0, randomIndex) + typoChar + text.substring(randomIndex + 1);
}

function shouldIntroduceTypo() {
  return Math.random() < 0.1;
}

// Function to load a new sentence
function loadNewSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceDisplay.textContent = `Type this: "${currentSentence}"`;
  inputField.value = "";
  errorAttempts = 0;
  message.innerText = "Can you type it correctly?";
}

// Event listener for the reload button
refreshButton.addEventListener("click", loadNewSentence);

// Event listener for backspace key and focus events to track errors with cooldown
inputField.addEventListener("keydown", (event) => {
  const currentTime = Date.now();
  if (event.key === "Backspace" && currentTime - lastBackspaceTime > backspaceCooldown) {
    errorAttempts++;
    lastBackspaceTime = currentTime;
    if (errorAttempts >= errorThreshold) {
      loadNewSentence();
      alert("Too hard? Try typing this:");
    }
  }
});

// Increase error attempts on repeated focus events
inputField.addEventListener("focus", () => {
  errorAttempts++;
  if (errorAttempts >= errorThreshold) {
    loadNewSentence();
    alert("Too hard? Try typing this:");
  }
});

// Event listener to handle input
inputField.addEventListener("input", () => {
  let currentInput = inputField.value;

  if (shouldIntroduceTypo()) {
    inputField.value = introduceSubtleTypo(currentInput);
    message.innerText = "Oops! Seems like there's a typo. Try again!";
  } else {
    if (currentInput.toLowerCase() === currentSentence.toLowerCase()) {
      message.innerText = "Great job! You typed it correctly!";
      errorAttempts = 0; // Reset attempts on correct typing
    } else {
      message.innerText = "Keep going...";
    }
  }
});
