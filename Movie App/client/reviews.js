const API_PATH = "http://localhost:4000/api/reviews/";

const reviewURL = new URL(location.href);

//get the movie id and title paramaters from url
const movieId = reviewURL.searchParams.get("id");
const movieTitle = reviewURL.searchParams.get("title");

const displayTitle = document.getElementById("movie-title");
displayTitle.innerText = movieTitle;

const reviewInput = document.getElementById("review-input");
const userInput = document.getElementById("user-input");

const addReviewButton = document.getElementById("add-review");

const reviewsContainer = document.getElementById("reviews-container");

let movieReviews = [];

//add event listeners
addEventListener("click", (e) => {
  if (e.target === reviewInput || e.target === userInput) {
    e.target.placeholder = "";
  }
});
addReviewButton.onclick = createReview;

//initial reviews
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

  const reviewContent = document.createElement("p");
  reviewContent.setAttribute("class", "review-text");
  reviewContent.innerHTML = `<strong>Review: </strong> ${review.content}`;

  const reviewUser = document.createElement("p");
  reviewUser.setAttribute("class", "review-user");
  reviewUser.innerHTML = `<strong>User: </strong> ${review.user}`;

  const reviewTools = document.createElement("p");
  reviewTools.setAttribute("class", "review-tools");
  reviewTools.innerHTML = `<a href="#" onclick="updateReview('${review._id}', '${review.user}', '${review.content}')">✏️</a><a href="#" onclick="deleteReview('${review._id}')">🗑</a>`;

  reviewContainer.appendChild(reviewContent);
  reviewContainer.appendChild(reviewUser);
  reviewContainer.appendChild(reviewTools);

  reviewsContainer.appendChild(reviewContainer);
}

//create a review
async function createReview() {
  try {
    //clear initial container
    reviewsContainer.innerHTML = "";
    const reqHeaders = {
      "Content-Type": "application/json",
    };
    const reqBody = {
      movieId: movieId,
      user: userInput.value,
      content: reviewInput.value,
    };
    const createRes = await fetch(API_PATH + "new", {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(reqBody),
    });
    const newReview = await createRes.json();
    movieReviews.push(newReview);
    handleDisplayReview(newReview);
  } catch (error) {
    console.log(error.message);
  }
}

//update a review
async function updateReview(id, user, content) {
  try {
    const reqHeaders = {
      "Content-Type": "application/json",
    };
    const reqBody = { user: user, content: content };
    await fetch(API_PATH + `${id}`, {
      method: "PUT",
      headers: reqHeaders,
      body: JSON.stringify(reqBody),
    });
  } catch (error) {
    console.log(error.message);
  }
}

//delete a review
async function deleteReview(id) {
  try {
    await fetch(API_PATH + `${id}`, {
      method: "DELETE",
    });
    location.reload();
  } catch (error) {
    console.log(error.message);
  }
}
