const API_PATH = "https://review-backend.beaucarnes.repl.co/api/v1/reviews/";

const reviewURL = new URL(location.href);

//get the movie id and title paramaters from url
const movieId = reviewURL.searchParams.get("id");
const movieTitle = reviewURL.searchParams.get("title");

const displayTitle = document.getElementById("movie-title");
displayTitle.innerHTML = movieTitle;

const reviewBar = document.getElementById("review-input");
const userBar = document.getElementById("user-input");

const addReview = document.getElementById("add-review");

const reviewsContainer = document.getElementById("reviews-container");

//add event listeners
addEventListener("click", (e) => {
  if (e.target === reviewBar || e.target === userBar) {
    e.target.placeholder = "";
  }
});
