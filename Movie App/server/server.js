const express = require("express");
const app = express();
const cors = require("cors");
const reviewsRoutes = require("./routes/reviews-routes");

app.use(cors());
app.use(express.json());

app.use("/api/reviews/", reviewsRoutes);

app.listen(() => {
  console.log("Server listening on port 4000");
}, 4000);
