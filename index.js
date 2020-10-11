import jQuery from "./JS/jQuery";
window.$ = window.jQuery = jQuery;

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

    control: function(initialFadeInDuration, normalDuration, fastDuration) {

        setTimeout(() => {
            this.flickerOnce(normalDuration);

            let flickerTimer = this.timer(normalDuration);

            //Keyboard
            window.addEventListener("keypress", function(e) {
                e = e || window.event;

                if (e.key) {
                    startPrompt.changeText("PRESS ENTER TO START");
                }

                if (e.key == "Enter") {
                    startPrompt.speedUp(flickerTimer, fastDuration)
                }
            })

            //Mouse
            window.onmousemove = function(e) {
                startPrompt.changeText("CLICK HERE TO START");
            }

            this.element.on("mouseup", function(e) {
                if (e.button == 0) {
                    startPrompt.speedUp(flickerTimer, fastDuration)
                }
            })

        }, initialFadeInDuration);
    }
}

startPrompt.control(2500, 1250, 100);