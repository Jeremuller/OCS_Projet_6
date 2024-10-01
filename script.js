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

            filmTitleElement.textContent = bestFilm.title;
            console.log(filmTitleElement.textContent);
            filmImageElement.src = bestFilm.image_url;

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
                        filmTitleElement.textContent = film.title;
                        filmImageElement.src = film.image_url;
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

getBestFilm();
getGenreFilms('mystery');
getGenreFilms('action');
getGenreFilms('comedy');