import React from "react";

const QueryResult = (props) => {
  return (
    <div>
      <p>tweet created at {props.created_at}</p>
      <p>tweet content: {props.full_text}</p>
    </div>
  );
};

export default QueryResult;
