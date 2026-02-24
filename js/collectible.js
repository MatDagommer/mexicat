// Collectible (Food) Class

class Collectible {
  constructor(x, y, type, speed) {
    this.x = x;
    this.y = y;
    this.type = type; // 'taco', 'tamale', 'enchilada'
    this.width = 30;
    this.height = 30;
    this.speed = speed;
    this.offscreen = false;
    this.collected = false;
    this.points = GAME_CONFIG.COLLECTIBLE_POINTS;
  }

  update(deltaTime) {
    // Move left
    this.x -= this.speed * (deltaTime / 16);

    // Mark for removal if offscreen
    if (this.x + this.width < 0) {
      this.offscreen = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;

    switch (this.type) {
      case 'taco':
        // Triangle shape for taco shell
        ctx.beginPath();
        ctx.moveTo(this.x + 5, this.y + this.height - 5);
        ctx.lineTo(this.x + this.width / 2, this.y + 5);
        ctx.lineTo(this.x + this.width - 5, this.y + this.height - 5);
        ctx.closePath();
        ctx.fill();

        // Filling lines (lettuce/meat)
        ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(this.x + 8 + i * 3, this.y + 15 + i * 3);
          ctx.lineTo(this.x + 18 + i * 2, this.y + 15 + i * 3);
          ctx.stroke();
        }
        break;

      case 'tamale':
        // Rectangle for tamale
        ctx.fillRect(this.x + 5, this.y + 10, this.width - 10, 12);

        // Corn husk wrapping lines
        ctx.strokeStyle = GAME_CONFIG.COLOR_WHITE;
        ctx.lineWidth = 1;
        for (let i = 0; i < this.width - 10; i += 4) {
          ctx.beginPath();
          ctx.moveTo(this.x + 5 + i, this.y + 10);
          ctx.lineTo(this.x + 5 + i, this.y + 22);
          ctx.stroke();
        }

        // Tied ends
        ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x + 5, this.y + 12);
        ctx.lineTo(this.x + 3, this.y + 16);
        ctx.lineTo(this.x + 5, this.y + 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x + this.width - 5, this.y + 12);
        ctx.lineTo(this.x + this.width - 3, this.y + 16);
        ctx.lineTo(this.x + this.width - 5, this.y + 20);
        ctx.stroke();
        break;

      case 'enchilada':
        // Rounded rectangle for enchilada
        ctx.beginPath();
        ctx.roundRect(this.x + 5, this.y + 8, this.width - 10, 15, 3);
        ctx.fill();

        // Sauce drips
        ctx.beginPath();
        ctx.arc(this.x + 10, this.y + 23, 2, 0, Math.PI * 2);
        ctx.arc(this.x + 18, this.y + 25, 2, 0, Math.PI * 2);
        ctx.arc(this.x + 23, this.y + 23, 2, 0, Math.PI * 2);
        ctx.fill();

        // Cheese lines
        ctx.strokeStyle = GAME_CONFIG.COLOR_WHITE;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x + 8, this.y + 13);
        ctx.lineTo(this.x + 22, this.y + 13);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x + 8, this.y + 18);
        ctx.lineTo(this.x + 22, this.y + 18);
        ctx.stroke();
        break;
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
