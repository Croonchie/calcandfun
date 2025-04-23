
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


// Event listeners
gameBtn.addEventListener('click', toggleGameOptions);
quizBtn.addEventListener('click', toggleQuizOptions);


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


/* ===== Memory Game Logic ===== */

function initMemoryGame() {
  const board = document.getElementById('memoryBoard');
  const message = document.getElementById('memoryMessage');

  // Clear board and message
  board.innerHTML = '';
  message.textContent = '';

  const symbols = ['🍎', '🚗', '🐶', '🎮', '🏀', '🎵'];
  let cards = [...symbols, ...symbols];
  cards.sort(() => 0.5 - Math.random());

  let flipped = [];
  let matchedPairs = 0;

  cards.forEach(symbol => {
    const card = document.createElement('button');
    card.className = 'btn btn-outline-primary memory-card';
    card.style.height = '60px';
    card.style.width = '60px';
    card.style.fontSize = '28px';
    card.style.borderRadius = '10px';
    card.dataset.symbol = symbol;
    card.textContent = ''; // initially hidden

    card.addEventListener('click', () => {
      if (
        !card.classList.contains('matched') &&
        flipped.length < 2 &&
        !flipped.includes(card)
      ) {
        card.textContent = card.dataset.symbol; // reveal
        flipped.push(card);

        if (flipped.length === 2) {
          setTimeout(() => {
            if (flipped[0].dataset.symbol === flipped[1].dataset.symbol) {
              flipped.forEach(btn => {
                btn.classList.add('matched', 'btn-success');
                btn.disabled = true;
              });
              matchedPairs++;
              if (matchedPairs === symbols.length) {
                message.textContent = '🎉 All pairs matched!';
              }
            } else {
              flipped.forEach(btn => {
                btn.textContent = ''; // hide again
              });
            }
            flipped = [];
          }, 800);
        }
      }
    });

    board.appendChild(card);
  });
}

/* ===== Quiz Logic ===== */


// Quiz logic
const quizData = {
  1: [
    { q: "Capital of France?", options: ["Paris", "Berlin", "Rome", "London"], answer: "Paris" },
    { q: "Largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { q: "Fastest land animal?", options: ["Cheetah", "Tiger", "Horse", "Leopard"], answer: "Cheetah" },
    { q: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
    { q: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
    { q: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Van Gogh", "Pablo Picasso", "Michelangelo"], answer: "Leonardo da Vinci" },
    { q: "Which language is the most spoken worldwide?", options: ["English", "Spanish", "Mandarin", "Hindi"], answer: "Mandarin" },
    { q: "Which continent is the Sahara Desert located on?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" },
    { q: "What is H2O commonly known as?", options: ["Hydrogen", "Oxygen", "Water", "Salt"], answer: "Water" },
    { q: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: "Blue Whale" }
  ],

  2: [
      { q: "The sun is a star.", options: ["True", "False"], answer: "True" },
      { q: "Lightning never strikes the same place twice.", options: ["True", "False"], answer: "False" },
      { q: "Water boils at 100°C.", options: ["True", "False"], answer: "True" },
      { q: "Bats are blind.", options: ["True", "False"], answer: "False" },
      { q: "Humans have 4 lungs.", options: ["True", "False"], answer: "False" },
      { q: "Sound travels faster than light.", options: ["True", "False"], answer: "False" },
      { q: "Goldfish only have a 3-second memory.", options: ["True", "False"], answer: "False" },
      { q: "An octopus has three hearts.", options: ["True", "False"], answer: "True" },
      { q: "There are 7 continents on Earth.", options: ["True", "False"], answer: "True" },
      { q: "Bananas grow on trees.", options: ["True", "False"], answer: "False" }
  ],

  3: [
    { q: "What is 12 × 8?", options: ["96", "88", "108", "86"], answer: "96" },
    { q: "What is the square root of 144?", options: ["10", "11", "12", "13"], answer: "12" },
    { q: "Solve: 15 - 9 + 4 =", options: ["10", "8", "6", "12"], answer: "10" },
    { q: "What is 7²?", options: ["42", "49", "56", "63"], answer: "49" },
    { q: "Which is greater: 3/4 or 2/3?", options: ["3/4", "2/3", "Equal", "Can't tell"], answer: "3/4" },
    { q: "How many degrees in a right angle?", options: ["45", "90", "180", "360"], answer: "90" },
    { q: "What is 10% of 200?", options: ["10", "20", "25", "30"], answer: "20" },
    { q: "What is 5 cubed (5³)?", options: ["15", "25", "100", "125"], answer: "125" },
    { q: "Which is a prime number?", options: ["9", "15", "17", "21"], answer: "17" },
    { q: "What is the next number in the pattern: 2, 4, 8, 16, ?", options: ["20", "24", "30", "32"], answer: "32" }
  ]
};

function showQuiz(category) {
  document.querySelectorAll("#quiz1, #quiz2, #quiz3").forEach(el => el.classList.add("d-none"));
  document.querySelector(`#quiz${category}`).classList.remove("d-none");
  startQuiz(category);
}

function startQuiz(category) {
  const quiz = [...quizData[category]].sort(() => 0.5 - Math.random()).slice(0, 5);
  let score = 0;
  let current = 0;

  const quizId = `quiz${category}`;
  document.getElementById(`${quizId}Score`).textContent = "";
  document.getElementById(`${quizId}Container`).innerHTML = "";
  document.querySelector(`#${quizId} button`)?.classList.add("d-none");

  function renderQuestion() {
    const container = document.getElementById(`${quizId}Container`);
    const q = quiz[current];
    const optionsHTML = q.options.map(opt => `<button class='btn btn-outline-dark m-2 w-100' data-answer='${opt}'>${opt}</button>`).join("");

    container.innerHTML = `
      <div class="card p-3 bg-light">
        <h5>Q${current + 1}: ${q.q}</h5>
        <div class="my-3" id="options">${optionsHTML}</div>
        <p id='feedback' class='fw-bold'></p>
      </div>`;

    document.querySelectorAll("#options button").forEach(btn => {
      btn.onclick = () => checkAnswer(btn.getAttribute("data-answer"));
    });
  }

  function checkAnswer(selected) {
    const correct = quiz[current].answer;
    const feedback = document.getElementById("feedback");

    if (selected === correct) {
      score++;
      feedback.textContent = "Correct!";
      feedback.className = "fw-bold text-success";
    } else {
      feedback.textContent = `Incorrect. Correct: ${correct}`;
      feedback.className = "fw-bold text-danger";
    }

    current++;
    setTimeout(() => {
      if (current < quiz.length) {
        renderQuestion();
      } else {
        document.getElementById(`${quizId}Container`).innerHTML = "";
        document.getElementById(`${quizId}Score`).textContent = `Final Score: ${score}/${quiz.length}`;
        document.querySelector(`#${quizId} button`)?.classList.remove("d-none");
      }
    }, 1000);
  }

  renderQuestion();
}

// Puzzle logic
const grid = document.querySelectorAll('.cell');
let board = Array(16).fill(null);
let score = 0;
let isGameOver = false;

document.addEventListener('keydown', handleKeyPress);
initializeGame();

function initializeGame() {
    board = Array(16).fill(null); // Reset the board to an empty state
    score = 0; // Reset the score
    document.getElementById('score').textContent = `Score: ${score}`; // Update the score on the screen
    addRandomTile();
    addRandomTile();
    updateGrid();
}

function addRandomTile() {
    if (board.every(cell => cell !== null)) return;

    let emptyCells = board.map((value, index) => value === null ? index : -1).filter(index => index !== -1);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = Math.random() > 0.1 ? 2 : 4;
}

function updateGrid() {
    board.forEach((value, index) => {
        grid[index].textContent = value ? value : '';
        grid[index].className = 'cell';
        if (value) grid[index].classList.add(`cell-${value}`);
    });
    document.getElementById('score').textContent = `Score: ${score}`;
}

function handleKeyPress(event) {
    if (isGameOver) return;

    let moved = false;
    if (event.key === 'ArrowUp') moved = moveUp();
    else if (event.key === 'ArrowDown') moved = moveDown();
    else if (event.key === 'ArrowLeft') moved = moveLeft();
    else if (event.key === 'ArrowRight') moved = moveRight();

    if (moved) {
        addRandomTile();
        updateGrid();
        checkGameOver();
    }
}

function moveUp() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let column = getColumn(col);
        let newColumn = slideAndMerge(column);
        if (!arraysEqual(column, newColumn)) {
            moved = true;
            setColumn(col, newColumn);
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let column = getColumn(col);
        let newColumn = slideAndMerge(column.reverse()).reverse();
        if (!arraysEqual(column, newColumn)) {
            moved = true;
            setColumn(col, newColumn);
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let rowData = getRow(row);
        let newRow = slideAndMerge(rowData);
        if (!arraysEqual(rowData, newRow)) {
            moved = true;
            setRow(row, newRow);
        }
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let rowData = getRow(row);
        let newRow = slideAndMerge(rowData.reverse()).reverse();
        if (!arraysEqual(rowData, newRow)) {
            moved = true;
            setRow(row, newRow);
        }
    }
    return moved;
}

function slideAndMerge(arr) {
    let newArr = arr.filter(val => val !== null);
    for (let i = 0; i < newArr.length - 1; i++) {
        if (newArr[i] === newArr[i + 1]) {
            newArr[i] *= 2;
            score += newArr[i];
            newArr.splice(i + 1, 1);
        }
    }
    return [...newArr, ...Array(4 - newArr.length).fill(null)];
}

function getRow(rowIndex) {
    return board.slice(rowIndex * 4, rowIndex * 4 + 4);
}

function setRow(rowIndex, newRow) {
    board.splice(rowIndex * 4, 4, ...newRow);
}

function getColumn(colIndex) {
    return [board[colIndex], board[colIndex + 4], board[colIndex + 8], board[colIndex + 12]];
}

function setColumn(colIndex, newCol) {
    for (let i = 0; i < 4; i++) {
        board[colIndex + i * 4] = newCol[i];
    }
}

function arraysEqual(arr1, arr2) {
    return arr1.every((val, index) => val === arr2[index]);
}

function checkGameOver() {
    if (board.every(cell => cell !== null) && !canMove()) {
        isGameOver = true;
        setTimeout(() => alert('Game Over!'), 100);
    }
}

function canMove() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i * 4 + j] === null) return true;
            if (i < 3 && board[i * 4 + j] === board[(i + 1) * 4 + j]) return true;
            if (j < 3 && board[i * 4 + j] === board[i * 4 + j + 1]) return true;
        }
    }
    return false;
}

// Restart the game (reset grid and score)
function restartGame() {
    isGameOver = false;
    initializeGame(); // Reinitialize the game with a new board and score
}


