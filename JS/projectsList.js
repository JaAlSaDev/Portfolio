import FOABP from "../Images/FOABP.jpg"
import FOABPImg from "../Images/FOABP Img 1.jpg"

import ITCOTCK from "../Images/king-crimson-in-the-court-of.jpg"

import IA from "../Images/In_Absentia_Right.jpg"
import Recordings from "../Images/Recordings.jpg"
import StupidDream from "../Images/Stupid_Dream.jpg"
import TSMS from "../Images/skymovesideways.jpg"
import Sunday from "../Images/Sunday.jpg"
import LightbulbSun from "../Images/Lightbulb_Sun.jpg"

class Project {
    constructor(title, icon, image, patternID) {
        this.title = title;
        this.icon = icon;
        this.image = image;
        this.patternID = patternID;
    }
}


let projects = [
    new Project("Fear of a Blank Planet", FOABP, FOABPImg, "FOABP"),
    new Project("In Absentia", IA, IA, "IA"),
    new Project("Recordings", Recordings, Recordings, "Recordings"),
    new Project("Stupid Dream", StupidDream, StupidDream, "StupidDream"),
    new Project("The Sky Moves Sideways", TSMS, TSMS, "TSMS"),
    new Project("On the Sunday of Life...", Sunday, Sunday, "Sunday"),
    new Project("Lightbulb Sun", LightbulbSun, LightbulbSun, "LightbulbSun"),

]
export default projects;