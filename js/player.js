// Player (Cat) Class - Nyan Cat style movement

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
  }

  update(deltaTime) {
    // Apply friction (deceleration when no input)
    this.velocityX *= this.friction;
    this.velocityY *= this.friction;

    // Clamp velocity to max speed
    this.velocityX = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.velocityX));
    this.velocityY = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.velocityY));

    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;

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
  }

  // Movement methods (called from input handler)
  moveUp() {
    this.velocityY -= this.acceleration;
  }

  moveDown() {
    this.velocityY += this.acceleration;
  }

  moveLeft() {
    this.velocityX -= this.acceleration;
  }

  moveRight() {
    this.velocityX += this.acceleration;
  }

  draw(ctx) {
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;

    // Body
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Ears (triangles)
    ctx.beginPath();
    ctx.moveTo(this.x + 5, this.y);
    ctx.lineTo(this.x + 10, this.y - 8);
    ctx.lineTo(this.x + 15, this.y);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(this.x + 25, this.y);
    ctx.lineTo(this.x + 30, this.y - 8);
    ctx.lineTo(this.x + 35, this.y);
    ctx.fill();

    // Tail (curved)
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height / 2);
    ctx.quadraticCurveTo(this.x - 15, this.y - 10, this.x - 10, this.y + 10);
    ctx.stroke();

    // Eyes (white dots)
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.fillRect(this.x + 15, this.y + 10, 3, 3);
    ctx.fillRect(this.x + 25, this.y + 10, 3, 3);

    // Whiskers
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 1;
    // Left whiskers
    ctx.beginPath();
    ctx.moveTo(this.x + 5, this.y + 15);
    ctx.lineTo(this.x - 5, this.y + 13);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x + 5, this.y + 18);
    ctx.lineTo(this.x - 5, this.y + 18);
    ctx.stroke();
    // Right whiskers
    ctx.beginPath();
    ctx.moveTo(this.x + 35, this.y + 15);
    ctx.lineTo(this.x + 45, this.y + 13);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x + 35, this.y + 18);
    ctx.lineTo(this.x + 45, this.y + 18);
    ctx.stroke();
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
