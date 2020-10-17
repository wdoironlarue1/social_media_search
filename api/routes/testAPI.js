const express = require("express");
const Twit = require("twit");
const Reddit = require("reddit");

var router = express.Router();

async function twitterPromise(query) {
  const twitterApiClient = new Twit({
    consumer_key: "vbgJyV68Hn9TzyMJ5hQaFvDKy",
    consumer_secret: "0tUmd35cLLVqgsQ6ttpgMf0zQVUSrEiSmngC2nc0baZldVbN5i",
    app_only_auth: true,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  });

  let promise = twitterApiClient
    .get("search/tweets", {
      //make the date dynamic (maybe the past 3 days or something)
      q: query + " since:2020-07-11",
      count: 2,
      result_type: "popular",
      tweet_mode: "extended",
    })
    .then((res) => refactorTwitterData(res));

  return promise;
}

async function redditPromise(query) {
  const redditApiClient = new Reddit({
    username: "user-for-api",
    password: "Password123",
    appId: "CFhF465_QcDBrA",
    appSecret: "5fvIgwhpOPT6aYrgCRUkHKW-2F4",
    userAgent: "MyApp/1.0.0 (http://example.com)",
  });
  let promise = await redditApiClient
    .get("/search", {
      q: query,
      count: 2,
      limit: 2,
      sort: "hot",
    })
    .then((res) => refactorRedditData(res));
  return promise;
}

const refactorTwitterData = (response) => {
  //make the date formats match
  return response.data.statuses.map((tweet) => {
    return {
      type: "twitter",
      text: tweet.full_text,
      url: "https://twitter.com/user/status/" + tweet.id_str,
      created_at: tweet.created_at,
    };
  });
};

const refactorRedditData = (response) => {
  //make date formats match
  return response.data.children.map((post) => {
    return {
      type: "reddit",
      text: post.data.title,
      url: "https://www.reddit.com" + post.data.permalink,
      created_at: new Date(post.data.created_utc * 1000).toString(),
    };
  });
};

router.get("/", async function (req, res, next) {
  //add handling of empty/unexpected query (maybe make the naming better too)
  let query = req.query.query;

  Promise.allSettled([twitterPromise(query), redditPromise(query)]).then(
    (resolved) => {
      //handle cases where the "status" is not "fulfilled"
      let result = [];
      resolved.forEach((element) => {
        if ((element.status = "fulfilled")) {
          result = result.concat(element.value);
        }
      });
      res.json(result);
    }
  );
});

module.exports = router;
