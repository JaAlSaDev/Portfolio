import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
import sundayImg from "../Images/onthesunday-background-compress.jpg"
import handCannotErase from "../Images/qg26Ki.jpg"
import astronaut from "../Images/tumblr_ockrhsElIo1tmnl7lo1_500.png";
import sunday from "../Images/Sunday.jpg"
import astronaut1 from "../Images/Astronaut1.jpg"
import tvStatic from "../Images/Static3.gif";
import recordings from "../Images/Recordings.png"
import gameControllerIcon from "../svg/game-controller.svg";
import webDevelopmentIcon from "../svg/programming.svg";
import linkIcon from "../svg/link.svg"
import glowManPreview from "../Images/gavinharrisonbackground.jpg"
import glowMan from "../Images/Lasse_Portraits.jpg"
import Hexagon from "./Hexagon";
import {
    linksScreen
} from "./linksScreen"
import { aboutMeScreen } from "./aboutMeScreen"
import { projectsScreen } from "./projectsScreen"

import {
    startPrompt
} from "../index"

import soundEffects from "./soundEffects"





let jobTitle = {
    elem: $("#JobTitle"),
    list: ['Software Engineer', 'Full Stack Developer', 'Game Developer'],
    index: 0,
    durations: {
        write: 100,
        delete: 50,
        wait: 2000
    },
    write: function() {
        if (!this.list[this.index]) {
            this.index = 0;
        }

        const currentTitle = this.list[this.index];

        currentTitle.split();

        let printedText = '';
        let currentChar = 0;


        let int1 = setInterval(() => {
            if (currentTitle[currentChar]) {
                //Print text if there are characters left
                printedText += currentTitle[currentChar++];
                this.elem.text(printedText)

            } else {
                //Go to the next job title
                this.index++;

                setTimeout(() => {
                    this.delete(printedText);
                }, this.durations.wait);
                clearInterval(int1);
            }
        }, this.durations.write);
    },
    delete: function(str) {
        let int = setInterval(() => {
            if (str.length !== 0) {

                str = str.split('');
                str.pop();
                str = str.join('');

                this.elem.text(str)
            } else {
                setTimeout(() => {
                    this.write();
                }, this.durations.wait);
                clearInterval(int);
            }
        }, this.durations.delete);
    }
}
let previewPanels = {
    img: $("#MainMenu .previewImg"),
    previewStatic: $("#MainMenu .previewStatic"),
    text: $("#MainMenu .TextPreview")[0],

    changeContent: function(imgSrc, text) {
        this.img.attr("src", imgSrc);
        this.text.textContent = text;
    },
    staticFlicker: function(duration) {
        this.previewStatic.fadeTo(duration / 2, 0.1).fadeTo(duration / 2, 0.5);
    },
};

//Inject hexagons to the DOM
{
    //Hexagon attributes
    let patternID = ["topLeftHexPatt", "topRightHexPatt", "midHexPatt", "bottomLeftHexPatt", "bottomRightHexPatt"];
    let location = ["#upperSection", "#upperSection", "#ImgPreviewContainer", "#lowerSection", "#lowerSection"]
    let originalImages = [
        tvStatic,
        tvStatic,
        glowMan,
        tvStatic,
        tvStatic
    ];
    let icons = [
        [],
        [],
        [],
        [

            {
                "x": "0.25",
                "y": "0.25",
                "xlink:href": gameControllerIcon,
                "transform": "scale(0.5)"
            },
            {
                "x": "0.85",
                "y": "0.85",
                "xlink:href": webDevelopmentIcon,
                "transform": "scale(0.45)"
            }
        ],
        [{
            "x": "0.35",
            "y": "0.35",
            "xlink:href": linkIcon,
            "transform": "scale(0.6)"
        }],
    ];


    //Inject the hexagons into the DOM
    for (let i = 0; i < 2; i++) {

        $(location[i]).append((new Hexagon(patternID[i], originalImages[i], icons[i])).getElement())
    }

    $(location[2]).after((new Hexagon(patternID[2], originalImages[2], icons[2], "", "xMinYMax slice")).getElement())

    for (let i = 3; i < location.length; i++) {
        $(location[i]).append((new Hexagon(patternID[i], originalImages[i], icons[i])).getElement())
    }
}



let hexagons = {
    containers: $("svg"),
    patterns: $(".hexPattern"),
    elements: (Object.values($(".hexagon"))),
    originalImages: [
        tvStatic,
        tvStatic,
        glowMan,
        tvStatic,
        tvStatic
    ],
    hoverImages: [
        "https://media.giphy.com/media/Ph0oIVQeuvh0k/giphy.gif",
        "https://media.giphy.com/media/Ph0oIVQeuvh0k/giphy.gif",
        glowMan,
        "https://media.giphy.com/media/Ph0oIVQeuvh0k/giphy.gif",
        "https://media.giphy.com/media/Ph0oIVQeuvh0k/giphy.gif"
    ],
    previewTexts: [
        "???",
        "???",
        "About Me",
        "Projects",
        "Links"
    ],
    previewImgs: [
        "https://media.giphy.com/media/Ph0oIVQeuvh0k/giphy.gif",
        "https://media.giphy.com/media/Ph0oIVQeuvh0k/giphy.gif",
        glowManPreview,
        astronaut1,
        recordings
    ],
    screenIDs: ["", "", aboutMeScreen, projectsScreen, linksScreen],


    addEventListeners: function() {
        this.elements.splice(5);

        this.elements.forEach((hexagon, index) => {
            console.log(hexagon);
            hexagon.addEventListener("mouseover", () => {
                previewPanels.changeContent(this.previewImgs[index], this.previewTexts[index])

                this.changeHexImage(index, this.hoverImages[index]);


                soundEffects.playSelect();
            })

            hexagon.addEventListener("mouseleave", () => {
                previewPanels.changeContent("", "")

                this.changeHexImage(index, this.originalImages[index]);
            })

            hexagon.addEventListener("click", () => {
                if (this.screenIDs[index]) {
                    $("#MainMenu").fadeOut(2000);

                    this.screenIDs[index].control();


                    soundEffects.playDecision();
                } else {
                    soundEffects.playError();

                }


            })
        });
    },

    changeHexImage: function(index, imgSrc) {
        this.patterns[index].firstElementChild.attributes[2].nodeValue = imgSrc;
    }
}


let addedEventListeners = false;

let backArrow = undefined;
export let mainMenu = {
    elem: $("#MainMenu"),
    timer3: () => setInterval(() => {
        previewPanels.staticFlicker(2500);
    }, 2750),
    timer2: () => setTimeout(() => {
        previewPanels.staticFlicker(2500);
        jobTitle.write();
        mainMenu.timer3()
    }, 3000),
    timer1: () => setTimeout(() => {
        mainMenu.elem.fadeIn(2000);

        if (!addedEventListeners) {
            hexagons.addEventListeners();
            backArrow = document.querySelector("#MainMenu object").contentDocument.children[0];


            backArrow.addEventListener("click", () => {

                mainMenu.elem.fadeOut(2000);
                soundEffects.playCancel();
                setTimeout(() => {
                    $("#StartScreen").fadeIn(2000);

                    startPrompt.control();
                }, 3000);


            });

            addedEventListeners = true;
            mainMenu.timer2()
        }

        for (let index = 0; index < hexagons.hoverImages.length; index++) {
            var img = new Image();
            img.src = hexagons.hoverImages[index];
        }


    }, 3000),
    control: function() {
        this.timer1();
    }
};