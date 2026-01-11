// config.js
const GAME_CONFIG = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: "#0f1218",
  parent: "game-container",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { x: 0, y: 0 }, // ✅ sin gravedad
      debug: false,
      positionIterations: 16,
      velocityIterations: 12,
      constraintIterations: 4,
      enableSleeping: false
    }
  }
};
