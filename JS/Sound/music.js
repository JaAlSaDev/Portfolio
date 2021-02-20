
import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;

const MAX_MUSIC_VOLUME = 0.5
const FADE_IN_SPEED = MAX_MUSIC_VOLUME * 0.01

let musicElement = $("#musicNode")[0]
const audioContext = new AudioContext();
const track2 = audioContext.createMediaElementSource(musicElement);
track2.connect(audioContext.destination)

let music = {
    increaseVolumeInterval: undefined,
    decreaseVolumeInterval: undefined,
    increaseVolumeFunc: () => setInterval(() => {
        music.changeVolume(FADE_IN_SPEED)
    }, 25),

    decreaseVolumeFunc: () => setInterval(() => {
        music.changeVolume(-FADE_IN_SPEED)
    }, 25),
    play: function (src) {
        clearInterval(this.decreaseVolumeInterval)

        audioContext.resume().then(() => {
            musicElement.src = src
            musicElement.volume = 0

            musicElement.play();
        })

        this.increaseVolumeInterval = this.increaseVolumeFunc();

    },

    pause: function () {
        clearInterval(this.increaseVolumeInterval)
        this.decreaseVolumeInterval = this.decreaseVolumeFunc();
    },

    changeVolume: function (change) {
        let newVolume = musicElement.volume + change
        if (newVolume <= MAX_MUSIC_VOLUME && newVolume >= 0) {
            musicElement.volume += change
            console.log(musicElement.volume);
        }

        if (newVolume < 0) {
            musicElement.volume = 0
            console.log(musicElement.volume);
            clearInterval(this.decreaseVolumeInterval)
            musicElement.pause();

        } else if (newVolume > MAX_MUSIC_VOLUME) {
            musicElement.volume = MAX_MUSIC_VOLUME
            clearInterval(this.increaseVolumeInterval)
        }

    }

}

export default music;