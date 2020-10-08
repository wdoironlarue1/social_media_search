import React, { Component } from "react";
import "./App.css";
import QueryResult from "./components/QueryResult";

class App extends Component {
  state = {
    queryInput: "",
    queryResults: {},
  };

  handleClickButton = () => {
    //@TODO handle no query input
    fetch("http://localhost:9000/testAPI?query=" + this.state.queryInput)
      .then((res) => res.json())
      .then((res) => this.setState({ queryResults: res.statuses }));
  };

  handleChangeInput = (e) => {
    this.setState({ queryInput: e.target.value });
  };

  render() {
    let queryResults = [];
    for (let index in this.state.queryResults) {
      queryResults.push(
        <QueryResult
          key={this.state.queryResults[index].id}
          {...this.state.queryResults[index]}
        ></QueryResult>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h2>Social Media Search</h2>
          <p>what do you want to search for?</p>
          <div>
            <input
              value={this.state.queryInput}
              onChange={this.handleChangeInput}
            ></input>
            <button onClick={this.handleClickButton}>call api</button>
          </div>
          {queryResults}
        </header>
      </div>
    );
  }
}

export default App;
