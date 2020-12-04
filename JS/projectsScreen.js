import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
import {
    mainMenu
} from "./mainMenu"
import GridElement from "./GridElement.js"
// import Hexagon from "./Hexagon";
// import stevenSketch from "../Images/Steven_Sketch.jpg";
import soundEffects from "./soundEffects"

let gridSize = 0;
let allLeafNodes = new Set();

let queue = []

const numOfProjects = 19
let projects = []

for (let i = 0; i < numOfProjects; i++) {
    projects[i] = i

}

let HexagonalGrid = {
    CentralHexagon: new GridElement(projects.shift(), 35),
    depthQueue: [
        [],
        []
    ],

    createGrid: function() {
        //Insert the central hexagon into the queue
        this.depthQueue[0].unshift(this.CentralHexagon)

        //Iterate through the depth queue
        while (projects.length) {
            let interiorQueue = []

            while (this.depthQueue[0].length && projects.length) {
                if (!this.depthQueue[0][0].isLeaf()) {

                    interiorQueue.unshift(this.depthQueue[0].shift())

                } else {
                    if (projects.length) {
                        this.depthQueue[0][0].addNeighbor(projects.shift());
                        this.depthQueue[0][0].connectContigousNeighbors();
                    }

                    this.depthQueue[0].push(this.depthQueue[0].shift());
                }

            }


            interiorQueue.forEach(interiorHexagon => {

                interiorHexagon.connectContigousNeighbors();

                interiorHexagon.getLeafNeighbors().forEach(leafNeighbor => {

                    if (!this.depthQueue[1].includes(leafNeighbor)) {
                        this.depthQueue[1].push(leafNeighbor)
                    }

                });


            });

            this.depthQueue.forEach(queue => {
                queue.forEach(hexagon => {
                    hexagon.connectContigousNeighbors();
                })
            })


            this.depthQueue.shift();

            this.depthQueue.push([]);

        }
    }
}

HexagonalGrid.createGrid()


console.log("\t    Printing breadth first\n" + ("_").repeat(45));
console.log("  Hexagon  | T  | TR | BR | B  | BL | TL |");
console.log(("_").repeat(45));

function printGridBreadthFirst(hexagon, i = 0) {

    setTimeout(() => {
        $("#hexagonalGrid").append(hexagon.createElement())
    }, 500);


    if (!hexagon.visited) {
        hexagon.printContentOfChildren();
        hexagon.visited = true;
    }

    if (hexagon.isLeaf()) {
        allLeafNodes.add(hexagon.content)
    }


    hexagon.neighbors.forEach(neighbor => {
        if (neighbor && !queue.includes(neighbor)) {
            queue.push(neighbor)
        }
    });

    if (queue.length > i) {
        setTimeout(() => {
            printGridBreadthFirst(queue[i], i + 1);
        }, 500);

    }


}

queue.push(HexagonalGrid.CentralHexagon)




console.log(allLeafNodes.size);
console.log(allLeafNodes);
//Inject the hexagons into the DOM
// $("#hexagonalGrid").append((new Hexagon("profileImage", stevenSketch, [], "100%")).getElement())


let hexagon = {
    containers: $("#ProjectsScreen svg"),
    // patterns: $("#linksContainer .hexPattern"),
    element: (Object.values($("#ProjectsScreen .hexagon")))[0],


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

export let projectsScreen = {
    elem: $("#ProjectsScreen"),
    control: function() {

        setTimeout(() => {
            this.elem.fadeIn(3000);

            setTimeout(() => {
                printGridBreadthFirst(HexagonalGrid.CentralHexagon)
            }, 1200);

            this.elem.css("display", "flex");

            //Add event listeners to hexagons and backArrow if the backArrow is empty (done once)
            if (!backArrow) {
                setTimeout(() => {

                    backArrow = document.querySelector("#ProjectsScreen object").contentDocument.children[0];

                    backArrow.addEventListener("click", () => {

                        projectsScreen.elem.fadeOut(2000);

                        soundEffects.playCancel();
                        mainMenu.control();

                    });

                    hexagon.addEventListeners();

                }, 1000);
            }
        }, 2000);


    }
};