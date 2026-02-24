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
    const cx = this.x + this.width / 2;  // center x
    const cy = this.y + this.height / 2; // center y

    ctx.save();

    // === TAIL (behind body) ===
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.x + 2, cy + 2);
    ctx.bezierCurveTo(
      this.x - 12, cy - 15,
      this.x - 20, cy - 5,
      this.x - 14, cy + 8
    );
    ctx.stroke();

    // === BODY (rounded) ===
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, 18, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body highlight (white belly)
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.beginPath();
    ctx.ellipse(cx + 2, cy + 8, 10, 8, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // === HEAD (round, overlapping body) ===
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.arc(cx + 4, cy - 8, 14, 0, Math.PI * 2);
    ctx.fill();

    // === EARS (pointy, peeking from under sombrero) ===
    // Left ear
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.moveTo(cx - 5, cy - 18);
    ctx.lineTo(cx - 10, cy - 30);
    ctx.lineTo(cx + 1, cy - 20);
    ctx.closePath();
    ctx.fill();
    // Left ear inner
    ctx.fillStyle = '#444444';
    ctx.beginPath();
    ctx.moveTo(cx - 5, cy - 19);
    ctx.lineTo(cx - 8, cy - 27);
    ctx.lineTo(cx - 1, cy - 20);
    ctx.closePath();
    ctx.fill();

    // Right ear
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.moveTo(cx + 9, cy - 18);
    ctx.lineTo(cx + 16, cy - 30);
    ctx.lineTo(cx + 13, cy - 20);
    ctx.closePath();
    ctx.fill();
    // Right ear inner
    ctx.fillStyle = '#444444';
    ctx.beginPath();
    ctx.moveTo(cx + 10, cy - 19);
    ctx.lineTo(cx + 14, cy - 27);
    ctx.lineTo(cx + 12, cy - 20);
    ctx.closePath();
    ctx.fill();

    // === FACE DETAILS ===
    // Eyes (big, cute, white with black pupils)
    // Left eye
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.beginPath();
    ctx.ellipse(cx - 2, cy - 10, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 1;
    ctx.stroke();
    // Left pupil
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.arc(cx - 1, cy - 10, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Left eye shine
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.beginPath();
    ctx.arc(cx - 2.5, cy - 11.5, 1, 0, Math.PI * 2);
    ctx.fill();

    // Right eye
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.beginPath();
    ctx.ellipse(cx + 10, cy - 10, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 1;
    ctx.stroke();
    // Right pupil
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.arc(cx + 11, cy - 10, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Right eye shine
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.beginPath();
    ctx.arc(cx + 9.5, cy - 11.5, 1, 0, Math.PI * 2);
    ctx.fill();

    // Nose (small triangle)
    ctx.fillStyle = '#666666';
    ctx.beginPath();
    ctx.moveTo(cx + 5, cy - 4);
    ctx.lineTo(cx + 3, cy - 2);
    ctx.lineTo(cx + 7, cy - 2);
    ctx.closePath();
    ctx.fill();

    // Mouth (cute smile)
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + 2, cy - 1);
    ctx.quadraticCurveTo(cx + 5, cy + 2, cx + 5, cy - 1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 5, cy - 1);
    ctx.quadraticCurveTo(cx + 5, cy + 2, cx + 8, cy - 1);
    ctx.stroke();

    // === MUSTACHE (handlebar style) ===
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    // Left side
    ctx.beginPath();
    ctx.moveTo(cx + 3, cy - 1);
    ctx.quadraticCurveTo(cx - 5, cy + 1, cx - 10, cy - 5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 3, cy);
    ctx.quadraticCurveTo(cx - 4, cy + 3, cx - 9, cy - 1);
    ctx.stroke();
    // Right side
    ctx.beginPath();
    ctx.moveTo(cx + 7, cy - 1);
    ctx.quadraticCurveTo(cx + 15, cy + 1, cx + 20, cy - 5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 7, cy);
    ctx.quadraticCurveTo(cx + 14, cy + 3, cx + 19, cy - 1);
    ctx.stroke();

    // === SOMBRERO ===
    // Hat brim (wide ellipse)
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.ellipse(cx + 4, cy - 19, 22, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hat crown (tall dome)
    ctx.beginPath();
    ctx.moveTo(cx - 5, cy - 20);
    ctx.quadraticCurveTo(cx - 5, cy - 38, cx + 4, cy - 40);
    ctx.quadraticCurveTo(cx + 13, cy - 38, cx + 13, cy - 20);
    ctx.closePath();
    ctx.fill();

    // Hat band (decorative stripe)
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.beginPath();
    ctx.ellipse(cx + 4, cy - 19, 20, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.beginPath();
    ctx.ellipse(cx + 4, cy - 19, 20, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hat crown detail (zigzag band)
    ctx.strokeStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const bx = cx - 3 + i * 2;
      const by = cy - 25 + (i % 2 === 0 ? 0 : 2);
      if (i === 0) ctx.moveTo(bx, by);
      else ctx.lineTo(bx, by);
    }
    ctx.stroke();

    // === FRONT PAWS ===
    ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    // Left paw
    ctx.beginPath();
    ctx.ellipse(cx - 6, cy + 18, 5, 3, -0.3, 0, Math.PI * 2);
    ctx.fill();
    // Right paw
    ctx.beginPath();
    ctx.ellipse(cx + 14, cy + 18, 5, 3, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Paw pads (white)
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.beginPath();
    ctx.arc(cx - 7, cy + 18, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 15, cy + 18, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
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
