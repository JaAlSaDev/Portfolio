import tvStatic from "../../assets/Images/Static3.gif";
import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;

export default class Hexagon {

    constructor(patternID, backgroundImage, icons, width = "", preserveAspectRatio = "none", viewBox = "0 0 300 261.5",
        stroke = "black", x, y, translate = "27,27", scale = "0.385", unavailable = false, text = null, backgroundFillColor = "lightblue") {
        this.patternID = patternID;
        this.pattern = `<image width="1" height="1" href=${backgroundImage} preserveAspectRatio="${preserveAspectRatio}" />`


        this.width = width ? `width="${width}"` : '';
        this.viewBox = viewBox;
        this.stroke = stroke;
        this.x = x ? `x="${x}%"` : '';
        this.y = y ? `y="${y}%"` : '';
        this.translate = translate
        this.scale = scale;
        this.unavailable = unavailable;
        this.text = text;
        this.textPattern = "";
        if (this.unavailable) {
            this.pattern += `\n<image class="previewStatic" width="1" height="1" href=${tvStatic} preserveAspectRatio="${preserveAspectRatio}" />`
        }

        if (icons.length > 0 || this.text) {
            this.pattern += `<g x="0.5" y="0.5" fill="white" transform="scale(1)">\n`
            this.pattern += `\t<rect fill="${backgroundFillColor}" x="0" y="0" width="100%" height="100%"/>\n`
            for (let i = 0; i < icons.length; i++) {
                this.pattern += `\t<image width="1" height="1" x="${icons[i]["x"]}" y="${icons[i]["y"]}" href="${icons[i]["xlink:href"]}" transform="${icons[i]["transform"]}"/>\n`

            }
            this.pattern += `</g>`

            if (this.text) {
                this.textPattern = `<text x="50%" y="53%" font-size="30" text-anchor="middle"  fill="white">${this.text}</text>`
                // const words = this.text.split(" ")
                // if (words.length==1){
                //     this.textPattern = `<text x="50%" y="53%" font-size="30" text-anchor="middle"  fill="white">${this.text}</text>`
                // } else {
                //     let tSpans="";

                //     words.forEach(word => {
                //         tSpans=`<tspan y="60%">${word}</tspan>`;
                //     });
                //     this.textPattern = `<text x="50%" y="53%" font-size="30" text-anchor="middle"  fill="white">${tSpans}</text>`
                // }

            }

        }
    }


    createElement() {
        this.element = $(`<svg version="1.1" height="100%" ${this.width} ${this.x} ${this.y} xmlns="http://www.w3.org/2000/svg" viewBox="${this.viewBox}">

        <defs>
            
            <pattern class="hexPattern" id=${this.patternID} x="0" y="0" width="100%" height="100%" patternContentUnits="objectBoundingBox">
                ${this.pattern}
                 
            </pattern>
        </defs>
        <polygon fill="url(#${this.patternID})" stroke="${this.stroke}" stroke-width="0" class="hexagon ${(this.unavailable) ? "unavailable" : ""}"  width="100%" height="100%"  transform="scale(${this.scale}), translate(${this.translate})"  points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314" />

        ${this.textPattern}
        
    </svg>`);


        return this.element[0];

    }


    destroyElement() {
        this.element.remove();
    }
}