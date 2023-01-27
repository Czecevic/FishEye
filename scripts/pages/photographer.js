const photographerPageGallery = document.getElementById('photographerPageGallery')


async function getData() {
    const data = await fetch('../../data/photographers.json')
    .then(result => result.json())
    .catch(error => error)
    return data
}

const filterOption = (mediaPhotographer, option) => {
    switch(option) {
        case "popularity":
            return mediaPhotographer.sort((a, b) => {
                return b.likes - a.likes;
            })
        case "date":
            return mediaPhotographer.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            })
            case "title":
            return mediaPhotographer.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return mediaPhotographer.sort((a, b) => {
                return b.likes - a.likes;
            })
    }
};



const updateGallery = (allMedia) => {
    allMedia.forEach((media) => {
        let medias = new MediaFactory(media);
        //console.log(photographerPageGallery)
        photographerPageGallery.innerHTML += medias.createImageOrMovie()
    });
    likeMedia()
}

const likeMedia = () => {
    let likeSum = 0
    const likeButtons = document.querySelectorAll('.likeButton')
    const likeCounter = document.querySelector('.LikeCounter')
    likeButtons.forEach((likeButton) => {
        const likeButtonStatic = parseInt(likeButton.firstElementChild.innerHTML)
        likeButton.addEventListener('click', (event) => {
            likeButton.lastElementChild.classList.toggle('dontSeeDislike')
            likeButton.querySelectorAll('i')[0].classList.toggle('dontSeeDislike')
            let newLike = parseInt(likeButton.firstElementChild.innerHTML)+1
            if (newLike > likeButtonStatic+1) {
                newLike = parseInt(likeButton.firstElementChild.innerHTML)-1
                likeSum -= 1
            } else {
                likeSum += 1
            }
            likeButton.firstElementChild.innerHTML = newLike
            likeCounter.innerHTML = likeSum + '<i class="fa-solid fa-heart" style="margin-right:100px"></i> 300$ / jour'
        })
        let NumberLike = parseInt(likeButton.innerText)
        likeSum += NumberLike
        likeCounter.innerHTML = likeSum + '<i class="fa-solid fa-heart" style="margin-right:100px"></i> 300$ / jour'
    })

}

const lightbox = () => {
    const medias = document.querySelectorAll('#photographerPageGallery img, video')
    const lightbox = document.querySelector('#lightbox')
    const lightboxImg = document.querySelector('#lightboxImage')
    const createImage = document.createElement('img');
    const titleMedia = document.createElement('h1')
    const createMovie = document.createElement('video');
    createMovie.setAttribute('controls', 'controls');
    const arrowLeft = document.querySelector('.fa-arrow-left')
    const arrowRight = document.querySelector('.fa-arrow-right')
    const btnClose = document.querySelector('.close-button i')
    medias.forEach(media => {
        media.addEventListener('click', e => {
            createImage.style.display = "none";
            let mediaIndex = 0
            lightbox.classList.add('active')
            if (media instanceof HTMLImageElement) {
                createImage.src = media.src;
                createImage.alt = media.alt;
                mediaIndex = [...medias].indexOf(media)
                titleMedia.innerHTML = media.alt
                lightboxImg.appendChild(createImage)
                lightboxImg.appendChild(titleMedia)
                createMovie.style.display = "none";
                createImage.style.display = "block";
            } else {
                createMovie.src = media.children[0].src;
                mediaIndex = [...medias].indexOf(media)
                lightboxImg.appendChild(createMovie)
                titleMedia.innerHTML = media.title
                lightboxImg.appendChild(titleMedia)
                createMovie.style.display = "block";
                createImage.style.display = "none";
            }
            lightbox.style.display = "flex"
            
            arrowLeft.addEventListener('click', () => {
                mediaIndex--;
                if(mediaIndex < 0) {
                    mediaIndex = medias.length - 1;
                }
                if (medias[mediaIndex] instanceof HTMLImageElement) {
                    createImage.src = medias[mediaIndex].src
                    createImage.alt = medias[mediaIndex].alt
                    titleMedia.innerHTML = medias[mediaIndex].alt
                    lightboxImg.appendChild(createImage)
                    lightboxImg.appendChild(titleMedia)
                    titleMedia.innerHTML = media.alt
                    createMovie.style.display = "none";
                    createImage.style.display = "block";
                } else {
                    createMovie.src = medias[mediaIndex].children[0].src
                    titleMedia.innerHTML = medias[mediaIndex].title
                    lightboxImg.appendChild(createMovie)
                    lightboxImg.appendChild(titleMedia)
                    createImage.style.display = "none";
                    createMovie.style.display = "block";
                }
            })
            arrowRight.addEventListener('click', () => {
                mediaIndex++;
                if(mediaIndex > medias.length - 1) {
                    mediaIndex = 0;
                }
                if (medias[mediaIndex] instanceof HTMLImageElement) {
                    createImage.src = medias[mediaIndex].src
                    createImage.alt = medias[mediaIndex].alt
                    titleMedia.innerHTML = medias[mediaIndex].alt
                    lightboxImg.appendChild(createImage)
                    lightboxImg.appendChild(titleMedia)
                    createMovie.style.display = "none";
                    createImage.style.display = "block";
                } else {
                    createMovie.src = medias[mediaIndex].children[0].src
                    titleMedia.innerHTML = medias[mediaIndex].title
                    lightboxImg.appendChild(createMovie)
                    lightboxImg.appendChild(titleMedia)
                    createImage.style.display = "none";
                    createMovie.style.display = "block";
                }
            })
            btnClose.addEventListener('click', () => {
                if (e.target !== e.currentTarget) 
                return lightbox.style.display = "none"
            })
        })
    })
}

// jouer avec les tabulations (key entrer pour acceder à une image)
// gérer la touche entrer / les fleches directionnels / echappe pour quitter la lightbox


const init = async () => {
    // faire une fonction pour le rendre moins gros
    const {photographers, media} = await getData()
    const add = document.getElementById('photographProfile')
    const id = document.location.search.split('=')[1];
    const searchPhotographer = photographers.filter(photographer => photographer.id == id)
    const Photographer = new PhotographerFactory(searchPhotographer[0])
    const getHeaderPhotographer = Photographer.getHeaderPhotographer()
    add.innerHTML += getHeaderPhotographer
    // faire une fonction pour appeller ceci
    const searchMediaPhotographer = media.filter(picture => picture.photographerId == id)
    updateGallery(searchMediaPhotographer)
    // const selectPhotographerMedia = document.querySelector('select')
    document.addEventListener('change', (event) => {
        photographerPageGallery.innerHTML = '';
        let value_option = event.target.value
        const sortedMedia = filterOption(searchMediaPhotographer, value_option)
        updateGallery(sortedMedia)
        lightbox()
    })
    installDisplayModal()
    lightbox()
}


init();



