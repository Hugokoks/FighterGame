import spriteConfig from "./spriteConfig";


function spritePreload(scene, spriteName) {
    const width = spriteConfig[spriteName].width;
    const height = spriteConfig[spriteName].height;

    scene.load.spritesheet("idle", `../assets/${spriteName}/Idle.png`, {
        frameWidth: width,
        frameHeight: height,
    });
    scene.load.spritesheet("run", `../assets/${spriteName}/Run.png`, {
        frameWidth: width,
        frameHeight: height,
    });
    scene.load.spritesheet("jump", `../assets/${spriteName}/Jump.png`, {
        frameWidth: width,
        frameHeight: height,
    });
    scene.load.spritesheet("fall", `../assets/${spriteName}/Fall.png`, {
        frameWidth: width,
        frameHeight: height
    })
}

export default spritePreload;