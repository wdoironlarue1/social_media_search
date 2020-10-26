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
        q: query + " since:" + getPastDate(3),
        count: 100,
        result_type: "popular",
        tweet_mode: "extended",
      })
      .then((res) => refactorTwitterData(res));
  
    return promise;
  }

  getPastDate = (daysAgo) => {
    let date = new Date()
    date.setDate(date.getDate() - daysAgo);
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
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