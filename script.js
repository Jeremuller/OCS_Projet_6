const apiUrl = "http://localhost:8000/api/v1"

function getBestFilm() {
    let usedApi = apiUrl + "/titles?sort_by=-imdb_score"
    console.log("Fetching " + usedApi);
    fetch(usedApi)
        .then(response => { 
            if(!response.ok){
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then (data => {
            console.log("Data processed: ", data);

            const bestFilm = data.results[0];

            const filmTitleElement = document.querySelector("#best_film h3");
            const filmImageElement = document.querySelector("#best_film img");
            const detailsButtonElement = document.querySelector("#best-film-button");


            filmTitleElement.textContent = bestFilm.title;
            console.log(filmTitleElement.textContent);
            filmImageElement.src = bestFilm.image_url;

            detailsButtonElement.setAttribute("data-id", bestFilm.id);

            return fetch(`${apiUrl}/titles/${bestFilm.id}`);
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Network reponse was not ok" + response.statusText);
            }
            return response.json();
        })
        .then(bestFilmDetails => {
            const filmDescriptionElement = document.querySelector("#best_film p");
            filmDescriptionElement.textContent = bestFilmDetails.description;
            console.log(bestFilmDetails.description);
        })
        .catch(error => {
            console.error("Failed to get best film\'s datas");
        });
}

function getGenreFilms(genre) {
    let usedApi = apiUrl + `/titles?sort_by=-imdb_score&genre=${genre}&page_size=6`;
    console.log(`Fetching films for genre: ${genre}`);

    fetch(usedApi)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json()    
        })
        .then(data => {
            console.log("Data processed for genre " + genre + ": ", data);
            const films = data.results;

            const filmContainers = document.querySelectorAll(`#${genre} .col-4`)

            films.forEach((film, index) => {
                if (index < filmContainers.length) {
                    const filmContainer = filmContainers[index];
                    const filmTitleElement = filmContainer.querySelector(".film-title");
                    const filmImageElement = filmContainer.querySelector("img");
                    
                    if (filmTitleElement && filmImageElement) {
                        filmTitleElement.innerText = film.title;
                        filmImageElement.src = film.image_url;
                        filmImageElement.onerror = function() {
                            filmImageElement.src = "https://picsum.photos/200/300";
                        };
                    } else {
                        console.error(`Title or image element not found for film index ${index} in genre ${genre}`);
                    }    
                } else {
                    console.error(`Element not found for genre ${genre}, film index ${index}`)
                }

            }); 
        })    
        .catch(error => {
            console.error("Failed to get " + genre + " films' data");
        });
}

function getModalElements(filmId) {
    const usedApi = apiUrl + "/titles/" + filmId

    console.log("Fetching film details for film ID:", filmId);

    fetch(usedApi)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok" + response.statusText);
            }
            return response.json();
        })
        .then(filmDetails => {
            console.log("Film details fetched:", filmDetails);

            document.getElementById("modalFilmTitle").textContent = filmDetails.title;
            document.getElementById("film-year").textContent = filmDetails.year;
            document.getElementById("film-genres").textContent = filmDetails.genres.join(", ");
            document.getElementById("parental-accord").textContent = filmDetails.parental_guidance;
            document.getElementById("film-duration").textContent = filmDetails.duration;
            document.getElementById("film-languages").textContent = filmDetails.languages.join(", ");
            document.getElementById("imdb-score").textContent = filmDetails.imdb_score;
            document.getElementById("film-director").textContent = ("Directed by: ") + filmDetails.director;
            document.getElementById("filmDescription").textContent = filmDetails.description;
            document.getElementById("filmActors").textContent = ("With: ") + filmDetails.actors.join(", ");

            const modalImageElement = document.querySelector(".modalFilmImage");
            modalImageElement.src = filmDetails.image_url;
        })
        .catch(error => {
            console.error("Failed to fetch film details:", error);
        });
}

document.querySelectorAll(".show-more-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const container = button.closest(".row");
        const hiddenMobileFilms = container.querySelectorAll(".hidden-mobile");
        const hiddenTabletteFilms = container.querySelectorAll(".hidden-tablette")


        if (button.textContent === "Show more") {
            hiddenMobileFilms.forEach(function(el) {
                el.classList.remove("d-sm-none");
                el.style.display = "block";
            });
            hiddenTabletteFilms.forEach(function(el) {
                el.classList.remove("d-md-none");
                el.classList.remove("d-sm-none");
                el.style.display = "block";
            });
            button.textContent = "Show less";

        } else {
            hiddenMobileFilms.forEach(function(el) {
                el.classList.add("d-sm-none");
                el.style.display = "none";
            });
            hiddenTabletteFilms.forEach(function(el) {
                el.classList.add("d-md-none");
                el.classList.add("d-sm-none");
                el.style.display = "none";
            })
            button.textContent = "Show more";
        }    
    });     
});

const detailButtons = document.querySelectorAll("button[data-bs-toggle='modal']");

detailButtons.forEach(button => {
    button.addEventListener("click", function() {
        const filmId = this.getAttribute("data-id");
        getModalElements(filmId);
    });    
});

getBestFilm();
getGenreFilms('mystery');
getGenreFilms('action');
getGenreFilms('comedy');