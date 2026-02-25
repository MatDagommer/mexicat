// Game Class - Core game loop and state management

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = 'menu'; // menu, playing, gameover
    this.score = 0;
    this.lastTimestamp = 0;

    // Stage management
    this.stageManager = new StageManager();
    this.stageTimer = 0;
    this.stageDuration = GAME_CONFIG.STAGE_DURATION;

    // Spawn timers
    this.obstacleTimer = 0;
    this.collectibleTimer = 0;

    // Taco celebration text
    this.tacoText = null; // { text, scale, opacity, timer }

    // Music
    this.music = new Audio('assets/mariachi-music.mp3');
    this.music.loop = true;
    this.music.volume = 0.5;
    this.gameOverMusic = new Audio('assets/game-over-music.mp3');
    this.gameOverMusic.volume = 0.5;

    // Entity collections
    this.player = null;
    this.obstacles = [];
    this.collectibles = [];
    this.background = null;

    this.init();
  }

  init() {
    // Initialize entities
    this.player = new Player(
      GAME_CONFIG.PLAYER_START_X,
      GAME_CONFIG.PLAYER_START_Y
    );

    this.background = new Background(
      this.canvas.width,
      this.canvas.height,
      this.stageManager.getCurrentSpeed()
    );

    // Start game loop
    this.gameLoop(0);
  }

  start() {
    if (this.state === 'menu') {
      this.state = 'playing';
      this.score = 0;
      this.stageTimer = 0;
      this.stageManager.reset();
      this.obstacles = [];
      this.collectibles = [];
      this.obstacleTimer = 0;
      this.collectibleTimer = 1000; // Start collectibles after 1 second

      // Reset player
      this.player = new Player(
        GAME_CONFIG.PLAYER_START_X,
        GAME_CONFIG.PLAYER_START_Y
      );

      // Reset background
      this.background = new Background(
        this.canvas.width,
        this.canvas.height,
        this.stageManager.getCurrentSpeed()
      );

      this.music.currentTime = 0;
      this.music.play();
    }
  }

  restart() {
    this.gameOverMusic.pause();
    this.state = 'menu';
    this.start();
  }

  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  update(deltaTime) {
    if (this.state !== 'playing') return;

    // Update stage timer
    this.stageTimer += deltaTime;
    if (this.stageTimer >= this.stageDuration) {
      this.advanceStage();
    }

    // Handle player movement based on key states
    if (keysPressed.up) this.player.moveUp(deltaTime);
    if (keysPressed.down) this.player.moveDown(deltaTime);
    if (keysPressed.left) this.player.moveLeft(deltaTime);
    if (keysPressed.right) this.player.moveRight(deltaTime);

    // Update all entities
    this.player.update(deltaTime);
    this.background.update(deltaTime);

    this.updateObstacles(deltaTime);
    this.updateCollectibles(deltaTime);

    // Check collisions
    this.checkCollisions();

    // Update taco celebration text
    if (this.tacoText) {
      this.tacoText.timer += deltaTime;
      const duration = 900; // ms
      const progress = this.tacoText.timer / duration;
      this.tacoText.scale = 1 + progress * 1.5;
      this.tacoText.opacity = 1 - progress;
      if (progress >= 1) this.tacoText = null;
    }

    // Spawn new entities
    this.spawnEntities(deltaTime);
  }

  updateObstacles(deltaTime) {
    // Update all obstacles
    this.obstacles.forEach(obstacle => obstacle.update(deltaTime));

    // Remove offscreen obstacles
    this.obstacles = this.obstacles.filter(obstacle => !obstacle.offscreen);
  }

  updateCollectibles(deltaTime) {
    // Update all collectibles
    this.collectibles.forEach(collectible => collectible.update(deltaTime));

    // Remove offscreen or collected collectibles
    this.collectibles = this.collectibles.filter(
      collectible => !collectible.offscreen && !collectible.collected
    );
  }

  checkCollisions() {
    const playerBounds = this.player.getBounds();

    // Check obstacle collisions (with padding for forgiving gameplay)
    for (const obstacle of this.obstacles) {
      const obstacleBounds = obstacle.getBounds();
      if (checkCollisionWithPadding(playerBounds, obstacleBounds, 5)) {
        this.gameOver();
        return;
      }
    }

    // Check collectible collisions
    for (const collectible of this.collectibles) {
      if (!collectible.collected) {
        const collectibleBounds = collectible.getBounds();
        if (checkCollision(playerBounds, collectibleBounds)) {
          collectible.collected = true;
          this.score += collectible.points;
          if (collectible.type === 'taco') {
            const expressions = [
              { text: '¡Delicioso!',    audio: 'assets/Delicioso.m4a' },
              { text: '¡Qué rico!',     audio: 'assets/Que rico.m4a' },
              { text: '¡Sabroso!',      audio: 'assets/Sabroso.m4a' },
              { text: '¡Ay, qué bueno!',audio: 'assets/Ay que bueno.m4a' },
              { text: '¡Híjole!',       audio: 'assets/Hijole.m4a' },
              { text: '¡Qué sabor!',    audio: 'assets/Que sabor.m4a' },
            ];
            const picked = expressions[Math.floor(Math.random() * expressions.length)];
            this.tacoText = { text: picked.text, scale: 1, opacity: 1, timer: 0 };
            const sfx = new Audio(picked.audio);
            sfx.volume = 0.4;
            sfx.play();
          }
        }
      }
    }
  }

  spawnEntities(deltaTime) {
    // Spawn obstacles
    this.obstacleTimer += deltaTime;
    if (this.obstacleTimer >= this.stageManager.obstacleSpawnRate) {
      this.spawnObstacle();
      this.obstacleTimer = 0;
    }

    // Spawn collectibles
    this.collectibleTimer += deltaTime;
    if (this.collectibleTimer >= this.stageManager.collectibleSpawnRate) {
      this.spawnCollectible();
      this.collectibleTimer = 0;
    }
  }

  spawnObstacle() {
    const speed = this.stageManager.getCurrentSpeed();
    // Random Y position anywhere on screen (with margin for obstacle height)
    const y = Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - 80) + 10;
    const obstacle = new Obstacle(GAME_CONFIG.SPAWN_X, y, speed);
    this.obstacles.push(obstacle);
  }

  spawnCollectible() {
    const speed = this.stageManager.getCurrentSpeed();
    const type = GAME_CONFIG.COLLECTIBLE_TYPES[
      Math.floor(Math.random() * GAME_CONFIG.COLLECTIBLE_TYPES.length)
    ];
    // Random Y position anywhere on screen
    const y = Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - 40) + 5;
    const collectible = new Collectible(GAME_CONFIG.SPAWN_X, y, type, speed);
    this.collectibles.push(collectible);
  }

  advanceStage() {
    this.stageTimer = 0;
    this.stageManager.advanceStage();

    // Update background speed
    this.background.setSpeed(this.stageManager.getCurrentSpeed());
  }

  gameOver() {
    this.state = 'gameover';
    this.music.pause();
    this.gameOverMusic.currentTime = 0;
    this.gameOverMusic.play();
    console.log('Game Over! Final Score:', this.score);
  }

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === 'menu') {
      this.renderMenu();
    } else if (this.state === 'playing') {
      this.renderGame();
    } else if (this.state === 'gameover') {
      this.renderGameOver();
    }
  }

  drawStarWarsTitle(ctx, text, centerX, startY) {
    // Render text to offscreen canvas first
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d');
    offscreen.width = 600;
    offscreen.height = 120;

    offCtx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    offCtx.font = 'bold 90px "Courier New", monospace';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'top';
    offCtx.fillText(text, 300, 5);

    // Draw with perspective: each horizontal slice gets wider toward the bottom
    const textHeight = 95;
    for (let i = 0; i < textHeight; i++) {
      const progress = i / textHeight; // 0 at top, 1 at bottom
      const scale = 0.5 + progress * 0.7; // narrow at top, wide at bottom
      const sliceWidth = 600 * scale;

      ctx.drawImage(
        offscreen,
        0, 5 + i, 600, 1,
        centerX - sliceWidth / 2, startY + i, sliceWidth, 1
      );
    }
  }

  renderMenu() {
    // Draw background even in menu
    this.background.draw(this.ctx);

    // Draw Star Wars-style perspective title
    this.drawStarWarsTitle(this.ctx, 'MEXICAT', this.canvas.width / 2, 60);

    // Draw a simple cat preview
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2 - 20, 220);
    this.ctx.scale(2, 2);
    const previewCat = new Player(0, 0);
    previewCat.draw(this.ctx);
    this.ctx.restore();

    // Instructions
    this.ctx.font = '20px "Courier New", monospace';
    this.ctx.fillText('Avoid the cactuses!', this.canvas.width / 2, 360);
    this.ctx.fillText('Collect tacos, tamales & enchiladas!', this.canvas.width / 2, 390);

    this.ctx.font = 'bold 24px "Courier New", monospace';
    this.ctx.fillText('Press SPACE to Start', this.canvas.width / 2, 450);

    // Controls
    this.ctx.font = '16px "Courier New", monospace';
    this.ctx.fillText('Arrow Keys: Move in all directions', this.canvas.width / 2, 500);
  }

  renderGame() {
    // Draw in layers: background -> obstacles -> collectibles -> player -> UI
    this.background.draw(this.ctx);

    this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
    this.collectibles.forEach(collectible => collectible.draw(this.ctx));

    this.player.draw(this.ctx);

    if (this.tacoText) this.drawTacoText();

    this.drawUI();
  }

  renderGameOver() {
    // Draw the game state (frozen)
    this.background.draw(this.ctx);
    this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
    this.collectibles.forEach(collectible => collectible.draw(this.ctx));
    this.player.draw(this.ctx, true);

    // Draw semi-transparent overlay
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Game Over text
    this.ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;
    this.ctx.font = 'bold 64px "Courier New", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 50);

    // Final score
    this.ctx.font = 'bold 32px "Courier New", monospace';
    this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);

    // Stage reached
    this.ctx.font = '24px "Courier New", monospace';
    this.ctx.fillText(
      `Stage ${this.stageManager.currentStage} Reached`,
      this.canvas.width / 2,
      this.canvas.height / 2 + 60
    );

    // Restart instruction
    this.ctx.font = 'bold 24px "Courier New", monospace';
    this.ctx.fillText('Press SPACE to Restart', this.canvas.width / 2, this.canvas.height / 2 + 120);
  }

  drawTacoText() {
    const ctx = this.ctx;
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    ctx.save();
    ctx.globalAlpha = this.tacoText.opacity;
    ctx.translate(cx, cy);
    ctx.scale(this.tacoText.scale, this.tacoText.scale);
    ctx.font = 'bold 48px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = GAME_CONFIG.COLOR_TACO_YELLOW;
    ctx.strokeStyle = GAME_CONFIG.COLOR_BLACK;
    ctx.lineWidth = 3;
    ctx.strokeText(this.tacoText.text, 0, 0);
    ctx.fillText(this.tacoText.text, 0, 0);
    ctx.restore();
  }

  drawUI() {
    this.ctx.textAlign = 'left';
    this.ctx.fillStyle = GAME_CONFIG.COLOR_BLACK;

    // Score (top right)
    this.ctx.font = 'bold 24px "Courier New", monospace';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 20, 35);

    // Stage (top left)
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Stage ${this.stageManager.currentStage}`, 20, 35);

    // Stage timer (top left, below stage)
    const timeRemaining = Math.ceil((this.stageDuration - this.stageTimer) / 1000);
    this.ctx.font = '18px "Courier New", monospace';
    this.ctx.fillText(`Time: ${timeRemaining}s`, 20, 60);

    // Speed indicator
    const speedPercent = Math.round(this.stageManager.speedMultiplier * 100);
    this.ctx.fillText(`Speed: ${speedPercent}%`, 20, 85);
  }
}
