import Player from "../gameClasses/Player";
import AIPlayer from "../gameClasses/AIPlayer";
import spritePreload from "../functions/spritePreload";
import HealthBar from "../gameClasses/HealtBar";
import Timer from "../gameClasses/Timer";
import OptionBar from "../gameClasses/OptionBar";
class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene"); // Set a unique key for this scene
  }
  init(data) {

    this.characters = data.characters;
    this.map = data.map;
    this.mode = data.mode;

  }
  preload() {


    ////preload for testing 
    /**
    spritePreload(this, 'Cole');
    spritePreload(this, 'Kenji');
    this.load.image("desert1", `../assets/Background/desert1.png`);
 */
  }

  create() {

    /*
    //////just for testing
    this.characters = {
      p1: 'Cole',
      p2: 'Kenji',
    }
    this.map = 'desert1';
    this.mode = 'AIPlayer';
 */
    const { width, height } = this.scale;
    this.bg = this.add.image(0, 0, this.map).setOrigin(0, 0);
    this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    ////////Timer
    this.timer = new Timer(this, width / 2, 100, 120);

    /////Player 1 defining
    this.player1 = new Player(this, 0, height / 2, `${this.characters.p1}_idle`, this.characters.p1);
    this.cursors1 = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      attackKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
    };

    this.player1.setInput(this.cursors1);

    /////Player 2 defining

    if (this.mode === "2players") {

      this.player2 = new Player(this, width, height / 2, `${this.characters.p2}_idle`, this.characters.p2);
      this.cursors2 = {
        up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        attackKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO),

      };
      this.player2.setInput(this.cursors2);

    }

    if (this.mode === "AIPlayer") {

      this.player2 = new AIPlayer(this, width, height / 2, `${this.characters.p2}_idle`, this.characters.p2);
      this.player2.setTarget(this.player1);

    }


    /////health bars
    const healthBarWidth = 600;
    const healthBarHeight = 80;
    const healthBar_x = 50;
    const healthBar_y = 50;

    this.HealthBar1 = new HealthBar(this, healthBar_x, healthBar_y, healthBarWidth, healthBarHeight, this.player1.health);
    this.HealthBar2 = new HealthBar(this, width - healthBarWidth - healthBar_x, healthBar_y, healthBarWidth, healthBarHeight, this.player2.health);


    /////option bar 

    this.optionBar = new OptionBar(this, { mode: this.mode, characters: this.characters });

    this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.optionBarElements = [
      this.optionBar.container,
      this.optionBar.textMenu,
      this.optionBar.textCharacter,
      this.optionBar.textMap
    ];

    // Hide all OptionBar elements initially
    this.optionBarElements.forEach(el => el.setVisible(false));

    this.optionBarVisible = false; // Track visibility

    this.escapeKey.on('down', () => {
      this.optionBarVisible = !this.optionBarVisible; // Toggle state
      this.optionBarElements.forEach(el => el.setVisible(this.optionBarVisible));
    });

    ////ground 
    const groundRect = this.add.rectangle(width / 2, height - 10, width, 100);

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



    this.handleFlipping(this.player1, this.player2);
    this.handleFlipping(this.player2, this.player1);


    ////////////attack hitbox collision
    this.handleAttackCollision(this.player1, this.player2)
    this.handleAttackCollision(this.player2, this.player1)


    //////////////game end condition
    if (this.player1.health <= 0 || this.player2.health <= 0 || this.timer.initTime <= 0) this.gameover();

  }
  handleAttackCollision(attacker, target) {

    if (attacker.attackHitbox && this.physics.overlap(attacker.attackHitbox, target) && !target.isImmune) {
      target.isImmune = true;
      target.isHit = true;
      target.resetImmune(); // Reset immunity after a delay

      target.health -= attacker.currentAttackAnimation > 1 ? 30 : 10;
    }
  }

  handleFlipping(player, target) {
    if (player.x > target.x) {

      if (!player.isDeath) player.flipX = true;
      if (!target.isDeath) target.flipX = false;
    }

  }
  gameover() {
    const { width } = this.scale;

    if (this.timerEvent) {
      this.timerEvent.remove(false); // Remove the timer but don't destroy scene objects
    }


    // Determine the winner
    let winner;
    if (this.player1.health > this.player2.health) {
      winner = "Player 1 Wins!";
    } else if (this.player2.health > this.player1.health) {
      winner = "Player 2 Wins!";
    } else {
      winner = "It's a Draw!";
    }

    // Show winner text
    this.add.text(width / 2, 250, winner, {
      fontSize: "80px",
      fontFamily: '"Metal Mania", sans-serif',
      fill: "#ffff00"
    }).setOrigin(0.5);

    this.add.text(width / 2, 320, 'Press space to restart', {

      fontSize: "50px",
      fontFamily: '"Metal Mania", sans-serif',
      fill: "#ffffff"
    }).setOrigin(0.5);


    this.player1.isImmune = true;
    this.player2.isImmune = true;


    this.time.delayedCall(10000, () => {
      this.scene.restart();
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.restart();
    });
  }

}

export default MainScene;
