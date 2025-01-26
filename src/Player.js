import Phaser, { Tilemaps } from "phaser";
import spriteConfig from "./spriteConfig";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, spriteName) {
    super(scene, x, y, texture);

    this.spriteName = spriteName;
    this.frames = spriteConfig[spriteName].frames;


    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.createAnimations(scene);


    /////physics
    this.velocityY = 0;
    this.accelerationY = 60;
    this.speed = 1000;
    this.jumpStrength = -500;
    this.maxJumpedVelocity = -1200;
    this.jumped = false;
    this.body.setGravityY(this.accelerationY); // Adjust gravity strength as needed

    /////control
    this.cursors = null;

    this.setScale(4);

    ////hitbox sizing
    this.widthHitBox = 0.2;
    this.heightHitBox = 0.3;

    this.body.setSize(
      this.width * this.widthHitBox,
      this.height * this.heightHitBox
    );

    this.body.setOffset(
      this.width * this.widthHitBox * 2,
      this.height * this.heightHitBox
    );
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
    }
    else if (right.isDown) {

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


  handleAnimation() {
    const { x: velocityX } = this.body.velocity;

    if (!this.isOnGround()) {
      if (this.velocityY < 0) {
        this.play("jump", true)
      }
      if (this.velocityY > 0) {
        this.play("fall", true);
      }
    }
    else {
      if (velocityX) {
        this.play("run", true);
      }
      if (velocityX === 0) {
        this.play("idle", true);
      }
    }
  }

  createAnimations(scene) {

    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("idle", {
        start: 0,
        end: this.frames.idle,
      }),
      frameRate: 12,
      repeat: -1,
    });
    scene.anims.create({
      key: "run",
      frames: scene.anims.generateFrameNumbers("run", {
        start: 0,
        end: this.frames.run,
      }),
      frameRate: 12,
      repeat: -1,
    });
    scene.anims.create({
      key: "jump",
      frames: scene.anims.generateFrameNumbers("jump", {
        start: 0,
        end: this.frames.jump,
      }),
      frameRate: 8,
      repeat: -1,
    });
    scene.anims.create({
      key: "fall",
      frames: scene.anims.generateFrameNumbers("fall", {
        start: 0,
        end: this.frames.fall,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  update() {

    this.move();
    this.physics();
    this.handleAnimation();

  }


}
