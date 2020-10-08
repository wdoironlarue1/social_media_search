const express = require("express");
const Twit = require("twit");

var router = express.Router();

router.get("/", async function (req, res, next) {
  //add handling of empty/unexpected query (maybe make the naming better too)
  let query = req.query.query;
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
    {
      q: query + " since:2020-07-11",
      count: 10,
      result_type: "popular",
      tweet_mode: "extended",
    },
    function (err, data, response) {
      if(err) {
          //ideally some kind of error logging/reporting here
          console.log(err);
      }
      res.json(data);
    }
  ).catch((err) => {
    console.log("caught error" + err.stack);
  });
});

module.exports = router;
