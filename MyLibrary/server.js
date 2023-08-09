const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch(() => {
    console.log("DATABASE NOT CONNECTED");
  });

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("SERVER LISTENING");
});
