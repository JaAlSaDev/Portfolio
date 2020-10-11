import jQuery from "./JS/jQuery";
window.$ = window.jQuery = jQuery;

let startPrompt = {
    element: $("#StartPrompt"),

    flickerOnce: function(duration) {
        this.element.fadeIn(duration / 2).fadeOut(duration / 2);
    },

    timer: (duration) => setInterval(() => {
        startPrompt.flickerOnce(duration)
    }, duration),

    speedUp: function(flick, fastFlickerDuration) {
        clearInterval(flick)
        this.timer(fastFlickerDuration);
    },

    control: function(initialFadeInDuration, normalDuration, fastDuration) {

        setTimeout(() => {
            this.flickerOnce(normalDuration);

            let flick = this.timer(normalDuration);

            window.addEventListener("keypress", function(e) {
                e = e || window.event;

                //If any key is pressed
                if (e.key) {
                    startPrompt.speedUp(flick, fastDuration)
                }
            })



        }, initialFadeInDuration);
    }
}

startPrompt.control(2500, 1250, 100);