import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
import {
    mainMenu
} from "./mainMenu"
import Hexagon from "./Hexagon";
import githubIcon from "../svg/github.svg"
import twitterIcon from "../svg/twitter.svg"
import linkedinIcon from "../svg/linkedin.svg"
import gmailIcon from "../svg/gmail.svg"
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

            })
        });
    },

}

let backArrow = undefined;

export let linksScreen = {
    elem: $("#LinksScreen"),
    control: function() {

        setTimeout(() => {
            this.elem.fadeIn(3000);

            this.elem.css("display", "flex");

            //Add event listeners to hexagons and backArrow if the backArrow is empty (done once)
            if (!backArrow) {
                setTimeout(() => {

                    backArrow = document.querySelector("#arrowContainer object").contentDocument.children[0];


                    backArrow.addEventListener("click", () => {

                        linksScreen.elem.fadeOut(2000);

                        // setTimeout(() => {

                        //     // $("#MainMenu").fadeIn(3000);
                        // }, 4000);
                        mainMenu.control();

                    });


                    hexagons.addEventListeners();


                }, 1000);

            }




        }, 2000);
    }
};