import tvStatic from "../../assets/Images/Static3.gif";
import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;

export default class Hexagon {

    constructor(patternID, backgroundImage, icons = [], width = "", preserveAspectRatio = "none", viewBox = "0 0 300 261.5",
        stroke = "black", x, y, translate = "27,27", scale = "0.385", isAvailable = true, text = null, backgroundFillColor = null, isOption = false, imageX="0.0125",imageY="-0.0525", imageScale="1 1.14285714129") {
        this.patternID = patternID;
        this.pattern = "";

        if (backgroundFillColor) {
            this.pattern += `\t<rect fill="${backgroundFillColor}" x="0" y="0" width="100%" height="100%"/>\n`

        }

        // x="0.225" y="0.125" transform="scale(0.7 0.8)"
        // x="0.0125" y="-0.0525" transform="scale(1 1.14285714129)"

        this.pattern += `<image width="1" height="1" href=${backgroundImage} preserveAspectRatio="${preserveAspectRatio}" x="${imageX}" y="${imageY}" transform="scale(${imageScale})"/>`


        this.width = width ? `width="${width}"` : '';
        this.viewBox = viewBox;
        this.translate = translate
        this.x = x ? `x="${x}%"` : '';
        this.y = y ? `y="${y}%"` : '';
        this.scale = scale;

        this.transform = {
            position:
            {
                x: x,
                y: y
            },
            dimensions: {
                width: width,
                height: "100%"
            },

            translate: translate,
            scale: scale,
            viewBox: viewBox,

        }

        this.text = text;

        this.content = {
            backgroundImage,
            backgroundFillColor,
            icons,
            text
        }

        this.stroke = stroke;
        this.isOption = isOption;
        this.isAvailable = isAvailable;
        this.style = {
            strokeColor:"",
            isAvailable,
            isOption
        }


        
        
        this.textPattern = "";

        this.textElement = "";
        this.hexagonElement = "";

        if (!this.isAvailable) {
            this.pattern += `\n<image class="previewStatic" width="1" height="1" href=${tvStatic} preserveAspectRatio="${preserveAspectRatio}" />`
        } else if (icons.length > 0 || this.text) {
            this.pattern += `<g x="0.5" y="0.5" fill="white" transform="scale(1)">\n`
            this.pattern += `\t<rect fill="${backgroundFillColor}" x="0" y="0" width="100%" height="100%"/>\n`
            for (let i = 0; i < icons.length; i++) {
                this.pattern += `\t<image width="1" height="1" x="${icons[i]["x"]}" y="${icons[i]["y"]}" href="${icons[i]["xlink:href"]}" transform="${icons[i]["transform"]}"/>\n`

            }
            this.pattern += `</g>`

            if (this.text) {
                this.textPattern = `<text  x="50%" y="53%" font-size="30" text-anchor="middle"  fill="white" transform-origin="50% 53%" transform="rotate(0)">${this.text}</text>`
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
        // <rect x="0" y="0" width="100%" height="100%" stroke=" rgb(116, 0, 62)" fill="transparent" stroke-width="5" />
        this.element = $(`<svg id="${this.patternID}SVG" version="1.1" height="100%" ${this.width} ${this.x} ${this.y} xmlns="http://www.w3.org/2000/svg" viewBox="${this.viewBox}">
        

        <defs>
            
            <pattern class="hexPattern" id=${this.patternID} x="0" y="0" width="100%" height="100%" patternContentUnits="objectBoundingBox">
                ${this.pattern}
                 
            </pattern>
        </defs>

        

        
        <polygon fill="url(#${this.patternID})" stroke="${this.stroke}" stroke-width="0" class="hexagon ${(!this.isAvailable) ? "unavailable" : ""} ${(this.isOption) ? "option" : ""}"  width="100%" height="100%"  transform="scale(${this.scale}), translate(${this.translate})"  points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314" />


    
        ${this.textPattern}
        
    </svg>`);


        return this.element[0];

    }


    destroyElement() {
        this.element.remove();
    }

    setTextElement(textElement) {
        this.textElement = textElement;
    }

    clickStyle() {
        this.hexagonElement.classList.remove('optionHover');
        this.hexagonElement.classList.add('optionClick');
        this.textElement.remove();
    }


    hoverStyle() {
        this.hexagonElement.classList.add('optionHover');
        this.textElement.classList.add('glowing');

    }

    resetStyle() {
        this.hexagonElement.classList.remove('optionHover');
        this.textElement.classList.remove('glowing');
    }

    setHexagonElement(hexagonElement) {
        this.hexagonElement = hexagonElement;
    }


}