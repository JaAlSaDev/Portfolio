import jQuery from "./JS/jQuery";
window.$ = window.jQuery = jQuery;

let startPrompt = $("#StartPrompt")

console.log(startPrompt.text());
console.log("fuck you");

function flicker(flickerDuration) {
    startPrompt.fadeIn(flickerDuration / 2).fadeOut(flickerDuration / 2);
}

function controlFlicker(initialDuration, flickerDuration) {
    setTimeout(() => {
        flicker(flickerDuration);

        setInterval(() => {
            flicker(flickerDuration);
        }, flickerDuration);

    }, initialDuration);
}


controlFlicker(2500, 2000)