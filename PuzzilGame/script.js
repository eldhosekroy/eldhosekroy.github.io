const grid = document.getElementById('puzzle-grid');
const shuffleButton = document.getElementById('shuffle-button');
const moveCounter = document.getElementById('move-counter');

let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null]; // Null represents the empty space
let moves = 0;

function renderGrid() {
    grid.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';
        if (tile === null) {
            tileElement.classList.add('empty');
        } else {
            tileElement.innerText = tile;
            tileElement.addEventListener('click', () => moveTile(index));
        }
        grid.appendChild(tileElement);
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [index - 1, index + 1, index - 3, index + 3]; // Left, Right, Up, Down
    if (validMoves.includes(emptyIndex)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]]; // Swap
        moves++;
        updateMoveCounter();
        renderGrid();
        checkWin();
    }
}

function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    moves = 0;
    updateMoveCounter();
    renderGrid();
}

function updateMoveCounter() {
    moveCounter.innerText = `Moves: ${moves}`;
}

function checkWin() {
    if (JSON.stringify(tiles) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, null])) {
        showCongratsPopup();
    }
}

function showCongratsPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Congratulations!</h2>
            <p>You solved the puzzle in ${moves} moves!</p>
            <button id="close-popup">Close</button>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('close-popup').addEventListener('click', () => {
        document.body.removeChild(popup);
        resetGame(); // Reset the game after closing the popup
    });
}

function resetGame() {
    moves = 0;
    updateMoveCounter();
    shuffleTiles();
}

shuffleButton.addEventListener('click', shuffleTiles);

// Initial render
renderGrid();
