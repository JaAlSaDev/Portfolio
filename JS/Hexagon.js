export default class Hexagon {

    constructor(patternID, backgroundImage, icons) {
        this.patternID = patternID;
        this.pattern = `<image width="1" height="1" xlink:href=${backgroundImage} preserveAspectRatio="none" />`

        if (icons.length > 0) {
            this.pattern += `<g x="0.5" y="0.5" fill="white" transform="scale(1)">\n`
            this.pattern += `\t<rect fill="lightblue" x="0" y="0" width="100%" height="100%"/>\n`
            for (let i = 0; i < icons.length; i++) {
                this.pattern += `\t<image width="1" height="1" x="${icons[i]["x"]}" y="${icons[i]["y"]}" xlink:href="${icons[i]["xlink:href"]}" transform="${icons[i]["transform"]}"/>\n`

            }
            this.pattern += `</g>`
        }
    }


    getElement() {
        return `<svg version="1.1" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 261.5">
        
        <defs>
            
            <pattern class="hexPattern" id=${this.patternID} x="0" y="0" width="100%" height="100%" patternContentUnits="objectBoundingBox">
                ${this.pattern}
            </pattern>
        </defs>
        <polygon fill="url(#${this.patternID})" class="hexagon"  width="100%" height="100%" stroke-width="0" transform="scale(0.385), translate(27,27)"  points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314" />
    </svg>`
    }
}