let difficulty = 'Medium';
let gridSize;
let timer;
let timeLeft = 30;
let score = 0;
let matchedPairs = 0;
let flippedCards = [];
const categories = {
    Fruits: ['🍎', '🍌', '🍓', '🍍', '🍇', '🍉', '🥭', '🍑'],
    Emojis: ['😀', '😂', '😎', '😍', '🥳', '😜', '🤩', '😇'],
    Animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
    Planets: ['🌍', '🌕', '🪐', '☀️', '🌟', '🌌', '🌠', '🌑'],
    Bikes: ['🏍️', '🚲', '🛵', '🚴‍♂️', '🛴', '🚲', '🛵', '🏍️'],
    Cars: ['🚗', '🚙', '🚘', '🚖', '🚔', '🚍', '🚎', '🚑']
};

// Set difficulty and show categories
function setDifficulty(level) {
    difficulty = level;
    gridSize = level === 'Easy' ? 4 : level === 'Medium' ? 6 : 8;
    document.getElementById('level-options').style.display = 'none';
    document.getElementById('game-options').classList.remove('hidden');
}

// Start the game
function startGame(category) {
    document.getElementById('score').innerText = '0';
    document.getElementById('timer').innerText = '30';
    score = 0;
    timeLeft = 30;
    matchedPairs = 0;
    flippedCards = [];
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    const gameBoard = document.getElementById('game-board');
    const gameOptions = document.getElementById('game-options');
    const gameArea = document.getElementById('game-area');
    let selectedItems = categories[category];

    gameOptions.style.display = 'none';
    gameArea.classList.remove('hidden');

    let pairCount = (gridSize * gridSize) / 2;
    let gameCards = [...selectedItems, ...selectedItems];
    gameCards = gameCards.slice(0, pairCount).concat(gameCards.slice(0, pairCount));
    gameCards.sort(() => Math.random() - 0.5);

    gameBoard.innerHTML = '';
    gameBoard.className = `grid grid-${gridSize}x${gridSize}`;
    gameCards.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = item;
        card.innerHTML = '<span class="hidden">' + item + '</span>';
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

// Timer countdown
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
    } else {
        clearInterval(timer);
        showPopup("Game Over! 😞 Try Again!");
    }
}

// Flip the card
function flipCard(card) {
    if (!card.classList.contains('flipped') && flippedCards.length < 2) {
        card.classList.add('flipped');
        card.firstChild.classList.remove('hidden');
        flippedCards.push(card);
    }

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 800);
    }
}

// Check if two cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        score += 10;
        document.getElementById('score').innerText = score;
        flippedCards = [];

        if (matchedPairs === (gridSize * gridSize) / 2) {
            clearInterval(timer);
            showPopup(`🎉 You Won! Score: ${score}`);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.firstChild.classList.add('hidden');
            card2.classList.remove('flipped');
            card2.firstChild.classList.add('hidden');
            flippedCards = [];
        }, 500);
    }
}

// Show popup for Game Over or Winning
function showPopup(message) {
    document.getElementById('final-message').innerText = message;
    document.getElementById('game-message').style.display = 'block';
}

// Reset game
function resetGame() {
    document.getElementById('game-message').style.display = 'none';
    document.getElementById('level-options').style.display = 'block';
    document.getElementById('game-options').classList.add('hidden');
    document.getElementById('game-area').classList.add('hidden');
}
