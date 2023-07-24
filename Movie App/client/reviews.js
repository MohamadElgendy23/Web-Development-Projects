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
