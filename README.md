# Mexicat

A fun Mexican-themed endless runner game where a cat must avoid cactuses while collecting delicious Mexican food!

## Game Description

Help Mexicat navigate through the desert with smooth, Nyan Cat-style movement! Move freely in all directions to avoid dangerous cactuses while collecting tacos, tamales, and enchiladas. The game gets progressively harder with each 2-minute stage as the speed increases. How long can you survive?

## Features

- **Nyan Cat-Style Movement**: Move freely in all 4 directions with smooth momentum
- **Progressive Difficulty**: Speed increases every 2 minutes (new stage)
- **Scoring System**: Collect food items for +5 points each
- **Three Collectibles**: Tacos, tamales, and enchiladas
- **Black & White Graphics**: Simple, clean geometric art style
- **Endless Runner**: Keep playing as long as you can survive!

## How to Play

1. Open `index.html` in your web browser
2. Press **SPACE** to start the game
3. Use **Arrow Keys** to move the cat in all directions (↑↓←→)
4. Navigate around cactuses and collect Mexican food items
5. Collect Mexican food items to increase your score
6. Survive as long as possible!

### Controls

- **Arrow Keys (↑↓←→)**: Move the cat in all directions with smooth momentum
- **SPACE**: Start game / Restart after game over
- **Multiple Keys**: Press multiple arrow keys for diagonal movement!

## Game Rules

- Each food item gives you **+5 points**
- You have **one life** - touching a cactus ends the game
- Each stage lasts **2 minutes**
- Speed increases by **25%** with each new stage
- Try to achieve the highest score possible!

## Technical Details

### Technology Stack

- **Vanilla JavaScript** - No frameworks or dependencies
- **HTML5 Canvas** - For rendering graphics
- **CSS3** - For page styling

### Project Structure

```
mexicat/
├── index.html           # Main HTML file
├── css/
│   └── style.css       # Styling
├── js/
│   ├── constants.js    # Game configuration
│   ├── collision.js    # Collision detection
│   ├── player.js       # Cat character
│   ├── obstacle.js     # Cactus obstacles
│   ├── collectible.js  # Food items
│   ├── background.js   # Scrolling background
│   ├── stage.js        # Stage progression
│   ├── game.js         # Core game loop
│   └── main.js         # Initialization
└── README.md           # This file
```

### Game Architecture

- **Game Loop**: 60 FPS using `requestAnimationFrame`
- **Collision Detection**: AABB (Axis-Aligned Bounding Box) with padding
- **Physics**: Simple gravity system for jumping
- **Spawning**: Time-based entity spawning system
- **Stage System**: Progressive difficulty with speed multipliers

## Customization

You can easily customize the game by editing [js/constants.js](js/constants.js):

```javascript
// Canvas size
CANVAS_WIDTH: 800
CANVAS_HEIGHT: 600

// Stage duration (milliseconds)
STAGE_DURATION: 120000  // 2 minutes

// Base game speed
BASE_SPEED: 5

// Speed increase per stage
SPEED_INCREMENT: 0.25  // 25% increase

// Spawn rates
OBSTACLE_BASE_SPAWN_RATE: 2000    // 2 seconds
COLLECTIBLE_BASE_SPAWN_RATE: 3000 // 3 seconds

// Points per collectible
COLLECTIBLE_POINTS: 5
```

## Future Enhancements

- Sound effects and background music
- Animated sprite sheets
- Power-ups (invincibility, double points)
- High score tracking with localStorage
- Multiple difficulty modes
- Mobile touch controls
- Additional obstacle types
- Combo system for consecutive collections

## Browser Compatibility

This game works in all modern browsers that support HTML5 Canvas:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Credits

Created as a simple, fun web game using vanilla JavaScript and HTML5 Canvas.

## License

Free to use and modify for personal and educational purposes.

---

Enjoy playing Mexicat Runner!
