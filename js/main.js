// Main entry point - Initialization and input handling

let game;

// Track which keys are currently pressed for simultaneous input
const keysPressed = {
  up: false,
  down: false,
  left: false,
  right: false
};

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
  console.log('Controls: Arrow keys to move, SPACE to start/restart');

  // Keyboard input handling
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
});

function handleKeyDown(e) {
  // Prevent default behavior for arrow keys and space
  if ([KEYS.UP, KEYS.DOWN, KEYS.LEFT, KEYS.RIGHT, KEYS.SPACE].includes(e.key)) {
    e.preventDefault();
  }

  if (!game) return;

  // Menu state - Start game
  if (game.state === 'menu' && e.key === KEYS.SPACE) {
    game.start();
    return;
  }

  // Playing state - Track arrow key states
  if (game.state === 'playing') {
    if (e.key === KEYS.UP) {
      keysPressed.up = true;
    }
    if (e.key === KEYS.DOWN) {
      keysPressed.down = true;
    }
    if (e.key === KEYS.LEFT) {
      keysPressed.left = true;
    }
    if (e.key === KEYS.RIGHT) {
      keysPressed.right = true;
    }
  }

  // Game over state - Restart
  if (game.state === 'gameover' && e.key === KEYS.SPACE) {
    game.restart();
  }
}

function handleKeyUp(e) {
  if (!game) return;

  // Release arrow key states
  if (e.key === KEYS.UP) {
    keysPressed.up = false;
  }
  if (e.key === KEYS.DOWN) {
    keysPressed.down = false;
  }
  if (e.key === KEYS.LEFT) {
    keysPressed.left = false;
  }
  if (e.key === KEYS.RIGHT) {
    keysPressed.right = false;
  }
}
