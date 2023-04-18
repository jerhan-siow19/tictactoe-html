let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;
    document.getElementById('nameForm').classList.add('hidden');
    document.getElementById('gameBoard').classList.remove('hidden');
});

function makeMove(cell) {
    if (gameEnded || gameBoard[cell] !== '') {
        return;
    }

    gameBoard[cell] = currentPlayer;
    document.getElementById('cell' + cell).innerText = currentPlayer;
    document.getElementById('cell' + cell).classList.add(currentPlayer === 'X' ? 'x' : 'o');

    if (checkWin(currentPlayer)) {
        document.getElementById('message').innerText = currentPlayer === 'X' ? player1 + ' wins!' : player2 + ' wins!';
        gameEnded = true;
    } else if (gameBoard.every(cell => cell !== '')) {
        document.getElementById('message').innerText = "It's a draw!";
        gameEnded = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('message').innerText = currentPlayer === 'X' ? player1 + "'s turn" : player2 + "'s turn";
    }
}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winningCombinations.some(combination =>
        combination.every(cell => gameBoard[cell] === player)
    );
}

function resetGame() {
    currentPlayer = 'X';
    player1 = '';
    player2 = '';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false;

    document.getElementById('nameForm').reset();
    document.getElementById('nameForm').classList.remove('hidden');
    document.getElementById('gameBoard').classList.add('hidden');
    document.getElementById('message').innerText = '';
    document.querySelectorAll('td').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
    });
}
