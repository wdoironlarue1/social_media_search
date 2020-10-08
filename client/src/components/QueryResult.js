import React from "react";

const QueryResult = (props) => {
    console.log(props)
  return (
  <div>
      <p>tweet created at {props.created_at}</p>
      <p>tweet content:  {props.text}</p>

  </div>
  );
};

export default QueryResult;
