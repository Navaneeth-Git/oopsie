const sentence = "The quick brown fox jumps over the lazy dog.";
const inputField = document.getElementById("inputField");
const message = document.getElementById("message");

// Function to introduce a subtle typo
function introduceSubtleTypo(text) {
  const randomIndex = Math.floor(Math.random() * text.length);
  let typoChar = text[randomIndex];

  // Introduce a typo similar to common typing mistakes
  if (Math.random() < 0.5) {
    typoChar = typoChar.toLowerCase() === typoChar 
               ? typoChar.toUpperCase() 
               : typoChar.toLowerCase(); // Subtle case change
  } else {
    // Replace with an adjacent key character (limited to common letters)
    const adjacentKeys = { e: "r", r: "e", u: "i", i: "u", o: "p", p: "o" };
    typoChar = adjacentKeys[typoChar] || typoChar;
  }

  return text.substring(0, randomIndex) + typoChar + text.substring(randomIndex + 1);
}

// Lower probability for typo
function shouldIntroduceTypo() {
  return Math.random() < 0.1; // 10% chance of typo on each input
}

// Event listener to handle input
inputField.addEventListener("input", () => {
  let currentInput = inputField.value;

  // Introduce subtle typos occasionally
  if (shouldIntroduceTypo()) {
    inputField.value = introduceSubtleTypo(currentInput);
    message.innerText = "Oops! Seems like there's a typo. Try again!";
  } else {
    // Check if it matches the sentence (ignoring case)
    if (currentInput.toLowerCase() === sentence.toLowerCase()) {
      message.innerText = "Great job! You typed it correctly!";
    } else {
      message.innerText = "Keep going...";
    }
  }
});