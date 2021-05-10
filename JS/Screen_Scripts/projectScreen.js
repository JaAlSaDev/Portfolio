import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;
import {
    projectsScreen
} from "./projectsScreen"
import Hexagon from "../Hexagon/Hexagon";
import stevenSketch from "../../assets/Images/Stupid_Dream.jpg";
import soundEffects from "../Sound/soundEffects"
import {SETTINGS} from "../../settings"


//Inject the hexagons into the DOM
$("#logoContainer").append((new Hexagon("projectLogo", stevenSketch, [], "100%")).createElement())


let hexagon = {
    containers: $("#ProjectScreen svg"),
    pattern: $("#ProjectScreen .hexPattern")[0],
    element: (Object.values($("#ProjectScreen .hexagon")))[0],


    addEventListeners: function() {


        this.element.addEventListener("click", () => {
            soundEffects.playError();
        })

        this.element.addEventListener("mouseover", () => {
            soundEffects.playSelect();
        });
    },

    changeHexImage: function(imgSrc) {
        this.pattern.firstElementChild.attributes[2].nodeValue = imgSrc;
    }

}


let overlayMenu = {
    element: $("#overlayMenuContainer > svg")[0]
}

console.log(overlayMenu.element);
let exampleHexagons=[
    new Hexagon("lol0",stevenSketch, [],  "35%", "none", "0 0 262.5 225", "black", 2.5, 0, "40,33", "0.325", false),
    new Hexagon("lol1",stevenSketch, [],  "20%", "none", "0 0 262.5 225", "black", 31.625,-16.65 , "40,33", "0.325", false),
    new Hexagon("lol2",stevenSketch, [],  "20%", "none", "0 0 262.5 225", "black", 31.625,16.65 , "40,33", "0.325", false),
    new Hexagon("lol3",stevenSketch, [],  "20%", "none", "0 0 262.5 225", "black", 46.05,0 , "40,33", "0.325", false),
    new Hexagon("lol4",stevenSketch, [],  "20%", "none", "0 0 262.5 225", "black", 60.49,-16.65 , "40,33", "0.325", false),
    new Hexagon("lol5",stevenSketch, [],  "20%", "none", "0 0 262.5 225", "black", 60.49,16.65 , "40,33", "0.325", false),
    new Hexagon("lol6",stevenSketch, [],  "20%", "none", "0 0 262.5 225", "black",74.915,0 , "40,33", "0.325", false),
];

exampleHexagons.forEach(hexagon => {
    overlayMenu.element.append(hexagon.createElement())
});



let backArrow = undefined;

export let projectScreen = {
    elem: $("#ProjectScreen"),
    control: function(project=null) {

        if (project){
            console.log("project: ", project);

            $("#ProjectScreen > .BackgroundImg")[0].src=project.image
            // hexagon.changeHexImage(project.icon)
            
            // $("#projectTitle").text(project.title);
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