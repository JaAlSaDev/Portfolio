let images = require("../assets/Images/*.jpg")
let trackPaths = require("../assets/Sound/Music/*.mp3")

class Project {
    constructor(title, icon, image, patternID, available, music, description="",gallery=[]) {
        this.title = title;
        this.icon = icon;
        this.image = image;
        this.description = description;
        this.gallery=gallery;
        this.patternID = patternID;
        this.available = available;
        this.music = music;
    }
}

const galleries={
    onTheSundayOfLife:[
        "https://img.discogs.com/VKAujdvctCHJ2689wbhw_Lr98xk=/fit-in/595x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1604791-1272887967.jpeg.jpg",
        "https://img.discogs.com/_cH0hyHxtAMTVYjINliopzSG-Zg=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1604791-1312641403.jpeg.jpg",
        "https://img.discogs.com/qy_rNxxDfGRT0LBTs4CIqIKpMWc=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1604791-1312641430.jpeg.jpg",
        "https://stevenwilsonhq.com/sw/wp-content/uploads/2016/01/onthesunday-background-compress.jpg",
        "https://neuralrustsite.files.wordpress.com/2017/05/1992_otsol_alt.jpg?w=2000&h=1200&crop=1"

    ],
    SonicHeroes:[
        "https://static.wikia.nocookie.net/sonic/images/d/d3/Sonic_Heroes_logo_with_outline.png",
        "https://static.wikia.nocookie.net/sonic/images/1/12/Heroes-sh_e3_art_stg01.png",
        "https://static.wikia.nocookie.net/sonic/images/a/a3/Heroes_Concept_artwork_3.jpg",
        "https://static.wikia.nocookie.net/sonic/images/9/9d/Heroes_Concept_artwork_5.jpg",
        "https://static.wikia.nocookie.net/sonic/images/9/9e/Heroes_Concept_artwork_7.jpg",
        "https://static.wikia.nocookie.net/sonic/images/3/3e/Heroes_Concept_artwork_1.jpg",
        "https://static.wikia.nocookie.net/sonic/images/c/c5/Heroes_Concept_artwork_4.jpg",
        "https://static.wikia.nocookie.net/sonic/images/2/2d/Sonic_Heroes_Artwork_-_Team_Sonic.png",
        "https://static.wikia.nocookie.net/sonic/images/7/7d/Team_rose.png",
        "https://static.wikia.nocookie.net/sonic/images/6/6a/SonicHeroes_TeamDark.png"
    ]
}

const descriptions={
    onTheSundayOfLife:`On the Sunday of Life... is the debut album of English progressive rock band Porcupine Tree, first released in May 1992. It compiles tracks that Steven Wilson produced and recorded for two cassette-only releases, Tarquin's Seaweed Farm (1989) and The Nostalgia Factory (1991). The rest of the music from these tapes was released three years later in the compilation album Yellow Hedgerow Dreamscape.

    Most of the lyrics were written by Alan Duffy, a school friend with whom Steven Wilson had lost touch a few years before the album was released. The album title was chosen from a long list of nonsense titles compiled by Richard Allen of Delerium.
    
    A small run of 1000 copies in a deluxe gatefold sleeve were released in early 1992. The album, over time, eventually sold in excess of 20,000 copies.
    
    The version of "Radioactive Toy" that featured on the album is re-recorded. The original version was later released on Yellow Hedgerow Dreamscape. In addition, the original versions of "The Nostalgia Factory", "Queen Quotes Crowley", and "This Long Silence" are about a minute shorter on this album.`,
    SonicHeroes: `Sonic Heroes (ソニック ヒーローズ Sonikku Hīrōzu?) is a 3D platformer video game in the Sonic the Hedgehog series developed by Sonic Team and published by Sega for the GameCube, PlayStation 2, and Xbox. It was first released on December 2003 in Japan, then in the first couple of months of the following year in other countries. It would then be later released for Microsoft Windows PCs on November 2004. As part of the PlayStation 2 Classics program, the PlayStation 2 version was re-released digitally for the PlayStation 3 via PlayStation Network on September 2012 in Europe, and January 2014 in Asia. Sonic Heroes is noteworthy for being the first Sonic game to be released on Sony and Microsoft gaming consoles.

    This game differs from other Sonic games by allowing the player to take control of one of four teams, each with three characters, who each have unique abilities to use. The game received mixed reviews from critics but it performed commercially well, becoming a million-seller and making the best-selling lists for all three of its original platforms. `,
}

let projects = [
    new Project("In the Court of the Crimson King", images["In_The_Court_of_The_Crimson_King"], images["In_The_Court_of_The_Crimson_King_Wallpaper"], "ITCOTCK", true, trackPaths["The_Court_of_The_Crimson_King"]),
    new Project("Humanistic", images["Humanistic"], images["Humanistic_Demos"], "Humanistic", true, trackPaths["Start_Over"]),
    new Project("The Future Bites", images["The_Future_Bites"], images["The_Future_Bites_Wallpaper"], "TFB", true, trackPaths["12_THINGS_I_FORGOT"]),
    new Project("In Absentia", images["In_Absentia_Right"], images["In_Absentia_Right"], "IA", true, trackPaths["Dot 3"]),
    new Project("On the Sunday of Life...", images["Sunday"], images["Sunday"], "Sunday", true, trackPaths["Radioactive_Toy"],descriptions.onTheSundayOfLife,galleries.onTheSundayOfLife),
    new Project("The Dark Side of the Moon", images["TDSOTM"], images["TDSOTM_Wallpaper"], "TDSOTM", true, trackPaths["Money"]),
    new Project("The Wall", images["The_Wall"], images["The_Wall_Wallpaper"], "TheWall", true, trackPaths["Comfortably_Numb"]),
    new Project("Mega Man X4 Sound Collection", images["X4"], images["X4_Wallpaper"], "X4", true, trackPaths["Split_Mushroom_Stage"]),
    new Project("Recordings", images["Recordings"], images["Recordings"], "Recordings", false, null),
    new Project("Stupid Dream", images["Stupid_Dream"], images["Stupid_Dream"], "StupidDream", false, null),
    new Project("The Sky Moves Sideways", images["skymovesideways"], images["skymovesideways"], "TSMS", false, null),
    new Project("Lightbulb Sun", images["Lightbulb_Sun"], images["Lightbulb_Sun"], "LightbulbSun", false, null),
    new Project("Fear of a Blank Planet", images["FOABP"], images["FOABP Img 1"], "FOABP", false, null),
    new Project("Sonic Heroes", images["Sonic_Heroes"], images["Sonic_Heroes_Wallpaper"], "SonicHeroes", true, trackPaths["Frog_Forest"],descriptions.SonicHeroes,galleries.SonicHeroes),

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

projects = shuffleArray(projects)


export default projects.slice(0,7);