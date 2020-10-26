const Twit = require("twit");
const config = require("../config");

//returns a promise that resolves twitter data from a query
function getTwitterData(query) {
    const twitterApiClient = new Twit({
      consumer_key: config.TWITTER_CONSUMER_KEY,
      consumer_secret: config.TWITTER_CONSUMER_SECRET,
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

  const refactorTwitterData = (response) => {
    //make the date formats match
    return response.data.statuses.map((tweet) => {
      return {
        type: "twitter",
        text: tweet.full_text,
        url: "https://twitter.com/user/status/" + tweet.id_str,
        created_at: new Date(tweet.created_at).toLocaleString(),
      };
    });
  };

  module.exports = getTwitterData;