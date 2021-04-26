import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;
import {
    mainMenu
} from "./mainMenu"
import Hexagon from "../Hexagon/Hexagon";
import stevenSketch from "../../assets/Images/Steven_Sketch.jpg";
import soundEffects from "../Sound/soundEffects"
import {SETTINGS} from "../../settings"


//Inject the hexagons into the DOM
$("#ProfilePicContainer").append((new Hexagon("profileImage", stevenSketch, [], "100%")).createElement())


let hexagon = {
    containers: $("#AboutMeScreen svg"),
    patterns: $("#linksContainer .hexPattern"),
    element: (Object.values($("#AboutMeScreen .hexagon")))[0],


    addEventListeners: function() {


        this.element.addEventListener("click", () => {
            soundEffects.playError();
        })

        this.element.addEventListener("mouseover", () => {
            soundEffects.playSelect();
        });
    },

}
let backArrow = undefined;

export let aboutMeScreen = {
    elem: $("#AboutMeScreen"),
    control: function() {

        setTimeout(() => {
            this.elem.fadeIn(SETTINGS.screenTransitionTime);

            this.elem.css("display", "flex");

            //Add event listeners to hexagons and backArrow if the backArrow is empty (done once)
            if (!backArrow) {
                setTimeout(() => {

                    backArrow = document.querySelector("#AboutMeScreen object").contentDocument.children[0];

                    backArrow.addEventListener("click", () => {

                        aboutMeScreen.elem.fadeOut(SETTINGS.screenTransitionTime);

                        soundEffects.playCancel();
                        mainMenu.control();

                    });

                    hexagon.addEventListeners();

                }, SETTINGS.screenTransitionTime);
            }
        }, SETTINGS.screenTransitionTime);
    }
};