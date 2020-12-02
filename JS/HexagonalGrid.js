let gridSize = 0;
let allLeafNodes = new Set();

let queue = []
class GridElement {

    constructor(content) {
        this.content = "" + content
        this.neighbors = [null, null, null, null, null, null];
        this.visited = false;

    }

    addNeighbor(newNeighborContent) {
        this.neighbors[this.neighbors.indexOf(null)] = new GridElement(newNeighborContent)
    }


    connectContigousNeighbors() {
        for (let i = 0; i < 6; i++) {


            if (this.neighbors[i]) {
                let message = "Connecting contigous neighbors of " + this.neighbors[i].content + "."



                //2: Connect to the first neighbor
                let neighbor1 = this.neighbors[(i + 1) % 6];


                if (neighbor1) {
                    // message += neighbor1.content;


                    this.neighbors[i].neighbors[(i + 2) % 6] = neighbor1;

                }


                //3: Connect to the central Hexagon
                // message += ", " + this.content;

                this.neighbors[i].neighbors[(i + 3) % 6] = this;


                //4: Connect to the second neighbor
                let neighbor2 = this.neighbors[(i + 5) % 6];

                if (neighbor2) {
                    // message += ", " + neighbor2.content;

                    this.neighbors[i].neighbors[(i + 4) % 6] = neighbor2;
                }

                message += "."

                // console.log(message);
                // this.neighbors[i].printContentOfChildren()


            }


        }
    }




    isLeaf() {
        return this.neighbors.includes(null);
    }

    getLeafNeighbors() {
        let leafNeighbors = [];
        let message = "Leaf neighbors of " + this.content + " are "
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].isLeaf()) {
                leafNeighbors.push(this.neighbors[i]);
                message += " " + this.neighbors[i].content;
            }

        }
        return leafNeighbors;
    }

    printContentOfChildren() {


        let message = "  " + this.content + ":\t   |"

        for (let i = 0; i < this.neighbors.length; i++) {
            let word = "" + ((this.neighbors[i]) ? this.neighbors[i].content : this.neighbors[i])
                // console.log(word + " " + word.length);

            // word =

            message += word + "" + (" ").repeat(4 - word.length) + "|";

        }

        console.log(message + "\n" + ("_").repeat(45));

    }

    printGridDepthFirst(depth = 0) {
        this.visited = true;
        gridSize++;
        this.connectContigousNeighbors();
        this.printContentOfChildren();

        if (this.isLeaf()) {
            allLeafNodes.add(this.content)
        }

        depth++
        this.neighbors.forEach(neighbor => {
            if (neighbor && !neighbor.visited) {
                neighbor.printGridDepthFirst(depth);
            }
        });

    }



}


const numOfProjects = 50
let projects = []

for (let i = 0; i < numOfProjects; i++) {
    projects[i] = i

}

let HexagonalGrid = {
    CentralHexagon: new GridElement(projects.shift()),
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

            while (this.depthQueue[0].length) {
                this.depthQueue[0][0].connectContigousNeighbors();

                if (!this.depthQueue[0][0].isLeaf()) {

                    this.depthQueue[0][0].connectContigousNeighbors();

                    interiorQueue.unshift(this.depthQueue[0].shift())

                } else {
                    if (projects.length) {
                        this.depthQueue[0][0].addNeighbor(projects.shift());
                        this.depthQueue[0][0].connectContigousNeighbors();
                    }

                    this.depthQueue[0].push(this.depthQueue[0].shift());
                }


                if (!this.depthQueue[0].length) {
                    interiorQueue.forEach(interiorHexagon => {



                        interiorHexagon.getLeafNeighbors().forEach(leafNeighbor => {

                            if (!this.depthQueue[1].includes(leafNeighbor)) {
                                this.depthQueue[1].push(leafNeighbor)
                            }

                        });

                    });
                    console.log("Interior queue");
                    console.log(interiorQueue);
                    interiorQueue = []
                    break;
                }

                if (!projects.length) {

                    break;
                }

            }

            this.depthQueue.shift();
            this.depthQueue.push([]);

            // if (!projects.length) {

            //     return;
            // }


        }
    }
}

HexagonalGrid.createGrid()


// HexagonalGrid.CentralHexagon.printGridDepthFirst();
// console.log("Grid size: " + gridSize);


// console.log(allLeafNodes);

console.log("\t    Printing breadth first\n" + ("_").repeat(45));
console.log("  Hexagon  | T  | TR | BR | B  | BL | TL |");
console.log(("_").repeat(45));

function printGridBreadthFirst(hexagon, i = 0) {

    hexagon.connectContigousNeighbors();

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

    // queue.shift();
    if (queue.length > i) {
        printGridBreadthFirst(queue[i], i + 1);
    }


}

queue.push(HexagonalGrid.CentralHexagon)




printGridBreadthFirst(HexagonalGrid.CentralHexagon)

console.log(allLeafNodes.size);
console.log(allLeafNodes);