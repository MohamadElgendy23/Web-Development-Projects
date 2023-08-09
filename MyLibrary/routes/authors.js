const express = require("express");
const authorRouter = express.Router();

//gets all the authors
authorRouter.get("/", (req, res) => {});

module.exports = authorRouter;
