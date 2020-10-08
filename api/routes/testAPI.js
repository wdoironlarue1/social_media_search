const express = require("express");
const Twit = require("twit");

var router = express.Router();

router.get("/", async function (req, res, next) {
  var T = new Twit({
    consumer_key: "vbgJyV68Hn9TzyMJ5hQaFvDKy",
    consumer_secret: "0tUmd35cLLVqgsQ6ttpgMf0zQVUSrEiSmngC2nc0baZldVbN5i",
    app_only_auth: true,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid
  });

  //add error handling
  T.get(
    "search/tweets",
    { q: "trump since:2020-07-11", count: 10, result_type: "popular" },
    function (err, data, response) {
      res.json(data);
    }
  );  
});

module.exports = router;
