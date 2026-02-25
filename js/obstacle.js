// Obstacle (Cactus) Class

const cactusSprite = new Image();
cactusSprite.src = 'assets/cactus.png';

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
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(cactusSprite, this.x, this.y, this.width, this.height);
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
