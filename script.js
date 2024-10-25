* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  color: #424242;
}

.container {
  background: #ffffff;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  font-size: 1.8rem;
  font-weight: 500;
  color: #1e88e5;
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.1rem;
  color: #757575;
  margin-bottom: 1.5rem;
}

#inputField {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border 0.3s, box-shadow 0.3s;
}

#inputField:focus {
  outline: none;
  border-color: #1e88e5;
  box-shadow: 0 0 8px rgba(30, 136, 229, 0.3);
}

#message {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #e53935;
}

button {
  margin-top: 1.5rem;
  padding: 0.8rem 1.5rem;
  background-color: #1e88e5;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

button:hover {
  background-color: #1565c0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Add this CSS below the existing styles */

.sentence-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
/* Add this CSS below the existing styles */

#refreshButton {
  background: #1e88e5;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 8px rgba(30, 136, 229, 0.2);
}

#refreshButton:hover {
  background-color: #1565c0;
  box-shadow: 0 6px 12px rgba(21, 101, 192, 0.3);
}

#refreshButton:active {
  transform: scale(0.95);
  box-shadow: 0 2px 6px rgba(21, 101, 192, 0.3);
}