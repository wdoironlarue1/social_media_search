const Reddit = require("reddit");
const config = require("../config");

function getRedditData(query) {
    const redditApiClient = new Reddit({
      username: config.REDDIT_USERNAME,
      password: config.REDDIT_PASSWORD,
      appId: config.REDDIT_APP_ID,
      appSecret: config.REDDIT_APP_SECRET,
    });
    let promise = redditApiClient
      .get("/search", {
        q: query,
        count: 2,
        limit: 2,
        sort: "hot",
      })
      .then((res) => refactorRedditData(res));
    return promise;
  }

const refactorRedditData = (response) => {
    //make date formats match
    return response.data.children.map((post) => {
      return {
        type: "reddit",
        text: post.data.title,
        url: "https://www.reddit.com" + post.data.permalink,
        created_at: new Date(post.data.created_utc * 1000).toLocaleString(),
      };
    });
  };

  module.exports = getRedditData