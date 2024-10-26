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

// Function to introduce a random typo
function introduceRandomTypo(text) {
  const typoChance = 0.1; // 10% chance per keystroke
  if (Math.random() < typoChance && text.length > 0) {
    const randomIndex = Math.floor(Math.random() * text.length);
    const adjacentKeys = { e: "r", r: "e", u: "i", i: "u", o: "p", p: "o", a: "s", s: "a" };
    let typoChar = adjacentKeys[text[randomIndex]] || 
                   (Math.random() < 0.5 ? text[randomIndex].toUpperCase() : text[randomIndex].toLowerCase());
    return text.substring(0, randomIndex) + typoChar + text.substring(randomIndex + 1);
  }
  return text;
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
    inputField.style.color = "#000";

    if (userTypedText.toLowerCase() === currentSentence.toLowerCase()) {
      message.innerText = "Great job! You typed it correctly!";
      errorCount = 0;
    }
  } else {
    inputField.style.color = "red";
    setTimeout(() => {
      inputField.style.color = "#000";
    }, 500);
  }
});

inputField.addEventListener("focus", () => {
  message.style.opacity = "1";
});

displaySentence();
