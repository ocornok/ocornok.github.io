
let secretNumber = generateRandomNumber();
let attempts = 0;

document.getElementById('guessButton').addEventListener('click', checkGuess);
document.getElementById('newNumberButton').addEventListener('click', generateNewNumber);

function checkGuess() {
    console.log("Botão pressionado");  // Adicione esta linha
    const guessInput = document.getElementById('guessInput');
    const message = document.getElementById('message');
    const attemptsList = document.getElementById('attemptsList');
  
    const userGuess = parseInt(guessInput.value);
  
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      message.textContent = 'Por favor, insira um número válido entre 1 e 100.';
    } else {
      attempts++;
  
      if (userGuess === secretNumber) {
        message.textContent = `Parabéns! Você acertou o número em ${attempts} tentativas.`;
        disableInputAndButtons();
      } else {
        const difference = Math.abs(secretNumber - userGuess);
        let feedback = '';
  
        if (difference <= 5) {
          feedback = 'Você está perto!';
        }
  
        if (userGuess < secretNumber) {
          feedback += ' Tente um número maior.';
        } else {
          feedback += ' Tente um número menor.';
        }
  
        message.textContent = feedback;
  
        // Adiciona o número tentado à lista com classe de estilo correspondente
        const listItem = document.createElement('li');
        listItem.textContent = userGuess;
        listItem.classList.add(getAttemptClass(userGuess));
        attemptsList.appendChild(listItem);
      }
  
      guessInput.value = '';
    }
  }
  
  function getAttemptClass(userGuess) {
    const difference = Math.abs(secretNumber - userGuess);
  
    if (userGuess === secretNumber) {
      return 'green';
    } else if (difference <= 5) {
      return 'yellow';
    } else if (userGuess < secretNumber) {
      return 'blue';
    } else {
      return 'red';
    }
  }

function disableInputAndButtons() {
  const guessInput = document.getElementById('guessInput');
  const guessButton = document.getElementById('guessButton');
  const newNumberButton = document.getElementById('newNumberButton');

  guessInput.disabled = true;
  guessButton.disabled = true;
  newNumberButton.disabled = false;
}

function generateNewNumber() {
  secretNumber = generateRandomNumber();
  attempts = 0;
  const message = document.getElementById('message');
  const attemptsList = document.getElementById('attemptsList');

  message.textContent = 'Tente adivinhar o número entre 1 e 100.';

  // Limpa a lista de tentativas
  attemptsList.innerHTML = '';

  enableInputAndButtons();
}

function enableInputAndButtons() {
  const guessInput = document.getElementById('guessInput');
  const guessButton = document.getElementById('guessButton');
  const newNumberButton = document.getElementById('newNumberButton');

  guessInput.disabled = false;
  guessButton.disabled = false;
  newNumberButton.disabled = true;
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
