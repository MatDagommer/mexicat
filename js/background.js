// Background Class - Scrolling desert scenery

class Background {
  constructor(width, height, speed) {
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.offset = 0;
    this.groundY = height * 0.75; // Ground starts at 75% down

    // Generate ground elements for decoration
    this.groundElements = this.generateGroundElements();
  }

  generateGroundElements() {
    const elements = [];
    for (let i = 0; i < 30; i++) {
      elements.push({
        x: i * 80 + Math.random() * 40,
        type: Math.random() > 0.6 ? 'rock' : 'plant',
        size: Math.random() * 8 + 4,
        variant: Math.floor(Math.random() * 3)
      });
    }
    return elements;
  }

  update(deltaTime) {
    // Move the background
    this.offset += this.speed * (deltaTime / 16);

    // Reset offset for infinite scrolling
    if (this.offset >= 80) {
      this.offset -= 80;
    }

    // Move elements
    this.groundElements.forEach(element => {
      element.x -= this.speed * (deltaTime / 16);

      // Wrap around when offscreen
      if (element.x < -50) {
        element.x += this.width + 100;
      }
    });
  }

  draw(ctx) {
    // Sky (white background)
    ctx.fillStyle = GAME_CONFIG.COLOR_WHITE;
    ctx.fillRect(0, 0, this.width, this.groundY);

    // Ground (light gray)
    ctx.fillStyle = GAME_CONFIG.COLOR_GRAY;
    ctx.fillRect(0, this.groundY, this.width, this.height - this.groundY);

    // Horizon line
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, this.groundY);
    ctx.lineTo(this.width, this.groundY);
    ctx.stroke();

    // Ground pattern (dashed lines for texture)
    ctx.strokeStyle = GAME_CONFIG.COLOR_LIGHT_GRAY;
    ctx.lineWidth = 1;
    for (let i = 0; i < this.width; i += 40) {
      const x = i - this.offset;
      ctx.beginPath();
      ctx.moveTo(x, this.groundY + 20);
      ctx.lineTo(x + 20, this.groundY + 20);
      ctx.stroke();
    }

    // Draw ground decorations
    this.groundElements.forEach(element => {
      if (element.x > -50 && element.x < this.width + 50) {
        ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;

        if (element.type === 'rock') {
          // Draw rock (circle/ellipse)
          ctx.beginPath();
          ctx.ellipse(
            element.x,
            this.groundY + 25,
            element.size,
            element.size * 0.7,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        } else {
          // Draw small desert plant
          const plantX = element.x;
          const plantY = this.groundY + 15;

          switch (element.variant) {
            case 0:
              // Simple bush
              ctx.beginPath();
              ctx.moveTo(plantX, plantY + 15);
              ctx.lineTo(plantX - element.size / 2, plantY + 5);
              ctx.lineTo(plantX, plantY + 10);
              ctx.lineTo(plantX + element.size / 2, plantY + 5);
              ctx.lineTo(plantX, plantY + 15);
              ctx.fill();
              break;

            case 1:
              // Spiky plant
              ctx.beginPath();
              ctx.moveTo(plantX, plantY);
              ctx.lineTo(plantX - 2, plantY + element.size);
              ctx.lineTo(plantX + 2, plantY + element.size);
              ctx.closePath();
              ctx.fill();

              ctx.beginPath();
              ctx.moveTo(plantX - element.size / 3, plantY + 5);
              ctx.lineTo(plantX - element.size / 2, plantY + element.size / 2);
              ctx.lineTo(plantX - element.size / 3 + 2, plantY + element.size / 2);
              ctx.closePath();
              ctx.fill();
              break;

            case 2:
              // Small grass tuft
              ctx.lineWidth = 2;
              ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
              for (let i = -1; i <= 1; i++) {
                ctx.beginPath();
                ctx.moveTo(plantX + i * 3, plantY + 10);
                ctx.lineTo(plantX + i * 4, plantY);
                ctx.stroke();
              }
              break;
          }
        }
      }
    });

    // Add some distant mountains (simple triangles in background)
    ctx.fillStyle = GAME_CONFIG.COLOR_LIGHT_GRAY;
    const mountainOffset = (this.offset * 0.3) % 200;

    for (let i = -1; i < 5; i++) {
      const mx = i * 200 - mountainOffset;
      ctx.beginPath();
      ctx.moveTo(mx, this.groundY);
      ctx.lineTo(mx + 100, this.groundY - 80);
      ctx.lineTo(mx + 200, this.groundY);
      ctx.closePath();
      ctx.fill();
    }

    // Mountain outlines
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 2;
    for (let i = -1; i < 5; i++) {
      const mx = i * 200 - mountainOffset;
      ctx.beginPath();
      ctx.moveTo(mx, this.groundY);
      ctx.lineTo(mx + 100, this.groundY - 80);
      ctx.lineTo(mx + 200, this.groundY);
      ctx.stroke();
    }
  }

  setSpeed(speed) {
    this.speed = speed;
  }
}
