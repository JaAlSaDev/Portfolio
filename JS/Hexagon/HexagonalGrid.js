import GridElement from "../Hexagon/GridElement.js"
import tvStatic from "../../assets/Images/Static3.gif";
import music from "../Sound/music";
import soundEffects from "../Sound/soundEffects"
import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;
import { projectScreen } from "../Screen_Scripts/projectScreen"

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
        return `rgb(${255 - this.red},${255 - this.green},${255 - this.blue})`
    }
}

let gridSize = 0;
let allLeafNodes = new Set();
let color = [new Color(255, 0, 0), new Color(0, 255, 0), new Color(0, 0, 255), new Color(128, 0, 128), new Color(255, 255, 255)]
let queue = []

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

const numLayers = 2,
    numOfProjects = 1 + 3 * numLayers * (numLayers + 1),
    hexagonSize = 22.5,
    MARGIN = 8,
    DURATION = 300;

let HexagonalGrid = {
    doesExist: false,
    CentralHexagon: null,
    ringQueues: [
        [],
        []
    ],
    numOfLayers: 0,

    goToDestinationScreen: null,

    construct: function (projects, goToDestinationScreen) {
        this.goToDestinationScreen = goToDestinationScreen;

        let actualMargin = (0.85 + MARGIN / 100) * hexagonSize
        this.doesExist = true;
        this.ringQueues = [
            [],
            []
        ]
        this.numOfLayers = 0;

        this.CentralHexagon = new GridElement(projects.shift(), hexagonSize, actualMargin, (100 - hexagonSize) / 2, 0, color[0]);


        color.push(color.shift())

        //Insert the central hexagon into the queue
        this.ringQueues[0].push(this.CentralHexagon)
        console.log(this.ringQueues[0][0]);

        let constructRing = (currentRing, interiorRing) => {
            let currentGridElement;
            while (currentRing.length && projects.length) {
                currentGridElement = currentRing[0];

                if (!currentGridElement.isLeaf()) {

                    let interiorGridElement = currentRing.shift();

                    interiorRing.unshift(interiorGridElement)

                } else {
                    if (projects.length) {
                        currentGridElement.addNeighbor(projects.shift(), color[0]);
                        currentGridElement.connectContigousNeighbors();
                    }

                    // Push the first grid element at the back of the depth queue
                    currentRing.push(currentRing.shift());
                }

            }
        }

        let constructBalancedRing = (currentRing, interiorRing) => {

            let processCurrentGridElement = () => {
                let indexOfCurrentProject = currentRing[0].addNeighbor(projects.shift(), color[0]);
                currentRing[0].connectContigousNeighbors();

                return indexOfCurrentProject;
            }
            let processOppositeGridElement = (indexOfCurrentProject) => {
                if (currentRing.length && projects.length) {
                    let indexOfOppositeNeighbor = Math.floor(currentRing.length / 2)
                    let oppositeNeighbor = currentRing[indexOfOppositeNeighbor]

                    oppositeNeighbor.addNeighbor(projects.shift(), color[0], (indexOfCurrentProject + 3) % 6);
                    oppositeNeighbor.connectContigousNeighbors();

                    if (!oppositeNeighbor.isLeaf()) {
                        interiorRing.unshift(currentRing.splice(indexOfOppositeNeighbor, 1)[0])
                    }
                }
            }

            let queueToInteriorRing = () => {
                if (currentRing.length) {
                    // If the current grid element is an interior hexagon, dequeue it from currentRing, then queue it inside interior ring
                    if (!currentRing[0].isLeaf()) {
                        interiorRing.unshift(currentRing.shift())
                    }
                }
            }

            let cycleCurrentRing = () => {
                if (currentRing.length) {
                    // Push the first grid element at the back of the depth queue (Dequeue, then queue)
                    currentRing.push(currentRing.shift());
                }
            }

            while (currentRing.length && projects.length) {

                let indexOfCurrentProject = processCurrentGridElement();

                processOppositeGridElement(indexOfCurrentProject)

                queueToInteriorRing();

                cycleCurrentRing();
            }
        }

        let processInteriorRing = (interiorRing, nextRing) => {
            interiorRing.forEach(interiorHexagon => {

                interiorHexagon.connectContigousNeighbors();

                interiorHexagon.getLeafNeighbors().forEach(leafNeighbor => {

                    if (!nextRing.includes(leafNeighbor)) {
                        nextRing.push(leafNeighbor)
                    }

                });

            });
        }

        let prepareForNextRing = (ringQueues, interiorRing, color) => {
            // Remove front depth queue
            this.ringQueues.shift();

            this.ringQueues.push([]);

            // Cycle the colors
            color.push(color.shift())


        }

        let interiorRing = []
        //Iterate through the depth queue
        while (projects.length) {
            // A: Construct a ring around the grid
            constructBalancedRing(this.ringQueues[0], interiorRing);

            // B: Process the interior ring
            processInteriorRing(interiorRing, this.ringQueues[1]);

            // C: Connect the contigous neighbors of the hexagons in the ring queues.
            this.ringQueues.forEach(queue => {
                console.log(this.ringQueues);
                console.log(queue);
                queue.forEach(hexagon => {
                    hexagon.connectContigousNeighbors();
                })
            })

            // D: Prepare for the next ring
            prepareForNextRing(this.ringQueues, interiorRing, color);

            // Reset the interior ring
            interiorRing = []

        }
    },

    showLayerByLayer() {
        this.showLayer([this.CentralHexagon])
        console.log("Num of Layers: ", this.numOfLayers);
    },

    destroyGrid() {
        this.destroyLayerByLayer();
        this.doesExist = false;
    },
    destroyLayerByLayer() {
        this.destroyLayer([this.CentralHexagon])
    },

    destroyLayer(currentLayer) {
        let nextLayer = []

        //1: Destroy the hexagons in the current layer on screen
        setTimeout(() => {
            currentLayer.forEach(hexagon => {
                this.destroyHexagon(hexagon);
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
                if (neighbor && neighbor.visited && !nextLayer.includes(neighbor)) {
                    nextLayer.push(neighbor)
                }
            });
        });


        //3: Go to the next layer
        if (nextLayer.length) {
            setTimeout(() => {

                this.destroyLayer(nextLayer)
            }, DURATION);

        }

    },

    destroyHexagon(hexagon) {
        if (hexagon.visited) {
            hexagon.visited = false;
            hexagon.destroyElement();
        }
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
        // console.log("nextLayer length: ", nextLayer.length);


        if (nextLayer.length) {
            setTimeout(() => {
                this.numOfLayers = this.numOfLayers + 1;
                this.showLayer(nextLayer)

            }, DURATION);

        }



    },

    showHexagon(hexagon) {
        if (!hexagon.visited) {
            hexagon.visited = true;
            let hexgrid = $("#hexagonalGridContainer > svg");
            hexgrid.append(hexagon.createElement())

            let hexElements = Object.values($("#ProjectsScreen .hexagon"));
            let hexElement = hexElements[hexElements.length - 3];

            // hexElement.style.stroke = `${hexagon.color}`;
            // hexElement.style.strokeWidth = "20";
            // console.log(hexagon.createElement());

            // Event listeners
            {
                hexElement.addEventListener("click", () => {



                    if (hexagon.project.available) {

                        previewPanels.changeContent("", "")
                        music.pause();
                        this.goToDestinationScreen(()=>projectScreen.control(hexagon.project), () => soundEffects.playDecision())
                        // soundEffects.playDecision();

                        // projectScreen.control();
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


        }
    },

    getDuration() {
        return DURATION;
    }
}

export default HexagonalGrid;