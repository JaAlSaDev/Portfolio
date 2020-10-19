import jQuery from "./jQuery";
window.$ = window.jQuery = jQuery;

export let mainMenu = {
    elem: $("#MainMenu"),
    previewStatic: $("#previewStatic"),

    jobTitle: {
        elem: $("#JobTitle"),
        list: ['Software Engineer', 'Full Stack Developer', 'Game Developer', 'Creative Spirit'],
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
        mainMenu.previewStatic.fadeTo(duration / 2, 0.2).fadeTo(duration / 2, 0.7);
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