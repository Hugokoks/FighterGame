import Phaser from "phaser";
import MainScene from "./GameScene";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container", // ID of your HTML container
  backgroundColor: "#028af8",

  physics: {
    default: "arcade", // Enable Arcade Physics
    arcade: {
      gravity: { y: 0 }, // No gravity for top-down movement
      debug: true, // Enable physics debug information (optional)
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [MainScene],
};

// Create a new Phaser game instance
new Phaser.Game(config);
