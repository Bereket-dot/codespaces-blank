// script.js

let gridSize = 3; // Default grid size (3x3)
let pieces, emptyIndex, puzzle, isPaused = true, timerInterval;
let gameStatusElement = document.getElementById("gameStatus");
let timerElement = document.getElementById("time");
let seconds = 0, minutes = 0;

// Toggle Dark/Light Mode
function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

// Start Game Page from Home
function startGamePage() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
    gridSize = document.getElementById("difficulty").value; // Get selected difficulty
    init();
}

// Back to Home
function goBackHome() {
    document.getElementById("gamePage").style.display = "none";
    document.getElementById("homePage").style.display = "block";
    resetTimer();
}

// Initialize the puzzle game
function init() {
    pieces = Array.from({ length: gridSize * gridSize }, (_, index) => index);
    emptyIndex = gridSize * gridSize - 1;
    createPuzzle();
    gameStatusElement.textContent = "Paused";
    updateTimer();
}

// Reset Timer
function resetTimer() {
    seconds = 0;
    minutes = 0;
    timerElement.textContent = `Time: 00:00`;
}

// Create puzzle pieces
function createPuzzle() {
    puzzle = document.getElementById("puzzle");
    puzzle.innerHTML = '';
    const pieceSize = 100; // Fixed size for puzzle pieces
    puzzle.style.gridTemplateColumns = `repeat(${gridSize}, ${pieceSize}px)`;
    puzzle.style.gridTemplateRows = `repeat(${gridSize}, ${pieceSize}px)`;

    pieces.forEach((piece, index) => {
        const pieceElement = document.createElement("div");
        pieceElement.classList.add("puzzle-piece");
        if (piece === emptyIndex) {
            pieceElement.classList.add("empty");
        } else {
            pieceElement.textContent = piece + 1;
            pieceElement.addEventListener("click", () => movePiece(index));
        }
        puzzle.appendChild(pieceElement);
    });
}

// Shuffle pieces
function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    createPuzzle();
}

// Move a piece
function movePiece(index) {
    if (isPaused) return;
    const validMoves = getValidMoves(emptyIndex);
    if (validMoves.includes(index)) {
        [pieces[emptyIndex], pieces[index]] = [pieces[index], pieces[emptyIndex]];
        emptyIndex = index;
        createPuzzle();
        checkIfSolved();
    }
}

// Get valid moves for the empty space
function getValidMoves(index) {
    const moves = [];
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    if (row > 0) moves.push(index - gridSize); // Move up
    if (row < gridSize - 1) moves.push(index + gridSize); // Move down
    if (col > 0) moves.push(index - 1); // Move left
    if (col < gridSize - 1) moves.push(index + 1); // Move right
    return moves;
}

// Check if the puzzle is solved
function checkIfSolved() {
    if (pieces.every((piece, index) => piece === index)) {
        gameStatusElement.textContent = "Puzzle Solved! 🎉";
        pauseGame();
    }
}

// Start the game
function startGame() {
    isPaused = false;
    shufflePieces();
    gameStatusElement.textContent = "Game Started!";
    document.getElementById("pauseBtn").disabled = false;
    document.getElementById("resumeBtn").disabled = false;
    timerInterval = setInterval(updateTimer, 1000);
}

// Pause the game
function pauseGame() {
    isPaused = true;
    gameStatusElement.textContent = "Game Paused ⏸️";
    clearInterval(timerInterval);
}

// Resume the game
function resumeGame() {
    isPaused = false;
    gameStatusElement.textContent = "Game Resumed ▶️";
    timerInterval = setInterval(updateTimer, 1000);
}

// Restart the game
function restartGame() {
    pieces = Array.from({ length: gridSize * gridSize }, (_, index) => index);
    emptyIndex = gridSize * gridSize - 1;
    shufflePieces();
    gameStatusElement.textContent = "Game Restarted 🔄";
    resetTimer();
}

// Update the timer
function updateTimer() {
    if (isPaused) return;

    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    timerElement.textContent = `Time: ${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Modal functions
function showAbout() {
    document.getElementById('aboutModal').style.display = 'block';
}

function showInstructions() {
    document.getElementById('instructionsModal').style.display = 'block';
}

function showFeedback() {
    document.getElementById('feedbackModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function submitFeedback() {
    const feedbackText = document.getElementById('feedbackText').value;
    alert("Feedback Submitted: " + feedbackText);
    closeModal('feedbackModal');
}
