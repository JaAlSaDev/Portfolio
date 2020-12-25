import FOABP from "../Images/FOABP.jpg"
import FOABPImg from "../Images/FOABP Img 1.jpg"

import ITCOTCK from "../Images/king-crimson-in-the-court-of.jpg"

import IAR from "../Images/In_Absentia_Right.jpg"
import IA from "../Images/In_Absentia.png"
import Recordings from "../Images/Recordings.jpg"
import StupidDream from "../Images/Stupid_Dream.jpg"
import TSMS from "../Images/skymovesideways.jpg"
import Sunday from "../Images/Sunday.jpg"
import LightbulbSun from "../Images/Lightbulb_Sun.jpg"

class Project {
    constructor(title, icon, image, patternID, available) {
        this.title = title;
        this.icon = icon;
        this.image = image;
        this.patternID = patternID;
        this.available = available;
    }
}


let projects = [
    new Project("Fear of a Blank Planet", FOABP, FOABPImg, "FOABP", false),
    new Project("In Absentia", IAR, IA, "IA"),
    new Project("Recordings", Recordings, Recordings, "Recordings", false),
    new Project("Stupid Dream", StupidDream, StupidDream, "StupidDream", false),
    new Project("The Sky Moves Sideways", TSMS, TSMS, "TSMS", false),
    new Project("On the Sunday of Life...", Sunday, Sunday, "Sunday", false),
    new Project("Lightbulb Sun", LightbulbSun, LightbulbSun, "LightbulbSun", false),
]
export default projects;