export default {
    init(times) {
        this.drums = new Audio('/static/drumroll.ogg');
        this.drums.loop = true;
        this.badum = new Audio('/static/badum.ogg');
        this.playing = false;
        this.times = times;
        this.counter = 0;
    },

    suspense() {
        if (this.counter >= this.times) {
            return;
        }

        this.badum.pause();
        this.badum.currentTime = 0;
        this.drums.play();
        this.playing = true;
    },

    tada() {
        if (this.counter >= this.times) {
            return;
        }

        this.drums.pause();
        this.drums.currentTime = 0;
        this.badum.play();
        this.playing = false;
        this.counter++;

        if (this.counter === this.times) {
            this.badum.onended = () => (new Audio('/static/rick.ogg')).play();
        }
    },

    isPlaying() {
        return this.playing;
    }
}