import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;
import sundayImg from "../Images/onthesunday-background-compress.jpg"
import handCannotErase from "../Images/qg26Ki.jpg"
import astronaut from "../Images/tumblr_ockrhsElIo1tmnl7lo1_500.png";
export let mainMenu = {
    elem: $("#MainMenu"),
    previewStatic: $("#previewStatic"),
    hexagon_Containers: $("svg"),
    hexPatterns: $(".hexPattern"),
    hexagons: $(".hexagon"),

    previewPanels: {
        img: $("#previewImg"),
        text: $("#TextPreview")[0],

        changeContent: function(imgSrc, text) {
            mainMenu.previewPanels.img.attr("src", imgSrc);
            mainMenu.previewPanels.text.textContent = text;
        }
    },
    jobTitle: {
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
    },

    staticFlicker: (duration) => {
        mainMenu.previewStatic.fadeTo(duration / 2, 0.1).fadeTo(duration / 2, 0.7);
    },
    control: function() {
        setTimeout(() => {
            this.elem.fadeIn(3000);
            setTimeout(() => {
                this.staticFlicker(2500);
                this.jobTitle.write();
                setInterval(() => {
                    this.staticFlicker(2500);
                }, 2750);
            }, 3000);

        }, 3000);


    }
};

// mainMenu.previewPanels.changeContent(sundayImg, "On the Sunday of Life")
// mainMenu.hexagon_Containers[0].childNodes[3].childNodes[1].childNodes[1].attributes[2].nodeValue = "https://123greetingsquotes.com/wp-content/uploads/2017/11/beautiful-gif-images-of-flowers-falling-4.gif"
// console.log(mainMenu.hexagon_Containers[0].childNodes[3].childNodes[1].childNodes[1].attributes[2].nodeValue);
// console.log(mainMenu.hexPatterns);
// console.log(mainMenu.hexagons[0]);




const hexValues = Object.values(mainMenu.hexagons);
hexValues.splice(5);

const previewTexts = ["???", "On the Sunday of Life", "Hand Cannot Erase", "Frightened Astronaut", "???"]
const previewImgs = ["https://media.giphy.com/media/3oz8xOvhnSpVOs9xza/giphy.gif", sundayImg, handCannotErase, astronaut, "https://media.giphy.com/media/Ph0oIVQeuvh0k/giphy.gif"];
hexValues.forEach((hexagon, index) => {


    hexagon.addEventListener("mouseover", () => {
        mainMenu.previewPanels.changeContent(previewImgs[index], previewTexts[index])
    })

    hexagon.addEventListener("mouseleave", () => {
        mainMenu.previewPanels.changeContent("", "")
    })
});