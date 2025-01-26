import Player from "./Player";
import spritePreload from "./spritePreload";


class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene"); // Set a unique key for this scene
  }

  preload() {
    spritePreload(this, 'MartialHero');

  }

  create() {
    const { width, height } = this.scale;

    /////Player 1 defining
    this.player1 = new Player(this, width / 2, height / 2, "idle", "MartialHero");
    this.cursors1 = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    this.player1.setInput(this.cursors1);


    /////Player 2 defining
    this.player2 = new Player(this, width / 2, height / 2, "idle", "MartialHero");
    this.cursors2 = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    };
    this.player2.setInput(this.cursors2);



    ////ground 
    const groundRect = this.add.rectangle(width / 2, height - 10, width, 100, 0x00ff00);
    this.physics.add.existing(groundRect, true);

    this.physics.add.collider(this.player1, groundRect);
    this.physics.add.collider(this.player2, groundRect);

  }

  update() {

    this.player1.update();
    this.player2.update();
  }
}

export default MainScene;
