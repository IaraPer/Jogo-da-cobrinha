const board = document.getElementById('game-board');
const gameOverText = document.getElementById('game-over');
const boardSize = 400;
const snakeSize = 20;

let snake = [{x: 200, y: 200}]; // A cobrinha começa no centro
let direction = 'RIGHT';
let apple = {x: 0, y: 0};
let gameInterval;
let isGameOver = false;

function startGame() {
    document.addEventListener('keydown', changeDirection);
    placeApple();
    gameInterval = setInterval(updateGame, 100); // Atualiza a cada 100ms
}

function updateGame() {
    if (isGameOver) return;
    
    moveSnake();
    checkCollisions();
    checkAppleCollision();
    renderGame();
}

function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= snakeSize;
    if (direction === 'DOWN') head.y += snakeSize;
    if (direction === 'LEFT') head.x -= snakeSize;
    if (direction === 'RIGHT') head.x += snakeSize;

    snake.unshift(head);
    snake.pop(); // Remove a última parte da cobrinha
}

function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

function checkCollisions() {
    const head = snake[0];

    // Colisão com as paredes
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        endGame();
    }

    // Colisão com o próprio corpo
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function checkAppleCollision() {
    const head = snake[0];
    
    if (head.x === apple.x && head.y === apple.y) {
        snake.push({ x: apple.x, y: apple.y }); // Adiciona um novo segmento à cobrinha
        placeApple();
    }
}

function placeApple() {
    const randomX = Math.floor(Math.random() * (boardSize / snakeSize)) * snakeSize;
    const randomY = Math.floor(Math.random() * (boardSize / snakeSize)) * snakeSize;
    apple = { x: randomX, y: randomY };
}

function renderGame() {
    board.innerHTML = ''; // Limpa o tabuleiro

    // Renderiza a cobrinha
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        board.appendChild(snakeElement);
    });

    // Renderiza a maçã
    const appleElement = document.createElement('div');
    appleElement.classList.add('apple');
    appleElement.style.left = `${apple.x}px`;
    appleElement.style.top = `${apple.y}px`;
    board.appendChild(appleElement);
}

function endGame() {
    clearInterval(gameInterval);
    isGameOver = true;
    gameOverText.style.display = 'block';
}

startGame();
