const express = require("express");
const authorsRouter = express.Router();
const Author = require("../models/author");

//renders all the authors
authorsRouter.get("/", (req, res) => {
  res.render("authors/index");
});

//renders create new author form
authorsRouter.get("/new", (req, res) => {
  res.render("authors/new");
});

//create new author route
authorsRouter.post("/new", (req, res) => {
  res.send("new");
});

module.exports = authorsRouter;
