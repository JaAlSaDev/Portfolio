require("../Sound/X8Error.mp3")
require("../Sound/X8StageSelect.mp3")
require("../Sound/X8Decision.mp3")
require("../Sound/X8Cancel.mp3")
import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
let audioElement = $("audio")[0]


const audioContext = new AudioContext();

const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination)

let soundEffects = {
    play: function(src) {
        audioElement.src = require(src)
        audioElement.play();
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
export default soundEffects;