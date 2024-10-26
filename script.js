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

sentenceDisplay.textContent = `Type this: "${currentSentence}"`;

function loadNewSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceDisplay.textContent = `Type this: "${currentSentence}"`;
  inputField.value = "";
  errorCount = 0;
  message.innerText = "Can you type it correctly?";
  message.style.opacity = "1";  // Reset message opacity
}

refreshButton.addEventListener("click", loadNewSentence);

inputField.addEventListener("keydown", (event) => {
  const currentTimestamp = Date.now();
  if (event.key === "Backspace" && currentTimestamp - lastBackspaceTimestamp > backspaceDelay) {
    errorCount++;
    lastBackspaceTimestamp = currentTimestamp;
    if (errorCount >= errorLimit) {
      loadNewSentence();
      alert("Too hard? Try typing this:");
    }
  }
});

inputField.addEventListener("input", () => {
  const userTypedText = inputField.value;
  message.style.opacity = "0.5";  // Dim message when user is typing

  // Correct so far
  if (userTypedText.toLowerCase() === currentSentence.substring(0, userTypedText.length).toLowerCase()) {
    inputField.style.transition = "color 0.3s";  // Smooth transition
    inputField.style.color = "#000";  // Normal color

    if (userTypedText.toLowerCase() === currentSentence.toLowerCase()) {
      message.innerText = "Great job! You typed it correctly!";
      errorCount = 0; // Reset errors on success
    }
  } else {
    inputField.style.transition = "color 0.3s";  // Smooth transition
    inputField.style.color = "red";  // Temporary error color
    setTimeout(() => {
      inputField.style.color = "#000";  // Return to normal color
    }, 500);
  }
});

inputField.addEventListener("focus", () => {
  message.style.opacity = "1";  // Reset message opacity on focus
});