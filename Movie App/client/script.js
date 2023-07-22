//api info
const API_PATH =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=578421658349dbe13bbe06fe76a6eaa1&page=1";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
let QUERY_PATH = `https://api.themoviedb.org/3/search/movie?&api_key=578421658349dbe13bbe06fe76a6eaa1&query=`;

const searchForm = document.getElementById("search-form");
const searchBar = document.getElementById("search-input");
const movieColumn = document.getElementsByClassName("column-container");
const movieRow = document.getElementsByClassName("row-container");
const movieContainer = document.getElementsByClassName("movie-container");
const movieImage = document.getElementsByClassName("thumbnail");
const movieTitle = document.getElementsByClassName("title");

let originalMovies = [];
let fetchedMovies = [];

//when app is first loaded, load and disply first page movies (no fetched movies yet)
firstPageMovies();
displayMovies(0);

searchBar.onclick = () => {
  searchBar.placeholder = "";
};

searchForm.onsubmit = searchMovie;

//first page movies (original movies)
async function firstPageMovies() {
  const originalMoviesRes = await fetch(API_PATH);
  const originalMoviesObj = await originalMoviesRes.json();
  originalMovies = [...originalMoviesObj.results];
}

//when user searches up a movie
async function searchMovie(e) {
  e.preventDefault();
  searchBar.value && (await fetchMovies(searchBar.value));
  displayMovies(1);
}

//fetches the movie(s) from API given the searched movie
async function fetchMovies(searchedMovie) {
  QUERY_PATH += `${searchedMovie}`;
  const fetchedMoviesRes = await fetch(QUERY_PATH);
  const fetchedMoviesObj = await fetchedMoviesRes.json();
  fetchedMovies = [...fetchedMoviesObj.results];
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
  movieTitle[0].innerHTML = movie.title;
  movieImage[0].src = IMAGE_PATH + movie.poster_path;
  movieContainer[0].appendChild(movieTitle);
  movieContainer[0].appendChild(movieImage);
  movieRow[0].appendChild(movieContainer[0]);
  movieColumn[0].appendChild(movieRow[0]);
}
