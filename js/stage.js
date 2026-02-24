// Stage Manager Class - Handles difficulty progression

class StageManager {
  constructor() {
    this.currentStage = 1;
    this.baseSpeed = GAME_CONFIG.BASE_SPEED;
    this.speedMultiplier = 1;
    this.obstacleSpawnRate = GAME_CONFIG.OBSTACLE_BASE_SPAWN_RATE;
    this.collectibleSpawnRate = GAME_CONFIG.COLLECTIBLE_BASE_SPAWN_RATE;
  }

  advanceStage() {
    this.currentStage++;

    // Increase difficulty with each stage
    // Speed increases by 25% per stage (1.0x, 1.25x, 1.5x, 1.75x, etc.)
    this.speedMultiplier = 1 + (this.currentStage - 1) * GAME_CONFIG.SPEED_INCREMENT;

    // Spawn obstacles more frequently (minimum 1 second)
    this.obstacleSpawnRate = Math.max(
      1000,
      GAME_CONFIG.OBSTACLE_BASE_SPAWN_RATE - (this.currentStage - 1) * 150
    );

    // Spawn collectibles more frequently (minimum 1.5 seconds)
    this.collectibleSpawnRate = Math.max(
      1500,
      GAME_CONFIG.COLLECTIBLE_BASE_SPAWN_RATE - (this.currentStage - 1) * 200
    );

    console.log(`Stage ${this.currentStage} - Speed: ${this.getCurrentSpeed().toFixed(2)}x`);
  }

  getCurrentSpeed() {
    return this.baseSpeed * this.speedMultiplier;
  }

  getSpeedMultiplier() {
    return this.speedMultiplier;
  }

  getStageInfo() {
    return {
      stage: this.currentStage,
      speed: this.getCurrentSpeed(),
      speedMultiplier: this.speedMultiplier,
      obstacleRate: this.obstacleSpawnRate,
      collectibleRate: this.collectibleSpawnRate
    };
  }

  reset() {
    this.currentStage = 1;
    this.speedMultiplier = 1;
    this.obstacleSpawnRate = GAME_CONFIG.OBSTACLE_BASE_SPAWN_RATE;
    this.collectibleSpawnRate = GAME_CONFIG.COLLECTIBLE_BASE_SPAWN_RATE;
  }
}
