// Main entry point - Initialization and input handling

let game;

// Track which keys are currently pressed for simultaneous input
const keysPressed = {
  up: false,
  down: false,
  left: false,
  right: false
};

function isPatchNoteVisible() {
  return !document.getElementById('patch-note-overlay').classList.contains('hidden');
}

function dismissPatchNote() {
  document.getElementById('patch-note-overlay').classList.add('hidden');
}

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

  // Patch note popup
  document.getElementById('patch-note-version').textContent = APP_VERSION;
  if (PATCH_NOTE_EXPIRY > 0 && Date.now() < PATCH_NOTE_EXPIRY) {
    document.getElementById('patch-note-overlay').classList.remove('hidden');
  }
  document.getElementById('patch-note-dismiss').addEventListener('click', dismissPatchNote);

  // Keyboard input handling
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  // Name entry overlay events
  const nameInput = document.getElementById('player-name');
  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      game.showLeaderboard(nameInput.value);
    }
  });

  document.getElementById('submit-score-btn').addEventListener('click', () => {
    game.showLeaderboard(nameInput.value);
  });

  document.getElementById('skip-score-btn').addEventListener('click', () => {
    game.showLeaderboard(null);
  });
});

function handleKeyDown(e) {
  // Dismiss patch note overlay and block game keys while it's visible
  if (isPatchNoteVisible()) {
    if (e.key === KEYS.ESCAPE || e.key === KEYS.ENTER || e.key === KEYS.SPACE) {
      dismissPatchNote();
    }
    e.preventDefault();
    return;
  }

  // Don't intercept keys when the name input has focus
  const nameInputFocused = document.activeElement === document.getElementById('player-name');

  if (!nameInputFocused && [KEYS.UP, KEYS.DOWN, KEYS.LEFT, KEYS.RIGHT, KEYS.SPACE, KEYS.ESCAPE].includes(e.key)) {
    e.preventDefault();
  }

  if (!game) return;

  // Menu state - Start game
  if (game.state === 'menu' && e.key === KEYS.SPACE) {
    game.start();
    return;
  }

  // Playing state - Track arrow key states, or pause on Escape
  if (game.state === 'playing') {
    if (e.key === KEYS.ESCAPE) { game.pause(); return; }
    if (e.key === KEYS.UP) keysPressed.up = true;
    if (e.key === KEYS.DOWN) keysPressed.down = true;
    if (e.key === KEYS.LEFT) keysPressed.left = true;
    if (e.key === KEYS.RIGHT) keysPressed.right = true;
  }

  // Paused state - Resume on Enter or Space
  if (game.state === 'paused' && (e.key === KEYS.ENTER || e.key === KEYS.SPACE)) {
    game.resume();
    return;
  }

  // Leaderboard state - Play again
  if (game.state === 'leaderboard' && e.key === KEYS.SPACE) {
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
