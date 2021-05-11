import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;
import {
    projectsScreen
} from "./projectsScreen"
import Hexagon from "../Hexagon/Hexagon";
import stevenSketch from "../../assets/Images/Stupid_Dream.jpg";
import soundEffects from "../Sound/soundEffects"
import { SETTINGS } from "../../settings"




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
            new Hexagon("description", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 31.625, -16.65, "40,33", "0.325", false),
            new Hexagon("gallery", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 31.625, 16.65, "40,33", "0.325", false),
            new Hexagon("technologies", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 46.05, 0, "40,33", "0.325", false),
            new Hexagon("links", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 60.49, -16.65, "40,33", "0.325", false),
            new Hexagon("domainsAndSkills", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 60.49, 16.65, "40,33", "0.325", false),
            new Hexagon("team", stevenSketch, [], "20%", "none", "0 0 262.5 225", "black", 74.915, 0, "40,33", "0.325", false)
        ],

        patterns: [],
        elements: [],

        isCreated: false,

        create: function () {
            if (this.elements.length != 0) {
                return;
            }
            this.isCreated = true;

            this.hexagons.forEach((hexagon, index) => {
                setTimeout(() => {
                    let element = hexagon.createElement();

                    overlayMenu.element.append(element);

                    this.elements.push(element);

                    this.patterns.push($(`#${hexagon.patternID}`)[0]);

                    element.addEventListener("click", () => {
                        soundEffects.playDecision();
                        overlayMenu.options.destroy();
                    })
                }, 50 * (index + 1));



            });


        },

        destroy: function () {

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
    },
    create: function () {
        this.logo.create();
    },
}

overlayMenu.create();

let backArrow = undefined;

export let projectScreen = {
    elem: $("#ProjectScreen"),
    control: function (project = null) {

        if (project) {

            $("#ProjectScreen > .BackgroundImg")[0].src = project.image

            overlayMenu.logo.changeHexImage(project.icon)
        }

        setTimeout(() => {
            this.elem.fadeIn(SETTINGS.screenTransitionTime);

            this.elem.css("display", "flex");

            //Add event listeners to hexagons and backArrow if the backArrow is empty (done once)
            if (!backArrow) {
                setTimeout(() => {

                    backArrow = document.querySelector("#ProjectScreen object").contentDocument.children[0];

                    backArrow.addEventListener("click", () => {

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