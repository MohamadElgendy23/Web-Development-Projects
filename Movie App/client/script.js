//api info
const API_PATH =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=578421658349dbe13bbe06fe76a6eaa1&page=1";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
const QUERY_PATH = `https://api.themoviedb.org/3/search/movie?&api_key=578421658349dbe13bbe06fe76a6eaa1&query=Sam`;

const searchForm = document.getElementById("search-form");
const searchBar = document.getElementById("search-input");

searchForm.onsubmit = searchMovie;

function searchMovie(e) {
  e.preventDefault(); //disable unwanted form reload
  fetchMovies(searchBar.value);
}

async function fetchMovies(movie) {
  const fetchedMoviesRes = await fetch();
}
