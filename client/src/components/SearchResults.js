import React from "react";
import SearchResult from "./SearchResult";

const SearchResults = (props) => {
  let platforms = [],
    results = [];
  for (let index in props.results) {
    if (!platforms[props.results[index].type]) {
      platforms[props.results[index].type] = [];
    }
    platforms[props.results[index].type].push(
      <SearchResult key={index} {...props.results[index]}></SearchResult>
    );
  }
  for (let platform in platforms) {
    results.push(
      <div className="SearchResults-platform" key={platform}>
        <h4>{`${platform} results`} </h4>
        {platforms[platform]}
      </div>
    );
  }

  return <div className="SearchResults-container">{results}</div>;
};

export default SearchResults;
