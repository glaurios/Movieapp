const apiKey = '88d9cb05f5c66bc47159ea1fabf2adfd';
const api_url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const searchurl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const button = document.getElementById('enter');
const input1 = document.getElementById('input');
const main = document.getElementById('main');
const trailerModal = document.getElementById('trailerModal');
const trailerVideo = document.getElementById('trailerVideo');
const closeModal = document.getElementsByClassName("close")[0];

// Function to get movies
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    displayMovies(data.results);
}

// Function to display movies
function displayMovies(movies) {
    main.innerHTML = ""; 
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <div class="img">
                <img id="img" src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="movie-info">
                <h4>${movie.title}</h4>
                <p class="overview">${movie.overview}</p>
            </div>
        `;
        
       
        movieDiv.addEventListener('click', () => {
            getTrailer(movie.id);
        });

        main.appendChild(movieDiv);
    });
}

async function getTrailer(movieId) {
    const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
    const res = await fetch(trailerUrl);
    const data = await res.json();
    if (data.results.length > 0) {
        const trailerKey = data.results[0].key; 
        playTrailer(trailerKey);
    } else {
        alert("Trailer not available");
    }
}


function playTrailer(trailerKey) {
    trailerVideo.src = `https://www.youtube.com/embed/${trailerKey}`; 
    trailerModal.style.display = "block"; 
}


closeModal.onclick = function() {
    trailerModal.style.display = "none";
    trailerVideo.src = ""; 
}


window.onclick = function(event) {
    if (event.target == trailerModal) {
        trailerModal.style.display = "none";
        trailerVideo.src = ""; 
    }
}


button.addEventListener('click', (e) => {
    e.preventDefault();
    const searchValue = input1.value.trim();
    if (searchValue) {
        getMovies(searchurl + encodeURIComponent(searchValue));
        input1.value = ''; // Clear input
    } else {
        window.location.reload();
    }
});


getMovies(api_url);

