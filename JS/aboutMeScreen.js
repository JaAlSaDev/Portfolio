import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
import {
    mainMenu
} from "./mainMenu"
import Hexagon from "./Hexagon";
import stevenSketch from "../Images/Steven_Sketch.jpg";


//Inject hexagons to the DOM
{
    //Hexagon attributes
    let patternID = ["profileImage"];
    let location = ["#ProfilePicContainer"]
    let icons = [
        [

            // {
            //     "x": "0.35",
            //     "y": "0.35",
            //     "xlink:href": githubIcon,
            //     "transform": "scale(0.6)"
            // }

        ],
    ];
    let originalImages = [
        stevenSketch

    ];


    //Inject the hexagons into the DOM
    for (let i = 0; i < location.length; i++) {
        $("#ProfilePicContainer").append((new Hexagon(patternID[i], originalImages[i], [], "100%")).getElement())
    }
}



// let hexagons = {
//     containers: $("#ProfilePicContainer svg"),
//     patterns: $("#ProfilePicContainer .hexPattern"),
//     elements: (Object.values($("#ProfilePicContainer .hexagon"))),


//     links: [],


// }

let backArrow = undefined;

export let aboutMeScreen = {
    elem: $("#AboutMeScreen"),
    control: function() {

        setTimeout(() => {
            this.elem.fadeIn(3000);

            this.elem.css("display", "flex");

            //Add event listeners to hexagons and backArrow if the backArrow is empty (done once)
            if (!backArrow) {
                setTimeout(() => {

                    backArrow = document.querySelector("#AboutMeScreen object").contentDocument.children[0];


                    backArrow.addEventListener("click", () => {

                        aboutMeScreen.elem.fadeOut(2000);

                        // setTimeout(() => {

                        //     // $("#MainMenu").fadeIn(3000);
                        // }, 4000);
                        mainMenu.control();

                    });


                    // hexagons.addEventListeners();


                }, 1000);

            }




        }, 2000);
    }
};