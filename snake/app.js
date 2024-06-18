const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX;
let foodY;
let snakeX = 5,
  snakeY = 10;
let snakeBoy = [];
let velocityX = 0,
  velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 20) + 1;
  foodY = Math.floor(Math.random() * 20) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Gamer over...");
  location.reload();
};

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  // initGame();
};

controls.forEach((key) => {
  key.addEventListener("click", () =>
    changeDirection({ key: key.dataset.key })
  );
});

const initGame = () => {
  if (gameOver) {
    return handleGameOver();
  }
  let htmlMarkup = `
    <div class="food" style="grid-area: ${foodY} / ${foodX}">
    </div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBoy.push([foodX, foodY]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerHTML = ` Score: ${score}`;
    highScoreElement.innerHTML = `High Score: ${highScore}`;
  }

  for (let i = snakeBoy.length - 1; i > 0; i--) {
    snakeBoy[i] = snakeBoy[i - 1];
  }
  snakeBoy[0] = [snakeX, snakeY]; //Setting first element of snake body to currentsnake positon

  //Updating the snake's head position based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  // Checking if the snke's head is out of wall, if so setting gameOver to true
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBoy.length; i++) {
    // Adding a div for each part of the snake's body
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBoy[i][1]} / ${snakeBoy[i][0]}"></div>`;

    if (
      i !== 0 &&
      snakeBoy[0][1] === snakeBoy[i][1] &&
      snakeBoy[0][0] === snakeBoy[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
  // window.requestAnimationFrame(initGame);
};

changeFoodPosition();
initGame();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
