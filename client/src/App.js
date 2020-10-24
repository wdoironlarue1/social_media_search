import React, { Component } from "react";
import "./App.css";
import SearchResult from "./components/SearchResults";
import { REDDIT, TWITTER } from "./constants";

class App extends Component {
  state = {
    queryInput: "",
    queryResults: {},
    platformsToSearch: { [REDDIT]: true, [TWITTER]: true },
    errorMessage: "",
  };

  handleClickSearchButton = () => {
    //@TODO handle no query input and no platforms selected (make a toast or something)
    if (!this.state.queryInput) {
      this.showErrorMessage("Please enter a non-empty query");
    } else {
      let arePlatformsSelected = false;
      for (let platform in this.state.platformsToSearch) {
        if (this.state.platformsToSearch[platform]) {
          arePlatformsSelected = true;
          break;
        }
      }
      if (!arePlatformsSelected) {
        this.showErrorMessage("Please select at least one platform to search");
      } else {
        this.fetchData();
        this.hideErrorMessage();
      }
    }
  };

  showErrorMessage = (errorMessage) => {
    this.setState({ errorMessage });
  };

  hideErrorMessage = () => {
    this.setState({ errorMessage: "" });
  };

  fetchData = () => {
    let url = new URL("http://localhost:9000/search");
    url.searchParams.append("query", this.state.queryInput);
    for (let platform in this.state.platformsToSearch) {
      if (this.state.platformsToSearch[platform]) {
        url.searchParams.append("platforms", platform);
      }
    }
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ queryResults: res });
      });
  };

  handleChangeInput = (e) => {
    this.setState({ queryInput: e.target.value });
  };

  handleChangePlatforms = (platform) => {
    this.setState((prevState) => {
      return {
        platformsToSearch: {
          ...prevState.platformsToSearch,
          [platform]: !prevState.platformsToSearch[platform],
        },
      };
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleClickSearchButton();
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Social Media Search</h2>
        </header>
        <p style={{ margin: "10px 0 10px 0" }}>
          What do you want to search for?
        </p>
        <div>
          <input
            onKeyUp={this.handleKeyPress}
            value={this.state.queryInput}
            onChange={this.handleChangeInput}
          ></input>
          <button onClick={this.handleClickSearchButton}>Search</button>
        </div>
        <div className="error-message">
          {this.state.errorMessage && (
            <i className="glyphicon glyphicon-remove"></i>
          )}
          {this.state.errorMessage}
        </div>
        <p style={{ margin: "0 0 10px 0" }}>
          What social media platforms do you want to search?
        </p>
        <div>
          <label onClick={() => this.handleChangePlatforms(REDDIT)}>
            <input
              type="radio"
              checked={this.state.platformsToSearch[REDDIT]}
              onChange={() => {}}
            />
            Reddit
          </label>
          <label
            style={{ padding: "0 10px" }}
            onClick={() => this.handleChangePlatforms(TWITTER)}
          >
            <input
              type="radio"
              checked={this.state.platformsToSearch[TWITTER]}
              onChange={() => {}} //causes console warnings if this prop isn't given
            />
            Twitter
          </label>
        </div>
        <SearchResult results={this.state.queryResults} />
      </div>
    );
  }
}

export default App;
