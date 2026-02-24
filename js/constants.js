// Game Configuration Constants

const GAME_CONFIG = {
  // Canvas dimensions
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,

  // Player settings
  PLAYER_START_X: 100,
  PLAYER_START_Y: 420,  // Ground level
  PLAYER_WIDTH: 40,
  PLAYER_HEIGHT: 40,
  PLAYER_DUCK_HEIGHT: 20,

  // Physics
  GRAVITY: 0.5,
  JUMP_POWER: -12,
  GROUND_Y: 420,  // Where the player stands

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
  SPACE: ' '
};
