// Game Configuration Constants

const GAME_CONFIG = {
  // Canvas dimensions
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,

  // Player settings
  PLAYER_START_X: 100,
  PLAYER_START_Y: 300,  // Center of screen
  PLAYER_WIDTH: 60,
  PLAYER_HEIGHT: 40,

  // Player movement (Nyan Cat style)
  PLAYER_ACCELERATION: 1.2,
  PLAYER_MAX_SPEED: 10,
  PLAYER_FRICTION: 0.85,

  // Game settings
  STAGE_DURATION: 20000,  // 20 seconds in milliseconds
  BASE_SPEED: 5,
  SPEED_INCREMENT: 0.25,

  // Spawning
  OBSTACLE_BASE_SPAWN_RATE: 2000,  // milliseconds
  COLLECTIBLE_BASE_SPAWN_RATE: 3000,  // milliseconds
  SPAWN_X: 850,  // Just off right edge of canvas

  // Scoring
  COLLECTIBLE_POINTS: 5,

  // Collectible types
  COLLECTIBLE_TYPES: ['taco'],

  // Colors (Black & White theme)
  COLOR_BLACK: '#000000',
  COLOR_WHITE: '#FFFFFF',
  COLOR_GRAY: '#EEEEEE',
  COLOR_LIGHT_GRAY: '#CCCCCC',

  // Desert theme colors
  COLOR_SAND: '#E8D4A2',  // Warm sand color
  COLOR_SAND_DARK: '#C9B380',  // Darker sand for texture
  COLOR_CACTUS_GREEN: '#4A7C59',  // Desert cactus green

  // Food colors
  COLOR_TACO_YELLOW: '#F4D03F',  // Taco shell yellow

  // Player colors
  COLOR_CAT_BODY: '#8BA3B8'  // Gray/blue for cat body
};

// Keyboard keys
const KEYS = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  SPACE: ' '
};
