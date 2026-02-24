// Game Configuration Constants

const GAME_CONFIG = {
  // Canvas dimensions
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,

  // Player settings
  PLAYER_START_X: 100,
  PLAYER_START_Y: 300,  // Center of screen
  PLAYER_WIDTH: 40,
  PLAYER_HEIGHT: 40,

  // Player movement (Nyan Cat style)
  PLAYER_ACCELERATION: 0.6,
  PLAYER_MAX_SPEED: 6,
  PLAYER_FRICTION: 0.85,

  // Visual ground level (cat floats freely above it)
  GROUND_Y: 450,

  // Game settings
  STAGE_DURATION: 120000,  // 2 minutes in milliseconds
  BASE_SPEED: 5,
  SPEED_INCREMENT: 0.25,

  // Spawning
  OBSTACLE_BASE_SPAWN_RATE: 2000,  // milliseconds
  COLLECTIBLE_BASE_SPAWN_RATE: 3000,  // milliseconds
  SPAWN_X: 850,  // Just off right edge of canvas

  // Scoring
  COLLECTIBLE_POINTS: 5,

  // Collectible types
  COLLECTIBLE_TYPES: ['taco', 'tamale', 'enchilada'],

  // Colors (Black & White theme)
  COLOR_BLACK: '#000000',
  COLOR_WHITE: '#FFFFFF',
  COLOR_GRAY: '#EEEEEE',
  COLOR_LIGHT_GRAY: '#CCCCCC'
};

// Keyboard keys
const KEYS = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  SPACE: ' '
};
