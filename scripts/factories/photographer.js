class PhotographerFactory{
    constructor(data) {
        Object.assign(this, data)
    }
å
    getUserCardDOM() {
        return `
            <article class='photographer'>
                <a href="./photographer.html?id=${this.id}">
                    <img class="PhotographerIndexPage" src="./assets/photographers/${this.portrait}"/>
                    <h2>${this.name}</h2>
                </a>
                <div class='détail'>
                    <h4>${this.city}, ${this.country}</h4>
                    <h5>${this.tagline}</h5>
                    <h6>${this.price}€/jour</h6>
                </div>
            </article>
        `
    }

    getHeaderPhotographer() {
        return `
        <div class="photographProfile_detail">
        <h1 class="titlePhotographe">${this.name}</h1>
        <h4>${this.city}, ${this.country}</h4>
        <h5>${this.tagline}</h5>
        </div>
        <button class="contact_button" onclick="displayModal()" id="contact_modal">Contactez-moi</button>
        <img src='./assets/photographers/${this.portrait}'/>
        `
    }

    

}

// rajouter le contact

