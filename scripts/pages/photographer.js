
async function getData() {
    const data = await fetch('../../data/photographers.json')
    .then(result => result.json())
    .catch(error => error)
    return data
}

const filterOption = (mediaPhotographer, option) => {
    switch(option) {
        case "popularite":
            return mediaPhotographer.sort((a, b) => {
                return b.likes - a.likes;
            })
        case "date":
            return mediaPhotographer.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            })
        case "title":
            return mediaPhotographer.sort((a, b) => a.title.localeCompare(b.title))
        default:
            return mediaPhotographer.sort((a, b) => {
                return b.likes - a.likes;
            })
    }
};

const updateGallery = (allMedia) => {
    const photographerPageGallery = document.querySelector('photographerPageGallery')
    allMedia.forEach(media => {
        let medias = new MediaFactory(media);
        // photographerPageGallery.innerHTML += media.creatHTML()
    });
}

const init = async () => {
    // faire une fonction pour le rendre moins gros
    const add = document.querySelector('div')
    const id = document.location.search.split('=')[1];
    const {photographers, media} = await getData()
    const searchPhotographer = photographers.filter(photographer => photographer.id == id)
    const Photographer = new PhotographerFactory(searchPhotographer[0])

    const getHeaderPhotographer = Photographer.getHeaderPhotographer()
    add.innerHTML += getHeaderPhotographer
    // faire une fonction pour appeller ceci
    const searchMediaPhotographer = media.filter(picture => picture.photographerId == id)
    updateGallery(searchMediaPhotographer)


}


init();


// finir updateGallery en parcourant 

// faire marcher le "select" traiter les image importer / upload
// 1 - trier par popularité ()
// 2 - trier les images que l'on obtient
// 
// ajouter un event



