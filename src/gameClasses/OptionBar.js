import hoverChange from "../functions/hoverChange";

class OptionBar {

    constructor(scene, data) {
        this.scene = scene;
        this.width = 450;
        this.height = 500;
        this.data = data;

        const { width: screenWidth, height: screenHeight } = this.scene.scale;

        this.x = (screenWidth / 2) - (this.width / 2);
        this.y = (screenHeight / 2) - (this.height / 2);

        //////option bar container 
        this.container = this.scene.add.graphics();
        this.container.fillStyle(0x2F2631, 1);
        this.container.fillRect(this.x, this.y, this.width, this.height);

        //////texts
        this.textMenu = this.scene.add.text(this.x + this.width / 2, this.y + 80, "Menu", {
            fontSize: "50px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif'
        }).setOrigin(0.5).setInteractive();


        this.textCharacter = this.scene.add.text(this.x + this.width / 2, this.y + 180, "Change Character", {
            fontSize: "50px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif'
        }).setOrigin(0.5).setInteractive();


        this.textMap = this.scene.add.text(this.x + this.width / 2, this.y + 280, "Change Map", {
            fontSize: "50px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif'
        }).setOrigin(0.5).setInteractive();

        hoverChange([this.textMenu, this.textMap, this.textCharacter]);

        this.textCharacter.on("pointerdown", () => {
            this.scene.time.delayedCall(100, () => {
                this.scene.scene.start("CharacterSelect", { mode: this.data.mode });
            });
        })
        this.textMap.on("pointerdown", () => {
            this.scene.time.delayedCall(100, () => {
                this.scene.scene.start("MapSelect", { mode: this.data.mode, characters: this.data.characters });
            });
        })
        this.textMenu.on("pointerdown", () => {
            this.scene.time.delayedCall(100, () => {
                this.scene.scene.start("Menu");
            });
        })
    }

}


export default OptionBar;