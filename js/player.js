// Player (Cat) Class

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = GAME_CONFIG.PLAYER_WIDTH;
    this.height = GAME_CONFIG.PLAYER_HEIGHT;
    this.velocityY = 0;
    this.gravity = GAME_CONFIG.GRAVITY;
    this.jumpPower = GAME_CONFIG.JUMP_POWER;
    this.isJumping = false;
    this.isDucking = false;
    this.groundY = GAME_CONFIG.GROUND_Y;
  }

  update(deltaTime) {
    // Apply gravity when in the air
    if (this.y < this.groundY) {
      this.velocityY += this.gravity;
      this.y += this.velocityY;
      this.isJumping = true;
    } else {
      // On the ground
      this.y = this.groundY;
      this.velocityY = 0;
      this.isJumping = false;
    }

    // Handle ducking - change hitbox
    if (this.isDucking && !this.isJumping) {
      this.height = GAME_CONFIG.PLAYER_DUCK_HEIGHT;
    } else {
      this.height = GAME_CONFIG.PLAYER_HEIGHT;
    }
  }

  jump() {
    if (!this.isJumping) {
      this.velocityY = this.jumpPower;
      this.isJumping = true;
    }
  }

  duck() {
    if (!this.isJumping) {
      this.isDucking = true;
    }
  }

  standUp() {
    this.isDucking = false;
  }

  draw(ctx) {
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;

    if (this.isDucking) {
      // Draw ducking cat (lower, flatter)
      // Body (flatter rectangle)
      ctx.fillRect(this.x, this.y + 20, this.width, this.height);

      // Tail (horizontal)
      ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + 30);
      ctx.quadraticCurveTo(this.x - 15, this.y + 25, this.x - 10, this.y + 35);
      ctx.stroke();

      // Eyes
      ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
      ctx.fillRect(this.x + 25, this.y + 25, 3, 3);
      ctx.fillRect(this.x + 32, this.y + 25, 3, 3);
    } else {
      // Draw standing/jumping cat
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
