// Collectible (Food) Class

// Load taco sprite once, shared across all instances
const tacoSprite = new Image();
tacoSprite.src = 'taco.png';

class Collectible {
  constructor(x, y, type, speed) {
    this.x = x;
    this.y = y;
    this.type = type; // 'taco', 'tamale', 'enchilada'
    this.width = 35;
    this.height = 35;
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
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;

    ctx.save();

    switch (this.type) {
      case 'taco':
        this.drawTaco(ctx, cx, cy);
        break;
      case 'tamale':
        this.drawTamale(ctx, cx, cy);
        break;
      case 'enchilada':
        this.drawEnchilada(ctx, cx, cy);
        break;
    }

    ctx.restore();
  }

  drawTaco(ctx, cx, cy) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tacoSprite, cx - this.width / 2, cy - this.height / 2, this.width, this.height);
  }

  drawTamale(ctx, cx, cy) {
    // Corn husk (elongated shape with tapered ends)
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 2;

    // Main husk body
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy);
    ctx.quadraticCurveTo(cx - 16, cy - 8, cx - 10, cy - 9);
    ctx.lineTo(cx + 10, cy - 9);
    ctx.quadraticCurveTo(cx + 16, cy - 8, cx + 16, cy);
    ctx.quadraticCurveTo(cx + 16, cy + 8, cx + 10, cy + 9);
    ctx.lineTo(cx - 10, cy + 9);
    ctx.quadraticCurveTo(cx - 16, cy + 8, cx - 16, cy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Husk fold lines (diagonal texture)
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 0.8;
    for (let i = -12; i <= 12; i += 4) {
      ctx.beginPath();
      ctx.moveTo(cx + i, cy - 8);
      ctx.lineTo(cx + i + 3, cy + 8);
      ctx.stroke();
    }

    // Masa visible in center
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Filling detail (white line in center of masa)
    ctx.strokeStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 4, cy);
    ctx.lineTo(cx + 4, cy);
    ctx.stroke();

    // Tied ends (string wrapping)
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 1.5;
    // Left tie
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy - 4);
    ctx.lineTo(cx - 14, cy);
    ctx.lineTo(cx - 12, cy + 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 13, cy - 2);
    ctx.lineTo(cx - 11, cy);
    ctx.lineTo(cx - 13, cy + 2);
    ctx.stroke();

    // Right tie
    ctx.beginPath();
    ctx.moveTo(cx + 12, cy - 4);
    ctx.lineTo(cx + 14, cy);
    ctx.lineTo(cx + 12, cy + 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 13, cy - 2);
    ctx.lineTo(cx + 11, cy);
    ctx.lineTo(cx + 13, cy + 2);
    ctx.stroke();

    // Husk frayed ends
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy - 2);
    ctx.lineTo(cx - 19, cy - 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy + 2);
    ctx.lineTo(cx - 19, cy + 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 16, cy - 2);
    ctx.lineTo(cx + 19, cy - 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 16, cy + 2);
    ctx.lineTo(cx + 19, cy + 4);
    ctx.stroke();
  }

  drawEnchilada(ctx, cx, cy) {
    // Rolled tortilla
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 2;

    // Main rolled shape
    ctx.beginPath();
    ctx.roundRect(cx - 14, cy - 6, 28, 12, 6);
    ctx.fill();
    ctx.stroke();

    // Spiral end (showing the roll from the side)
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx + 13, cy, 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 13, cy, 2, 0, Math.PI * 2);
    ctx.stroke();

    // Sauce on top (wavy thick layer)
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy - 5);
    ctx.quadraticCurveTo(cx - 8, cy - 10, cx - 4, cy - 6);
    ctx.quadraticCurveTo(cx, cy - 11, cx + 4, cy - 6);
    ctx.quadraticCurveTo(cx + 8, cy - 10, cx + 12, cy - 5);
    ctx.lineTo(cx + 10, cy - 4);
    ctx.quadraticCurveTo(cx + 7, cy - 8, cx + 4, cy - 4);
    ctx.quadraticCurveTo(cx, cy - 8, cx - 4, cy - 4);
    ctx.quadraticCurveTo(cx - 7, cy - 8, cx - 10, cy - 4);
    ctx.closePath();
    ctx.fill();

    // Sauce drips down the sides
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy - 3);
    ctx.quadraticCurveTo(cx - 12, cy, cx - 10, cy + 2);
    ctx.quadraticCurveTo(cx - 9, cy, cx - 9, cy - 3);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 8, cy - 3);
    ctx.quadraticCurveTo(cx + 11, cy + 1, cx + 9, cy + 3);
    ctx.quadraticCurveTo(cx + 8, cy + 1, cx + 7, cy - 3);
    ctx.fill();

    // Cheese on top (white zigzag)
    ctx.strokeStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy - 6);
    for (let i = 0; i < 6; i++) {
      const zx = cx - 6 + i * 3;
      const zy = cy - 6 + (i % 2 === 0 ? -2 : 1);
      ctx.lineTo(zx, zy);
    }
    ctx.stroke();

    // Plate/shadow underneath
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 8, 16, 3, 0, 0, Math.PI * 2);
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
