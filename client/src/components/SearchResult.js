import React from "react";
import twitterLogo from "../Twitter_Logo_Blue.png";
import redditLogo from "../reddit_icon.png"
import { REDDIT, TWITTER } from "../constants";

const SearchResult = (props) => {
  let logo = "";
  switch (props.type) {
    case REDDIT:
      logo = redditLogo
      break;
    case TWITTER:
      logo = twitterLogo;
      break;
    default:
  }
  return (
    <div className="SearchResult">
      <div className="SearchResult-image-container">
        <img src={logo} alt="" className="SearchResult-image-img"></img>
      </div>
      <p>Posted {props.created_at}</p>
      <p>tweet content: {props.text}</p>
      <a href={props.url}>view the post here</a>
    </div>
  );
};

export default SearchResult;
