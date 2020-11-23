import jQuery from "./JS/jQuery";
window.$ = window.jQuery = jQuery;
import {
    mainMenu
} from "./JS/mainMenu"










let startScreen = $("#StartScreen");

let startPrompt = {
    element: $("#StartPrompt"),
    isFast: false,


    changeText: function(newText) {
        if (!this.isFast) {
            this.element.text(newText);
        }
    },
    flickerOnce: function(duration) {
        this.element.fadeIn(duration / 2).fadeOut(duration / 2);
    },

    timer: (duration) => setInterval(() => {
        startPrompt.flickerOnce(duration)
    }, duration),

    speedUp: function(flick, fastFlickerDuration) {
        if (!this.isFast) {
            clearInterval(flick)
            this.timer(fastFlickerDuration);
            this.isFast = true;
        }

    },

    transitionToMainScreen: function(flickerTimer, fastDuration) {

        //Speed up the start prompt
        startPrompt.speedUp(flickerTimer, fastDuration);

        setTimeout(() => {
            startScreen.fadeOut(2000);

            mainMenu.control();
        }, 1250);



    },

    control: function(initialFadeInDuration, normalDuration, fastDuration) {
        // this.flickerOnce(normalDuration);
        setTimeout(() => {
            this.flickerOnce(normalDuration);

            let flickerTimer = this.timer(normalDuration);

            //Keyboard
            window.addEventListener("keypress", function(e) {
                e = e || window.event;

                if (e.key) {
                    startPrompt.changeText("PRESS ENTER");
                }

                if (e.key == "Enter") {
                    startPrompt.transitionToMainScreen(flickerTimer, fastDuration)
                }
            })

            //Mouse
            window.onmousemove = function(e) {
                startPrompt.changeText("CLICK HERE");
            }

            this.element.on("mouseup", function(e) {
                if (e.button == 0) {
                    startPrompt.transitionToMainScreen(flickerTimer, fastDuration)
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

        }, initialFadeInDuration);
    }
}

startPrompt.control(1000, 1250, 100);