class MediaFactory {
    constructor(data) {
        console.log(data)
        if (data.image) {
            return new Image(data)
        } else if (data.video) {
            return new Video(data)
        }

    }


}

class Image {
    constructor(data) {
        Object.assign(this, data)
    }
    
    createImage() {
		return `
        <figure class="photographer-page__gallery__card" aria-label="${this.title} closeup view">
            <img loading="lazy" tabindex="5" src="../assets/medias/${this.photographerId}/${this.image}" alt="${this._imgAlt}" />
            <footer class="photographer-page__gallery__media__footer">
                <figcaption class="photographer-page__gallery__media__footer__figcaption">${this.title}</figcaption>
                <div class="photographer-page__gallery__media__footer__like-section">
                    <p class="photographer-page__gallery__media__footer__like-section-counter">${this.likes}</p>
                    <button class="photographer-page__gallery__media__footer__like-section-button focus__element-secondary" title="J'aime" tabindex="5" aria-label="Ajouter un j'aime"><i class="far fa-heart" aria-hidden="true"></i></button>
                </div>
            </footer>
        </figure>
        `;
    }

}

class Video {
    constructor(data) {
        Object.assign(this, data)
    }

}

