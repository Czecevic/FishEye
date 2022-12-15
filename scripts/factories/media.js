class MediaFactory {
    constructor(data) {
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
    
    createImageOrMovie() {
		return `
        <figure aria-label="${this.title}">
            <img src="../assets/SamplePhotos/${this.photographerId}/${this.image}" alt="${this.image}" />
                <figcaption>${this.title}</figcaption>
                <div>
                    <p>${this.likes}</p>
                    <button title="J'aime" aria-label="Ajouter un j'aime">
                        <i class="far fa-heart">like</i>
                    </button>
                </div>
        </figure>
        `;
    }

}

class Video {
    constructor(data) {
        Object.assign(this, data)
    }

    createImageOrMovie() {
        return `
        <figure>
            <video controls tabindex="5">
                <source src="../assets/SamplePhotos/${this.photographerId}/${this.video}"/>
            </video>
                <figcaption>${this.title}</figcaption>
                <div>
                    <p>${this.likes}</p>
                    <button>
                        <i class="far fa-heart" aria-hidden="true">like</i>
                    </button>
                </div>
        </figure>
        `;
    }

}

