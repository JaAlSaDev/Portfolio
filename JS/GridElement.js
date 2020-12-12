import Hexagon from "./Hexagon"
export default class GridElement {

    constructor(project, size, margin, x = 0, y = 0, color = "black") {
        this.project = project
        this.color = color;
        this.size = size
        this.margin = margin
        this.x = x;
        this.y = y;
        this.neighbors = [null, null, null, null, null, null];
        this.visited = false;

    }

    addNeighbor(project, color) {
        let indexOfNull = this.neighbors.indexOf(null);

        let x = this.x + this.margin * Math.cos(((270 + 60 * indexOfNull) % 360) * Math.PI / 180);
        let y = this.y + this.margin * Math.sin(((270 + 60 * indexOfNull) % 360) * Math.PI / 180)
        this.neighbors[indexOfNull] = new GridElement(project, this.size, this.margin, x, y, color)
    }

    // TODO: Implement this more efficiently
    connectContigousNeighbors() {
        for (let i = 0; i < 6; i++) {


            if (this.neighbors[i]) {
                let message = "Connecting contigous neighbors of " + this.neighbors[i].project + "."



                //2: Connect to the first neighbor
                let neighbor1 = this.neighbors[(i + 1) % 6];


                if (neighbor1) {
                    // message += neighbor1.project;


                    this.neighbors[i].neighbors[(i + 2) % 6] = neighbor1;

                }


                //3: Connect to the central Hexagon
                // message += ", " + this.project;

                this.neighbors[i].neighbors[(i + 3) % 6] = this;


                //4: Connect to the second neighbor
                let neighbor2 = this.neighbors[(i + 5) % 6];

                if (neighbor2) {
                    // message += ", " + neighbor2.project;

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
        let message = "Leaf neighbors of " + this.project + " are "
        for (let i = 0; i < this.neighbors.length; i++) {
            if (this.neighbors[i].isLeaf()) {
                leafNeighbors.push(this.neighbors[i]);
                message += " " + this.neighbors[i].project;
            }

        }
        return leafNeighbors;
    }

    printContentOfChildren() {


        let message = "  " + this.project + ":\t   |"

        for (let i = 0; i < this.neighbors.length; i++) {
            let word = "" + ((this.neighbors[i]) ? this.neighbors[i].project : this.neighbors[i])
                // console.log(word + " " + word.length);

            // word =

            message += word + "" + (" ").repeat(4 - word.length) + "|";

        }

        console.log(message + "\n" + ("_").repeat(45));

    }



    createElement() {
        let project = this.project;
        let hexagon = new Hexagon(project.patternID, project.icon, [], this.size + "%", "none", "0 0 262.5 225", this.color.getRGB(), this.x, this.y, "0,0", "0.357")

        return hexagon.getElement();
        //     return `<svg x="${this.x}%" y="${this.y}%" width="${this.size}%" viewBox="0 0 262.5 225">

        //     <polygon stroke="${this.color.getRGB()}" stroke-width="5" fill="#000"  transform="scale(0.357), translate(0,0)" class="hexagon"     points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314" />

        // </svg>`

        // <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="60">${this.project}</text>
    }

}