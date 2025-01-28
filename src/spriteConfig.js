


const spriteConfig = {

    MartialHero: {
        width: 200,
        height: 200,
        frames: {
            idle: 7,
            run: 7,
            jump: 1,
            fall: 2,
            attack1: 5,
            attack2: 5,
        },
        attackAnimations: 2,
        frameRate: {
            idle: 12,
            run: 12,
            jump: 8,
            fall: 8,
            attack1: 12,
            attack2: 14,
        }
    },
    Kenji: {
        width: 200,
        height: 200,
        frames: {
            idle: 3,
            run: 7,
            jump: 1,
            fall: 2,
            attack1: 3,
            attack2: 3,
        },
        attackAnimations: 2,

        frameRate: {
            idle: 8,
            run: 8,
            jump: 8,
            fall: 8,
            attack1: 9,
            attack2: 9,
        }
    }
}


export default spriteConfig;