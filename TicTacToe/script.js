let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let gameMode = "twoPlayer"; // Default to two player mode
const playerX = "X";
const playerO = "O";
const statusDisplay = document.querySelector('#status');
const restartBtn = document.querySelector('#restartBtn');
const cells = document.querySelectorAll('.cell');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.getElementById('twoPlayerBtn').addEventListener('click', () => {
    gameMode = "twoPlayer";
    startGame();
});

document.getElementById('onePlayerBtn').addEventListener('click', () => {
    gameMode = "onePlayer";
    startGame();
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
//restartBtn.addEventListener('click', restartGame);

function startGame() {
    document.querySelector('.home-screen').style.display = 'none';
    document.querySelector('.game-screen').style.display = 'block';
    statusDisplay.textContent = `${currentPlayer}'s turn`;
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== "" || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkGameStatus();
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function computerMove() {
    // 1. Win if possible
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = playerO;
            if (checkWinner()) {
                document.querySelector(`[data-index='${i}']`).textContent = playerO;
                endGame(`${playerO} wins!`);
                return;
            }
            board[i] = "";
        }
    }

    // 2. Block the opponent's win
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = playerX;
            if (checkWinner()) {
                board[i] = playerO;
                document.querySelector(`[data-index='${i}']`).textContent = playerO;
                currentPlayer = playerX;
                document.getElementById('status').textContent = `${currentPlayer}'s turn`;
                return;
            }
            board[i] = "";
        }
    }

    // 3. Take the center if available
    if (board[4] === "") {
        board[4] = playerO;
        document.querySelector(`[data-index='4']`).textContent = playerO;
        currentPlayer = playerX;
        document.getElementById('status').textContent = `${currentPlayer}'s turn`;
        return;
    }

    // 4. Take a corner if available
    const corners = [0, 2, 6, 8];
    for (let i of corners) {
        if (board[i] === "") {
            board[i] = playerO;
            document.querySelector(`[data-index='${i}']`).textContent = playerO;
            currentPlayer = playerX;
            document.getElementById('status').textContent = `${currentPlayer}'s turn`;
            return;
        }
    }

    // 5. Take any available space
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = playerO;
            document.querySelector(`[data-index='${i}']`).textContent = playerO;
            currentPlayer = playerX;
            document.getElementById('status').textContent = `${currentPlayer}'s turn`;
            return;
        }
    }
}

function endGame(message) {
    showPopup(message);
    isGameActive = false;
    //restartBtn.style.display = 'block';
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = message;
    popup.style.display = 'block';
}

document.getElementById('popupBtn').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
    restartGame();
});

function checkGameStatus() {
    if (checkWinner()) {
        endGame(`${currentPlayer} wins!`);
    } else if (!board.includes("")) {
        endGame(`It's a tie!`);
    } else {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        statusDisplay.textContent = `${currentPlayer}'s turn`;
        if (gameMode === "onePlayer" && currentPlayer === playerO) {
            setTimeout(computerMove, 500);
        }
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => (cell.textContent = ""));
    isGameActive = true;
    currentPlayer = playerX;
    restartBtn.style.display = 'none';
    statusDisplay.textContent = `${currentPlayer}'s turn`;
}
