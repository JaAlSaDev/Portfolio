require("../Sound/X8Error.mp3")
require("../Sound/X8StageSelect.mp3")
require("../Sound/X8Decision.mp3")
require("../Sound/X8Cancel.mp3")


require("../Sound/Sleep_Together.mp3")
require("../Sound/LCTEPEBIR.mp3")
require("../Sound/Piano_Lessons.mp3")
require("../Sound/Ambulance_Chasing.mp3")
require("../Sound/Radioactive_Toy.mp3")
require("../Sound/The_Sky_Moves_Sideways_Phase_2.mp3")
require("../Sound/Chloroform.mp3")

import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
let soundEffectElement = $("#soundEffectsNode")[0]
let musicElement = $("#musicNode")[0]


const audioContext1 = new AudioContext();
const audioContext2 = new AudioContext();

const track1 = audioContext1.createMediaElementSource(soundEffectElement);
const track2 = audioContext2.createMediaElementSource(musicElement);

track1.connect(audioContext1.destination)
track2.connect(audioContext2.destination)
let soundEffects = {
    play: function(src) {
        soundEffectElement.src = require(src)
        soundEffectElement.volume = 0.3
        soundEffectElement.play();
    },
    playSelect: function() {
        this.play("../Sound/X8StageSelect.mp3")
    },
    playError: function() {
        this.play("../Sound/X8Error.mp3")
    },
    playDecision: function() {
        this.play("../Sound/X8Decision.mp3")
    },
    playCancel: function() {
        this.play("../Sound/X8Cancel.mp3")
    }
}


let increaseVolumeFunc = () => setInterval(() => {
    music.changeVolume(0.01)
}, 25);


let increaseVolumeInterval = undefined;

let decreaseVolumeFunc = () => setInterval(() => {
    music.changeVolume(-0.01)
}, 25);

let decreaseVolumeInterval = undefined;


export let music = {
    play: function(src) {


        musicElement.src = require(src)
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
        if (newVolume <= 0.5 && newVolume >= 0) {
            musicElement.volume += change
            console.log(musicElement.volume);
        }

        if (newVolume < 0) {
            musicElement.volume = 0
            console.log(musicElement.volume);
            musicElement.pause();

        } else if (newVolume > 0.5) {
            musicElement.volume = 0.5
            console.log(musicElement.volume);
        }

    }

}

export default soundEffects;