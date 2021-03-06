import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;


import {
    mainMenu
} from "./mainMenu"
import soundEffects from "../Sound/soundEffects"
import projects from "../projectsList"
import HexagonalGrid from "../Hexagon/HexagonalGrid"
import { SETTINGS } from "../../settings"

let previewPanels = {
    img: $("#ProjectsScreen .previewImg"),
    previewStatic: $("#ProjectsScreen .previewStatic"),
    text: $("#ProjectsScreen .TextPreview")[0],

    changeContent: function (imgSrc, text) {
        this.img.attr("src", imgSrc);
        this.text.textContent = text;
    },
    staticFlicker: function (duration) {
        this.previewStatic.fadeTo(duration / 2, 0.1).fadeTo(duration / 2, 0.5);
    },
};




let backArrow = undefined;

export let projectsScreen = {
    elem: $("#ProjectsScreen"),
    projects: $("#ProjectsScreen .hexagon"),

    staticFlickerTimer: () => setInterval(() => {
        previewPanels.staticFlicker(2500);
    }, 2750),

    control: function () {

        const goToDestinationScreen = (transitionToDestinationScreen, playSoundEffect, gridElement = null) => {
            let ringNumberOfGridElement = 0

            if (HexagonalGrid.doesExist) {
                HexagonalGrid.destroyGrid(gridElement);

                if (gridElement) {
                    ringNumberOfGridElement = gridElement.ringNumber;
                }

                console.log("fadeTime: ", (HexagonalGrid.numOfLayers + ringNumberOfGridElement));

                setTimeout(() => {
                    projectsScreen.elem.fadeOut(SETTINGS.screenTransitionTime);
                    playSoundEffect();
                    transitionToDestinationScreen();
                }, (HexagonalGrid.numOfLayers + ringNumberOfGridElement) * HexagonalGrid.getDuration());
            }


        }


        setTimeout(() => {
            this.elem.fadeIn(SETTINGS.screenTransitionTime);
            this.staticFlickerTimer();
            // Print the hexagonal grid in some way
            setTimeout(() => {
                if (!HexagonalGrid.doesExist) {
                    HexagonalGrid.construct([...projects], goToDestinationScreen)
                    HexagonalGrid.showLayerByLayer();
                }
            }, 1250);



            this.elem.css("display", "flex");

            //Add event listeners to hexagons and backArrow if the backArrow is empty (done once)
            if (!backArrow) {
                setTimeout(() => {

                    backArrow = document.querySelector("#ProjectsScreen object").contentDocument.children[0];

                    backArrow.addEventListener("click", () => {

                        goToDestinationScreen(() => mainMenu.control(), () => soundEffects.playCancel());

                    });

                    // hexagon.addEventListeners();

                }, SETTINGS.screenTransitionTime);
            }
        }, SETTINGS.screenTransitionTime);


    }
};