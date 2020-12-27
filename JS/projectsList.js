import FOABP from "../Images/FOABP.jpg"
import FOABPImg from "../Images/FOABP Img 1.jpg"



import IAR from "../Images/In_Absentia_Right.jpg"
import IA from "../Images/In_Absentia.png"
import Recordings from "../Images/Recordings.jpg"
import StupidDream from "../Images/Stupid_Dream.jpg"
import TSMS from "../Images/skymovesideways.jpg"
import Sunday from "../Images/Sunday.jpg"
import LightbulbSun from "../Images/Lightbulb_Sun.jpg"

import ITCOTCK from "../Images/In_The_Court_of_The_Crimson_King.jpg"
import ITCOTCKImg from "../Images/In_The_Court_of_The_Crimson_King_Wallpaper.jpg"

import Red from "../Images/Red1.jpg"
import RedImg from "../Images/Red_Wallpaper.jpg"

import Humanistic from "../Images/Humanistic.jpg"
import HumanisticDemos from "../Images/Humanistic_Demos.jpg"

import TFB from "../Images/The_Future_Bites.jpg"
import TFBImg from "../Images/The_Future_Bites_Wallpaper.jpg"

import HCE from "../Images/HCE.jpg"
import HCEImg from "../Images/HCE_Wallpaper.jpg"

import SonicHeroes from "../Images/Sonic_Heroes.jpg"
import SonicHeroesImg from "../Images/Sonic_Heroes_Wallpaper.jpg"
import TDSOTM from "../Images/TDSOTM.jpg"
import TDSOTMImg from "../Images/TDSOTM_Wallpaper.jpg"
import TheWall from "../Images/The_Wall.jpg"
import TheWallImg from "../Images/The_Wall_Wallpaper.jpg"

import X4 from "../Images/X4.jpg"
import X4Img from "../Images/X4_Wallpaper.jpg"

import RE2 from "../Images/BIOHAZARD_2.jpg"
import RE2Img from "../Images/BIOHAZARD_2_Wallpaper.jpg"

import YW from "../Images/Your_Wilderness.jpg"
import Dissolution from "../Images/Dissolution.jpg"

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
    new Project("In the Court of the Crimson King", ITCOTCK, ITCOTCKImg, "ITCOTCK", true, "../Sound/The_Court_of_The_Crimson_King.mp3"),
    new Project("Red", Red, RedImg, "Red", true, "../Sound/Starless.mp3"),
    new Project("Humanistic", Humanistic, HumanisticDemos, "Humanistic", true, "../Sound/Start_Over.mp3"),
    new Project("The Future Bites", TFB, TFBImg, "TFB", true, "../Sound/12_THINGS_I_FORGOT.mp3"),
    new Project("Hand Cannot Erase", HCE, HCEImg, "HCE", true, "../Sound/Hand_Cannot_Erase.mp3"),
    new Project("In Absentia", IAR, IA, "IA", true, "../Sound/.3.mp3"),
    new Project("On the Sunday of Life...", Sunday, Sunday, "Sunday", true, "../Sound/Radioactive_Toy.mp3"),
    new Project("The Dark Side of the Moon", TDSOTM, TDSOTMImg, "TDSOTM", true, "../Sound/Money.mp3"),
    new Project("The Wall", TheWall, TheWallImg, "TheWall", true, "../Sound/Comfortably_Numb.mp3"),
    new Project("Mega Man X4 Sound Collection", X4, X4Img, "X4", true, "../Sound/Split_Mushroom_Stage.mp3"),
    new Project("Resident Evil 2: Original Soundtrack", RE2, RE2Img, "RE2", true, "../Sound/The_Front_Hall.mp3"),
    new Project("Your Wilderness", YW, YW, "YW", false, "../Sound/Tear_You_Up.mp3"),
    new Project("Dissolution", Dissolution, Dissolution, "Dissolution", true, "../Sound/White_Mist.mp3"),
    new Project("", Recordings, "", "Recordings", false, null),
    new Project("", StupidDream, "", "StupidDream", false, null),
    new Project("", TSMS, "", "TSMS", false, null),
    new Project("", LightbulbSun, "", "LightbulbSun", false, null),
    new Project("", FOABP, "", "FOABP", false, null),
    new Project("", SonicHeroes, "", "SonicHeroes", false, null),

]



function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {

        // Generate random number  
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

projects = shuffleArray(projects)


export default projects;