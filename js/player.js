// Player (Cat) Class - Nyan Cat style movement

// Load sprite frames once, shared across all Player instances
const playerSprites = {
  frame1: new Image(),
  frame2: new Image(),
  dead: new Image(),
  loaded: false
};
playerSprites.frame1.src = 'assets/mexicat-1.png';
playerSprites.frame2.src = 'assets/mexicat-2.png';
playerSprites.dead.src = 'assets/dead-cat.png';

// Check when all frames are loaded
Promise.all([
  new Promise(resolve => playerSprites.frame1.onload = resolve),
  new Promise(resolve => playerSprites.frame2.onload = resolve),
  new Promise(resolve => playerSprites.dead.onload = resolve),
]).then(() => {
  playerSprites.loaded = true;
});

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = GAME_CONFIG.PLAYER_WIDTH;
    this.height = GAME_CONFIG.PLAYER_HEIGHT;

    // Momentum-based movement
    this.velocityX = 0;
    this.velocityY = 0;
    this.acceleration = GAME_CONFIG.PLAYER_ACCELERATION;
    this.maxSpeed = GAME_CONFIG.PLAYER_MAX_SPEED;
    this.friction = GAME_CONFIG.PLAYER_FRICTION;

    // Animation
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.animationSpeed = 150; // milliseconds per frame
  }

  update(deltaTime) {
    const dt = deltaTime / 16;

    // Apply friction (deceleration when no input)
    this.velocityX *= Math.pow(this.friction, dt);
    this.velocityY *= Math.pow(this.friction, dt);

    // Clamp velocity to max speed
    this.velocityX = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.velocityX));
    this.velocityY = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.velocityY));

    // Update position
    this.x += this.velocityX * dt;
    this.y += this.velocityY * dt;

    // Keep within canvas boundaries
    this.x = Math.max(0, Math.min(GAME_CONFIG.CANVAS_WIDTH - this.width, this.x));
    this.y = Math.max(0, Math.min(GAME_CONFIG.CANVAS_HEIGHT - this.height, this.y));

    // Stop velocity if at boundary
    if (this.x <= 0 || this.x >= GAME_CONFIG.CANVAS_WIDTH - this.width) {
      this.velocityX = 0;
    }
    if (this.y <= 0 || this.y >= GAME_CONFIG.CANVAS_HEIGHT - this.height) {
      this.velocityY = 0;
    }

    // Update animation
    this.animationTimer += deltaTime;
    if (this.animationTimer >= this.animationSpeed) {
      this.animationFrame = (this.animationFrame + 1) % 2; // Toggle between 0 and 1
      this.animationTimer = 0;
    }
  }

  // Movement methods (called from input handler)
  moveUp(deltaTime) {
    this.velocityY -= this.acceleration * (deltaTime / 16);
  }

  moveDown(deltaTime) {
    this.velocityY += this.acceleration * (deltaTime / 16);
  }

  moveLeft(deltaTime) {
    this.velocityX -= this.acceleration * (deltaTime / 16);
  }

  moveRight(deltaTime) {
    this.velocityX += this.acceleration * (deltaTime / 16);
  }

  draw(ctx, dead = false) {
    if (playerSprites.loaded) {
      const frame = dead ? playerSprites.dead
                         : (this.animationFrame === 0 ? playerSprites.frame1 : playerSprites.frame2);
      ctx.imageSmoothingEnabled = false;
      ctx.save();
      ctx.drawImage(frame, this.x, this.y, this.width, this.height);
      ctx.restore();
    } else {
      ctx.fillStyle = GAME_CONFIG.COLOR_CAT_BODY;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}
