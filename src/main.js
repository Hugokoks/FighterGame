import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import Menu from "./scenes/Menu";
import CharacterSelect from "./scenes/CharacterSelect";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container", // ID of your HTML container
  backgroundColor: "#ffffff",

  physics: {
    default: "arcade", // Enable Arcade Physics
    arcade: {
      gravity: { y: 0 }, // No gravity for top-down movement
      debug: false, // Enable physics debug information (optional)
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
