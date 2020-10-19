import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;

export let mainMenu = {
    elem: $("#MainMenu"),
    previewStatic: $("#previewStatic"),
    jobTitleElm: $("#JobTitle"),
    jobtitles: ['Software Engineer', 'Full Stack Developer', 'Game Developer', 'Creative Spirit'],

    jobTitleIndex: 0,
    writeDuration: 100,
    deleteDuration: 50,
    waitDuration: 2000,

    typeJobTitle: function() {
        if (!this.jobtitles[this.jobTitleIndex]) {
            this.jobTitleIndex = 0;
        }

        const currentTitle = this.jobtitles[this.jobTitleIndex];

        currentTitle.split();

        let printedText = '';
        let currentChar = 0;


        let int1 = setInterval(() => {
            if (currentTitle[currentChar]) {
                //Print text if there are characters left
                printedText += currentTitle[currentChar++];
                this.jobTitleElm.text(printedText)

            } else {
                //Go to the next job title
                this.jobTitleIndex++;

                setTimeout(() => {
                    this.deleteMessage(printedText);
                }, this.waitDuration);
                clearInterval(int1);
            }
        }, this.writeDuration);

    },

    deleteMessage: function(str) {
        let int = setInterval(() => {
            if (str.length !== 0) {

                str = str.split('');
                str.pop();
                str = str.join('');

                this.jobTitleElm.text(str)
            } else {


                setTimeout(() => {
                    this.typeJobTitle();
                }, this.waitDuration);
                clearInterval(int);
            }
        }, this.deleteDuration);
    },

    staticFlicker: (duration) => {
        mainMenu.previewStatic.fadeTo(duration / 2, 0.2).fadeTo(duration / 2, 0.7);
    },
    control: function() {
        setTimeout(() => {
            this.elem.fadeIn(3000);
            setTimeout(() => {
                this.staticFlicker(2500);
                this.typeJobTitle();
                setInterval(() => {
                    this.staticFlicker(2500);
                }, 2750);
            }, 3000);

        }, 3000);


    }
};