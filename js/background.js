// Background Class - Minimal bird's eye view

class Background {
  constructor(width, height, speed) {
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.offset = 0;

    // Small ground dots to give a sense of scrolling movement
    this.dots = [];
    for (let i = 0; i < 40; i++) {
      this.dots.push({
        x: Math.random() * (this.width + 200),
        y: Math.random() * this.height,
        size: Math.random() * 2 + 1
      });
    }
  }

  update(deltaTime) {
    this.offset += this.speed * (deltaTime / 16);

    // Move dots left to give sense of scrolling
    this.dots.forEach(dot => {
      dot.x -= this.speed * (deltaTime / 16) * 0.5;
      if (dot.x < -10) {
        dot.x = this.width + Math.random() * 50;
        dot.y = Math.random() * this.height;
      }
    });
  }

  draw(ctx) {
    // Desert sand background
    ctx.fillStyle = GAME_CONFIG.COLOR_SAND;
    ctx.fillRect(0, 0, this.width, this.height);

    // Subtle scrolling dots (sand texture from above)
    ctx.fillStyle = GAME_CONFIG.COLOR_SAND_DARK;
    this.dots.forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  setSpeed(speed) {
    this.speed = speed;
  }
}
