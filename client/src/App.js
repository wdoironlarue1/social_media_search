import React, { Component } from "react";
import "./App.css";
import QueryResult from "./components/QueryResult";

class App extends Component {
  state = {
    queryResults: {},
  };

  onClick = () => {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.json())
      .then((res) => this.setState({ queryResults: res.statuses }));
  };

  render() {
    let queryResults = [];
    for (let index in this.state.queryResults) {
      queryResults.push(
        <QueryResult key={this.state.queryResults[index].id} {...this.state.queryResults[index]}></QueryResult>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h2>Social Media Search</h2>
          <p>what do you want to search for?</p>
          <input></input>
          <button onClick={this.onClick}>call api</button>
          {queryResults}
        </header>
      </div>
    );
  }
}

export default App;
