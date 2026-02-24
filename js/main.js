// Main entry point - Initialization and input handling

let game;

window.addEventListener('DOMContentLoaded', () => {
  // Get canvas element
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  // Set canvas dimensions
  canvas.width = GAME_CONFIG.CANVAS_WIDTH;
  canvas.height = GAME_CONFIG.CANVAS_HEIGHT;

  // Initialize game
  game = new Game(canvas);

  console.log('Mexicat Runner loaded! Press SPACE to start.');

  // Keyboard input handling
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
});

function handleKeyDown(e) {
  // Prevent default behavior for arrow keys and space
  if ([KEYS.UP, KEYS.DOWN, KEYS.SPACE].includes(e.key)) {
    e.preventDefault();
  }

  if (!game) return;

  // Menu state - Start game
  if (game.state === 'menu' && e.key === KEYS.SPACE) {
    game.start();
    return;
  }

  // Playing state - Controls
  if (game.state === 'playing') {
    if (e.key === KEYS.UP) {
      game.player.jump();
    }
    if (e.key === KEYS.DOWN) {
      game.player.duck();
    }
  }

  // Game over state - Restart
  if (game.state === 'gameover' && e.key === KEYS.SPACE) {
    game.restart();
  }
}

function handleKeyUp(e) {
  if (!game) return;

  // Release duck when key is released
  if (game.state === 'playing' && e.key === KEYS.DOWN) {
    game.player.standUp();
  }
}
