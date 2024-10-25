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
let subtleErrorCount = 0;  // Counts subtle errors introduced

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
  subtleErrorCount = 0;  // Reset error count with new sentence
});

// Function to introduce a random typo subtly
function introduceSubtleTypo(text) {
  const typoTypes = ['replace', 'swap'];
  const typoChoice = typoTypes[Math.floor(Math.random() * typoTypes.length)];

  if (typoChoice === 'replace') {
    // Replace a random character with another
    const randomIndex = Math.floor(Math.random() * text.length);
    const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    return text.substring(0, randomIndex) + randomChar + text.substring(randomIndex + 1);
  } else if (typoChoice === 'swap' && text.length > 1) {
    // Swap two adjacent characters randomly
    const swapIndex = Math.floor(Math.random() * (text.length - 1));
    return text.substring(0, swapIndex) +
           text[swapIndex + 1] +
           text[swapIndex] +
           text.substring(swapIndex + 2);
  }
  return text;
}

// Event listener to handle input and introduce typos subtly as the user types
inputField.addEventListener("input", () => {
  let typedText = inputField.value;

  // Occasionally introduce a typo after a few typed characters
  if (typedText.length > 0 && typedText.length % 7 === 0 && subtleErrorCount < 3) {
    typedText = introduceSubtleTypo(typedText);
    inputField.value = typedText;
    subtleErrorCount++;
    message.innerText = "Keep going...";
  }

  // Check if the typed text matches the sentence correctly
  if (typedText.toLowerCase() === currentSentence.substring(0, typedText.length).toLowerCase()) {
    message.innerText = "Can you type it correctly?";
  } else {
    message.innerText = "Keep going...";
  }
});
