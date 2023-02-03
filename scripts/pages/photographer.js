const photographerPageGallery = document.getElementById(
  "photographerPageGallery"
);

async function getData() {
  const data = await fetch("./data/photographers.json")
    .then((result) => result.json())
    .catch((error) => error);
  return data;
}

const filterOption = (mediaPhotographer, option) => {
  switch (option) {
    case "popularity":
      return mediaPhotographer.sort((a, b) => {
        return b.likes - a.likes;
      });
    case "date":
      return mediaPhotographer.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    case "title":
      return mediaPhotographer.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return mediaPhotographer.sort((a, b) => {
        return b.likes - a.likes;
      });
  }
};

const updateGallery = (allMedia) => {
  allMedia.forEach((media) => {
    let medias = new MediaFactory(media);
    photographerPageGallery.innerHTML += medias.createImageOrMovie();
  });
  likeMedia();
};

const likeMedia = () => {
  let likeSum = 0;
  const likeButtons = document.querySelectorAll(".likeButton");
  const likeCounter = document.querySelector(".LikeCounter");
  likeButtons.forEach((likeButton) => {
    const likeButtonStatic = parseInt(likeButton.firstElementChild.innerHTML);
    likeButton.addEventListener("click", (event) => {
      likeButton.lastElementChild.classList.toggle("dontSeeDislike");
      likeButton.querySelectorAll("i")[0].classList.toggle("dontSeeDislike");
      let newLike = parseInt(likeButton.firstElementChild.innerHTML) + 1;
      if (newLike > likeButtonStatic + 1) {
        newLike = parseInt(likeButton.firstElementChild.innerHTML) - 1;
        likeSum -= 1;
      } else {
        likeSum += 1;
      }
      likeButton.firstElementChild.innerHTML = newLike;
      likeCounter.innerHTML =
        likeSum +
        '<i class="fa-solid fa-heart" style="margin-right:100px"></i> 300$ / jour';
    });
    let NumberLike = parseInt(likeButton.innerText);
    likeSum += NumberLike;
    likeCounter.innerHTML =
      likeSum +
      '<i class="fa-solid fa-heart" style="margin-right:100px"></i> 300$ / jour';
  });
};

const lightbox = () => {
  const medias = document.querySelectorAll(
    "#photographerPageGallery img, video"
  );
  const lightbox = document.querySelector("#lightbox");
  const lightboxMedia = document.querySelector("#lightboxMedia");
  const createImage = document.createElement("img");
  const titleMedia = document.createElement("h1");
  const createMovie = document.createElement("video");
  createMovie.setAttribute("controls", "controls");
  const arrowLeft = document.querySelector(".fa-arrow-left");
  const arrowRight = document.querySelector(".fa-arrow-right");
  const btnClose = document.querySelector(".close-button i");
  const mediaLength = medias.length;
  medias.forEach((media) => {
    media.addEventListener("click", (e) => {
      let mediaIndex = 0;
      lightbox.classList.add("active");
      mediaIndex = [...medias].indexOf(media);
      if (media instanceof HTMLImageElement) {
        createImage.src = media.src;
        createImage.alt = media.alt;
        titleMedia.innerHTML = media.alt;
        lightboxMedia.appendChild(createImage);
        lightboxMedia.appendChild(titleMedia);
        createMovie.style.display = "none";
        createImage.style.display = "block";
      } else {
        createMovie.src = media.children[0].src;
        titleMedia.innerHTML = media.title;
        lightboxMedia.appendChild(createMovie);
        lightboxMedia.appendChild(titleMedia);
        createMovie.style.display = "block";
        createImage.style.display = "none";
      }
      lightbox.style.display = "flex";

      // clique fleche gauche
      arrowLeft.addEventListener("click", () => {
        mediaIndex--;
        if (mediaIndex < 0) {
          mediaIndex = medias.length - 1;
        }
        lightboxWithArrow(
          lightboxMedia,
          createImage,
          titleMedia,
          createMovie,
          mediaIndex,
          medias
        );
      });
      // clique fleche droite
      arrowRight.addEventListener("click", () => {
        mediaIndex++;
        if (mediaIndex > medias.length - 1) {
          mediaIndex = 0;
        }
        lightboxWithArrow(
          lightboxMedia,
          createImage,
          titleMedia,
          createMovie,
          mediaIndex,
          medias
        );
      });
      // clique close button
      btnClose.addEventListener("click", () => {
        if (e.target !== e.currentTarget) {
          createImage.remove();
          createMovie.remove();
          titleMedia.remove();
          return (lightbox.style.display = "none");
        }
      });
      document.addEventListener("keydown", (event) => {
        switch (event.code) {
          case "ArrowLeft":
            mediaIndex = (mediaIndex - 1 + mediaLength) % mediaLength;
            lightboxWithArrow(
              lightboxMedia,
              createImage,
              titleMedia,
              createMovie,
              mediaIndex,
              medias
            );
            break;
          case "ArrowRight":
            mediaIndex = (mediaIndex + 1) % mediaLength;
            lightboxWithArrow(
              lightboxMedia,
              createImage,
              titleMedia,
              createMovie,
              mediaIndex,
              medias
            );
            break;
          case "Escape":
            createImage.remove();
            createMovie.remove();
            titleMedia.remove();
            lightbox.style.display = "none";
            break;
        }
      });
    });
    media.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        let mediaIndex = 0;
        lightbox.classList.add("active");
        mediaIndex = [...medias].indexOf(media);
        if (media instanceof HTMLImageElement) {
          createImage.src = media.src;
          createImage.alt = media.alt;
          titleMedia.innerHTML = media.alt;
          lightboxMedia.appendChild(createImage);
          lightboxMedia.appendChild(titleMedia);
          createMovie.style.display = "none";
          createImage.style.display = "block";
        } else {
          createMovie.src = media.children[0].src;
          lightboxMedia.appendChild(createMovie);
          titleMedia.innerHTML = media.title;
          lightboxMedia.appendChild(titleMedia);
          createMovie.style.display = "block";
          createImage.style.display = "none";
        }
        lightbox.style.display = "flex";

        // clique fleche gauche
        arrowLeft.addEventListener("click", () => {
          mediaIndex--;
          if (mediaIndex < 0) {
            mediaIndex = medias.length - 1;
          }
          lightboxWithArrow(
            lightboxMedia,
            createImage,
            titleMedia,
            createMovie,
            mediaIndex,
            medias
          );
        });
        // clique fleche droite
        arrowRight.addEventListener("click", () => {
          mediaIndex++;
          if (mediaIndex > medias.length - 1) {
            mediaIndex = 0;
          }
          lightboxWithArrow(
            lightboxMedia,
            createImage,
            titleMedia,
            createMovie,
            mediaIndex,
            medias
          );
        });
        // clique close button
        btnClose.addEventListener("click", () => {
          if (e.target !== e.currentTarget) {
            createImage.remove();
            createMovie.remove();
            titleMedia.remove();
            return (lightbox.style.display = "none");
          }
        });
        document.addEventListener("keydown", (event) => {
          switch (event.code) {
            case "ArrowLeft":
              mediaIndex = (mediaIndex - 1 + mediaLength) % mediaLength;
              lightboxWithArrow(
                lightboxMedia,
                createImage,
                titleMedia,
                createMovie,
                mediaIndex,
                medias
              );
              break;
            case "ArrowRight":
              mediaIndex = (mediaIndex + 1) % mediaLength;
              lightboxWithArrow(
                lightboxMedia,
                createImage,
                titleMedia,
                createMovie,
                mediaIndex,
                medias
              );
              break;
            case "Escape":
              createImage.remove();
              createMovie.remove();
              titleMedia.remove();
              lightbox.style.display = "none";
              break;
          }
        });
      }
    });
  });
};

const lightboxWithArrow = (
  lightboxMedia,
  image,
  title,
  movie,
  index,
  medias
) => {
  if (lightboxMedia.children[2] !== undefined) {
    lightboxMedia.children[2].remove();
    lightboxMedia.children[2].remove();
  }
  if (medias[index] instanceof HTMLImageElement) {
    image.src = medias[index].src;
    image.alt = medias[index].alt;
    title.innerHTML = medias[index].alt;
    lightboxMedia.appendChild(image);
    lightboxMedia.appendChild(title);
    title.innerHTML = medias[index].alt;
    movie.remove();
    image.style.display = "block";
  } else {
    movie.src = medias[index].children[0].src;
    title.innerHTML = medias[index].title;
    lightboxMedia.appendChild(movie);
    lightboxMedia.appendChild(title);
    image.remove();
    movie.style.display = "block";
  }
};

// jouer avec les tabulations (key entrer pour acceder à une image)
// gérer la touche entrer / les fleches directionnels / echappe pour quitter la lightbox

let installEventArrows = 0;

const init = async () => {
  // faire une fonction pour le rendre moins gros
  const { photographers, media } = await getData();
  const add = document.getElementById("photographProfile");
  const id = document.location.search.split("=")[1];
  const searchPhotographer = photographers.filter(
    (photographer) => photographer.id == id
  );
  const Photographer = new PhotographerFactory(searchPhotographer[0]);
  const getHeaderPhotographer = Photographer.getHeaderPhotographer();
  add.innerHTML += getHeaderPhotographer;
  // faire une fonction pour appeller ceci
  const searchMediaPhotographer = media.filter(
    (picture) => picture.photographerId == id
  );
  updateGallery(searchMediaPhotographer);
  // const selectPhotographerMedia = document.querySelector('select')
  document.addEventListener("change", (event) => {
    photographerPageGallery.innerHTML = "";
    let value_option = event.target.value;
    const sortedMedia = filterOption(searchMediaPhotographer, value_option);
    updateGallery(sortedMedia);
    lightbox();
  });
  installDisplayModal();
  lightbox();
};

init();
