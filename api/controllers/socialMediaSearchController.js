const getRedditData = require("../models/redditApiModel");
const getTwitterData = require("../models/twitterApiModel");

async function search(req, res) {
  try {
    let redditData = getRedditData(req.query.query);
    let twitterData = getTwitterData(req.query.query);
    let result = [];
    await Promise.allSettled([redditData, twitterData]).then((resolved) => {
      resolved.forEach((element) => {
        if ((element.status = "fulfilled")) {
          result = result.concat(element.value);
        }
      });
    });
    res.json(result);
  } catch (error) {
      console.log(error);
  }
}

module.exports = search;