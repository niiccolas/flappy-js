/* eslint-disable no-multi-spaces */

// Inspired from:
// flappybird.io
// http://www.aprogrammingdiary.com/program-javascript-game-scratch/
// https://www.youtube.com/watch?v=pufKO5EG8nc

/*=============================================
=            GAME VARIABLES                   =
=============================================*/

const gameSpeed   = 3;
const canvas      = document.getElementById('flappy-canvas');
const sprites     = document.getElementById('sprites');
const context     = canvas.getContext('2d');
context.font      = 'bold 30px monospace';
context.fillStyle = 'white';
context.textAlign = 'center';
context.lineWidth = 2;

let   score        = 0;      // Will hold the global score
let   pressed      = false;  // Flag variable, determines if a key is pressed
let   gameIsPaused = true;   // Flag variable, determines if the game is paused or unpaused
let   gameIsOver   = false;  // Flag variable, determines if the game is over or not

const player         = new Bird(50, 240, 80, 70);
const obstacleBottom = new Obstacle(360, 480, 80, 300, gameSpeed);
const obstacleTop    = new Obstacle(360, 0, 80, 300, gameSpeed);
const background1    = new Background(0, 0, 360, 640, gameSpeed);
const background2    = new Background(360, 0, 360, 640, gameSpeed);

/*=====  End of GAME VARIABLES  ======*/

/*=============================================
=            UI functions                     =
=============================================*/

function drawText(text, x, y) {
  context.fillStyle = 'white';
  context.fillText(text, x, y);
}

function drawOverlay(x, y, w, h) {
  context.fillStyle = 'rgba(0, 0, 200, 0.5)';
  context.fillRect(x, y, w, h);
}

function endTheGame() {
  new Audio('./assets/audio/hit.wav').play();
  gameIsOver = true;
}

/*=====  End of UI functions  ======*/

/*=============================================
=            INPUTS                           =
=============================================*/

document.addEventListener('click', (event) => {
  if (gameIsPaused) { gameIsPaused = false; }
  if (event.type === 'click' && !gameIsPaused) {
    player.moveUp(11);
    if (gameIsOver) { window.location.reload(); }
  }
})

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && pressed === false) {
    player.moveUp(11);
    pressed = true; // Prevent player from keeping key pressed
  }

  if (event.code === 'Space' || event.code === 'Enter') {
    if (gameIsOver)   { window.location.reload(); }
    if (gameIsPaused) { gameIsPaused = false; }
  }
}, false);

document.addEventListener('keyup', () => { pressed = false; }, false);

/*=====  End of INPUTS  ======*/

/*=============================================
=            MAIN GAME LOOP                   =
=============================================*/

function gameLoop() {
  // UPDATE CALLS
  // If the game is not paused and is not over, keep executing the physics and the logic
  if (!gameIsPaused && !gameIsOver) {
    player.update();
    obstacleTop.update();
    obstacleBottom.update();
    background1.update();
    background2.update();
  }

  // DRAW CALLS
  // Clear the screen first
  // context.clearRect(0, 0, 360, 640);

  // Draw the backgrounds first
  background1.draw();
  background2.draw();

  // Then draw the foreground objects
  player.draw();
  obstacleTop.draw();
  obstacleBottom.draw();

  if (gameIsOver) {
    // If the game is over, show the necessary message
    drawOverlay(0, 0, 360, 640);
    drawText('Game Over', 180, 310);
    drawText(`Score: ${score}`, 180, 380);
  } else {
    // If neither is true, just show the score
    drawOverlay(0, 0, 360, 64);
    drawText(score, 180, 52);
  }

  // Recursive loop - Calls itself
  window.requestAnimationFrame(gameLoop);
}

gameLoop();
/*=====  End of MAIN GAME LOOP  ======*/
