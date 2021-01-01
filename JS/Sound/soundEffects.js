let sounds= require("../../assets/Sound/Sound_Effects/*.mp3")

import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;
let soundEffectElement = $("#soundEffectsNode")[0]

const MAX_SOUND_EFFECTS_VOLUME= 0.25;

const audioContext1 = new AudioContext();

const track1 = audioContext1.createMediaElementSource(soundEffectElement);

track1.connect(audioContext1.destination)

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

export default soundEffects;