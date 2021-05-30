

const rightArrow= document.querySelector("#imageArrowRight");
const leftArrow= document.querySelector("#imageArrowLeft");
const hideButton = document.querySelector("#hideImageOverlayBtn");

export default imageOverlay = {
    element: document.querySelector("#imageOverlay"),
    imageElement: document.querySelector("#imgOverlayContainer > img"),
    images: [
        "https://wallpapercave.com/wp/wp3721686.jpg",
        "https://wallpapercave.com/wp/uQm01CP.jpg",
        "https://wallpapercave.com/wp/74qLuqS.jpg",
        "https://4.bp.blogspot.com/-6HyvCP-NLoA/TVM3ecvJXMI/AAAAAAAAEvc/r59XnFkL9jE/s1600/Inside%2BAlbum.jpg",
        "https://neuralrustsite.files.wordpress.com/2017/05/1992_otsol_alt.jpg?w=2000&h=1200&crop=1",
        "https://cdn.wallpapersafari.com/25/86/mwjR02.jpg",
        "https://getwallpapers.com/wallpaper/full/3/2/1/387641.jpg"
    ],
    currentImageIndex: 0,

    receiveImages(images, index) {
        this.images = images;
        this.index = index

        this.showImage();
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

imageOverlay.showImage();



rightArrow.addEventListener("click", ()=>{
    imageOverlay.goRight();
})

leftArrow.addEventListener("click", ()=>{
    imageOverlay.goLeft();
})

hideButton.addEventListener("click",()=>{
    imageOverlay.hide();
})

