function showGame(game) {
    // Hide all game sections
    document.getElementById('Tictactoe').style.display = 'none';
    document.getElementById('Mermory').style.display = 'none';

    // Show the selected game section
    if (game === 'Tictactoe') {
        document.getElementById('Tictactoe').style.display = 'block';
        resetGame();
    } else if (game === 'Mermory') {
        document.getElementById('Mermory').style.display = 'block';
    }
}

// Function to reset the game
function resetGame() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
    }
    endMessage.textContent = `X's turn!`;
    currentPlayer = players[0];
}

// Existing code for Tic Tac Toe
let Tictactoe = document.getElementById('Tictactoe');
let squares = document.getElementsByClassName('square');
let players = ['X', 'O'];
let currentPlayer = players[0];
let endMessage = document.createElement('h2');
endMessage.textContent = `X's turn!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign = 'center';
Tictactoe.appendChild(endMessage);

let winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (squares[i].textContent !== '') {
            return;
        }
        squares[i].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            endMessage.textContent = `Game over! ${currentPlayer} wins!`;
            return;
        }
        if (checkTie()) {
            endMessage.textContent = `Game is tied!`;
            return;
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        endMessage.textContent = (currentPlayer === players[0]) ? `X's turn!` : `O's turn!`;
    });
}

function checkWin(currentPlayer) {
    for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i];
        if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function restartButton() {
    resetGame(); 
}