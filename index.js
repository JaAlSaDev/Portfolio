import jQuery from "./JS/jQuery";
window.$ = window.jQuery = jQuery;

let startScreen = $("#StartScreen");
let mainMenu = $("#MainMenu");

let previewStatic = $("#previewStatic");
let staticFlicker = (duration) => {
    previewStatic.fadeTo(duration / 2, 0.2).fadeTo(duration / 2, 0.7);
}

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
            startScreen.fadeOut(3000);

            setTimeout(() => {
                mainMenu.fadeIn(3000);
                setTimeout(() => {
                    staticFlicker(2500);

                    setInterval(() => {
                        staticFlicker(2500);
                    }, 2750);
                }, 3000);

            }, 3000);
        }, 1250);



    },

    control: function(initialFadeInDuration, normalDuration, fastDuration) {

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

startPrompt.control(2500, 1250, 100);


let jobTitleElm = $("#JobTitle");
let jobtitles = ['Software Engineer', 'Full Stack Developer', 'Game Developer', 'Creative Spirit'];

let jobTitleIndex = 0;

let writeDuration = 100,
    deleteDuration = 50,
    waitDuration = 2000;

function typeJobTitle() {
    if (!jobtitles[jobTitleIndex]) {
        jobTitleIndex = 0;
    }

    const currentTitle = jobtitles[jobTitleIndex];

    currentTitle.split();

    let printedText = '';
    let currentChar = 0;


    let int1 = setInterval(() => {
        if (currentTitle[currentChar]) {
            //Print text if there are characters left
            printedText += currentTitle[currentChar++];
            jobTitleElm.text(printedText)

        } else {
            //Go to the next job title
            jobTitleIndex++;

            setTimeout(() => {
                deleteMessage(printedText);
            }, waitDuration);
            clearInterval(int1);
        }
    }, writeDuration);

}

function deleteMessage(str) {
    let int = setInterval(() => {
        if (str.length !== 0) {

            str = str.split('');
            str.pop();
            str = str.join('');

            jobTitleElm.text(str)
        } else {


            setTimeout(() => {
                typeJobTitle();
            }, waitDuration);
            clearInterval(int);
        }
    }, deleteDuration);
}

typeJobTitle()