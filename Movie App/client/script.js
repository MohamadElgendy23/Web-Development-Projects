//api info
const API_PATH =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=578421658349dbe13bbe06fe76a6eaa1&page=1";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
let QUERY_PATH = `https://api.themoviedb.org/3/search/movie?&api_key=578421658349dbe13bbe06fe76a6eaa1&query=`;

const searchForm = document.getElementById("search-form");
const searchBar = document.getElementById("search-input");
const moviesColumn = document.getElementsByClassName("column-container");
const moviesRow = document.getElementsByClassName("row-container");

searchBar.onclick = () => {
  searchBar.placeholder = "";
};

searchForm.onsubmit = searchMovie;

//when user searches up a movie
function searchMovie(e) {
  e.preventDefault();
  fetchMovies(searchBar.value);
  displayMovies();
}

//fetches the movie(s) from API given the searched movie
async function fetchMovies(movie) {
  QUERY_PATH += `${movie}`;
  const fetchedMoviesRes = await fetch(QUERY_PATH);
  console.log(await fetchedMoviesRes.json());
}

function displayMovies() {}
