import spritePreload from "../functions/spritePreload";
import hoverChange from "../functions/hoverChange";
import createAnimations from "../functions/createAnimations";

class CharacterSelect extends Phaser.Scene {
    constructor() {
        super({ key: "CharacterSelect" });

    }

    init(data) {
        this.mode = data.mode;


        this.playerSelecting = 'p1'; // Track which player is selecting a character
        this.selectedPlayers = {
            p1: "",
            p2: "",
        };


    }
    preload() {
        spritePreload(this, "MartialHero");
        spritePreload(this, "Kenji");
        spritePreload(this, "Cole");

    }

    create() {
        const { width, height } = this.sys.game.config;

        this.characters = {
            ch1: { name: "Kenji", position: { x: width / 2, y: height / 2.8 } },
            ch2: { name: "MartialHero", position: { x: width / 2 + 400, y: height / 2.8 } },
            ch3: { name: "Cole", position: { x: width / 2 - 400, y: height / 2.8 } }

        };
        console.log(this.playerSelecting)
        this.bg = this.add.image(0, 0, "Background").setOrigin(0, 0);
        this.bg.setDisplaySize(width, height);

        const spriteOffset = 200;

        for (let i = 0; i < Object.values(this.characters).length; i++) {
            const ch = Object.values(this.characters)[i];
            createAnimations(this, ch.name);

            const sprite = this.add.sprite(ch.position.x, ch.position.y + spriteOffset, ch.name).setScale(4);
            sprite.play(`${ch.name}_idle`);

            const chText = this.add.text(ch.position.x, ch.position.y, ch.name, {
                fontSize: "60px",
                color: "#ffffff",
                fontFamily: '"Metal Mania", sans-serif'
            }).setOrigin(0.5).setInteractive();
            hoverChange([chText]);
            chText.on("pointerdown", () => this.assignCharacter(`ch${i + 1}`)); // Make sure to use ch.name, not "ch1"
        }

        this.add.text(width / 2, 100, "select characters", {
            fontSize: "100px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif',
        }).setOrigin(0.5);


        this.p1 = this.add.text(100, 200, "P1", {
            fontSize: "60px",
            color: "#FF1313",
            fontFamily: '"Metal Mania", sans-serif'
        }).setOrigin(0.5).setInteractive();

        this.p2 = this.add.text(200, 200, "P2", {
            fontSize: "60px",
            color: "#4699FF",
            fontFamily: '"Metal Mania", sans-serif'
        }).setOrigin(0.5).setInteractive();

        this.textNext = this.add.text(width / 2, 800, "Next", {
            fontSize: "70px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif'
        }).setOrigin(0.5).setInteractive();

        this.textBack = this.add.text(width / 2, 900, "Back", {
            fontSize: "70px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif'
        }).setOrigin(0.5).setInteractive();

        hoverChange([this.textBack, this.textNext]);

        this.textBack.on("pointerdown", () => {
            this.playerSelecting = 'p1';
            this.selectedPlayers.p1 = "";
            this.selectedPlayers.p2 = "";

            this.time.delayedCall(100, () => {
                this.scene.start("Menu");
            });
        });

        this.textNext.on("pointerdown", () => {
            if (this.selectedPlayers.p1 === '' || this.selectedPlayers.p2 === '') return;


            this.time.delayedCall(100, () => {
                this.scene.start("MapSelect", { mode: this.mode, characters: this.selectedPlayers });
            });


        })


    }

    assignCharacter(chKey) {

        const characterName = this.characters[chKey].name;
        const characterX = this.characters[chKey].position.x;
        const characterY = this.characters[chKey].position.y;

        if (this.playerSelecting === 'p1') {
            this.p1.setPosition(characterX, characterY - 80);
            this.selectedPlayers.p1 = characterName;
        }
        else {
            this.p2.setPosition(characterX, characterY - 80);
            this.selectedPlayers.p2 = characterName;
        }

        if (this.selectedPlayers.p1 === this.selectedPlayers.p2) {
            this.p1.y = characterY - 160;
        }
        else {
            this.p1.y = characterY - 80;
        }

        this.playerSelecting = this.playerSelecting === "p1" ? "p2" : "p1";




    }
}

export default CharacterSelect;
