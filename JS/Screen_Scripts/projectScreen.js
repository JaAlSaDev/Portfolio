import jQuery from "../ThirdParty/jQuery";
window.$ = window.jQuery = jQuery;
import {
    projectsScreen
} from "./projectsScreen"
import Hexagon from "../Hexagon/Hexagon";
import stevenSketch from "../../assets/Images/Stupid_Dream.jpg";
import soundEffects from "../Sound/soundEffects"
import { SETTINGS } from "../../settings"


const optionHexagonBackgroundColor = "rgb(3,143,178)";
const foreignObject = document.querySelector("foreignObject");
const optionTitle = document.querySelector("#optionTitle");

const technologyLogos = document.querySelector("#technologyLogos");
const technologyDescriptionBox = document.querySelector("#technologyDescriptionBox");

const technologyTitle = document.querySelector("#technologyTitle");
const technologyDescription = document.querySelector("#technologyDescription");

const technologyArrowLeft = document.querySelector("#leftArrow");

const technologyArrowRight = document.querySelector("#rightArrow");

const technologyLogosScroll = (scrollStep) => {
    technologyLogos.scrollLeft += scrollStep;
}

const technologyLogosScrollTimer = (scrollStep) => setInterval(() => {
    technologyLogosScroll(scrollStep);
}, 50);

let technologyLogosScrollInterval = null;

technologyArrowRight.addEventListener("mousedown", () => {
    technologyLogosScrollInterval = technologyLogosScrollTimer(5)
});

technologyArrowRight.addEventListener("touchstart", () => {
    technologyLogosScrollInterval = technologyLogosScrollTimer(5)
});


technologyArrowRight.addEventListener("touchend", () => {
    clearInterval(technologyLogosScrollInterval)
});

technologyArrowRight.addEventListener("mouseup", () => {
    clearInterval(technologyLogosScrollInterval)
});


technologyArrowLeft.addEventListener("mousedown", () => {
    technologyLogosScrollInterval = technologyLogosScrollTimer(-5)
})

technologyArrowLeft.addEventListener("touchstart", () => {
    technologyLogosScrollInterval = technologyLogosScrollTimer(-5)
})

technologyArrowLeft.addEventListener("mouseup", () => {
    clearInterval(technologyLogosScrollInterval)
})

technologyArrowLeft.addEventListener("touchend", () => {
    clearInterval(technologyLogosScrollInterval)
})


let overlayMenu = {
    element: $("#overlayMenuContainer > svg")[0],
    project: null,
    logo: {
        hexagon: new Hexagon("projectLogo", stevenSketch, [], "30%", "none", "0 0 262.5 225", "black", 2.5, 0, "40,33", "0.325"),
        pattern: null,
        element: null,

        create: function () {
            this.element = this.hexagon.createElement();

            console.log("element", this.element);
            overlayMenu.element.append(this.element);
            this.pattern = $("#projectLogo")[0];
            this.addEventListeners();

            overlayMenu.options.create();
        },

        destroy: function () {
            this.element.remove();
            this.pattern = null;

            overlayMenu.options.destroy();
        },

        addEventListeners: function () {
            this.element.addEventListener("click", () => {
                overlayMenu.options.toggle();
                soundEffects.playDecision();
            })

            this.element.addEventListener("mouseover", () => {
                soundEffects.playSelect();
            });
        },

        changeHexImage: function (imgSrc) {
            console.log("logo: ", this);
            this.pattern.firstElementChild.attributes[2].nodeValue = imgSrc;
        }
    },

    options: {
        hexagons: [
            new Hexagon("Description", null, [], "20%", "none", "0 0 262.5 225", "black", 26.5625, -16.0625, "40,33", "0.325", true, "Description", optionHexagonBackgroundColor, true),
            new Hexagon("Gallery", null, [], "20%", "none", "0 0 262.5 225", "black", 26.5625, 16.0625, "40,33", "0.325", true, "Gallery", optionHexagonBackgroundColor, true),
            new Hexagon("Technologies", null, [], "20%", "none", "0 0 262.5 225", "black", 40.44375, 0, "40,33", "0.325", true, "Technologies", optionHexagonBackgroundColor, true),
            new Hexagon("Links", null, [], "20%", "none", "0 0 262.5 225", "black", 54.34375, -16.0625, "40,33", "0.325", true, "Links", optionHexagonBackgroundColor, true),
            new Hexagon("Skills", null, [], "20%", "none", "0 0 262.5 225", "black", 54.34375, 16.0625, "40,33", "0.325", true, "Skills", optionHexagonBackgroundColor, true),
            new Hexagon("Team", null, [], "20%", "none", "0 0 262.5 225", "black", 68.225, 0, "40,33", "0.325", true, "Team", optionHexagonBackgroundColor, true)
        ],

        patterns: [],
        elements: [],
        textElements: [],
        isCreated: false,
        contents: [],
        currentContentTitle: "",

        create: function () {

            if (this.elements.length != 0) {
                return;
            }

            this.isCreated = true;
            this.hideContent();
            this.hexagons.forEach((hexagon, index) => {
                setTimeout(() => {
                    let element = hexagon.createElement();

                    overlayMenu.element.append(element);

                    this.elements.push(element);

                    this.patterns.push($(`#${hexagon.patternID}`)[0]);

                    this.contents.push(document.querySelector(`#project${hexagon.patternID}`))


                    hexagon.setTextElement(document.querySelectorAll(`#${hexagon.patternID}SVG text`)[0])

                    hexagon.setHexagonElement(document.querySelectorAll(`#${hexagon.patternID}SVG polygon`)[0])

                    element.addEventListener("click", () => {
                        soundEffects.playDecision();
                        hexagon.clickStyle();
                        overlayMenu.options.destroy();

                        setTimeout(() => {
                            this.showContent(index, hexagon.patternID);
                        }, 500);


                        console.log("ID: ", hexagon.patternID);


                    })

                    hexagon.textElement.addEventListener("mouseover", () => {
                        hexagon.hoverStyle();

                    })

                    element.addEventListener("mouseover", () => {
                        hexagon.hoverStyle();
                    })

                    element.addEventListener("mouseleave", () => {
                        hexagon.resetStyle();
                    })


                }, 50 * (index + 1));




            });




        },

        destroy: function () {

            this.hideContent();

            if (this.hexagons.length != this.elements.length) {
                return;
            }
            this.isCreated = false;

            this.hexagons.reverse().forEach((hexagon, index) => {
                setTimeout(() => {
                    hexagon.destroyElement()
                    this.elements.pop();

                    this.patterns.pop();
                }, 50 * (index + 1));

            });
            this.hexagons.reverse()




        },

        toggle: function () {

            if (!this.isCreated) {
                this.create();
            } else {
                this.destroy();
            }
        },

        showContent: function (index, title) {

            this.hideContent();

            if (this.contents[index]) {
                this.currentContentTitle = title;

                foreignObject.style.display = "flex"
                this.contents[index].style.display = "flex"
                this.contents[index].scrollTop = 0;
                optionTitle.textContent = title;


                switch (title) {
                    case "Description":

                        let paragraphElem = document.createElement("p");
                        paragraphElem.innerText = overlayMenu.project.description;
                        this.contents[index].append(paragraphElem)
                        break;
                    case "Gallery":

                        overlayMenu.project.gallery.forEach(imageSrc => {
                            let imageElem = document.createElement("img");
                            imageElem.src = imageSrc;
                            this.contents[index].append(imageElem)
                        });

                        break;
                    case "Technologies":
                        technologyLogos.scrollTop = 0;
                        technologyDescriptionBox.scrollTop = 0;

                        overlayMenu.project.technologies.forEach(technology => {
                            let imgElement = document.createElement('img');
                            imgElement.src = technology.iconSrc;

                            technologyLogos.appendChild(imgElement);

                            imgElement.addEventListener("mouseover", () => {
                                technologyTitle.innerText = technology.name;
                                technologyDescription.innerText = technology.description;
                            })

                            imgElement.addEventListener("click", () => {
                                technologyTitle.innerText = technology.name;
                                technologyDescription.innerText = technology.description;
                            })
                        });
                        // const 

                        break;
                    case "Links":
                        console.log("links: ", overlayMenu.project.links);

                        overlayMenu.project.links.forEach(link => {
                            this.contents[index].append(link.getElement())
                        })

                        break;
                    case "Skills":
                        console.log("links: ", overlayMenu.project.links);


                        overlayMenu.project.skills.forEach(skill => {

                            const skillDiv = document.createElement("div");
                            skillDiv.className = "skillContainer";
                            skillDiv.innerHTML = `<p>${skill}</p>`
                            this.contents[index].append(skillDiv)
                        })

                        break;
                    case "Team":
                        console.log("Team: ", overlayMenu.project.team);

                        overlayMenu.project.team.forEach(contributor => {
                            this.contents[index].append(contributor.getElement())
                        })
                        break;

                }
            }

        },

        hideContent: function () {

            const removeChildren = index => {
                while (this.contents[index].firstChild) {
                    this.contents[index].removeChild(this.contents[index].firstChild);
                }
            }
            foreignObject.style.display = "none"
            // content.style.display = "none"
            switch (this.currentContentTitle) {
                case "Description":
                    while (this.contents[0].firstChild) {
                        this.contents[0].removeChild(this.contents[0].firstChild);
                    }
                    break;
                case "Gallery":

                    while (this.contents[1].firstChild) {
                        this.contents[1].removeChild(this.contents[1].firstChild);
                    }
                    break;
                case "Technologies":
                    technologyTitle.innerText = "";
                    technologyDescription.innerText = "";

                    while (technologyLogos.firstChild) {
                        technologyLogos.removeChild(technologyLogos.firstChild);
                    }

                    break;
                case "Links":
                    while (this.contents[3].firstChild) {
                        this.contents[3].removeChild(this.contents[3].firstChild);
                    }
                    break;
                case "Skills":
                    removeChildren(4);
                    break;
                case "Team":
                    removeChildren(5);
                    break;

            }
            this.contents.forEach(content => {
                if (content) {
                    content.style.display = "none"
                }
            });
        }
    },

    create: function (project) {
        this.project = project;
        this.logo.create();
    },

    destroy: function () {
        this.logo.destroy();
    }
}



let backArrow = undefined;

export let projectScreen = {
    elem: $("#ProjectScreen"),
    control: function (project = null) {

        if (project) {

            $("#ProjectScreen > .BackgroundImg")[0].src = project.image

            document.querySelector("#projectTitle").textContent = project.title;
            setTimeout(() => {
                overlayMenu.create(project);
                overlayMenu.logo.changeHexImage(project.icon)
            }, SETTINGS.screenTransitionTime + 1000);

        }

        setTimeout(() => {
            this.elem.fadeIn(SETTINGS.screenTransitionTime);

            this.elem.css("display", "flex");

            //Add event listeners to hexagons and backArrow if the backArrow is empty (done once)
            if (!backArrow) {
                setTimeout(() => {

                    backArrow = document.querySelector("#ProjectScreen object").contentDocument.children[0];

                    backArrow.addEventListener("click", () => {
                        overlayMenu.destroy();
                        projectScreen.elem.fadeOut(SETTINGS.screenTransitionTime);

                        soundEffects.playCancel();
                        projectsScreen.control();

                    });

                    // hexagon.addEventListeners();

                }, SETTINGS.screenTransitionTime);
            }
        }, SETTINGS.screenTransitionTime);
    }
};