import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;
import {
    projectsScreen
} from "./projectsScreen"
import Hexagon from "../Hexagon/Hexagon";
import stevenSketch from "../../assets/Images/Stupid_Dream.jpg";
import soundEffects from "../Sound/soundEffects"
import { SETTINGS } from "../../settings"


const optionHexagonBackgroundColor = "rgb(3,143,178)";
const foreignObject = document.querySelector("foreignObject");

let overlayMenu = {
    element: $("#overlayMenuContainer > svg")[0],
    logo: {
        hexagon: new Hexagon("projectLogo", stevenSketch, [], "35%", "none", "0 0 262.5 225", "black", 2.5, 0, "40,33", "0.325", false),
        pattern: null,
        element: null,

        create: function () {
            this.element = this.hexagon.createElement();

            console.log("element", this.element);
            overlayMenu.element.append(this.element);
            this.pattern = $("#projectLogo")[0];
            this.addEventListeners();

            overlayMenu.options.create();
        },

        destroy: function () {
            this.element.remove();
            this.pattern = null;

            overlayMenu.options.destroy();
        },

        addEventListeners: function () {
            this.element.addEventListener("click", () => {
                overlayMenu.options.toggle();
                soundEffects.playDecision();
            })

            this.element.addEventListener("mouseover", () => {
                soundEffects.playSelect();
            });
        },

        changeHexImage: function (imgSrc) {
            console.log("logo: ", this);
            this.pattern.firstElementChild.attributes[2].nodeValue = imgSrc;
        }
    },

    options: {
        hexagons: [
            new Hexagon("Description", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 31.46875, -16.0625, "40,33", "0.325", false, "Description", optionHexagonBackgroundColor, true),
            new Hexagon("Gallery", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 31.46875, 16.0625, "40,33", "0.325", false, "Gallery", optionHexagonBackgroundColor, true),
            new Hexagon("Technologies", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 45.35, 0, "40,33", "0.325", false, "Technologies", optionHexagonBackgroundColor, true),
            new Hexagon("Links", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 59.25, -16.0625, "40,33", "0.325", false, "Links", optionHexagonBackgroundColor, true),
            new Hexagon("DomainsAndSkills", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 59.25, 16.0625, "40,33", "0.325", false, "Domains & Skills", optionHexagonBackgroundColor, true),
            new Hexagon("Team", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 73.13125, 0, "40,33", "0.325", false, "Team", optionHexagonBackgroundColor, true)
        ],

        patterns: [],
        elements: [],
        textElements: [],
        isCreated: false,
        contents: [],

        create: function () {



            if (this.elements.length != 0) {
                return;
            }

            this.isCreated = true;
            this.hideContent();
            this.hexagons.forEach((hexagon, index) => {
                setTimeout(() => {
                    let element = hexagon.createElement();

                    overlayMenu.element.append(element);

                    this.elements.push(element);

                    this.patterns.push($(`#${hexagon.patternID}`)[0]);

                    this.contents.push(document.querySelector(`#project${hexagon.patternID}`))


                    hexagon.setTextElement(document.querySelectorAll(`#${hexagon.patternID}SVG text`)[0])

                    hexagon.setHexagonElement(document.querySelectorAll(`#${hexagon.patternID}SVG polygon`)[0])

                    element.addEventListener("click", () => {
                        soundEffects.playDecision();
                        hexagon.clickStyle();
                        overlayMenu.options.destroy();

                        setTimeout(() => {
                            this.showContent(index);
                        }, 500);


                        console.log("ID: ", hexagon.patternID);


                    })

                    hexagon.textElement.addEventListener("mouseover", () => {
                        hexagon.hoverStyle();

                    })

                    element.addEventListener("mouseover", () => {
                        hexagon.hoverStyle();
                    })

                    element.addEventListener("mouseleave", () => {
                        hexagon.resetStyle();
                    })


                }, 50 * (index + 1));




            });




        },

        destroy: function () {

            this.hideContent();

            if (this.hexagons.length != this.elements.length) {
                return;
            }
            this.isCreated = false;

            this.hexagons.reverse().forEach((hexagon, index) => {
                setTimeout(() => {
                    hexagon.destroyElement()
                    this.elements.pop();

                    this.patterns.pop();
                }, 50 * (index + 1));

            });
            this.hexagons.reverse()




        },

        toggle: function () {

            if (!this.isCreated) {
                this.create();
            } else {
                this.destroy();
            }
        },

        showContent: function (index) {

            this.hideContent();

            if (this.contents[index]) {
                console.log();
                foreignObject.style.display = "flex"
                this.contents[index].style.display = "flex"
            }

        },

        hideContent: function () {
            foreignObject.style.display = "none"
            this.contents.forEach(content => {
                if (content) {
                    content.style.display = "none"
                }
            });
        }
    },

    create: function () {
        this.logo.create();
    },

    destroy: function () {
        this.logo.destroy();
    }
}



let backArrow = undefined;

export let projectScreen = {
    elem: $("#ProjectScreen"),
    control: function (project = null) {

        if (project) {

            $("#ProjectScreen > .BackgroundImg")[0].src = project.image

            setTimeout(() => {
                overlayMenu.create();
                overlayMenu.logo.changeHexImage(project.icon)
            }, SETTINGS.screenTransitionTime + 1000);



        }

        setTimeout(() => {
            this.elem.fadeIn(SETTINGS.screenTransitionTime);

            this.elem.css("display", "flex");

            //Add event listeners to hexagons and backArrow if the backArrow is empty (done once)
            if (!backArrow) {
                setTimeout(() => {

                    backArrow = document.querySelector("#ProjectScreen object").contentDocument.children[0];

                    backArrow.addEventListener("click", () => {
                        overlayMenu.destroy();
                        projectScreen.elem.fadeOut(SETTINGS.screenTransitionTime);

                        soundEffects.playCancel();
                        projectsScreen.control();

                    });

                    // hexagon.addEventListeners();

                }, SETTINGS.screenTransitionTime);
            }
        }, SETTINGS.screenTransitionTime);
    }
};