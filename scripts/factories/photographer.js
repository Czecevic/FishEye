class PhotographerFactory{
    constructor(data) { 
        this.name = data.name;
        this.id = data.id;
        this.portrait = data.portrait;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
    }

    // const picture = `assets/photographers/${portrait}`;

    getUserCardDOM() {
        return `
            <article class='photographer'>
                <a href="./photographer.html?id=${this.id}">
                    <img src="./assets/photographers/${this.portrait}"/>
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
}

