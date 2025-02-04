import spritePreload from "../functions/spritePreload";
import hoverChange from "../functions/hoverChange";
import createAnimations from "../functions/createAnimations";

class CharacterSelect extends Phaser.Scene {

    constructor() {

        super({ key: "CharacterSelect" });


    }
    preload() {
        this.load.image("Background", "../assets/Background/Summer8.png");
        spritePreload(this, 'MartialHero');
        spritePreload(this, 'Kenji');
    }
    create() {
        const { width, height } = this.sys.game.config;

        this.characters = {
            ch1: {
                name: "Kenji",
                position: { x: width / 2, y: height / 3 }
            },
            ch2: {
                name: "MartialHero",
                position: { x: width / 2 + 400, y: height / 3 }
            }
        }

        // Adding background
        this.bg = this.add.image(0, 0, "Background").setOrigin(0, 0);
        this.bg.setDisplaySize(width, height);

        ///creating animations

        for (let ch of Object.values(this.characters)) {
            createAnimations(this, ch.name)
        }

        // Add Hero Sprites
        const spriteOffset = 200;
        this.ch1Sprite = this.add.sprite(this.characters.ch1.position.x, this.characters.ch1.position.y + spriteOffset, this.characters.ch1.name).setScale(4);
        this.ch2Sprite = this.add.sprite(this.characters.ch2.position.x, this.characters.ch2.position.y + spriteOffset, this.characters.ch2.name).setScale(4);

        ///playing animations
        this.ch1Sprite.play(`${this.characters.ch1.name}_idle`);
        this.ch2Sprite.play(`${this.characters.ch2.name}_idle`);


        /////texts
        this.textCh1 = this.add.text(this.characters.ch1.position.x, this.characters.ch1.position.y, this.characters.ch1.name, {
            fontSize: "60px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif',
        }).setOrigin(0.5).setInteractive(); // Make it interactive

        this.textCh2 = this.add.text(this.characters.ch2.position.x, this.characters.ch2.position.y, this.characters.ch2.name, {
            fontSize: "60px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif',
        }).setOrigin(0.5).setInteractive(); // Make it interactive

        this.textBack = this.add.text(width / 2, 800, "Back", {
            fontSize: "70px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif',
        }).setOrigin(0.5).setInteractive(); // Make it interactive

        hoverChange([this.textBack, this.textCh1, this.textCh2]);

        this.textBack.on("pointerdown", () => {
            this.time.delayedCall(100, () => {
                this.scene.start("Menu");
            })
        });

    }

}


export default CharacterSelect;