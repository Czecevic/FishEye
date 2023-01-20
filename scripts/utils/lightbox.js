class Lightbox {
    constructor() {
    this.medias = document.querySelectorAll('#photographerPageGallery img, source');
    this.lightbox = document.querySelector('#lightbox');
    this.title = document.querySelector('figcaption');
    this.lightboxImg = document.querySelector('#lightboxImage');
    this.createImage = document.createElement('img');
    this.titleMedia = document.createElement('h1');
    this.createMovie = document.createElement('video');
    this.arrowLeft = document.querySelector('.fa-arrow-left');
    this.arrowRight = document.querySelector('.fa-arrow-right');
    this.btnClose = document.querySelector('.close-button i');
    this.imgIndex = 0;
    }
    
    init() {
    this.medias.forEach((media) => {
    media.addEventListener('click', (e) => {
    if (media.src.endsWith('.jpg') == true) {
    this.lightbox.classList.add('active');
    this.createImage.src = media.src;
    this.imgIndex = [...this.medias].indexOf(media);
    this.lightbox.style.display = "flex";
    this.lightboxImg.appendChild(this.createImage);
    this.titleMedia.innerHTML = media.alt;
    this.lightboxImg.appendChild(this.titleMedia);
    } else {
    this.createMovie.src = media.src;
    this.imgIndex = [...this.medias].indexOf(media);
    this.lightbox.style.display = "flex";
    this.lightboxImg.appendChild(this.createMovie);
    }
    this.arrowLeft.addEventListener('click', () => {
    this.imgIndex--;
    if (this.imgIndex < 0) {
    this.imgIndex = this.medias.length - 1;
    }
    this.createImage.src = this.medias[this.imgIndex].src;
    });
        this.arrowRight.addEventListener('click', () => {
          this.imgIndex++;
          if (this.imgIndex > this.medias.length - 1) {
            this.imgIndex = 0;
          }
          this.createImage.src = this.medias[this.imgIndex].src;
        });
    
        this.btnClose.addEventListener('click', () => {
          if (e.target !== e.currentTarget) return this.lightbox.style.display = "none";
        });
      });
    });
    }
}
const lightbox = new Lightbox();
lightbox.init();