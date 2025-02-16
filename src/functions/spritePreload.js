import spriteConfig from "../spriteConfig";


function spritePreload(scene, spriteName) {
    const width = spriteConfig[spriteName].width;
    const height = spriteConfig[spriteName].height;
    const frames = spriteConfig[spriteName].frames;
    const keys = Object.keys(frames);
    for (const key of keys) {

        //////capitalized because img first letter is large
        const keyCapitalized = key[0].toUpperCase() + key.slice(1);
        scene.load.spritesheet(`${spriteName}_${key}`, `../../assets/${spriteName}/${keyCapitalized}.png`, {
            frameWidth: width,
            frameHeight: height,
        });

    }
}

export default spritePreload;