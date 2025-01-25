import { LEFT, RIGHT } from "phaser";
import Player from "./Player";
class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene"); // Set a unique key for this scene
  }

  preload() {
    this.load.spritesheet("idle", "../assets/MartialHero/Idle.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
  }

  create() {
    const { width, height } = this.scale;

    /////Player 1 defining
    this.player1 = new Player(this, width / 2, height / 2, "idle");
    this.player1.play("idle");
    this.cursors1 = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    this.player1.setInput(this.cursors1);
  }

  update() {
    this.player1.move();
    this.player1.physics();
  }
}

export default MainScene;
