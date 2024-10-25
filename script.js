const sentence = "The quick brown fox jumps over the lazy dog.";
const inputField = document.getElementById("inputField");
const message = document.getElementById("message");

// Function to introduce a random typo
function introduceTypo(text) {
  const randomIndex = Math.floor(Math.random() * text.length);
  const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  return text.substring(0, randomIndex) + randomChar + text.substring(randomIndex + 1);
}

// Randomly decide when to introduce typos
function shouldIntroduceTypo() {
  return Math.random() < 0.3; // 30% chance of typo on each input
}

// Event listener to handle input
inputField.addEventListener("input", () => {
  let currentInput = inputField.value;

  // Randomly introduce typos
  if (shouldIntroduceTypo()) {
    inputField.value = introduceTypo(currentInput);
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
