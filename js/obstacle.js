// Obstacle (Cactus) Class

class Obstacle {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 60;
    this.speed = speed;
    this.offscreen = false;
  }

  update(deltaTime) {
    // Move left (scrolling effect)
    this.x -= this.speed * (deltaTime / 16);

    // Mark for removal if offscreen
    if (this.x + this.width < 0) {
      this.offscreen = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = GAME_CONFIG.COLOR_CACTUS_GREEN;

    // Main cactus body
    ctx.fillRect(this.x + 10, this.y, 10, this.height);

    // Left arm
    ctx.fillRect(this.x, this.y + 20, 10, 15);
    ctx.fillRect(this.x + 10, this.y + 20, 3, 8);

    // Right arm
    ctx.fillRect(this.x + 20, this.y + 30, 10, 12);
    ctx.fillRect(this.x + 17, this.y + 30, 3, 8);

    // Spikes (small lines)
    ctx.strokeStyle = GAME_CONFIG.COLOR_CACTUS_GREEN;
    ctx.lineWidth = 2;
    for (let i = 5; i < this.height; i += 10) {
      // Left side spikes
      ctx.beginPath();
      ctx.moveTo(this.x + 10, this.y + i);
      ctx.lineTo(this.x + 7, this.y + i);
      ctx.stroke();

      // Right side spikes
      ctx.beginPath();
      ctx.moveTo(this.x + 20, this.y + i);
      ctx.lineTo(this.x + 23, this.y + i);
      ctx.stroke();
    }

    // Top spikes
    ctx.beginPath();
    ctx.moveTo(this.x + 15, this.y);
    ctx.lineTo(this.x + 13, this.y - 3);
    ctx.lineTo(this.x + 17, this.y - 3);
    ctx.closePath();
    ctx.fill();
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
