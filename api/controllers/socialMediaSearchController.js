const getRedditData = require("../models/redditApiModel");
const getTwitterData = require("../models/twitterApiModel");

const REDDIT = "reddit";
const TWITTER = "twitter";

async function search(req, res) {
  try {
    let platforms = req.query.platforms;
    platforms = Array.isArray(platforms) ? platforms : [platforms];
    let promises = [];
    platforms.forEach((platform) => {
        switch(platform) {
            case REDDIT:
                promises.push(getRedditData(req.query.query));
                break;
            case TWITTER:
                promises.push(getTwitterData(req.query.query));
                break;
        }
    })    
    let result = [];
    await Promise.allSettled(promises).then((resolved) => {
      resolved.forEach((element) => {
        //add handler for failed api call
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
