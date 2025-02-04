

class HealthBar {


    constructor(scene, x, y, width, height, maxHealth) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //// container under real health bar
        this.container = this.scene.add.graphics();
        this.container.fillStyle(0xF80000, 1);
        this.container.fillRect(this.x, this.y, this.width, this.height);

        /////real health bar 
        this.bar = this.scene.add.graphics();

    }
    update(health) {

        const healthPercent = (health * this.width) / 100;

        this.bar.clear();

        this.bar.fillStyle(0x0CFF08, 1);
        this.bar.fillRect(this.x, this.y, healthPercent >= 0 && healthPercent, this.height);

    }

}


export default HealthBar;