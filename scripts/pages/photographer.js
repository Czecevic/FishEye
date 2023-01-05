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
            likeCounter.innerHTML = likeSum
        })
        let NumberLike = parseInt(likeButton.innerText)
        likeSum += NumberLike
        likeCounter.innerHTML = likeSum
    })

}

const lightbox = () => {
    const medias = document.querySelectorAll('#photographerPageGallery img')
    const lightbox = document.querySelector('#lightbox')
    const lightboxImg = document.querySelector('#lightboxImage')
    const createImage = document.createElement('img');
    const arrowLeft = document.querySelector('.fa-arrow-left')
    const arrowRight = document.querySelector('.fa-arrow-right')
    let imgIndex = 0
    medias.forEach(media => {
        media.addEventListener('click', e => {
            lightbox.classList.add('active')
            createImage.src = media.src;
            imgIndex = [...medias].indexOf(media)
            lightbox.style.display = "flex";
            lightboxImg.appendChild(createImage)
            
            arrowLeft.addEventListener('click', () => {
                imgIndex--;
                if(imgIndex < 0) {
                    imgIndex = medias.length - 1;
                }
                console.log(images[imgIndex])
                createImage.src = images[imgIndex].src
            })
        
            arrowRight.addEventListener('click', () => {
                imgIndex++;
                if(imgIndex > medias.length - 1) {
                    imgIndex = 0;
                }
                createImage.src = medias[imgIndex].src
            })
        })
    })
    // changer en croix
    // jouer avec les tabulations (key entrer pour acceder à une image)
    // gerer les alt pour le screen reader
    window.addEventListener('click', e => {
        if(e.target.classList.contains('lightbox')) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.display = "none";
            }, 350)
        }
    })

}


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
    })
    lightbox()
}


init();



