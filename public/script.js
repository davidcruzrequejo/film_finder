const tmdbKey = "334cf66f768a2e5f72e153997b7101c0";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
    const genreRequestEndpoint = "/genre/movie/list";
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres;
            return genres;
        }
    } catch (error) {
        console.error(error);
    }
};

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = "/discover/movie";
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    let urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            let jsonResponse = await response.json();
            const total_pages = jsonResponse.total_pages;
            const rand_page = Math.floor(Math.random() * total_pages);
            const page_param = `&page=${rand_page}`;
            urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}${page_param}`;

            response = await fetch(urlToFetch);
            if (response.ok) {
                jsonResponse = await response.json();
                const movies = jsonResponse.results;
                return movies;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movieInfo = jsonResponse;
            return movieInfo;
        }
    } catch (error) {
        console.error(error);
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById("movieInfo");
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }
    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
