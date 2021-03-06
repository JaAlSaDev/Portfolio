let images = require("../assets/Images/*.jpg");
let trackPaths = require("../assets/Sound/Music/*.mp3");
let svgImages = require("../assets/svg/*.svg");

import Hexagon from "./Hexagon/Hexagon";


class Project {
    constructor(title, icon, image, patternID, available, music, description = "", gallery = [], technologies = [], team = [], links=[],skills=[]) {
        this.title = title;
        this.icon = icon;
        this.image = image;
        this.description = description;
        this.gallery = gallery;
        this.technologies = technologies;
        this.team = team;
        this.patternID = patternID;
        this.available = available;
        this.music = music;
        this.links=links;
        this.skills=skills;
    }
}

class Technology {
    constructor(name = "", iconSrc = "", description = "") {
        this.name = name;
        this.iconSrc = iconSrc;
        this.description = description;
    }
}

class Link {
    constructor(logoSrc, title, actualLink) {
        this.logoSrc = logoSrc;
        this.title = title;
        this.actualLink = actualLink;
    }


    getElement() {
        // const hexagon=new Hexagon(this.logoSrc, this.logoSrc,[],"100%");
        const hexagon=new Hexagon(this.logoSrc, this.logoSrc,[],"100%", "none", "0 0 262.5 225", null, "", "", "50,35", "0.325", true, null, "white", false,"0.225","0.125","0.7 0.8");
        
        const linkDiv = document.createElement("div");
        linkDiv.className = "link";
        linkDiv.innerHTML =
            `<div class="linkLogoContainer">
                ${hexagon.createElement().outerHTML}
            </div>
            <div class="linkName">
                <p>
                    ${this.title}
                </p>
            </div>
            <div class="actualLink">
                <a target="_blank" href="${this.actualLink}">${this.actualLink}</a>
            </div>`

        return linkDiv;
    }
}

class Contributor {
    constructor(name, role, imgSrc, linkName, link) {
        this.name = name;
        this.role = role;
        this.imgSrc = imgSrc;
        this.linkName = linkName;
        this.link = link;
    }

    getElement() {
        const contributorDiv = document.createElement("div");
        contributorDiv.className = "contributor";
        contributorDiv.innerHTML =
            `<img class="contributorImg" src="${this.imgSrc}">
            <p class="contributorName">${this.name}</p>
            <p class="contributorRole">${this.role}</p>
            <button onClick="window.open('${this.link}');">${this.linkName}</button>`

        return contributorDiv;
    }
}


const galleries = {
    onTheSundayOfLife: [
        "https://img.discogs.com/VKAujdvctCHJ2689wbhw_Lr98xk=/fit-in/595x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1604791-1272887967.jpeg.jpg",
        "https://img.discogs.com/_cH0hyHxtAMTVYjINliopzSG-Zg=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1604791-1312641403.jpeg.jpg",
        "https://img.discogs.com/qy_rNxxDfGRT0LBTs4CIqIKpMWc=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1604791-1312641430.jpeg.jpg",
        "https://stevenwilsonhq.com/sw/wp-content/uploads/2016/01/onthesunday-background-compress.jpg",
        "https://neuralrustsite.files.wordpress.com/2017/05/1992_otsol_alt.jpg?w=2000&h=1200&crop=1"

    ],
    SonicHeroes: [
        
        images["Sonic_Heroes_Original_Soundtrax"],
        images["Complete_Trinity_back_cover_art"],
        images["HeroesPSDLogoFixed"],
        images["Heroes_Concept_artwork_1"],
        images["Heroes_Concept_artwork_6"],
        images["Sonic_Heroes_Coverart"],
        images["Sonic_Heroes_Artwork_-_Team_Sonic"],
        images["SonicHeroes_TeamDark"],
        images["SonicHeroes_TeamDark"],
        images["Team_chaotix"],
        images["Team_rose"],

    ]
}

const descriptions = {
    onTheSundayOfLife: `On the Sunday of Life... is the debut album of English progressive rock band Porcupine Tree, first released in May 1992. It compiles tracks that Steven Wilson produced and recorded for two cassette-only releases, Tarquin's Seaweed Farm (1989) and The Nostalgia Factory (1991). The rest of the music from these tapes was released three years later in the compilation album Yellow Hedgerow Dreamscape.

    Most of the lyrics were written by Alan Duffy, a school friend with whom Steven Wilson had lost touch a few years before the album was released. The album title was chosen from a long list of nonsense titles compiled by Richard Allen of Delerium.
    
    A small run of 1000 copies in a deluxe gatefold sleeve were released in early 1992. The album, over time, eventually sold in excess of 20,000 copies.
    
    The version of "Radioactive Toy" that featured on the album is re-recorded. The original version was later released on Yellow Hedgerow Dreamscape. In addition, the original versions of "The Nostalgia Factory", "Queen Quotes Crowley", and "This Long Silence" are about a minute shorter on this album.`,
    SonicHeroes: `Sonic Heroes (ソニック ヒーローズ Sonikku Hīrōzu?) is a 3D platformer video game in the Sonic the Hedgehog series developed by Sonic Team and published by Sega for the GameCube, PlayStation 2, and Xbox. It was first released on December 2003 in Japan, then in the first couple of months of the following year in other countries. It would then be later released for Microsoft Windows PCs on November 2004. As part of the PlayStation 2 Classics program, the PlayStation 2 version was re-released digitally for the PlayStation 3 via PlayStation Network on September 2012 in Europe, and January 2014 in Asia. Sonic Heroes is noteworthy for being the first Sonic game to be released on Sony and Microsoft gaming consoles.

    This game differs from other Sonic games by allowing the player to take control of one of four teams, each with three characters, who each have unique abilities to use. The game received mixed reviews from critics but it performed commercially well, becoming a million-seller and making the best-selling lists for all three of its original platforms. `,
}

const technologies = {
    onTheSundayOfLife: [
        new Technology("Guitar", svgImages["guitar"], `The guitar is a fretted musical instrument that typically has six strings. It is held flat against the player's body and played by strumming or plucking the strings with the dominant hand, while simultaneously pressing the strings against frets with the fingers of the opposite hand. A plectrum or individual finger picks may be used to strike the strings. The sound of the guitar is projected either acoustically, by means of a resonant chamber on the instrument, or amplified by an electronic pickup and an amplifier.`),
        new Technology("Drum", svgImages["drums"], `The drum is a member of the percussion group of musical instruments. In the Hornbostel-Sachs classification system, it is a membranophone.[1] Drums consist of at least one membrane, called a drumhead or drum skin, that is stretched over a shell and struck, either directly with the player's hands, or with a percussion mallet, to produce sound. There is usually a resonance head on the underside of the drum, typically tuned to a slightly lower pitch than the top drumhead. Other techniques have been used to cause drums to make sound, such as the thumb roll. Drums are the world's oldest and most ubiquitous musical instruments, and the basic design has remained virtually unchanged for thousands of years.`),
        new Technology("Oboe", svgImages["oboe"], `The oboe (/ˈoʊboʊ/ OH-boh) is a type of double reed woodwind instrument. Oboes are usually made of wood, but may also be made of synthetic materials, such as plastic, resin or hybrid composites. The most common oboe plays in the treble or soprano range. A soprano oboe measures roughly 65 cm (25+1⁄2 in) long, with metal keys, a conical bore and a flared bell. Sound is produced by blowing into the reed at a sufficient air pressure, causing it to vibrate with the air column. The distinctive tone is versatile and has been described as "bright". When the word oboe is used alone, it is generally taken to mean the treble instrument rather than other instruments of the family, such as the bass oboe, the cor anglais (English horn), or oboe d'amore.`),
        new Technology("Guitar", svgImages["guitar"], `The guitar is a fretted musical instrument that typically has six strings. It is held flat against the player's body and played by strumming or plucking the strings with the dominant hand, while simultaneously pressing the strings against frets with the fingers of the opposite hand. A plectrum or individual finger picks may be used to strike the strings. The sound of the guitar is projected either acoustically, by means of a resonant chamber on the instrument, or amplified by an electronic pickup and an amplifier.`),
        new Technology("Drum", svgImages["drums"], `The drum is a member of the percussion group of musical instruments. In the Hornbostel-Sachs classification system, it is a membranophone.[1] Drums consist of at least one membrane, called a drumhead or drum skin, that is stretched over a shell and struck, either directly with the player's hands, or with a percussion mallet, to produce sound. There is usually a resonance head on the underside of the drum, typically tuned to a slightly lower pitch than the top drumhead. Other techniques have been used to cause drums to make sound, such as the thumb roll. Drums are the world's oldest and most ubiquitous musical instruments, and the basic design has remained virtually unchanged for thousands of years.`),
        new Technology("Oboe", svgImages["oboe"], `The oboe (/ˈoʊboʊ/ OH-boh) is a type of double reed woodwind instrument. Oboes are usually made of wood, but may also be made of synthetic materials, such as plastic, resin or hybrid composites. The most common oboe plays in the treble or soprano range. A soprano oboe measures roughly 65 cm (25+1⁄2 in) long, with metal keys, a conical bore and a flared bell. Sound is produced by blowing into the reed at a sufficient air pressure, causing it to vibrate with the air column. The distinctive tone is versatile and has been described as "bright". When the word oboe is used alone, it is generally taken to mean the treble instrument rather than other instruments of the family, such as the bass oboe, the cor anglais (English horn), or oboe d'amore.`),
        new Technology("Guitar", svgImages["guitar"], `The guitar is a fretted musical instrument that typically has six strings. It is held flat against the player's body and played by strumming or plucking the strings with the dominant hand, while simultaneously pressing the strings against frets with the fingers of the opposite hand. A plectrum or individual finger picks may be used to strike the strings. The sound of the guitar is projected either acoustically, by means of a resonant chamber on the instrument, or amplified by an electronic pickup and an amplifier.`),
        new Technology("Drum", svgImages["drums"], `The drum is a member of the percussion group of musical instruments. In the Hornbostel-Sachs classification system, it is a membranophone.[1] Drums consist of at least one membrane, called a drumhead or drum skin, that is stretched over a shell and struck, either directly with the player's hands, or with a percussion mallet, to produce sound. There is usually a resonance head on the underside of the drum, typically tuned to a slightly lower pitch than the top drumhead. Other techniques have been used to cause drums to make sound, such as the thumb roll. Drums are the world's oldest and most ubiquitous musical instruments, and the basic design has remained virtually unchanged for thousands of years.`),
        new Technology("Oboe", svgImages["oboe"], `The oboe (/ˈoʊboʊ/ OH-boh) is a type of double reed woodwind instrument. Oboes are usually made of wood, but may also be made of synthetic materials, such as plastic, resin or hybrid composites. The most common oboe plays in the treble or soprano range. A soprano oboe measures roughly 65 cm (25+1⁄2 in) long, with metal keys, a conical bore and a flared bell. Sound is produced by blowing into the reed at a sufficient air pressure, causing it to vibrate with the air column. The distinctive tone is versatile and has been described as "bright". When the word oboe is used alone, it is generally taken to mean the treble instrument rather than other instruments of the family, such as the bass oboe, the cor anglais (English horn), or oboe d'amore.`),
        new Technology("Guitar", svgImages["guitar"], `The guitar is a fretted musical instrument that typically has six strings. It is held flat against the player's body and played by strumming or plucking the strings with the dominant hand, while simultaneously pressing the strings against frets with the fingers of the opposite hand. A plectrum or individual finger picks may be used to strike the strings. The sound of the guitar is projected either acoustically, by means of a resonant chamber on the instrument, or amplified by an electronic pickup and an amplifier.`),
        new Technology("Drum", svgImages["drums"], `The drum is a member of the percussion group of musical instruments. In the Hornbostel-Sachs classification system, it is a membranophone.[1] Drums consist of at least one membrane, called a drumhead or drum skin, that is stretched over a shell and struck, either directly with the player's hands, or with a percussion mallet, to produce sound. There is usually a resonance head on the underside of the drum, typically tuned to a slightly lower pitch than the top drumhead. Other techniques have been used to cause drums to make sound, such as the thumb roll. Drums are the world's oldest and most ubiquitous musical instruments, and the basic design has remained virtually unchanged for thousands of years.`),
        new Technology("Oboe", svgImages["oboe"], `The oboe (/ˈoʊboʊ/ OH-boh) is a type of double reed woodwind instrument. Oboes are usually made of wood, but may also be made of synthetic materials, such as plastic, resin or hybrid composites. The most common oboe plays in the treble or soprano range. A soprano oboe measures roughly 65 cm (25+1⁄2 in) long, with metal keys, a conical bore and a flared bell. Sound is produced by blowing into the reed at a sufficient air pressure, causing it to vibrate with the air column. The distinctive tone is versatile and has been described as "bright". When the word oboe is used alone, it is generally taken to mean the treble instrument rather than other instruments of the family, such as the bass oboe, the cor anglais (English horn), or oboe d'amore.`)
    ],

    SonicHeroes:[
        new Technology("RenderWare ", images["renderware"], `RenderWare is a 3D API and graphics rendering engine used in computer games, Active Worlds, and some VRML browsers. RW is developed by Criterion Software Limited (which used to be a wholly owned subsidiary of Canon but is now owned by Electronic Arts).

        It originated in the era of software rendering on PCs prior to the appearance of GPUs, competing with other libraries such as Argonaut's BRender and RenderMorphics' Reality Lab (the latter was acquired by Microsoft and became Direct3D). `),
    ]
}
const links={
    Humanistic:[
        new Link(svgImages["youtube"],"Full Album on Youtube","https://www.youtube.com/watch?v=ePulfgjures"),
        new Link(svgImages["amazon"],"CD on Amazon","https://www.amazon.com/Humanistic-Abandoned-Pools/dp/B00005OAE0"),
    ]
}
const teams = {
    Recordings: [
        new Contributor("Steven Wilson", "Guitarist", "https://writteninmusic.com/wp-content/uploads/2016/09/cover-steven-wilson-transience.jpg", "Official Website", "https://stevenwilsonhq.com/sw/"),
        new Contributor("Richard Barbieri", "Keyboardist", "https://d1mdxzfl9p8pzo.cloudfront.net/7/123548597_1_400.jpg", "Bandcamp", "https://richardbarbieri.bandcamp.com/"),
        new Contributor("Colin Edwin", "Bassist", "https://www.betreutesproggen.de/wp-content/uploads/2020/06/colin_edwin.jpg", "Official Website", "http://www.colinedwin.co.uk/"),
        new Contributor("Chris Maitland", "Drummer", images["ChrisMaitland"], "Official Website", "http://www.chrismaitland.com/")],
    SonicHeroes: [
        new Contributor("Naofumi Hataya", "Composer", images["NaofumiHataya"], "VGMdb", "https://vgmdb.net/artist/449"),
        new Contributor("Hideaki Kobayashi", "Composer", images["HideakiKobayash"], "VGMdb", "https://vgmdb.net/artist/255"),
        new Contributor("Fumie Kumatani", "Composer", images["Fumie_Kumatani"], "VGMdb", "https://vgmdb.net/artist/256"),
        new Contributor("Yutaka Minobe", "Composer", images["YutakaMinobe"], "VGMdb", "https://vgmdb.net/artist/553"),
    ]
}

const skills={
    Humanistic:["Songwriting","Vocals"]
}

let projects = [
    new Project("Sonic Heroes Original Soundtrack", images["Sonic_Heroes"], images["Sonic_Heroes_Wallpaper"], "SonicHeroes", true, trackPaths["Frog_Forest"], descriptions.SonicHeroes, galleries.SonicHeroes,technologies.SonicHeroes, teams.SonicHeroes),
    new Project("In the Court of the Crimson King", images["In_The_Court_of_The_Crimson_King"], images["In_The_Court_of_The_Crimson_King_Wallpaper"], "ITCOTCK", true, trackPaths["The_Court_of_The_Crimson_King"]),
    new Project("Humanistic", images["Humanistic"], images["Humanistic_Demos"], "Humanistic", true, trackPaths["Start_Over"],"", [], [], [],links.Humanistic,skills.Humanistic),
    new Project("The Future Bites", images["The_Future_Bites"], images["The_Future_Bites_Wallpaper"], "TFB", true, trackPaths["12_THINGS_I_FORGOT"]),
    new Project("In Absentia", images["In_Absentia_Right"], images["In_Absentia_Right"], "IA", true, trackPaths["Dot 3"]),
    new Project("Recordings", images["Recordings"], images["Recordings"], "Recordings", true, trackPaths["Access_Denied"], "", [], [], teams.Recordings),
    new Project("On the Sunday of Life...", images["Sunday"], images["Sunday"], "Sunday", true, trackPaths["Radioactive_Toy"], descriptions.onTheSundayOfLife, galleries.onTheSundayOfLife, technologies.onTheSundayOfLife),
    new Project("The Dark Side of the Moon", images["TDSOTM"], images["TDSOTM_Wallpaper"], "TDSOTM", true, trackPaths["Money"]),
    new Project("The Wall", images["The_Wall"], images["The_Wall_Wallpaper"], "TheWall", true, trackPaths["Comfortably_Numb"]),
    new Project("Mega Man X4 Sound Collection", images["X4"], images["X4_Wallpaper"], "X4", true, trackPaths["Split_Mushroom_Stage"]),

    new Project("Stupid Dream", images["Stupid_Dream"], images["Stupid_Dream"], "StupidDream", false, null),
    new Project("The Sky Moves Sideways", images["skymovesideways"], images["skymovesideways"], "TSMS", false, null),
    new Project("Lightbulb Sun", images["Lightbulb_Sun"], images["Lightbulb_Sun"], "LightbulbSun", false, null),
    new Project("Fear of a Blank Planet", images["FOABP"], images["FOABP Img 1"], "FOABP", false, null),

]

// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));

//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }

//     return array;
// }

// projects = shuffleArray(projects)


export default projects.slice(0, 7);