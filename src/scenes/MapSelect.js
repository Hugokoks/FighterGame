import hoverChange from "../functions/hoverChange";

class MapSelect extends Phaser.Scene {

    constructor() {
        super({ key: "MapSelect" });
        this.selectedMap = null;

        this.mapConfig = [
            { name: "meadow1" },
            { name: "meadow2" },
            { name: "meadow3" },
            { name: "desert1" },
            { name: "desert2" },
        ]
    }
    init(data) {
        this.mode = data.mode;
        this.characters = data.characters;
    }
    preload() {

        for (let map of this.mapConfig) {
            this.load.image(map.name, `../assets/Background/${map.name}.png`);
        }
    }
    create() {
        const { width, height } = this.sys.game.config;
        this.bg = this.add.image(0, 0, "Background").setOrigin(0, 0);
        this.bg.setDisplaySize(width, height);

        this.mapCursor = this.add.text(200, 150, "Map", {
            fontSize: "60px",
            color: "#F5F51D",
            fontFamily: '"Metal Mania", sans-serif'
        }).setOrigin(0.5).setInteractive();


        /////////////displaying map images
        let mapX = width / 8;
        this.mapConfig.forEach((map, i) => {
            const mapImage = this.add.image(mapX, height / 2, map.name)
                .setOrigin(0.5)
                .setDisplaySize(300, 300);

            const border = this.add.graphics();
            border.lineStyle(5, 0xffffff, 1);
            border.strokeRect(
                mapImage.x - mapImage.displayWidth / 2,
                mapImage.y - mapImage.displayHeight / 2,
                mapImage.displayWidth,
                mapImage.displayHeight
            );
            this.mapConfig[i].x = mapX;
            mapX += 350;


        });

        /////////////displaying map names
        for (let i = 0; i < this.mapConfig.length; i++) {
            const mapText = this.add.text(this.mapConfig[i].x, 280, this.mapConfig[i].name, {
                fontSize: "60px",
                color: "#ffffff",
                fontFamily: '"Metal Mania", sans-serif',

            }).setOrigin(0.5)
                .setInteractive();
            hoverChange([mapText]);
            mapText.on("pointerdown", () => {
                this.mapCursor.setPosition(this.mapConfig[i].x, 220);
                this.selectedMap = this.mapConfig[i].name;
            });

        };
        this.add.text(width / 2, 100, "select map", {
            fontSize: "100px",
            color: "#ffffff",
            fontFamily: '"Metal Mania", sans-serif',
        }).setOrigin(0.5);


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
            this.time.delayedCall(100, () => {
                this.scene.start("CharacterSelect", { mode: this.mode });
            });
        });

        this.textNext.on("pointerdown", () => {
            if (this.selectedMap === "") return;

            this.time.delayedCall(100, () => {
                this.scene.start("MainScene", { mode: this.mode, characters: this.characters, map: this.selectedMap });
            });


        })
    }

}




export default MapSelect