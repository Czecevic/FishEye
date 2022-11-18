    
    async function getPhotographers() {
        const data = await fetch('../../data/photographers.json')
        .then(result => result.json())
        .catch(error => error)
        let data_pht = data.photographers
        let tab_pht = []
        data_pht.forEach(elem => {
            const photographers = [
                {
                    "name": `${elem.name}`,
                    "id": `${elem.id}`,
                    "city": `${elem.city}`,
                    "country": `${elem.country}`,
                    "tagline": `${elem.tagline}`,
                    "price": `${elem.price}`,
                    "portrait": `${elem.portrait}`
                },
            ]
            tab_pht.push(photographers)
        })
        // console.log({photographers : [...tab_pht]})
        return {photographers : [...tab_pht]}
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            console.log(...photographer)
            const photographerModel = photographerFactory(...photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    