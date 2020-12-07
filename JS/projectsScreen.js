import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
import {
    mainMenu
} from "./mainMenu"
import GridElement from "./GridElement.js"
// import Hexagon from "./Hexagon";
// import stevenSketch from "../Images/Steven_Sketch.jpg";
import soundEffects from "./soundEffects"

class Color {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    getRGB() {
        return `rgb(${this.red},${this.green},${this.blue})`
    }

    getOpposite() {
        return `rgb(${255-this.red},${255-this.green},${255-this.blue})`
    }
}
let gridSize = 0;
let allLeafNodes = new Set();
let color = [new Color(255, 0, 0), new Color(0, 255, 0), new Color(0, 0, 255), new Color(128, 0, 128), new Color(255, 255, 255)]
let queue = []

const numOfProjects = 1 + 6 + 12 + 18 + 24,
    hexagonSize = 12.3,
    margin = 5,
    duration = 25;
let projects = []

for (let i = 0; i < numOfProjects; i++) {
    projects[i] = i

}

let HexagonalGrid = {
    CentralHexagon: null,
    depthQueue: [
        [],
        []
    ],

    construct: function(margin, size) {
        //Insert the central hexagon into the queue
        let actualMargin = (0.85 + margin / 100) * size
        this.CentralHexagon = new GridElement(projects.shift(), size, actualMargin, (100 - size) / 2, 0, color[0]);

        color.push(color.shift())
        this.depthQueue[0].unshift(this.CentralHexagon)

        //Iterate through the depth queue
        while (projects.length) {
            let interiorQueue = []

            while (this.depthQueue[0].length && projects.length) {
                if (!this.depthQueue[0][0].isLeaf()) {

                    interiorQueue.unshift(this.depthQueue[0].shift())

                } else {
                    if (projects.length) {
                        this.depthQueue[0][0].addNeighbor(projects.shift(), color[0]);
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

            color.push(color.shift())
            this.depthQueue.shift();

            this.depthQueue.push([]);

        }
    },

    showLayerByLayer() {

        let depthQueue = [
            [this.CentralHexagon],
            []
        ]

        depthQueue[0].forEach(hexagon => {
            showHexagon(hexagon);
        })
        hexagon.neighbors.forEach(neighbor => {
            if (neighbor && !queue.includes(neighbor)) {
                queue.push(neighbor)
            }
        });

        if (queue.length > i) {
            setTimeout(() => {
                printGridBreadthFirst(queue[i], i + 1);
            }, duration);

        }
    },

    showHexagon(hexagon) {
        $("#hexagonalGrid").append(hexagon.createElement())
        if (!hexagon.visited) {
            hexagon.printContentOfChildren();
            hexagon.visited = true;

            if (hexagon.isLeaf()) {
                allLeafNodes.add(hexagon.content)
            }
        }


    }
}

HexagonalGrid.construct(margin, hexagonSize)


console.log("\t    Printing breadth first\n" + ("_").repeat(45));
console.log("  Hexagon  | T  | TR | BR | B  | BL | TL |");
console.log(("_").repeat(45));

function printGridBreadthFirst(hexagon, i = 0) {

    setTimeout(() => {
        $("#hexagonalGrid").append(hexagon.createElement())
    }, duration);


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
        }, duration);

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
    projects: $("#ProjectsScreen .hexagon"),
    control: function() {

        setTimeout(() => {
            this.elem.fadeIn(3000);
            if (!backArrow) {
                setTimeout(() => {
                    printGridBreadthFirst(HexagonalGrid.CentralHexagon)
                }, 2500);
            }


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