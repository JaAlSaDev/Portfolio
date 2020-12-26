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
    constructor(title, icon, image, patternID, available, music) {
        this.title = title;
        this.icon = icon;
        this.image = image;
        this.patternID = patternID;
        this.available = available;
        this.music = music;
    }
}


let projects = [
    new Project("Fear of a Blank Planet", FOABP, FOABPImg, "FOABP", true, "../Sound/Sleep_Together.mp3"),
    new Project("In Absentia", IAR, IA, "IA", false, "../Sound/Chloroform.mp3"),
    new Project("Recordings", Recordings, Recordings, "Recordings", false, "../Sound/Ambulance_Chasing.mp3"),
    new Project("Stupid Dream", StupidDream, StupidDream, "StupidDream", false, "../Sound/Piano_Lessons.mp3"),
    new Project("The Sky Moves Sideways", TSMS, TSMS, "TSMS", false, "../Sound/The_Sky_Moves_Sideways_Phase_2.mp3"),
    new Project("On the Sunday of Life...", Sunday, Sunday, "Sunday", false, "../Sound/Radioactive_Toy.mp3"),
    new Project("Lightbulb Sun", LightbulbSun, LightbulbSun, "LightbulbSun", false, "../Sound/LCTEPEBIR.mp3"),
]
export default projects;