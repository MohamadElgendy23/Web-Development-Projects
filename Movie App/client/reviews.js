const reviewBar = document.getElementById("review-input");
const userBar = document.getElementById("user-input");

const addReview = document.getElementById("add-review");

const reviewsContainer = document.getElementById("reviews-container");

//event listeners
reviewBar.onclick = () => {
  reviewBar.placeholder = "";
};
userBar.onclick = () => {
  userBar.placeholder = "";
};
