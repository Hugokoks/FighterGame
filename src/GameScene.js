import Player from "./Player";
import spritePreload from "./spritePreload";
import HealthBar from "./HealtBar";

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene"); // Set a unique key for this scene
  }

  preload() {
    spritePreload(this, 'MartialHero');
    spritePreload(this, 'Kenji');


  }

  create() {
    const { width, height } = this.scale;

    /////Player 1 defining
    this.player1 = new Player(this, 0, height / 2, "MartialHero_idle", "MartialHero");
    this.cursors1 = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      attackKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
    };

    this.player1.setInput(this.cursors1);

    /////Player 2 defining
    this.player2 = new Player(this, width, height / 2, `Kenji_idle`, "Kenji");
    this.cursors2 = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      attackKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO),

    };

    this.player2.setInput(this.cursors2);

    /////health bars
    const healthBarWidth = 600;
    const healthBarHeight = 80;
    const healthBar_x = 50;
    const healthBar_y = 50;

    this.HealthBar1 = new HealthBar(this, healthBar_x, healthBar_y, healthBarWidth, healthBarHeight, this.player1.health);
    this.HealthBar2 = new HealthBar(this, width - healthBarWidth - healthBar_x, healthBar_y, healthBarWidth, healthBarHeight, this.player2.health);

    ////ground 
    const groundRect = this.add.rectangle(width / 2, height - 10, width, 100, 0x00ff00);
    this.physics.add.existing(groundRect, true);

    this.physics.add.collider(this.player1, groundRect);
    this.physics.add.collider(this.player2, groundRect);

  }

  update() {

    this.player1.update();
    this.player2.update();


    //////HealthBar upadte///////
    this.HealthBar1.update(this.player1.health);
    this.HealthBar2.update(this.player2.health);



    /////fliping sprite of players condition
    if (this.player1.x > this.player2.x) {
      this.player2.flipX = false;
      this.player1.flipX = true;
    }
    else {
      this.player2.flipX = true;
      this.player1.flipX = false;

    }

    ////////////attack hitbox collision
    if (this.player1.attackHitbox && this.physics.overlap(this.player1.attackHitbox, this.player2)) {
      if (this.player1.currentAttackAnimation > 1) this.player2.health -= 30;
      else this.player2.health -= 10;

    }
    if (this.player2.attackHitbox && this.physics.overlap(this.player2.attackHitbox, this.player1)) {
      if (this.player2.currentAttackAnimation > 1) this.player1.health -= 30;
      else this.player1.health -= 10;
    }

  }
}

export default MainScene;
