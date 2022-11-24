    
    async function getData() {
        const data = await fetch('../../data/photographers.json')
        .then(result => result.json())
        .catch(error => error)
        return data
    }

    function displayData(photographers) {
        console.log(photographers)
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = new PhotographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.innerHTML += userCardDOM
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getData();
        console.log(photographers)
        displayData(photographers);
    };
    
    init();
    