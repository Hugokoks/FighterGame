import spriteConfig from "../spriteConfig";


function createAnimations(scene, spriteName) {

    const frames = spriteConfig[spriteName].frames;

    const frameRate = spriteConfig[spriteName].frameRate;

    const keys = Object.keys(frames);
    for (const key of keys) {

        scene.anims.create({
            key: `${spriteName}_${key}`,
            frames: scene.anims.generateFrameNumbers(`${spriteName}_${key}`, {
                start: 0,
                end: frames[key],
            }),
            frameRate: frameRate[key],
            repeat: key === 'death' ? 0 : -1,
        });
    }

}

export default createAnimations;