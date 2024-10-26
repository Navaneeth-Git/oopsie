const sentences = [
  "The quick brown fox jumps over the lazy dog",
  "Pack my box with five dozen liquor jugs",
  "A wizard's job is to vex chumps quickly in fog",
  "How razorback-jumping frogs can level six piqued gymnasts",
  "Sphinx of black quartz, judge my vow"
];
let currentSentence = sentences[0];
let errorCount = 0;
let lastBackspaceTimestamp = 0;
const errorLimit = 8;
const backspaceDelay = 1000;

const inputField = document.getElementById("inputField");
const message = document.getElementById("message");
const sentenceDisplay = document.getElementById("sentence");
const refreshButton = document.getElementById("refreshButton");

function displaySentence() {
  sentenceDisplay.textContent = `Type this: "${currentSentence}"`;
  inputField.value = "";
  errorCount = 0;
  message.innerText = "Can you type it correctly?";
  message.style.opacity = "1";
}

function loadNewSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  displaySentence();
}

refreshButton.addEventListener("click", loadNewSentence);

inputField.addEventListener("keydown", (event) => {
  const currentTimestamp = Date.now();

  // Backspace error tracking with a delay
  if (event.key === "Backspace" && currentTimestamp - lastBackspaceTimestamp > backspaceDelay) {
    errorCount++;
    lastBackspaceTimestamp = currentTimestamp;

    if (errorCount >= errorLimit) {
      loadNewSentence();
    }
  }
});

inputField.addEventListener("input", () => {
  const userTypedText = inputField.value;
  message.style.opacity = "0.5";

  // Checking if the input so far matches the sentence
  if (userTypedText.toLowerCase() === currentSentence.substring(0, userTypedText.length).toLowerCase()) {
    inputField.style.transition = "color 0.3s";
    inputField.style.color = "#000";

    if (userTypedText.toLowerCase() === currentSentence.toLowerCase()) {
      message.innerText = "Great job! You typed it correctly!";
      errorCount = 0;
    }
  } else {
    inputField.style.transition = "color 0.3s";
    inputField.style.color = "red";

    setTimeout(() => {
      inputField.style.color = "#000";
    }, 500);
  }
});

inputField.addEventListener("focus", () => {
  message.style.opacity = "1";
});

// Initial sentence display on load
displaySentence();
