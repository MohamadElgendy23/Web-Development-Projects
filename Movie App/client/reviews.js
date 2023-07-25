const API_PATH = "http://localhost:4000/api/reviews/";

const reviewURL = new URL(location.href);

//get the movie id and title paramaters from url
const movieId = reviewURL.searchParams.get("id");
const movieTitle = reviewURL.searchParams.get("title");

const displayTitle = document.getElementById("movie-title");
displayTitle.innerText = movieTitle;

const reviewBar = document.getElementById("review-input");
const userBar = document.getElementById("user-input");

const addReviewButton = document.getElementById("add-review");

const reviewsContainer = document.getElementById("reviews-container");

let movieReviews = [];

//add event listeners
addEventListener("click", (e) => {
  if (e.target === reviewBar || e.target === userBar) {
    e.target.placeholder = "";
  }
});
addReviewButton.onclick = createReview;

getReviews();

//get the movie reviews
async function getReviews() {
  try {
    const reviewsRes = await fetch(API_PATH + `movie/${movieId}`);
    const reviews = await reviewsRes.json();
    movieReviews = [...reviews];
    !movieReviews.length
      ? (reviewsContainer.innerHTML = "<h1>No Reviews</h1>")
      : displayReviews();
  } catch (error) {
    console.log(error.message);
  }
}

//display the movie reviews
function displayReviews() {
  movieReviews.forEach((review) => {
    handleDisplayReview(review);
  });
}

function handleDisplayReview(review) {
  const reviewContainer = document.createElement("div");
  reviewContainer.setAttribute("class", "review-container");
}

//create a review
async function createReview() {}

//update a review
async function updateReview() {}

//delete a review
async function deleteReview() {}
