const sentences = [
  "The quick brown fox jumps over the lazy dog",
  "Pack my box with five dozen liquor jugs",
  "A wizard's job is to vex chumps quickly in fog",
  "How razorback-jumping frogs can level six piqued gymnasts",
  "Sphinx of black quartz, judge my vow"
];
let currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
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

// Function to introduce a subtle random typo in the input text
function introduceRandomTypo(text) {
  const typoChance = 0.05; // 5% chance to introduce a typo per keystroke

  if (Math.random() < typoChance && text.length > 0) {
    const randomIndex = Math.floor(Math.random() * text.length);
    let typoChar = text[randomIndex];

    // Randomly replace with an adjacent character or toggle case
    const adjacentKeys = { e: "r", r: "e", u: "i", i: "u", o: "p", p: "o", a: "s", s: "a" };
    typoChar = adjacentKeys[typoChar] || (Math.random() < 0.5 ? typoChar.toUpperCase() : typoChar.toLowerCase());

    // Introduce the typo at the random position
    return text.substring(0, randomIndex) + typoChar + text.substring(randomIndex + 1);
  }
  return text; // Return original if no typo is added
}

refreshButton.addEventListener("click", loadNewSentence);

inputField.addEventListener("keydown", (event) => {
  const currentTimestamp = Date.now();
  if (event.key === "Backspace" && currentTimestamp - lastBackspaceTimestamp > backspaceDelay) {
    errorCount++;
    lastBackspaceTimestamp = currentTimestamp;
    if (errorCount >= errorLimit) {
      loadNewSentence();
    }
  }
});

inputField.addEventListener("input", () => {
  let userTypedText = inputField.value;

  // Introduce random typos occasionally
  userTypedText = introduceRandomTypo(userTypedText);
  inputField.value = userTypedText;

  message.style.opacity = "0.5";

  if (userTypedText.toLowerCase() === currentSentence.substring(0, userTypedText.length).toLowerCase()) {
    inputField.style.color = "#000";  // Reset color to normal

    if (userTypedText.toLowerCase() === currentSentence.toLowerCase()) {
      message.innerText = "Great job! You typed it correctly!";
      errorCount = 0;
    }
  } else {
    inputField.style.color = "red";  // Temporary error color
    setTimeout(() => {
      inputField.style.color = "#000";  // Return to normal color
    }, 500);
  }
});

inputField.addEventListener("focus", () => {
  message.style.opacity = "1";
});

displaySentence();
