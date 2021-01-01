let sounds= require("../assets/Sound/Sound_Effects/*.mp3")

import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
let soundEffectElement = $("#soundEffectsNode")[0]
let musicElement = $("#musicNode")[0]

const MAX_MUSIC_VOLUME = 0.5
const MAX_SOUND_EFFECTS_VOLUME= 0.25;
const FADE_IN_SPEED=MAX_MUSIC_VOLUME*0.01
const audioContext1 = new AudioContext();
const audioContext2 = new AudioContext();

const track1 = audioContext1.createMediaElementSource(soundEffectElement);
const track2 = audioContext2.createMediaElementSource(musicElement);

track1.connect(audioContext1.destination)
track2.connect(audioContext2.destination)
let soundEffects = {
    play: function(src) {
        soundEffectElement.src = src
        soundEffectElement.volume = MAX_SOUND_EFFECTS_VOLUME
        soundEffectElement.play();
    },
    playSelect: function() {
        this.play(sounds["X8StageSelect"])

    },
    playError: function() {
        this.play(sounds["X8Error"])
    },
    playDecision: function() {
        this.play(sounds["X8Decision"])
    },
    playCancel: function() {
        this.play(sounds["X8Cancel"])
    }
}


let increaseVolumeFunc = () => setInterval(() => {
    music.changeVolume(FADE_IN_SPEED)
}, 25);


let increaseVolumeInterval = undefined;

let decreaseVolumeFunc = () => setInterval(() => {
    music.changeVolume(-FADE_IN_SPEED)
}, 25);

let decreaseVolumeInterval = undefined;


export let music = {
    play:  function(src)  {
        musicElement.src =  src
        musicElement.volume = 0

        clearInterval(decreaseVolumeInterval)

        musicElement.play();

        increaseVolumeInterval = increaseVolumeFunc();
    },

    pause: function() {
        clearInterval(increaseVolumeInterval)
        decreaseVolumeInterval = decreaseVolumeFunc();
    },

    changeVolume: function(change) {
        let newVolume = musicElement.volume + change
        if (newVolume <= MAX_MUSIC_VOLUME && newVolume >= 0) {
            musicElement.volume += change
            console.log(musicElement.volume);
        }

        if (newVolume < 0) {
            musicElement.volume = 0
            console.log(musicElement.volume);
            clearInterval(decreaseVolumeInterval)
            musicElement.pause();

        } else if (newVolume > MAX_MUSIC_VOLUME) {
            musicElement.volume = MAX_MUSIC_VOLUME
            console.log(musicElement.volume);
            clearInterval(increaseVolumeInterval)
        }

    }

}

export default soundEffects;