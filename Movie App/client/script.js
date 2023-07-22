//api info
const API_PATH =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=578421658349dbe13bbe06fe76a6eaa1&page=1";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
let QUERY_PATH = `https://api.themoviedb.org/3/search/movie?&api_key=578421658349dbe13bbe06fe76a6eaa1&query=`;

const searchForm = document.getElementById("search-form");
const searchBar = document.getElementById("search-input");

const moviesContainer = document.getElementById("movies-container");

let originalMovies = [];
let fetchedMovies = [];

//when app is first loaded, load and disply first page movies (no fetched movies yet)
firstPageMovies();

searchBar.onclick = () => {
  searchBar.placeholder = "";
};

searchForm.onsubmit = searchMovie;

//first page movies (original movies)
async function firstPageMovies() {
  const originalMoviesRes = await fetch(API_PATH);
  const originalMoviesObj = await originalMoviesRes.json();
  originalMovies = [...originalMoviesObj.results];
  displayMovies(0);
}

//when user searches up a movie
async function searchMovie(e) {
  e.preventDefault();
  searchBar.value && (await fetchMovies(searchBar.value));
}

//fetches the movie(s) from API given the searched movie
async function fetchMovies(searchedMovie) {
  QUERY_PATH += `${searchedMovie}`;
  const fetchedMoviesRes = await fetch(QUERY_PATH);
  const fetchedMoviesObj = await fetchedMoviesRes.json();
  fetchedMovies = [...fetchedMoviesObj.results];
  displayMovies(1);
}

//displays the fetched movies (0 => no fetched movies, 1 => fetched movies)
function displayMovies(option) {
  if (option === 0) {
    originalMovies.forEach((movie) => {
      handleDisplayMovie(movie);
    });
  } else {
    fetchedMovies.forEach((movie) => {
      handleDisplayMovie(movie);
    });
  }
}

//helper function to handle html logic for each movie
function handleDisplayMovie(movie) {
  const movieTitle = document.createElement("h3");
  movieTitle.setAttribute("class", "title");
  movieTitle.innerHTML = movie.title;

  const movieCenter = document.createElement("center");
  const movieImage = document.createElement("img");
  movieImage.setAttribute("class", "thumbnail");
  movieImage.src = IMAGE_PATH + movie.poster_path;
  movieCenter.appendChild(movieImage);

  const movieContainer = document.createElement("div");
  movieContainer.setAttribute("class", "movie-container");
  movieContainer.appendChild(movieCenter);
  movieContainer.appendChild(movieTitle);

  const movieColumn = document.createElement("div");
  movieColumn.setAttribute("class", "column-container");
  movieColumn.appendChild(movieContainer);

  const movieRow = document.createElement("div");
  movieRow.setAttribute("class", "row-container");
  movieRow.appendChild(movieColumn);

  moviesContainer.appendChild(movieRow);
}
