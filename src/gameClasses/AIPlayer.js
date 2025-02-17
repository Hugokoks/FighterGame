
import Player from "./Player";


export default class AIPlayer extends Player {


    constructor(scene, x, y, texture, spriteName) {
        super(scene, x, y, texture, spriteName);
        this.scene = scene;
        this.target = null; // The player to attack

        this.attackDistance = 380;
        this.state = "idle";

        this.mood = "aggressive";
        this.moodChangeInterval();

    }

    setTarget(target) {
        this.target = target;
    }

    AIBehavior() {
        if (!this.target || this.isDeath) return;
        const { width } = this.scene.scale;

        ////when Ai is in corner then swith mood to aggressive 
        const cornerThreshHold = 100;

        const isInCorner = this.x <= cornerThreshHold || this.x >= width - cornerThreshHold || false;

        const distance = Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y);


        if (this.mood === "aggressive") {


            if (distance >= this.attackDistance) {
                this.state = 'chase';
            }
            else if (this.target.jumped) {
                this.state = "jump"

            }
            else if (distance <= this.attackDistance) {
                this.state = 'attack';
            }
            else {
                this.state = 'idle';
            }
        }

        if (this.mood === "passive") {
            if (distance <= this.attackDistance + 100 && !isInCorner) {
                this.state = "fallback";

            } else {
                this.state = "idle";
            }
        }

        console.log(this.y, this.target.y)

        if (isInCorner && distance <= this.attackDistance) {
            this.state = 'attack';
        }


        switch (this.state) {
            case 'chase':
                this.chase();
                break;
            case 'attack':
                this.attack(this.scene);
                break;
            case 'jump':
                this.handleJump();
                break
            case 'fallback':
                this.fallback();
            case 'idle':
                if (distance >= this.attackDistance + 100) this.setVelocityX(0);

            default:
                break;
        }

    }

    chase() {
        if (this.target.x < this.x) {
            this.setVelocityX(-this.movementSpeed);

        }
        if (this.target.x > this.x) {
            this.setVelocityX(+this.movementSpeed);
        }

    }
    fallback() {
        if (this.target.x < this.x) {

            this.setVelocityX(+this.movementSpeed);  // Move right (fallback)
        }
        if (this.target.x > this.x) {
            this.setVelocityX(-this.movementSpeed);  // Move left (fallback)
        }
    }
    handleJump() {
        if (this.isOnGround()) this.jumped = true;
        this.physics();

    }

    changeMood() {
        /////change chance of getting aggressive mood based on health

        const randomNumber = Phaser.Math.Between(1, 100);
        this.mood = randomNumber <= 50 ? "aggressive" : "passive";
    }

    moodChangeInterval() {
        const delay = Phaser.Math.Between(1000, 3000);
        this.scene.time.delayedCall(delay, () => {
            this.changeMood();
            this.moodChangeInterval();
        });


    }
    update() {
        this.AIBehavior();
        super.update();
    }

}


