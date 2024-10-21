// Base API URL for fetching film data
const apiUrl = "http://localhost:8000/api/v1"

/**
 * Fetches the best-rated film from the API and updates the homepage with its data.
 */

function getBestFilm() {
    let usedApi = apiUrl + "/titles?sort_by=-imdb_score"
    console.log("Fetching " + usedApi);

    // Fetch the best-rated films
    fetch(usedApi)
        .then(response => { 
            if(!response.ok){
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then (data => {
            console.log("Data processed: ", data);

            const bestFilm = data.results[0]; // Get the highest-rated film

            // Update the DOM elements with the best film's title and image
            const filmTitleElement = document.querySelector("#best_film h3");
            const filmImageElement = document.querySelector("#best_film img");
            const detailsButtonElement = document.querySelector("#best-film-button");


            filmTitleElement.textContent = bestFilm.title;
            console.log(filmTitleElement.textContent);
            filmImageElement.src = bestFilm.image_url;

            detailsButtonElement.setAttribute("data-id", bestFilm.id);

            // Fetch additional details for the selected best film
            return fetch(`${apiUrl}/titles/${bestFilm.id}`);
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Network reponse was not ok" + response.statusText);
            }
            return response.json();
        })
        .then(bestFilmDetails => {

            // Update the description with more details about the best film
            const filmDescriptionElement = document.querySelector("#best_film p");
            filmDescriptionElement.textContent = bestFilmDetails.description;
            console.log(bestFilmDetails.description);
        })
}
/**
 * Fetches a list of films for a specific genre and modify the corresponding section on the page.
 * @param {string} genre - The film genre to fetch.
 * @param {string} containerId - The ID of the container where the films will be displayed.
 */

function getGenreFilms(genre, containerId = `#${genre}`) {
    let usedApi = apiUrl + `/titles?sort_by=-imdb_score&genre=${genre}&page_size=6`;
    console.log(`Fetching films for genre: ${genre}`);
    console.log(`API URL: ${usedApi}`);

    // Fetch films for the specified genre
    return fetch(usedApi)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json()    
        })
        .then(data => {
            console.log("Data processed for genre " + genre + ": ", data);
            const films = data.results;

            // Select film containers in the DOM
            const filmContainers = document.querySelectorAll(`${containerId} .col-4`)

            // Modify each film container with film data
            films.forEach((film, index) => {
                if (index < filmContainers.length) {
                    const filmContainer = filmContainers[index];
                    const filmTitleElement = filmContainer.querySelector(".film-title");
                    const filmImageElement = filmContainer.querySelector("img");
                    const detailsButtonElement = filmContainer.querySelector(".film-button");
                    
                    if (filmTitleElement && filmImageElement && detailsButtonElement) {
                        filmTitleElement.innerText = film.title;
                        detailsButtonElement.setAttribute("data-id", film.id);
                        filmImageElement.src = film.image_url;

                        // Set a fallback image in case the film image fails to load
                        filmImageElement.onerror = function() {
                            filmImageElement.src = "https://picsum.photos/200/300";
                        };
                    } else {
                        // Hide containers if elements are missing
                        filmContainer.classList.add("d-none")
                        console.error(`Title or image element not found for film index ${index} in genre ${genre}`);
                    }    
                } else {
                    console.error(`Element not found for genre ${genre}, film index ${index}`)
                }

            }); 
        })    
}

/**
 * Fetches details for a specific film and updates the modal with that information.
 * @param {string} filmId - The ID of the film to fetch details for.
 */

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

            // Locate and update modal elements with film details
            document.getElementById("modalFilmTitle").textContent = filmDetails.title;
            document.getElementById("film-year").textContent = filmDetails.year;
            document.getElementById("film-genres").textContent = filmDetails.genres.join(", ");
            document.getElementById("parental-accord").textContent = filmDetails.parental_guidance;
            document.getElementById("film-duration").textContent = filmDetails.duration + (" min");
            document.getElementById("film-languages").textContent = filmDetails.languages.join(", ");
            document.getElementById("imdb-score").textContent = ("IMDB score: ") + filmDetails.imdb_score;
            document.getElementById("film-director").textContent = filmDetails.directors;
            document.getElementById("filmDescription").textContent = filmDetails.description;
            document.getElementById("filmActors").textContent = filmDetails.actors.join(", ");

            // Set the main image and fallback for the modal
            const modalImageElement = document.querySelector(".modalFilmImage");
            modalImageElement.src = filmDetails.image_url;
            modalImageElement.onerror = function() {
                modalImageElement.src = "https://picsum.photos/200/300";
            };

            // Set the secondary smaller image in mobile version
            const littleModalFilmImageElement = document.querySelector(".littleModalFilmImage");
            littleModalFilmImageElement.src = filmDetails.image_url;
            littleModalFilmImageElement.onerror = function() {
                littleModalFilmImageElement.src = "https://picsum.photos/200/300";
            };
        })
        .catch(error => {
            console.error("Failed to fetch film details:", error);
        });
}

/**
 * Fetches a list of film genres and populates the genre selection dropdown.
 */

function getCategoriesList() {
    const usedApi = apiUrl + "/genres?page_size=25";
    const excludedCategories = ["Action", "Mystery", "Comedy"];
    const selectElement = document.querySelector("select");

    console.log("Fetching for film's categories.");

    fetch(usedApi)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok" + response.statusText);
            }
            return response.json();
    })
    
        .then(data => {
            console.log(data);    

            const categories = data.results;

            // Filter out excluded categories and populate the dropdown menu
            const filteredCategories = categories.filter(category => !excludedCategories.includes(category.name)
            );

            filteredCategories.forEach((category, index) => {
                const optionElement = document.createElement("option");
                optionElement.value = index + 1;
                optionElement.textContent = category.name;
                selectElement.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error("There has been a problem with your fetch operation:", error);    
        });
}

// Event listener for the "Show more" button, toggles visibility of additional films
document.querySelectorAll(".show-more-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const container = button.closest(".row");
        const hiddenMobileFilms = container.querySelectorAll(".hidden-mobile");
        const hiddenTabletteFilms = container.querySelectorAll(".hidden-tablette")

         // Toggle between showing more or fewer films
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

// Event listener for modal detail buttons to fetch and display film details
const detailButtons = document.querySelectorAll("button[data-bs-toggle='modal']");

detailButtons.forEach(button => {
    button.addEventListener("click", function() {
        const filmId = this.getAttribute("data-id");
        getModalElements(filmId);
    });    
});

// Event listener for category selection changes
document.querySelector("#categorieSelection").addEventListener("change", function(event) {
    const selectedOption = event.target.options[event.target.selectedIndex].textContent;
    const otherContainer = document.getElementById("other-category");
    
    // Fetch films based on selected category
    getGenreFilms(selectedOption, "#other-category")
        .then(() => { 
            console.log(selectedOption);
            otherContainer.classList.remove("d-none");
        })    
        .catch(error => {
            console.error("An error occurred while fetching or displaying films:", error);
        });
});

// Initial API calls to load the best film and films by genre on page load
getBestFilm();
getGenreFilms('mystery');
getGenreFilms('action');
getGenreFilms('comedy');
getCategoriesList();
