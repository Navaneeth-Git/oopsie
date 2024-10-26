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
const errorThreshold = 8;
const backspaceCooldown = 1000;

const inputField = document.getElementById("inputField");
const message = document.getElementById("message");
const sentenceDisplay = document.getElementById("sentence");
const refreshButton = document.getElementById("refreshButton");

sentenceDisplay.textContent = `Type this: "${currentSentence}"`;

function loadNewSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceDisplay.textContent = `Type this: "${currentSentence}"`;
  inputField.value = "";
  errorAttempts = 0;
  message.innerText = "Can you type it correctly?";
  message.style.opacity = "1";  // Reset opacity for next session
}

refreshButton.addEventListener("click", loadNewSentence);

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

inputField.addEventListener("input", () => {
  let currentInput = inputField.value;
  message.style.opacity = "0.5";  // Message fades out on input

  if (currentInput.toLowerCase() === currentSentence.substring(0, currentInput.length).toLowerCase()) {
    inputField.style.color = "#000";  // Reset color to normal
    if (currentInput.toLowerCase() === currentSentence.toLowerCase()) {
      message.innerText = "Great job! You typed it correctly!";
      errorAttempts = 0;
    }
  } else {
    inputField.style.color = "red";  // Mismatch character feedback
    setTimeout(() => {
      inputField.style.color = "#000";  // Reset after a moment
    }, 500);
  }
});

inputField.addEventListener("focus", () => {
  message.style.opacity = "1";  // Reset message opacity on refocus
});
