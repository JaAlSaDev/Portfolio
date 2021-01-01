import "babel-polyfill"
import jQuery from "./JS/jQuery";
window.$ = window.jQuery = jQuery;
import {
    mainMenu
} from "./JS/mainMenu"

import soundEffects from "./JS/soundEffects"



const normalDuration = 1250,
    initialFadeInDuration = 1000,
    fastDuration = 100;

let startScreen = $("#StartScreen");
let addedEventListeners = false;
export let startPrompt = {
    element: $("#StartPrompt"),
    isFast: false,
    fickerTimer: undefined,


    changeText: function(newText) {
        if (!this.isFast) {
            this.element.text(newText);
        }
    },
    flickerOnce: function(duration) {
        this.element.fadeIn(duration / 2).fadeOut(duration / 2);
    },

    flickerInterval: (duration) => setInterval(() => {
        startPrompt.flickerOnce(duration)
    }, duration),


    changeSpeed: function(newDuration) {
        clearInterval(startPrompt.flickerTimer)
        startPrompt.flickerTimer = startPrompt.flickerInterval(newDuration);
    },

    transitionToMainScreen: function() {

        //Speed up the start prompt
        startPrompt.changeSpeed(fastDuration);
        soundEffects.playDecision();
        setTimeout(() => {
            startScreen.fadeOut(2000);

            mainMenu.control();

            setTimeout(() => {
                startPrompt.changeSpeed(normalDuration);
            }, 2000);
        }, 1250);


    },

    control: function() {


        setTimeout(() => {
            startScreen.fadeIn(2000)


            if (!startPrompt.flickerTimer) {
                startPrompt.flickerTimer = startPrompt.flickerInterval(normalDuration);
            }



            if (!addedEventListeners) {

                //Keyboard
                window.addEventListener("keypress", function(e) {
                    e = e || window.event;

                    if (e.key) {
                        startPrompt.changeText("PRESS ENTER");
                    }

                    if (e.key == "Enter") {
                        startPrompt.transitionToMainScreen()
                    }
                })

                //Mouse
                window.onmousemove = function(e) {
                    startPrompt.changeText("CLICK HERE");
                }

                this.element.on("mouseup", function(e) {
                    if (e.button == 0) {
                        startPrompt.transitionToMainScreen()
                    }
                })


                //Gamepad
                window.addEventListener("gamepadconnected", function(e) {
                    var gamepad = e.gamepad;
                    console.log(
                        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
                        gamepad.index,
                        gamepad.id,
                        gamepad.buttons.length,
                        gamepad.axes.length
                    );

                    startPrompt.changeText("PRESS START")

                });

                window.addEventListener("gamepaddisconnected", function(e) {
                    startPrompt.changeText("PRESS ENTER");
                });
                addedEventListeners = true;
            }


        }, initialFadeInDuration);
    }
}

startPrompt.control();