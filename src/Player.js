import Phaser from "phaser";
import spriteConfig from "./spriteConfig";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, spriteName) {
    super(scene, x, y, texture);

    this.spriteName = spriteName;
    this.frames = spriteConfig[spriteName].frames;
    this.frameRate = spriteConfig[spriteName].frameRate;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.createAnimations(scene);

    this.health = 100;

    /////physics
    this.velocityY = 0;
    this.accelerationY = 60;
    this.movementSpeedInAttack = 500;
    this.maxMovementSpeed = 1000;
    this.movementSpeed = 1000;
    this.jumpStrength = -500;
    this.maxJumpedVelocity = -1200;
    this.jumped = false;
    this.body.setGravityY(this.accelerationY); // Adjust gravity strength as needed

    /////control
    this.cursors = null;


    ////player hitbox sizing
    this.setScale(4);

    this.widthHitBox = 0.15;
    this.heightHitBox = 0.3;

    this.body.setSize(
      this.width * this.widthHitBox,
      this.height * this.heightHitBox
    );

    this.body.setOffset(
      this.width * this.widthHitBox * 2.8,
      this.height * this.heightHitBox
    );

    ////attack hitbox properties
    this.attackCooldown = false;
    this.attackDuration = 300; // Duration of hitbox in ms
    this.attackCooldownTime = 500; // Cooldown time in ms
    this.attackDelay = 300;
    this.hitboxWidth = this.width; // Adjust the width of the hitbox
    this.hitboxHeight = this.height; // Adjust the height of the hitbox
    /////changing attack animation variables
    this.currentAttackAnimation = 1;
    this.numOfAttackAnimations = spriteConfig[spriteName].attackAnimations;
    this.lastAttackTime = 0;
    this.attackResetTime = 500;
  }


  setInput(cursors) {
    this.cursors = cursors;
  }

  isOnGround() {
    return this.body.blocked.down; // Checks if the player is touching the ground
  }

  attack(scene) {
    if (this.attackCooldown) return;

    this.lastAttackTime = scene.time.now;

    // Add a delay before the attack starts (to sync with animation)
    scene.time.delayedCall(this.attackDelay, () => { // Adjust this delay to match the timing of your animation


      // Create the hitbox
      this.attackHitbox = scene.add.rectangle(
        this.x,
        this.y,
        this.hitboxWidth,
        this.hitboxHeight,
        0xff0000
      );
      scene.physics.add.existing(this.attackHitbox);
      this.attackHitbox.body.allowGravity = false;

      // Handle hitbox lifetime
      scene.time.delayedCall(this.attackDuration, () => {
        if (this.attackHitbox) {
          this.attackHitbox.destroy();
          this.attackHitbox = null;
          this.currentAttackAnimation++;

          if (this.currentAttackAnimation > this.numOfAttackAnimations) this.currentAttackAnimation = 1;
        }
      });
    });

    // Set cooldown
    this.attackCooldown = true;
    scene.time.delayedCall(this.attackCooldownTime, () => {
      this.attackCooldown = false;
      this.movementSpeed = this.maxMovementSpeed;

    });

  }

  move() {
    if (!this.cursors) return;

    const { left, right, up, attackKey } = this.cursors;
    this.setVelocity(0);

    /////horizontal movement
    if (left.isDown) {
      this.setVelocityX(-this.movementSpeed);
    }
    else if (right.isDown) {

      this.setVelocityX(this.movementSpeed);
    }
    /////jumping
    if (up.isDown && this.isOnGround()) {
      this.jumped = true;
    }

    ///// Attack
    if (attackKey.isDown && !this.attackCooldown) {
      this.attack(this.scene);

      ////decrease speed when you attack :D slow down boy 
      this.movementSpeed = this.movementSpeedInAttack;

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
  resetAttackAnimation() {
    const timeSinceLastAttack = this.scene.time.now - this.lastAttackTime;

    if (timeSinceLastAttack >= this.attackResetTime) {
      this.currentAttackAnimation = 1;

    }

  }

  handleAnimation() {
    const { x: velocityX } = this.body.velocity;
    if (this.attackCooldown) {
      this.play(`${this.spriteName}_attack${this.currentAttackAnimation}`, true);
      return; // Skip the other animations if attacking
    }
    if (!this.isOnGround()) {
      if (this.velocityY < 0) {
        this.play(`${this.spriteName}_jump`, true)
      }
      if (this.velocityY > 0) {
        this.play(`${this.spriteName}_fall`, true);
      }
    }
    else {
      if (velocityX) {
        this.play(`${this.spriteName}_run`, true);
      }
      if (velocityX === 0) {
        this.play(`${this.spriteName}_idle`, true);
      }
    }

  }

  createAnimations(scene) {

    const keys = Object.keys(this.frames);
    for (const key of keys) {

      scene.anims.create({
        key: `${this.spriteName}_${key}`,
        frames: scene.anims.generateFrameNumbers(`${this.spriteName}_${key}`, {
          start: 0,
          end: this.frames[key],
        }),
        frameRate: this.frameRate[key],
        repeat: -1,
      });
    }

  }

  update() {
    if (this.attackHitbox) {
      const offset = 220 // Same offset as in the attack method
      this.attackHitbox.x = this.x + (this.flipX ? -offset : offset);
      this.attackHitbox.y = this.y - 50;
    }
    this.move();
    this.physics();
    this.handleAnimation();
    this.resetAttackAnimation();
  }
}
