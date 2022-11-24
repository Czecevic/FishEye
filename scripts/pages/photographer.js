async function getData() {
    const data = await fetch('../../data/photographers.json')
    .then(result => result.json())
    .catch(error => error)
    return data
}

const phtPersonne = (photographer) => {
    const pht = photographer[0]
    console.log(pht.portrait)
    return `
    <h1>${pht.name}</h1>
    <img src='./assets/photographers/${pht.portrait}'/>
    <div class='détail'>
    <h4>${pht.city}, ${pht.country}</h4>
    <h5>${pht.tagline}</h5>
    </div>
    `
}

const phtImageAndVideo = () => {
    console.log(document.getElementById('contact_modal'))

}

const init = async () => {
    const add = document.querySelector('div')
    console.log(add)
    const id = document.location.search.split('=')[1];
    const {photographers} = await getData()
    //console.log(photographers)
    const searchPhotographer = photographers.filter(photographer => photographer.id == id)
    console.log(searchPhotographer)
    add.innerHTML += phtPersonne(searchPhotographer)
    phtImageAndVideo()

}


init();