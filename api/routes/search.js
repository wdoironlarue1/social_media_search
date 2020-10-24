const express = require("express");
const search = require("../controllers/socialMediaSearchController");

var router = express.Router();

router.get("/", async function (req, res, next) {
  //add handling of empty/unexpected query (maybe make the naming better too)
  let query = req.query.query;

  search(req, res);
});

module.exports = router;
