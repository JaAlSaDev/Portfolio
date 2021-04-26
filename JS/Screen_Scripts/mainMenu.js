import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;

let jpgs= require("../../assets/Images/*.jpg")
let gifs= require("../assets/Images/*.gif")
let pngs=require("../assets/Images/*.png")
let svgs=require("../../assets/svg/*.svg")
let astronaut1= jpgs["Astronaut1"]

let tvStatic=gifs["Static3"];
let recordings=pngs["Recordings"]
let gameControllerIcon=svgs["game-controller"];
let webDevelopmentIcon= svgs["programming"]
let linkIcon= svgs["link"]
let glowManPreview=jpgs["glowManPreview"]
let glowMan=jpgs["Lasse_Portraits"]
import Hexagon from "../Hexagon/Hexagon";
import {
    linksScreen
} from "./linksScreen"
import { aboutMeScreen } from "./aboutMeScreen"
import { projectsScreen } from "./projectsScreen"

import {
    startPrompt
} from "../../index"

import soundEffects from "../Sound/soundEffects"

import {SETTINGS} from "../../settings"




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

        $(location[i]).append((new Hexagon(patternID[i], originalImages[i], icons[i],
            "", "none", "0 0 300 261.5", "black", "", "", "27,27", "0.385", true)).createElement())
    }

    $(location[2]).after((new Hexagon(patternID[2], originalImages[2], icons[2], "", "xMinYMax slice")).createElement())

    for (let i = 3; i < location.length; i++) {
        $(location[i]).append((new Hexagon(patternID[i], originalImages[i], icons[i])).createElement())
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
                    $("#MainMenu").fadeOut(SETTINGS.screenTransitionTime);

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
        mainMenu.elem.fadeIn(SETTINGS.screenTransitionTime);

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


    }, SETTINGS.screenTransitionTime),
    control: function() {
        this.timer1();
    }
};