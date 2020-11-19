import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
import sundayImg from "../Images/onthesunday-background-compress.jpg"
import handCannotErase from "../Images/qg26Ki.jpg"
import astronaut from "../Images/tumblr_ockrhsElIo1tmnl7lo1_500.png";
import sunday from "../Images/Sunday.jpg"
import astronaut1 from "../Images/Astronaut1.jpg"
import tvStatic from "../Images/Static3.gif";
import recordings from "../Images/Recordings.png"
import gameControllerIcon from "../svg/game-controller.svg";
import webDevelopmentIcon from "../svg/programming.svg";
import linkIcon from "../svg/link.svg"
import Hexagon from "./Hexagon";



let audioElement = $("audio")[0]
audioElement.src = require("../Sound/X8StageSelect.mp3")

const audioContext = new AudioContext();

const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination)



let jobTitle = {
    elem: $("#JobTitle"),
    list: ['Software Engineer', 'Full Stack Developer', 'Game Developer'],
    index: 0,
    durations: {
        write: 100,
        delete: 50,
        wait: 2000
    },
    write: function() {
        if (!this.list[this.index]) {
            this.index = 0;
        }

        const currentTitle = this.list[this.index];

        currentTitle.split();

        let printedText = '';
        let currentChar = 0;


        let int1 = setInterval(() => {
            if (currentTitle[currentChar]) {
                //Print text if there are characters left
                printedText += currentTitle[currentChar++];
                this.elem.text(printedText)

            } else {
                //Go to the next job title
                this.index++;

                setTimeout(() => {
                    this.delete(printedText);
                }, this.durations.wait);
                clearInterval(int1);
            }
        }, this.durations.write);
    },
    delete: function(str) {
        let int = setInterval(() => {
            if (str.length !== 0) {

                str = str.split('');
                str.pop();
                str = str.join('');

                this.elem.text(str)
            } else {
                setTimeout(() => {
                    this.write();
                }, this.durations.wait);
                clearInterval(int);
            }
        }, this.durations.delete);
    }
}
let previewPanels = {
    img: $("#previewImg"),
    previewStatic: $("#previewStatic"),
    text: $("#TextPreview")[0],

    changeContent: function(imgSrc, text) {
        this.img.attr("src", imgSrc);
        this.text.textContent = text;
    },
    staticFlicker: function(duration) {
        this.previewStatic.fadeTo(duration / 2, 0.1).fadeTo(duration / 2, 0.5);
    },
};

//Inject hexagons to the DOM
{
    //Hexagon attributes
    let patternID = ["topLeftHexPatt", "topRightHexPatt", "midHexPatt", "bottomLeftHexPatt", "bottomRightHexPatt"];
    let location = ["#upperSection", "#upperSection", "#ImgPreviewContainer", "#lowerSection", "#lowerSection"]
    let originalImages = [
        tvStatic,
        sunday,
        "http://stevenwilsonhq.com/sw/wp-content/uploads/2014/12/HCE-finalcover.jpg",
        astronaut1,
        tvStatic
    ];
    let icons = [
        [],
        [],
        [],
        [{
                "x": "0.25",
                "y": "0.25",
                "xlink:href": gameControllerIcon,
                "transform": "scale(0.5)"
            },
            {
                "x": "0.85",
                "y": "0.85",
                "xlink:href": webDevelopmentIcon,
                "transform": "scale(0.45)"
            }
        ],
        [{
            "x": "0.35",
            "y": "0.35",
            "xlink:href": linkIcon,
            "transform": "scale(0.6)"
        }]
    ];


    //Inject the hexagons into the DOM
    for (let i = 0; i < 2; i++) {

        $(location[i]).append((new Hexagon(patternID[i], originalImages[i], icons[i])).getElement())
    }

    $(location[2]).after((new Hexagon(patternID[2], originalImages[2], icons[2])).getElement())

    for (let i = 3; i < location.length; i++) {
        $(location[i]).append((new Hexagon(patternID[i], originalImages[i], icons[i])).getElement())
    }
}



let hexagons = {
    containers: $("svg"),
    patterns: $(".hexPattern"),
    elements: (Object.values($(".hexagon"))),
    originalImages: [
        tvStatic,
        sunday,
        "http://stevenwilsonhq.com/sw/wp-content/uploads/2014/12/HCE-finalcover.jpg",
        astronaut1,
        tvStatic
    ],
    hoverImages: [
        "https://media.giphy.com/media/Ph0oIVQeuvh0k/giphy.gif",
        "https://neuralrustsite.files.wordpress.com/2017/05/04-tr-789-e1501090105324.png?w=700",
        "http://stevenwilsonhq.com/sw/wp-content/uploads/2015/02/cryingeyes-hce.jpg",
        "https://cdn.bandmix.com/bandmix_us/media/468/468750/1266987-l.jpg",
        "https://media.giphy.com/media/Ph0oIVQeuvh0k/giphy.gif"
    ],
    previewTexts: [
        "???",
        "On the Sunday of Life",
        "Hand Cannot Erase",
        "Projects",
        "Links"
    ],
    previewImgs: [
        "https://media.giphy.com/media/Ph0oIVQeuvh0k/giphy.gif",
        sundayImg,
        handCannotErase,
        astronaut,
        recordings
    ],

    addEventListeners: function() {
        this.elements.splice(5);

        this.elements.forEach((hexagon, index) => {
            hexagon.addEventListener("mouseover", () => {
                previewPanels.changeContent(this.previewImgs[index], this.previewTexts[index])

                this.changeHexImage(index, this.hoverImages[index]);
                audioElement.play();
            })

            hexagon.addEventListener("mouseleave", () => {
                previewPanels.changeContent("", "")
                    // audioElement.pause()
                this.changeHexImage(index, this.originalImages[index]);
            })
        });
    },

    changeHexImage: function(index, imgSrc) {
        this.patterns[index].firstElementChild.attributes[2].nodeValue = imgSrc;
    }
}


export let mainMenu = {
    elem: $("#MainMenu"),
    control: function() {
        setTimeout(() => {
            this.elem.fadeIn(3000);
            hexagons.addEventListeners();
            setTimeout(() => {
                previewPanels.staticFlicker(2500);
                jobTitle.write();
                setInterval(() => {
                    previewPanels.staticFlicker(2500);
                }, 2750);
            }, 3000);

        }, 3000);


    }
};

for (let index = 0; index < hexagons.hoverImages.length; index++) {
    var img = new Image();
    img.src = hexagons.hoverImages[index];
}