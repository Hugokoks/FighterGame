

class Timer {

    constructor(scene, x, y, initTime) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.initTime = initTime;
        this.color = '#ffffff';

        this.timerText = this.scene.add.text(x, y, this.formatTime(this.initTime), {
            fontSize: '90px',
            fontFamily: '"Metal Mania", sans-serif', // Change font family
            fill: this.color, // Text color
            align: 'center'


        },).setOrigin(0.5, 0.5);

        this.scene.timerEvent = scene.time.addEvent({
            delay: 1000, // 1000ms = 1s
            callback: this.updateTimer,
            callbackScope: this,
            loop: true, // Repeat indefinitely
        });
    }

    updateTimer() {
        if (this.initTime <= 0) return;
        this.initTime -= 1;
        if (this.initTime <= 10) {
            this.timerText.setColor('#ff0000'); // Red when 10 seconds or less
        } else if (this.initTime <= 30) {
            this.timerText.setColor('#ff9900'); // Orange when 30 seconds or less
        } else {
            this.timerText.setColor('#ffffff'); // Default White
        }

        this.timerText.setText(this.formatTime(this.initTime));

    }
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

}

export default Timer;