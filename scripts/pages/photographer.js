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
            console.log()
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
    console.log(likeSum)

}
// lightbox


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
        //console.log(value_option)
        const sortedMedia = filterOption(searchMediaPhotographer, value_option)
        //console.log(sortedMedia)
        updateGallery(sortedMedia)
    })
}


init();



