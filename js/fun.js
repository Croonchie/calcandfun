
// Select elements
const gameBtn = document.getElementById('gameBtn');
const quizBtn = document.getElementById('quizBtn');
const gameOptions = document.getElementById('gameOptions');
const quizOptions = document.getElementById('quizOptions');

const sections = {
  Tictactoe: document.getElementById('Tictactoe'),
  Mermory: document.getElementById('Mermory'),
  Puzzle: document.getElementById('Puzzle'),
  quiz1: document.getElementById('quiz1'),
  quiz2: document.getElementById('quiz2'),
  quiz3: document.getElementById('quiz3'),
};

// Utility: hide all sections
function hideAllSections() {
  for (let key in sections) {
    sections[key].classList.add('d-none');
  }
}

// Toggle Game Buttons
function toggleGameOptions() {
  quizOptions.classList.add('d-none');
  hideAllSections();
  gameOptions.classList.toggle('d-none');
}

// Toggle Quiz Buttons
function toggleQuizOptions() {
  gameOptions.classList.add('d-none');
  hideAllSections();
  quizOptions.classList.toggle('d-none');
}

// Show Game
function showGame(gameId) {
  hideAllSections();
  for (let key in sections) {
    if (key === gameId) {
      sections[key].classList.remove('d-none');
    }
  }
  gameOptions.classList.remove('d-none'); // Keep game options visible
  if (gameId === 'Tictactoe') resetGame();
}

// Show Quiz
function showQuiz(quizNum) {
  hideAllSections();
  const quizId = `quiz${quizNum}`;
  if (sections[quizId]) {
    sections[quizId].classList.remove('d-none');
  }
  quizOptions.classList.remove('d-none'); // Keep quiz options visible
}

// Event listeners
gameBtn.addEventListener('click', toggleGameOptions);
quizBtn.addEventListener('click', toggleQuizOptions);

// Prevent closing when clicking inside the game or quiz
document.addEventListener('click', (e) => {
  const targets = ['gameBtn', 'quizBtn', 'gameOptions', 'quizOptions'];
  if (
    !targets.some(id => e.target.closest(`#${id}`)) &&
    !e.target.closest('.square') &&
    !e.target.closest('#Tictactoe') &&
    !e.target.closest('#Mermory') &&
    !e.target.closest('#Puzzle') &&
    !e.target.closest('#quiz1') &&
    !e.target.closest('#quiz2') &&
    !e.target.closest('#quiz3')
  ) {
    hideAllSections();
    gameOptions.classList.add('d-none');
    quizOptions.classList.add('d-none');
  }
});

/* ===== Tic Tac Toe Logic ===== */
const squares = document.querySelectorAll('.square');
const gameMessage = document.getElementById('gameMessage');
let players = ['X', 'O'];
let currentPlayer = players[0];
let gameOver = false;

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function resetGame() {
  squares.forEach(square => {
    square.textContent = '';
    square.classList.remove('text-success', 'text-danger');
  });
  currentPlayer = players[0];
  gameMessage.textContent = `X's turn!`;
  gameOver = false;
}

squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    if (square.textContent !== '' || gameOver) return;

    square.textContent = currentPlayer;
    square.classList.add(currentPlayer === 'X' ? 'text-success' : 'text-danger');

    if (checkWin(currentPlayer)) {
      gameMessage.textContent = `Game over! ${currentPlayer} wins!`;
      gameOver = true;
      return;
    }

    if (checkTie()) {
      gameMessage.textContent = `Game is tied!`;
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameMessage.textContent = `${currentPlayer}'s turn!`;
  });
});

function checkWin(player) {
  return winCombos.some(([a, b, c]) => {
    return squares[a].textContent === player &&
           squares[b].textContent === player &&
           squares[c].textContent === player;
  });
}

function checkTie() {
  return [...squares].every(square => square.textContent !== '');
}

function restartButton() {
  resetGame();
}

