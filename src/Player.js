import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.createAnimations(scene);

    /////physics
    this.defaultGravity = 1500; // Normal gravity strength
    this.jumpGravity = 500;
    this.body.setGravityY(this.defaultGravity); // Adjust gravity strength as needed
    this.velocityY = 0;
    this.accelerationY = 25;
    this.speed = 1000;
    this.jumpStrength = -150;
    this.maxJumpedVelocity = -1800;
    this.jumped = false;

    /////control
    this.cursors = null;

    this.widthHitBox = 0.2;
    this.heightHitBox = 0.3;

    // Scale the sprite
    this.setScale(4); // Example: Doubles the sprite's size

    // Customize the hitbox size
    this.body.setSize(
      this.width * this.widthHitBox,
      this.height * this.heightHitBox
    ); // Adjust size (e.g., 80% width, 90% height)

    // Reposition the hitbox
    this.body.setOffset(
      this.width * this.widthHitBox * 2,
      this.height * this.heightHitBox
    ); // Center the hitbox (or fine-tune as needed)a
  }

  setInput(cursors) {
    this.cursors = cursors;
  }

  isOnGround() {
    return this.body.blocked.down; // Checks if the player is touching the ground
  }

  move() {
    if (!this.cursors) return;

    const { left, right, up } = this.cursors;
    this.setVelocity(0);

    /////horizontal movement
    if (left.isDown) {
      this.setVelocityX(-this.speed);
    } else if (right.isDown) {
      this.setVelocityX(this.speed);
    }

    /////jumping

    if (up.isDown && this.isOnGround()) {
      this.jumped = true;
    }
  }

  physics() {
    //////jumping force
    if (this.jumped) {
      this.velocityY = this.velocityY + this.jumpStrength;
      this.setVelocityY(this.velocityY);
      if (this.velocityY <= this.maxJumpedVelocity) this.jumped = false;
    }

    //////falling physics with aceleration
    if (!this.isOnGround() && !this.jumped) {
      this.velocityY = this.velocityY + this.accelerationY;
      this.setVelocityY(this.velocityY);
    }

    ////reset velocity value when on groud
    if (this.isOnGround()) {
      this.velocityY = 0;
    }
  }

  createAnimations(scene) {
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("idle", {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }
}
