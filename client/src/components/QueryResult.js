import React from "react";

const QueryResult = (props) => {
  return (
    <div className="Query-result">
      <p>tweet created at {props.created_at}</p>
      <p>tweet content: {props.text}</p>
      <a href={props.url}>view the post here</a>
    </div>
  );
};

export default QueryResult;
