let images= require("../assets/Images/*.jpg")
let trackPaths=require("../assets/Sound/Music/*.mp3")

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
    new Project("In the Court of the Crimson King", images["In_The_Court_of_The_Crimson_King"], images["In_The_Court_of_The_Crimson_King_Wallpaper"], "ITCOTCK", true, trackPaths["The_Court_of_The_Crimson_King"]),
    new Project("Red", images["Red"], images["Red_Wallpaper"], "Red", true, trackPaths["Starless"]),
    new Project("Humanistic", images["Humanistic"], images["Humanistic_Demos"], "Humanistic", true, trackPaths["Start_Over"]),
    new Project("The Future Bites", images["The_Future_Bites"], images["The_Future_Bites_Wallpaper"], "TFB", true, trackPaths["12_THINGS_I_FORGOT"]),
    new Project("Hand Cannot Erase", images["HCE"], images["HCE_Wallpaper"], "HCE", true,trackPaths["Hand_Cannot_Erase"]),
    new Project("In Absentia", images["In_Absentia_Right"], images["In_Absentia_Right"], "IA", true, trackPaths["Dot 3"]),
    new Project("On the Sunday of Life...", images["Sunday"], images["Sunday"], "Sunday", true, trackPaths["Radioactive_Toy"]),
    new Project("The Dark Side of the Moon", images["TDSOTM"], images["TDSOTM_Wallpaper"], "TDSOTM", true, trackPaths["Money"]),
    new Project("The Wall", images["The_Wall"], images["The_Wall_Wallpaper"], "TheWall", true, trackPaths["Comfortably_Numb"] ),
    new Project("Mega Man X4 Sound Collection", images["X4"], images["X4_Wallpaper"], "X4", true, trackPaths["Split_Mushroom_Stage"]),
    new Project("Resident Evil 2: Original Soundtrack", images["BIOHAZARD_2"], images["BIOHAZARD_2_Wallpaper"], "RE2", true, trackPaths["The_Front_Hall"]),
    // new Project("Your Wilderness", images["Your_Wilderness"], images["Your_Wilderness"], "YW", true, trackPaths["Tear_You_Up"] ),
    // new Project("Dissolution", images["Dissolution"], images["Dissolution"], "Dissolution", true, trackPaths["White_Mist"]),
    // new Project("Recordings", images["Recordings"], images["Recordings"], "Recordings", false, null),
    // new Project("Stupid Dream", images["Stupid_Dream"], images["Stupid_Dream"], "StupidDream", false, null),
    // new Project("The Sky Moves Sideways", images["skymovesideways"], images["skymovesideways"], "TSMS", false, null),
    // new Project("Lightbulb Sun", images["Lightbulb_Sun"], images["Lightbulb_Sun"], "LightbulbSun", false, null),
    // new Project("Fear of a Blank Planet", images["FOABP"], images["FOABP Img 1"], "FOABP", false, null),
    // new Project("Sonic Heroes", images["Sonic_Heroes"], images["Sonic_Heroes_Wallpaper"], "SonicHeroes", false, null),

]



function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

// projects = shuffleArray(projects)


export default projects;