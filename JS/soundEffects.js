require("../Sound/X8Error.mp3")
require("../Sound/X8StageSelect.mp3")
require("../Sound/X8Decision.mp3")
require("../Sound/X8Cancel.mp3")

const songNames = ["Sleep_Together.mp3", "LCTEPEBIR", "Piano_Lessons",
    "Ambulance_Chasing", "Radioactive_Toy",
    "The_Sky_Moves_Sideways_Phase_2", "Chloroform"
]

require("../Sound/Sleep_Together.mp3")
require("../Sound/LCTEPEBIR.mp3")
require("../Sound/Piano_Lessons.mp3")
require("../Sound/Ambulance_Chasing.mp3")
require("../Sound/Radioactive_Toy.mp3")
require("../Sound/The_Sky_Moves_Sideways_Phase_2.mp3")
require("../Sound/.3.mp3")

require("../Sound/The_Court_of_The_Crimson_King.mp3")
require("../Sound/Starless.mp3")

require("../Sound/Start_Over.mp3")
require("../Sound/12_THINGS_I_FORGOT.mp3")
require("../Sound/Hand_Cannot_Erase.mp3")
require("../Sound/Frog_Forest.mp3")

require("../Sound/Comfortably_Numb.mp3")
require("../Sound/Money.mp3")
require("../Sound/Split_Mushroom_Stage.mp3")
require("../Sound/The_Front_Hall.mp3")
require("../Sound/Tear_You_Up.mp3")
require("../Sound/White_Mist.mp3")

import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
let soundEffectElement = $("#soundEffectsNode")[0]
let musicElement = $("#musicNode")[0]

const MAX_MUSIC_VOLUME = 0.1
const audioContext1 = new AudioContext();
const audioContext2 = new AudioContext();

const track1 = audioContext1.createMediaElementSource(soundEffectElement);
const track2 = audioContext2.createMediaElementSource(musicElement);

track1.connect(audioContext1.destination)
track2.connect(audioContext2.destination)
let soundEffects = {
    play: function(src) {
        soundEffectElement.src = require(src)
        soundEffectElement.volume = 0.1
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
    music.changeVolume(0.001)
}, 25);


let increaseVolumeInterval = undefined;

let decreaseVolumeFunc = () => setInterval(() => {
    music.changeVolume(-0.001)
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