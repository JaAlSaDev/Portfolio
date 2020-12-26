import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
import {
    mainMenu
} from "./mainMenu"
import GridElement from "./GridElement.js"
import tvStatic from "../Images/Static3.gif";
import soundEffects from "./soundEffects"
import { music } from "./soundEffects"
import projects from "./projectsList"



let previewPanels = {
    img: $("#ProjectsScreen .previewImg"),
    previewStatic: $("#ProjectsScreen .previewStatic"),
    text: $("#ProjectsScreen .TextPreview")[0],

    changeContent: function(imgSrc, text) {
        this.img.attr("src", imgSrc);
        this.text.textContent = text;
    },
    staticFlicker: function(duration) {
        this.previewStatic.fadeTo(duration / 2, 0.1).fadeTo(duration / 2, 0.5);
    },
};


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

const numLayers = 2,
    numOfProjects = 1 + 3 * numLayers * (numLayers + 1),
    hexagonSize = 30,
    MARGIN = 8,
    DURATION = 300;

let HexagonalGrid = {
    CentralHexagon: null,
    depthQueue: [
        [],
        []
    ],

    construct: function(margin, size) {

        let actualMargin = (0.85 + margin / 100) * size
        this.CentralHexagon = new GridElement(projects.shift(), size, actualMargin, (100 - size) / 2, 0, color[0]);


        color.push(color.shift())

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
        this.showLayer([this.CentralHexagon])
    },
    showHexagonByHexagon() {
        this.printGridBreadthFirst([this.CentralHexagon], this.CentralHexagon);
    },

    printGridBreadthFirst(queue, hexagon, i = 0) {
        setTimeout(() => {
            this.showHexagon(hexagon)
        }, DURATION);

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
                this.printGridBreadthFirst(queue, queue[i], i + 1);
            }, DURATION);

        }


    },

    showLayer(currentLayer) {
        let nextLayer = []

        //1: Show the hexagons in the current layer on screen
        setTimeout(() => {
            currentLayer.forEach(hexagon => {
                this.showHexagon(hexagon);
            })
        }, DURATION);


        //2: Prepare the next layer
        currentLayer.forEach(hexagon => {
            hexagon.neighbors.forEach(neighbor => {

                /*Add a neighbor to the next layer if it meets the following requirements:
                    1: If it exists.
                    2: If it hasn't been visited yet.
                    3: If it isn't already included in the next layer
                */
                if (neighbor && !neighbor.visited && !nextLayer.includes(neighbor)) {
                    nextLayer.push(neighbor)
                }
            });
        });


        //3: Go to the next layer
        if (nextLayer.length) {
            setTimeout(() => {

                this.showLayer(nextLayer)
            }, DURATION);

        }

    },

    showHexagon(hexagon) {
        if (!hexagon.visited) {
            let hexgrid = $("#hexagonalGrid");
            hexgrid.append(hexagon.createElement())

            let hexElements = Object.values($("#ProjectsScreen .hexagon"));
            let hexElement = hexElements[hexElements.length - 3];

            hexElement.style.stroke = `${hexagon.color}`;
            // hexElement.style.strokeWidth = "20";
            // console.log(hexagon.createElement());

            // Event listeners
            {
                hexElement.addEventListener("click", () => {



                    if (hexagon.project.available) {
                        soundEffects.playDecision();
                    } else {
                        soundEffects.playError();
                    }
                });

                hexElement.addEventListener("mouseover", () => {


                    soundEffects.playSelect();
                    if (hexagon.project.available) {
                        previewPanels.changeContent(hexagon.project.image, hexagon.project.title)

                        if (hexagon.project.music) {

                            music.play(hexagon.project.music);
                        }
                    } else {
                        previewPanels.changeContent(tvStatic, "???")
                    }




                });

                hexElement.addEventListener("mouseleave", () => {


                    previewPanels.changeContent("", "")


                    if (hexagon.project.available && hexagon.project.music) {

                        music.pause();
                    }
                });
            }


            hexagon.visited = true;
        }
    }
}

HexagonalGrid.construct(MARGIN, hexagonSize)

let backArrow = undefined;

export let projectsScreen = {
    elem: $("#ProjectsScreen"),
    projects: $("#ProjectsScreen .hexagon"),

    staticFlickerTimer: () => setInterval(() => {
        previewPanels.staticFlicker(2500);
    }, 2750),

    control: function() {

        setTimeout(() => {
            this.elem.fadeIn(3000);
            this.staticFlickerTimer();
            if (!backArrow) {
                // Print the hexagonal grid in some way
                setTimeout(() => {
                    HexagonalGrid.showLayerByLayer()
                }, 2000);
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

                    // hexagon.addEventListeners();

                }, 1000);
            }
        }, 2000);


    }
};