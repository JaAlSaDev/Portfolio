

const rightArrow = document.querySelector("#imageArrowRight");
const leftArrow = document.querySelector("#imageArrowLeft");
const hideButton = document.querySelector("#hideImageOverlayBtn");

 const imageOverlay = {
    element: document.querySelector("#imageOverlay"),
    imageElement: document.querySelector("#imgOverlayContainer > img"),
    images: [
    ],
    currentImageIndex: 0,

    receiveImages(images, index) {
        this.images = images;
        this.currentImageIndex = index

        this.showImage();

        this.show();
    },

    showImage() {
        this.imageElement.src = this.images[this.currentImageIndex];
    },

    show() {
        this.element.style.display = 'flex';
    },

    hide() {
        this.element.style.display = 'none';
    },

    goRight() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;

        this.showImage();
    },


    goLeft() {
        this.currentImageIndex = this.currentImageIndex - 1;


        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.images.length - 1;
        }

        this.showImage();
    }

}


rightArrow.addEventListener("click", () => {
    imageOverlay.goRight();
})

leftArrow.addEventListener("click", () => {
    imageOverlay.goLeft();
})

hideButton.addEventListener("click", () => {
    imageOverlay.hide();
})


export default imageOverlay;
