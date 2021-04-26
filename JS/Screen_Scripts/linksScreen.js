import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;
import {
    mainMenu
} from "./mainMenu"
import Hexagon from "../Hexagon/Hexagon";
import {SETTINGS} from "../../settings"

let svgs=require("../../assets/svg/*.svg")

console.log(svgs)
let githubIcon= svgs["github"];
let twitterIcon=svgs["twitter"];
let linkedinIcon=svgs["linkedin"];
let gmailIcon=svgs["gmail"]

import soundEffects from "../Sound/soundEffects"
//Inject hexagons to the DOM
{
    //Hexagon attributes
    let patternID = ["gitHub", "twitter", "linkedIn", "email"];
    let location = ["#linksContainer", "#linksContainer", "#linksContainer", "#linksContainer"]
    let icons = [
        [{
            "x": "0.35",
            "y": "0.35",
            "xlink:href": githubIcon,
            "transform": "scale(0.6)"
        }],
        [{
            "x": "0.35",
            "y": "0.35",
            "xlink:href": linkedinIcon,
            "transform": "scale(0.6)"
        }],
        [{
            "x": "0.35",
            "y": "0.35",
            "xlink:href": twitterIcon,
            "transform": "scale(0.6)"
        }],

        [{
            "x": "0.35",
            "y": "0.35",
            "xlink:href": gmailIcon,
            "transform": "scale(0.6)"
        }]
    ];


    //Inject the hexagons into the DOM
    for (let i = 0; i < location.length; i++) {
        $("#linksContainer").append((new Hexagon(patternID[i], [], icons[i])).getElement())
    }
}



let hexagons = {
    containers: $("#linksContainer svg"),
    patterns: $("#linksContainer .hexPattern"),
    elements: (Object.values($("#linksContainer .hexagon"))),


    links: ["https://github.com/JaAlSaDev", "https://www.linkedin.com/in/jaalsadev/", "https://twitter.com/JaAlSaDev", "JaAlSaDev@gmail.com"],

    addEventListeners: function() {

        this.elements.splice(4);

        this.elements.forEach((hexagon, index) => {
            hexagon.addEventListener("click", () => {

                if (index < 3) {

                    window.open(this.links[index]);
                } else if (index === 3) {
                    window.location.href = `mailto:${this.links[index]}`;
                }

                soundEffects.playDecision();

            })

            hexagon.addEventListener("mouseover", () => {


                soundEffects.playSelect();
            })
        });
    },

}

let backArrow = undefined;

export let linksScreen = {
    elem: $("#LinksScreen"),
    control: function() {

        setTimeout(() => {
            this.elem.fadeIn(SETTINGS.screenTransitionTime);

            this.elem.css("display", "flex");

            //Add event listeners to hexagons and backArrow if the backArrow is empty (done once)
            if (!backArrow) {
                setTimeout(() => {

                    backArrow = document.querySelector("#LinksScreen object").contentDocument.children[0];

                    backArrow.addEventListener("click", () => {

                        linksScreen.elem.fadeOut(SETTINGS.screenTransitionTime);

                        soundEffects.playCancel();
                        mainMenu.control();

                    });


                    hexagons.addEventListeners();


                }, SETTINGS.screenTransitionTime);
            }

        }, SETTINGS.screenTransitionTime);
    }
};