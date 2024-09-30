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
    let usedApi = apiUrl + `/titles?sort_by=-imdb_score&genre=${genre}`;
    console.log("Fetching " + usedApi);
    fetch(usedApi)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json()    
        })
        .then(data => {
            console.log("Data processed for genre " + genre + ": ", data);
            const films = data.results.slice(0, 6);

            for (let i = 0; i < films.length; i++) {
                const film = films[i];
                const filmTitleElement = document.querySelector(`#${genre} .film-overlay:nth-child(${i+1}) .film-title`);
                const filmImageElement = document.querySelector(`#${genre} img:nth-child(${i +1})`);

                filmTitleElement.textContent = film.title;
                filmImageElement.src = film.image_url;
            }
        })    
        .catch(error => {
            console.error("Failed to get " + genre + " films' data");
        });
}

getBestFilm();
getGenreFilms('mystery');
getGenreFilms('action');
getGenreFilms('comedy');