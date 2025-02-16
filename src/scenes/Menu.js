import Phaser from "phaser";
import hoverChange from "../functions/hoverChange";
import OptionBar from "../gameClasses/OptionBar";

class Menu extends Phaser.Scene {

    constructor() {
        super({ key: "Menu" });
    }
    preload() {
        this.load.image("Background", "../assets/Background/meadow3.png");
    }
    create() {
        const { width, height } = this.sys.game.config;
        // Adding background
        this.bg = this.add.image(0, 0, "Background").setOrigin(0, 0);
        this.bg.setDisplaySize(width, height);
        // Title text
        this.add.text(width / 2, 100, "Fighter Game", {
            fontSize: "100px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif',
        }).setOrigin(0.5);

        // Local game text
        this.textLocal2Players = this.add.text(width / 2, 300, "local 2 players", {
            fontSize: "60px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif',
        }).setOrigin(0.5).setInteractive(); // Make it interactive

        this.textLocalAiPlayer = this.add.text(width / 2, 450, "local AI player", {
            fontSize: "60px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif',
        }).setOrigin(0.5).setInteractive(); // Make it interactive

        hoverChange([this.textLocal2Players, this.textLocalAiPlayer]);

        this.textLocal2Players.on("pointerdown", () => {
            this.time.delayedCall(100, () => {
                this.scene.start("CharacterSelect", { mode: '2players' });
            })
        });

    }
}



export default Menu;