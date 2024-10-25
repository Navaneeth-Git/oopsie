const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
  "Jinxed wizards pluck ivy from the big quilt.",
  "Bright vixens jump; dozy fowl quack.",
  "Quick wafting zephyrs vex bold Jim."
];

const inputField = document.getElementById("inputField");
const message = document.getElementById("message");
const sentenceDisplay = document.getElementById("sentence");
const refreshButton = document.getElementById("refreshButton");

let currentSentence = sentences[0];
let errorInterval = 4;  // introduce an error every 4 characters typed

// Function to get a random sentence
function getRandomSentence() {
  return sentences[Math.floor(Math.random() * sentences.length)];
}

// Function to reset input field and message
function resetInput() {
  inputField.value = "";
  message.innerText = "Can you type it correctly?";
}

// Refresh button event listener to set a new sentence
refreshButton.addEventListener("click", () => {
  currentSentence = getRandomSentence();
  sentenceDisplay.innerText = `Type this sentence: "${currentSentence}"`;
  resetInput();
});

// Function to introduce a random typo at a random position
function introduceTypo(text) {
  const randomIndex = Math.floor(Math.random() * text.length);
  const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  return text.substring(0, randomIndex) + randomChar + text.substring(randomIndex + 1);
}

// Event listener to handle input and introduce typos as the user types
inputField.addEventListener("input", () => {
  let typedText = inputField.value;

  // Check if the typed text length is a multiple of errorInterval to introduce a typo
  if (typedText.length > 0 && typedText.length % errorInterval === 0) {
    typedText = introduceTypo(typedText);
    inputField.value = typedText;
    message.innerText = "Oops! Typo detected. Try to continue...";
  }

  // If the typed text matches the sentence, reset with a success message
  if (typedText.toLowerCase() === currentSentence.substring(0, typedText.length).toLowerCase()) {
    message.innerText = "Can you type it correctly?";
  } else {
    message.innerText = "Oops! Typo detected. Try to continue...";
  }
});