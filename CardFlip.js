// JavaScript Code for Card Flip Game
const gameBoard = document.getElementById('game-board');
const status = document.getElementById('status');
const movesDisplay = document.getElementById('moves');
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Game';
resetButton.id = 'reset-button';
resetButton.addEventListener('click', resetGame);
document.querySelector('.game-container').appendChild(resetButton);

// Cards data with emoji faces
const cardValues = ['😀', '😂', '😍', '😎', '😜', '🤩', '😇', '🥳', '😀', '😂', '😍', '😎', '😜', '🤩', '😇', '🥳'];

// Shuffle function
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Create game board and cards
function createBoard() {
    gameBoard.innerHTML = '';
    shuffleArray(cardValues);
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

let flippedCards = [];
let matchedCards = 0;
let lockBoard = false;
let moves = 0;

// Add accuracy display
const accuracyDisplay = document.createElement('p');
accuracyDisplay.innerHTML = 'Accuracy: <span id="accuracy">0</span>%';
document.querySelector('#scoreboard').appendChild(accuracyDisplay);

// Update accuracy
function updateAccuracy() {
    const accuracy = moves > 0 ? ((matchedCards / moves) * 100).toFixed(2) : 0;
    document.getElementById('accuracy').textContent = accuracy;
}

// Flip card function
function flipCard() {
    if (lockBoard || this.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    this.classList.add('flipped');
    this.textContent = this.getAttribute('data-value');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        updateAccuracy();
        checkMatch();
    }
}

// Check if cards match
function checkMatch() {
    lockBoard = true;
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        flippedCards = [];
        lockBoard = false;

        if (matchedCards === cardValues.length) {
            status.textContent = 'You Win!';
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

// Reset game function
function resetGame() {
    moves = 0;
    matchedCards = 0;
    flippedCards = [];
    lockBoard = false;
    movesDisplay.textContent = moves;
    document.getElementById('accuracy').textContent = 0;
    status.textContent = '';
    createBoard();
}

// Initialize the game
createBoard();
