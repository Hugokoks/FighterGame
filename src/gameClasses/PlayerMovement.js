


class PlayerMovement {

    constructor(player) {

        this.player = player;


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

    }



}