// main.js
window.addEventListener("load", function () {
  new Phaser.Game({
    ...GAME_CONFIG,
    scene: [GameScene]
  });
});
